import { type ReactNode } from "react";

import reporter from "./reporter";
import type {
    CallbackChild,
    CallbackChildren,
    ValidationOptions
} from "./types";
import { useCallbackChild } from "./useCallbackChild";

/**
 * Returns the first direct callback child from the provided children value, or throws when none is found.
 *
 * @param children The direct children value to inspect.
 * @param options Optional reporting metadata used to derive the thrown validation message.
 * @returns The first direct callback child from the provided children value.
 */
export function useRequiredCallbackChild<
    TArguments extends unknown[] = [],
    TResult = ReactNode
>(
    children: CallbackChildren<TArguments, TResult>,
    options?: ValidationOptions
): CallbackChild<TArguments, TResult> {
    const callbackChild = useCallbackChild(children);

    if (callbackChild !== null) {
        return callbackChild;
    }

    return reporter.fail("REQUIRED_CALLBACK_CHILD_FAILED", {
        traceCodePrefix: options?.traceCode ? `[${options.traceCode}] ` : "",
        childNameSegment: options?.childName ? ` for ${options.childName}` : ""
    });
}
