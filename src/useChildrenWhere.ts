import { useMemo, type ReactElement, type ReactNode } from "react";

import { childrenToElements } from "./childrenToElements";

/**
 * Returns the direct child elements that satisfy the provided predicate.
 *
 * @param children The React children value to inspect.
 * @param predicate A predicate that is called with each direct child element to determine whether it should be included in the result.
 * @returns An array of direct child elements that satisfy the provided predicate.
 */
export function useChildrenWhere<T extends ReactElement>(
    children: ReactNode,
    predicate: (element: ReactElement) => element is T
): T[];
export function useChildrenWhere(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean
): ReactElement[];
export function useChildrenWhere(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean
): ReactElement[] {
    return useMemo(
        () => childrenToElements(children).filter(predicate),
        [children, predicate]
    );
}
