import { renderHook } from "@testing-library/react";
import {
    createElement,
    Fragment,
    type ComponentProps,
    type PropsWithChildren,
    type ReactElement
} from "react";
import { describe, expect, it } from "vitest";

import reporter from "./reporter";
import useOptionalChildMatching from "./useOptionalChildMatching";

function ExampleComponent({
    children,
    role = "content"
}: PropsWithChildren<{ role?: string }>) {
    return createElement("section", { "data-role": role }, children);
}

function isButtonElement(
    element: ReactElement
): element is ReactElement<ComponentProps<"button">, "button"> {
    return element.type === "button";
}

describe("useOptionalChildMatching", () => {
    it("returns the matching direct child when exactly one match is found", () => {
        const children = [
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-1" }),
            createElement("div", { key: "div-1" })
        ];

        const { result } = renderHook(() =>
            useOptionalChildMatching(
                children,
                (element) => element.type === "button"
            )
        );

        expect(result.current?.type).toBe("button");
        expect(result.current?.key).toBe(".$button-1");
    });

    it("supports type-guard predicates with narrowed return types", () => {
        const children = [
            createElement("span", { key: "span-1" }),
            createElement("button", {
                key: "button-1",
                type: "submit"
            })
        ];

        const { result } = renderHook(() =>
            useOptionalChildMatching(children, isButtonElement)
        );

        expect(result.current?.props.type).toBe("submit");
    });

    it("returns null when no direct child matches", () => {
        const children = [
            createElement("span", { key: "span-1" }),
            createElement("div", { key: "div-1" })
        ];

        const { result } = renderHook(() =>
            useOptionalChildMatching(
                children,
                (element) => element.type === "button"
            )
        );

        expect(result.current).toBeNull();
    });

    it("returns the matching custom component child when exactly one match is found", () => {
        const children = [
            createElement("div", { key: "div-1" }),
            createElement(ExampleComponent, {
                key: "component-1",
                role: "trigger"
            })
        ];

        const { result } = renderHook(() =>
            useOptionalChildMatching(
                children,
                (element) => element.type === ExampleComponent,
                { childName: "ExampleComponent" }
            )
        );

        expect(result.current?.type).toBe(ExampleComponent);
    });

    it("throws the generic validation message when more than one direct child matches", () => {
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("button", { key: "button-2" })
        ];

        expect(() =>
            renderHook(() =>
                useOptionalChildMatching(
                    children,
                    (element) => element.type === "button"
                )
            )
        ).toThrow(
            reporter.message("OPTIONAL_CHILD_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: "",
                actualCount: 2,
                actualCountPluralSuffix: "ren"
            })
        );
    });

    it("throws the trace-prefixed named validation message when options are provided", () => {
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("button", { key: "button-2" })
        ];

        expect(() =>
            renderHook(() =>
                useOptionalChildMatching(
                    children,
                    (element) => element.type === "button",
                    {
                        traceCode: "DIALOG_ICON_OPTIONAL",
                        childName: "DialogIcon"
                    }
                )
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
            useOptionalChildMatching(
                children,
                (element) => element.type === "button",
                { childName: "DialogIcon" }
            )
        );

        expect(result.current).toBeNull();
    });

    it("returns a nested match when maximumDepth includes descendants", () => {
        const children = [
            createElement(Fragment, {
                key: "fragment",
                children: createElement("button", { key: "nested-button" })
            }),
            createElement("span", { key: "span-1" })
        ];

        const { result } = renderHook(() =>
            useOptionalChildMatching(
                children,
                (element) => element.type === "button",
                { maximumDepth: 1, childName: "DialogIcon" }
            )
        );

        expect(result.current?.key).toBe(".$nested-button");
    });

    it("throws the public reporter error when depth is invalid", () => {
        expect(() =>
            renderHook(() =>
                useOptionalChildMatching(
                    null,
                    (element) => element.type === "button",
                    { depth: -1 }
                )
            )
        ).toThrow(reporter.message("RCH001"));
    });
});
