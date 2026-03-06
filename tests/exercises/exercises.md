# Hands-on Exercises – Playwright Agents (~25 min)

---

## Exercise 1 – Full pipeline for a different user

Choose a user and run the full Planner → Generator → Healer pipeline.
The generated tests include their own login step (no seed needed).

| User | Behavior |
|------|----------|
| `problem_user` | Broken UI – images, dropdowns, sorting |
| `performance_glitch_user` | Slow page loads |
| `visual_user` | Visual regressions |

### Step 1 – Planner

```
using playwright-test-planner - create a test plan for <chosen_user>,
save to spec/<chosen_user>-plan.md
```

### Step 2 – Generator

```
using playwright-test-generator - generate tests from spec/<chosen_user>-plan.md,
save to tests/exercises/
```

### Step 3 – Run

```bash
npm test -- --project=exercises
```

### Step 4 – Healer

```
using playwright-test-healer - fix failing tests
```

---

## Exercise 2 – Seed authentication + POM

Use the enhanced agents (`test-planner-seed` + `test-generator-pom`) to generate a test for `standard_user`.

`standard_user` is pre-authenticated via `tests/seed.spec.ts` – the test starts directly on the inventory page, no login step needed. The generator will use existing POM classes from `tests/pages/`.

### Step 1 – Planner (seed-aware)

```text
using test-planner-seed - create a test plan for standard_user,
save to spec/plan-pom.md
```

### Step 2 – Generator (POM)

```text
using test-generator-pom - generate a test from spec/plan-pom.md
for section 3.1 only, save to tests/exercises/
```

### Step 3 – Run

```bash
npm test -- --project=exercises
```

---

## Bonus

**Break a working test** – change a locator or assertion, run tests, then:

```text
using playwright-test-healer - fix failing tests
```

Watch the Healer inspect the DOM and patch the test back to green.

---

## Reference

- Example agent-generated tests: `tests/exercises/agents/`
- Test plan: `spec/plan.md`
- SauceDemo accounts (password: `secret_sauce`): `standard_user`, `problem_user`, `performance_glitch_user`, `visual_user`
