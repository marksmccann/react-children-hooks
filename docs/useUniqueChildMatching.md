# `useUniqueChildMatching`

Returns the only direct child element that satisfies the provided predicate, or throws when the match is not unique.

## Signature

```ts
function useUniqueChildMatching<T extends React.ReactElement>(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => element is T,
    options?: ValidationOptions
): T;

function useUniqueChildMatching(
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

The only direct child element that satisfies the provided predicate.

## Usage

```tsx
import { useUniqueChildMatching } from "react-children-hooks";

function Dialog({ children }: { children: React.ReactNode }) {
    const trigger = useUniqueChildMatching(
        children,
        (element) => element.props.slot === "trigger",
        { traceCode: "DIALOG_TRIGGER_UNIQUE", childName: "DialogTrigger" }
    );

    return <div>{trigger}</div>;
}
```
