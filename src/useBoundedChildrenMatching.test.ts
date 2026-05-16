import { renderHook } from "@testing-library/react";
import {
    createElement,
    Fragment,
    type ComponentProps,
    type PropsWithChildren,
    type ReactElement
} from "react";
import { describe, expect, it } from "vitest";

import reporter from "./reporter";
import useBoundedChildrenMatching from "./useBoundedChildrenMatching";

function ExampleComponent({
    children,
    role = "content"
}: PropsWithChildren<{ role?: string }>) {
    return createElement("section", { "data-role": role }, children);
}

function isButtonElement(
    element: ReactElement
): element is ReactElement<ComponentProps<"button">, "button"> {
    return element.type === "button";
}

describe("useBoundedChildrenMatching", () => {
    it("returns all matching direct children when the count is within the bounds", () => {
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-2" })
        ];

        const { result } = renderHook(() =>
            useBoundedChildrenMatching(
                children,
                (element) => element.type === "button",
                { minimum: 1, maximum: 3 }
            )
        );

        expect(result.current).toHaveLength(2);
        expect(
            result.current.every((element) => element.type === "button")
        ).toBe(true);
    });

    it("supports type-guard predicates with narrowed return types", () => {
        const children = [
            createElement("button", { key: "button-1", type: "button" }),
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-2", type: "submit" })
        ];

        const { result } = renderHook(() =>
            useBoundedChildrenMatching(children, isButtonElement, {
                minimum: 2,
                maximum: 2
            })
        );

        expect(result.current).toHaveLength(2);
        expect(result.current[1]?.props.type).toBe("submit");
    });

    it("returns matching custom component children when the count is within the bounds", () => {
        const children = [
            createElement(ExampleComponent, {
                key: "component-1",
                role: "trigger"
            }),
            createElement("div", { key: "div-1" }),
            createElement(ExampleComponent, {
                key: "component-2",
                role: "content"
            })
        ];

        const { result } = renderHook(() =>
            useBoundedChildrenMatching(
                children,
                (element) => element.type === ExampleComponent,
                { minimum: 1, maximum: 2 },
                { childName: "ExampleComponent" }
            )
        );

        expect(result.current).toHaveLength(2);
        expect(
            result.current.every((element) => element.type === ExampleComponent)
        ).toBe(true);
    });

    it("throws the generic validation message when fewer matches than the minimum are found", () => {
        const children = [createElement("button", { key: "button-1" })];

        expect(() =>
            renderHook(() =>
                useBoundedChildrenMatching(
                    children,
                    (element) => element.type === "button",
                    { minimum: 2, maximum: 3 }
                )
            )
        ).toThrow(
            reporter.message("BOUNDED_CHILDREN_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: "",
                actualCount: 1,
                actualCountPluralSuffix: "",
                minimumCount: 2,
                maximumCount: 3
            })
        );
    });

    it("throws the generic validation message when more matches than the maximum are found", () => {
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("button", { key: "button-2" }),
            createElement("button", { key: "button-3" })
        ];

        expect(() =>
            renderHook(() =>
                useBoundedChildrenMatching(
                    children,
                    (element) => element.type === "button",
                    { minimum: 1, maximum: 2 }
                )
            )
        ).toThrow(
            reporter.message("BOUNDED_CHILDREN_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: "",
                actualCount: 3,
                actualCountPluralSuffix: "ren",
                minimumCount: 1,
                maximumCount: 2
            })
        );
    });

    it("throws the trace-prefixed named validation message when options are provided", () => {
        const children = [createElement("button", { key: "button-1" })];

        expect(() =>
            renderHook(() =>
                useBoundedChildrenMatching(
                    children,
                    (element) => element.type === "button",
                    { minimum: 2, maximum: 3 },
                    {
                        traceCode: "DIALOG_ACTIONS_BOUNDED",
                        childName: "DialogAction"
                    }
                )
            )
        ).toThrow(
            reporter.message("BOUNDED_CHILDREN_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "[DIALOG_ACTIONS_BOUNDED] ",
                childNameSegment: " for DialogAction",
                actualCount: 1,
                actualCountPluralSuffix: "",
                minimumCount: 2,
                maximumCount: 3
            })
        );
    });

    it("only inspects direct children", () => {
        const children = [
            createElement(Fragment, {
                key: "fragment",
                children: [
                    createElement("button", { key: "nested-button-1" }),
                    createElement("button", { key: "nested-button-2" })
                ]
            }),
            createElement("button", { key: "direct-button-1" })
        ];

        expect(() =>
            renderHook(() =>
                useBoundedChildrenMatching(
                    children,
                    (element) => element.type === "button",
                    { minimum: 2, maximum: 3 },
                    { childName: "DialogAction" }
                )
            )
        ).toThrow(
            reporter.message("BOUNDED_CHILDREN_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: " for DialogAction",
                actualCount: 1,
                actualCountPluralSuffix: "",
                minimumCount: 2,
                maximumCount: 3
            })
        );
    });

    it("counts nested matches through the provided maximumDepth", () => {
        const children = [
            createElement(Fragment, {
                key: "fragment",
                children: [
                    createElement("button", { key: "nested-button-1" }),
                    createElement("button", { key: "nested-button-2" })
                ]
            }),
            createElement("button", { key: "direct-button-1" })
        ];

        const { result } = renderHook(() =>
            useBoundedChildrenMatching(
                children,
                (element) => element.type === "button",
                { minimum: 2, maximum: 3 },
                { maximumDepth: 1, childName: "DialogAction" }
            )
        );

        expect(result.current).toHaveLength(3);
    });

    it("throws the public reporter error when depth is invalid", () => {
        expect(() =>
            renderHook(() =>
                useBoundedChildrenMatching(
                    null,
                    (element) => element.type === "button",
                    { minimum: 1, maximum: 1 },
                    { depth: -1 }
                )
            )
        ).toThrow(reporter.message("RCH001"));
    });
});
