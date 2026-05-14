import { renderHook } from "@testing-library/react";
import { createElement, Fragment, type PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";

import { useChildByType } from "./useChildByType";

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
});
