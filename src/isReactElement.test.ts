import { createElement } from "react";
import { describe, expect, it } from "vitest";

import { isReactElement } from "./isReactElement";

describe("isReactElement", () => {
    it("returns true for valid React elements", () => {
        expect(isReactElement(createElement("div"))).toBe(true);
    });

    it("returns false for non-element React nodes", () => {
        expect(isReactElement("text")).toBe(false);
        expect(isReactElement(123)).toBe(false);
        expect(isReactElement(null)).toBe(false);
        expect(isReactElement(false)).toBe(false);
    });
});
