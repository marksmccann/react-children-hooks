# `isElementOfType`

Determines whether a React element exactly matches the provided element or component type.

## Signature

```ts
function isElementOfType<T extends React.ElementType>(
    element: React.ReactElement,
    type: T
): element is ElementOfType<T>;
```

## Parameters

| Parameter | Type                 | Required | Description                             |
| --------- | -------------------- | -------- | --------------------------------------- |
| `element` | `React.ReactElement` | Yes      | The React element to compare.           |
| `type`    | `React.ElementType`  | Yes      | The element or component type to match. |

## Returns

`true` when the element's type exactly matches the provided type; otherwise `false`.

## Usage

```tsx
import { isElementOfType } from "react-children-hooks";

const element = <button type="button">Save</button>;

if (isElementOfType(element, "button")) {
    console.log(element.props.type);
}
```
