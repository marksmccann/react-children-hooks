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
import useExclusiveChildMatching from "./useExclusiveChildMatching";

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

describe("useExclusiveChildMatching", () => {
    it("returns the only inspected child when it matches", () => {
        const children = [createElement("button", { key: "button-1" })];

        const { result } = renderHook(() =>
            useExclusiveChildMatching(
                children,
                (element) => element.type === "button"
            )
        );

        expect(result.current.type).toBe("button");
        expect(result.current.key).toBe(".$button-1");
    });

    it("supports type-guard predicates with narrowed return types", () => {
        const children = [
            createElement("button", {
                key: "button-1",
                type: "submit"
            })
        ];

        const { result } = renderHook(() =>
            useExclusiveChildMatching(children, isButtonElement)
        );

        expect(result.current.props.type).toBe("submit");
    });

    it("returns the only matching custom component child when it is exclusive", () => {
        const children = [
            createElement(ExampleComponent, {
                key: "component-1",
                role: "trigger"
            })
        ];

        const { result } = renderHook(() =>
            useExclusiveChildMatching(
                children,
                (element) => element.type === ExampleComponent,
                { childName: "ExampleComponent" }
            )
        );

        expect(result.current.type).toBe(ExampleComponent);
    });

    it("throws when the only inspected child does not match", () => {
        const children = [createElement("span", { key: "span-1" })];

        expect(() =>
            renderHook(() =>
                useExclusiveChildMatching(
                    children,
                    (element) => element.type === "button"
                )
            )
        ).toThrow(
            reporter.message("EXCLUSIVE_CHILD_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: "",
                actualCount: 1,
                actualCountPluralSuffix: "",
                matchingCount: 0
            })
        );
    });

    it("throws when a matching child has any inspected element sibling", () => {
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("span", { key: "span-1" })
        ];

        expect(() =>
            renderHook(() =>
                useExclusiveChildMatching(
                    children,
                    (element) => element.type === "button"
                )
            )
        ).toThrow(
            reporter.message("EXCLUSIVE_CHILD_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: "",
                actualCount: 2,
                actualCountPluralSuffix: "ren",
                matchingCount: 1
            })
        );
    });

    it("throws when more than one inspected child matches", () => {
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("button", { key: "button-2" })
        ];

        expect(() =>
            renderHook(() =>
                useExclusiveChildMatching(
                    children,
                    (element) => element.type === "button"
                )
            )
        ).toThrow(
            reporter.message("EXCLUSIVE_CHILD_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: "",
                actualCount: 2,
                actualCountPluralSuffix: "ren",
                matchingCount: 2
            })
        );
    });

    it("throws the trace-prefixed named validation message when options are provided", () => {
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("span", { key: "span-1" })
        ];

        expect(() =>
            renderHook(() =>
                useExclusiveChildMatching(
                    children,
                    (element) => element.type === "button",
                    {
                        traceCode: "DIALOG_TRIGGER_EXCLUSIVE",
                        childName: "DialogTrigger"
                    }
                )
            )
        ).toThrow(
            reporter.message("EXCLUSIVE_CHILD_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "[DIALOG_TRIGGER_EXCLUSIVE] ",
                childNameSegment: " for DialogTrigger",
                actualCount: 2,
                actualCountPluralSuffix: "ren",
                matchingCount: 1
            })
        );
    });

    it("only inspects direct children", () => {
        const children = createElement(Fragment, {
            key: "fragment",
            children: createElement("button", { key: "nested-button" })
        });

        expect(() =>
            renderHook(() =>
                useExclusiveChildMatching(
                    children,
                    (element) => element.type === "button",
                    { childName: "DialogTrigger" }
                )
            )
        ).toThrow(
            reporter.message("EXCLUSIVE_CHILD_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: " for DialogTrigger",
                actualCount: 1,
                actualCountPluralSuffix: "",
                matchingCount: 0
            })
        );
    });

    it("returns a nested exclusive match when depth excludes direct children", () => {
        const children = [
            createElement("button", { key: "direct-button" }),
            createElement(Fragment, {
                key: "fragment",
                children: createElement("button", { key: "nested-button" })
            })
        ];

        const { result } = renderHook(() =>
            useExclusiveChildMatching(
                children,
                (element) => element.type === "button",
                { depth: 1, maximumDepth: 1, childName: "DialogTrigger" }
            )
        );

        expect(result.current.key).toBe(".$nested-button");
    });

    it("throws when another nested inspected element exists within the depth range", () => {
        const children = [
            createElement(Fragment, {
                key: "fragment-1",
                children: createElement("button", { key: "nested-button" })
            }),
            createElement(Fragment, {
                key: "fragment-2",
                children: createElement("span", { key: "nested-span" })
            })
        ];

        expect(() =>
            renderHook(() =>
                useExclusiveChildMatching(
                    children,
                    (element) => element.type === "button",
                    { depth: 1, maximumDepth: 1 }
                )
            )
        ).toThrow(
            reporter.message("EXCLUSIVE_CHILD_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: "",
                actualCount: 2,
                actualCountPluralSuffix: "ren",
                matchingCount: 1
            })
        );
    });

    it("throws the public reporter error when depth is invalid", () => {
        expect(() =>
            renderHook(() =>
                useExclusiveChildMatching(
                    null,
                    (element) => element.type === "button",
                    { depth: -1 }
                )
            )
        ).toThrow(reporter.message("RCH001"));
    });
});
