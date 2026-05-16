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

| Parameter  | Type                                                              | Required | Description                                                 |
| ---------- | ----------------------------------------------------------------- | -------- | ----------------------------------------------------------- |
| `children` | [`CallbackChildren<TArgs, TResult>`](./types.md#callbackchildren) | Yes      | The direct children value to inspect for callback children. |

## Returns

The first direct callback child, or `null` when no callback child is found.

## Usage

```tsx
import type { CallbackChild, CallbackChildren } from "react-children-hooks";
import { useCallbackChild } from "react-children-hooks";

type ToggleRenderChild = CallbackChild<[boolean], React.ReactNode>;

function Toggle({
    children,
    isOpen
}: {
    children: CallbackChildren<[boolean], React.ReactNode>;
    isOpen: boolean;
}) {
    const render = useCallbackChild<[boolean]>(children);

    if (!render) {
        return <div>Missing toggle render child.</div>;
    }

    return <div>{render(isOpen)}</div>;
}
```
