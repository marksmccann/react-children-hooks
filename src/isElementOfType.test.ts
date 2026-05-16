import { createElement, type PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";

import isElementOfType from "./isElementOfType";

function ExampleComponent({ children }: PropsWithChildren) {
    return createElement("div", null, children);
}

describe("isElementOfType", () => {
    it("returns true when an intrinsic element matches the provided type", () => {
        const element = createElement("button");

        expect(isElementOfType(element, "button")).toBe(true);
    });

    it("returns true when a custom component matches the provided type", () => {
        const element = createElement(ExampleComponent);

        expect(isElementOfType(element, ExampleComponent)).toBe(true);
    });

    it("returns false when the element type does not match", () => {
        const element = createElement("button");

        expect(isElementOfType(element, "a")).toBe(false);
        expect(isElementOfType(element, ExampleComponent)).toBe(false);
    });
});
