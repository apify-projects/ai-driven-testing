# Facilitator Checklist – Playwright Agents Mini Training (~1.5h)

## Before the session

- [ ] `npm install` + `npm run playwright:install`
- [ ] Create `.env` with `USER_NAME=standard_user` and `PASSWORD=secret_sauce`
- [ ] Run `npm test` – verify seed + at least one spec passes
- [ ] Build slides: `npm run slides:build` → open `slides/dist/playwright-agents.html`
- [ ] Open Claude Code in the project root, verify Playwright MCP is connected
- [ ] Do a dry run of the full Planner → Generator → Healer demo

---

## Session (~1.5h)

### Theory – MCP + Agents (~25 min)

- [ ] Slides: What is MCP, Playwright MCP tools
- [ ] Slides: Setup – `.mcp.json` + `.claude/settings.json`
- [ ] Slides: Three agents (Planner / Generator / Healer) + Workflow diagram

### Live Demo (~30 min)

User: `standard_user` · baseURL pre-configured in `playwright.config.ts`

- [ ] **Planner** – run prompt, walk through generated `spec/plan.md`
  ```
  using playwright planner - create a test plan for standard_user, save to spec/plan.md
  ```
- [ ] **Generator** – show agent navigating browser live, inspect generated `.spec.ts`
  ```
  using playwright generator - generate tests from spec/plan.md
  ```
- [ ] **Run** – `npm test`, show results
- [ ] **Healer** (if any failures, or break a test manually first)
  ```
  using playwright healer - fix failing tests
  ```

### Hands-on (~25 min)

- [ ] Point attendees to `tests/exercises/exercises.md`
- [ ] Each person picks one user: `problem_user`, `performance_glitch_user`, or `visual_user`
- [ ] Circulate, help with MCP connection issues or failing tests
- [ ] Regroup – ask 1-2 people to share what their Healer fixed

### Q&A (~10 min)

- [ ] Wrap up, share repo link

---

## After the session

- [ ] Delete `spec/plan.md` and generated tests if resetting for next run
- [ ] Collect feedback
