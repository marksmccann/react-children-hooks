# react-children-hooks

`react-children-hooks` is a TypeScript-first React library for inspecting, traversing, querying, and validating `props.children`.

## Status

This package is currently in scaffold stage. The project foundation is in place, and the initial hook and utility API is still being designed.

## Planned Capabilities

- Retrieve direct references to particular child nodes
- Inspect child props and element types
- Count children and summarize composition
- Validate minimum and maximum child constraints
- Recursively search nested children

## API Reference

- [`useChildByType`](./docs/api/useChildByType.md)
- [`useChildWhere`](./docs/api/useChildWhere.md)
- [`useChildrenByType`](./docs/api/useChildrenByType.md)
- [`useChildrenWhere`](./docs/api/useChildrenWhere.md)
- [`childrenToElements`](./docs/api/childrenToElements.md)
- [`isElementOfType`](./docs/api/isElementOfType.md)
- [`isReactElement`](./docs/api/isReactElement.md)
- [`ElementOfType`](./docs/api/ElementOfType.md)

## Development

```bash
npm install
npm run build
npm run lint
npm run test
```

## Roadmap

- Define the initial public API
- Implement the first set of hooks and utilities
- Expand test coverage with realistic composition scenarios
- Prepare the package for npm publishing
