import { Children, type ReactElement, type ReactNode } from "react";

import { isReactElement } from "./isReactElement";
import reporter from "./reporter";
import type { TraversalOptions } from "./types";

/**
 * Normalizes traversal bounds and validates that the provided options define a valid inclusive depth range.
 *
 * @param options Optional traversal bounds supplied to an element-inspection API.
 * @returns The normalized inclusive traversal bounds, defaulting to direct children only when omitted.
 */
function getTraversalBounds(options?: TraversalOptions): {
    depth: number;
    maximumDepth: number;
} {
    const depth = options?.depth ?? 0;
    const maximumDepth = options?.maximumDepth ?? 0;

    if (!Number.isInteger(depth) || depth < 0) {
        return reporter.fail("RCH001");
    }

    if (!Number.isInteger(maximumDepth) || maximumDepth < 0) {
        return reporter.fail("RCH002");
    }

    if (depth > maximumDepth) {
        return reporter.fail("RCH003");
    }

    return { depth, maximumDepth };
}

/**
 * Recursively collects valid React child elements within the provided inclusive depth range.
 *
 * @param children The React children value to inspect at the current traversal level.
 * @param currentDepth The zero-based depth of the current traversal level, where `0` represents direct children.
 * @param depth The minimum inclusive child depth to include in the collected results.
 * @param maximumDepth The maximum inclusive child depth to include in the collected results.
 * @returns An array of valid React elements collected from the current level and any eligible descendant levels.
 */
function collectElementsAtDepth(
    children: ReactNode,
    currentDepth: number,
    depth: number,
    maximumDepth: number
): ReactElement[] {
    const directElements = Children.toArray(children).filter(isReactElement);
    let elements: ReactElement[] = [];

    if (currentDepth >= depth && currentDepth <= maximumDepth) {
        elements = [...directElements];
    }

    for (const element of directElements) {
        const elementProps = element.props as { children?: ReactNode };
        const elementsAtDepth = collectElementsAtDepth(
            elementProps.children,
            currentDepth + 1,
            depth,
            maximumDepth
        );

        elements.push(...elementsAtDepth);
    }

    return elements;
}

/**
 * Normalizes a React children value into an array containing valid child elements within the configured depth range.
 *
 * @param children The React children value to normalize.
 * @param options Optional traversal bounds that control which child depths are included.
 * @returns An array of valid React elements from the provided child depths.
 */
export function childrenToElements(
    children: ReactNode,
    options?: TraversalOptions
): ReactElement[] {
    const { depth, maximumDepth } = getTraversalBounds(options);

    return collectElementsAtDepth(children, 0, depth, maximumDepth);
}
