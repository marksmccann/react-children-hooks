import type { ReactElement, ReactNode } from "react";

import reporter from "./reporter";
import type { ValidationOptions } from "./types";
import { useChildrenMatching } from "./useChildrenMatching";

/**
 * Returns the direct child elements that satisfy the provided predicate, or throws when the exact count is not met.
 *
 * @param children The React children value to inspect.
 * @param predicate A predicate that is called with each direct child element to determine whether it matches.
 * @param exactCount The exact number of matching direct child elements required.
 * @param options Optional reporting metadata used to derive the thrown validation message.
 * @returns The direct child elements that satisfy the provided predicate.
 */
export function useExactChildrenMatching<T extends ReactElement>(
    children: ReactNode,
    predicate: (element: ReactElement) => element is T,
    exactCount: number,
    options?: ValidationOptions
): T[];
export function useExactChildrenMatching(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean,
    exactCount: number,
    options?: ValidationOptions
): ReactElement[];
export function useExactChildrenMatching(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean,
    exactCount: number,
    options?: ValidationOptions
): ReactElement[] {
    const matchingChildren = useChildrenMatching(children, predicate, options);

    if (matchingChildren.length === exactCount) {
        return matchingChildren;
    }

    return reporter.fail("EXACT_CHILDREN_MATCHING_PREDICATE_FAILED", {
        traceCodePrefix: options?.traceCode ? `[${options.traceCode}] ` : "",
        childNameSegment: options?.childName ? ` for ${options.childName}` : "",
        actualCount: matchingChildren.length,
        actualCountPluralSuffix: matchingChildren.length === 1 ? "" : "ren",
        exactCount
    });
}
