# `useChildrenCountMatching`

Returns the number of child elements that satisfy the provided predicate.

## Signature

```ts
function useChildrenCountMatching<T extends React.ReactElement>(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => element is T,
    options?: QueryOptions
): number;

function useChildrenCountMatching(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => boolean,
    options?: QueryOptions
): number;
```

## Parameters

| Parameter   | Type                                       | Required | Description                                                                                |
| ----------- | ------------------------------------------ | -------- | ------------------------------------------------------------------------------------------ |
| `children`  | `React.ReactNode`                          | Yes      | The React children value to inspect.                                                       |
| `predicate` | `(element: React.ReactElement) => boolean` | Yes      | A predicate that is called with each direct child element to determine whether it matches. |
| `options`   | [`QueryOptions`](./types.md#queryoptions)  | No       | Optional query metadata used to configure how child elements are inspected.                |

## Returns

The number of child elements that satisfy the provided predicate.

## Usage

```tsx
import { useChildrenCountMatching } from "react-children-hooks";

function Toolbar({ children }: { children: React.ReactNode }) {
    const submitButtonCount = useChildrenCountMatching(
        children,
        (element) =>
            element.type === "button" && element.props.type === "submit"
    );

    return <div>Submit buttons: {submitButtonCount}</div>;
}
```
