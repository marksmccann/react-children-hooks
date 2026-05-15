# `useCallbackChild`

Returns the first direct callback child from the provided children value.

## Signature

```ts
function useCallbackChild<
    TArguments extends unknown[] = [],
    TResult = React.ReactNode
>(
    children: CallbackChildren<TArguments, TResult>
): CallbackChild<TArguments, TResult> | null;
```

## Parameters

| Parameter  | Type                               | Required | Description                                                 |
| ---------- | ---------------------------------- | -------- | ----------------------------------------------------------- |
| `children` | `CallbackChildren<TArgs, TResult>` | Yes      | The direct children value to inspect for callback children. |

## Returns

The first direct callback child, or `null` when no callback child is found.

## Usage

```tsx
import type { CallbackChildren } from "react-children-hooks";
import { useCallbackChild } from "react-children-hooks";

function Toggle({
    children,
    isOpen
}: {
    children: CallbackChildren<[boolean], React.ReactNode>;
    isOpen: boolean;
}) {
    const render = useCallbackChild<[boolean]>(children);

    return <div>{render ? render(isOpen) : children}</div>;
}
```
