# `useChildByType`

Returns the first child element whose React element type exactly matches the provided type.

## Signature

```ts
function useChildByType<T extends React.ElementType>(
    children: React.ReactNode,
    type: T,
    options?: QueryOptions
): ElementOfType<T> | null;
```

## Parameters

| Parameter  | Type                                      | Required | Description                                                                 |
| ---------- | ----------------------------------------- | -------- | --------------------------------------------------------------------------- |
| `children` | `React.ReactNode`                         | Yes      | The React children value to inspect.                                        |
| `type`     | `React.ElementType`                       | Yes      | The element or component type to match against each direct child element.   |
| `options`  | [`QueryOptions`](./types.md#queryoptions) | No       | Optional query metadata used to configure how child elements are inspected. |

## Returns

The first child element whose type matches the provided element type, or `null` when no match is found.

## Usage

```tsx
import { useChildByType } from "react-children-hooks";

function Dialog({ children }: { children: React.ReactNode }) {
    const trigger = useChildByType(children, "button");

    return <div>Has trigger: {trigger ? "yes" : "no"}</div>;
}
```
