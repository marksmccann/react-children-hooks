import { renderHook } from "@testing-library/react";
import { createElement, Fragment, type PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";

import reporter from "./reporter";
import useBoundedChildrenByType from "./useBoundedChildrenByType";

function ExampleComponent({ children }: PropsWithChildren) {
    return createElement("section", null, children);
}

describe("useBoundedChildrenByType", () => {
    it("returns all matching direct children when the count is within the bounds", () => {
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-2" })
        ];

        const { result } = renderHook(() =>
            useBoundedChildrenByType(children, "button", {
                minimum: 1,
                maximum: 3
            })
        );

        expect(result.current).toHaveLength(2);
        expect(
            result.current.every((element) => element.type === "button")
        ).toBe(true);
    });

    it("returns matching custom component children when the count is within the bounds", () => {
        const children = [
            createElement(ExampleComponent, { key: "component-1" }),
            createElement("div", { key: "div-1" }),
            createElement(ExampleComponent, { key: "component-2" })
        ];

        const { result } = renderHook(() =>
            useBoundedChildrenByType(children, ExampleComponent, {
                minimum: 1,
                maximum: 2
            })
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
                useBoundedChildrenByType(children, "button", {
                    minimum: 2,
                    maximum: 3
                })
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

    it("throws the named validation message when options are provided", () => {
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("button", { key: "button-2" }),
            createElement("button", { key: "button-3" })
        ];

        expect(() =>
            renderHook(() =>
                useBoundedChildrenByType(
                    children,
                    "button",
                    { minimum: 1, maximum: 2 },
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
                actualCount: 3,
                actualCountPluralSuffix: "ren",
                minimumCount: 1,
                maximumCount: 2
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
                useBoundedChildrenByType(
                    children,
                    "button",
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
            useBoundedChildrenByType(
                children,
                "button",
                {
                    minimum: 2,
                    maximum: 3
                },
                {
                    maximumDepth: 1,
                    childName: "DialogAction"
                }
            )
        );

        expect(result.current).toHaveLength(3);
    });
});
