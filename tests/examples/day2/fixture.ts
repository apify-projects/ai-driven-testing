import { test as baseTest } from '@playwright/test';

export const test = baseTest.extend<{ forEachTest: void }>({
  forEachTest: [async ({ page }, use) => {
    // This code runs before every test.
    await page.goto('/inventory.html');
    await use();
    // This code runs after every test.
    console.log('Last URL:', page.url());
  }, { auto: true }],  // automatically starts for every test.
});

// Export setup from base test for seed.spec.ts
export const setup = baseTest.extend<{ forEachTest: void }>({
  forEachTest: [async ({ page }, use) => {
    // For setup, skip the auto-navigation
    await use();
  }, { auto: false }],  // Don't auto-run for setup
});