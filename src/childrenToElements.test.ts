import { createElement, Fragment } from "react";
import { describe, expect, it } from "vitest";

import { childrenToElements } from "./childrenToElements";

describe("childrenToElements", () => {
    it("returns only valid React elements from mixed children", () => {
        const children = [
            createElement("span", { key: "span" }),
            "text",
            123,
            null,
            false,
            createElement("button", { key: "button" })
        ];

        const result = childrenToElements(children);

        expect(result).toHaveLength(2);
        expect(result[0]?.type).toBe("span");
        expect(result[1]?.type).toBe("button");
    });

    it("flattens nested child arrays while keeping traversal shallow", () => {
        const children = [
            [createElement("span", { key: "nested-span" }), null],
            createElement(Fragment, {
                key: "fragment",
                children: createElement("button", { key: "fragment-button" })
            })
        ];

        const result = childrenToElements(children);

        expect(result).toHaveLength(2);
        expect(result[0]?.type).toBe("span");
        expect(result[1]?.type).toBe(Fragment);
    });
});
