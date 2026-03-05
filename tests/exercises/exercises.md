# Hands-on Exercise – Playwright Agents (~25 min)

Choose a SauceDemo user and run the full Planner → Generator → Healer pipeline.

## Steps

### 1. Planner – create a test plan

Pick a user:
- `problem_user` – broken UI (images, dropdowns)
- `performance_glitch_user` – slow page loads
- `visual_user` – visual regressions

```
using playwright planner - create a test plan for <chosen_user>,
save to spec/<chosen_user>-plan.md
```

### 2. Generator – generate tests

```
using playwright generator - generate tests from spec/<chosen_user>-plan.md
```

Tests will be written to `tests/exercises/agents/`.

### 3. Run the tests

```bash
npm test
```

See what passes and what fails.

### 4. Healer – fix failing tests

```
using playwright healer - fix failing tests
```

## Bonus

**Break a working test** – change a locator or assertion to something wrong, run tests, then:

```
using playwright healer - fix failing tests
```

Watch the Healer inspect the DOM and patch the test back to green.

## Reference

- Example agent-generated tests: `tests/exercises/agents/`
- SauceDemo accounts: `standard_user`, `locked_out_user`, `problem_user`, `performance_glitch_user`, `visual_user` (password: `secret_sauce`)
