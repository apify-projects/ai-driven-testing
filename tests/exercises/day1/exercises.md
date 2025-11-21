# Exercises – Day 1

1. **Prompt tune-up**  
   Iterate on the baseline prompt so the AI returns `getByRole` selectors only. Document the final prompt and the improvement you observed.

2. **Negative-path hardening**  
   Extend `tests/examples/day1/login.spec.ts` with an additional negative case (e.g. wrong password). Keep it under 10 lines.

3. **Transcript mapping**  
   Run `npm run mcp:demo`, open `artifacts/mcp-transcript.json`, and match every entry to a Playwright API call. Add comments to the JSON if it helps you remember the mapping.

4. **Observation logging**  
   Modify `scripts/mcp-login-demo.ts` to append the browser console logs to the transcript. Compare the diff with a teammate.

5. **Page Object Model practice**  
   Refactor one of the login tests to use the Page Object Model pattern. Use the existing page objects from `tests/pages/` or create new ones if needed. Compare the readability and maintainability with the original test.

