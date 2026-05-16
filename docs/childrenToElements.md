# `childrenToElements`

Normalizes a React children value into an array containing valid child elements within the configured depth range.

## Signature

```ts
function childrenToElements(
    children: React.ReactNode,
    options?: TraversalOptions
): React.ReactElement[];
```

## Parameters

| Parameter  | Type               | Required | Description                                                             |
| ---------- | ------------------ | -------- | ----------------------------------------------------------------------- |
| `children` | `React.ReactNode`  | Yes      | The React children value to normalize.                                  |
| `options`  | `TraversalOptions` | No       | Optional traversal bounds that control which child depths are included. |

## Returns

An array of valid React elements from the provided child depths.

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
