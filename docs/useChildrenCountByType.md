# `useChildrenCountByType`

Returns the number of child elements whose React element type exactly matches the provided type.

## Signature

```ts
function useChildrenCountByType<T extends React.ElementType>(
    children: React.ReactNode,
    type: T,
    options?: QueryOptions
): number;
```

## Parameters

| Parameter  | Type                                      | Required | Description                                                                 |
| ---------- | ----------------------------------------- | -------- | --------------------------------------------------------------------------- |
| `children` | `React.ReactNode`                         | Yes      | The React children value to inspect.                                        |
| `type`     | `React.ElementType`                       | Yes      | The element or component type to match against each direct child element.   |
| `options`  | [`QueryOptions`](./types.md#queryoptions) | No       | Optional query metadata used to configure how child elements are inspected. |

## Returns

The number of child elements whose type matches the provided element type.

## Usage

```tsx
import { useChildrenCountByType } from "react-children-hooks";

function Toolbar({ children }: { children: React.ReactNode }) {
    const buttonCount = useChildrenCountByType(children, "button");

    return <div>Toolbar button count: {buttonCount}</div>;
}
```
