# AGENTS.md

## Project Overview

- `react-children-hooks` is a TypeScript-first React library for inspecting, traversing, querying, and validating `props.children`.
- Source code lives in `src/`.
- Public exports are collected in `src/index.ts`.
- API reference docs live in `docs`.
- Build output is generated into `dist/` and should not be edited manually.

## Environment

- Use Node.js 18 or newer.
- Package manager: `npm`.
- React is a peer dependency and should remain external in library builds.

## Important Commands

- Install dependencies: `npm install`
- Build the library: `npm run build`
- Run the watch build for development: `npm run dev`
- Run tests once: `npm test`
- Run tests in watch mode: `npm run test:watch`
- Run linting: `npm run lint`
- Run TypeScript checks: `npm run typecheck`
- Format the repo: `npm run format`
- Create a commit: `npm run commit`

## Validation

- After code changes, run the checks that match the scope of the change.
- Preferred full validation for library code changes:
    - `npm run lint`
    - `npm run typecheck`
    - `npm test`
- If public API behavior changes, update or add tests in `src/*.test.ts`.
- If the exported surface or user-facing behavior changes, update the relevant docs in `docs` and confirm `src/index.ts` exports are still correct.

## Codebase Conventions

- Follow the existing TypeScript style in `src/`: named exports, explicit React type imports, and concise JSDoc on public hooks and utilities.
- Add a JSDoc block comment with tags to every function, including local utilities.
- In `src/`, prefer one default export per file.
- Name each `src/` file after its default export.
- Exceptions:
    - `src/index.ts` remains the public named-export barrel.
    - `src/types.ts` can continue to export multiple shared public types.
    - Test files can keep named helpers when that makes tests clearer.
- Put shared public API types in `src/types.ts` rather than creating standalone source files for each type.
- Preserve the library's direct-children semantics unless a task explicitly requires changing that behavior.
- Prefer small focused utilities and hooks over broad abstractions.
- Keep utility functions private by default for MVP footprint. Only export a utility from `src/index.ts` and document it publicly when the user explicitly wants it to be part of the package API.
- Keep React as an external dependency and avoid introducing unnecessary runtime dependencies.
- Match the existing formatting style:
    - double quotes
    - semicolons
    - trailing commas only where the formatter adds them
    - four-space indentation

## Testing Conventions

- Tests are colocated in `src/` as `*.test.ts`.
- Vitest is the test runner.
- `@testing-library/react`'s `renderHook` is the standard pattern for hook tests.
- Use realistic React child values created with `createElement`, and cover both runtime behavior and TypeScript-facing expectations when practical.

## Documentation Conventions

- Keep README and `docs/*.md` terminology aligned with the implementation.
- Keep `llms.txt` aligned with the current public API, hook families, and canonical documentation links.
- Do not create standalone docs pages for individual public API types unless the user explicitly asks for them.
- When adding a new hook or utility, add:
    - the implementation in `src/`
    - tests in `src/`
    - exports in `src/index.ts`
    - API docs in `docs/`
    - `llms.txt` updates if the public API map or canonical doc links changed
    - a README reference if it belongs in the public API list
- When removing, renaming, or materially changing a public hook or utility, update `llms.txt` so its API summary and doc pointers remain accurate.
- Do not manually update `CHANGELOG.md` when adding a new feature. Changelog entries are generated through the conventional-commit release workflow.

## Change Guidance

- Keep changes minimal and scoped to the request.
- Avoid renaming public APIs unless the task explicitly calls for it.
- Do not edit generated output in `dist/`.
- Do not manually edit `CHANGELOG.md` for routine feature work or maintenance changes unless the user explicitly asks for it.
- Do not add new tooling or dependencies unless they are necessary for the requested change.
- When creating a commit, use `npm run commit` instead of invoking `git commit` directly.
