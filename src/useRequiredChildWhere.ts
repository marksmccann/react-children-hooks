import type { ReactElement, ReactNode } from "react";

import reporter from "./reporter";
import { useChildWhere } from "./useChildWhere";

export type UseRequiredChildWhereOptions = {
    /**
     * An optional consumer-defined trace code that is prefixed to the thrown validation message.
     */
    traceCode?: string;
    /**
     * An optional human-readable child name that is included in the thrown validation message.
     */
    childName?: string;
};

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
    options?: UseRequiredChildWhereOptions
): T;
export function useRequiredChildWhere(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean,
    options?: UseRequiredChildWhereOptions
): ReactElement;
export function useRequiredChildWhere(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean,
    options?: UseRequiredChildWhereOptions
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
