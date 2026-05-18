import { renderHook } from "@testing-library/react";
import { createElement, type PropsWithChildren } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import reporter from "./reporter";
import useDeprecatedChildByType from "./useDeprecatedChildByType";

function LegacyTrigger({ children }: PropsWithChildren<object>) {
    return createElement("button", null, children);
}

/**
 * Resolves the formatted type-hook deprecation warning message used by tests.
 *
 * @param options The deprecation options that define the warning copy and metadata.
 * @param fallbackChildName The inferred child name used when the hook derives it from the type.
 * @returns The formatted deprecation warning message.
 */
function getDeprecatedChildByTypeWarningMessage(
    options: {
        traceCode?: string;
        childName?: string;
        message: string;
    },
    fallbackChildName?: string
): string {
    const resolvedChildName = options.childName || fallbackChildName;

    return reporter.message("DEPRECATED_CHILD_BY_TYPE_WARNING", {
        traceCodePrefix: options.traceCode ? `[${options.traceCode}] ` : "",
        childNameSegment: resolvedChildName ? ` for ${resolvedChildName}` : "",
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

describe("useDeprecatedChildByType", () => {
    it("returns true and warns when a deprecated child type is found", () => {
        const warnSpy = vi
            .spyOn(console, "warn")
            .mockImplementation(() => undefined);
        const children = [createElement("button", { key: "button-1" })];
        const options = {
            message: "Use Dialog.Trigger instead.",
            childName: "Dialog.LegacyTrigger",
            traceCode: "DIALOG_TRIGGER_DEPRECATED"
        } as const;

        const { result } = renderHook(() =>
            useDeprecatedChildByType(children, "button", options)
        );

        expect(result.current).toBe(true);
        expect(warnSpy).toHaveBeenCalledWith(
            getDeprecatedChildByTypeWarningMessage(options)
        );
    });

    it("uses the element type name when no childName is provided", () => {
        const warnSpy = vi
            .spyOn(console, "warn")
            .mockImplementation(() => undefined);
        const children = [
            createElement(LegacyTrigger, { key: "legacy-trigger" })
        ];
        const options = {
            message: "Use Dialog.Trigger instead."
        } as const;

        const { result } = renderHook(() =>
            useDeprecatedChildByType(children, LegacyTrigger, options)
        );

        expect(result.current).toBe(true);
        expect(warnSpy).toHaveBeenCalledWith(
            getDeprecatedChildByTypeWarningMessage(options, "LegacyTrigger")
        );
    });

    it("returns false and does not warn when the deprecated child type is absent", () => {
        const warnSpy = vi
            .spyOn(console, "warn")
            .mockImplementation(() => undefined);
        const children = [createElement("span", { key: "span-1" })];

        const { result } = renderHook(() =>
            useDeprecatedChildByType(children, "button", {
                message: "Use Dialog.Trigger instead."
            })
        );

        expect(result.current).toBe(false);
        expect(warnSpy).not.toHaveBeenCalled();
    });
});
