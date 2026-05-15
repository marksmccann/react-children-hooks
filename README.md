# react-children-hooks

`react-children-hooks` is a TypeScript-first React library for inspecting, traversing, querying, and validating `props.children`.

## API Reference

### Query Hooks

- [`useCallbackChild`](./docs/useCallbackChild.md)
- [`useChildByType`](./docs/useChildByType.md)
- [`useChildMatching`](./docs/useChildMatching.md)
- [`useChildrenByType`](./docs/useChildrenByType.md)
- [`useChildrenMatching`](./docs/useChildrenMatching.md)

### Query + Validation Hooks

- [`useBoundedChildrenByType`](./docs/useBoundedChildrenByType.md)
- [`useBoundedChildrenMatching`](./docs/useBoundedChildrenMatching.md)
- [`useExactChildrenByType`](./docs/useExactChildrenByType.md)
- [`useExactChildrenMatching`](./docs/useExactChildrenMatching.md)
- [`useMaximumChildrenByType`](./docs/useMaximumChildrenByType.md)
- [`useMaximumChildrenMatching`](./docs/useMaximumChildrenMatching.md)
- [`useMinimumChildrenByType`](./docs/useMinimumChildrenByType.md)
- [`useMinimumChildrenMatching`](./docs/useMinimumChildrenMatching.md)
- [`useOptionalChildByType`](./docs/useOptionalChildByType.md)
- [`useOptionalChildMatching`](./docs/useOptionalChildMatching.md)
- [`useRequiredCallbackChild`](./docs/useRequiredCallbackChild.md)
- [`useRequiredChildByType`](./docs/useRequiredChildByType.md)
- [`useRequiredChildMatching`](./docs/useRequiredChildMatching.md)
- [`useUniqueChildByType`](./docs/useUniqueChildByType.md)
- [`useUniqueChildMatching`](./docs/useUniqueChildMatching.md)

### Validation Hooks

- [`useHasChildMatching`](./docs/useHasChildMatching.md)

### Utilities

- [`childrenToElements`](./docs/childrenToElements.md)
- [`isElementOfType`](./docs/isElementOfType.md)
- [`isReactElement`](./docs/isReactElement.md)

### Types

- [`CallbackChild`](./src/types.ts)
- [`CallbackChildren`](./src/types.ts)
- [`ChildrenCountBounds`](./src/types.ts)
- [`ElementOfType`](./src/types.ts)
- [`ValidationOptions`](./src/types.ts)
