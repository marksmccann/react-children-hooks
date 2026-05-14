# `useChildByType`

Returns the first direct child element whose React element type exactly matches the provided type.

## Signature

```ts
function useChildByType<T extends React.ElementType>(
    children: React.ReactNode,
    type: T
): ElementOfType<T> | null;
```

## Parameters

| Parameter  | Type                | Required | Description                                                               |
| ---------- | ------------------- | -------- | ------------------------------------------------------------------------- |
| `children` | `React.ReactNode`   | Yes      | The React children value to inspect.                                      |
| `type`     | `React.ElementType` | Yes      | The element or component type to match against each direct child element. |

## Returns

The first direct child element whose type matches the provided element type, or `null` when no match is found.

## Usage

```tsx
import { useChildByType } from "react-children-hooks";

function Dialog({ children }: { children: React.ReactNode }) {
    const trigger = useChildByType(children, "button");

    return <div>Has trigger: {trigger ? "yes" : "no"}</div>;
}
```
