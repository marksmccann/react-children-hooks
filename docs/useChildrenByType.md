# `useChildrenByType`

Returns the child elements whose React element type exactly matches the provided type.

## Signature

```ts
function useChildrenByType<T extends React.ElementType>(
    children: React.ReactNode,
    type: T,
    options?: QueryOptions
): ElementOfType<T>[];
```

## Parameters

| Parameter  | Type                | Required | Description                                                                 |
| ---------- | ------------------- | -------- | --------------------------------------------------------------------------- |
| `children` | `React.ReactNode`   | Yes      | The React children value to inspect.                                        |
| `type`     | `React.ElementType` | Yes      | The element or component type to match against each direct child element.   |
| `options`  | `QueryOptions`      | No       | Optional query metadata used to configure how child elements are inspected. |

## Returns

An array of child elements whose type matches the provided element type.

## Usage

```tsx
import { useChildrenByType } from "react-children-hooks";

function Toolbar({ children }: { children: React.ReactNode }) {
    const buttons = useChildrenByType(children, "button");

    return <div>Toolbar button count: {buttons.length}</div>;
}
```
