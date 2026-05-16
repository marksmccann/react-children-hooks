import { createElement, Fragment } from "react";
import { describe, expect, it } from "vitest";

import { childrenToElements } from "./childrenToElements";
import reporter from "./reporter";

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

    it("defaults to direct children only when traversal options are omitted", () => {
        const children = [
            createElement(Fragment, {
                key: "fragment",
                children: createElement("button", { key: "nested-button" })
            }),
            createElement("span", { key: "direct-span" })
        ];

        const result = childrenToElements(children);

        expect(result).toHaveLength(2);
        expect(result[0]?.type).toBe(Fragment);
        expect(result[1]?.type).toBe("span");
    });

    it("includes descendant elements through the provided maximum depth", () => {
        const children = [
            createElement(Fragment, {
                key: "fragment",
                children: [
                    createElement("button", { key: "nested-button" }),
                    createElement("span", {
                        key: "nested-span",
                        children: createElement("div", { key: "deep-div" })
                    })
                ]
            }),
            createElement("section", { key: "direct-section" })
        ];

        const result = childrenToElements(children, { maximumDepth: 2 });

        expect(result).toHaveLength(5);
        expect(result.map((element) => element.key)).toEqual([
            ".$fragment",
            ".$direct-section",
            ".$nested-button",
            ".$nested-span",
            ".$deep-div"
        ]);
    });

    it("excludes shallower matches when depth starts below descendants", () => {
        const children = [
            createElement(Fragment, {
                key: "fragment",
                children: [
                    createElement("button", { key: "nested-button" }),
                    createElement("span", {
                        key: "nested-span",
                        children: createElement("div", { key: "deep-div" })
                    })
                ]
            }),
            createElement("section", { key: "direct-section" })
        ];

        const result = childrenToElements(children, {
            depth: 1,
            maximumDepth: 1
        });

        expect(result).toHaveLength(2);
        expect(result.map((element) => element.key)).toEqual([
            ".$nested-button",
            ".$nested-span"
        ]);
    });

    it("returns only elements within the inclusive depth range", () => {
        const children = [
            createElement(Fragment, {
                key: "fragment",
                children: createElement("span", {
                    key: "nested-span",
                    children: createElement("div", { key: "deep-div" })
                })
            }),
            createElement("section", { key: "direct-section" })
        ];

        const result = childrenToElements(children, {
            depth: 2,
            maximumDepth: 2
        });

        expect(result).toHaveLength(1);
        expect(result[0]?.key).toBe(".$deep-div");
    });

    it("throws the public reporter error when depth is invalid", () => {
        expect(() => childrenToElements(null, { depth: -1 })).toThrow(
            reporter.message("RCH001")
        );
    });

    it("throws the public reporter error when maximumDepth is invalid", () => {
        expect(() => childrenToElements(null, { maximumDepth: -1 })).toThrow(
            reporter.message("RCH002")
        );
    });

    it("throws the public reporter error when depth exceeds maximumDepth", () => {
        expect(() =>
            childrenToElements(null, { depth: 2, maximumDepth: 1 })
        ).toThrow(reporter.message("RCH003"));
    });
});
