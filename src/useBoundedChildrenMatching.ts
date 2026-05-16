import type { ReactElement, ReactNode } from "react";

import reporter from "./reporter";
import type { ChildrenCountBounds, ValidationOptions } from "./types";
import useChildrenMatching from "./useChildrenMatching";

/**
 * Returns the direct child elements that satisfy the provided predicate, or throws when the count falls outside the inclusive bounds.
 *
 * @param children The React children value to inspect.
 * @param predicate A predicate that is called with each direct child element to determine whether it matches.
 * @param bounds The inclusive minimum and maximum number of matching direct child elements allowed.
 * @param options Optional reporting metadata used to derive the thrown validation message.
 * @returns The direct child elements that satisfy the provided predicate.
 */
function useBoundedChildrenMatching<T extends ReactElement>(
    children: ReactNode,
    predicate: (element: ReactElement) => element is T,
    bounds: ChildrenCountBounds,
    options?: ValidationOptions
): T[];
function useBoundedChildrenMatching(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean,
    bounds: ChildrenCountBounds,
    options?: ValidationOptions
): ReactElement[];
function useBoundedChildrenMatching(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean,
    bounds: ChildrenCountBounds,
    options?: ValidationOptions
): ReactElement[] {
    const matchingChildren = useChildrenMatching(children, predicate, options);

    if (
        matchingChildren.length >= bounds.minimum &&
        matchingChildren.length <= bounds.maximum
    ) {
        return matchingChildren;
    }

    return reporter.fail("BOUNDED_CHILDREN_MATCHING_PREDICATE_FAILED", {
        traceCodePrefix: options?.traceCode ? `[${options.traceCode}] ` : "",
        childNameSegment: options?.childName ? ` for ${options.childName}` : "",
        actualCount: matchingChildren.length,
        actualCountPluralSuffix: matchingChildren.length === 1 ? "" : "ren",
        minimumCount: bounds.minimum,
        maximumCount: bounds.maximum
    });
}

export default useBoundedChildrenMatching;
