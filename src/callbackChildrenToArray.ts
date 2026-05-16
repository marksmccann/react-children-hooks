import type { ReactNode } from "react";

import type { CallbackChild, CallbackChildren } from "./types";

/**
 * Collects direct callback children from the provided children value.
 *
 * Arrays are flattened, but callback values nested inside React elements are ignored.
 *
 * @param children The direct children value to inspect.
 * @returns An array of direct callback children.
 */
export default function callbackChildrenToArray<
    TArguments extends unknown[] = [],
    TResult = ReactNode
>(
    children: CallbackChildren<TArguments, TResult>
): CallbackChild<TArguments, TResult>[] {
    if (typeof children === "function") {
        return [children];
    }

    if (!Array.isArray(children)) {
        return [];
    }

    return children.flatMap((child) =>
        callbackChildrenToArray<TArguments, TResult>(child)
    );
}
