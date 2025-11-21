# Day 1 – Prompting Cheatsheet

**For Facilitators:** Use these prompts to demonstrate how an AI assistant can accelerate authoring Playwright tests. Show them to attendees and adapt them live. Discuss why you accept or reject AI suggestions.

This file is a reference guide for the facilitator during the prompting demo session.

## 1. Context priming

```
You are a senior Playwright engineer. I need to automate the login flow of https://www.saucedemo.com/.
Respond with TypeScript that uses @playwright/test and covers:
- standard_user happy path
- locked_out_user negative path
- validation for missing credentials
Return code only.
```

Review criteria:
- Does it rely on brittle selectors instead of `getByRole`/`getByPlaceholder`?
- Are assertions meaningful (headings, data-test ids) rather than URL checks?

## 2. Debug-style follow-up

```
The locked_out_user test keeps timing out because the assistant clicks the button twice.
Rewrite the test to wait for the error container instead.
Explain what changed in 2 sentences.
```

Encourage attendees to ask “why” and “what changed” so outputs are auditable.

## 3. Red-team prompt

```
You previously generated a login test. Pretend the product owner just changed the CTA label from "Login" to "Sign in".
Please propose the diff I should apply and call out any extra verifications I should add.
```

This illustrates how AI can suggest maintenance diffs instead of fresh files.

## 4. MCP Server Demo (Cursor/VS Code)

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
- Compare this approach to the custom script (`mcp-login-demo.ts`)

## 5. AI-Assisted Test Generation (MCP Flow)

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

**Reference implementations:**
- `login-add-to-cart-pom.spec.ts` - Page Object Model approach (this is the expected pattern)
- `login-add-to-cart.spec.ts` - Direct locators approach (for comparison only)

**Review criteria:**
- Does it use the existing Page Object Model classes from `tests/pages/`? (REQUIRED)
- Are waits properly implemented (e.g., `waitForURL`, `waitForLoadState`)?
- Are assertions meaningful (checking actual content, not just presence)?
- Does it handle the cart badge correctly?

## 6. Transcript recap

After running `npm run mcp:demo`, open `artifacts/mcp-transcript.json` and link each entry to the equivalent tool call (open, getByRole, fill, click, assert, saveScreenshot). This closes the loop between prompting and executable output.
