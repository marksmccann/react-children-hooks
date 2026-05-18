import { type ElementType, type ReactNode } from "react";

import isElementOfType from "./isElementOfType";
import type { DeprecationOptions } from "./types";
import useDeprecatedChildMatching from "./useDeprecatedChildMatching";

/**
 * Resolves a readable React element type label for diagnostics.
 *
 * @param type The React element or component type to describe.
 * @returns A readable type label for the provided element type.
 */
function getElementTypeDisplayName(type: ElementType): string {
    if (typeof type === "string") return type;
    return type.displayName || type.name || "AnonymousComponent";
}

/**
 * Determines whether any inspected child element whose React element type exactly matches the provided type exists and emits a deprecation warning when one is found.
 *
 * _Note: Warnings are emitted at most once per unique deprecation configuration for the life of the current module instance._
 *
 * @param children The React children value to inspect.
 * @param type The element or component type to match against each inspected child element.
 * @param options The deprecation guidance and optional traversal metadata used to inspect children and resolve the warning message.
 * @returns `true` when at least one inspected child element whose type matches the provided element type exists; otherwise `false`.
 */
export default function useDeprecatedChildByType<T extends ElementType>(
    children: ReactNode,
    type: T,
    options: DeprecationOptions
): boolean {
    const resolvedChildName =
        options.childName || getElementTypeDisplayName(type);

    return useDeprecatedChildMatching(
        children,
        (element) => isElementOfType(element, type),
        {
            ...options,
            childName: resolvedChildName
        }
    );
}
