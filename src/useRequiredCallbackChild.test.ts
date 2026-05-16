import { renderHook } from "@testing-library/react";
import { createElement, Fragment, type ReactNode } from "react";
import { describe, expect, it } from "vitest";

import reporter from "./reporter";
import useRequiredCallbackChild from "./useRequiredCallbackChild";

describe("useRequiredCallbackChild", () => {
    it("returns the direct callback child when present", () => {
        const children = (isOpen: boolean) => (isOpen ? "Open" : "Closed");

        const { result } = renderHook(() =>
            useRequiredCallbackChild<[boolean], string>(children)
        );

        expect(result.current).toBe(children);
        expect(result.current(true)).toBe("Open");
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
            useRequiredCallbackChild<[number], string>(children)
        );

        expect(result.current).toBe(firstChild);
        expect(result.current(2)).toBe("first:2");
    });

    it("throws the generic validation message when no options are provided", () => {
        const children = [createElement("span", { key: "span-1" }), "label"];

        expect(() =>
            renderHook(() =>
                useRequiredCallbackChild<[boolean], string>(children)
            )
        ).toThrow(
            reporter.message("REQUIRED_CALLBACK_CHILD_FAILED", {
                traceCodePrefix: "",
                childNameSegment: ""
            })
        );
    });

    it("throws the trace-prefixed named validation message when options are provided", () => {
        const children = [createElement("span", { key: "span-1" }), "label"];

        expect(() =>
            renderHook(() =>
                useRequiredCallbackChild<[boolean], string>(children, {
                    traceCode: "DIALOG_RENDER_CHILD_MISSING",
                    childName: "DialogRenderChild"
                })
            )
        ).toThrow(
            reporter.message("REQUIRED_CALLBACK_CHILD_FAILED", {
                traceCodePrefix: "[DIALOG_RENDER_CHILD_MISSING] ",
                childNameSegment: " for DialogRenderChild"
            })
        );
    });

    it("only inspects direct children", () => {
        const nestedChild = (name: string) => `Hello ${name}`;
        const children = [
            createElement(Fragment, {
                key: "fragment",
                children: nestedChild as unknown as ReactNode
            }),
            createElement("span", { key: "span-1" })
        ];

        expect(() =>
            renderHook(() =>
                useRequiredCallbackChild<[string], string>(children, {
                    childName: "GreetingRenderer"
                })
            )
        ).toThrow(
            reporter.message("REQUIRED_CALLBACK_CHILD_FAILED", {
                traceCodePrefix: "",
                childNameSegment: " for GreetingRenderer"
            })
        );
    });
});
