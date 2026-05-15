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
import { useMaximumChildrenMatching } from "./useMaximumChildrenMatching";

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

describe("useMaximumChildrenMatching", () => {
    it("returns all matching direct children when the maximum count is not reached", () => {
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-2" })
        ];

        const { result } = renderHook(() =>
            useMaximumChildrenMatching(
                children,
                (element) => element.type === "button",
                3
            )
        );

        expect(result.current).toHaveLength(2);
        expect(
            result.current.every((element) => element.type === "button")
        ).toBe(true);
    });

    it("returns all matching direct children when the maximum count is exactly met", () => {
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-2" })
        ];

        const { result } = renderHook(() =>
            useMaximumChildrenMatching(
                children,
                (element) => element.type === "button",
                2
            )
        );

        expect(result.current).toHaveLength(2);
        expect(
            result.current.every((element) => element.type === "button")
        ).toBe(true);
    });

    it("supports type-guard predicates with narrowed return types", () => {
        const children = [
            createElement("button", { key: "button-1", type: "button" }),
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-2", type: "submit" })
        ];

        const { result } = renderHook(() =>
            useMaximumChildrenMatching(children, isButtonElement, 2)
        );

        expect(result.current).toHaveLength(2);
        expect(result.current[1]?.props.type).toBe("submit");
    });

    it("returns matching custom component children when the maximum count is satisfied", () => {
        const children = [
            createElement(ExampleComponent, {
                key: "component-1",
                role: "trigger"
            }),
            createElement("div", { key: "div-1" }),
            createElement(ExampleComponent, {
                key: "component-2",
                role: "content"
            })
        ];

        const { result } = renderHook(() =>
            useMaximumChildrenMatching(
                children,
                (element) => element.type === ExampleComponent,
                2,
                { childName: "ExampleComponent" }
            )
        );

        expect(result.current).toHaveLength(2);
        expect(
            result.current.every((element) => element.type === ExampleComponent)
        ).toBe(true);
    });

    it("throws the generic validation message when the maximum count is exceeded", () => {
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("button", { key: "button-2" })
        ];

        expect(() =>
            renderHook(() =>
                useMaximumChildrenMatching(
                    children,
                    (element) => element.type === "button",
                    1
                )
            )
        ).toThrow(
            reporter.message("MAXIMUM_CHILDREN_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: "",
                actualCount: 2,
                actualCountPluralSuffix: "ren",
                maximumCount: 1
            })
        );
    });

    it("throws the trace-prefixed generic validation message when only traceCode is provided", () => {
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("button", { key: "button-2" })
        ];

        expect(() =>
            renderHook(() =>
                useMaximumChildrenMatching(
                    children,
                    (element) => element.type === "button",
                    1,
                    { traceCode: "DIALOG_ACTIONS_MAXIMUM" }
                )
            )
        ).toThrow(
            reporter.message("MAXIMUM_CHILDREN_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "[DIALOG_ACTIONS_MAXIMUM] ",
                childNameSegment: "",
                actualCount: 2,
                actualCountPluralSuffix: "ren",
                maximumCount: 1
            })
        );
    });

    it("throws the named validation message when only childName is provided", () => {
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("button", { key: "button-2" })
        ];

        expect(() =>
            renderHook(() =>
                useMaximumChildrenMatching(
                    children,
                    (element) => element.type === "button",
                    1,
                    { childName: "DialogAction" }
                )
            )
        ).toThrow(
            reporter.message("MAXIMUM_CHILDREN_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: " for DialogAction",
                actualCount: 2,
                actualCountPluralSuffix: "ren",
                maximumCount: 1
            })
        );
    });

    it("throws the trace-prefixed named validation message when both options are provided", () => {
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("button", { key: "button-2" })
        ];

        expect(() =>
            renderHook(() =>
                useMaximumChildrenMatching(
                    children,
                    (element) => element.type === "button",
                    1,
                    {
                        traceCode: "DIALOG_ACTIONS_MAXIMUM",
                        childName: "DialogAction"
                    }
                )
            )
        ).toThrow(
            reporter.message("MAXIMUM_CHILDREN_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "[DIALOG_ACTIONS_MAXIMUM] ",
                childNameSegment: " for DialogAction",
                actualCount: 2,
                actualCountPluralSuffix: "ren",
                maximumCount: 1
            })
        );
    });

    it("only inspects direct children", () => {
        const children = [
            createElement(Fragment, {
                key: "fragment",
                children: [
                    createElement("div", { key: "nested-div-1" }),
                    createElement("div", { key: "nested-div-2" })
                ]
            }),
            createElement("button", { key: "direct-button-1" })
        ];

        const { result } = renderHook(() =>
            useMaximumChildrenMatching(
                children,
                (element) => element.type === "button",
                1,
                { childName: "DialogAction" }
            )
        );

        expect(result.current).toHaveLength(1);
        expect(result.current[0]?.type).toBe("button");
    });
});
