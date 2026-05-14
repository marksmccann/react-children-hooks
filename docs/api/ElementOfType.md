# `ElementOfType`

Represents a React element whose props and element type are narrowed to the provided React element type.

## Signature

```ts
type ElementOfType<T extends React.ElementType> = React.ReactElement<
    React.ComponentProps<T>,
    T
>;
```

## Type Parameters

| Type Parameter | Description                                                         |
| -------------- | ------------------------------------------------------------------- |
| `T`            | The React element type used to narrow the element's props and type. |

## Usage

```tsx
import type { ElementOfType } from "react-children-hooks";

type ButtonElement = ElementOfType<"button">;

function getButtonType(element: ButtonElement) {
    return element.props.type;
}
```
