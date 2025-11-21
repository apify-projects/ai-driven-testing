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
- [ ] **Official MCP Server Setup**: Guide attendees through basic MCP server installation (without custom config):
  - [ ] **For Cursor users**: Follow [official documentation](https://github.com/microsoft/playwright-mcp?tab=readme-ov-file#configuration-file) to add Playwright MCP server. Show how to configure it in Cursor settings.
  - [ ] **For VS Code users**: Install MCP extension if needed, follow [official documentation](https://github.com/microsoft/playwright-mcp?tab=readme-ov-file#configuration-file) to add Playwright MCP server. Show how to configure it in VS Code settings.
  - [ ] Verify MCP server is running (check IDE logs or MCP status panel).
  - [ ] Explain that this uses default settings (no custom config yet).
- [ ] Domain walkthrough: Browse https://www.saucedemo.com/ with test accounts from README.
- [ ] Prompting demo:
  - [ ] Display `tests/examples/day1/prompts.md`.
  - [ ] Paste the "Context priming" prompt into your AI assistant (Cursor/Copilot/ChatGPT) and review output.
  - [ ] Apply "Debug" and "Red-team" prompts; highlight improvements/risks.

- [ ] Manual baseline:
  - [ ] Open `tests/examples/day1/login.spec.ts` and live-code key snippets.
  - [ ] Run `npx playwright test tests/examples/day1/login.spec.ts --project=chromium`.
- [ ] **Page Object Model introduction**:
  - [ ] Present `tests/examples/day1/page-object-model.md` - explain POM benefits and principles.
  - [ ] Compare `login.spec.ts` (direct locators) with `login-pom.spec.ts` (POM pattern).
  - [ ] Show page object structure in `tests/pages/` directory.
  - [ ] Discuss when to use POM vs. direct locators.
- [ ] MCP demo:
  - [ ] **Official MCP Server**: Use prompt from `prompts.md` section 4 to log in as standard_user. Show browser tools being called and artifacts being saved (using default settings).
  - [ ] **Custom Config Setup**: Now introduce custom configuration:
    - [ ] Show `.cursor/mcp.json` and `.vscode/mcp.json` files with custom config pointing to `.mcp/config.json`.
    - [ ] Explain benefits: custom output directory, specific capabilities, browser settings.
    - [ ] Restart IDE to load custom config.
  - [ ] **Custom Config Demo**: Run the same prompt again, show artifacts saved to custom `outputDir` from `.mcp/config.json`.
  - [ ] **Custom Script**: Walk through `scripts/mcp-login-demo.ts`, execute `npm run mcp:demo`, then inspect `artifacts/mcp-transcript.json`, screenshot, trace, and video.

- [ ] Hands-on block: Assign `tests/exercises/day1/exercises.md`, circulate for questions.
- [ ] Wrap-up and Q&A: Summarize Day 1, answer questions, set expectations for Day 2.

## Day 2 – AI Extensions & CI/CD

- [ ] Recap: Discuss wins/challenges from day 1, set expectations for AI-generated tests.
- [ ] **VS Code Setup Verification**: Verify VS Code Insiders setup for Playwright Agents:
  - [ ] Verify VS Code Insiders is installed (v1.105+) and "Playwright Test for VSCode" extension is installed.
  - [ ] Verify agent definitions exist (`.github/chatmodes/` directory).
  - [ ] Run `npx playwright init-agents --loop=vscode` if needed to update/verify agent definitions.
  - [ ] Open repository in VS Code Insiders, verify Playwright Agents panel is visible.
- [ ] Part 1 – AI-powered edge cases:
  - [ ] Open `tests/examples/day2/enhancing.md` + `tests/examples/day1/login-edge-cases.spec.ts`.
  - [ ] Harden selectors/assertions, discuss promotion criteria.
  - [ ] Map MCP transcript steps (from Day 1 artifacts) to code.

- [ ] Part 2 – Playwright agents (chat-driven):
  - [ ] Present `tests/examples/day2/agents.md`.
  - [ ] Live demo planner → generator → healer in VS Code Insiders.
  - [ ] Debrief on accept/reject criteria, capture diffs.
- [ ] CI/CD walkthrough:
  - [ ] Open `.github/workflows/playwright.yml`, step through each job action.
  - [ ] Emphasize artifact uploads + GitHub Job Summary.

- [ ] Docker & reproducibility: Remind attendees of `npm run docker:test` and when to use it.
- [ ] Reporting focus: Show how job summary links to screenshots/trace/MCP transcript (artifacts created in Day 1 or by agents).
- [ ] Hands-on block: Assign `tests/exercises/day2/exercises.md` (edge-case promo, agent guardrails, CI enhancements).
- [ ] Wrap-up and Q&A: Final summary, collect feedback, share resources.

## After the workshop

- [ ] Collect feedback (retro board or shared doc).
- [ ] Share slide export + repo link (and walkthrough branch instructions).

