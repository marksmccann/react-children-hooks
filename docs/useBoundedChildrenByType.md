# `useBoundedChildrenByType`

Returns the child elements whose React element type exactly matches the provided type, or throws when the count falls outside the inclusive bounds.

## Signature

```ts
function useBoundedChildrenByType<T extends React.ElementType>(
    children: React.ReactNode,
    type: T,
    bounds: ChildrenCountBounds,
    options?: ValidationOptions
): ElementOfType<T>[];
```

## Parameters

| Parameter  | Type                  | Required | Description                                                                                                                            |
| ---------- | --------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `children` | `React.ReactNode`     | Yes      | The React children value to inspect.                                                                                                   |
| `type`     | `React.ElementType`   | Yes      | The element or component type to match against each direct child element.                                                              |
| `bounds`   | `ChildrenCountBounds` | Yes      | The inclusive minimum and maximum number of matching direct child elements allowed.                                                    |
| `options`  | `ValidationOptions`   | No       | Optional reporting and traversal metadata used to derive the thrown validation message and configure how child elements are inspected. |

## Returns

The child elements whose type matches the provided element type.

## Usage

```tsx
import { useBoundedChildrenByType } from "react-children-hooks";

function DialogActions({ children }: { children: React.ReactNode }) {
    const actions = useBoundedChildrenByType(
        children,
        "button",
        { minimum: 1, maximum: 3 },
        { traceCode: "TC016", childName: "DialogAction" }
    );

    return <div>{actions}</div>;
}
```
