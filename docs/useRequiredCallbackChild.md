# `useRequiredCallbackChild`

Returns the first direct callback child from the provided children value, or throws when none is found.

## Signature

```ts
function useRequiredCallbackChild<
    TArguments extends unknown[] = [],
    TResult = React.ReactNode
>(
    children: CallbackChildren<TArguments, TResult>,
    options?: ValidationOptions
): CallbackChild<TArguments, TResult>;
```

## Parameters

| Parameter  | Type                               | Required | Description                                                          |
| ---------- | ---------------------------------- | -------- | -------------------------------------------------------------------- |
| `children` | `CallbackChildren<TArgs, TResult>` | Yes      | The direct children value to inspect for callback children.          |
| `options`  | `ValidationOptions`                | No       | Optional reporting metadata used to derive the thrown error message. |

## Returns

The first direct callback child from the provided children value.

## Usage

```tsx
import type { CallbackChildren } from "react-children-hooks";
import { useRequiredCallbackChild } from "react-children-hooks";

function Toggle({
    children,
    isOpen
}: {
    children: CallbackChildren<[boolean], React.ReactNode>;
    isOpen: boolean;
}) {
    const render = useRequiredCallbackChild<[boolean]>(children, {
        traceCode: "TOGGLE_RENDER_CHILD_MISSING",
        childName: "ToggleRenderChild"
    });

    return <div>{render(isOpen)}</div>;
}
```
