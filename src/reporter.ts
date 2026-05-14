import { createReporter, type RuntimeReporterMessages } from "runtime-reporter";

const messages: RuntimeReporterMessages<
    | {
          code: "ERR01";
          template: "{{ componentName }} failed to mount";
          tokens: "componentName";
      }
    | {
          code: "ERR02";
          template: "Failed to load configuration";
      }
    | {
          code: "ERR03";
          template: "Failed to fetch {{ resource }} from {{ url }}";
          tokens: "resource" | "url";
      }
> = {
    ERR01: "{{ componentName }} failed to mount",
    ERR02: "Failed to load configuration",
    ERR03: "Failed to fetch {{ resource }} from {{ url }}"
};

/** The runtime reporter for react-children-hooks */
const reporter = createReporter(
    process.env.NODE_ENV === "production" ? ({} as typeof messages) : messages
);

export default reporter;
