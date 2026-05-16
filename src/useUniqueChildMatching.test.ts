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
import { useUniqueChildMatching } from "./useUniqueChildMatching";

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

describe("useUniqueChildMatching", () => {
    it("returns the only matching direct child when exactly one match is found", () => {
        const children = [
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-1" }),
            createElement("div", { key: "div-1" })
        ];

        const { result } = renderHook(() =>
            useUniqueChildMatching(
                children,
                (element) => element.type === "button"
            )
        );

        expect(result.current.type).toBe("button");
        expect(result.current.key).toBe(".$button-1");
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
            useUniqueChildMatching(children, isButtonElement)
        );

        expect(result.current.props.type).toBe("submit");
    });

    it("returns the only matching custom component child when exactly one match is found", () => {
        const children = [
            createElement("div", { key: "div-1" }),
            createElement(ExampleComponent, {
                key: "component-1",
                role: "trigger"
            })
        ];

        const { result } = renderHook(() =>
            useUniqueChildMatching(
                children,
                (element) => element.type === ExampleComponent,
                { childName: "ExampleComponent" }
            )
        );

        expect(result.current.type).toBe(ExampleComponent);
    });

    it("throws the generic validation message when no direct child matches", () => {
        const children = [createElement("span", { key: "span-1" })];

        expect(() =>
            renderHook(() =>
                useUniqueChildMatching(
                    children,
                    (element) => element.type === "button"
                )
            )
        ).toThrow(
            reporter.message("UNIQUE_CHILD_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: "",
                actualCount: 0,
                actualCountPluralSuffix: "ren"
            })
        );
    });

    it("throws the generic validation message when more than one direct child matches", () => {
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("button", { key: "button-2" })
        ];

        expect(() =>
            renderHook(() =>
                useUniqueChildMatching(
                    children,
                    (element) => element.type === "button"
                )
            )
        ).toThrow(
            reporter.message("UNIQUE_CHILD_MATCHING_PREDICATE_FAILED", {
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
                useUniqueChildMatching(
                    children,
                    (element) => element.type === "button",
                    {
                        traceCode: "DIALOG_TRIGGER_UNIQUE",
                        childName: "DialogTrigger"
                    }
                )
            )
        ).toThrow(
            reporter.message("UNIQUE_CHILD_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "[DIALOG_TRIGGER_UNIQUE] ",
                childNameSegment: " for DialogTrigger",
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
            createElement("button", { key: "direct-button-1" }),
            createElement("span", { key: "span-1" })
        ];

        const { result } = renderHook(() =>
            useUniqueChildMatching(
                children,
                (element) => element.type === "button",
                { childName: "DialogTrigger" }
            )
        );

        expect(result.current.type).toBe("button");
        expect(result.current.key).toBe(".$direct-button-1");
    });

    it("returns a nested unique match when depth excludes direct children", () => {
        const children = [
            createElement("button", { key: "direct-button" }),
            createElement(Fragment, {
                key: "fragment",
                children: createElement("button", { key: "nested-button" })
            })
        ];

        const { result } = renderHook(() =>
            useUniqueChildMatching(
                children,
                (element) => element.type === "button",
                { depth: 1, maximumDepth: 1, childName: "DialogTrigger" }
            )
        );

        expect(result.current.key).toBe(".$nested-button");
    });

    it("throws the public reporter error when depth is invalid", () => {
        expect(() =>
            renderHook(() =>
                useUniqueChildMatching(
                    null,
                    (element) => element.type === "button",
                    { depth: -1 }
                )
            )
        ).toThrow(reporter.message("RCH001"));
    });
});
