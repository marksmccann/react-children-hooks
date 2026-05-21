# react-children-hooks

`react-children-hooks` is a TypeScript-first React library for inspecting, traversing, querying, and validating `props.children`.

## Why?

React is right to be cautious about child inspection APIs. Arbitrary traversal of `props.children` can make components harder to understand, easier to misuse, more fragile to structural changes, and more expensive than necessary when too much of the tree is inspected. This package is not trying to argue otherwise.

There are, however, cases where child composition is the right choice and can lead to elegant, expressive APIs, especially when the composition contract is intentional, constrained, and well-defined. In those cases, the question is not whether to inspect children at all, but how to do it in a way that is safe, readable, and ergonomic at both runtime and in TypeScript.

This package is designed with those concerns in mind. It inspects direct children only by default, makes deeper traversal opt-in and bounded, and memoizes element-based results from children, the predicate, and the provided options. The goal is to make this kind of API easier to build and safer to use:

```tsx
<Tabs>
    <Tabs.List>
        <Tabs.Tab />
        <Tabs.Tab />
    </Tabs.List>
    <Tabs.Panel />
    <Tabs.Panel />
</Tabs>
```

## Use This Package If ...

- the parent component defines and owns the allowed composition patterns
- the supported child roles are intentionally limited and well-defined
- enforcing child type or cardinality rules improves correctness
- you want misuse to fail loudly with clear diagnostics instead of becoming a silent bug
- you want the consumer to express structure directly in JSX, with guardrails around that structure
- the consumer benefits from placing content directly in the child element that owns it, rather than routing it through parent props
- your API benefits from a narrow, enforceable composition contract

## Don't Use This Package If ...

- your component should accept arbitrary user-provided children with few assumptions
- you are traversing deeply into descendants to recover structure that would be clearer as props or data
- the child contract is so open-ended that validation would be guesswork
- a plain prop, data object, array, or render function would be simpler and clearer
- you are looking for a reason to overuse child inspection where React composition should remain loose

## Installation

```bash
npm install react-children-hooks
```

## Quick Start

Here's a basic example of how you can enforce a strict, type-safe compound component layout contract using `react-children-hooks`:

```tsx
import React from "react";
import { useOnlyChildByType, useChildrenByType } from "react-children-hooks";

// 1. Define the subcomponents
export const CardHeader = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props} />
);
export const CardContent = ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
);

// 2. Enforce the contract in the parent component
export function StrictCard({ children }: { children: React.ReactNode }) {
    // Enforces exactly ONE header, throwing a clear diagnostic if missing or duplicated
    const header = useOnlyChildByType(children, CardHeader);
    // Extracts all content blocks
    const contents = useChildrenByType(children, CardContent);

    return (
        <div className="strict-card">
            {/* Use `React.cloneElement` to safely apply additional props on a child */}
            {React.cloneElement(header, { id: "header" })}
            <main className="strict-card-content">{contents}</main>
        </div>
    );
}

// 3. Consumer usage
<StrictCard>
    <CardHeader>My Title</CardHeader>
    <CardContent>Block 1</CardContent>
    <CardContent>Block 2</CardContent>
</StrictCard>;
```

## Features & Core Concepts

### 1. Find The Children You Care About

Inspect `props.children` with focused hooks that help you retrieve references to specific children that you care about.

```tsx
const panels = useChildrenByType(children, Tabs.Panel);
const trigger = useChildMatching(children, isTriggerElement);
const render = useCallbackChild(children);
```

### 2. Work With Callback Children

Treat render-prop style children as a first-class pattern, with dedicated hooks for finding, requiring, or constraining callback children.

```tsx
const renderItem = useOnlyCallbackChild<[Item]>(children);
const fallbackRenderer = useOptionalCallbackChild<[Item]>(children);
```

### 3. Validate Composition Rules

Enforce the child contract your component expects, such as optional, required, or exclusive children.

```tsx
const list = useOnlyChildByType(children, Tabs.List);
const panels = useMinimumChildrenByType(children, Tabs.Panel, 1);
const icon = useOptionalChildByType(children, Icon);
```

### 4. Count Or Check Without Rebuilding Logic

Answer simple structural questions without manually traversing `children`.

```tsx
const hasDescription = useHasChildByType(children, Field.Description);
const actionCount = useChildrenCountByType(children, Dialog.Action);
```

### 5. Control How Deep Traversal Goes

Most element-based query and validation hooks accept traversal options so you can inspect children within a bounded depth range.

```tsx
const nestedPanels = useChildrenByType(children, Tabs.Panel, {
    maximumDepth: 1
});

const slottedActions = useExactChildrenMatching(children, isDialogAction, 2, {
    depth: 1,
    maximumDepth: 1
});
```

### 6. Customize Validation And Warning Messages

Validation and deprecation hooks customize console messaging so that you can use your component vocabulary and tracing conventions.

```tsx
const trigger = useRequiredChildByType(children, Dialog.Trigger, {
    traceCode: "MY_TRACE_CODE",
    childName: "Dialog.Trigger"
});

useDeprecatedChildMatching(children, isLegacyAction, {
    message: "Use Dialog.Action instead.",
    traceCode: "MY_TRACE_CODE",
    childName: "Dialog.LegacyAction"
});
```

## API Reference

### Find Children

- [`useCallbackChild`](./docs/useCallbackChild.md): first direct callback child, or `null`.
- [`useChildByType`](./docs/useChildByType.md): first matching child by type, or `null`.
- [`useChildMatching`](./docs/useChildMatching.md): first matching child, or `null`.
- [`useChildrenByType`](./docs/useChildrenByType.md): all matching children by type.
- [`useChildrenExcept`](./docs/useChildrenExcept.md): all inspected children except specific child elements.
- [`useChildrenMatching`](./docs/useChildrenMatching.md): all matching children.

### Count Children

- [`useChildrenCountByType`](./docs/useChildrenCountByType.md): number of matching children by type.
- [`useChildrenCountMatching`](./docs/useChildrenCountMatching.md): number of matching children.

### Check For Children

- [`useHasChildByType`](./docs/useHasChildByType.md): whether any matching child by type exists.
- [`useHasChildMatching`](./docs/useHasChildMatching.md): whether any matching child exists.

### Child Diagnostics

- [`useDeprecatedChildByType`](./docs/useDeprecatedChildByType.md): warns when a matching child type is deprecated.
- [`useDeprecatedChildMatching`](./docs/useDeprecatedChildMatching.md): warns when matching child usage is deprecated.

### Validate Children

**Zero or One (`0..1`)**

- [`useOptionalChildMatching`](./docs/useOptionalChildMatching.md): returns the matching child or `null`, and throws on duplicates.
- [`useOptionalChildByType`](./docs/useOptionalChildByType.md): returns the matching child by type or `null`, and throws on duplicates.
- [`useOptionalCallbackChild`](./docs/useOptionalCallbackChild.md): returns the direct callback child or `null`, and throws on duplicates.

**One or More (`1+`)**

- [`useRequiredChildMatching`](./docs/useRequiredChildMatching.md): requires at least one matching child and returns the first match.
- [`useRequiredChildByType`](./docs/useRequiredChildByType.md): requires at least one matching child by type and returns the first match.
- [`useRequiredCallbackChild`](./docs/useRequiredCallbackChild.md): requires at least one direct callback child and returns the first callback.

**Exactly One (`1`)**

- [`useOnlyChildMatching`](./docs/useOnlyChildMatching.md): requires exactly one matching child and returns that match.
- [`useOnlyChildByType`](./docs/useOnlyChildByType.md): requires exactly one matching child by type and returns that match.
- [`useOnlyCallbackChild`](./docs/useOnlyCallbackChild.md): requires exactly one direct callback child and returns that callback.
- [`useExclusiveChildMatching`](./docs/useExclusiveChildMatching.md): requires exactly one inspected child element, and it must match.
- [`useExclusiveChildByType`](./docs/useExclusiveChildByType.md): requires exactly one inspected child element by type.
- [`useExclusiveCallbackChild`](./docs/useExclusiveCallbackChild.md): requires exactly one direct child, and it must be a callback child.

**At Least `n`**

- [`useMinimumChildrenMatching`](./docs/useMinimumChildrenMatching.md): requires at least `n` matching children and returns all matches.
- [`useMinimumChildrenByType`](./docs/useMinimumChildrenByType.md): requires at least `n` matching children by type and returns all matches.

**At Most `n`**

- [`useMaximumChildrenMatching`](./docs/useMaximumChildrenMatching.md): allows at most `n` matching children and returns all matches.
- [`useMaximumChildrenByType`](./docs/useMaximumChildrenByType.md): allows at most `n` matching children by type and returns all matches.

**Exactly `n`**

- [`useExactChildrenMatching`](./docs/useExactChildrenMatching.md): requires exactly `n` matching children and returns all matches.
- [`useExactChildrenByType`](./docs/useExactChildrenByType.md): requires exactly `n` matching children by type and returns all matches.

**Between `minimum` and `maximum`**

- [`useBoundedChildrenMatching`](./docs/useBoundedChildrenMatching.md): requires matching children to stay within an inclusive range and returns all matches.
- [`useBoundedChildrenByType`](./docs/useBoundedChildrenByType.md): requires matching children by type to stay within an inclusive range and returns all matches.
