---
marp: true
theme: default
paginate: true
title: AI-driven Testing with Playwright
---

# AI-driven Testing  
with Playwright & MCP

**Martin Kristof**

---

## About the Trainer

- **Martin Kristof**
- React, QA
- Staff Enginner
- Conference speaker, trainer www.kristofmartin.eu

---

# AI-driven Testing  
with Playwright & MCP

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

Deliverables: runnable spec, prompt doc, POM examples, MCP artifacts.

---

## Agenda – Day 2

1. Reviewing AI-generated edge cases
2. Playwright agents & guardrails
3. CI/CD integration (GitHub Actions)
4. Reporting (screenshots, trace, job summary)

Deliverables: generated specs, CI workflow, summary template.

---

## Prompting Principles

- Start with context, constraints, assertions.
- Prefer accessible selectors (`getByRole`, `getByPlaceholder`).
- Ask for diffs instead of whole files when iterating.
- Validate outputs manually before merging.

---

## Baseline Login Test

- Covers happy path, locked user, empty credentials.
- Live-code the spec to show best practices.
- Use it as the "golden" reference for AI outputs.

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

**Example:**
```typescript
const loginPage = new LoginPage(page);
await loginPage.login('user', 'pass');
```

---

## MCP Demo Flow

1. Custom script (`mcp-login-demo.ts`) demonstrates MCP-style tool calls.
2. Tool calls map to Playwright APIs (open → fill → click → assert).
3. Capture transcript, screenshot, trace, video (video only via custom script).
4. Review artifacts with the group.

**Note:** Official MCP server (via config.json) supports traces and screenshots, but not video recording.

---

## Agents Overview

- Orchestrator LLM decides which tool to run.
- Tool adapters wrap Playwright commands.
- Guardrails enforce selector scope + retry limits.
- Telemetry feeds the same artifact pipeline.

---

## CI/CD Highlights

- GitHub Actions job `pw-tests`.
- Upload screenshots, trace, MCP transcript.
- Write a short GitHub Job Summary with links.
- Reuse Dockerfile for reproducible runners.

---

## Exercises

- Prompt tune-up & negative paths.
- Edge-case review & guardrail design.
- Artifact spelunking inside CI.
- Enhance GitHub Job Summary.

---

# Thank you!

Resources:
- Repo README for scripts & setup
- `tests/examples/` for all test specs (manual + AI-generated)
- `tests/pages/` for Page Object Model examples
- `tests/examples/day2/agents.md` for deeper dives

Happy testing! 🎯


