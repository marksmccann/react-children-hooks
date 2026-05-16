# `useMaximumChildrenByType`

Returns the child elements whose React element type exactly matches the provided type, or throws when more than the maximum count are found.

## Signature

```ts
function useMaximumChildrenByType<T extends React.ElementType>(
    children: React.ReactNode,
    type: T,
    maximumCount: number,
    options?: ValidationOptions
): ElementOfType<T>[];
```

## Parameters

| Parameter      | Type                | Required | Description                                                                                                                            |
| -------------- | ------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `children`     | `React.ReactNode`   | Yes      | The React children value to inspect.                                                                                                   |
| `type`         | `React.ElementType` | Yes      | The element or component type to match against each direct child element.                                                              |
| `maximumCount` | `number`            | Yes      | The maximum number of matching direct child elements allowed.                                                                          |
| `options`      | `ValidationOptions` | No       | Optional reporting and traversal metadata used to derive the thrown validation message and configure how child elements are inspected. |

## Returns

The child elements whose type matches the provided element type.

## Usage

```tsx
import { useMaximumChildrenByType } from "react-children-hooks";

function DialogActions({ children }: { children: React.ReactNode }) {
    const actions = useMaximumChildrenByType(children, "button", 2, {
        traceCode: "DIALOG_ACTIONS_MAXIMUM",
        childName: "DialogAction"
    });

    return <div>{actions}</div>;
}
```
