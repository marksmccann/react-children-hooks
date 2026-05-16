import { useMemo, type ReactNode } from "react";

import callbackChildrenToArray from "./callbackChildrenToArray";
import type { CallbackChild, CallbackChildren } from "./types";

/**
 * Returns the first direct callback child from the provided children value.
 *
 * @param children The direct children value to inspect.
 * @returns The first direct callback child, or `null` when no callback child is found.
 */
export default function useCallbackChild<
    TArguments extends unknown[] = [],
    TResult = ReactNode
>(
    children: CallbackChildren<TArguments, TResult>
): CallbackChild<TArguments, TResult> | null {
    return useMemo(
        () => callbackChildrenToArray(children)[0] ?? null,
        [children]
    );
}
