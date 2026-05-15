# `useOptionalChildByType`

Returns the optional direct child element whose React element type exactly matches the provided type, or throws when more than one match is found.

## Signature

```ts
function useOptionalChildByType<T extends React.ElementType>(
    children: React.ReactNode,
    type: T,
    options?: ValidationOptions
): ElementOfType<T> | null;
```

## Parameters

| Parameter  | Type                | Required | Description                                                               |
| ---------- | ------------------- | -------- | ------------------------------------------------------------------------- |
| `children` | `React.ReactNode`   | Yes      | The React children value to inspect.                                      |
| `type`     | `React.ElementType` | Yes      | The element or component type to match against each direct child element. |
| `options`  | `ValidationOptions` | No       | Optional reporting metadata used to derive the thrown validation message. |

## Returns

The optional direct child element whose type matches the provided element type, or `null` when no match is found.

## Usage

```tsx
import { useOptionalChildByType } from "react-children-hooks";

function Dialog({ children }: { children: React.ReactNode }) {
    const icon = useOptionalChildByType(children, "button", {
        traceCode: "DIALOG_ICON_OPTIONAL",
        childName: "DialogIcon"
    });

    return <div>{icon}</div>;
}
```
