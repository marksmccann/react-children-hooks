import { renderHook } from "@testing-library/react";
import { createElement, Fragment, type PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";

import reporter from "./reporter";
import useHasChildByType from "./useHasChildByType";

function ExampleComponent({ children }: PropsWithChildren) {
    return createElement("section", null, children);
}

describe("useHasChildByType", () => {
    it("returns true when a direct child matches an intrinsic element type", () => {
        const children = [
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-1" })
        ];

        const { result } = renderHook(() =>
            useHasChildByType(children, "button")
        );

        expect(result.current).toBe(true);
    });

    it("returns true when a direct child matches a custom component type", () => {
        const children = [
            createElement("div", { key: "div-1" }),
            createElement(ExampleComponent, { key: "component-1" })
        ];

        const { result } = renderHook(() =>
            useHasChildByType(children, ExampleComponent)
        );

        expect(result.current).toBe(true);
    });

    it("returns false when no direct child matches the provided type", () => {
        const children = [
            createElement("span", { key: "span-1" }),
            createElement("div", { key: "div-1" })
        ];

        const { result } = renderHook(() =>
            useHasChildByType(children, "button")
        );

        expect(result.current).toBe(false);
    });

    it("only inspects direct children", () => {
        const children = [
            createElement(Fragment, {
                key: "fragment",
                children: createElement("button", { key: "nested-button" })
            }),
            createElement("span", { key: "span-1" })
        ];

        const { result } = renderHook(() =>
            useHasChildByType(children, "button")
        );

        expect(result.current).toBe(false);
    });

    it("returns true when a nested child matches through the provided maximumDepth", () => {
        const children = [
            createElement(Fragment, {
                key: "fragment",
                children: createElement("button", { key: "nested-button" })
            }),
            createElement("span", { key: "span-1" })
        ];

        const { result } = renderHook(() =>
            useHasChildByType(children, "button", { maximumDepth: 1 })
        );

        expect(result.current).toBe(true);
    });

    it("returns false when only direct matches exist and depth excludes them", () => {
        const children = [
            createElement("button", { key: "direct-button" }),
            createElement("span", { key: "span-1" })
        ];

        const { result } = renderHook(() =>
            useHasChildByType(children, "button", { depth: 1, maximumDepth: 1 })
        );

        expect(result.current).toBe(false);
    });

    it("returns true when a nested custom component matches and depth excludes direct children", () => {
        const children = [
            createElement("div", { key: "direct-div" }),
            createElement(Fragment, {
                key: "fragment",
                children: createElement(ExampleComponent, {
                    key: "nested-component"
                })
            })
        ];

        const { result } = renderHook(() =>
            useHasChildByType(children, ExampleComponent, {
                depth: 1,
                maximumDepth: 1
            })
        );

        expect(result.current).toBe(true);
    });

    it("throws the public reporter error when depth is invalid", () => {
        expect(() =>
            renderHook(() => useHasChildByType(null, "button", { depth: -1 }))
        ).toThrow(reporter.message("RCH001"));
    });

    it("throws the public reporter error when maximumDepth is invalid", () => {
        expect(() =>
            renderHook(() =>
                useHasChildByType(null, "button", { maximumDepth: -1 })
            )
        ).toThrow(reporter.message("RCH002"));
    });

    it("throws the public reporter error when depth exceeds maximumDepth", () => {
        expect(() =>
            renderHook(() =>
                useHasChildByType(null, "button", { depth: 2, maximumDepth: 1 })
            )
        ).toThrow(reporter.message("RCH003"));
    });
});
