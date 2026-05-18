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
 * Optional traversal bounds used by the element-based query and validation hooks.
 */
export type TraversalOptions = {
    /**
     * The minimum inclusive child depth to include in results, where `0` represents direct children.
     */
    depth?: number;
    /**
     * The maximum inclusive child depth to include in results, where `0` represents direct children.
     */
    maximumDepth?: number;
};

/**
 * Optional traversal metadata used by the element-based query hooks.
 */
export type QueryOptions = TraversalOptions;

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
 * A callback child, also known as a render-prop child.
 *
 * @typeParam TArguments The positional argument tuple accepted by the callback.
 * @typeParam TResult The value returned by the callback.
 */
export type CallbackChild<
    TArguments extends unknown[] = [],
    TResult = React.ReactNode
> = (...args: TArguments) => TResult;

/**
 * A direct-children value that may include callback children alongside regular React children.
 *
 * @typeParam TArguments The positional argument tuple accepted by callback children.
 * @typeParam TResult The value returned by callback children.
 */
export type CallbackChildren<
    TArguments extends unknown[] = [],
    TResult = React.ReactNode
> =
    | React.ReactNode
    | CallbackChild<TArguments, TResult>
    | readonly CallbackChildren<TArguments, TResult>[];

/**
 * Optional reporting metadata shared by the validation and diagnostics hooks.
 */
type MessageOptions = {
    /**
     * An optional consumer-defined trace code that is prefixed to the thrown validation message.
     */
    traceCode?: string;
    /**
     * An optional human-readable child name that is included in the thrown validation message.
     */
    childName?: string;
};

/**
 * Optional reporting and traversal metadata used by the validation hooks.
 */
export type ValidationOptions = MessageOptions & TraversalOptions;

/**
 * Optional reporting and traversal metadata used by the deprecation diagnostics hooks.
 */
export type DeprecationOptions = MessageOptions &
    TraversalOptions & {
        /**
         * The deprecation guidance shown when a matching child is detected.
         */
        message: string;
    };
