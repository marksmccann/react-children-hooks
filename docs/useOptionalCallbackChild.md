# `useOptionalCallbackChild`

Returns the optional direct callback child from the provided children value, or throws when more than one is found.

## Signature

```ts
function useOptionalCallbackChild<
    TArguments extends unknown[] = [],
    TResult = React.ReactNode
>(
    children: CallbackChildren<TArguments, TResult>,
    options?: ValidationOptions
): CallbackChild<TArguments, TResult> | null;
```

## Parameters

| Parameter  | Type                               | Required | Description                                                          |
| ---------- | ---------------------------------- | -------- | -------------------------------------------------------------------- |
| `children` | `CallbackChildren<TArgs, TResult>` | Yes      | The direct children value to inspect for callback children.          |
| `options`  | `ValidationOptions`                | No       | Optional reporting metadata used to derive the thrown error message. |

## Returns

The optional direct callback child from the provided children value, or `null` when none is found.

## Usage

```tsx
import type { CallbackChildren } from "react-children-hooks";
import { useOptionalCallbackChild } from "react-children-hooks";

function Toggle({
    children,
    isOpen
}: {
    children: CallbackChildren<[boolean], React.ReactNode>;
    isOpen: boolean;
}) {
    const render = useOptionalCallbackChild<[boolean]>(children, {
        traceCode: "TC013",
        childName: "ToggleRenderChild"
    });

    return <div>{render ? render(isOpen) : "Closed"}</div>;
}
```
