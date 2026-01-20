import { expect, test } from "@playwright/test";

test('test example 1', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Swag Labs');
});