import { renderHook } from "@testing-library/react";
import { createElement, Fragment, type PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";

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
});
