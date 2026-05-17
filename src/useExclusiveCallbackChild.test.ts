import { renderHook } from "@testing-library/react";
import { createElement, Fragment, type ReactNode } from "react";
import { describe, expect, it } from "vitest";

import reporter from "./reporter";
import useExclusiveCallbackChild from "./useExclusiveCallbackChild";

describe("useExclusiveCallbackChild", () => {
    it("returns the only direct callback child when it is the sole direct child", () => {
        const child = (isOpen: boolean) => (isOpen ? "Open" : "Closed");

        const { result } = renderHook(() =>
            useExclusiveCallbackChild<[boolean], string>(child)
        );

        expect(result.current).toBe(child);
        expect(result.current(false)).toBe("Closed");
    });

    it("throws when no callback child is present", () => {
        const children = [createElement("span", { key: "span-1" }), "label"];

        expect(() =>
            renderHook(() =>
                useExclusiveCallbackChild<[number], string>(children)
            )
        ).toThrow(
            reporter.message("EXCLUSIVE_CALLBACK_CHILD_FAILED", {
                traceCodePrefix: "",
                childNameSegment: "",
                actualCount: 2,
                actualCountPluralSuffix: "ren",
                callbackCount: 0,
                callbackCountPluralSuffix: "ren"
            })
        );
    });

    it("throws when a callback child has any direct sibling", () => {
        const child = (count: number) => `value:${count}`;
        const children = [
            createElement("span", { key: "span-1" }),
            child
        ] as const;

        expect(() =>
            renderHook(() =>
                useExclusiveCallbackChild<[number], string>(children)
            )
        ).toThrow(
            reporter.message("EXCLUSIVE_CALLBACK_CHILD_FAILED", {
                traceCodePrefix: "",
                childNameSegment: "",
                actualCount: 2,
                actualCountPluralSuffix: "ren",
                callbackCount: 1,
                callbackCountPluralSuffix: ""
            })
        );
    });

    it("throws when more than one callback child is present", () => {
        const children = [
            (count: number) => `first:${count}`,
            (count: number) => `second:${count}`
        ] as const;

        expect(() =>
            renderHook(() =>
                useExclusiveCallbackChild<[number], string>(children)
            )
        ).toThrow(
            reporter.message("EXCLUSIVE_CALLBACK_CHILD_FAILED", {
                traceCodePrefix: "",
                childNameSegment: "",
                actualCount: 2,
                actualCountPluralSuffix: "ren",
                callbackCount: 2,
                callbackCountPluralSuffix: "ren"
            })
        );
    });

    it("throws when the only direct child is not a callback", () => {
        const children = "label";

        expect(() =>
            renderHook(() =>
                useExclusiveCallbackChild<[number], string>(children)
            )
        ).toThrow(
            reporter.message("EXCLUSIVE_CALLBACK_CHILD_FAILED", {
                traceCodePrefix: "",
                childNameSegment: "",
                actualCount: 1,
                actualCountPluralSuffix: "",
                callbackCount: 0,
                callbackCountPluralSuffix: "ren"
            })
        );
    });

    it("throws the trace-prefixed named validation message when options are provided", () => {
        const children = [
            (count: number) => `first:${count}`,
            createElement("span", { key: "span-1" })
        ] as const;

        expect(() =>
            renderHook(() =>
                useExclusiveCallbackChild<[number], string>(children, {
                    traceCode: "TOGGLE_RENDER_CHILD_EXCLUSIVE",
                    childName: "ToggleRenderChild"
                })
            )
        ).toThrow(
            reporter.message("EXCLUSIVE_CALLBACK_CHILD_FAILED", {
                traceCodePrefix: "[TOGGLE_RENDER_CHILD_EXCLUSIVE] ",
                childNameSegment: " for ToggleRenderChild",
                actualCount: 2,
                actualCountPluralSuffix: "ren",
                callbackCount: 1,
                callbackCountPluralSuffix: ""
            })
        );
    });

    it("only inspects direct children", () => {
        const nestedChild = (name: string) => `Ignored ${name}`;
        const children = createElement(Fragment, {
            key: "fragment",
            children: nestedChild as unknown as ReactNode
        });

        expect(() =>
            renderHook(() =>
                useExclusiveCallbackChild<[string], string>(children)
            )
        ).toThrow(
            reporter.message("EXCLUSIVE_CALLBACK_CHILD_FAILED", {
                traceCodePrefix: "",
                childNameSegment: "",
                actualCount: 1,
                actualCountPluralSuffix: "",
                callbackCount: 0,
                callbackCountPluralSuffix: "ren"
            })
        );
    });
});
