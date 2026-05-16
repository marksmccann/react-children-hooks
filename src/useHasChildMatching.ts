import { useMemo, type ReactElement, type ReactNode } from "react";

import { childrenToElements } from "./childrenToElements";
import type { QueryOptions } from "./types";

/**
 * Determines whether any direct child element satisfies the provided predicate.
 *
 * @param children The React children value to inspect.
 * @param predicate A predicate that is called with each direct child element to determine whether it matches.
 * @param options Optional query metadata used to configure how child elements are inspected.
 * @returns `true` when at least one direct child element satisfies the provided predicate; otherwise `false`.
 */
export function useHasChildMatching<T extends ReactElement>(
    children: ReactNode,
    predicate: (element: ReactElement) => element is T,
    options?: QueryOptions
): boolean;
export function useHasChildMatching(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean,
    options?: QueryOptions
): boolean;
export function useHasChildMatching(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean,
    options?: QueryOptions
): boolean {
    return useMemo(
        () => childrenToElements(children, options).some(predicate),
        [children, options, predicate]
    );
}
