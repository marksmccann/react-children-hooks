# `useUniqueCallbackChild`

Returns the only direct callback child from the provided children value, or throws when the match is not unique.

## Signature

```ts
function useUniqueCallbackChild<
    TArguments extends unknown[] = [],
    TResult = React.ReactNode
>(
    children: CallbackChildren<TArguments, TResult>,
    options?: ValidationOptions
): CallbackChild<TArguments, TResult>;
```

## Parameters

| Parameter  | Type                                                              | Required | Description                                                          |
| ---------- | ----------------------------------------------------------------- | -------- | -------------------------------------------------------------------- |
| `children` | [`CallbackChildren<TArgs, TResult>`](./types.md#callbackchildren) | Yes      | The direct children value to inspect for callback children.          |
| `options`  | [`ValidationOptions`](./types.md#validationoptions)               | No       | Optional reporting metadata used to derive the thrown error message. |

## Returns

The only direct callback child from the provided children value.

## Usage

```tsx
import type { CallbackChildren } from "react-children-hooks";
import { useUniqueCallbackChild } from "react-children-hooks";

function Toggle({
    children,
    isOpen
}: {
    children: CallbackChildren<[boolean], React.ReactNode>;
    isOpen: boolean;
}) {
    const render = useUniqueCallbackChild<[boolean]>(children, {
        traceCode: "TC011",
        childName: "ToggleRenderChild"
    });

    return <div>{render(isOpen)}</div>;
}
```
