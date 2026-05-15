import type { ElementType, ReactNode } from "react";

import { isElementOfType } from "./isElementOfType";
import {
    useRequiredChildWhere,
    type UseRequiredChildWhereOptions
} from "./useRequiredChildWhere";
import type { ElementOfType } from "./types";

/**
 * Returns the first direct child element whose React element type exactly matches the provided type, or throws when no match is found.
 *
 * @param children The React children value to inspect.
 * @param type The element or component type to match against each direct child element.
 * @param options Optional reporting metadata used to derive the thrown validation message.
 * @returns The first direct child element whose type matches the provided element type.
 */
export function useRequiredChildByType<T extends ElementType>(
    children: ReactNode,
    type: T,
    options?: UseRequiredChildWhereOptions
): ElementOfType<T> {
    return useRequiredChildWhere(
        children,
        (element): element is ElementOfType<T> =>
            isElementOfType(element, type),
        options
    );
}
