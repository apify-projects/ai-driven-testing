# AI-Powered Edge Cases – Facilitator Notes

Use this guide for **Part 1 (AI-powered edge cases)** on Day 2.

## Objectives

1. Review AI-generated specs (`tests/examples/day1/login-edge-cases.spec.ts`) and harden them before promotion.
2. Define guardrails so attendees know when edge cases are “good enough”.
3. Cross-check MCP transcripts/traces (created in Day 1) with the generated code to keep everything auditable.

## Suggested flow

1. **Baseline recap (5 min)** – remind attendees of `tests/examples/day1/login.spec.ts`.
2. **Edge-case tour (10 min)** – open `tests/examples/day1/login-edge-cases.spec.ts`, highlight risky flows (locked user, performance glitch user, fake credentials).
3. **Hardening workshop (15 min)** – in small groups:
   - Improve selectors (`getByRole`, `getByTestId`).
   - Add assertions around cart counts, inventory cards, layout glitches.
   - Document missing coverage directly in PR comments/issues.
4. **Promotion criteria (10 min)** – co-create/adjust a promotion checklist (e.g., assertions verified, selectors resilient, transcript reviewed).
5. **Transcript + trace audit (5 min)** – map steps in `artifacts/mcp-transcript.json` (created during Day 1 MCP demo) to the spec lines and show the trace in Playwright UI.

## Tips

- Review AI-generated specs in `tests/examples/day1/` and ensure they pass the promotion checklist before using them as reference.
- Encourage participants to capture diffs when they tweak AI output (so healer/agents can learn from them later).
- Reuse this file as your speaking outline; pair it with `tests/examples/day2/agents.md` when you transition to Part 2.
