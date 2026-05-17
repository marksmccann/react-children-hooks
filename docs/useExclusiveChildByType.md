# `useExclusiveChildByType`

Returns the only inspected child element when its React element type exactly matches the provided type, or throws when any other inspected child element exists or the sole inspected child does not match.

## Signature

```ts
function useExclusiveChildByType<T extends React.ElementType>(
    children: React.ReactNode,
    type: T,
    options?: ValidationOptions
): ElementOfType<T>;
```

## Parameters

| Parameter  | Type                                                | Required | Description                                                                                                                            |
| ---------- | --------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `children` | `React.ReactNode`                                   | Yes      | The React children value to inspect.                                                                                                   |
| `type`     | `React.ElementType`                                 | Yes      | The element or component type to match against the inspected child element.                                                            |
| `options`  | [`ValidationOptions`](./types.md#validationoptions) | No       | Optional reporting and traversal metadata used to derive the thrown validation message and configure how child elements are inspected. |

## Returns

The only inspected child element whose type matches the provided element type.

## Usage

```tsx
import { useExclusiveChildByType } from "react-children-hooks";

function Dialog({ children }: { children: React.ReactNode }) {
    const trigger = useExclusiveChildByType(children, "button", {
        traceCode: "TC013",
        childName: "DialogTrigger"
    });

    return <div>{trigger}</div>;
}
```
