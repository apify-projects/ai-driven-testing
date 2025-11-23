import { test, expect } from '@playwright/test';
import { LoginPage, InventoryPage, CartPage } from '../../pages';

/**
 * Exercise: Remove from cart using Page Object Model
 *
 * This test demonstrates removing a product from the cart using the POM pattern.
 * It serves as a reference solution for Day 1 Exercise 3.
 */
test.describe('Remove from Cart', () => {
  test('should remove a product from the cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // 1. Navigate to login page and log in as standard_user
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // 2. Verify inventory page loaded
    await inventoryPage.expectPageLoaded();

    // 3. Add first product to cart
    await inventoryPage.addProductToCart(0);
    await inventoryPage.expectCartBadgeCount(1);

    // 4. Navigate to cart page
    await inventoryPage.clickShoppingCart();
    await page.waitForURL('**/cart.html');

    // 5. Verify product is in cart
    await cartPage.expectItemCount(1);

    // 6. Remove the product from cart
    await cartPage.removeItem(0);

    // 7. Verify cart is empty (no items)
    await cartPage.expectItemCount(0);

    // 8. Verify cart badge is no longer visible on inventory page
    await cartPage.clickContinueShopping();
    await page.waitForURL('**/inventory.html');
    await expect(inventoryPage.shoppingCartBadge).not.toBeVisible();
  });
});

