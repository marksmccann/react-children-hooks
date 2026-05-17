import { renderHook } from "@testing-library/react";
import { createElement, Fragment, type PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";

import reporter from "./reporter";
import useOnlyChildByType from "./useOnlyChildByType";

function ExampleComponent({ children }: PropsWithChildren) {
    return createElement("section", null, children);
}

describe("useOnlyChildByType", () => {
    it("returns the only direct child element that matches an intrinsic element type", () => {
        const children = [
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-1" }),
            createElement("div", { key: "div-1" })
        ];

        const { result } = renderHook(() =>
            useOnlyChildByType(children, "button")
        );

        expect(result.current.type).toBe("button");
        expect(result.current.key).toBe(".$button-1");
    });

    it("returns the only direct child element that matches a custom component type", () => {
        const children = [
            createElement("div", { key: "div-1" }),
            createElement(ExampleComponent, { key: "component-1" })
        ];

        const { result } = renderHook(() =>
            useOnlyChildByType(children, ExampleComponent)
        );

        expect(result.current.type).toBe(ExampleComponent);
        expect(result.current.key).toBe(".$component-1");
    });

    it("throws the generic validation message when no direct child matches the provided type", () => {
        const children = [
            createElement("div", { key: "div-1" }),
            createElement("span", { key: "span-1" })
        ];

        expect(() =>
            renderHook(() => useOnlyChildByType(children, "button"))
        ).toThrow(
            reporter.message("ONLY_CHILD_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: "",
                actualCount: 0,
                actualCountPluralSuffix: "ren"
            })
        );
    });

    it("throws the named validation message when more than one direct child matches the provided type", () => {
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("button", { key: "button-2" })
        ];

        expect(() =>
            renderHook(() =>
                useOnlyChildByType(children, "button", {
                    traceCode: "DIALOG_TRIGGER_UNIQUE",
                    childName: "DialogTrigger"
                })
            )
        ).toThrow(
            reporter.message("ONLY_CHILD_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "[DIALOG_TRIGGER_UNIQUE] ",
                childNameSegment: " for DialogTrigger",
                actualCount: 2,
                actualCountPluralSuffix: "ren"
            })
        );
    });

    it("only inspects direct children", () => {
        const children = [
            createElement(Fragment, {
                key: "fragment",
                children: createElement("button", { key: "nested-button" })
            }),
            createElement("span", { key: "span-1" })
        ];

        expect(() =>
            renderHook(() =>
                useOnlyChildByType(children, "button", {
                    childName: "DialogTrigger"
                })
            )
        ).toThrow(
            reporter.message("ONLY_CHILD_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: " for DialogTrigger",
                actualCount: 0,
                actualCountPluralSuffix: "ren"
            })
        );
    });

    it("returns a nested only match when depth excludes direct children", () => {
        const children = [
            createElement("button", { key: "direct-button" }),
            createElement(Fragment, {
                key: "fragment",
                children: createElement("button", { key: "nested-button" })
            })
        ];

        const { result } = renderHook(() =>
            useOnlyChildByType(children, "button", {
                depth: 1,
                maximumDepth: 1,
                childName: "DialogTrigger"
            })
        );

        expect(result.current.key).toBe(".$nested-button");
    });
});
