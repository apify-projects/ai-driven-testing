# Facilitator Checklist

Use this document as your runbook when delivering the 1.5‑day workshop. Adapt timings to your audience, but keep the order so demos build on each other.

## Before the workshop

- [ ] Verify toolchain: `node -v` ≥ 20, `npm install`, `npm run playwright:install`.
- [ ] Run smoke tests: `npm test` (chromium only is fine) and `npm run mcp:demo` to ensure artifacts are generated.
- [ ] Build Docker image (`npm run docker:build`) and run `npm run docker:test` on at least one machine.
- [ ] Build slides (`npm run slides:build`) and open `slides/dist/ai-testing.html`.
- [ ] Create a clean walkthrough branch (e.g., `walkthrough/day1`) and strip files you plan to reintroduce live.
- [ ] Review `tests/exercises/checklist.md` and add personal timing/notes.
- [ ] Re-read `tests/examples/day2/agents.md` so you can explain agents without pauses.

## Day 1 – Prompting & MCP

- [ ] Kickoff: Agenda, goals, show README "Getting started".
- [ ] **Playwright Introduction** (for beginners):
  - [ ] Present "What is Playwright?" slide - explain key features (cross-browser, auto-waiting, network interception, etc.).
  - [ ] Show "Playwright Basics" slide - demonstrate test structure with example code.
  - [ ] Explain key concepts: `test()`, `page`, `expect()`, `locator`.
  - [ ] Show common actions: `page.goto()`, `page.click()`, `page.fill()`, `page.getByRole()`.
  - [ ] Present "Playwright Selectors" slide - emphasize accessible selectors best practices.
  - [ ] Explain why accessible selectors (`getByRole`, `getByPlaceholder`, `getByTestId`) are preferred over brittle CSS selectors.
- [ ] **Official MCP Server Setup**: Guide attendees through basic MCP server installation (without custom config):
  - [ ] **For Cursor users**: Follow [official documentation](https://github.com/microsoft/playwright-mcp?tab=readme-ov-file#configuration-file) to add Playwright MCP server. Show how to configure it in Cursor settings.
  - [ ] **For VS Code users**: Install MCP extension if needed, follow [official documentation](https://github.com/microsoft/playwright-mcp?tab=readme-ov-file#configuration-file) to add Playwright MCP server. Show how to configure it in VS Code settings.
  - [ ] Verify MCP server is running (check IDE logs or MCP status panel).
  - [ ] Explain that this uses default settings (no custom config yet).
  - [ ] Reference `.mcp/README.md` for detailed configuration guide.
- [ ] Domain walkthrough: Browse https://www.saucedemo.com/ with test accounts from README.
- [ ] **MCP demo (Section 1)**:
  - [ ] Display `tests/examples/day1/prompts.md`.
  - [ ] **Part A - Basic MCP Server**: Use prompt from `prompts.md` section 1, Part A to log in as standard_user. Show browser tools being called and artifacts being saved (using default settings).
  - [ ] **Part B - Custom Configuration**: 
    - [ ] Show `.cursor/mcp.json` and `.vscode/mcp.json` files with custom config pointing to `.mcp/config.json`.
    - [ ] Show `.mcp/config.json` configuration file and explain its options.
    - [ ] Reference `.mcp/README.md` for detailed configuration documentation.
    - [ ] Explain benefits: custom output directory, specific capabilities, browser settings.
    - [ ] Restart IDE to load custom config.
    - [ ] Run the same prompt again, show artifacts saved to custom `outputDir` from `.mcp/config.json`.
  - [ ] **Part C - Custom Script**: 
    - [ ] Walk through `scripts/mcp-login-demo.ts` code.
    - [ ] Explain MCP tool call mapping to Playwright APIs (navigation, form filling, assertions, tracing).
    - [ ] Show test assertions (`browser_verify_text_visible`, `browser_verify_element_visible`, `browser_generate_locator`).
    - [ ] Show tracing tools (`browser_start_tracing`, `browser_stop_tracing`).
    - [ ] Execute `npm run mcp:demo`.
    - [ ] Inspect `artifacts/mcp-transcript.json`, screenshot, trace, and video (all saved to `artifacts/` directory).
    - [ ] Compare MCP tool calls in transcript with Playwright API calls in the script.
    - [ ] Note: Testing and tracing capabilities enabled via `--caps=testing,tracing`, video via `--save-video=800x600`.
- [ ] Prompting demo:
  - [ ] **Prompt 1 (Section 2)**: Paste the "Context priming" prompt (without requirements) into your AI assistant to generate the baseline test.
  - [ ] Review the generated output together - identify issues (brittle selectors, wrong assertions, etc.).
  - [ ] **Prompt 2 (Section 3)**: Paste the "Context priming with Requirements" prompt to generate optimized version.
  - [ ] Compare outputs - highlight how explicit requirements improve code quality.
  - [ ] Save optimized test as `tests/examples/day1/login.spec.ts`.
  - [ ] Run `npx playwright test tests/examples/day1/login.spec.ts --project=chromium`.
  - [ ] **Prompt 3 (Section 4)**: Demonstrate "Red-team" prompt (diff for label change).
  - [ ] **Prompt 4 (Section 5)**: Show "Debug-style follow-up" examples (if needed for specific issues).
- [ ] **Page Object Model introduction**:
  - [ ] Present `tests/examples/day1/page-object-model.md` - explain POM benefits and principles.
  - [ ] Show page object structure in `tests/pages/` directory.
  - [ ] **Prompt 5 (Section 6)**: Use POM prompt to generate `login-pom.spec.ts` using existing POM classes.
  - [ ] Compare `login.spec.ts` (direct locators) with `login-pom.spec.ts` (POM pattern).
  - [ ] Run `npx playwright test tests/examples/day1/login-pom.spec.ts --project=chromium`.
  - [ ] Discuss when to use POM vs. direct locators.
- [ ] **Environment Variables with dotenv**:
  - [ ] Present "Environment Variables with dotenv" slide - explain why to use env variables (security, flexibility).
  - [ ] Show dotenv configuration in `playwright.config.ts` (already configured).
  - [ ] Demonstrate creating `.env` file with credentials (`USER_NAME=standard_user`, `PASSWORD=secret_sauce`).
  - [ ] Show `.gitignore` entry for `.env` file (explain why it's important).
  - [ ] Update test to use `process.env.USER_NAME` and `process.env.PASSWORD` instead of hardcoded values.
  - [ ] Reference `prompts.md` Section 8 for detailed instructions.
  - [ ] Run test to verify it works with environment variables.
  - [ ] Discuss benefits: credentials not in code, different values per environment, secure handling.

- [ ] Hands-on block: Assign `tests/exercises/day1/exercises.md`, circulate for questions.
- [ ] CI/CD walkthrough:
  - [ ] Open `.github/workflows/playwright.yml`, step through each job action.
  - [ ] Emphasize artifact uploads + GitHub Job Summary.
- [ ] Docker & reproducibility: Remind attendees of `npm run docker:test` and when to use it.
- [ ] Reporting focus: Show how job summary links to screenshots/trace/MCP transcript (artifacts created in Day 1 or by agents).
- [ ] Wrap-up and Q&A: Summarize Day 1, answer questions, set expectations for Day 2.

## Day 2 – AI Extensions

- [ ] Recap: Discuss wins/challenges from day 1, set expectations for AI-generated tests.
- [ ] **VS Code Setup Verification**: Verify VS Code Insiders setup for Playwright Agents:
  - [ ] Verify VS Code Insiders is installed (v1.105+) and "Playwright Test for VSCode" extension is installed.
  - [ ] Verify agent definitions exist (`.github/chatmodes/` directory).
  - [ ] Run `npx playwright init-agents --loop=vscode` if needed to update/verify agent definitions.
  - [ ] Open repository in VS Code Insiders, verify Playwright Agents panel is visible.
- [ ] Part 1 – AI-powered edge cases:
  - [ ] Display `tests/examples/day2/prompts-enhancing.md`.
  - [ ] **Prompt (Section 1)**: Use prompt to generate edge case tests with POM.
  - [ ] Review generated output - verify it uses POM classes and handles edge cases correctly.
  - [ ] Save generated test as `tests/examples/day2/login-edge-cases.spec.ts`.
  - [ ] Run `npx playwright test tests/examples/day2/login-edge-cases.spec.ts --project=chromium`.
  - [ ] Compare with reference implementation and discuss promotion criteria.

- [ ] Part 2 – Playwright agents (chat-driven):
  - [ ] Present `tests/examples/day2/agents.md`.
  - [ ] Live demo planner → generator → healer in VS Code Insiders.
  - [ ] Debrief on accept/reject criteria, capture diffs.
- [ ] Hands-on block: Assign `tests/exercises/day2/exercises.md` (additional edge cases, Playwright agents on different application).
- [ ] Wrap-up and Q&A: Final summary, collect feedback, share resources.

## After the workshop

- [ ] Collect feedback (retro board or shared doc).
- [ ] Share slide export + repo link (and walkthrough branch instructions).
