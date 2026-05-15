import type { ElementType, ReactNode } from "react";

import { isElementOfType } from "./isElementOfType";
import type { ElementOfType, ValidationOptions } from "./types";
import { useOptionalChildMatching } from "./useOptionalChildMatching";

/**
 * Returns the optional direct child element whose React element type exactly matches the provided type, or throws when more than one match is found.
 *
 * @param children The React children value to inspect.
 * @param type The element or component type to match against each direct child element.
 * @param options Optional reporting metadata used to derive the thrown validation message.
 * @returns The optional direct child element whose type matches the provided element type, or `null` when no match is found.
 */
export function useOptionalChildByType<T extends ElementType>(
    children: ReactNode,
    type: T,
    options?: ValidationOptions
): ElementOfType<T> | null {
    return useOptionalChildMatching(
        children,
        (element): element is ElementOfType<T> =>
            isElementOfType(element, type),
        options
    );
}
