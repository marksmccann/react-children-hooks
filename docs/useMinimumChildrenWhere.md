# `useMinimumChildrenWhere`

Returns the direct child elements that satisfy the provided predicate, or throws when fewer than the minimum count are found.

## Signature

```ts
function useMinimumChildrenWhere<T extends React.ReactElement>(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => element is T,
    minimumCount: number,
    options?: ValidationOptions
): T[];

function useMinimumChildrenWhere(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => boolean,
    minimumCount: number,
    options?: ValidationOptions
): React.ReactElement[];
```

## Parameters

| Parameter      | Type                                       | Required | Description                                                                                |
| -------------- | ------------------------------------------ | -------- | ------------------------------------------------------------------------------------------ |
| `children`     | `React.ReactNode`                          | Yes      | The React children value to inspect.                                                       |
| `predicate`    | `(element: React.ReactElement) => boolean` | Yes      | A predicate that is called with each direct child element to determine whether it matches. |
| `minimumCount` | `number`                                   | Yes      | The minimum number of matching direct child elements required.                             |
| `options`      | `ValidationOptions`                        | No       | Optional reporting metadata used to derive the thrown validation message.                  |

## Returns

The direct child elements that satisfy the provided predicate.

## Usage

```tsx
import { useMinimumChildrenWhere } from "react-children-hooks";

function DialogActions({ children }: { children: React.ReactNode }) {
    const actions = useMinimumChildrenWhere(
        children,
        (element) => element.type === "button",
        2,
        { traceCode: "DIALOG_ACTIONS_MINIMUM", childName: "DialogAction" }
    );

    return <div>{actions}</div>;
}
```
