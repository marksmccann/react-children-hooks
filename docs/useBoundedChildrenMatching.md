# `useBoundedChildrenMatching`

Returns the child elements that satisfy the provided predicate, or throws when the count falls outside the inclusive bounds.

## Signature

```ts
function useBoundedChildrenMatching<T extends React.ReactElement>(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => element is T,
    bounds: ChildrenCountBounds,
    options?: ValidationOptions
): T[];

function useBoundedChildrenMatching(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => boolean,
    bounds: ChildrenCountBounds,
    options?: ValidationOptions
): React.ReactElement[];
```

## Parameters

| Parameter   | Type                                                    | Required | Description                                                                                                                            |
| ----------- | ------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `children`  | `React.ReactNode`                                       | Yes      | The React children value to inspect.                                                                                                   |
| `predicate` | `(element: React.ReactElement) => boolean`              | Yes      | A predicate that is called with each direct child element to determine whether it matches.                                             |
| `bounds`    | [`ChildrenCountBounds`](./types.md#childrencountbounds) | Yes      | The inclusive minimum and maximum number of matching direct child elements allowed.                                                    |
| `options`   | [`ValidationOptions`](./types.md#validationoptions)     | No       | Optional reporting and traversal metadata used to derive the thrown validation message and configure how child elements are inspected. |

## Returns

The child elements that satisfy the provided predicate.

## Usage

```tsx
import { useBoundedChildrenMatching } from "react-children-hooks";

function DialogActions({ children }: { children: React.ReactNode }) {
    const actions = useBoundedChildrenMatching(
        children,
        (element) => element.type === "button",
        { minimum: 1, maximum: 3 },
        { traceCode: "TC003", childName: "DialogAction" }
    );

    return <div>{actions}</div>;
}
```
