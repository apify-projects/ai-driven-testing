# Day 1 – Manual Baseline + AI Assistance

1. **Prompting walkthrough** (`prompts.md`) – capture context, iterate, and red-team AI output. Includes a ready-to-use prompt for generating a complete login + add-to-cart test using MCP (see section 5 in `prompts.md`).
2. **Manual specs**:
   - `login.spec.ts` – ground truth for Sauce Demo login scenarios.
   - `login-add-to-cart.spec.ts` – example of complete flow (login + add to cart) using direct locators.
   - `login-pom.spec.ts` – login test using Page Object Model pattern.
   - `login-add-to-cart-pom.spec.ts` – login + add to cart using Page Object Model pattern.
3. **AI-generated specs**:
   - `login-edge-cases.spec.ts` – AI-generated edge cases for login flow (problem_user, performance_glitch_user, bad credentials). Uses Page Object Model pattern (generated after POM introduction on Day 1, reviewed on Day 2).
4. **Page Object Model** (`page-object-model.md`) – introduction to POM pattern, comparison with direct locators, and example implementations.
5. **MCP tooling** – two approaches to drive the flow through tool-call style automation and collect artifacts.

## MCP Demo Approaches

### Approach 1: Custom Script (Educational)

Run `npm run mcp:demo` to execute the custom `scripts/mcp-login-demo.ts` script. This approach gives you full control and demonstrates how MCP tool calls map to Playwright APIs:

- **Navigation**: `page.goto(url)` – opens a URL
- **Locators**: `page.getByPlaceholder(text)`, `page.getByRole(role, options)` – find elements
- **Actions**: `locator.fill(value)`, `locator.click()` – interact with elements
- **Assertions**: `expect(locator).toHaveText(text)`, `expect(locator).toBeVisible()` – verify state
- **Waiting**: `page.waitForURL(pattern)` – wait for navigation
- **Artifacts**: `page.screenshot()`, `context.tracing.start/stop()`, `page.video()` – capture evidence (video only available in custom script, not via official MCP server)

### Approach 2: Official MCP Server (Production)

The official Playwright MCP server runs as a stdio server and must be launched by an MCP client (not as a standalone process). The server uses the configuration from `.mcp/config.json` and handles artifact collection automatically (traces and screenshots, but **not video recording**).

**Setup:**
- **VS Code**: Already configured in `.vscode/mcp.json` - the server will start automatically when using the MCP extension.
- **Cursor**: Already configured in `.cursor/mcp.json` - the server will start automatically when using the MCP extension.
- **Cursor/Other clients**: Configure your MCP client to launch `npx playwright run-test-mcp-server`.

See `.mcp/README.md` for detailed setup instructions for different MCP clients.

**Note:** The MCP server must be launched by an MCP client (VS Code, Cursor, etc.) to function properly. It runs as a stdio server and waits for input from the client.

**Further reading:**
- [MCP (Model Context Protocol) documentation](https://modelcontextprotocol.io/)
- [Playwright MCP Server](https://github.com/microsoft/playwright-mcp) – official MCP server implementation for Playwright
