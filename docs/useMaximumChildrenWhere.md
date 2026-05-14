# `useMaximumChildrenWhere`

Returns the direct child elements that satisfy the provided predicate, or throws when more than the maximum count are found.

## Signature

```ts
function useMaximumChildrenWhere<T extends React.ReactElement>(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => element is T,
    maximumCount: number,
    options?: UseMaximumChildrenWhereOptions
): T[];

function useMaximumChildrenWhere(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => boolean,
    maximumCount: number,
    options?: UseMaximumChildrenWhereOptions
): React.ReactElement[];
```

## Parameters

| Parameter      | Type                                       | Required | Description                                                                                                                                        |
| -------------- | ------------------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`     | `React.ReactNode`                          | Yes      | The React children value to inspect.                                                                                                               |
| `predicate`    | `(element: React.ReactElement) => boolean` | Yes      | A predicate that is called with each direct child element to determine whether it matches.                                                         |
| `maximumCount` | `number`                                   | Yes      | The maximum number of matching direct child elements allowed.                                                                                      |
| `options`      | `UseMaximumChildrenWhereOptions`           | No       | Optional reporting metadata used to derive the thrown validation message. See [`UseMaximumChildrenWhereOptions`](#usemaximumchildrenwhereoptions). |

## `UseMaximumChildrenWhereOptions`

| Property    | Type     | Required | Description                                                                                |
| ----------- | -------- | -------- | ------------------------------------------------------------------------------------------ |
| `traceCode` | `string` | No       | An optional consumer-defined trace code that is prefixed to the thrown validation message. |
| `childName` | `string` | No       | An optional human-readable child name that is included in the thrown validation message.   |

## Returns

The direct child elements that satisfy the provided predicate.

## Usage

```tsx
import { useMaximumChildrenWhere } from "react-children-hooks";

function DialogActions({ children }: { children: React.ReactNode }) {
    const actions = useMaximumChildrenWhere(
        children,
        (element) => element.type === "button",
        2,
        { traceCode: "DIALOG_ACTIONS_MAXIMUM", childName: "DialogAction" }
    );

    return <div>{actions}</div>;
}
```
