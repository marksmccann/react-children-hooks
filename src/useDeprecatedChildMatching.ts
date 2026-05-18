import { useEffect, type ReactElement, type ReactNode } from "react";

import reporter from "./reporter";
import type { DeprecationOptions } from "./types";
import useHasChildMatching from "./useHasChildMatching";

/**
 * Determines whether any inspected child element satisfies the provided predicate and emits a deprecation warning when one is found.
 *
 * _Note: Warnings are emitted at most once per unique deprecation configuration for the life of the current module instance._
 *
 * @param children The React children value to inspect.
 * @param predicate A predicate that is called with each inspected child element to determine whether it is deprecated.
 * @param options The deprecation guidance and optional traversal metadata used to inspect children and resolve the warning message.
 * @returns `true` when at least one inspected child element satisfies the predicate; otherwise `false`.
 */
function useDeprecatedChildMatching<T extends ReactElement>(
    children: ReactNode,
    predicate: (element: ReactElement) => element is T,
    options: DeprecationOptions
): boolean;
function useDeprecatedChildMatching(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean,
    options: DeprecationOptions
): boolean;
function useDeprecatedChildMatching(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean,
    options: DeprecationOptions
): boolean {
    const hasDeprecatedChild = useHasChildMatching(
        children,
        predicate,
        options
    );

    useEffect(() => {
        if (!hasDeprecatedChild) {
            return;
        }

        reporter.warnOnce("DEPRECATED_CHILD_MATCHING_WARNING", {
            traceCodePrefix: options.traceCode ? `[${options.traceCode}] ` : "",
            childNameSegment: options.childName
                ? ` for ${options.childName}`
                : "",
            deprecationMessage: options.message
        });
    }, [hasDeprecatedChild, options]);

    return hasDeprecatedChild;
}

export default useDeprecatedChildMatching;
