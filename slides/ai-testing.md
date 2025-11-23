---
marp: true
theme: default
paginate: true
size: 16:9
class: invert
title: AI-driven Testing with Playwright
auto-scaling: true
footer: AI-driven Testing
style: |
  section {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-top: 60px;
  }
---
<!-- _paginate: skip -->
<!-- Scoped style -->
<style scoped>
section {
    justify-content: center;
    align-items: center;
}
</style>
# AI-driven Testing  
with Playwright & MCP

**Martin Krištof**

---

## About the Trainer

![bg right:50% width:400px](https://www.kristofmartin.eu/_next/image?url=%2Fme.jpg&w=3840&q=75)

- React, QA
- Staff Engineer
- Conference speaker, trainer [kristofmartin.eu web](https://www.kristofmartin.eu)
---

# AI-driven Testing with Playwright & MCP

- Prompting + manual baselines
- Tool-assisted execution (MCP)
- Agents, CI/CD, and reporting

---

## Agenda – Day 1

1. Why AI for end-to-end testing?
2. Prompt engineering for Playwright
3. Baseline login spec (Sauce Demo)
4. Page Object Model (POM) pattern
5. MCP tool-call walkthrough
6. CI/CD integration (GitHub Actions)
7. Reporting (screenshots, trace, job summary)

Deliverables: runnable spec, prompt doc, POM examples, MCP artifacts, CI workflow.

---

## Agenda – Day 2

1. Reviewing AI-generated edge cases
2. Playwright agents & guardrails

Deliverables: generated specs, agent-generated tests.

---

## MCP Server Setup

**What is MCP?**
- Model Context Protocol - enables AI assistants to interact with tools
- Playwright MCP server provides browser automation tools
- AI can execute Playwright commands through MCP

---

**Setup Steps:**
- **Cursor users**: Add Playwright MCP server in Cursor settings
- **VS Code users**: Install MCP extension, add Playwright MCP server
- Verify MCP server is running (check IDE logs or MCP status panel)
- See `.mcp/README.md` for detailed configuration guide
- Uses default settings initially (custom config comes later)

---

**Why setup first?**
- We'll use MCP for live browser automation demos
- AI can execute Playwright commands directly
- Artifacts (screenshots, traces) are automatically saved

---

## Sauce Demo Application

**Live Demo:** Browse https://www.saucedemo.com/

**Test Accounts:**
- `standard_user` / `secret_sauce` - happy path
- `locked_out_user` / `secret_sauce` - blocked user (error message)
- `problem_user` / `secret_sauce` - UI issues
- `performance_glitch_user` / `secret_sauce` - slow responses

---

**Key Flows to Explore:**
- Login flow (success & error cases)
- Product browsing and filtering
- Add to cart
- Checkout process

**Note:** This application will be our testing target throughout the workshop.

---

## MCP Demo Flow

**Section 1: MCP Server Demo**

**Part A: Basic MCP Server (Default Settings)**
- Use MCP server to control browser directly (live automation)
- Tool calls map to Playwright APIs (navigate → fill → click → screenshot)
- Capture artifacts automatically (screenshot, trace)

**Part B: Custom Configuration (Advanced)**
- Custom output directory, specific capabilities, browser settings
- Artifacts saved to custom `outputDir` from `.mcp/config.json`

---

**Part C: Custom Script (MCP-style Tool Calls)**
- Custom script (`mcp-login-demo.ts`) demonstrates MCP-style tool calls
- Generates transcript, screenshot, trace, and video
- Demonstrates test assertions (`browser_verify_text_visible`, `browser_verify_element_visible`, `browser_generate_locator`)
- Demonstrates tracing tools (`browser_start_tracing`, `browser_stop_tracing`)
- All artifacts saved to `artifacts/` directory
- Video enabled via `--save-video=800x600` flag
- Testing and tracing capabilities enabled via `--caps=testing,tracing`

**Note:** Official MCP server (via config.json) supports traces and screenshots. Video recording is available via `--save-video` flag (e.g., `--save-video=800x600`).

---

## 📝 Live Coding: MCP Server Demo - Part A

**Open file:**
- `tests/examples/day1/prompts.md` - Section 1, Part A

**What to demonstrate:**
- Use MCP prompt to log in as standard_user
- Show browser tools being called (browser_navigate, browser_fill_form, browser_click)
- Inspect generated artifacts (screenshot, trace) in default output directory

---

## 📝 Live Coding: MCP Server Demo - Part B

**Open files:**
- `.cursor/mcp.json` or `.vscode/mcp.json`
- `.mcp/config.json`

**What to demonstrate:**
- Show custom config files
- Explain benefits: custom output directory, capabilities, browser settings
- See `.mcp/README.md` for detailed options
- Run same prompt, show artifacts saved to custom `outputDir`

---

## 📝 Live Coding: MCP Server Demo - Part C

**Open file:**
- `scripts/mcp-login-demo.ts`

**What to demonstrate:**
- Walk through script code
- MCP tool calls → Playwright APIs mapping
- Run: `npm run mcp:demo`
- Inspect artifacts: transcript, screenshot, trace, video

---

## Prompting Principles

- Start with context, constraints, assertions.
- Prefer accessible selectors (`getByRole`, `getByPlaceholder`).
- Ask for diffs instead of whole files when iterating.
- Validate outputs manually before merging.

---

## 📝 Live Coding: Prompt Engineering

**Open file:**
- `tests/examples/day1/prompts.md` - prompt examples and cheatsheet

**What to demonstrate:**
- Section 2: Context priming prompt (Initial Attempt)
- Section 3: Context priming with Requirements (Optimized)
- Section 4: Red-team prompt for diffs
- Section 5: Debug-style follow-up prompt
- Review criteria and best practices

---

## Baseline Login Test

- Generate the baseline test using AI (Context priming prompt).
- Covers happy path, locked user, empty credentials.
- Review and refine the generated code to show best practices.
- Use it as the "golden" reference for AI outputs.

---

## 📝 Live Coding: Generate Baseline Login Test

**Open file:**
- `tests/examples/day1/prompts.md` - Section 2 & 3

**What to demonstrate:**
- Section 2: Context priming prompt (without requirements)
- Review output - identify issues (brittle selectors, wrong assertions)
- Section 3: Context priming with Requirements prompt
- Compare outputs - highlight improvements
- Save as `tests/examples/day1/login.spec.ts` and run

---

## Page Object Model (POM)

**Why use POM?**
- Single source of truth for locators
- Easy maintenance (update once, use everywhere)
- Better readability (tests read like user stories)
- Type safety with TypeScript

**Structure:**
- Base class with common functionality
- Page classes encapsulate locators and actions
- Methods represent user interactions

---

<!-- Scoped style -->
<style scoped>
pre {
  font-size: 1rem;
  min-width: 50%;
  height: 100%;
}
</style>

**Example:**
```typescript
const loginPage = new LoginPage(page);
await loginPage.login('user', 'pass');
```

**LoginPage implementation:**
```typescript
export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

---

## 📝 Live Coding: Page Object Model

**Open files:**
- `tests/pages/BasePage.ts` - base class with common functionality
- `tests/pages/LoginPage.ts` - login page implementation
- `tests/pages/InventoryPage.ts` - inventory page implementation
- `tests/examples/day1/login-pom.spec.ts` - test using POM

---

**What to demonstrate:**
- Base class structure with `page` property
- Page class with locators and action methods
- Test using POM vs. direct locators comparison
- See `tests/examples/day1/page-object-model.md` for detailed explanation
- Use prompt from `prompts.md` Section 6 to generate POM test

---

## 📝 Hands-on: Day 1 Exercises

**Open file:**
- `tests/exercises/day1/exercises.md`

**Exercises:**
1. Negative-path hardening - create test for wrong password rejection
2. MCP tool-based test - use MCP tools to write login + add to cart test (save as `mcp-cart.ts`)
3. Page Object Model practice - create new test case (remove from cart) using POM

**Reference:**
- See `tests/exercises/day1/exercises.md` for detailed exercise descriptions

---

## CI/CD Highlights

- GitHub Actions job `pw-tests`.
- Upload screenshots, trace, MCP transcript.
- Write a short GitHub Job Summary with links.
- Reuse Dockerfile for reproducible runners.

---

## 📝 Live Coding: CI/CD Integration

**Open files:**
- `.github/workflows/playwright.yml` - GitHub Actions workflow (job: `pw-tests`)
- `Dockerfile`

**What to demonstrate:**
- Workflow structure and job steps
- Artifact uploads (screenshots, traces, transcripts)
- GitHub Job Summary generation
- Docker & reproducibility: `npm run docker:test`

---

## AI-Generated Edge Cases

- Generate edge case tests using AI with Page Object Model.
- Cover problem_user, performance_glitch_user, and bad credentials.
- Use existing POM classes for maintainability.
- Review and validate generated tests before promotion.

---

## 📝 Live Coding: Generate Edge Case Tests

**Open file:**
- `tests/examples/day2/prompts-enhancing.md` - Section 1

**What to demonstrate:**
- Use prompt to generate edge case tests with POM
- Review test structure (loop for users, bad credentials)
- Verify POM classes usage (LoginPage, InventoryPage)
- Save as `tests/examples/day2/login-edge-cases.spec.ts` and run

---

## Agents Overview

- Orchestrator LLM decides which tool to run.
- Tool adapters wrap Playwright commands.
- Guardrails enforce selector scope + retry limits.
- Telemetry feeds the same artifact pipeline.

---

## 📝 Live Coding: Playwright Agents

**Open files:**
- `tests/examples/day2/agents.md` - detailed guide
- `tests/examples/day2/checkout-happy-path.spec.ts` - example generated test

**What to demonstrate:**
- Using Playwright Agents in VS Code
- Planner, Generator, Healer agents
- Guardrails configuration
- Review generated test code

---

## 📝 Hands-on: Day 2 Exercises

**Open file:**
- `tests/exercises/day2/exercises.md`

**Part 1 – AI-powered edge cases:**
1. Additional edge cases - generate tests for 2-3 additional edge cases (empty fields, special characters, long inputs)

**Part 2 – Playwright agents:**
1. Playwright agents on different application - choose another web app, use Planner → Generator → Healer to create tests, then break a test and use Healer to fix it

**Reference:**
- See `tests/exercises/day2/exercises.md` for detailed exercise descriptions

---

# Thank you!

Resources:
- Repo README for scripts & setup
- `tests/examples/` for all test specs (manual + AI-generated)
- `tests/pages/` for Page Object Model examples
- `tests/examples/day2/agents.md` for deeper dives

Happy testing! 🎯


