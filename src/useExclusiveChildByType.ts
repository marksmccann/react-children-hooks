import type { ElementType, ReactNode } from "react";

import isElementOfType from "./isElementOfType";
import type { ElementOfType, ValidationOptions } from "./types";
import useExclusiveChildMatching from "./useExclusiveChildMatching";

/**
 * Returns the only inspected child element when its React element type exactly matches the provided type, or throws when any other inspected child element exists or the sole inspected child does not match.
 *
 * @param children The React children value to inspect.
 * @param type The element or component type to match against the inspected child element.
 * @param options Optional reporting metadata used to derive the thrown validation message.
 * @returns The only inspected child element whose type matches the provided element type.
 */
export default function useExclusiveChildByType<T extends ElementType>(
    children: ReactNode,
    type: T,
    options?: ValidationOptions
): ElementOfType<T> {
    return useExclusiveChildMatching(
        children,
        (element): element is ElementOfType<T> =>
            isElementOfType(element, type),
        options
    );
}
