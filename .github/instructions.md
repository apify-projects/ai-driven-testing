---
applyTo: "**/*spec.ts"
---

# Coding Guidelines for *.spec.ts Files

## TypeScript Guidelines

- Use TypeScript for all new code
- Follow functional programming principles where possible
- Use interfaces for data structures and type definitions
- Prefer immutable data (`const`, `readonly`)
- Use optional chaining (`?.`) and nullish coalescing (`??`) operators

## Playwright Conventions

### File Structure

- Each file should contain a **single test**
- File name must be a filesystem-friendly scenario name
- Test must be placed in a `describe` block matching the top-level test plan item

### Test Implementation

- Include a comment with the step text before each step execution
- Do not duplicate comments if a step requires multiple actions
- Use Page Object Model (POM) classes if they exist, or create them if needed
- Available POM classes are located in `tests/pages/`

### Accessibility APIs

- Use `getByRole` and other accessible query APIs for element selection
- Prioritize accessibility-first selectors over `getByTestId` or other brittle locators
