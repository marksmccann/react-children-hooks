# `useExactChildrenMatching`

Returns the child elements that satisfy the provided predicate, or throws when the exact count is not met.

## Signature

```ts
function useExactChildrenMatching<T extends React.ReactElement>(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => element is T,
    exactCount: number,
    options?: ValidationOptions
): T[];

function useExactChildrenMatching(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => boolean,
    exactCount: number,
    options?: ValidationOptions
): React.ReactElement[];
```

## Parameters

| Parameter    | Type                                       | Required | Description                                                                                                                            |
| ------------ | ------------------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `children`   | `React.ReactNode`                          | Yes      | The React children value to inspect.                                                                                                   |
| `predicate`  | `(element: React.ReactElement) => boolean` | Yes      | A predicate that is called with each direct child element to determine whether it matches.                                             |
| `exactCount` | `number`                                   | Yes      | The exact number of matching direct child elements required.                                                                           |
| `options`    | `ValidationOptions`                        | No       | Optional reporting and traversal metadata used to derive the thrown validation message and configure how child elements are inspected. |

## Returns

The child elements that satisfy the provided predicate.

## Usage

```tsx
import { useExactChildrenMatching } from "react-children-hooks";

function DialogActions({ children }: { children: React.ReactNode }) {
    const actions = useExactChildrenMatching(
        children,
        (element) => element.type === "button",
        2,
        { traceCode: "TC014", childName: "DialogAction" }
    );

    return <div>{actions}</div>;
}
```
