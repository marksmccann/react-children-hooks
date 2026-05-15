import type { ElementType, ReactNode } from "react";

import { isElementOfType } from "./isElementOfType";
import type {
    ChildrenCountBounds,
    ElementOfType,
    ValidationOptions
} from "./types";
import { useBoundedChildrenMatching } from "./useBoundedChildrenMatching";

/**
 * Returns the direct child elements whose React element type exactly matches the provided type, or throws when the count falls outside the inclusive bounds.
 *
 * @param children The React children value to inspect.
 * @param type The element or component type to match against each direct child element.
 * @param bounds The inclusive minimum and maximum number of matching direct child elements allowed.
 * @param options Optional reporting metadata used to derive the thrown validation message.
 * @returns The direct child elements whose type matches the provided element type.
 */
export function useBoundedChildrenByType<T extends ElementType>(
    children: ReactNode,
    type: T,
    bounds: ChildrenCountBounds,
    options?: ValidationOptions
): ElementOfType<T>[] {
    return useBoundedChildrenMatching(
        children,
        (element): element is ElementOfType<T> =>
            isElementOfType(element, type),
        bounds,
        options
    );
}
