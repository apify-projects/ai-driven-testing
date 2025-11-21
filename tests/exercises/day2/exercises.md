# Exercises – Day 2

## Part 1 – AI-powered edge cases
1. **Edge-case audit**  
   Inspect `tests/examples/day1/login-edge-cases.spec.ts`. Identify at least two missing assertions and propose fixes in PR comments.

2. **Promotion checklist**  
   Create a promotion checklist document with concrete criteria for validating AI-generated tests (≤6 bullet points).

3. **Transcript cross-check**  
   Take the latest `artifacts/mcp-transcript.json`, annotate three steps with links to the corresponding lines in `tests/examples/day1/login-edge-cases.spec.ts`.

## Part 2 – Playwright agents (chat)
4. **Agent guardrails**  
   In `tests/examples/day2/agents.md`, add a subsection about limiting destructive actions when chatting with agents (max 5 sentences).

5. **Planner run log**  
   Run the planner agent via VS Code Insiders (or Claude/OpenCode) and save the Markdown output under `artifacts/plans/<your-name>-plan.md`.

6. **Healer experiment**  
   Break `tests/examples/day1/login.spec.ts`, let the healer agent suggest a fix, and summarize the diff in `tests/examples/day2/README.md`.

## Part 3 – CI/CD
7. **CI artifact spelunking**  
   Run the GitHub Actions workflow locally via `act` or a dry run. Confirm that screenshots, traces, and the MCP transcript are uploaded, and document the artifact names in `tests/exercises/checklist.md`.

8. **Job summary upgrade**  
   Extend the workflow to include the number of passing/failing tests in the GitHub Job Summary. Hint: parse `test-results/results.json` or a custom reporter.

