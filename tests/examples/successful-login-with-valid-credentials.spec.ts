// spec: spec/plan.md

import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('Successful Login with Valid Credentials', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com/
    await page.goto('https://www.saucedemo.com/');

    // 2. Verify the login page is displayed with a "Username" input, "Password" input, and "Login" button
    await expect(page.getByTestId('username')).toBeVisible();
    await expect(page.getByTestId('password')).toBeVisible();
    await expect(page.getByTestId('login-button')).toBeVisible();

    // 3. Type `standard_user` in the "Username" field
    await page.getByTestId('username').fill('standard_user');

    // 4. Type `secret_sauce` in the "Password" field
    await page.getByTestId('password').fill('secret_sauce');

    // 5. Click the "Login" button
    await page.getByTestId('login-button').click();

    // Expected Results: Browser navigates to /inventory.html
    await expect(page).toHaveURL(/\/inventory\.html/);

    // Expected Results: Page title area shows "Products"
    await expect(page.getByTestId('title')).toHaveText('Products');

    // Expected Results: The hamburger menu button ("Open Menu") is visible in the header
    await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible();

    // Expected Results: The shopping cart icon is visible in the header
    await expect(page.getByTestId('shopping-cart-link')).toBeVisible();

    // Expected Results: Six product items are displayed in the grid
    await expect(page.getByTestId('inventory-item')).toHaveCount(6);
  });
});
