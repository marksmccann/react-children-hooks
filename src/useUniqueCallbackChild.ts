import { useMemo, type ReactNode } from "react";

import callbackChildrenToArray from "./callbackChildrenToArray";
import reporter from "./reporter";
import type {
    CallbackChild,
    CallbackChildren,
    ValidationOptions
} from "./types";

/**
 * Returns the only direct callback child from the provided children value, or throws when the match is not unique.
 *
 * @param children The direct children value to inspect.
 * @param options Optional reporting metadata used to derive the thrown validation message.
 * @returns The only direct callback child from the provided children value.
 */
export default function useUniqueCallbackChild<
    TArguments extends unknown[] = [],
    TResult = ReactNode
>(
    children: CallbackChildren<TArguments, TResult>,
    options?: ValidationOptions
): CallbackChild<TArguments, TResult> {
    const callbackChildren = useMemo(
        () => callbackChildrenToArray(children),
        [children]
    );

    if (callbackChildren.length === 1) {
        return callbackChildren[0] as CallbackChild<TArguments, TResult>;
    }

    return reporter.fail("UNIQUE_CALLBACK_CHILD_FAILED", {
        traceCodePrefix: options?.traceCode ? `[${options.traceCode}] ` : "",
        childNameSegment: options?.childName ? ` for ${options.childName}` : "",
        actualCount: callbackChildren.length
    });
}
