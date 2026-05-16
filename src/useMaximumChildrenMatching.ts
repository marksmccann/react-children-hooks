import type { ReactElement, ReactNode } from "react";

import reporter from "./reporter";
import type { ValidationOptions } from "./types";
import useChildrenMatching from "./useChildrenMatching";

/**
 * Returns the direct child elements that satisfy the provided predicate, or throws when more than the maximum count are found.
 *
 * @param children The React children value to inspect.
 * @param predicate A predicate that is called with each direct child element to determine whether it matches.
 * @param maximumCount The maximum number of matching direct child elements allowed.
 * @param options Optional reporting metadata used to derive the thrown validation message.
 * @returns The direct child elements that satisfy the provided predicate.
 */
function useMaximumChildrenMatching<T extends ReactElement>(
    children: ReactNode,
    predicate: (element: ReactElement) => element is T,
    maximumCount: number,
    options?: ValidationOptions
): T[];
function useMaximumChildrenMatching(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean,
    maximumCount: number,
    options?: ValidationOptions
): ReactElement[];
function useMaximumChildrenMatching(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean,
    maximumCount: number,
    options?: ValidationOptions
): ReactElement[] {
    const matchingChildren = useChildrenMatching(children, predicate, options);

    if (matchingChildren.length <= maximumCount) {
        return matchingChildren;
    }

    return reporter.fail("MAXIMUM_CHILDREN_MATCHING_PREDICATE_FAILED", {
        traceCodePrefix: options?.traceCode ? `[${options.traceCode}] ` : "",
        childNameSegment: options?.childName ? ` for ${options.childName}` : "",
        actualCount: matchingChildren.length,
        actualCountPluralSuffix: matchingChildren.length === 1 ? "" : "ren",
        maximumCount
    });
}

export default useMaximumChildrenMatching;
