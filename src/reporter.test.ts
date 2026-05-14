import { describe, expect, it } from "vitest";

import reporter from "./reporter";

describe("reporter", () => {
    it("resolves the generic required-child validation message without an internal code suffix", () => {
        expect(
            reporter.message("REQUIRED_CHILD_WHERE_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: ""
            })
        ).toBe(
            "Required child validation failed because no direct child satisfied the provided predicate."
        );
    });

    it("resolves the named required-child validation message without an internal code suffix", () => {
        expect(
            reporter.message("REQUIRED_CHILD_WHERE_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: " for DialogTrigger"
            })
        ).toBe(
            "Required child validation failed for DialogTrigger because no direct child satisfied the provided predicate."
        );
    });

    it("throws formatted required-child validation messages from fail", () => {
        expect(() =>
            reporter.fail("REQUIRED_CHILD_WHERE_PREDICATE_FAILED", {
                traceCodePrefix: "[DIALOG_TRIGGER_MISSING] ",
                childNameSegment: " for DialogTrigger"
            })
        ).toThrow(
            "[DIALOG_TRIGGER_MISSING] Required child validation failed for DialogTrigger because no direct child satisfied the provided predicate."
        );
    });
});
