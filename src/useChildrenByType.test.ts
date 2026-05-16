import { renderHook } from "@testing-library/react";
import { createElement, Fragment, type PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";

import reporter from "./reporter";
import { useChildrenByType } from "./useChildrenByType";

function ExampleComponent({ children }: PropsWithChildren) {
    return createElement("section", null, children);
}

describe("useChildrenByType", () => {
    it("returns direct child elements that match an intrinsic element type", () => {
        const children = [
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-1" }),
            createElement("span", { key: "span-2" })
        ];

        const { result } = renderHook(() =>
            useChildrenByType(children, "span")
        );

        expect(result.current).toHaveLength(2);
        expect(result.current.every((element) => element.type === "span")).toBe(
            true
        );
    });

    it("returns direct child elements that match a custom component type", () => {
        const children = [
            createElement(ExampleComponent, { key: "component-1" }),
            createElement("div", { key: "div-1" }),
            createElement(ExampleComponent, { key: "component-2" })
        ];

        const { result } = renderHook(() =>
            useChildrenByType(children, ExampleComponent)
        );

        expect(result.current).toHaveLength(2);
        expect(
            result.current.every((element) => element.type === ExampleComponent)
        ).toBe(true);
    });

    it("only inspects direct children", () => {
        const children = [
            createElement(Fragment, {
                key: "fragment",
                children: createElement("span", { key: "nested-span" })
            }),
            createElement("span", { key: "direct-span" })
        ];

        const { result } = renderHook(() =>
            useChildrenByType(children, "span")
        );

        expect(result.current).toHaveLength(1);
        expect(result.current[0]?.key).toBe(".$direct-span");
    });

    it("includes nested intrinsic matches through the provided maximumDepth", () => {
        const children = [
            createElement(Fragment, {
                key: "fragment",
                children: [
                    createElement("span", { key: "nested-span-1" }),
                    createElement("span", { key: "nested-span-2" })
                ]
            }),
            createElement("span", { key: "direct-span" })
        ];

        const { result } = renderHook(() =>
            useChildrenByType(children, "span", { maximumDepth: 1 })
        );

        expect(result.current.map((element) => element.key)).toEqual([
            ".$direct-span",
            ".$nested-span-1",
            ".$nested-span-2"
        ]);
    });

    it("includes nested custom component matches through the provided maximumDepth", () => {
        const children = [
            createElement(Fragment, {
                key: "fragment",
                children: [
                    createElement(ExampleComponent, {
                        key: "nested-component-1"
                    }),
                    createElement(ExampleComponent, {
                        key: "nested-component-2"
                    })
                ]
            }),
            createElement("div", { key: "div-1" })
        ];

        const { result } = renderHook(() =>
            useChildrenByType(children, ExampleComponent, { maximumDepth: 1 })
        );

        expect(result.current.map((element) => element.key)).toEqual([
            ".$nested-component-1",
            ".$nested-component-2"
        ]);
    });

    it("excludes direct matches when depth starts at descendants", () => {
        const children = [
            createElement("span", { key: "direct-span" }),
            createElement(Fragment, {
                key: "fragment",
                children: [
                    createElement("span", { key: "nested-span-1" }),
                    createElement("span", { key: "nested-span-2" })
                ]
            })
        ];

        const { result } = renderHook(() =>
            useChildrenByType(children, "span", { depth: 1, maximumDepth: 1 })
        );

        expect(result.current.map((element) => element.key)).toEqual([
            ".$nested-span-1",
            ".$nested-span-2"
        ]);
    });

    it("throws the public reporter error when depth is invalid", () => {
        expect(() =>
            renderHook(() => useChildrenByType(null, "span", { depth: -1 }))
        ).toThrow(reporter.message("RCH001"));
    });

    it("throws the public reporter error when maximumDepth is invalid", () => {
        expect(() =>
            renderHook(() =>
                useChildrenByType(null, "span", { maximumDepth: -1 })
            )
        ).toThrow(reporter.message("RCH002"));
    });

    it("throws the public reporter error when depth exceeds maximumDepth", () => {
        expect(() =>
            renderHook(() =>
                useChildrenByType(null, "span", { depth: 2, maximumDepth: 1 })
            )
        ).toThrow(reporter.message("RCH003"));
    });
});
