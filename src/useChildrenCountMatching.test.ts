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
import useChildrenCountMatching from "./useChildrenCountMatching";

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

describe("useChildrenCountMatching", () => {
    it("returns the number of direct child elements that satisfy a boolean predicate", () => {
        const children = [
            createElement("button", { key: "button-1", type: "button" }),
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-2", type: "submit" })
        ];

        const { result } = renderHook(() =>
            useChildrenCountMatching(
                children,
                (element) => element.type === "button"
            )
        );

        expect(result.current).toBe(2);
    });

    it("supports type-guard predicates", () => {
        const children = [
            createElement("span", { key: "span-1" }),
            createElement("button", { key: "button-1", type: "submit" })
        ];

        const { result } = renderHook(() =>
            useChildrenCountMatching(children, isButtonElement)
        );

        expect(result.current).toBe(1);
    });

    it("can count matches by arbitrary props on custom components", () => {
        const children = [
            createElement(ExampleComponent, {
                key: "component-1",
                role: "trigger"
            }),
            createElement(ExampleComponent, {
                key: "component-2",
                role: "content"
            }),
            createElement(ExampleComponent, {
                key: "component-3",
                role: "trigger"
            })
        ];

        const { result } = renderHook(() =>
            useChildrenCountMatching(children, isTriggerExampleComponent)
        );

        expect(result.current).toBe(2);
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
            useChildrenCountMatching(
                children,
                (element) => element.type === "button"
            )
        );

        expect(result.current).toBe(1);
    });

    it("includes nested matches through the provided maximumDepth", () => {
        const children = [
            createElement(Fragment, {
                key: "fragment",
                children: [
                    createElement("button", { key: "nested-button-1" }),
                    createElement("button", { key: "nested-button-2" })
                ]
            }),
            createElement("button", { key: "direct-button" })
        ];

        const { result } = renderHook(() =>
            useChildrenCountMatching(
                children,
                (element) => element.type === "button",
                { maximumDepth: 1 }
            )
        );

        expect(result.current).toBe(3);
    });

    it("excludes direct matches when depth starts at descendants", () => {
        const children = [
            createElement("button", { key: "direct-button" }),
            createElement(Fragment, {
                key: "fragment",
                children: [
                    createElement("button", { key: "nested-button-1" }),
                    createElement("button", { key: "nested-button-2" })
                ]
            })
        ];

        const { result } = renderHook(() =>
            useChildrenCountMatching(
                children,
                (element) => element.type === "button",
                { depth: 1, maximumDepth: 1 }
            )
        );

        expect(result.current).toBe(2);
    });

    it("throws the public reporter error when depth is invalid", () => {
        expect(() =>
            renderHook(() =>
                useChildrenCountMatching(
                    null,
                    (element) => element.type === "button",
                    { depth: -1 }
                )
            )
        ).toThrow(reporter.message("RCH001"));
    });

    it("throws the public reporter error when maximumDepth is invalid", () => {
        expect(() =>
            renderHook(() =>
                useChildrenCountMatching(
                    null,
                    (element) => element.type === "button",
                    { maximumDepth: -1 }
                )
            )
        ).toThrow(reporter.message("RCH002"));
    });

    it("throws the public reporter error when depth exceeds maximumDepth", () => {
        expect(() =>
            renderHook(() =>
                useChildrenCountMatching(
                    null,
                    (element) => element.type === "button",
                    { depth: 2, maximumDepth: 1 }
                )
            )
        ).toThrow(reporter.message("RCH003"));
    });
});
