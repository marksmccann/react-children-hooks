import type * as React from "react";

/**
 * Represents a React element whose props and element type are narrowed to the provided React element type.
 *
 * @typeParam T The React element type used to narrow the element's props and type.
 */
export type ElementOfType<T extends React.ElementType> = React.ReactElement<
    React.ComponentProps<T>,
    T
>;
