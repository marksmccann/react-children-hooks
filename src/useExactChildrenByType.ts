import type { ElementType, ReactNode } from "react";

import { isElementOfType } from "./isElementOfType";
import {
    useExactChildrenWhere,
    type UseExactChildrenWhereOptions
} from "./useExactChildrenWhere";
import type { ElementOfType } from "./types";

/**
 * Returns the direct child elements whose React element type exactly matches the provided type, or throws when the exact count is not met.
 *
 * @param children The React children value to inspect.
 * @param type The element or component type to match against each direct child element.
 * @param exactCount The exact number of matching direct child elements required.
 * @param options Optional reporting metadata used to derive the thrown validation message.
 * @returns The direct child elements whose type matches the provided element type.
 */
export function useExactChildrenByType<T extends ElementType>(
    children: ReactNode,
    type: T,
    exactCount: number,
    options?: UseExactChildrenWhereOptions
): ElementOfType<T>[] {
    return useExactChildrenWhere(
        children,
        (element): element is ElementOfType<T> =>
            isElementOfType(element, type),
        exactCount,
        options
    );
}
