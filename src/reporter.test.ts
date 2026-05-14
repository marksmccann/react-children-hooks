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

    it("resolves minimum-children validation messages without an internal code suffix", () => {
        expect(
            reporter.message("MINIMUM_CHILDREN_WHERE_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: "",
                actualCount: 0,
                actualCountPluralSuffix: "ren",
                minimumCount: 2
            })
        ).toBe(
            "Minimum children validation failed because only 0 direct children satisfied the provided predicate; expected at least 2."
        );
    });

    it("throws formatted minimum-children validation messages from fail", () => {
        expect(() =>
            reporter.fail("MINIMUM_CHILDREN_WHERE_PREDICATE_FAILED", {
                traceCodePrefix: "[DIALOG_ACTIONS_MINIMUM] ",
                childNameSegment: " for DialogAction",
                actualCount: 1,
                actualCountPluralSuffix: "",
                minimumCount: 2
            })
        ).toThrow(
            "[DIALOG_ACTIONS_MINIMUM] Minimum children validation failed for DialogAction because only 1 direct child satisfied the provided predicate; expected at least 2."
        );
    });
});
