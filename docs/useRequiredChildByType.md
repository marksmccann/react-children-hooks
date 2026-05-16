# `useRequiredChildByType`

Returns the first child element whose React element type exactly matches the provided type, or throws when no match is found.

## Signature

```ts
function useRequiredChildByType<T extends React.ElementType>(
    children: React.ReactNode,
    type: T,
    options?: ValidationOptions
): ElementOfType<T>;
```

## Parameters

| Parameter  | Type                                                | Required | Description                                                                                                                            |
| ---------- | --------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `children` | `React.ReactNode`                                   | Yes      | The React children value to inspect.                                                                                                   |
| `type`     | `React.ElementType`                                 | Yes      | The element or component type to match against each direct child element.                                                              |
| `options`  | [`ValidationOptions`](./types.md#validationoptions) | No       | Optional reporting and traversal metadata used to derive the thrown validation message and configure how child elements are inspected. |

## Returns

The first child element whose type matches the provided element type.

## Usage

```tsx
import { useRequiredChildByType } from "react-children-hooks";

function Dialog({ children }: { children: React.ReactNode }) {
    const trigger = useRequiredChildByType(children, "button", {
        traceCode: "TC008",
        childName: "DialogTrigger"
    });

    return <div>{trigger}</div>;
}
```
