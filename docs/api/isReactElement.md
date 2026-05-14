# `isReactElement`

Determines whether a React node is a valid React element.

## Signature

```ts
function isReactElement(node: React.ReactNode): node is React.ReactElement;
```

## Parameters

| Parameter | Type              | Description              |
| --------- | ----------------- | ------------------------ |
| `node`    | `React.ReactNode` | The React node to check. |

## Returns

`true` when the node is a valid React element; otherwise `false`.

## Usage

```tsx
import { isReactElement } from "react-children-hooks";

const node: React.ReactNode = Math.random() > 0.5 ? <span /> : "fallback";

if (isReactElement(node)) {
    console.log(node.type);
}
```
