import type * as React from "react";

/**
 * Inclusive minimum and maximum bounds used by the bounded validation hooks.
 */
export type ChildrenCountBounds = {
    /**
     * The minimum number of matching direct child elements required.
     */
    minimum: number;
    /**
     * The maximum number of matching direct child elements allowed.
     */
    maximum: number;
};

/**
 * Represents a React element whose props and element type are narrowed to the provided React element type.
 *
 * @typeParam T The React element type used to narrow the element's props and type.
 */
export type ElementOfType<T extends React.ElementType> = React.ReactElement<
    React.ComponentProps<T>,
    T
>;

/**
 * Optional reporting metadata used by the validation hooks to derive thrown validation messages.
 */
export type ValidationOptions = {
    /**
     * An optional consumer-defined trace code that is prefixed to the thrown validation message.
     */
    traceCode?: string;
    /**
     * An optional human-readable child name that is included in the thrown validation message.
     */
    childName?: string;
};
