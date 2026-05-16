import { useMemo, type ReactElement, type ReactNode } from "react";

import childrenToElements from "./childrenToElements";
import type { QueryOptions } from "./types";

/**
 * Returns the direct child elements that satisfy the provided predicate.
 *
 * @param children The React children value to inspect.
 * @param predicate A predicate that is called with each direct child element to determine whether it should be included in the result.
 * @param options Optional query metadata used to configure how child elements are inspected.
 * @returns An array of direct child elements that satisfy the provided predicate.
 */
function useChildrenMatching<T extends ReactElement>(
    children: ReactNode,
    predicate: (element: ReactElement) => element is T,
    options?: QueryOptions
): T[];
function useChildrenMatching(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean,
    options?: QueryOptions
): ReactElement[];
function useChildrenMatching(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean,
    options?: QueryOptions
): ReactElement[] {
    return useMemo(
        () => childrenToElements(children, options).filter(predicate),
        [children, options, predicate]
    );
}

export default useChildrenMatching;
