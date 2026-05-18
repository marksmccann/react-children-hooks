# `useDeprecatedChildMatching`

Determines whether any inspected child element satisfies the provided predicate and emits a deprecation warning when one is found.

Warnings are emitted at most once per unique deprecation configuration for the life of the current module instance.

## Signature

```ts
function useDeprecatedChildMatching<T extends React.ReactElement>(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => element is T,
    options: DeprecationOptions
): boolean;

function useDeprecatedChildMatching(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => boolean,
    options: DeprecationOptions
): boolean;
```

## Parameters

| Parameter   | Type                                                  | Required | Description                                                                                                        |
| ----------- | ----------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `children`  | `React.ReactNode`                                     | Yes      | The React children value to inspect.                                                                               |
| `predicate` | `(element: React.ReactElement) => boolean`            | Yes      | A predicate that is called with each inspected child element to determine whether it represents deprecated usage.  |
| `options`   | [`DeprecationOptions`](./types.md#deprecationoptions) | Yes      | The deprecation guidance and optional traversal metadata used to inspect children and resolve the warning message. |

## Returns

`true` when at least one inspected child element satisfies the predicate; otherwise `false`.

## Usage

```tsx
import { useDeprecatedChildMatching } from "react-children-hooks";

function Dialog({ children }: { children: React.ReactNode }) {
    const hasLegacyTrigger = useDeprecatedChildMatching(
        children,
        (element) => element.props.slot === "legacy-trigger",
        {
            traceCode: "DIALOG_TRIGGER_DEPRECATED",
            childName: "Dialog.LegacyTrigger",
            message: "Use Dialog.Trigger instead."
        }
    );

    return <div data-has-legacy-trigger={hasLegacyTrigger}>{children}</div>;
}
```
