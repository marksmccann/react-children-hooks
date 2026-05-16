import { renderHook } from "@testing-library/react";
import { createElement, Fragment, type PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";

import reporter from "./reporter";
import { useRequiredChildByType } from "./useRequiredChildByType";

function ExampleComponent({ children }: PropsWithChildren) {
    return createElement("section", null, children);
}

describe("useRequiredChildByType", () => {
    it("returns the first direct child element that matches an intrinsic element type", () => {
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-2" })
        ];

        const { result } = renderHook(() =>
            useRequiredChildByType(children, "button")
        );

        expect(result.current.type).toBe("button");
        expect(result.current.key).toBe(".$button-1");
    });

    it("returns the first direct child element that matches a custom component type", () => {
        const children = [
            createElement("div", { key: "div-1" }),
            createElement(ExampleComponent, { key: "component-1" }),
            createElement(ExampleComponent, { key: "component-2" })
        ];

        const { result } = renderHook(() =>
            useRequiredChildByType(children, ExampleComponent)
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
            renderHook(() => useRequiredChildByType(children, "button"))
        ).toThrow(
            reporter.message("REQUIRED_CHILD_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: ""
            })
        );
    });

    it("throws the named validation message when options are provided", () => {
        const children = [createElement("span", { key: "span-1" })];

        expect(() =>
            renderHook(() =>
                useRequiredChildByType(children, "button", {
                    traceCode: "DIALOG_TRIGGER_MISSING",
                    childName: "DialogTrigger"
                })
            )
        ).toThrow(
            reporter.message("REQUIRED_CHILD_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "[DIALOG_TRIGGER_MISSING] ",
                childNameSegment: " for DialogTrigger"
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
                useRequiredChildByType(children, "button", {
                    childName: "DialogTrigger"
                })
            )
        ).toThrow(
            reporter.message("REQUIRED_CHILD_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: " for DialogTrigger"
            })
        );
    });

    it("returns a nested match when maximumDepth includes descendants", () => {
        const children = [
            createElement(Fragment, {
                key: "fragment",
                children: createElement("button", { key: "nested-button" })
            }),
            createElement("span", { key: "span-1" })
        ];

        const { result } = renderHook(() =>
            useRequiredChildByType(children, "button", {
                maximumDepth: 1,
                childName: "DialogTrigger"
            })
        );

        expect(result.current.key).toBe(".$nested-button");
    });
});
