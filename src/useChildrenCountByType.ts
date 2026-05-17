import type { ElementType, ReactNode } from "react";

import isElementOfType from "./isElementOfType";
import type { QueryOptions } from "./types";
import useChildrenCountMatching from "./useChildrenCountMatching";

/**
 * Returns the number of direct child elements whose React element type exactly matches the provided type.
 *
 * @param children The React children value to inspect.
 * @param type The element or component type to match against each direct child element.
 * @param options Optional query metadata used to configure how child elements are inspected.
 * @returns The number of direct child elements whose type matches the provided element type.
 */
export default function useChildrenCountByType<T extends ElementType>(
    children: ReactNode,
    type: T,
    options?: QueryOptions
): number {
    return useChildrenCountMatching(
        children,
        (element) => isElementOfType(element, type),
        options
    );
}
