# react-children-hooks

`react-children-hooks` is a TypeScript-first React library for inspecting, traversing, querying, and validating `props.children`.

## Why?

React is right to be cautious about child inspection APIs. Arbitrary traversal of `props.children` can make components harder to understand, easier to misuse, and more fragile to refactors. This package is not trying to argue otherwise. There are, however, cases where child composition is the right choice and can lead to elegant, expressive APIs, particularly when the composition contract is intentional, constrained, and well-defined.

In those cases, the question is not whether to inspect children at all, but how to do it in a way that is safe, readable, and ergonomic at both runtime and in TypeScript. This package is designed to make this kind of API shape easier to build and safer to use:

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

- [`useOptionalChildMatching`](./docs/useOptionalChildMatching.md): `0..1` matching children, returns the child or `null`, throws on duplicates.
- [`useOptionalChildByType`](./docs/useOptionalChildByType.md): `0..1` matching children by type, returns the child or `null`, throws on duplicates.
- [`useOptionalCallbackChild`](./docs/useOptionalCallbackChild.md): `0..1` direct callback children, returns the callback or `null`, throws on duplicates.
- [`useRequiredChildMatching`](./docs/useRequiredChildMatching.md): `1+` matching children required, returns the first match.
- [`useRequiredChildByType`](./docs/useRequiredChildByType.md): `1+` matching children by type required, returns the first match.
- [`useRequiredCallbackChild`](./docs/useRequiredCallbackChild.md): `1+` direct callback children required, returns the first callback.
- [`useOnlyChildMatching`](./docs/useOnlyChildMatching.md): exactly `1` matching child required, returns that match.
- [`useOnlyChildByType`](./docs/useOnlyChildByType.md): exactly `1` matching child by type required, returns that match.
- [`useOnlyCallbackChild`](./docs/useOnlyCallbackChild.md): exactly `1` direct callback child required, returns that callback.
- [`useMinimumChildrenMatching`](./docs/useMinimumChildrenMatching.md): at least `n` matching children required, returns all matches.
- [`useMinimumChildrenByType`](./docs/useMinimumChildrenByType.md): at least `n` matching children by type required, returns all matches.
- [`useMaximumChildrenMatching`](./docs/useMaximumChildrenMatching.md): at most `n` matching children allowed, returns all matches.
- [`useMaximumChildrenByType`](./docs/useMaximumChildrenByType.md): at most `n` matching children by type allowed, returns all matches.
- [`useExactChildrenMatching`](./docs/useExactChildrenMatching.md): exactly `n` matching children required, returns all matches.
- [`useExactChildrenByType`](./docs/useExactChildrenByType.md): exactly `n` matching children by type required, returns all matches.
- [`useBoundedChildrenMatching`](./docs/useBoundedChildrenMatching.md): between `minimum` and `maximum` matching children required, returns all matches.
- [`useBoundedChildrenByType`](./docs/useBoundedChildrenByType.md): between `minimum` and `maximum` matching children by type required, returns all matches.
- [`useExclusiveChildMatching`](./docs/useExclusiveChildMatching.md): exactly one inspected child element required, and it must match.
- [`useExclusiveChildByType`](./docs/useExclusiveChildByType.md): exactly one inspected child element by type required.
- [`useExclusiveCallbackChild`](./docs/useExclusiveCallbackChild.md): exactly one direct child required, and it must be a callback child.
