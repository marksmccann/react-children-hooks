import type { ElementType, ReactNode } from "react";

import { isElementOfType } from "./isElementOfType";
import { useChildWhere } from "./useChildWhere";
import type { ElementOfType } from "./types";

/**
 * Returns the first direct child element whose React element type exactly matches the provided type.
 *
 * @param children The React children value to inspect.
 * @param type The element or component type to match against each direct child element.
 * @returns The first direct child element whose type matches the provided element type, or `null` when no match is found.
 */
export function useChildByType<T extends ElementType>(
    children: ReactNode,
    type: T
): ElementOfType<T> | null {
    return useChildWhere(children, (element): element is ElementOfType<T> =>
        isElementOfType(element, type)
    );
}
