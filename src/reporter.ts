import { createReporter } from "runtime-reporter";

/** Internal validation reporter messages used by the hook validation APIs */
const validationMessages = {
    OPTIONAL_CHILD_MATCHING_PREDICATE_FAILED:
        "{{ traceCodePrefix }}Optional child validation failed{{ childNameSegment }} because {{ actualCount }} direct child{{ actualCountPluralSuffix }} satisfied the provided predicate; expected at most 1.",
    ONLY_CHILD_MATCHING_PREDICATE_FAILED:
        "{{ traceCodePrefix }}Only child validation failed{{ childNameSegment }} because {{ actualCount }} direct child{{ actualCountPluralSuffix }} satisfied the provided predicate; expected exactly 1.",
    EXCLUSIVE_CHILD_MATCHING_PREDICATE_FAILED:
        "{{ traceCodePrefix }}Exclusive child validation failed{{ childNameSegment }} because {{ actualCount }} direct child{{ actualCountPluralSuffix }} were inspected and {{ matchingCount }} matched the provided predicate; expected exactly 1 direct child and for it to match.",
    REQUIRED_CHILD_MATCHING_PREDICATE_FAILED:
        "{{ traceCodePrefix }}Required child validation failed{{ childNameSegment }} because no direct child satisfied the provided predicate.",
    REQUIRED_CALLBACK_CHILD_FAILED:
        "{{ traceCodePrefix }}Required callback child validation failed{{ childNameSegment }} because no direct callback child was found.",
    OPTIONAL_CALLBACK_CHILD_FAILED:
        "{{ traceCodePrefix }}Optional callback child validation failed{{ childNameSegment }} because {{ actualCount }} direct callback children were found; expected at most 1.",
    ONLY_CALLBACK_CHILD_FAILED:
        "{{ traceCodePrefix }}Only callback child validation failed{{ childNameSegment }} because {{ actualCount }} direct callback children were found; expected exactly 1.",
    EXCLUSIVE_CALLBACK_CHILD_FAILED:
        "{{ traceCodePrefix }}Exclusive callback child validation failed{{ childNameSegment }} because {{ actualCount }} direct child{{ actualCountPluralSuffix }} were inspected and {{ callbackCount }} callback child{{ callbackCountPluralSuffix }} were found; expected exactly 1 direct callback child and no other children.",
    MINIMUM_CHILDREN_MATCHING_PREDICATE_FAILED:
        "{{ traceCodePrefix }}Minimum children validation failed{{ childNameSegment }} because only {{ actualCount }} direct child{{ actualCountPluralSuffix }} satisfied the provided predicate; expected at least {{ minimumCount }}.",
    MAXIMUM_CHILDREN_MATCHING_PREDICATE_FAILED:
        "{{ traceCodePrefix }}Maximum children validation failed{{ childNameSegment }} because {{ actualCount }} direct child{{ actualCountPluralSuffix }} satisfied the provided predicate; expected at most {{ maximumCount }}.",
    EXACT_CHILDREN_MATCHING_PREDICATE_FAILED:
        "{{ traceCodePrefix }}Exact children validation failed{{ childNameSegment }} because {{ actualCount }} direct child{{ actualCountPluralSuffix }} satisfied the provided predicate; expected exactly {{ exactCount }}.",
    BOUNDED_CHILDREN_MATCHING_PREDICATE_FAILED:
        "{{ traceCodePrefix }}Bounded children validation failed{{ childNameSegment }} because {{ actualCount }} direct child{{ actualCountPluralSuffix }} satisfied the provided predicate; expected between {{ minimumCount }} and {{ maximumCount }} inclusive."
} as const;

/** Internal diagnostics reporter messages used by the warning-oriented APIs */
const diagnosticsMessages = {
    DEPRECATED_CHILD_BY_TYPE_WARNING:
        "{{ traceCodePrefix }}Deprecated child warning{{ childNameSegment }}: {{ deprecationMessage }}",
    DEPRECATED_CHILD_MATCHING_WARNING:
        "{{ traceCodePrefix }}Deprecated child warning{{ childNameSegment }}: {{ deprecationMessage }}"
} as const;

/** Public-facing reporter messages for this library */
const publicMessages = {
    RCH001: 'Traversal option "depth" must be a non-negative integer.',
    RCH002: 'Traversal option "maximumDepth" must be a non-negative integer.',
    RCH003: 'Traversal option "depth" cannot be greater than "maximumDepth".'
} as const;

/** Internal reporter messages that should be formatted without a public code prefix */
const internalMessages = {
    ...validationMessages,
    ...diagnosticsMessages
} as const;

/** All reporter messages for this library */
const messages = {
    ...internalMessages,
    ...publicMessages
} as const;

/**
 * Creates a runtime reporter configured for this package.
 *
 * @returns A runtime reporter instance with package-specific message formatting.
 */
function createRuntimeReporter() {
    return createReporter(
        process.env.NODE_ENV === "production"
            ? ({} as typeof messages)
            : messages,
        {
            formatMessage: (message, code) => {
                if (code in internalMessages) return message;
                return `[${code}] ${message}`;
            }
        }
    );
}

/** The runtime reporter for react-children-hooks */
const reporter = createRuntimeReporter();

export default reporter;
