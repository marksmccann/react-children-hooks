import type { ElementType, ReactNode } from "react";

import isElementOfType from "./isElementOfType";
import type { ElementOfType, ValidationOptions } from "./types";
import useMinimumChildrenMatching from "./useMinimumChildrenMatching";

/**
 * Returns the direct child elements whose React element type exactly matches the provided type, or throws when fewer than the minimum count are found.
 *
 * @param children The React children value to inspect.
 * @param type The element or component type to match against each direct child element.
 * @param minimumCount The minimum number of matching direct child elements required.
 * @param options Optional reporting metadata used to derive the thrown validation message.
 * @returns The direct child elements whose type matches the provided element type.
 */
export default function useMinimumChildrenByType<T extends ElementType>(
    children: ReactNode,
    type: T,
    minimumCount: number,
    options?: ValidationOptions
): ElementOfType<T>[] {
    return useMinimumChildrenMatching(
        children,
        (element): element is ElementOfType<T> =>
            isElementOfType(element, type),
        minimumCount,
        options
    );
}
