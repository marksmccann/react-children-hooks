# `useRequiredChildByType`

Returns the first direct child element whose React element type exactly matches the provided type, or throws when no match is found.

## Signature

```ts
function useRequiredChildByType<T extends React.ElementType>(
    children: React.ReactNode,
    type: T,
    options?: ValidationOptions
): ElementOfType<T>;
```

## Parameters

| Parameter  | Type                | Required | Description                                                               |
| ---------- | ------------------- | -------- | ------------------------------------------------------------------------- |
| `children` | `React.ReactNode`   | Yes      | The React children value to inspect.                                      |
| `type`     | `React.ElementType` | Yes      | The element or component type to match against each direct child element. |
| `options`  | `ValidationOptions` | No       | Optional reporting metadata used to derive the thrown validation message. |

## Returns

The first direct child element whose type matches the provided element type.

## Usage

```tsx
import { useRequiredChildByType } from "react-children-hooks";

function Dialog({ children }: { children: React.ReactNode }) {
    const trigger = useRequiredChildByType(children, "button", {
        traceCode: "DIALOG_TRIGGER_MISSING",
        childName: "DialogTrigger"
    });

    return <div>{trigger}</div>;
}
```
