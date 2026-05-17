# react-children-hooks

`react-children-hooks` is a TypeScript-first React library for inspecting, traversing, querying, and validating `props.children`.

## API Reference

### Query Hooks

Find and retrieve matching children.

- [`useCallbackChild`](./docs/useCallbackChild.md): first direct callback child, or `null`.
- [`useChildByType`](./docs/useChildByType.md): first matching child by type, or `null`.
- [`useChildMatching`](./docs/useChildMatching.md): first matching child, or `null`.
- [`useChildrenByType`](./docs/useChildrenByType.md): all matching children by type.
- [`useChildrenMatching`](./docs/useChildrenMatching.md): all matching children.

### Quantity Hooks

Count matching children.

- [`useChildrenCountByType`](./docs/useChildrenCountByType.md): number of matching children by type.
- [`useChildrenCountMatching`](./docs/useChildrenCountMatching.md): number of matching children.

### Existence Hooks

Answer whether a child exists.

- [`useHasChildByType`](./docs/useHasChildByType.md): whether any matching child by type exists.
- [`useHasChildMatching`](./docs/useHasChildMatching.md): whether any matching child exists.

### Cardinality Hooks

Find and retrieve matching children while also enforcing count constraints.

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

### Types

- [`CallbackChild`](./docs/types.md#callbackchild)
- [`CallbackChildren`](./docs/types.md#callbackchildren)
- [`ChildrenCountBounds`](./docs/types.md#childrencountbounds)
- [`ElementOfType`](./docs/types.md#elementoftype)
- [`QueryOptions`](./docs/types.md#queryoptions)
- [`TraversalOptions`](./docs/types.md#traversaloptions)
- [`ValidationOptions`](./docs/types.md#validationoptions)
