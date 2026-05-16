# `types`

Shared public types used across the hook APIs.

## `ChildrenCountBounds`

Inclusive minimum and maximum bounds used by the bounded validation hooks.

```ts
type ChildrenCountBounds = {
    minimum: number;
    maximum: number;
};
```

| Property  | Type     | Required | Description                                                    |
| --------- | -------- | -------- | -------------------------------------------------------------- |
| `minimum` | `number` | Yes      | The minimum number of matching direct child elements required. |
| `maximum` | `number` | Yes      | The maximum number of matching direct child elements allowed.  |

## `TraversalOptions`

Optional traversal bounds used by the element-based query and validation hooks.

```ts
type TraversalOptions = {
    depth?: number;
    maximumDepth?: number;
};
```

| Property       | Type     | Required | Description                                                                                    |
| -------------- | -------- | -------- | ---------------------------------------------------------------------------------------------- |
| `depth`        | `number` | No       | The minimum inclusive child depth to include in results, where `0` represents direct children. |
| `maximumDepth` | `number` | No       | The maximum inclusive child depth to include in results, where `0` represents direct children. |

## `QueryOptions`

Optional traversal metadata used by the element-based query hooks.

```ts
type QueryOptions = TraversalOptions;
```

See [`TraversalOptions`](#traversaloptions) for the available properties.

## `ElementOfType`

Represents a React element whose props and element type are narrowed to the provided React element type.

```ts
type ElementOfType<T extends React.ElementType> = React.ReactElement<
    React.ComponentProps<T>,
    T
>;
```

## `CallbackChild`

A callback child, also known as a render-prop child.

```ts
type CallbackChild<
    TArguments extends unknown[] = [],
    TResult = React.ReactNode
> = (...args: TArguments) => TResult;
```

## `CallbackChildren`

A direct-children value that may include callback children alongside regular React children.

```ts
type CallbackChildren<
    TArguments extends unknown[] = [],
    TResult = React.ReactNode
> =
    | React.ReactNode
    | CallbackChild<TArguments, TResult>
    | readonly CallbackChildren<TArguments, TResult>[];
```

## `ValidationOptions`

Optional reporting and traversal metadata used by the validation hooks.

```ts
type ValidationOptions = {
    traceCode?: string;
    childName?: string;
    depth?: number;
    maximumDepth?: number;
};
```

| Property       | Type     | Required | Description                                                                                    |
| -------------- | -------- | -------- | ---------------------------------------------------------------------------------------------- |
| `traceCode`    | `string` | No       | An optional consumer-defined trace code that is prefixed to the thrown validation message.     |
| `childName`    | `string` | No       | An optional human-readable child name that is included in the thrown validation message.       |
| `depth`        | `number` | No       | The minimum inclusive child depth to include in results, where `0` represents direct children. |
| `maximumDepth` | `number` | No       | The maximum inclusive child depth to include in results, where `0` represents direct children. |
