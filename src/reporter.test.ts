import { describe, expect, it, vi } from "vitest";

import reporter from "./reporter";

describe("reporter", () => {
    it("resolves tokenized messages with their code suffix", () => {
        expect(
            reporter.message("ERR01", { componentName: "ExampleComponent" })
        ).toBe("ExampleComponent failed to mount (ERR01)");
    });

    it("logs resolved error messages", () => {
        const errorSpy = vi
            .spyOn(console, "error")
            .mockImplementation(() => {});

        reporter.error("ERR02");

        expect(errorSpy).toHaveBeenCalledWith(
            "Failed to load configuration (ERR02)"
        );

        errorSpy.mockRestore();
    });

    it("throws formatted errors from fail", () => {
        expect(() =>
            reporter.fail("ERR03", { resource: "config", url: "/api/config" })
        ).toThrow("Failed to fetch config from /api/config (ERR03)");
    });
});
