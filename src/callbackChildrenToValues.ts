import type { ReactNode } from "react";

import type { CallbackChildren } from "./types";

/**
 * Counts every direct child value from the provided children value.
 *
 * Arrays are flattened, but child values nested inside React elements are ignored.
 *
 * @param children The direct children value to inspect.
 * @returns The number of direct child values, including callback children.
 */
export default function callbackChildrenToValues<
    TArguments extends unknown[] = [],
    TResult = ReactNode
>(children: CallbackChildren<TArguments, TResult>): number {
    if (Array.isArray(children)) {
        return children.reduce(
            (count, child) =>
                count + callbackChildrenToValues<TArguments, TResult>(child),
            0
        );
    }

    if (
        children === undefined ||
        children === null ||
        typeof children === "boolean"
    ) {
        return 0;
    }

    return 1;
}
