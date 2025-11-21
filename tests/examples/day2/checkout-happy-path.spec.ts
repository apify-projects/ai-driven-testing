// spec: spec/basic-operations-test-plan.md

import { test, expect } from '@playwright/test';

test.describe('Checkout — Happy Path', () => {
  test('Checkout — Happy Path', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com and log in as `standard_user` with the demo password.
    await page.goto('https://www.saucedemo.com/');
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL(/.*\/inventory.html/);
    await expect(page.locator('.title')).toHaveText('Products');

    // 2. On the products page, add one product to the cart (e.g., "Sauce Labs Backpack").
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

    // 3. Click the cart icon and click `Checkout`.
    // Direct navigation to cart (reliable) then start checkout
    await page.goto('https://www.saucedemo.com/cart.html');
    await page.getByTestId('checkout').click();

    // 4. Fill in checkout information (First Name: "Test", Last Name: "User", Postal Code: "12345").
    await page.getByTestId('firstName').fill('Test');
    await page.getByTestId('lastName').fill('User');
    await page.getByTestId('postalCode').fill('12345');

    // 5. Click `Continue` then `Finish` and verify the order confirmation text appears.
    await page.getByTestId('continue').click();
    await page.getByTestId('finish').click();
    await expect(page.getByText('Thank you for your order!')).toBeVisible();
  });
});

