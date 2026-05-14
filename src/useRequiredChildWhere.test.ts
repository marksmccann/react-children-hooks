import { renderHook } from "@testing-library/react";
import {
    createElement,
    Fragment,
    type ComponentProps,
    type PropsWithChildren,
    type ReactElement
} from "react";
import { describe, expect, it } from "vitest";

import { useRequiredChildWhere } from "./useRequiredChildWhere";

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

describe("useRequiredChildWhere", () => {
    it("returns the matching direct child for a boolean predicate", () => {
        const children = [
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-1" })
        ];

        const { result } = renderHook(() =>
            useRequiredChildWhere(
                children,
                (element) => element.type === "button"
            )
        );

        expect(result.current.type).toBe("button");
    });

    it("returns the matching direct child for a type-guard predicate", () => {
        const children = [
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-1", type: "submit" })
        ];

        const { result } = renderHook(() =>
            useRequiredChildWhere(children, isButtonElement)
        );

        expect(result.current.props.type).toBe("submit");
    });

    it("throws the generic validation message when no options are provided", () => {
        const children = [createElement("span", { key: "span-1" })];

        expect(() =>
            renderHook(() =>
                useRequiredChildWhere(
                    children,
                    (element) => element.type === "button"
                )
            )
        ).toThrow(
            "Required child validation failed because no direct child satisfied the provided predicate."
        );
    });

    it("throws the trace-prefixed generic validation message when only traceCode is provided", () => {
        const children = [createElement("span", { key: "span-1" })];

        expect(() =>
            renderHook(() =>
                useRequiredChildWhere(
                    children,
                    (element) => element.type === "button",
                    { traceCode: "DIALOG_TRIGGER_MISSING" }
                )
            )
        ).toThrow(
            "[DIALOG_TRIGGER_MISSING] Required child validation failed because no direct child satisfied the provided predicate."
        );
    });

    it("throws the named validation message when only childName is provided", () => {
        const children = [createElement("span", { key: "span-1" })];

        expect(() =>
            renderHook(() =>
                useRequiredChildWhere(
                    children,
                    (element) => element.type === "button",
                    { childName: "DialogTrigger" }
                )
            )
        ).toThrow(
            "Required child validation failed for DialogTrigger because no direct child satisfied the provided predicate."
        );
    });

    it("throws the trace-prefixed named validation message when both options are provided", () => {
        const children = [createElement("span", { key: "span-1" })];

        expect(() =>
            renderHook(() =>
                useRequiredChildWhere(
                    children,
                    (element) => element.type === "button",
                    {
                        traceCode: "DIALOG_TRIGGER_MISSING",
                        childName: "DialogTrigger"
                    }
                )
            )
        ).toThrow(
            "[DIALOG_TRIGGER_MISSING] Required child validation failed for DialogTrigger because no direct child satisfied the provided predicate."
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

        expect(() =>
            renderHook(() =>
                useRequiredChildWhere(
                    children,
                    (element) => element.type === "button",
                    { childName: "DialogTrigger" }
                )
            )
        ).toThrow(
            "Required child validation failed for DialogTrigger because no direct child satisfied the provided predicate."
        );
    });

    it("returns the matching direct child for a custom component predicate", () => {
        const children = [
            createElement("div", { key: "div-1" }),
            createElement(ExampleComponent, {
                key: "component-1",
                role: "trigger"
            })
        ];

        const { result } = renderHook(() =>
            useRequiredChildWhere(
                children,
                (element) => element.type === ExampleComponent,
                { childName: "ExampleComponent" }
            )
        );

        expect(result.current.type).toBe(ExampleComponent);
    });
});
