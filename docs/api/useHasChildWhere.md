# `useHasChildWhere`

Determines whether any direct child element satisfies the provided predicate.

## Signature

```ts
function useHasChildWhere<T extends React.ReactElement>(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => element is T
): boolean;

function useHasChildWhere(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => boolean
): boolean;
```

## Parameters

| Parameter   | Type                                       | Description                                                                                |
| ----------- | ------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `children`  | `React.ReactNode`                          | The React children value to inspect.                                                       |
| `predicate` | `(element: React.ReactElement) => boolean` | A predicate that is called with each direct child element to determine whether it matches. |

## Returns

`true` when at least one direct child element satisfies the provided predicate; otherwise `false`.

## Usage

```tsx
import { useHasChildWhere } from "react-children-hooks";

function Dialog({ children }: { children: React.ReactNode }) {
    const hasTrigger = useHasChildWhere(
        children,
        (element) => element.props.slot === "trigger"
    );

    return <div>Has trigger: {hasTrigger ? "yes" : "no"}</div>;
}
```
