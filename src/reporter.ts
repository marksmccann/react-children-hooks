import { createReporter, type RuntimeReporterMessages } from "runtime-reporter";

const messages: RuntimeReporterMessages<
    | {
          code: "OPTIONAL_CHILD_MATCHING_PREDICATE_FAILED";
          template: "{{ traceCodePrefix }}Optional child validation failed{{ childNameSegment }} because {{ actualCount }} direct child{{ actualCountPluralSuffix }} satisfied the provided predicate; expected at most 1.";
          tokens:
              | "traceCodePrefix"
              | "childNameSegment"
              | "actualCount"
              | "actualCountPluralSuffix";
      }
    | {
          code: "UNIQUE_CHILD_MATCHING_PREDICATE_FAILED";
          template: "{{ traceCodePrefix }}Unique child validation failed{{ childNameSegment }} because {{ actualCount }} direct child{{ actualCountPluralSuffix }} satisfied the provided predicate; expected exactly 1.";
          tokens:
              | "traceCodePrefix"
              | "childNameSegment"
              | "actualCount"
              | "actualCountPluralSuffix";
      }
    | {
          code: "REQUIRED_CHILD_MATCHING_PREDICATE_FAILED";
          template: "{{ traceCodePrefix }}Required child validation failed{{ childNameSegment }} because no direct child satisfied the provided predicate.";
          tokens: "traceCodePrefix" | "childNameSegment";
      }
    | {
          code: "REQUIRED_CALLBACK_CHILD_FAILED";
          template: "{{ traceCodePrefix }}Required callback child validation failed{{ childNameSegment }} because no direct callback child was found.";
          tokens: "traceCodePrefix" | "childNameSegment";
      }
    | {
          code: "MINIMUM_CHILDREN_MATCHING_PREDICATE_FAILED";
          template: "{{ traceCodePrefix }}Minimum children validation failed{{ childNameSegment }} because only {{ actualCount }} direct child{{ actualCountPluralSuffix }} satisfied the provided predicate; expected at least {{ minimumCount }}.";
          tokens:
              | "traceCodePrefix"
              | "childNameSegment"
              | "actualCount"
              | "actualCountPluralSuffix"
              | "minimumCount";
      }
    | {
          code: "MAXIMUM_CHILDREN_MATCHING_PREDICATE_FAILED";
          template: "{{ traceCodePrefix }}Maximum children validation failed{{ childNameSegment }} because {{ actualCount }} direct child{{ actualCountPluralSuffix }} satisfied the provided predicate; expected at most {{ maximumCount }}.";
          tokens:
              | "traceCodePrefix"
              | "childNameSegment"
              | "actualCount"
              | "actualCountPluralSuffix"
              | "maximumCount";
      }
    | {
          code: "EXACT_CHILDREN_MATCHING_PREDICATE_FAILED";
          template: "{{ traceCodePrefix }}Exact children validation failed{{ childNameSegment }} because {{ actualCount }} direct child{{ actualCountPluralSuffix }} satisfied the provided predicate; expected exactly {{ exactCount }}.";
          tokens:
              | "traceCodePrefix"
              | "childNameSegment"
              | "actualCount"
              | "actualCountPluralSuffix"
              | "exactCount";
      }
    | {
          code: "BOUNDED_CHILDREN_MATCHING_PREDICATE_FAILED";
          template: "{{ traceCodePrefix }}Bounded children validation failed{{ childNameSegment }} because {{ actualCount }} direct child{{ actualCountPluralSuffix }} satisfied the provided predicate; expected between {{ minimumCount }} and {{ maximumCount }} inclusive.";
          tokens:
              | "traceCodePrefix"
              | "childNameSegment"
              | "actualCount"
              | "actualCountPluralSuffix"
              | "minimumCount"
              | "maximumCount";
      }
> = {
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
};

/** The runtime reporter for react-children-hooks */
const reporter = createReporter(
    process.env.NODE_ENV === "production" ? ({} as typeof messages) : messages,
    { formatMessage: (message) => message }
);

export default reporter;
