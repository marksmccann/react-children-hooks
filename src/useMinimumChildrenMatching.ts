import type { ReactElement, ReactNode } from "react";

import reporter from "./reporter";
import type { ValidationOptions } from "./types";
import { useChildrenMatching } from "./useChildrenMatching";

/**
 * Returns the direct child elements that satisfy the provided predicate, or throws when fewer than the minimum count are found.
 *
 * @param children The React children value to inspect.
 * @param predicate A predicate that is called with each direct child element to determine whether it matches.
 * @param minimumCount The minimum number of matching direct child elements required.
 * @param options Optional reporting metadata used to derive the thrown validation message.
 * @returns The direct child elements that satisfy the provided predicate.
 */
export function useMinimumChildrenMatching<T extends ReactElement>(
    children: ReactNode,
    predicate: (element: ReactElement) => element is T,
    minimumCount: number,
    options?: ValidationOptions
): T[];
export function useMinimumChildrenMatching(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean,
    minimumCount: number,
    options?: ValidationOptions
): ReactElement[];
export function useMinimumChildrenMatching(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean,
    minimumCount: number,
    options?: ValidationOptions
): ReactElement[] {
    const matchingChildren = useChildrenMatching(children, predicate);

    if (matchingChildren.length >= minimumCount) {
        return matchingChildren;
    }

    return reporter.fail("MINIMUM_CHILDREN_MATCHING_PREDICATE_FAILED", {
        traceCodePrefix: options?.traceCode ? `[${options.traceCode}] ` : "",
        childNameSegment: options?.childName ? ` for ${options.childName}` : "",
        actualCount: matchingChildren.length,
        actualCountPluralSuffix: matchingChildren.length === 1 ? "" : "ren",
        minimumCount
    });
}
