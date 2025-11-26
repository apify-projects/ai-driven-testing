// spec: spec/my-plan.md
// section: 5. Shopping Cart Page
// pom: tests/pages/InventoryPage.ts, tests/pages/CartPage.ts

import { expect } from '@playwright/test';
import { test as generaliTest } from '../fixture';
import { InventoryPage } from '../../../pages/InventoryPage';

generaliTest.describe('Shopping Cart Page', () => {
  generaliTest('View Cart with Items', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    // 1. Add "Sauce Labs Backpack" to cart (page is already on /inventory.html from fixture)
    await inventoryPage.addProductToCart(0);

    // 2. Verify cart badge shows "1"
    await expect(page.locator('.shopping_cart_badge')).toContainText('1');

    // 3. Click on the cart icon/counter to navigate to cart page
    await inventoryPage.clickShoppingCart();

    // 4. Verify page navigates to cart page
    await expect(page).toHaveURL(/.*cart.html/);

    // 5. Verify page title shows "Your Cart"
    const cartTitle = page.locator('.title');
    await expect(cartTitle).toContainText('Your Cart');

    // 6. Verify cart displays the added item with all required elements
    const cartItem = page.locator('.cart_item');
    await expect(cartItem).toBeVisible();

    // Verify Quantity (QTY) column
    const qtyColumn = page.locator('.cart_quantity');
    await expect(qtyColumn).toContainText('1');

    // Verify Product name
    const productName = page.locator('.inventory_item_name');
    await expect(productName).toContainText('Sauce Labs Backpack');

    // Verify Product description
    const productDesc = page.locator('.inventory_item_desc');
    await expect(productDesc).toContainText('carry.allTheThings()');

    // Verify Product price
    const productPrice = page.locator('.inventory_item_price');
    await expect(productPrice).toContainText('$29.99');

    // Verify Remove button
    const removeButton = page.locator('button:has-text("Remove")');
    await expect(removeButton).toBeVisible();

    // 7. Verify "Continue Shopping" button is visible
    const continueShoppingButton = page.locator('button:has-text("Continue Shopping")');
    await expect(continueShoppingButton).toBeVisible();

    // 8. Verify "Checkout" button is visible
    const checkoutButton = page.locator('button:has-text("Checkout")');
    await expect(checkoutButton).toBeVisible();
  });
});
