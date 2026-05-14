import type { ReactElement, ReactNode } from "react";

import reporter from "./reporter";
import { useChildrenWhere } from "./useChildrenWhere";

export type UseExactChildrenWhereOptions = {
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
 * Returns the direct child elements that satisfy the provided predicate, or throws when the exact count is not met.
 *
 * @param children The React children value to inspect.
 * @param predicate A predicate that is called with each direct child element to determine whether it matches.
 * @param exactCount The exact number of matching direct child elements required.
 * @param options Optional reporting metadata used to derive the thrown validation message.
 * @returns The direct child elements that satisfy the provided predicate.
 */
export function useExactChildrenWhere<T extends ReactElement>(
    children: ReactNode,
    predicate: (element: ReactElement) => element is T,
    exactCount: number,
    options?: UseExactChildrenWhereOptions
): T[];
export function useExactChildrenWhere(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean,
    exactCount: number,
    options?: UseExactChildrenWhereOptions
): ReactElement[];
export function useExactChildrenWhere(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean,
    exactCount: number,
    options?: UseExactChildrenWhereOptions
): ReactElement[] {
    const matchingChildren = useChildrenWhere(children, predicate);

    if (matchingChildren.length === exactCount) {
        return matchingChildren;
    }

    return reporter.fail("EXACT_CHILDREN_WHERE_PREDICATE_FAILED", {
        traceCodePrefix: options?.traceCode ? `[${options.traceCode}] ` : "",
        childNameSegment: options?.childName ? ` for ${options.childName}` : "",
        actualCount: matchingChildren.length,
        actualCountPluralSuffix: matchingChildren.length === 1 ? "" : "ren",
        exactCount
    });
}
