import { renderHook } from "@testing-library/react";
import {
    createElement,
    Fragment,
    type ComponentProps,
    type PropsWithChildren,
    type ReactElement
} from "react";
import { describe, expect, it } from "vitest";

import { useChildMatching } from "./useChildMatching";

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

describe("useChildMatching", () => {
    it("returns the first direct child element that satisfies a boolean predicate", () => {
        const children = [
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-1", type: "button" }),
            createElement("button", { key: "button-2", type: "submit" })
        ];

        const { result } = renderHook(() =>
            useChildMatching(children, (element) => element.type === "button")
        );

        expect(result.current?.type).toBe("button");
        expect(result.current?.key).toBe(".$button-1");
    });

    it("supports type-guard predicates for narrowed return types", () => {
        const children = [
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-1", type: "submit" })
        ];

        const { result } = renderHook(() =>
            useChildMatching(children, isButtonElement)
        );

        expect(result.current?.props.type).toBe("submit");
    });

    it("can match by arbitrary props on custom components", () => {
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
            useChildMatching(children, isTriggerExampleComponent)
        );

        expect(result.current?.key).toBe(".$component-1");
    });

    it("returns null when no direct child satisfies the predicate", () => {
        const children = [
            createElement("span", { key: "span-1" }),
            createElement("div", { key: "div-1" })
        ];

        const { result } = renderHook(() =>
            useChildMatching(children, (element) => element.type === "button")
        );

        expect(result.current).toBeNull();
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
            useChildMatching(children, (element) => element.type === "button")
        );

        expect(result.current).toBeNull();
    });
});
