# `childrenToElements`

Normalizes a React children value into an array containing only valid direct child elements.

## Signature

```ts
function childrenToElements(children: React.ReactNode): React.ReactElement[];
```

## Parameters

| Parameter  | Type              | Required | Description                            |
| ---------- | ----------------- | -------- | -------------------------------------- |
| `children` | `React.ReactNode` | Yes      | The React children value to normalize. |

## Returns

An array of valid React elements from the provided direct children.

## Usage

```tsx
import { childrenToElements } from "react-children-hooks";

const elements = childrenToElements([
    <span key="label">Label</span>,
    "plain text",
    null,
    <button key="action">Save</button>
]);

// elements contains only the <span /> and <button /> nodes
```
