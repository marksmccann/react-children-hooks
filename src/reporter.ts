import { createReporter, type RuntimeReporterMessages } from "runtime-reporter";

const messages: RuntimeReporterMessages<{
    code: "REQUIRED_CHILD_WHERE_PREDICATE_FAILED";
    template: "{{ traceCodePrefix }}Required child validation failed{{ childNameSegment }} because no direct child satisfied the provided predicate.";
    tokens: "traceCodePrefix" | "childNameSegment";
}> = {
    REQUIRED_CHILD_WHERE_PREDICATE_FAILED:
        "{{ traceCodePrefix }}Required child validation failed{{ childNameSegment }} because no direct child satisfied the provided predicate."
};

/** The runtime reporter for react-children-hooks */
const reporter = createReporter(
    process.env.NODE_ENV === "production" ? ({} as typeof messages) : messages,
    { formatMessage: (message) => message }
);

export default reporter;
