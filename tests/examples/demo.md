# Live Demo – Playwright Agents

## What the trainer demonstrates

Target user: `standard_user` / `secret_sauce`

### Step 1 – Planner

```text
using playwright-test-planner - create a test plan for standard_user, save to spec/plan.md
```

Agent explores the app and writes a structured test plan to `spec/plan.md`.

> **Tip:** No need to specify the URL – `baseURL` is set to `https://www.saucedemo.com/` in `playwright.config.ts`, so the agent navigates there automatically.

### Step 2 – Generator

```text
using playwright-test-generator - generate tests from spec/plan.md to tests/examples/ for section 1.1
```

Agent executes each step live in the browser and writes tests to `tests/examples/`.

### Step 3 – Run

```bash
npm test -- --project=examples
```

---

## Hands-on exercises

See `tests/exercises/exercises.md`.
