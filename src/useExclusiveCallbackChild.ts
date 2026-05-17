import { useMemo, type ReactNode } from "react";

import callbackChildrenToArray from "./callbackChildrenToArray";
import callbackChildrenToValues from "./callbackChildrenToValues";
import reporter from "./reporter";
import type {
    CallbackChild,
    CallbackChildren,
    ValidationOptions
} from "./types";

/**
 * Returns the only direct child when it is a callback child, or throws when any other direct child exists or the sole direct child is not a callback.
 *
 * @param children The direct children value to inspect.
 * @param options Optional reporting metadata used to derive the thrown validation message.
 * @returns The only direct callback child from the provided children value.
 */
export default function useExclusiveCallbackChild<
    TArguments extends unknown[] = [],
    TResult = ReactNode
>(
    children: CallbackChildren<TArguments, TResult>,
    options?: ValidationOptions
): CallbackChild<TArguments, TResult> {
    const directChildrenCount = useMemo(
        () => callbackChildrenToValues(children),
        [children]
    );
    const callbackChildren = useMemo(
        () => callbackChildrenToArray(children),
        [children]
    );

    if (directChildrenCount === 1 && callbackChildren.length === 1) {
        return callbackChildren[0] as CallbackChild<TArguments, TResult>;
    }

    return reporter.fail("EXCLUSIVE_CALLBACK_CHILD_FAILED", {
        traceCodePrefix: options?.traceCode ? `[${options.traceCode}] ` : "",
        childNameSegment: options?.childName ? ` for ${options.childName}` : "",
        actualCount: directChildrenCount,
        actualCountPluralSuffix: directChildrenCount === 1 ? "" : "ren",
        callbackCount: callbackChildren.length,
        callbackCountPluralSuffix: callbackChildren.length === 1 ? "" : "ren"
    });
}
