# `useChildrenByType`

Returns the direct child elements whose React element type exactly matches the provided type.

## Signature

```ts
function useChildrenByType<T extends React.ElementType>(
    children: React.ReactNode,
    type: T
): ElementOfType<T>[];
```

## Parameters

| Parameter  | Type              | Description                                                               |
| ---------- | ----------------- | ------------------------------------------------------------------------- |
| `children` | `React.ReactNode` | The React children value to inspect.                                      |
| `type`     | `T`               | The element or component type to match against each direct child element. |

## Returns

An array of direct child elements whose type matches the provided element type.

## Usage

```tsx
import { useChildrenByType } from "react-children-hooks";

function Toolbar({ children }: { children: React.ReactNode }) {
    const buttons = useChildrenByType(children, "button");

    return <div>Toolbar button count: {buttons.length}</div>;
}
```
