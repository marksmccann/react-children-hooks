import type { ReactElement, ReactNode } from "react";

import reporter from "./reporter";
import { useChildrenWhere } from "./useChildrenWhere";

export type UseMaximumChildrenWhereOptions = {
    /**
     * An optional consumer-defined trace code that is prefixed to the thrown validation message.
     */
    traceCode?: string;
    /**
     * An optional human-readable child name that is included in the thrown validation message.
     */
    childName?: string;
};

/**
 * Returns the direct child elements that satisfy the provided predicate, or throws when more than the maximum count are found.
 *
 * @param children The React children value to inspect.
 * @param predicate A predicate that is called with each direct child element to determine whether it matches.
 * @param maximumCount The maximum number of matching direct child elements allowed.
 * @param options Optional reporting metadata used to derive the thrown validation message.
 * @returns The direct child elements that satisfy the provided predicate.
 */
export function useMaximumChildrenWhere<T extends ReactElement>(
    children: ReactNode,
    predicate: (element: ReactElement) => element is T,
    maximumCount: number,
    options?: UseMaximumChildrenWhereOptions
): T[];
export function useMaximumChildrenWhere(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean,
    maximumCount: number,
    options?: UseMaximumChildrenWhereOptions
): ReactElement[];
export function useMaximumChildrenWhere(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean,
    maximumCount: number,
    options?: UseMaximumChildrenWhereOptions
): ReactElement[] {
    const matchingChildren = useChildrenWhere(children, predicate);

    if (matchingChildren.length <= maximumCount) {
        return matchingChildren;
    }

    return reporter.fail("MAXIMUM_CHILDREN_WHERE_PREDICATE_FAILED", {
        traceCodePrefix: options?.traceCode ? `[${options.traceCode}] ` : "",
        childNameSegment: options?.childName ? ` for ${options.childName}` : "",
        actualCount: matchingChildren.length,
        actualCountPluralSuffix: matchingChildren.length === 1 ? "" : "ren",
        maximumCount
    });
}
