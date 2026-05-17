import type { ReactElement, ReactNode } from "react";

import reporter from "./reporter";
import type { ValidationOptions } from "./types";
import useChildrenMatching from "./useChildrenMatching";

/**
 * Returns the only direct child element that satisfies the provided predicate, or throws when the match count is not exactly one.
 *
 * @param children The React children value to inspect.
 * @param predicate A predicate that is called with each direct child element to determine whether it matches.
 * @param options Optional reporting metadata used to derive the thrown validation message.
 * @returns The only direct child element that satisfies the provided predicate.
 */
function useOnlyChildMatching<T extends ReactElement>(
    children: ReactNode,
    predicate: (element: ReactElement) => element is T,
    options?: ValidationOptions
): T;
function useOnlyChildMatching(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean,
    options?: ValidationOptions
): ReactElement;
function useOnlyChildMatching(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean,
    options?: ValidationOptions
): ReactElement {
    const matchingChildren = useChildrenMatching(children, predicate, options);

    if (matchingChildren.length === 1) {
        return matchingChildren[0] as ReactElement;
    }

    return reporter.fail("ONLY_CHILD_MATCHING_PREDICATE_FAILED", {
        traceCodePrefix: options?.traceCode ? `[${options.traceCode}] ` : "",
        childNameSegment: options?.childName ? ` for ${options.childName}` : "",
        actualCount: matchingChildren.length,
        actualCountPluralSuffix: matchingChildren.length === 1 ? "" : "ren"
    });
}

export default useOnlyChildMatching;
