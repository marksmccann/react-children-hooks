# `useDeprecatedChildByType`

Determines whether any inspected child element whose React element type exactly matches the provided type exists and emits a deprecation warning when one is found.

Warnings are emitted at most once per unique deprecation configuration for the life of the current module instance.

## Signature

```ts
function useDeprecatedChildByType<T extends React.ElementType>(
    children: React.ReactNode,
    type: T,
    options: DeprecationOptions
): boolean;
```

## Parameters

| Parameter  | Type                                                  | Required | Description                                                                                                        |
| ---------- | ----------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `children` | `React.ReactNode`                                     | Yes      | The React children value to inspect.                                                                               |
| `type`     | `React.ElementType`                                   | Yes      | The element or component type to match against each inspected child element.                                       |
| `options`  | [`DeprecationOptions`](./types.md#deprecationoptions) | Yes      | The deprecation guidance and optional traversal metadata used to inspect children and resolve the warning message. |

## Returns

`true` when at least one inspected child element whose type matches the provided element type exists; otherwise `false`.

## Usage

```tsx
import { useDeprecatedChildByType } from "react-children-hooks";

function Dialog({ children }: { children: React.ReactNode }) {
    const hasLegacyTrigger = useDeprecatedChildByType(
        children,
        DialogLegacyTrigger,
        {
            traceCode: "DIALOG_TRIGGER_DEPRECATED",
            message: "Use Dialog.Trigger instead."
        }
    );

    return <div data-has-legacy-trigger={hasLegacyTrigger}>{children}</div>;
}
```
