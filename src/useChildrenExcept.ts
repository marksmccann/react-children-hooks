import { useMemo, type ReactElement, type ReactNode } from "react";

import childrenToElements from "./childrenToElements";
import type { QueryOptions } from "./types";

type ExcludedChild = ReactElement | null | undefined;
type ExcludedChildrenInput = ExcludedChild | readonly ExcludedChild[];

/**
 * Normalizes the excluded children input into a compact array of React elements.
 *
 * Nullish values are ignored so results from optional child hooks can be passed directly.
 *
 * @param excludedChildren The child element input to normalize.
 * @returns A filtered array containing only excluded React elements.
 */
function toExcludedChildrenArray(
    excludedChildren: ExcludedChildrenInput
): ReactElement[] {
    if (excludedChildren == null) {
        return [];
    }

    if (Array.isArray(excludedChildren)) {
        return excludedChildren.filter(
            (child): child is ReactElement => child != null
        );
    }

    return [excludedChildren as ReactElement];
}

/**
 * Determines whether two React elements should be treated as the same inspected child.
 *
 * This compares the stable normalized identity used by this hook so child elements returned from
 * other hooks can be excluded reliably after React normalizes them through `Children.toArray`.
 *
 * @param candidate The inspected child element being considered for inclusion.
 * @param excludedChild The excluded child element to compare against.
 * @returns `true` when both elements represent the same inspected child; otherwise `false`.
 */
function areEquivalentElements(
    candidate: ReactElement,
    excludedChild: ReactElement
): boolean {
    return (
        candidate.type === excludedChild.type &&
        candidate.props === excludedChild.props
    );
}

/**
 * Returns the inspected child elements except the provided child elements.
 *
 * Excluded child elements are matched by their normalized React element identity so values returned from other hooks can be passed directly.
 *
 * @param children The React children value to inspect.
 * @param excludedChildren The inspected child element or elements to exclude from the result.
 * @param options Optional query metadata used to configure how child elements are inspected.
 * @returns An array of inspected child elements excluding the provided child elements.
 */
export default function useChildrenExcept(
    children: ReactNode,
    excludedChildren: ExcludedChildrenInput,
    options?: QueryOptions
): ReactElement[] {
    return useMemo(() => {
        const inspectedChildren = childrenToElements(children, options);
        const remainingExcludedChildren =
            toExcludedChildrenArray(excludedChildren);

        return inspectedChildren.filter((candidate) => {
            const excludedIndex = remainingExcludedChildren.findIndex(
                (excludedChild) =>
                    areEquivalentElements(candidate, excludedChild)
            );

            if (excludedIndex === -1) {
                return true;
            }

            remainingExcludedChildren.splice(excludedIndex, 1);

            return false;
        });
    }, [children, excludedChildren, options]);
}
