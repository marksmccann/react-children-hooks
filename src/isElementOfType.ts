import type { ElementType, ReactElement } from "react";

import type { ElementOfType } from "./types";

/**
 * Determines whether a React element exactly matches the provided element or component type.
 *
 * @param element The React element to compare.
 * @param type The element or component type to match.
 * @returns `true` when the element's type exactly matches the provided type; otherwise `false`.
 */
export default function isElementOfType<T extends ElementType>(
    element: ReactElement,
    type: T
): element is ElementOfType<T> {
    return element.type === type;
}
