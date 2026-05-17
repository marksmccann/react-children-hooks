# `useExclusiveCallbackChild`

Returns the only direct child when it is a callback child, or throws when any other direct child exists or the sole direct child is not a callback.

## Signature

```ts
function useExclusiveCallbackChild<
    TArguments extends unknown[] = [],
    TResult = React.ReactNode
>(
    children: CallbackChildren<TArguments, TResult>,
    options?: ValidationOptions
): CallbackChild<TArguments, TResult>;
```

## Parameters

| Parameter  | Type                                                              | Required | Description                                                           |
| ---------- | ----------------------------------------------------------------- | -------- | --------------------------------------------------------------------- |
| `children` | [`CallbackChildren<TArgs, TResult>`](./types.md#callbackchildren) | Yes      | The direct children value to inspect for an exclusive callback child. |
| `options`  | [`ValidationOptions`](./types.md#validationoptions)               | No       | Optional reporting metadata used to derive the thrown error message.  |

## Returns

The only direct callback child from the provided children value.

## Usage

```tsx
import type { CallbackChildren } from "react-children-hooks";
import { useExclusiveCallbackChild } from "react-children-hooks";

function Toggle({
    children,
    isOpen
}: {
    children: CallbackChildren<[boolean], React.ReactNode>;
    isOpen: boolean;
}) {
    const render = useExclusiveCallbackChild<[boolean]>(children, {
        traceCode: "TC014",
        childName: "ToggleRenderChild"
    });

    return <div>{render(isOpen)}</div>;
}
```
