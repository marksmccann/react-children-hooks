import type { ElementType, ReactNode } from "react";

import { isElementOfType } from "./isElementOfType";
import {
    useMaximumChildrenWhere,
    type UseMaximumChildrenWhereOptions
} from "./useMaximumChildrenWhere";
import type { ElementOfType } from "./types";

/**
 * Returns the direct child elements whose React element type exactly matches the provided type, or throws when more than the maximum count are found.
 *
 * @param children The React children value to inspect.
 * @param type The element or component type to match against each direct child element.
 * @param maximumCount The maximum number of matching direct child elements allowed.
 * @param options Optional reporting metadata used to derive the thrown validation message.
 * @returns The direct child elements whose type matches the provided element type.
 */
export function useMaximumChildrenByType<T extends ElementType>(
    children: ReactNode,
    type: T,
    maximumCount: number,
    options?: UseMaximumChildrenWhereOptions
): ElementOfType<T>[] {
    return useMaximumChildrenWhere(
        children,
        (element): element is ElementOfType<T> =>
            isElementOfType(element, type),
        maximumCount,
        options
    );
}
