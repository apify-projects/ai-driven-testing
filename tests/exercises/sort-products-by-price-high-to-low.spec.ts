// spec: spec/error-user-plan.md

import { test, expect } from '@playwright/test';

test.describe('Product Catalog (Inventory Page)', () => {
  test('Sort Products by Price (High to Low)', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com/ and log in as error_user with password secret_sauce
    await page.goto('https://www.saucedemo.com/');
    await page.getByTestId('username').fill('error_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL(/\/inventory\.html/);

    // 2. Select "Price (high to low)" from the sort dropdown
    await page.getByTestId('product_sort_container').selectOption('hilo');

    // Expected Results: Sauce Labs Fleece Jacket ($49.99) appears first
    const firstProduct = page.getByTestId('inventory-item').first();
    await expect(firstProduct.getByTestId('inventory_item_name')).toHaveText('Sauce Labs Fleece Jacket');
    await expect(firstProduct.getByTestId('inventory_item_price')).toHaveText('$49.99');

    // Expected Results: Sauce Labs Onesie ($7.99) appears last
    const lastProduct = page.getByTestId('inventory-item').last();
    await expect(lastProduct.getByTestId('inventory_item_name')).toHaveText('Sauce Labs Onesie');
    await expect(lastProduct.getByTestId('inventory_item_price')).toHaveText('$7.99');

    // Expected Results: All 6 products are visible in descending price order
    await expect(page.getByTestId('inventory-item')).toHaveCount(6);
  });
});
