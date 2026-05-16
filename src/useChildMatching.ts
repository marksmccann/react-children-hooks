import { useMemo, type ReactElement, type ReactNode } from "react";

import { childrenToElements } from "./childrenToElements";
import type { QueryOptions } from "./types";

/**
 * Returns the first direct child element that satisfies the provided predicate.
 *
 * @param children The React children value to inspect.
 * @param predicate A predicate that is called with each direct child element to determine whether it matches.
 * @param options Optional query metadata used to configure how child elements are inspected.
 * @returns The first direct child element that satisfies the provided predicate, or `null` when no match is found.
 */
export function useChildMatching<T extends ReactElement>(
    children: ReactNode,
    predicate: (element: ReactElement) => element is T,
    options?: QueryOptions
): T | null;
export function useChildMatching(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean,
    options?: QueryOptions
): ReactElement | null;
export function useChildMatching(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean,
    options?: QueryOptions
): ReactElement | null {
    return useMemo(
        () => childrenToElements(children, options).find(predicate) ?? null,
        [children, options, predicate]
    );
}
