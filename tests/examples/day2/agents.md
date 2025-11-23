# Playwright Agents – Part 2 Guide

Use this sheet for **Part 2 (chat-driven Playwright agents)** on Day 2.

## Architecture quick recap

1. **Orchestrator** – LLM that decides which tool to call (open page, query DOM, click, assert).
2. **Tool adapters** – Wrappers around Playwright actions (e.g., mirroring `scripts/mcp-login-demo.ts`).
3. **Guardrails** – Policies that limit locator scopes, redact secrets, cap retries.
4. **Observer hooks** – Streaming logs/screenshots piped into MCP clients for review.

## Prerequisites

**Important:** Playwright Agents require VS Code Insiders (v1.105+) or Claude Desktop/OpenCode.

**Setup:**
1. Ensure VS Code Insiders is installed (v1.105+)
2. Install "Playwright Test for VSCode" extension
3. Verify agent definitions exist: run `npx playwright init-agents --loop=vscode` if needed
4. Open repository in VS Code Insiders
5. Verify `.github/chatmodes/` directory exists with agent definitions

## Live chat workflow

1. Open VS Code Insiders with this repo; ensure `.github/chatmodes` and `.vscode/mcp.json` are present.
2. Open Playwright Agents panel (Playwright icon in sidebar → Agents tab, or Command Palette: "Playwright: Open Agents").
3. In the Playwright Agents panel/chat:
   - **Planner** prompt: "Plan a test for performance_glitch_user focusing on slow inventory loads."
   - **Generator** prompt: "Implement the plan with resilient locators and include cart assertions."
   - **Healer** prompt: "Repair the failing step in login.spec.ts when the button locator changes."
4. Review outputs, highlight reasoning traces, and decide what to merge.

## Demo script

- Start with planner; inspect the Markdown plan (save under `/spec` if useful).
- Run generator; open the resulting spec, run it locally, collect artifacts (similar to MCP artifacts from Day 1).
- Break a test (change a locator), then run healer to propose a patch. Show how to diff/approve manually.

## Implementation pointers

- Review agent-generated specs in `tests/examples/day2/` and validate them (see `tests/examples/day2/prompts-enhancing.md` for criteria).
- Reuse page object models and selectors from handcrafted tests to minimize flakiness.
- When running agents in CI, use read-only credentials and disable destructive tools.
