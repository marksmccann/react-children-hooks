import { renderHook } from "@testing-library/react";
import { createElement, Fragment, type ReactNode } from "react";
import { describe, expect, it } from "vitest";

import reporter from "./reporter";
import useUniqueCallbackChild from "./useUniqueCallbackChild";

describe("useUniqueCallbackChild", () => {
    it("returns the only direct callback child when exactly one is present", () => {
        const child = (isOpen: boolean) => (isOpen ? "Open" : "Closed");

        const { result } = renderHook(() =>
            useUniqueCallbackChild<[boolean], string>(child)
        );

        expect(result.current).toBe(child);
        expect(result.current(false)).toBe("Closed");
    });

    it("returns the only direct callback child from mixed children", () => {
        const child = (count: number) => `value:${count}`;
        const children = [
            "label",
            createElement("span", { key: "span-1" }),
            child
        ] as const;

        const { result } = renderHook(() =>
            useUniqueCallbackChild<[number], string>(children)
        );

        expect(result.current).toBe(child);
        expect(result.current(4)).toBe("value:4");
    });

    it("throws the generic validation message when no callback child is present", () => {
        const children = [createElement("span", { key: "span-1" }), "label"];

        expect(() =>
            renderHook(() => useUniqueCallbackChild<[number], string>(children))
        ).toThrow(
            reporter.message("UNIQUE_CALLBACK_CHILD_FAILED", {
                traceCodePrefix: "",
                childNameSegment: "",
                actualCount: 0
            })
        );
    });

    it("throws the generic validation message when more than one callback child is present", () => {
        const children = [
            (count: number) => `first:${count}`,
            (count: number) => `second:${count}`
        ] as const;

        expect(() =>
            renderHook(() => useUniqueCallbackChild<[number], string>(children))
        ).toThrow(
            reporter.message("UNIQUE_CALLBACK_CHILD_FAILED", {
                traceCodePrefix: "",
                childNameSegment: "",
                actualCount: 2
            })
        );
    });

    it("throws the trace-prefixed named validation message when options are provided", () => {
        const children = [
            (count: number) => `first:${count}`,
            (count: number) => `second:${count}`
        ] as const;

        expect(() =>
            renderHook(() =>
                useUniqueCallbackChild<[number], string>(children, {
                    traceCode: "TOGGLE_RENDER_CHILD_UNIQUE",
                    childName: "ToggleRenderChild"
                })
            )
        ).toThrow(
            reporter.message("UNIQUE_CALLBACK_CHILD_FAILED", {
                traceCodePrefix: "[TOGGLE_RENDER_CHILD_UNIQUE] ",
                childNameSegment: " for ToggleRenderChild",
                actualCount: 2
            })
        );
    });

    it("only inspects direct children", () => {
        const child = (name: string) => `Hello ${name}`;
        const nestedChild = (name: string) => `Ignored ${name}`;
        const children = [
            createElement(Fragment, {
                key: "fragment",
                children: nestedChild as unknown as ReactNode
            }),
            child
        ] as const;

        const { result } = renderHook(() =>
            useUniqueCallbackChild<[string], string>(children)
        );

        expect(result.current).toBe(child);
        expect(result.current("Taylor")).toBe("Hello Taylor");
    });
});
