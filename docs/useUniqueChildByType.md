# `useUniqueChildByType`

Returns the only child element whose React element type exactly matches the provided type, or throws when the match is not unique.

## Signature

```ts
function useUniqueChildByType<T extends React.ElementType>(
    children: React.ReactNode,
    type: T,
    options?: ValidationOptions
): ElementOfType<T>;
```

## Parameters

| Parameter  | Type                | Required | Description                                                                                                                            |
| ---------- | ------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `children` | `React.ReactNode`   | Yes      | The React children value to inspect.                                                                                                   |
| `type`     | `React.ElementType` | Yes      | The element or component type to match against each direct child element.                                                              |
| `options`  | `ValidationOptions` | No       | Optional reporting and traversal metadata used to derive the thrown validation message and configure how child elements are inspected. |

## Returns

The only child element whose type matches the provided element type.

## Usage

```tsx
import { useUniqueChildByType } from "react-children-hooks";

function Dialog({ children }: { children: React.ReactNode }) {
    const trigger = useUniqueChildByType(children, "button", {
        traceCode: "DIALOG_TRIGGER_UNIQUE",
        childName: "DialogTrigger"
    });

    return <div>{trigger}</div>;
}
```
