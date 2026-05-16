import { renderHook } from "@testing-library/react";
import { createElement, Fragment, type ReactNode } from "react";
import { describe, expect, it } from "vitest";

import reporter from "./reporter";
import useOptionalCallbackChild from "./useOptionalCallbackChild";

describe("useOptionalCallbackChild", () => {
    it("returns the direct callback child when exactly one is present", () => {
        const children = (isOpen: boolean) => (isOpen ? "Open" : "Closed");

        const { result } = renderHook(() =>
            useOptionalCallbackChild<[boolean], string>(children)
        );

        expect(result.current).toBe(children);
        expect(result.current?.(false)).toBe("Closed");
    });

    it("returns null when no callback child is present", () => {
        const children = [
            createElement("span", { key: "span-1" }),
            "label",
            false
        ];

        const { result } = renderHook(() =>
            useOptionalCallbackChild<[boolean], string>(children)
        );

        expect(result.current).toBeNull();
    });

    it("throws the generic validation message when more than one callback child is present", () => {
        const children = [
            (count: number) => `first:${count}`,
            (count: number) => `second:${count}`
        ] as const;

        expect(() =>
            renderHook(() =>
                useOptionalCallbackChild<[number], string>(children)
            )
        ).toThrow(
            reporter.message("OPTIONAL_CALLBACK_CHILD_FAILED", {
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
                useOptionalCallbackChild<[number], string>(children, {
                    traceCode: "TOGGLE_RENDER_CHILD_OPTIONAL",
                    childName: "ToggleRenderChild"
                })
            )
        ).toThrow(
            reporter.message("OPTIONAL_CALLBACK_CHILD_FAILED", {
                traceCodePrefix: "[TOGGLE_RENDER_CHILD_OPTIONAL] ",
                childNameSegment: " for ToggleRenderChild",
                actualCount: 2
            })
        );
    });

    it("only inspects direct children", () => {
        const directChild = (name: string) => `Hello ${name}`;
        const nestedChild = (name: string) => `Ignored ${name}`;
        const children = [
            createElement(Fragment, {
                key: "fragment",
                children: nestedChild as unknown as ReactNode
            }),
            directChild
        ] as const;

        const { result } = renderHook(() =>
            useOptionalCallbackChild<[string], string>(children)
        );

        expect(result.current).toBe(directChild);
        expect(result.current?.("Taylor")).toBe("Hello Taylor");
    });
});
