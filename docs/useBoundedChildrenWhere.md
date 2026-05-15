# `useBoundedChildrenWhere`

Returns the direct child elements that satisfy the provided predicate, or throws when the count falls outside the inclusive bounds.

## Signature

```ts
function useBoundedChildrenWhere<T extends React.ReactElement>(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => element is T,
    bounds: ChildrenCountBounds,
    options?: ValidationOptions
): T[];

function useBoundedChildrenWhere(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => boolean,
    bounds: ChildrenCountBounds,
    options?: ValidationOptions
): React.ReactElement[];
```

## Parameters

| Parameter   | Type                                       | Required | Description                                                                                |
| ----------- | ------------------------------------------ | -------- | ------------------------------------------------------------------------------------------ |
| `children`  | `React.ReactNode`                          | Yes      | The React children value to inspect.                                                       |
| `predicate` | `(element: React.ReactElement) => boolean` | Yes      | A predicate that is called with each direct child element to determine whether it matches. |
| `bounds`    | `ChildrenCountBounds`                      | Yes      | The inclusive minimum and maximum number of matching direct child elements allowed.        |
| `options`   | `ValidationOptions`                        | No       | Optional reporting metadata used to derive the thrown validation message.                  |

## Returns

The direct child elements that satisfy the provided predicate.

## Usage

```tsx
import { useBoundedChildrenWhere } from "react-children-hooks";

function DialogActions({ children }: { children: React.ReactNode }) {
    const actions = useBoundedChildrenWhere(
        children,
        (element) => element.type === "button",
        { minimum: 1, maximum: 3 },
        { traceCode: "DIALOG_ACTIONS_BOUNDED", childName: "DialogAction" }
    );

    return <div>{actions}</div>;
}
```
