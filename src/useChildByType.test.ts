import { renderHook } from "@testing-library/react";
import { createElement, Fragment, type PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";

import reporter from "./reporter";
import useChildByType from "./useChildByType";

function ExampleComponent({ children }: PropsWithChildren) {
    return createElement("section", null, children);
}

describe("useChildByType", () => {
    it("returns the first direct child element that matches an intrinsic element type", () => {
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-2" })
        ];

        const { result } = renderHook(() => useChildByType(children, "button"));

        expect(result.current?.type).toBe("button");
        expect(result.current?.key).toBe(".$button-1");
    });

    it("returns the first direct child element that matches a custom component type", () => {
        const children = [
            createElement("div", { key: "div-1" }),
            createElement(ExampleComponent, { key: "component-1" }),
            createElement(ExampleComponent, { key: "component-2" })
        ];

        const { result } = renderHook(() =>
            useChildByType(children, ExampleComponent)
        );

        expect(result.current?.type).toBe(ExampleComponent);
        expect(result.current?.key).toBe(".$component-1");
    });

    it("returns null when no direct child matches the provided type", () => {
        const children = [
            createElement("div", { key: "div-1" }),
            createElement("span", { key: "span-1" })
        ];

        const { result } = renderHook(() => useChildByType(children, "button"));

        expect(result.current).toBeNull();
    });

    it("only inspects direct children", () => {
        const children = [
            createElement(Fragment, {
                key: "fragment",
                children: createElement("button", { key: "nested-button" })
            }),
            createElement("span", { key: "span-1" })
        ];

        const { result } = renderHook(() => useChildByType(children, "button"));

        expect(result.current).toBeNull();
    });

    it("matches nested intrinsic elements through the provided maximumDepth", () => {
        const children = [
            createElement(Fragment, {
                key: "fragment",
                children: createElement("button", { key: "nested-button" })
            }),
            createElement("span", { key: "span-1" })
        ];

        const { result } = renderHook(() =>
            useChildByType(children, "button", { maximumDepth: 1 })
        );

        expect(result.current?.type).toBe("button");
        expect(result.current?.key).toBe(".$nested-button");
    });

    it("matches nested custom component elements through the provided maximumDepth", () => {
        const children = [
            createElement(Fragment, {
                key: "fragment",
                children: createElement(ExampleComponent, {
                    key: "nested-component"
                })
            }),
            createElement("div", { key: "div-1" })
        ];

        const { result } = renderHook(() =>
            useChildByType(children, ExampleComponent, { maximumDepth: 1 })
        );

        expect(result.current?.type).toBe(ExampleComponent);
        expect(result.current?.key).toBe(".$nested-component");
    });

    it("skips direct children when depth excludes them", () => {
        const children = [
            createElement("button", { key: "direct-button" }),
            createElement(Fragment, {
                key: "fragment",
                children: createElement("button", { key: "nested-button" })
            })
        ];

        const { result } = renderHook(() =>
            useChildByType(children, "button", { depth: 1, maximumDepth: 1 })
        );

        expect(result.current?.type).toBe("button");
        expect(result.current?.key).toBe(".$nested-button");
    });

    it("throws the public reporter error when depth is invalid", () => {
        expect(() =>
            renderHook(() => useChildByType(null, "button", { depth: -1 }))
        ).toThrow(reporter.message("RCH001"));
    });

    it("throws the public reporter error when maximumDepth is invalid", () => {
        expect(() =>
            renderHook(() =>
                useChildByType(null, "button", { maximumDepth: -1 })
            )
        ).toThrow(reporter.message("RCH002"));
    });

    it("throws the public reporter error when depth exceeds maximumDepth", () => {
        expect(() =>
            renderHook(() =>
                useChildByType(null, "button", { depth: 2, maximumDepth: 1 })
            )
        ).toThrow(reporter.message("RCH003"));
    });
});
