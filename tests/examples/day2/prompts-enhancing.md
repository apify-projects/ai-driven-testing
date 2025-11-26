# Day 2 – AI-Powered Edge Cases

**For Facilitators:** Use this prompt to demonstrate how to generate edge case tests using AI. Show it to attendees and adapt it live.

This file is a reference guide for the facilitator during the edge case generation session.

## Available Test Examples

**AI-generated edge cases:**
- `login-edge-cases.spec.ts` - AI-generated edge cases (problem_user, performance_glitch_user, bad credentials) using POM

**Reference implementations:**
- `tests/examples/day1/login.spec.ts` - Baseline login test for comparison
- `tests/examples/day1/login-pom.spec.ts` - POM pattern reference

## 1. Generate Edge Case Tests with POM

**Use this prompt to generate edge case tests using the existing Page Object Model classes.**

```
You are a senior Playwright engineer. I need to create edge case tests for the login flow of https://www.saucedemo.com/ using the existing Page Object Model classes.

Available POM classes in `tests/pages/`:
- LoginPage - for login interactions (methods: `goto()`, `login(username, password)`, `expectErrorMessage(text)`)
- InventoryPage - for inventory page interactions (methods: `expectPageLoaded()`)

Import them like this: `import { LoginPage, InventoryPage } from '../../pages';`

Create a test file that covers these edge cases:
- problem_user - should successfully log in and verify inventory page loads (this user has UI issues but login works)
- performance_glitch_user - should successfully log in and verify inventory page loads (this user simulates slow server responses)
- Bad credentials - should reject invalid username/password combination and show error message

Requirements:
- Use the existing Page Object Model classes from `tests/pages/` - do NOT use direct locators
- Use proper test structure: `test.describe()` and individual `test()` blocks
- For problem_user and performance_glitch_user: use `loginPage.login()` then `inventoryPage.expectPageLoaded()` to verify successful login
- For bad credentials: use `loginPage.login()` with invalid credentials then `loginPage.expectErrorMessage('Username and password do not match')`
- Use a loop for the two user scenarios (problem_user, performance_glitch_user) to avoid code duplication
- The test should be resilient to timing issues (performance_glitch_user may be slow)

After generation, save the output as `tests/examples/day2/login-edge-cases.spec.ts`
```

**After generation, save the output as `tests/examples/day2/login-edge-cases.spec.ts`**

**Review criteria (for facilitator - verify AI followed the requirements):**
- ✅ Uses existing Page Object Model classes from `tests/pages/` (REQUIRED - no direct locators)
- ✅ Uses proper test structure (`test.describe()`, individual `test()` blocks)
- ✅ Uses loop for problem_user and performance_glitch_user scenarios
- ✅ Handles bad credentials correctly (uses `expectErrorMessage()`, not navigation)
- ✅ Uses POM methods instead of direct Playwright API calls

**Reference:** Compare with `login-edge-cases.spec.ts` in this directory - it shows the expected pattern with POM and edge case coverage.

**Key principle:** This demonstrates how to guide AI to generate edge case tests using existing abstractions (POM). Edge cases help catch issues that happy path tests might miss.
