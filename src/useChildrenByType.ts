import type { ElementType, ReactNode } from "react";

import { isElementOfType } from "./isElementOfType";
import type { ElementOfType } from "./types";
import { useChildrenMatching } from "./useChildrenMatching";

/**
 * Returns the direct child elements whose React element type exactly matches the provided type.
 *
 * @param children The React children value to inspect.
 * @param type The element or component type to match against each direct child element.
 * @returns An array of direct child elements whose type matches the provided element type.
 */
export function useChildrenByType<T extends ElementType>(
    children: ReactNode,
    type: T
): ElementOfType<T>[] {
    return useChildrenMatching(
        children,
        (element): element is ElementOfType<T> => isElementOfType(element, type)
    );
}
