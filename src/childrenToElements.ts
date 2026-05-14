import { Children, type ReactElement, type ReactNode } from "react";

import { isReactElement } from "./isReactElement";

/**
 * Normalizes a React children value into an array containing only valid direct child elements.
 *
 * @param children The React children value to normalize.
 * @returns An array of valid React elements from the provided direct children.
 */
export function childrenToElements(children: ReactNode): ReactElement[] {
    return Children.toArray(children).filter(isReactElement);
}
