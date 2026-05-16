import type { ElementType, ReactNode } from "react";

import { isElementOfType } from "./isElementOfType";
import type { ElementOfType, QueryOptions } from "./types";
import { useChildMatching } from "./useChildMatching";

/**
 * Returns the first direct child element whose React element type exactly matches the provided type.
 *
 * @param children The React children value to inspect.
 * @param type The element or component type to match against each direct child element.
 * @param options Optional query metadata used to configure how child elements are inspected.
 * @returns The first direct child element whose type matches the provided element type, or `null` when no match is found.
 */
export function useChildByType<T extends ElementType>(
    children: ReactNode,
    type: T,
    options?: QueryOptions
): ElementOfType<T> | null {
    return useChildMatching(
        children,
        (element): element is ElementOfType<T> =>
            isElementOfType(element, type),
        options
    );
}
