import { createReporter } from "runtime-reporter";

/** Internal validation reporter messages used by the hook validation APIs */
const validationMessages = {
    OPTIONAL_CHILD_MATCHING_PREDICATE_FAILED:
        "{{ traceCodePrefix }}Optional child validation failed{{ childNameSegment }} because {{ actualCount }} direct child{{ actualCountPluralSuffix }} satisfied the provided predicate; expected at most 1.",
    UNIQUE_CHILD_MATCHING_PREDICATE_FAILED:
        "{{ traceCodePrefix }}Unique child validation failed{{ childNameSegment }} because {{ actualCount }} direct child{{ actualCountPluralSuffix }} satisfied the provided predicate; expected exactly 1.",
    REQUIRED_CHILD_MATCHING_PREDICATE_FAILED:
        "{{ traceCodePrefix }}Required child validation failed{{ childNameSegment }} because no direct child satisfied the provided predicate.",
    REQUIRED_CALLBACK_CHILD_FAILED:
        "{{ traceCodePrefix }}Required callback child validation failed{{ childNameSegment }} because no direct callback child was found.",
    MINIMUM_CHILDREN_MATCHING_PREDICATE_FAILED:
        "{{ traceCodePrefix }}Minimum children validation failed{{ childNameSegment }} because only {{ actualCount }} direct child{{ actualCountPluralSuffix }} satisfied the provided predicate; expected at least {{ minimumCount }}.",
    MAXIMUM_CHILDREN_MATCHING_PREDICATE_FAILED:
        "{{ traceCodePrefix }}Maximum children validation failed{{ childNameSegment }} because {{ actualCount }} direct child{{ actualCountPluralSuffix }} satisfied the provided predicate; expected at most {{ maximumCount }}.",
    EXACT_CHILDREN_MATCHING_PREDICATE_FAILED:
        "{{ traceCodePrefix }}Exact children validation failed{{ childNameSegment }} because {{ actualCount }} direct child{{ actualCountPluralSuffix }} satisfied the provided predicate; expected exactly {{ exactCount }}.",
    BOUNDED_CHILDREN_MATCHING_PREDICATE_FAILED:
        "{{ traceCodePrefix }}Bounded children validation failed{{ childNameSegment }} because {{ actualCount }} direct child{{ actualCountPluralSuffix }} satisfied the provided predicate; expected between {{ minimumCount }} and {{ maximumCount }} inclusive."
} as const;

/** Public-facing reporter messages for this library */
const publicMessages = {
    RCH001: '[RCH001] Traversal option "depth" must be a non-negative integer.',
    RCH002: '[RCH002] Traversal option "maximumDepth" must be a non-negative integer.',
    RCH003: '[RCH003] Traversal option "depth" cannot be greater than "maximumDepth".'
} as const;

/** All reporter messages for this library */
const messages = {
    ...validationMessages,
    ...publicMessages
} as const;

/** The runtime reporter for react-children-hooks */
const reporter = createReporter(
    process.env.NODE_ENV === "production" ? ({} as typeof messages) : messages,
    { formatMessage: (message) => message }
);

export default reporter;
