import { renderHook } from "@testing-library/react";
import {
    createElement,
    Fragment,
    type ComponentProps,
    type PropsWithChildren,
    type ReactElement
} from "react";
import { describe, expect, it } from "vitest";

import { useChildrenMatching } from "./useChildrenMatching";

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

describe("useChildrenMatching", () => {
    it("returns all direct child elements that satisfy a boolean predicate", () => {
        const children = [
            createElement("button", { key: "button-1", type: "button" }),
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-2", type: "submit" })
        ];

        const { result } = renderHook(() =>
            useChildrenMatching(
                children,
                (element) => element.type === "button"
            )
        );

        expect(result.current).toHaveLength(2);
        expect(
            result.current.every((element) => element.type === "button")
        ).toBe(true);
    });

    it("supports type-guard predicates for narrowed return types", () => {
        const children = [
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-1", type: "submit" })
        ];

        const { result } = renderHook(() =>
            useChildrenMatching(children, isButtonElement)
        );

        expect(result.current).toHaveLength(1);
        expect(result.current[0]?.props.type).toBe("submit");
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
            useChildrenMatching(children, isTriggerExampleComponent)
        );

        expect(result.current).toHaveLength(1);
        expect(result.current[0]?.key).toBe(".$component-1");
    });

    it("only inspects direct children", () => {
        const children = [
            createElement(Fragment, {
                key: "fragment",
                children: createElement("button", { key: "nested-button" })
            }),
            createElement("button", { key: "direct-button" })
        ];

        const { result } = renderHook(() =>
            useChildrenMatching(
                children,
                (element) => element.type === "button"
            )
        );

        expect(result.current).toHaveLength(1);
        expect(result.current[0]?.key).toBe(".$direct-button");
    });
});
