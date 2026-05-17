import { renderHook } from "@testing-library/react";
import { createElement, Fragment, type PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";

import reporter from "./reporter";
import useChildrenCountByType from "./useChildrenCountByType";

function ExampleComponent({ children }: PropsWithChildren) {
    return createElement("section", null, children);
}

describe("useChildrenCountByType", () => {
    it("returns the number of direct child elements that match an intrinsic element type", () => {
        const children = [
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-1" }),
            createElement("span", { key: "span-2" })
        ];

        const { result } = renderHook(() =>
            useChildrenCountByType(children, "span")
        );

        expect(result.current).toBe(2);
    });

    it("returns the number of direct child elements that match a custom component type", () => {
        const children = [
            createElement(ExampleComponent, { key: "component-1" }),
            createElement("div", { key: "div-1" }),
            createElement(ExampleComponent, { key: "component-2" })
        ];

        const { result } = renderHook(() =>
            useChildrenCountByType(children, ExampleComponent)
        );

        expect(result.current).toBe(2);
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
            useChildrenCountByType(children, "span")
        );

        expect(result.current).toBe(1);
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
            useChildrenCountByType(children, "span", { maximumDepth: 1 })
        );

        expect(result.current).toBe(3);
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
            useChildrenCountByType(children, ExampleComponent, {
                maximumDepth: 1
            })
        );

        expect(result.current).toBe(2);
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
            useChildrenCountByType(children, "span", {
                depth: 1,
                maximumDepth: 1
            })
        );

        expect(result.current).toBe(2);
    });

    it("throws the public reporter error when depth is invalid", () => {
        expect(() =>
            renderHook(() =>
                useChildrenCountByType(null, "span", { depth: -1 })
            )
        ).toThrow(reporter.message("RCH001"));
    });

    it("throws the public reporter error when maximumDepth is invalid", () => {
        expect(() =>
            renderHook(() =>
                useChildrenCountByType(null, "span", { maximumDepth: -1 })
            )
        ).toThrow(reporter.message("RCH002"));
    });

    it("throws the public reporter error when depth exceeds maximumDepth", () => {
        expect(() =>
            renderHook(() =>
                useChildrenCountByType(null, "span", {
                    depth: 2,
                    maximumDepth: 1
                })
            )
        ).toThrow(reporter.message("RCH003"));
    });
});
