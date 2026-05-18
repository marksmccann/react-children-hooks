import { renderHook } from "@testing-library/react";
import { createElement, Fragment, type PropsWithChildren } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import reporter from "./reporter";
import useDeprecatedChildMatching from "./useDeprecatedChildMatching";

function ExampleComponent({
    children,
    role = "content"
}: PropsWithChildren<{ role?: string }>) {
    return createElement("section", { "data-role": role }, children);
}

/**
 * Resolves the formatted matching-hook deprecation warning message used by tests.
 *
 * @param options The deprecation options that define the warning copy and metadata.
 * @returns The formatted deprecation warning message.
 */
function getDeprecatedChildMatchingWarningMessage(options: {
    traceCode?: string;
    childName?: string;
    message: string;
}): string {
    return reporter.message("DEPRECATED_CHILD_MATCHING_WARNING", {
        traceCodePrefix: options.traceCode ? `[${options.traceCode}] ` : "",
        childNameSegment: options.childName ? ` for ${options.childName}` : "",
        deprecationMessage: options.message
    });
}

/**
 * Restores the scoped warning cache and console spies between deprecation-warning tests.
 *
 * @returns Nothing.
 */
afterEach(() => {
    reporter.clearWarnings();
    vi.restoreAllMocks();
});

describe("useDeprecatedChildMatching", () => {
    it("returns true and warns when a matching deprecated child is found", () => {
        const warnSpy = vi
            .spyOn(console, "warn")
            .mockImplementation(() => undefined);
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("span", { key: "span-1" })
        ];
        const options = {
            message: "Use Dialog.Trigger instead.",
            traceCode: "DIALOG_TRIGGER_DEPRECATED",
            childName: "Dialog.LegacyTrigger"
        } as const;

        const { result } = renderHook(() =>
            useDeprecatedChildMatching(
                children,
                (element) => element.type === "button",
                options
            )
        );

        expect(result.current).toBe(true);
        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(warnSpy).toHaveBeenCalledWith(
            getDeprecatedChildMatchingWarningMessage(options)
        );
    });

    it("returns false and does not warn when no matching deprecated child is found", () => {
        const warnSpy = vi
            .spyOn(console, "warn")
            .mockImplementation(() => undefined);
        const children = [createElement("span", { key: "span-1" })];

        const { result } = renderHook(() =>
            useDeprecatedChildMatching(
                children,
                (element) => element.type === "button",
                { message: "Use Dialog.Trigger instead." }
            )
        );

        expect(result.current).toBe(false);
        expect(warnSpy).not.toHaveBeenCalled();
    });

    it("only warns once for the same deprecation configuration across rerenders", () => {
        const warnSpy = vi
            .spyOn(console, "warn")
            .mockImplementation(() => undefined);
        const children = [createElement("button", { key: "button-1" })];
        const options = {
            message: "Use Dialog.Trigger instead.",
            traceCode: "DIALOG_TRIGGER_DEPRECATED"
        } as const;

        const { rerender } = renderHook(() =>
            useDeprecatedChildMatching(
                children,
                (element) => element.type === "button",
                options
            )
        );

        rerender();

        expect(warnSpy).toHaveBeenCalledTimes(1);
    });

    it("only warns once even when the deprecation configuration differs", () => {
        const warnSpy = vi
            .spyOn(console, "warn")
            .mockImplementation(() => undefined);
        const children = [createElement("button", { key: "button-1" })];

        renderHook(() =>
            useDeprecatedChildMatching(
                children,
                (element) => element.type === "button",
                {
                    message: "Use Dialog.Trigger instead.",
                    traceCode: "DIALOG_TRIGGER_DEPRECATED"
                }
            )
        );

        renderHook(() =>
            useDeprecatedChildMatching(
                children,
                (element) => element.type === "button",
                {
                    message: "Use Dialog.Action instead.",
                    traceCode: "DIALOG_ACTION_DEPRECATED"
                }
            )
        );

        expect(warnSpy).toHaveBeenCalledTimes(1);
    });

    it("only inspects direct children", () => {
        const warnSpy = vi
            .spyOn(console, "warn")
            .mockImplementation(() => undefined);
        const children = createElement(Fragment, {
            key: "fragment",
            children: createElement("button", { key: "nested-button" })
        });

        const { result } = renderHook(() =>
            useDeprecatedChildMatching(
                children,
                (element) => element.type === "button",
                { message: "Use Dialog.Trigger instead." }
            )
        );

        expect(result.current).toBe(false);
        expect(warnSpy).not.toHaveBeenCalled();
    });

    it("warns for nested inspected matches through the provided maximumDepth", () => {
        const warnSpy = vi
            .spyOn(console, "warn")
            .mockImplementation(() => undefined);
        const children = createElement(Fragment, {
            key: "fragment",
            children: createElement("button", { key: "nested-button" })
        });
        const options = {
            message: "Use Dialog.Trigger instead.",
            childName: "Dialog.LegacyTrigger",
            maximumDepth: 1
        } as const;

        const { result } = renderHook(() =>
            useDeprecatedChildMatching(
                children,
                (element) => element.type === "button",
                options
            )
        );

        expect(result.current).toBe(true);
        expect(warnSpy).toHaveBeenCalledWith(
            getDeprecatedChildMatchingWarningMessage(options)
        );
    });

    it("throws the public reporter error when depth is invalid", () => {
        expect(() =>
            renderHook(() =>
                useDeprecatedChildMatching(
                    null,
                    (element) => element.type === "button",
                    {
                        message: "Use Dialog.Trigger instead.",
                        depth: -1
                    }
                )
            )
        ).toThrow(reporter.message("RCH001"));
    });

    it("supports matching custom components", () => {
        const warnSpy = vi
            .spyOn(console, "warn")
            .mockImplementation(() => undefined);
        const children = [
            createElement(ExampleComponent, {
                key: "component-1",
                role: "legacy-trigger"
            })
        ];
        const options = {
            message: "Use Dialog.Trigger instead.",
            childName: "Dialog.LegacyTrigger"
        } as const;

        const { result } = renderHook(() =>
            useDeprecatedChildMatching(
                children,
                (element) =>
                    element.type === ExampleComponent &&
                    (element.props as { role?: string }).role ===
                        "legacy-trigger",
                options
            )
        );

        expect(result.current).toBe(true);
        expect(warnSpy).toHaveBeenCalledWith(
            getDeprecatedChildMatchingWarningMessage(options)
        );
    });
});
