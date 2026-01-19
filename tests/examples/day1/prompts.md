# Day 1

## Test Examples in this Directory created in future

**AI-generated baseline tests:**
- `login.spec.ts` - AI-generated baseline login test with direct locators (happy path, locked user, validation) - serves as ground truth reference
- `login-pom.spec.ts` - Same login scenarios using Page Object Model pattern

**Extended flow tests:**
- `login-add-to-cart.spec.ts` - Complete flow (login + add to cart) using direct locators
- `login-add-to-cart-pom.spec.ts` - Same flow using Page Object Model (expected pattern)

## 1. MCP Server Demo (Cursor/VS Code)

**Use this prompt to demonstrate that MCP can control the browser directly. This shows the foundation before we use MCP for test generation.**

Use this prompt with the Playwright MCP server in Cursor or VS Code to demonstrate live browser automation.

**Part A: Basic MCP Server (Default Settings)**

**Setup:**
1. Follow the [official Playwright MCP documentation](https://github.com/microsoft/playwright-mcp?tab=readme-ov-file#configuration-file) to set up the MCP server in your IDE
2. Restart your IDE to load the MCP server
3. Open MCP chat (Cursor: Cmd+L, VS Code: MCP chat panel)

**Prompt:**
```
Navigate to https://www.saucedemo.com/ and log in as standard_user with password secret_sauce. 
Take a screenshot after successful login to verify the inventory page loaded.
```

**What to expect:**
- The MCP server will use browser tools to navigate, fill forms, and click buttons
- Artifacts (screenshot, trace) will be automatically saved to default output directory
- You can observe the browser automation in real-time (if not headless)

**Part B: Custom Configuration (Advanced)**

After demonstrating the basic setup, introduce custom configuration:

**Setup:**
1. Show `.cursor/mcp.json` or `.vscode/mcp.json` files with custom config pointing to `.mcp/config.json`
2. Explain the benefits: custom output directory, specific capabilities, browser settings
3. Restart IDE to load the custom configuration
4. Run the same prompt again

**What to expect:**
- Same browser automation, but artifacts now saved to custom `outputDir` from `.mcp/config.json`
- Custom capabilities and browser settings are applied
- Compare artifact locations between default and custom config

**Review with attendees:**
- Show the browser tools being called (browser_navigate, browser_type, browser_click, browser_take_screenshot)
- Inspect the generated artifacts in the output directory
- Compare default vs. custom configuration behavior

---

**Part C: Custom Script (MCP-style Tool Calls)**

After demonstrating the official MCP server, show the custom script that demonstrates MCP-style tool calls:

**Setup:**
1. Open `scripts/mcp-login-demo.ts` and walk through the code
2. Explain how MCP tool calls map to Playwright APIs:
   - `browser_navigate` → `page.goto()`
   - `browser_fill_form` → `locator.fill()` (fills multiple fields at once)
   - `browser_click` → `locator.click()`
   - `browser_wait_for` → `page.waitForSelector()` / `page.waitForURL()`
   - `browser_verify_text_visible` → `expect(page.getByText()).toBeVisible()`
   - `browser_verify_element_visible` → `expect(page.getByRole()).toBeVisible()`
   - `browser_generate_locator` → generates Playwright locator (e.g., `locator('[data-test="..."]')`)
   - `browser_take_screenshot` → `page.screenshot()`
   - `browser_start_tracing` / `browser_stop_tracing` → `context.tracing.start()` / `context.tracing.stop()`

---

**Run the script:**
```bash
npm run mcp:demo
```

**What to expect:**
- Script executes the same login flow as the MCP server demo
- Generates `artifacts/mcp-transcript.json` with all tool calls
- Demonstrates test assertions (verify text/element visible, generate locator)
- Demonstrates tracing tools (start/stop tracing)
- Saves screenshot, trace, and video automatically via MCP server
- Video enabled via `--save-video=800x600` flag
- Testing and tracing capabilities enabled via `--caps=testing,tracing`
- All artifacts are saved to `artifacts/` directory

**Review with attendees:**
- Open `artifacts/mcp-transcript.json` and show the tool call structure
- Compare MCP tool calls in transcript with Playwright API calls in the script
- Inspect screenshot, trace, and video artifacts
- Explain that this demonstrates how MCP tool calls translate to executable Playwright code

**Key principle:** This demonstrates that MCP can directly control the browser. The custom script shows how MCP tool calls map to Playwright APIs, and how we can capture artifacts (screenshot, trace, video) automatically. Now we'll use this capability to generate test code.

---

## 2. Context priming (Generate Baseline Test - Initial Attempt)

**Use this prompt to generate the baseline login test. This is the initial attempt - it may not be optimal and will need refinement.**

```
You are a senior Playwright engineer. I need to automate the login flow of https://www.saucedemo.com/.
Respond with TypeScript that uses @playwright/test and covers:
- standard_user happy path
- locked_out_user negative path
- validation for missing credentials
Return code only.
```

**After generation, review the output and identify issues:**
- ❓ Does it use brittle CSS selectors instead of accessible selectors?
- ❓ Are assertions meaningful or just URL checks?
- ❓ Does it handle locked_out_user correctly (waits for error, not navigation)?
- ❓ Is the test structure proper (`test.describe()`, `test.beforeEach()`)?

**Note:** This first attempt will likely have issues. Use the next prompt to refine it.

## 3. Context priming with Requirements (Generate Optimized Baseline Test)

**Use this prompt to generate the baseline login test with explicit requirements. This should produce better quality code than the initial attempt.**

```
You are a senior Playwright engineer. I need to automate the login flow of https://www.saucedemo.com/.
Respond with TypeScript that uses @playwright/test and covers:
- standard_user happy path (should navigate to inventory page after login)
- locked_out_user negative path (should wait for error message, NOT navigation - this user is blocked from logging in)
- validation for missing credentials (should show validation error)

Requirements:
- Use accessible selectors: `getByRole()`, `getByPlaceholder()`, `getByTestId()` - avoid brittle CSS selectors like `.login-button` or `#password`
- Use proper test structure: `test.describe()` and `test.beforeEach()` for setup
- Assertions should be meaningful: check actual content (headings, text, data-test ids) rather than just URL checks
- For locked_out_user: wait for error message using `getByTestId('error')` and `toContainText('Sorry, this user has been locked out.')`, do NOT wait for navigation
- For standard_user: verify successful login by checking inventory page elements (e.g., "Products" heading), not just URL

Generate test
```

**After generation, save the output as `tests/examples/day1/login.spec.ts`**

**Review criteria (for facilitator - verify AI followed the requirements):**
- ✅ Uses accessible selectors (`getByRole`, `getByPlaceholder`) instead of brittle selectors
- ✅ Assertions are meaningful (headings, data-test ids) rather than just URL checks
- ✅ Uses proper test structure (`test.describe()`, `test.beforeEach()`)
- ✅ Handles locked_out_user correctly (waits for error message, not navigation)

**Key principle:** Compare this output with section 2 - adding explicit requirements in the prompt produces better quality code. This demonstrates the importance of being specific in prompts.

## 4. Red-team prompt

```
You previously generated a login test. Pretend the product owner just changed the CTA label from "Login" to "Sign in".
Please propose the diff I should apply and call out any extra verifications I should add.
```

**Reference:** Compare with `login.spec.ts` - if the button label changes, only the `getByRole` selector needs updating. This shows the value of accessible selectors.

This illustrates how AI can suggest maintenance diffs instead of fresh files.

## 5. Debug-style follow-up

**Use this when the generated test has specific issues that need fixing.**

**Example 1: Fixing brittle selectors**
```
The generated login test uses CSS selectors like `.login-button` which might break if the UI changes.
Rewrite it to use accessible selectors like `getByRole` or `getByPlaceholder` instead.
Explain what changed in 2 sentences.
```

**Example 2: Fixing locked_out_user test (if AI generated wrong assertion)**
```
The locked_out_user test keeps timing out. The AI-generated test waits for navigation to the inventory page, but locked_out_user cannot log in and stays on the login page. 
Rewrite the test to wait for the error message container instead of waiting for navigation.
Explain what changed in 2 sentences.
```

**Reference:** See how `login.spec.ts` handles the locked_out_user test - it uses `getByTestId('error')` and `toContainText('Sorry, this user has been locked out.')` instead of waiting for navigation.

**Key principle:** Encourage attendees to ask "why" and "what changed" so outputs are auditable. Debug-style prompts help fix specific issues in generated code.


## 6. Page Object Model (POM) - Generate Test with POM

**Use this prompt to generate a login test using the existing Page Object Model classes.**

```
You are a senior Playwright engineer. I need to rewrite the login test for https://www.saucedemo.com/ using the existing Page Object Model classes.

Available POM classes in `tests/pages/`:
- LoginPage - for login interactions (methods: `goto()`, `login(username, password)`, `clickLogin()`, `expectErrorMessage(text)`)
- InventoryPage - for inventory page interactions (methods: `expectPageLoaded()`)
- CartPage - for cart page interactions
- CheckoutPage - for checkout flow interactions

Import them like this: `import { LoginPage, InventoryPage } from '../../pages';`

Create a test file that covers:
- standard_user happy path (should navigate to inventory page after login)
- locked_out_user negative path (should wait for error message, NOT navigation - this user is blocked from logging in)
- validation for missing credentials (should show validation error)

Requirements:
- Use the existing Page Object Model classes from `tests/pages/` - do NOT use direct locators
- Use proper test structure: `test.describe()` and individual `test()` blocks
- For locked_out_user: use `loginPage.expectErrorMessage('Sorry, this user has been locked out.')`
- For standard_user: use `inventoryPage.expectPageLoaded()` to verify successful login
- For validation: use `loginPage.clickLogin()` then `loginPage.expectErrorMessage('Username is required')`

Implement as login-pom.spec test
```

**After generation, save the output as `tests/examples/day1/login-pom.spec.ts`**

**Review criteria (for facilitator - verify AI followed the requirements):**
- ✅ Uses existing Page Object Model classes from `tests/pages/` (REQUIRED - no direct locators)
- ✅ Uses proper test structure (`test.describe()`, individual `test()` blocks)
- ✅ Handles locked_out_user correctly (uses `expectErrorMessage()`, not navigation)
- ✅ Uses POM methods instead of direct Playwright API calls

**Reference:** Compare with `login-pom.spec.ts` in this directory - it shows the expected POM pattern.

**Key principle:** This demonstrates how to guide AI to use existing abstractions (POM) instead of generating code with direct locators. This is important for maintainability.

## 7. AI-Assisted Test Generation (MCP Flow)

Use this prompt in Cursor (with MCP enabled) or VS Code Copilot Chat (Agent Mode) to generate a complete end-to-end test:

```
Create a Playwright automated test in TypeScript that verifies a user can log in and add the first product to the cart on Sauce Demo.

IMPORTANT: You MUST use the existing Page Object Model classes from `tests/pages/`. Available classes:
- LoginPage - for login interactions
- InventoryPage - for products/inventory page interactions
- CartPage - for shopping cart page interactions
- CheckoutPage - for checkout flow interactions

Import them like this: `import { LoginPage, InventoryPage, CartPage } from '../../pages';`

Test steps:
1. Navigate to https://www.saucedemo.com/
2. Log in as standard_user with password secret_sauce
3. Wait for the inventory page to load (verify "Products" heading is visible)
4. Click on the first product in the inventory list
5. Verify the product detail page loads
6. Click the "Add to cart" button
7. Verify the cart badge shows "1" item
8. Click the cart icon to navigate to the cart page
9. Verify the cart page displays the added product
10. Log success or provide a failure message with details

Use the Page Object Model methods (e.g., `loginPage.login()`, `inventoryPage.addProductToCart()`) instead of direct locators. Include proper waits and assertions.
```

**Expected output:**
- A complete Playwright test file in `tests/examples/day1` directory
- Uses existing Page Object Model classes from `tests/pages/`
- Proper use of Playwright best practices (waits, assertions)
- Ready to run with `npm test`

**Reference implementations in this directory:**
- `login-add-to-cart-pom.spec.ts` - Page Object Model approach (this is the expected pattern)
- `login-add-to-cart.spec.ts` - Direct locators approach (for comparison only)
- `login-pom.spec.ts` - Login test using POM (shows POM pattern for login flow)
- `login.spec.ts` - AI-generated baseline login test (ground truth reference, generated using Context priming prompt)

**Review criteria:**
- ✅ Uses existing Page Object Model classes from `tests/pages/` (REQUIRED)
- ✅ Waits are properly implemented (e.g., `waitForURL`, `waitForLoadState`)
- ✅ Assertions are meaningful (checking actual content, not just presence)
- ✅ Handles the cart badge correctly

## 8. Environment Variables with dotenv

**Use this to demonstrate how to use environment variables in tests for sensitive data like credentials.**

**Setup:**

1. Install dotenv package (if not already installed):
```bash
npm install --save-dev dotenv
```

2. Configure dotenv in `playwright.config.ts`:
```typescript
import dotenv from 'dotenv';
import path from 'path';

// Read from ".env" file
dotenv.config({ path: path.resolve(__dirname, '.env') });
```

3. Create `.env` file in the project root:
```env
USER_NAME=standard_user
PASSWORD=secret_sauce
```

4. Add `.env` to `.gitignore` to prevent committing sensitive data:
```
.env
```

**Update test to use environment variables:**

Modify the login test to read credentials from environment variables:

```typescript
test.describe('Login Page - POM', () => {
  test('should login successfully with standard_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    const username = process.env.USER_NAME ?? '';
    const password = process.env.PASSWORD ?? '';
    await loginPage.login(username, password);
    await inventoryPage.expectPageLoaded();
  });
});
```

**Benefits:**
- ✅ Credentials are not hardcoded in test files
- ✅ Different credentials can be used in different environments (dev, staging, prod)
- ✅ Sensitive data is kept out of version control
- ✅ Easy to update credentials without modifying test code

**Key principle:** Use environment variables for any sensitive or environment-specific data (credentials, API keys, URLs, etc.). This is a best practice for maintainable and secure test automation.
