# `useChildWhere`

Returns the first direct child element that satisfies the provided predicate.

## Signature

```ts
function useChildWhere<T extends React.ReactElement>(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => element is T
): T | null;

function useChildWhere(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => boolean
): React.ReactElement | null;
```

## Parameters

| Parameter   | Type                                       | Required | Description                                                                                |
| ----------- | ------------------------------------------ | -------- | ------------------------------------------------------------------------------------------ |
| `children`  | `React.ReactNode`                          | Yes      | The React children value to inspect.                                                       |
| `predicate` | `(element: React.ReactElement) => boolean` | Yes      | A predicate that is called with each direct child element to determine whether it matches. |

## Returns

The first direct child element that satisfies the provided predicate, or `null` when no match is found.

## Usage

```tsx
import { useChildWhere } from "react-children-hooks";

function Dialog({ children }: { children: React.ReactNode }) {
    const trigger = useChildWhere(
        children,
        (element) => element.props.slot === "trigger"
    );

    return <div>Has trigger: {trigger ? "yes" : "no"}</div>;
}
```
