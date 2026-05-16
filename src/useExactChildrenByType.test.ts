import { renderHook } from "@testing-library/react";
import { createElement, Fragment, type PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";

import reporter from "./reporter";
import { useExactChildrenByType } from "./useExactChildrenByType";

function ExampleComponent({ children }: PropsWithChildren) {
    return createElement("section", null, children);
}

describe("useExactChildrenByType", () => {
    it("returns all matching direct children when the exact count is met", () => {
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-2" })
        ];

        const { result } = renderHook(() =>
            useExactChildrenByType(children, "button", 2)
        );

        expect(result.current).toHaveLength(2);
        expect(
            result.current.every((element) => element.type === "button")
        ).toBe(true);
    });

    it("returns matching custom component children when the exact count is satisfied", () => {
        const children = [
            createElement(ExampleComponent, { key: "component-1" }),
            createElement("div", { key: "div-1" }),
            createElement(ExampleComponent, { key: "component-2" })
        ];

        const { result } = renderHook(() =>
            useExactChildrenByType(children, ExampleComponent, 2, {
                childName: "ExampleComponent"
            })
        );

        expect(result.current).toHaveLength(2);
        expect(
            result.current.every((element) => element.type === ExampleComponent)
        ).toBe(true);
    });

    it("throws the generic validation message when fewer matches than the exact count are found", () => {
        const children = [createElement("button", { key: "button-1" })];

        expect(() =>
            renderHook(() => useExactChildrenByType(children, "button", 2))
        ).toThrow(
            reporter.message("EXACT_CHILDREN_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: "",
                actualCount: 1,
                actualCountPluralSuffix: "",
                exactCount: 2
            })
        );
    });

    it("throws the generic validation message when more matches than the exact count are found", () => {
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("button", { key: "button-2" })
        ];

        expect(() =>
            renderHook(() => useExactChildrenByType(children, "button", 1))
        ).toThrow(
            reporter.message("EXACT_CHILDREN_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: "",
                actualCount: 2,
                actualCountPluralSuffix: "ren",
                exactCount: 1
            })
        );
    });

    it("throws the named validation message when options are provided", () => {
        const children = [createElement("button", { key: "button-1" })];

        expect(() =>
            renderHook(() =>
                useExactChildrenByType(children, "button", 2, {
                    traceCode: "DIALOG_ACTIONS_EXACT",
                    childName: "DialogAction"
                })
            )
        ).toThrow(
            reporter.message("EXACT_CHILDREN_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "[DIALOG_ACTIONS_EXACT] ",
                childNameSegment: " for DialogAction",
                actualCount: 1,
                actualCountPluralSuffix: "",
                exactCount: 2
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
            useExactChildrenByType(children, "button", 1, {
                childName: "DialogAction"
            })
        );

        expect(result.current).toHaveLength(1);
        expect(result.current[0]?.type).toBe("button");
    });

    it("includes nested intrinsic matches through the provided maximumDepth when the exact count is met", () => {
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
            useExactChildrenByType(children, "button", 3, {
                maximumDepth: 1,
                childName: "DialogAction"
            })
        );

        expect(result.current.map((element) => element.key)).toEqual([
            ".$direct-button-1",
            ".$nested-button-1",
            ".$nested-button-2"
        ]);
    });

    it("excludes direct matches when depth starts at descendants", () => {
        const children = [
            createElement("button", { key: "direct-button-1" }),
            createElement(Fragment, {
                key: "fragment",
                children: [
                    createElement("button", { key: "nested-button-1" }),
                    createElement("button", { key: "nested-button-2" })
                ]
            })
        ];

        const { result } = renderHook(() =>
            useExactChildrenByType(children, "button", 2, {
                depth: 1,
                maximumDepth: 1,
                childName: "DialogAction"
            })
        );

        expect(result.current.map((element) => element.key)).toEqual([
            ".$nested-button-1",
            ".$nested-button-2"
        ]);
    });

    it("throws the public reporter error when depth is invalid", () => {
        expect(() =>
            renderHook(() =>
                useExactChildrenByType(null, "button", 1, { depth: -1 })
            )
        ).toThrow(reporter.message("RCH001"));
    });

    it("throws the public reporter error when maximumDepth is invalid", () => {
        expect(() =>
            renderHook(() =>
                useExactChildrenByType(null, "button", 1, {
                    maximumDepth: -1
                })
            )
        ).toThrow(reporter.message("RCH002"));
    });

    it("throws the public reporter error when depth exceeds maximumDepth", () => {
        expect(() =>
            renderHook(() =>
                useExactChildrenByType(null, "button", 1, {
                    depth: 2,
                    maximumDepth: 1
                })
            )
        ).toThrow(reporter.message("RCH003"));
    });
});
