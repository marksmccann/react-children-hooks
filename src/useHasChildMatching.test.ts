import { renderHook } from "@testing-library/react";
import {
    createElement,
    Fragment,
    type ComponentProps,
    type PropsWithChildren,
    type ReactElement
} from "react";
import { describe, expect, it } from "vitest";

import { useHasChildMatching } from "./useHasChildMatching";

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

function isTriggerExampleComponent(
    element: ReactElement
): element is ReactElement<
    PropsWithChildren<{ role?: string }>,
    typeof ExampleComponent
> {
    const candidate = element as ReactElement<
        PropsWithChildren<{ role?: string }>,
        typeof ExampleComponent
    >;

    return (
        candidate.type === ExampleComponent &&
        candidate.props.role === "trigger"
    );
}

describe("useHasChildMatching", () => {
    it("returns true when a direct child matches a boolean predicate", () => {
        const children = [
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-1" })
        ];

        const { result } = renderHook(() =>
            useHasChildMatching(
                children,
                (element) => element.type === "button"
            )
        );

        expect(result.current).toBe(true);
    });

    it("returns true when a direct child matches a type-guard predicate", () => {
        const children = [
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-1", type: "submit" })
        ];

        const { result } = renderHook(() =>
            useHasChildMatching(children, isButtonElement)
        );

        expect(result.current).toBe(true);
    });

    it("returns true when a custom component matches an arbitrary prop-based predicate", () => {
        const children = [
            createElement(ExampleComponent, {
                key: "component-1",
                role: "trigger"
            }),
            createElement(ExampleComponent, {
                key: "component-2",
                role: "content"
            })
        ];

        const { result } = renderHook(() =>
            useHasChildMatching(children, isTriggerExampleComponent)
        );

        expect(result.current).toBe(true);
    });

    it("returns false when no direct child matches the predicate", () => {
        const children = [
            createElement("span", { key: "span-1" }),
            createElement("div", { key: "div-1" })
        ];

        const { result } = renderHook(() =>
            useHasChildMatching(
                children,
                (element) => element.type === "button"
            )
        );

        expect(result.current).toBe(false);
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
            useHasChildMatching(
                children,
                (element) => element.type === "button"
            )
        );

        expect(result.current).toBe(false);
    });
});
