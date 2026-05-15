import type { ReactElement, ReactNode } from "react";

import reporter from "./reporter";
import type { ValidationOptions } from "./types";
import { useChildWhere } from "./useChildWhere";

/**
 * Returns the first direct child element that satisfies the provided predicate, or throws when no match is found.
 *
 * @param children The React children value to inspect.
 * @param predicate A predicate that is called with each direct child element to determine whether it matches.
 * @param options Optional reporting metadata used to derive the thrown validation message.
 * @returns The first direct child element that satisfies the provided predicate.
 */
export function useRequiredChildWhere<T extends ReactElement>(
    children: ReactNode,
    predicate: (element: ReactElement) => element is T,
    options?: ValidationOptions
): T;
export function useRequiredChildWhere(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean,
    options?: ValidationOptions
): ReactElement;
export function useRequiredChildWhere(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean,
    options?: ValidationOptions
): ReactElement {
    const child = useChildWhere(children, predicate);

    if (child !== null) {
        return child;
    }

    return reporter.fail("REQUIRED_CHILD_WHERE_PREDICATE_FAILED", {
        traceCodePrefix: options?.traceCode ? `[${options.traceCode}] ` : "",
        childNameSegment: options?.childName ? ` for ${options.childName}` : ""
    });
}
