# `useMinimumChildrenByType`

Returns the direct child elements whose React element type exactly matches the provided type, or throws when fewer than the minimum count are found.

## Signature

```ts
function useMinimumChildrenByType<T extends React.ElementType>(
    children: React.ReactNode,
    type: T,
    minimumCount: number,
    options?: UseMinimumChildrenWhereOptions
): ElementOfType<T>[];
```

## Parameters

| Parameter      | Type                             | Required | Description                                                                                                                                                                    |
| -------------- | -------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `children`     | `React.ReactNode`                | Yes      | The React children value to inspect.                                                                                                                                           |
| `type`         | `React.ElementType`              | Yes      | The element or component type to match against each direct child element.                                                                                                      |
| `minimumCount` | `number`                         | Yes      | The minimum number of matching direct child elements required.                                                                                                                 |
| `options`      | `UseMinimumChildrenWhereOptions` | No       | Optional reporting metadata used to derive the thrown validation message. See [`UseMinimumChildrenWhereOptions`](./useMinimumChildrenWhere.md#useminimumchildrenwhereoptions). |

## Returns

The direct child elements whose type matches the provided element type.

## Usage

```tsx
import { useMinimumChildrenByType } from "react-children-hooks";

function DialogActions({ children }: { children: React.ReactNode }) {
    const actions = useMinimumChildrenByType(children, "button", 2, {
        traceCode: "DIALOG_ACTIONS_MINIMUM",
        childName: "DialogAction"
    });

    return <div>{actions}</div>;
}
```
