import { renderHook } from "@testing-library/react";
import { createElement, Fragment, type PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";

import reporter from "./reporter";
import { useMinimumChildrenByType } from "./useMinimumChildrenByType";

function ExampleComponent({ children }: PropsWithChildren) {
    return createElement("section", null, children);
}

describe("useMinimumChildrenByType", () => {
    it("returns all matching direct children when the minimum count is satisfied", () => {
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-2" })
        ];

        const { result } = renderHook(() =>
            useMinimumChildrenByType(children, "button", 2)
        );

        expect(result.current).toHaveLength(2);
        expect(
            result.current.every((element) => element.type === "button")
        ).toBe(true);
    });

    it("returns matching custom component children when the minimum count is satisfied", () => {
        const children = [
            createElement(ExampleComponent, { key: "component-1" }),
            createElement("div", { key: "div-1" }),
            createElement(ExampleComponent, { key: "component-2" })
        ];

        const { result } = renderHook(() =>
            useMinimumChildrenByType(children, ExampleComponent, 2, {
                childName: "ExampleComponent"
            })
        );

        expect(result.current).toHaveLength(2);
        expect(
            result.current.every((element) => element.type === ExampleComponent)
        ).toBe(true);
    });

    it("throws the generic validation message when the minimum count is not met", () => {
        const children = [createElement("span", { key: "span-1" })];

        expect(() =>
            renderHook(() => useMinimumChildrenByType(children, "button", 2))
        ).toThrow(
            reporter.message("MINIMUM_CHILDREN_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: "",
                actualCount: 0,
                actualCountPluralSuffix: "ren",
                minimumCount: 2
            })
        );
    });

    it("throws the named validation message when options are provided", () => {
        const children = [createElement("button", { key: "button-1" })];

        expect(() =>
            renderHook(() =>
                useMinimumChildrenByType(children, "button", 2, {
                    traceCode: "DIALOG_ACTIONS_MINIMUM",
                    childName: "DialogAction"
                })
            )
        ).toThrow(
            reporter.message("MINIMUM_CHILDREN_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "[DIALOG_ACTIONS_MINIMUM] ",
                childNameSegment: " for DialogAction",
                actualCount: 1,
                actualCountPluralSuffix: "",
                minimumCount: 2
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
                useMinimumChildrenByType(children, "button", 2, {
                    childName: "DialogAction"
                })
            )
        ).toThrow(
            reporter.message("MINIMUM_CHILDREN_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: " for DialogAction",
                actualCount: 1,
                actualCountPluralSuffix: "",
                minimumCount: 2
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
            useMinimumChildrenByType(children, "button", 3, {
                maximumDepth: 1,
                childName: "DialogAction"
            })
        );

        expect(result.current).toHaveLength(3);
    });
});
