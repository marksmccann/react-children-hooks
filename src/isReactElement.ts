import { isValidElement, type ReactElement, type ReactNode } from "react";

/**
 * Determines whether a React node is a valid React element.
 *
 * @param node The React node to check.
 * @returns `true` when the node is a valid React element; otherwise `false`.
 */
export function isReactElement(node: ReactNode): node is ReactElement {
    return isValidElement(node);
}
