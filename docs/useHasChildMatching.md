# `useHasChildMatching`

Determines whether any child element satisfies the provided predicate.

## Signature

```ts
function useHasChildMatching<T extends React.ReactElement>(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => element is T,
    options?: QueryOptions
): boolean;

function useHasChildMatching(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => boolean,
    options?: QueryOptions
): boolean;
```

## Parameters

| Parameter   | Type                                       | Required | Description                                                                                |
| ----------- | ------------------------------------------ | -------- | ------------------------------------------------------------------------------------------ |
| `children`  | `React.ReactNode`                          | Yes      | The React children value to inspect.                                                       |
| `predicate` | `(element: React.ReactElement) => boolean` | Yes      | A predicate that is called with each direct child element to determine whether it matches. |
| `options`   | [`QueryOptions`](./types.md#queryoptions)  | No       | Optional query metadata used to configure how child elements are inspected.                |

## Returns

`true` when at least one child element satisfies the provided predicate; otherwise `false`.

## Usage

```tsx
import { useHasChildMatching } from "react-children-hooks";

function Dialog({ children }: { children: React.ReactNode }) {
    const hasTrigger = useHasChildMatching(
        children,
        (element) => element.props.slot === "trigger"
    );

    return <div>Has trigger: {hasTrigger ? "yes" : "no"}</div>;
}
```
