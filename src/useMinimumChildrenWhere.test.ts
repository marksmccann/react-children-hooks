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
import { useMinimumChildrenWhere } from "./useMinimumChildrenWhere";

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

describe("useMinimumChildrenWhere", () => {
    it("returns all matching direct children when the minimum count is satisfied", () => {
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-2" })
        ];

        const { result } = renderHook(() =>
            useMinimumChildrenWhere(
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
            useMinimumChildrenWhere(children, isButtonElement, 2)
        );

        expect(result.current).toHaveLength(2);
        expect(result.current[1]?.props.type).toBe("submit");
    });

    it("returns matching custom component children when the minimum count is satisfied", () => {
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
            useMinimumChildrenWhere(
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

    it("throws the generic validation message when the minimum count is not met", () => {
        const children = [createElement("span", { key: "span-1" })];

        expect(() =>
            renderHook(() =>
                useMinimumChildrenWhere(
                    children,
                    (element) => element.type === "button",
                    2
                )
            )
        ).toThrow(
            reporter.message("MINIMUM_CHILDREN_WHERE_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: "",
                actualCount: 0,
                actualCountPluralSuffix: "ren",
                minimumCount: 2
            })
        );
    });

    it("throws the trace-prefixed generic validation message when only traceCode is provided", () => {
        const children = [createElement("button", { key: "button-1" })];

        expect(() =>
            renderHook(() =>
                useMinimumChildrenWhere(
                    children,
                    (element) => element.type === "button",
                    2,
                    { traceCode: "DIALOG_ACTIONS_MINIMUM" }
                )
            )
        ).toThrow(
            reporter.message("MINIMUM_CHILDREN_WHERE_PREDICATE_FAILED", {
                traceCodePrefix: "[DIALOG_ACTIONS_MINIMUM] ",
                childNameSegment: "",
                actualCount: 1,
                actualCountPluralSuffix: "",
                minimumCount: 2
            })
        );
    });

    it("throws the named validation message when only childName is provided", () => {
        const children = [createElement("button", { key: "button-1" })];

        expect(() =>
            renderHook(() =>
                useMinimumChildrenWhere(
                    children,
                    (element) => element.type === "button",
                    2,
                    { childName: "DialogAction" }
                )
            )
        ).toThrow(
            reporter.message("MINIMUM_CHILDREN_WHERE_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: " for DialogAction",
                actualCount: 1,
                actualCountPluralSuffix: "",
                minimumCount: 2
            })
        );
    });

    it("throws the trace-prefixed named validation message when both options are provided", () => {
        const children = [createElement("button", { key: "button-1" })];

        expect(() =>
            renderHook(() =>
                useMinimumChildrenWhere(
                    children,
                    (element) => element.type === "button",
                    2,
                    {
                        traceCode: "DIALOG_ACTIONS_MINIMUM",
                        childName: "DialogAction"
                    }
                )
            )
        ).toThrow(
            reporter.message("MINIMUM_CHILDREN_WHERE_PREDICATE_FAILED", {
                traceCodePrefix: "[DIALOG_ACTIONS_MINIMUM] ",
                childNameSegment: " for DialogAction",
                actualCount: 1,
                actualCountPluralSuffix: "",
                minimumCount: 2
            })
        );
    });

    it("only inspects direct children", () => {
        const children = [
            createElement(Fragment, {
                key: "fragment",
                children: [
                    createElement("button", { key: "nested-button-1" }),
                    createElement("button", { key: "nested-button-2" })
                ]
            }),
            createElement("button", { key: "direct-button-1" })
        ];

        expect(() =>
            renderHook(() =>
                useMinimumChildrenWhere(
                    children,
                    (element) => element.type === "button",
                    2,
                    { childName: "DialogAction" }
                )
            )
        ).toThrow(
            reporter.message("MINIMUM_CHILDREN_WHERE_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: " for DialogAction",
                actualCount: 1,
                actualCountPluralSuffix: "",
                minimumCount: 2
            })
        );
    });
});
