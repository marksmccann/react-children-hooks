import { renderHook } from "@testing-library/react";
import { createElement, type PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";

import reporter from "./reporter";
import useExclusiveChildByType from "./useExclusiveChildByType";

function ExampleComponent({ children }: PropsWithChildren<object>) {
    return createElement("section", null, children);
}

describe("useExclusiveChildByType", () => {
    it("returns the only inspected child whose type matches", () => {
        const children = [createElement("button", { key: "button-1" })];

        const { result } = renderHook(() =>
            useExclusiveChildByType(children, "button")
        );

        expect(result.current.type).toBe("button");
        expect(result.current.key).toBe(".$button-1");
    });

    it("throws when another inspected child type is present", () => {
        const children = [
            createElement("button", { key: "button-1" }),
            createElement("span", { key: "span-1" })
        ];

        expect(() =>
            renderHook(() => useExclusiveChildByType(children, "button"))
        ).toThrow(
            reporter.message("EXCLUSIVE_CHILD_MATCHING_PREDICATE_FAILED", {
                traceCodePrefix: "",
                childNameSegment: "",
                actualCount: 2,
                actualCountPluralSuffix: "ren",
                matchingCount: 1
            })
        );
    });

    it("supports custom component types", () => {
        const children = [
            createElement(ExampleComponent, { key: "component-1" })
        ];

        const { result } = renderHook(() =>
            useExclusiveChildByType(children, ExampleComponent)
        );

        expect(result.current.type).toBe(ExampleComponent);
    });
});
