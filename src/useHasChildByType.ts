import type { ElementType, ReactNode } from "react";

import isElementOfType from "./isElementOfType";
import type { QueryOptions } from "./types";
import useHasChildMatching from "./useHasChildMatching";

/**
 * Determines whether any direct child element whose React element type exactly matches the provided type exists.
 *
 * @param children The React children value to inspect.
 * @param type The element or component type to match against each direct child element.
 * @param options Optional query metadata used to configure how child elements are inspected.
 * @returns `true` when at least one direct child element whose type matches the provided element type exists; otherwise `false`.
 */
export default function useHasChildByType<T extends ElementType>(
    children: ReactNode,
    type: T,
    options?: QueryOptions
): boolean {
    return useHasChildMatching(
        children,
        (element) => isElementOfType(element, type),
        options
    );
}
