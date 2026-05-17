# `useChildrenExcept`

Returns the inspected child elements except the provided child elements.

Excluded child elements are matched by their normalized React element identity so values returned from other hooks can be passed directly.

## Signature

```ts
function useChildrenExcept(
    children: React.ReactNode,
    excludedChildren:
        | React.ReactElement
        | null
        | undefined
        | readonly (React.ReactElement | null | undefined)[]
    options?: QueryOptions
): React.ReactElement[];
```

## Parameters

| Parameter          | Type                                      | Required | Description                                                                 |
| ------------------ | ----------------------------------------- | -------- | --------------------------------------------------------------------------- | ---------------------------- | ---- | ------------- | --- | ------------------------------------------------------------------- |
| `children`         | `React.ReactNode`                         | Yes      | The React children value to inspect.                                        |
| `excludedChildren` | `React.ReactElement                       | null     | undefined                                                                   | readonly (React.ReactElement | null | undefined)[]` | Yes | The inspected child element or elements to exclude from the result. |
| `options`          | [`QueryOptions`](./types.md#queryoptions) | No       | Optional query metadata used to configure how child elements are inspected. |

## Returns

An array of inspected child elements excluding the provided child elements.

## Usage

```tsx
import {
    useChildrenExcept,
    useRequiredChildByType
} from "react-children-hooks";

function Dialog({ children }: { children: React.ReactNode }) {
    const trigger = useRequiredChildByType(children, DialogTrigger);
    const content = useRequiredChildByType(children, DialogContent);
    const rest = useChildrenExcept(children, [trigger, content]);

    return <div data-remaining={rest.length}>{rest}</div>;
}
```
