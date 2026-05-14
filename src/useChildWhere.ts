import { useMemo, type ReactElement, type ReactNode } from "react";

import { childrenToElements } from "./childrenToElements";

/**
 * Returns the first direct child element that satisfies the provided predicate.
 *
 * @param children The React children value to inspect.
 * @param predicate A predicate that is called with each direct child element to determine whether it matches.
 * @returns The first direct child element that satisfies the provided predicate, or `null` when no match is found.
 */
export function useChildWhere<T extends ReactElement>(
    children: ReactNode,
    predicate: (element: ReactElement) => element is T
): T | null;
export function useChildWhere(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean
): ReactElement | null;
export function useChildWhere(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean
): ReactElement | null {
    return useMemo(
        () => childrenToElements(children).find(predicate) ?? null,
        [children, predicate]
    );
}
