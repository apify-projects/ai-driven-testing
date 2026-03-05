# Playwright Agents Mini Training

A ~1.5h hands-on session focused on AI-driven browser testing using Playwright Agents with Claude Code.

## What you'll learn

- What MCP (Model Context Protocol) is and how Playwright MCP works
- How to use three specialized agents: **Planner**, **Generator**, **Healer**
- Full pipeline: explore app → generate test plan → write tests → fix failures

## Repository layout

```
tests/
  seed.spec.ts       # Auth setup (logs in as standard_user, saves storage state)
  pages/             # Page Object Model classes (seed for agents)
  exercises/
    agents/          # Example agent-generated tests
    exercises.md     # Hands-on instructions
tests/examples/
  demo.md            # Live demo script for the trainer
spec/                # Generated test plans (created during session)
slides/
  playwright-agents.md   # Marp slide deck source
  dist/                  # Compiled slides
.claude/
  agents/            # Agent definitions (planner, generator, healer)
  settings.json      # Allowed tools + MCP server config
.mcp.json            # Playwright MCP server configuration
```

## Prerequisites

| Tool | Install |
| --- | --- |
| Node.js 20+ | `nvm install 20 && nvm use 20` |
| Playwright browsers | `npm run playwright:install` |
| Claude Code | [claude.ai/code](https://claude.ai/code) |

## Getting started

```bash
git clone git@github.com:apify-projects/ai-driven-testing.git
cd ai-driven-testing
npm install
npm run playwright:install
cp .env.example .env   # or create .env with USER_NAME and PASSWORD
npm test               # verify seed + auth setup works
```

## NPM scripts

| Command | Description |
| --- | --- |
| `npm test` | Run all Playwright tests |
| `npm run test:headed` | Run with visible browser |
| `npm run test:ui` | Open Playwright UI mode |
| `npm run test:report` | Open last HTML report |
| `npm run slides:dev` | Preview slides with live reload |
| `npm run slides:build` | Export slides to `slides/dist/` |

## Session structure

| Block | Time |
| --- | --- |
| Theory – MCP + Playwright Agents | ~25 min |
| Live demo: Planner → Generator → Healer | ~30 min |
| Hands-on exercise | ~25 min |
| Q&A | ~10 min |

See `FACILITATOR_CHECKLIST.md` for the full runbook.

## Test accounts (SauceDemo)

All accounts use password `secret_sauce`.

| User | Behavior |
| --- | --- |
| `standard_user` | Happy path (used in live demo) |
| `problem_user` | Broken UI – images, dropdowns, sorting |
| `performance_glitch_user` | Slow page loads |
| `visual_user` | Visual regressions |

## Playwright Agents

Agents are defined in `.claude/agents/` and invoked via Claude Code chat:

```
using playwright planner  - create a test plan for standard_user, save to spec/plan.md
using playwright generator - generate tests from spec/plan.md
using playwright healer   - fix failing tests
```

No URL needed – `baseURL` is set to `https://www.saucedemo.com/` in `playwright.config.ts`.
