---
marp: true
theme: default
paginate: true
size: 16:9
class: invert
title: Playwright Agents with Claude
auto-scaling: true
footer: Playwright Agents – Martin Krištof
style: |
  section {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-top: 60px;
  }
  pre {
    font-size: 1.1rem;
    width: 100%;
  }
---
<!-- _paginate: skip -->
<style scoped>
section {
    justify-content: center;
    align-items: center;
}
</style>

# Playwright Agents
with Claude & MCP

**Martin Krištof**

---

## About the Trainer

![bg right:35% width:380px](https://www.kristofmartin.eu/_next/image?url=%2Fme.jpg&w=3840&q=75)

- React, QA
- Senior Engineer II at Console Team
- Conference speaker, trainer [kristofmartin.eu web](https://www.kristofmartin.eu)

---

## Agenda

| # | Topic | Time |
|---|-------|------|
| 1 | MCP + Playwright MCP | ~25 min |
| 2 | Live demo: Planner → Generator → Healer | ~30 min |
| 3 | Hands-on | ~25 min |
| 4 | Q&A | ~10 min |

---

## Prerequisites

```bash
node -v   # >= 20
npm -v
```

```bash
git clone https://github.com/apify-projects/ai-driven-testing.git
cd ai-driven-testing
npm install
npm run playwright:install
cp .env.example .env   # fill in credentials
```

---

## What is MCP?

**Model Context Protocol** – open standard that lets AI call external tools.

- AI sends a **tool call** → MCP server executes it → result flows back
- No copy-pasting – AI interacts with the real environment
- Works in Claude Code, VS Code, Cursor, Claude Desktop…

---

## Playwright MCP

**`@playwright/mcp`** – official MCP server from Microsoft.

Exposes browser automation as tools the AI can call:

| Tool | What it does |
|------|-------------|
| `browser_navigate` | Open a URL |
| `browser_snapshot` | Read the DOM / ARIA tree |
| `browser_click` / `browser_type` | Interact with elements |
| `browser_verify_text_visible` | Assert text on page |
| `test_run` / `test_debug` | Run & debug Playwright tests |

---

## How it fits together

```
You (natural language)
    │
    ▼
Claude Code (LLM)
    │  tool calls
    ▼
Playwright MCP Server
    │  Playwright API
    ▼
Real browser (Chromium / Firefox / WebKit)
```

Real Playwright under the hood – same as writing tests by hand.

---

## Bonus

> `scripts/mcp-login-demo.ts` – shows how MCP tool calls map directly to Playwright APIs (navigate → fill → click → assert → trace). Run with `npm run mcp:demo`.

---

## Setup

**`.mcp.json`** in project root:
```json
{
  "mcpServers": {
    "playwright-test": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--config", "playwright.config.ts"]
    }
  }
}
```

**`.claude/settings.json`** – skip permission prompts:
```json
{
  "allowedTools": ["mcp__playwright-test__*", "Read", "Write", "Edit", "Bash"],
  "enabledMcpjsonServers": ["playwright-test"]
}
```

---

## Playwright Agents

Three specialized AI agents defined in **`.claude/agents/`**:

| Agent | Role |
|-------|------|
| 🟢 **Planner** | Explores the app, writes a structured test plan |
| 🔵 **Generator** | Executes the plan, writes `.spec.ts` files |
| 🔴 **Healer** | Debugs and fixes failing tests |

Each agent has focused tool access and a tailored system prompt.

---

## Workflow

```
"explore the app and create a test plan"
        │
        ▼  spec/plan.md
"generate tests from spec/plan.md"
        │
        ▼  tests/*.spec.ts
npx playwright test
        │
        ▼  failures?
"fix failing tests"
        │
        ▼  patched tests, all green ✅
```

---

## Planner

- Navigates the app, reads DOM snapshots
- Maps all user flows and edge cases
- Outputs a markdown plan: sections → scenarios → steps → expected results

```
create a test plan for standard_user, save to spec/plan.md
```

> No need to specify URL – `baseURL` is set in `playwright.config.ts`

---

## Generator

- Reads the plan
- Executes each step **live** in real browser
- Reads generator log → writes spec with best-practice locators
- One `test()` per scenario, grouped in `test.describe()`

```
generate tests from spec/plan.md
```

---

## Healer

1. Runs all tests (`test_run`)
2. For each failure: `test_debug` → snapshot → root cause
3. Edits the test (locators, assertions, timing)
4. Reruns until green or marks `test.fixme()` with explanation

```
fix the failing tests
```

---

## 📝 Live Demo – SauceDemo

User: `standard_user` · baseURL configured in `playwright.config.ts`

**Step 1 – Planner**
```
using playwright-test-planner - create a test plan for standard_user,
save to spec/plan.md
```

**Step 2 – Generator**
```
using playwright-test-generator - generate tests from spec/plan.md to tests/examples/ for section 1.1
```

---

## 📝 Live Demo – SauceDemo

**Step 3 – Run**

```bash
npm test
```

**Step 4 – Heal if needed**

```
using playwright-test-healer - fix failing tests
```

---

## 🧑‍💻 Hands-on Exercises (~25 min)

**Exercise 1** – Pick a user (`problem_user`, `performance_glitch_user`, `visual_user`) and run full pipeline:
1. `playwright-test-planner` → plan
2. `playwright-test-generator` → tests in `tests/exercises/`
3. `npm test -- --project=exercises`
4. `playwright-test-healer` → fix failures

---

## 🧑‍💻 Hands-on Exercises (~25 min)

**Exercise 2** – standard_user + seed + POM:
1. `test-planner-seed` → `spec/plan-pom.md`
2. `test-generator-pom` → section 3.1 in `tests/exercises/`
3. `npm test -- --project=exercises`

See `tests/exercises/exercises.md` for full instructions.

---
<!-- Scoped style -->
<style scoped>
section {
    justify-content: center;
    align-items: center;
}
</style>

# Thank you!

**Martin Krištof** · [kristofmartin.eu](https://www.kristofmartin.eu/)

[github.com/apify-projects/ai-driven-testing](https://github.com/apify-projects/ai-driven-testing)
