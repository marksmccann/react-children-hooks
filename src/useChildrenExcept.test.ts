import { renderHook } from "@testing-library/react";
import { createElement, Fragment, type PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";

import reporter from "./reporter";
import useChildByType from "./useChildByType";
import useChildrenExcept from "./useChildrenExcept";
import useChildrenMatching from "./useChildrenMatching";
import useRequiredChildByType from "./useRequiredChildByType";

function ExampleComponent({
    children,
    role = "content"
}: PropsWithChildren<{ role?: string }>) {
    return createElement("section", { "data-role": role }, children);
}

describe("useChildrenExcept", () => {
    it("returns all inspected child elements except the provided element", () => {
        const span = createElement("span", { key: "span-1" });
        const button = createElement("button", { key: "button-1" });
        const div = createElement("div", { key: "div-1" });
        const children = [span, button, div];

        const { result } = renderHook(() =>
            useChildrenExcept(children, button)
        );

        expect(result.current.map((element) => element.key)).toEqual([
            ".$span-1",
            ".$div-1"
        ]);
    });

    it("returns all inspected child elements except the provided elements", () => {
        const span = createElement("span", { key: "span-1" });
        const button = createElement("button", { key: "button-1" });
        const div = createElement("div", { key: "div-1" });
        const children = [span, button, div];

        const { result } = renderHook(() =>
            useChildrenExcept(children, [span, div])
        );

        expect(result.current.map((element) => element.key)).toEqual([
            ".$button-1"
        ]);
    });

    it("supports child elements returned from other hooks", () => {
        const children = [
            createElement(ExampleComponent, {
                key: "trigger",
                role: "trigger"
            }),
            createElement(ExampleComponent, {
                key: "content",
                role: "content"
            }),
            createElement("button", { key: "close" })
        ];

        const { result } = renderHook(() => {
            const trigger = useRequiredChildByType(children, ExampleComponent, {
                childName: "DialogSection"
            });
            const closeButton = useChildByType(children, "button");

            return useChildrenExcept(children, [trigger, closeButton]);
        });

        expect(result.current).toHaveLength(1);
        expect(result.current[0]?.key).toBe(".$content");
    });

    it("preserves traversal order in the remaining results", () => {
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-2" }),
            createElement("div", { key: "div-1" })
        ];

        const { result } = renderHook(() => {
            const buttons = useChildrenMatching(
                children,
                (element) => element.type === "button"
            );

            return useChildrenExcept(children, buttons[0] ?? null);
        });

        expect(result.current.map((element) => element.key)).toEqual([
            ".$span-1",
            ".$button-2",
            ".$div-1"
        ]);
    });

    it("only inspects direct children", () => {
        const nestedButton = createElement("button", { key: "nested-button" });
        const directButton = createElement("button", { key: "direct-button" });
        const children = [
            createElement(Fragment, {
                key: "fragment",
                children: nestedButton
            }),
            directButton
        ];

        const { result } = renderHook(() =>
            useChildrenExcept(children, directButton)
        );

        expect(result.current).toHaveLength(1);
        expect(result.current[0]?.type).toBe(Fragment);
    });

    it("can exclude nested inspected descendants through the provided maximumDepth", () => {
        const nestedButton = createElement("button", { key: "nested-button" });
        const nestedSpan = createElement("span", { key: "nested-span" });
        const children = [
            createElement(Fragment, {
                key: "fragment",
                children: [nestedButton, nestedSpan]
            }),
            createElement("button", { key: "direct-button" })
        ];

        const { result } = renderHook(() =>
            useChildrenExcept(children, nestedButton, { maximumDepth: 1 })
        );

        expect(result.current.map((element) => element.key)).toEqual([
            ".$fragment",
            ".$direct-button",
            ".$nested-span"
        ]);
    });

    it("ignores nullish excluded children for convenience", () => {
        const children = [
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-1" })
        ];

        const { result } = renderHook(() => useChildrenExcept(children, null));

        expect(result.current.map((element) => element.key)).toEqual([
            ".$span-1",
            ".$button-1"
        ]);
    });

    it("throws the public reporter error when depth is invalid", () => {
        expect(() =>
            renderHook(() => useChildrenExcept(null, null, { depth: -1 }))
        ).toThrow(reporter.message("RCH001"));
    });
});
