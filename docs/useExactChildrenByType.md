# `useExactChildrenByType`

Returns the child elements whose React element type exactly matches the provided type, or throws when the exact count is not met.

## Signature

```ts
function useExactChildrenByType<T extends React.ElementType>(
    children: React.ReactNode,
    type: T,
    exactCount: number,
    options?: ValidationOptions
): ElementOfType<T>[];
```

## Parameters

| Parameter    | Type                                                | Required | Description                                                                                                                            |
| ------------ | --------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `children`   | `React.ReactNode`                                   | Yes      | The React children value to inspect.                                                                                                   |
| `type`       | `React.ElementType`                                 | Yes      | The element or component type to match against each direct child element.                                                              |
| `exactCount` | `number`                                            | Yes      | The exact number of matching direct child elements required.                                                                           |
| `options`    | [`ValidationOptions`](./types.md#validationoptions) | No       | Optional reporting and traversal metadata used to derive the thrown validation message and configure how child elements are inspected. |

## Returns

The child elements whose type matches the provided element type.

## Usage

```tsx
import { useExactChildrenByType } from "react-children-hooks";

function DialogActions({ children }: { children: React.ReactNode }) {
    const actions = useExactChildrenByType(children, "button", 2, {
        traceCode: "TC012",
        childName: "DialogAction"
    });

    return <div>{actions}</div>;
}
```
