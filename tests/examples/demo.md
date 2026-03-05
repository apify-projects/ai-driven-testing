# Live Demo – Playwright Agents

## What the trainer demonstrates

Target user: `standard_user` / `secret_sauce`

### Step 1 – Planner

```
using playwright planner - create a test plan for standard_user, save to spec/plan.md
```

Agent explores the app and writes a structured test plan to `spec/plan.md`.

> **Tip:** No need to specify the URL – `baseURL` is set to `https://www.saucedemo.com/` in `playwright.config.ts`, so the agent navigates there automatically.

### Step 2 – Generator

```
using playwright generator - generate tests from spec/plan.md
```

Agent executes each step live in the browser and writes tests to `tests/examples/`.
Tests run under the `chromium` project (pre-authenticated as `standard_user`).

### Step 3 – Run

```bash
npm test
```

---

## Hands-on exercise

See `tests/exercises/exercises.md`.

Participants pick one of the remaining users and run the full pipeline themselves:

| User | Behavior |
|------|----------|
| `problem_user` | Broken UI – images, dropdowns, sorting |
| `performance_glitch_user` | Slow page loads |
| `visual_user` | Visual regressions |

Agent generates a **complete test including login** for the chosen user.
Tests run under the `exercises` project (no pre-auth).
