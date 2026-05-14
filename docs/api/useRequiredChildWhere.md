# `useRequiredChildWhere`

Returns the first direct child element that satisfies the provided predicate, or throws when no match is found.

## Signature

```ts
function useRequiredChildWhere<T extends React.ReactElement>(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => element is T,
    options?: UseRequiredChildWhereOptions
): T;

function useRequiredChildWhere(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => boolean,
    options?: UseRequiredChildWhereOptions
): React.ReactElement;
```

## Parameters

| Parameter   | Type                                       | Description                                                                                                                                    |
| ----------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`  | `React.ReactNode`                          | The React children value to inspect.                                                                                                           |
| `predicate` | `(element: React.ReactElement) => boolean` | A predicate that is called with each direct child element to determine whether it matches.                                                     |
| `options`   | `UseRequiredChildWhereOptions`             | Optional reporting metadata used to derive the thrown validation message. See [`UseRequiredChildWhereOptions`](#userequiredchildwhereoptions). |

## `UseRequiredChildWhereOptions`

| Property    | Type     | Description                                                                                |
| ----------- | -------- | ------------------------------------------------------------------------------------------ |
| `traceCode` | `string` | An optional consumer-defined trace code that is prefixed to the thrown validation message. |
| `childName` | `string` | An optional human-readable child name that is included in the thrown validation message.   |

## Returns

The first direct child element that satisfies the provided predicate.

## Usage

```tsx
import { useRequiredChildWhere } from "react-children-hooks";

function Dialog({ children }: { children: React.ReactNode }) {
    const trigger = useRequiredChildWhere(
        children,
        (element) => element.props.slot === "trigger",
        { traceCode: "DIALOG_TRIGGER_MISSING", childName: "DialogTrigger" }
    );

    return <div>{trigger}</div>;
}
```
