# `useChildrenMatching`

Returns the child elements that satisfy the provided predicate.

## Signature

```ts
function useChildrenMatching<T extends React.ReactElement>(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => element is T,
    options?: QueryOptions
): T[];

function useChildrenMatching(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => boolean,
    options?: QueryOptions
): React.ReactElement[];
```

## Parameters

| Parameter   | Type                                       | Required | Description                                                                                                         |
| ----------- | ------------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `children`  | `React.ReactNode`                          | Yes      | The React children value to inspect.                                                                                |
| `predicate` | `(element: React.ReactElement) => boolean` | Yes      | A predicate that is called with each direct child element to determine whether it should be included in the result. |
| `options`   | [`QueryOptions`](./types.md#queryoptions)  | No       | Optional query metadata used to configure how child elements are inspected.                                         |

## Returns

An array of child elements that satisfy the provided predicate.

## Usage

```tsx
import { useChildrenMatching } from "react-children-hooks";

function Toolbar({ children }: { children: React.ReactNode }) {
    const submitButtons = useChildrenMatching(
        children,
        (element) =>
            element.type === "button" && element.props.type === "submit"
    );

    return <div>Submit buttons: {submitButtons.length}</div>;
}
```
