# `useUniqueChildMatching`

Returns the only child element that satisfies the provided predicate, or throws when the match is not unique.

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

| Parameter   | Type                                                | Required | Description                                                                                                                            |
| ----------- | --------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `children`  | `React.ReactNode`                                   | Yes      | The React children value to inspect.                                                                                                   |
| `predicate` | `(element: React.ReactElement) => boolean`          | Yes      | A predicate that is called with each direct child element to determine whether it matches.                                             |
| `options`   | [`ValidationOptions`](./types.md#validationoptions) | No       | Optional reporting and traversal metadata used to derive the thrown validation message and configure how child elements are inspected. |

## Returns

The only child element that satisfies the provided predicate.

## Usage

```tsx
import { useUniqueChildMatching } from "react-children-hooks";

function Dialog({ children }: { children: React.ReactNode }) {
    const trigger = useUniqueChildMatching(
        children,
        (element) => element.props.slot === "trigger",
        { traceCode: "TC002", childName: "DialogTrigger" }
    );

    return <div>{trigger}</div>;
}
```
