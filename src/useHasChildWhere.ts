import { useMemo, type ReactElement, type ReactNode } from "react";

import { childrenToElements } from "./childrenToElements";

/**
 * Determines whether any direct child element satisfies the provided predicate.
 *
 * @param children The React children value to inspect.
 * @param predicate A predicate that is called with each direct child element to determine whether it matches.
 * @returns `true` when at least one direct child element satisfies the provided predicate; otherwise `false`.
 */
export function useHasChildWhere<T extends ReactElement>(
    children: ReactNode,
    predicate: (element: ReactElement) => element is T
): boolean;
export function useHasChildWhere(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean
): boolean;
export function useHasChildWhere(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean
): boolean {
    return useMemo(
        () => childrenToElements(children).some(predicate),
        [children, predicate]
    );
}
