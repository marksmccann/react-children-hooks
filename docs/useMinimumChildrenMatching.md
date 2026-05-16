# `useMinimumChildrenMatching`

Returns the child elements that satisfy the provided predicate, or throws when fewer than the minimum count are found.

## Signature

```ts
function useMinimumChildrenMatching<T extends React.ReactElement>(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => element is T,
    minimumCount: number,
    options?: ValidationOptions
): T[];

function useMinimumChildrenMatching(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => boolean,
    minimumCount: number,
    options?: ValidationOptions
): React.ReactElement[];
```

## Parameters

| Parameter      | Type                                                | Required | Description                                                                                                                            |
| -------------- | --------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `children`     | `React.ReactNode`                                   | Yes      | The React children value to inspect.                                                                                                   |
| `predicate`    | `(element: React.ReactElement) => boolean`          | Yes      | A predicate that is called with each direct child element to determine whether it matches.                                             |
| `minimumCount` | `number`                                            | Yes      | The minimum number of matching direct child elements required.                                                                         |
| `options`      | [`ValidationOptions`](./types.md#validationoptions) | No       | Optional reporting and traversal metadata used to derive the thrown validation message and configure how child elements are inspected. |

## Returns

The child elements that satisfy the provided predicate.

## Usage

```tsx
import { useMinimumChildrenMatching } from "react-children-hooks";

function DialogActions({ children }: { children: React.ReactNode }) {
    const actions = useMinimumChildrenMatching(
        children,
        (element) => element.type === "button",
        2,
        { traceCode: "TC007", childName: "DialogAction" }
    );

    return <div>{actions}</div>;
}
```
