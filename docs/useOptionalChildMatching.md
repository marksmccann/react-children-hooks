# `useOptionalChildMatching`

Returns the optional child element that satisfies the provided predicate, or throws when more than one match is found.

## Signature

```ts
function useOptionalChildMatching<T extends React.ReactElement>(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => element is T,
    options?: ValidationOptions
): T | null;

function useOptionalChildMatching(
    children: React.ReactNode,
    predicate: (element: React.ReactElement) => boolean,
    options?: ValidationOptions
): React.ReactElement | null;
```

## Parameters

| Parameter   | Type                                                | Required | Description                                                                                                                            |
| ----------- | --------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `children`  | `React.ReactNode`                                   | Yes      | The React children value to inspect.                                                                                                   |
| `predicate` | `(element: React.ReactElement) => boolean`          | Yes      | A predicate that is called with each direct child element to determine whether it matches.                                             |
| `options`   | [`ValidationOptions`](./types.md#validationoptions) | No       | Optional reporting and traversal metadata used to derive the thrown validation message and configure how child elements are inspected. |

## Returns

The optional child element that satisfies the provided predicate, or `null` when no match is found.

## Usage

```tsx
import { useOptionalChildMatching } from "react-children-hooks";

function Dialog({ children }: { children: React.ReactNode }) {
    const icon = useOptionalChildMatching(
        children,
        (element) => element.props.slot === "icon",
        { traceCode: "TC004", childName: "DialogIcon" }
    );

    return <div>{icon}</div>;
}
```
