import { describe, expect, it } from "vitest";

import reporter from "./reporter";

describe("reporter", () => {
    it("resolves optional-child validation messages without an internal code suffix", () => {
        expect(
            reporter.message("OPTIONAL_CHILD_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: "",
                actualCount: 2,
                actualCountPluralSuffix: "ren"
            })
        ).toBe(
            "Optional child validation failed because 2 direct children satisfied the provided predicate; expected at most 1."
        );
    });

    it("throws formatted optional-child validation messages from fail", () => {
        expect(() =>
            reporter.fail("OPTIONAL_CHILD_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "[DIALOG_ICON_OPTIONAL] ",
                childNameSegment: " for DialogIcon",
                actualCount: 2,
                actualCountPluralSuffix: "ren"
            })
        ).toThrow(
            "[DIALOG_ICON_OPTIONAL] Optional child validation failed for DialogIcon because 2 direct children satisfied the provided predicate; expected at most 1."
        );
    });

    it("resolves unique-child validation messages without an internal code suffix", () => {
        expect(
            reporter.message("UNIQUE_CHILD_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: "",
                actualCount: 2,
                actualCountPluralSuffix: "ren"
            })
        ).toBe(
            "Unique child validation failed because 2 direct children satisfied the provided predicate; expected exactly 1."
        );
    });

    it("throws formatted unique-child validation messages from fail", () => {
        expect(() =>
            reporter.fail("UNIQUE_CHILD_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "[DIALOG_TRIGGER_UNIQUE] ",
                childNameSegment: " for DialogTrigger",
                actualCount: 0,
                actualCountPluralSuffix: "ren"
            })
        ).toThrow(
            "[DIALOG_TRIGGER_UNIQUE] Unique child validation failed for DialogTrigger because 0 direct children satisfied the provided predicate; expected exactly 1."
        );
    });

    it("resolves the generic required-child validation message without an internal code suffix", () => {
        expect(
            reporter.message("REQUIRED_CHILD_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: ""
            })
        ).toBe(
            "Required child validation failed because no direct child satisfied the provided predicate."
        );
    });

    it("resolves the named required-child validation message without an internal code suffix", () => {
        expect(
            reporter.message("REQUIRED_CHILD_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: " for DialogTrigger"
            })
        ).toBe(
            "Required child validation failed for DialogTrigger because no direct child satisfied the provided predicate."
        );
    });

    it("throws formatted required-child validation messages from fail", () => {
        expect(() =>
            reporter.fail("REQUIRED_CHILD_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "[DIALOG_TRIGGER_MISSING] ",
                childNameSegment: " for DialogTrigger"
            })
        ).toThrow(
            "[DIALOG_TRIGGER_MISSING] Required child validation failed for DialogTrigger because no direct child satisfied the provided predicate."
        );
    });

    it("resolves minimum-children validation messages without an internal code suffix", () => {
        expect(
            reporter.message("MINIMUM_CHILDREN_MATCHING_PREDICATE_FAILED", {
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
            reporter.fail("MINIMUM_CHILDREN_MATCHING_PREDICATE_FAILED", {
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

    it("resolves maximum-children validation messages without an internal code suffix", () => {
        expect(
            reporter.message("MAXIMUM_CHILDREN_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: "",
                actualCount: 2,
                actualCountPluralSuffix: "ren",
                maximumCount: 1
            })
        ).toBe(
            "Maximum children validation failed because 2 direct children satisfied the provided predicate; expected at most 1."
        );
    });

    it("throws formatted maximum-children validation messages from fail", () => {
        expect(() =>
            reporter.fail("MAXIMUM_CHILDREN_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "[DIALOG_ACTIONS_MAXIMUM] ",
                childNameSegment: " for DialogAction",
                actualCount: 2,
                actualCountPluralSuffix: "ren",
                maximumCount: 1
            })
        ).toThrow(
            "[DIALOG_ACTIONS_MAXIMUM] Maximum children validation failed for DialogAction because 2 direct children satisfied the provided predicate; expected at most 1."
        );
    });

    it("resolves exact-children validation messages without an internal code suffix", () => {
        expect(
            reporter.message("EXACT_CHILDREN_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: "",
                actualCount: 2,
                actualCountPluralSuffix: "ren",
                exactCount: 1
            })
        ).toBe(
            "Exact children validation failed because 2 direct children satisfied the provided predicate; expected exactly 1."
        );
    });

    it("throws formatted exact-children validation messages from fail", () => {
        expect(() =>
            reporter.fail("EXACT_CHILDREN_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "[DIALOG_ACTIONS_EXACT] ",
                childNameSegment: " for DialogAction",
                actualCount: 2,
                actualCountPluralSuffix: "ren",
                exactCount: 1
            })
        ).toThrow(
            "[DIALOG_ACTIONS_EXACT] Exact children validation failed for DialogAction because 2 direct children satisfied the provided predicate; expected exactly 1."
        );
    });

    it("resolves bounded-children validation messages without an internal code suffix", () => {
        expect(
            reporter.message("BOUNDED_CHILDREN_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: "",
                actualCount: 3,
                actualCountPluralSuffix: "ren",
                minimumCount: 1,
                maximumCount: 2
            })
        ).toBe(
            "Bounded children validation failed because 3 direct children satisfied the provided predicate; expected between 1 and 2 inclusive."
        );
    });

    it("throws formatted bounded-children validation messages from fail", () => {
        expect(() =>
            reporter.fail("BOUNDED_CHILDREN_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "[DIALOG_ACTIONS_BOUNDED] ",
                childNameSegment: " for DialogAction",
                actualCount: 3,
                actualCountPluralSuffix: "ren",
                minimumCount: 1,
                maximumCount: 2
            })
        ).toThrow(
            "[DIALOG_ACTIONS_BOUNDED] Bounded children validation failed for DialogAction because 3 direct children satisfied the provided predicate; expected between 1 and 2 inclusive."
        );
    });
});
