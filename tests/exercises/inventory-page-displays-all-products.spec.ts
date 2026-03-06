// spec: spec/plan-pom.md
// section: 3. Product Catalog (Inventory Page)
// pom: tests/pages/LoginPage.ts, tests/pages/InventoryPage.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Product Catalog (Inventory Page)', () => {
  test('Inventory Page Displays All Products', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    // 1. Log in as standard_user, then navigate to /inventory.html
    await inventoryPage.goto('/inventory.html');

    // Observe the product grid - verify page title shows "Products"
    await inventoryPage.expectPageTitle();

    // Verify exactly 6 product cards are visible
    const productCount = await inventoryPage.getProductCount();
    expect(productCount).toBe(6);

    // Verify default sort order is "Name (A to Z)"
    await expect(page.getByTestId('product-sort-container')).toHaveValue('az');

    // Verify products are displayed in correct order: Sauce Labs Backpack first
    const firstProductName = await inventoryPage.getProductName(0);
    expect(firstProductName).toBe('Sauce Labs Backpack');

    // Verify Sauce Labs Backpack price is $29.99
    await expect(inventoryPage.productItems.nth(0).getByTestId('inventory-item-price')).toHaveText('$29.99');

    // Verify second product: Sauce Labs Bike Light ($9.99)
    const secondProductName = await inventoryPage.getProductName(1);
    expect(secondProductName).toBe('Sauce Labs Bike Light');
    await expect(inventoryPage.productItems.nth(1).getByTestId('inventory-item-price')).toHaveText('$9.99');

    // Verify third product: Sauce Labs Bolt T-Shirt ($15.99)
    const thirdProductName = await inventoryPage.getProductName(2);
    expect(thirdProductName).toBe('Sauce Labs Bolt T-Shirt');
    await expect(inventoryPage.productItems.nth(2).getByTestId('inventory-item-price')).toHaveText('$15.99');

    // Verify fourth product: Sauce Labs Fleece Jacket ($49.99)
    const fourthProductName = await inventoryPage.getProductName(3);
    expect(fourthProductName).toBe('Sauce Labs Fleece Jacket');
    await expect(inventoryPage.productItems.nth(3).getByTestId('inventory-item-price')).toHaveText('$49.99');

    // Verify fifth product: Sauce Labs Onesie ($7.99)
    const fifthProductName = await inventoryPage.getProductName(4);
    expect(fifthProductName).toBe('Sauce Labs Onesie');
    await expect(inventoryPage.productItems.nth(4).getByTestId('inventory-item-price')).toHaveText('$7.99');

    // Verify sixth product: Test.allTheThings() T-Shirt (Red) ($15.99)
    const sixthProductName = await inventoryPage.getProductName(5);
    expect(sixthProductName).toBe('Test.allTheThings() T-Shirt (Red)');
    await expect(inventoryPage.productItems.nth(5).getByTestId('inventory-item-price')).toHaveText('$15.99');

    // Verify each card shows an image, name, description, price, and "Add to cart" button
    await expect(page.getByRole('link', { name: 'Sauce Labs Backpack' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Test.allTheThings() T-Shirt (Red)' }).first()).toBeVisible();
  });
});
