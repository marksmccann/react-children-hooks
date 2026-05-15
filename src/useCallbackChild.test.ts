import { renderHook } from "@testing-library/react";
import { createElement, Fragment, type ReactNode } from "react";
import { describe, expect, it } from "vitest";

import { useCallbackChild } from "./useCallbackChild";

describe("useCallbackChild", () => {
    it("returns a callback child when the direct child is a function", () => {
        const children = (isOpen: boolean) => (isOpen ? "Open" : "Closed");

        const { result } = renderHook(() =>
            useCallbackChild<[boolean], string>(children)
        );

        expect(result.current).toBe(children);
        expect(result.current?.(true)).toBe("Open");
    });

    it("returns the first direct callback child from mixed children", () => {
        const firstChild = (count: number) => `first:${count}`;
        const secondChild = (count: number) => `second:${count}`;
        const children = [
            "label",
            createElement("span", { key: "span-1" }),
            firstChild,
            secondChild
        ] as const;

        const { result } = renderHook(() =>
            useCallbackChild<[number], string>(children)
        );

        expect(result.current).toBe(firstChild);
        expect(result.current?.(3)).toBe("first:3");
    });

    it("flattens nested arrays while keeping traversal shallow", () => {
        const nestedChild = (name: string) => `Hello ${name}`;
        const fragmentChild = (name: string) => `Ignored ${name}`;
        const children = [
            [null, nestedChild],
            createElement(Fragment, {
                key: "fragment",
                children: fragmentChild as unknown as ReactNode
            })
        ] as const;

        const { result } = renderHook(() =>
            useCallbackChild<[string], string>(children)
        );

        expect(result.current).toBe(nestedChild);
        expect(result.current?.("Taylor")).toBe("Hello Taylor");
    });

    it("returns null when no callback child is present", () => {
        const children = [
            createElement("span", { key: "span-1" }),
            "label",
            false
        ];

        const { result } = renderHook(() =>
            useCallbackChild<[number], string>(children)
        );

        expect(result.current).toBeNull();
    });
});
