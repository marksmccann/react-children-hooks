import { useMemo, type ReactNode } from "react";

import type { CallbackChild, CallbackChildren } from "./types";

function findFirstCallbackChild<TArguments extends unknown[], TResult>(
    children: CallbackChildren<TArguments, TResult>
): CallbackChild<TArguments, TResult> | null {
    if (typeof children === "function") {
        return children;
    }

    if (!Array.isArray(children)) {
        return null;
    }

    for (const child of children) {
        const callbackChild = findFirstCallbackChild<TArguments, TResult>(
            child
        );

        if (callbackChild) {
            return callbackChild;
        }
    }

    return null;
}

/**
 * Returns the first direct callback child from the provided children value.
 *
 * @param children The direct children value to inspect.
 * @returns The first direct callback child, or `null` when no callback child is found.
 */
export function useCallbackChild<
    TArguments extends unknown[] = [],
    TResult = ReactNode
>(
    children: CallbackChildren<TArguments, TResult>
): CallbackChild<TArguments, TResult> | null {
    return useMemo(() => findFirstCallbackChild(children), [children]);
}
