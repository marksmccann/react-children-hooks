# `useRequiredChildMatching`

Returns the first direct child element that satisfies the provided predicate, or throws when no match is found.

## Signature

```ts
function useRequiredChildMatching<T extends React.ReactElement>(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => element is T,
    options?: ValidationOptions
): T;

function useRequiredChildMatching(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => boolean,
    options?: ValidationOptions
): React.ReactElement;
```

## Parameters

| Parameter   | Type                                       | Required | Description                                                                                |
| ----------- | ------------------------------------------ | -------- | ------------------------------------------------------------------------------------------ |
| `children`  | `React.ReactNode`                          | Yes      | The React children value to inspect.                                                       |
| `predicate` | `(element: React.ReactElement) => boolean` | Yes      | A predicate that is called with each direct child element to determine whether it matches. |
| `options`   | `ValidationOptions`                        | No       | Optional reporting metadata used to derive the thrown validation message.                  |

## Returns

The first direct child element that satisfies the provided predicate.

## Usage

```tsx
import { useRequiredChildMatching } from "react-children-hooks";

function Dialog({ children }: { children: React.ReactNode }) {
    const trigger = useRequiredChildMatching(
        children,
        (element) => element.props.slot === "trigger",
        { traceCode: "DIALOG_TRIGGER_MISSING", childName: "DialogTrigger" }
    );

    return <div>{trigger}</div>;
}
```
