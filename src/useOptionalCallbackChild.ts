import { useMemo, type ReactNode } from "react";

import callbackChildrenToArray from "./callbackChildrenToArray";
import reporter from "./reporter";
import type {
    CallbackChild,
    CallbackChildren,
    ValidationOptions
} from "./types";

/**
 * Returns the optional direct callback child from the provided children value, or throws when more than one is found.
 *
 * @param children The direct children value to inspect.
 * @param options Optional reporting metadata used to derive the thrown validation message.
 * @returns The optional direct callback child from the provided children value, or `null` when none is found.
 */
export default function useOptionalCallbackChild<
    TArguments extends unknown[] = [],
    TResult = ReactNode
>(
    children: CallbackChildren<TArguments, TResult>,
    options?: ValidationOptions
): CallbackChild<TArguments, TResult> | null {
    const callbackChildren = useMemo(
        () => callbackChildrenToArray(children),
        [children]
    );

    if (callbackChildren.length <= 1) {
        return callbackChildren[0] ?? null;
    }

    return reporter.fail("OPTIONAL_CALLBACK_CHILD_FAILED", {
        traceCodePrefix: options?.traceCode ? `[${options.traceCode}] ` : "",
        childNameSegment: options?.childName ? ` for ${options.childName}` : "",
        actualCount: callbackChildren.length
    });
}
