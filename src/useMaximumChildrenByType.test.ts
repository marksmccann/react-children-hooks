import { renderHook } from "@testing-library/react";
import { createElement, Fragment, type PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";

import reporter from "./reporter";
import { useMaximumChildrenByType } from "./useMaximumChildrenByType";

function ExampleComponent({ children }: PropsWithChildren) {
    return createElement("section", null, children);
}

describe("useMaximumChildrenByType", () => {
    it("returns all matching direct children when the maximum count is satisfied", () => {
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-2" })
        ];

        const { result } = renderHook(() =>
            useMaximumChildrenByType(children, "button", 2)
        );

        expect(result.current).toHaveLength(2);
        expect(
            result.current.every((element) => element.type === "button")
        ).toBe(true);
    });

    it("returns matching custom component children when the maximum count is satisfied", () => {
        const children = [
            createElement(ExampleComponent, { key: "component-1" }),
            createElement("div", { key: "div-1" }),
            createElement(ExampleComponent, { key: "component-2" })
        ];

        const { result } = renderHook(() =>
            useMaximumChildrenByType(children, ExampleComponent, 2, {
                childName: "ExampleComponent"
            })
        );

        expect(result.current).toHaveLength(2);
        expect(
            result.current.every((element) => element.type === ExampleComponent)
        ).toBe(true);
    });

    it("throws the generic validation message when the maximum count is exceeded", () => {
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("button", { key: "button-2" })
        ];

        expect(() =>
            renderHook(() => useMaximumChildrenByType(children, "button", 1))
        ).toThrow(
            reporter.message("MAXIMUM_CHILDREN_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: "",
                actualCount: 2,
                actualCountPluralSuffix: "ren",
                maximumCount: 1
            })
        );
    });

    it("throws the named validation message when options are provided", () => {
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("button", { key: "button-2" })
        ];

        expect(() =>
            renderHook(() =>
                useMaximumChildrenByType(children, "button", 1, {
                    traceCode: "DIALOG_ACTIONS_MAXIMUM",
                    childName: "DialogAction"
                })
            )
        ).toThrow(
            reporter.message("MAXIMUM_CHILDREN_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "[DIALOG_ACTIONS_MAXIMUM] ",
                childNameSegment: " for DialogAction",
                actualCount: 2,
                actualCountPluralSuffix: "ren",
                maximumCount: 1
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

        const { result } = renderHook(() =>
            useMaximumChildrenByType(children, "button", 1, {
                childName: "DialogAction"
            })
        );

        expect(result.current).toHaveLength(1);
        expect(result.current[0]?.type).toBe("button");
    });

    it("counts nested matches through the provided maximumDepth", () => {
        const children = [
            createElement(Fragment, {
                key: "fragment",
                children: createElement("button", { key: "nested-button" })
            }),
            createElement("button", { key: "direct-button-1" })
        ];

        const { result } = renderHook(() =>
            useMaximumChildrenByType(children, "button", 2, {
                maximumDepth: 1,
                childName: "DialogAction"
            })
        );

        expect(result.current).toHaveLength(2);
    });
});
