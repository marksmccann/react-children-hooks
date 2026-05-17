import { useMemo, type ReactElement, type ReactNode } from "react";

import childrenToElements from "./childrenToElements";
import reporter from "./reporter";
import type { ValidationOptions } from "./types";

/**
 * Returns the only inspected child element when it satisfies the provided predicate, or throws when any other inspected child element exists or the sole inspected child does not match.
 *
 * @param children The React children value to inspect.
 * @param predicate A predicate that is called with each inspected child element to determine whether it matches.
 * @param options Optional reporting metadata used to derive the thrown validation message.
 * @returns The only inspected child element when it satisfies the provided predicate.
 */
function useExclusiveChildMatching<T extends ReactElement>(
    children: ReactNode,
    predicate: (element: ReactElement) => element is T,
    options?: ValidationOptions
): T;
function useExclusiveChildMatching(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean,
    options?: ValidationOptions
): ReactElement;
function useExclusiveChildMatching(
    children: ReactNode,
    predicate: (element: ReactElement) => boolean,
    options?: ValidationOptions
): ReactElement {
    const inspectedChildren = useMemo(
        () => childrenToElements(children, options),
        [children, options]
    );
    const matchingChildren = useMemo(
        () => inspectedChildren.filter(predicate),
        [inspectedChildren, predicate]
    );

    if (inspectedChildren.length === 1 && matchingChildren.length === 1) {
        return matchingChildren[0] as ReactElement;
    }

    return reporter.fail("EXCLUSIVE_CHILD_MATCHING_PREDICATE_FAILED", {
        traceCodePrefix: options?.traceCode ? `[${options.traceCode}] ` : "",
        childNameSegment: options?.childName ? ` for ${options.childName}` : "",
        actualCount: inspectedChildren.length,
        actualCountPluralSuffix: inspectedChildren.length === 1 ? "" : "ren",
        matchingCount: matchingChildren.length
    });
}

export default useExclusiveChildMatching;
