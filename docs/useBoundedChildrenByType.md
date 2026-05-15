# `useBoundedChildrenByType`

Returns the direct child elements whose React element type exactly matches the provided type, or throws when the count falls outside the inclusive bounds.

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

| Parameter  | Type                  | Required | Description                                                                         |
| ---------- | --------------------- | -------- | ----------------------------------------------------------------------------------- |
| `children` | `React.ReactNode`     | Yes      | The React children value to inspect.                                                |
| `type`     | `React.ElementType`   | Yes      | The element or component type to match against each direct child element.           |
| `bounds`   | `ChildrenCountBounds` | Yes      | The inclusive minimum and maximum number of matching direct child elements allowed. |
| `options`  | `ValidationOptions`   | No       | Optional reporting metadata used to derive the thrown validation message.           |

## Returns

The direct child elements whose type matches the provided element type.

## Usage

```tsx
import { useBoundedChildrenByType } from "react-children-hooks";

function DialogActions({ children }: { children: React.ReactNode }) {
    const actions = useBoundedChildrenByType(
        children,
        "button",
        { minimum: 1, maximum: 3 },
        { traceCode: "DIALOG_ACTIONS_BOUNDED", childName: "DialogAction" }
    );

    return <div>{actions}</div>;
}
```
