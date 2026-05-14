# `useChildrenWhere`

Returns the direct child elements that satisfy the provided predicate.

## Signature

```ts
function useChildrenWhere<T extends React.ReactElement>(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => element is T
): T[];

function useChildrenWhere(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => boolean
): React.ReactElement[];
```

## Parameters

| Parameter   | Type                                       | Required | Description                                                                                                         |
| ----------- | ------------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `children`  | `React.ReactNode`                          | Yes      | The React children value to inspect.                                                                                |
| `predicate` | `(element: React.ReactElement) => boolean` | Yes      | A predicate that is called with each direct child element to determine whether it should be included in the result. |

## Returns

An array of direct child elements that satisfy the provided predicate.

## Usage

```tsx
import { useChildrenWhere } from "react-children-hooks";

function Toolbar({ children }: { children: React.ReactNode }) {
    const submitButtons = useChildrenWhere(
        children,
        (element) =>
            element.type === "button" && element.props.type === "submit"
    );

    return <div>Submit buttons: {submitButtons.length}</div>;
}
```
