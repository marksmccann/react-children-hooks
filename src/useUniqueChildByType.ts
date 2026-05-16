import type { ElementType, ReactNode } from "react";

import isElementOfType from "./isElementOfType";
import type { ElementOfType, ValidationOptions } from "./types";
import useUniqueChildMatching from "./useUniqueChildMatching";

/**
 * Returns the only direct child element whose React element type exactly matches the provided type, or throws when the match is not unique.
 *
 * @param children The React children value to inspect.
 * @param type The element or component type to match against each direct child element.
 * @param options Optional reporting metadata used to derive the thrown validation message.
 * @returns The only direct child element whose type matches the provided element type.
 */
export default function useUniqueChildByType<T extends ElementType>(
    children: ReactNode,
    type: T,
    options?: ValidationOptions
): ElementOfType<T> {
    return useUniqueChildMatching(
        children,
        (element): element is ElementOfType<T> =>
            isElementOfType(element, type),
        options
    );
}
