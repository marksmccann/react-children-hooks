# `useHasChildByType`

Determines whether any child element whose React element type exactly matches the provided type exists.

## Signature

```ts
function useHasChildByType<T extends React.ElementType>(
    children: React.ReactNode,
    type: T,
    options?: QueryOptions
): boolean;
```

## Parameters

| Parameter  | Type                                      | Required | Description                                                                 |
| ---------- | ----------------------------------------- | -------- | --------------------------------------------------------------------------- |
| `children` | `React.ReactNode`                         | Yes      | The React children value to inspect.                                        |
| `type`     | `React.ElementType`                       | Yes      | The element or component type to match against each direct child element.   |
| `options`  | [`QueryOptions`](./types.md#queryoptions) | No       | Optional query metadata used to configure how child elements are inspected. |

## Returns

`true` when at least one child element whose type matches the provided element type exists; otherwise `false`.

## Usage

```tsx
import { useHasChildByType } from "react-children-hooks";

function Dialog({ children }: { children: React.ReactNode }) {
    const hasButtonTrigger = useHasChildByType(children, "button");

    return <div>Has button trigger: {hasButtonTrigger ? "yes" : "no"}</div>;
}
```
