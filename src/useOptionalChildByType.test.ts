import { renderHook } from "@testing-library/react";
import { createElement, Fragment, type PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";

import reporter from "./reporter";
import { useOptionalChildByType } from "./useOptionalChildByType";

function ExampleComponent({ children }: PropsWithChildren) {
    return createElement("section", null, children);
}

describe("useOptionalChildByType", () => {
    it("returns the matching direct child element when exactly one intrinsic element matches", () => {
        const children = [
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-1" }),
            createElement("div", { key: "div-1" })
        ];

        const { result } = renderHook(() =>
            useOptionalChildByType(children, "button")
        );

        expect(result.current?.type).toBe("button");
        expect(result.current?.key).toBe(".$button-1");
    });

    it("returns the matching direct child element when exactly one custom component matches", () => {
        const children = [
            createElement("div", { key: "div-1" }),
            createElement(ExampleComponent, { key: "component-1" })
        ];

        const { result } = renderHook(() =>
            useOptionalChildByType(children, ExampleComponent)
        );

        expect(result.current?.type).toBe(ExampleComponent);
        expect(result.current?.key).toBe(".$component-1");
    });

    it("returns null when no direct child matches the provided type", () => {
        const children = [
            createElement("div", { key: "div-1" }),
            createElement("span", { key: "span-1" })
        ];

        const { result } = renderHook(() =>
            useOptionalChildByType(children, "button")
        );

        expect(result.current).toBeNull();
    });

    it("throws the named validation message when more than one direct child matches the provided type", () => {
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("button", { key: "button-2" })
        ];

        expect(() =>
            renderHook(() =>
                useOptionalChildByType(children, "button", {
                    traceCode: "DIALOG_ICON_OPTIONAL",
                    childName: "DialogIcon"
                })
            )
        ).toThrow(
            reporter.message("OPTIONAL_CHILD_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "[DIALOG_ICON_OPTIONAL] ",
                childNameSegment: " for DialogIcon",
                actualCount: 2,
                actualCountPluralSuffix: "ren"
            })
        );
    });

    it("only inspects direct children", () => {
        const children = [
            createElement(Fragment, {
                key: "fragment",
                children: createElement("button", { key: "nested-button" })
            }),
            createElement("span", { key: "span-1" })
        ];

        const { result } = renderHook(() =>
            useOptionalChildByType(children, "button", {
                childName: "DialogIcon"
            })
        );

        expect(result.current).toBeNull();
    });
});
