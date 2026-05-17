# `useExclusiveChildMatching`

Returns the only inspected child element when it satisfies the provided predicate, or throws when any other inspected child element exists or the sole inspected child does not match.

## Signature

```ts
function useExclusiveChildMatching<T extends React.ReactElement>(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => element is T,
    options?: ValidationOptions
): T;

function useExclusiveChildMatching(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => boolean,
    options?: ValidationOptions
): React.ReactElement;
```

## Parameters

| Parameter   | Type                                                | Required | Description                                                                                                                            |
| ----------- | --------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `children`  | `React.ReactNode`                                   | Yes      | The React children value to inspect.                                                                                                   |
| `predicate` | `(element: React.ReactElement) => boolean`          | Yes      | A predicate that is called with each inspected child element to determine whether it matches.                                          |
| `options`   | [`ValidationOptions`](./types.md#validationoptions) | No       | Optional reporting and traversal metadata used to derive the thrown validation message and configure how child elements are inspected. |

## Returns

The only inspected child element when it satisfies the provided predicate.

## Usage

```tsx
import { useExclusiveChildMatching } from "react-children-hooks";

function Dialog({ children }: { children: React.ReactNode }) {
    const trigger = useExclusiveChildMatching(
        children,
        (element) => element.props.slot === "trigger",
        { traceCode: "TC012", childName: "DialogTrigger" }
    );

    return <div>{trigger}</div>;
}
```
