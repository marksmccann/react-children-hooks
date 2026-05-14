import { createReporter, type RuntimeReporterMessages } from "runtime-reporter";

const messages: RuntimeReporterMessages<
    | {
          code: "REQUIRED_CHILD_WHERE_PREDICATE_FAILED";
          template: "{{ traceCodePrefix }}Required child validation failed{{ childNameSegment }} because no direct child satisfied the provided predicate.";
          tokens: "traceCodePrefix" | "childNameSegment";
      }
    | {
          code: "MINIMUM_CHILDREN_WHERE_PREDICATE_FAILED";
          template: "{{ traceCodePrefix }}Minimum children validation failed{{ childNameSegment }} because only {{ actualCount }} direct child{{ actualCountPluralSuffix }} satisfied the provided predicate; expected at least {{ minimumCount }}.";
          tokens:
              | "traceCodePrefix"
              | "childNameSegment"
              | "actualCount"
              | "actualCountPluralSuffix"
              | "minimumCount";
      }
    | {
          code: "MAXIMUM_CHILDREN_WHERE_PREDICATE_FAILED";
          template: "{{ traceCodePrefix }}Maximum children validation failed{{ childNameSegment }} because {{ actualCount }} direct child{{ actualCountPluralSuffix }} satisfied the provided predicate; expected at most {{ maximumCount }}.";
          tokens:
              | "traceCodePrefix"
              | "childNameSegment"
              | "actualCount"
              | "actualCountPluralSuffix"
              | "maximumCount";
      }
    | {
          code: "EXACT_CHILDREN_WHERE_PREDICATE_FAILED";
          template: "{{ traceCodePrefix }}Exact children validation failed{{ childNameSegment }} because {{ actualCount }} direct child{{ actualCountPluralSuffix }} satisfied the provided predicate; expected exactly {{ exactCount }}.";
          tokens:
              | "traceCodePrefix"
              | "childNameSegment"
              | "actualCount"
              | "actualCountPluralSuffix"
              | "exactCount";
      }
> = {
    REQUIRED_CHILD_WHERE_PREDICATE_FAILED:
        "{{ traceCodePrefix }}Required child validation failed{{ childNameSegment }} because no direct child satisfied the provided predicate.",
    MINIMUM_CHILDREN_WHERE_PREDICATE_FAILED:
        "{{ traceCodePrefix }}Minimum children validation failed{{ childNameSegment }} because only {{ actualCount }} direct child{{ actualCountPluralSuffix }} satisfied the provided predicate; expected at least {{ minimumCount }}.",
    MAXIMUM_CHILDREN_WHERE_PREDICATE_FAILED:
        "{{ traceCodePrefix }}Maximum children validation failed{{ childNameSegment }} because {{ actualCount }} direct child{{ actualCountPluralSuffix }} satisfied the provided predicate; expected at most {{ maximumCount }}.",
    EXACT_CHILDREN_WHERE_PREDICATE_FAILED:
        "{{ traceCodePrefix }}Exact children validation failed{{ childNameSegment }} because {{ actualCount }} direct child{{ actualCountPluralSuffix }} satisfied the provided predicate; expected exactly {{ exactCount }}."
};

/** The runtime reporter for react-children-hooks */
const reporter = createReporter(
    process.env.NODE_ENV === "production" ? ({} as typeof messages) : messages,
    { formatMessage: (message) => message }
);

export default reporter;
