import { test } from '@playwright/test';
import { LoginPage, InventoryPage, CartPage } from '../../pages';

/**
 * Example test: Login and add product to cart (using Page Object Model)
 *
 * This test demonstrates the same flow as login-add-to-cart.spec.ts but using
 * the Page Object Model pattern for better maintainability and readability.
 *
 * Compare this with login-add-to-cart.spec.ts to see the benefits of POM.
 */
test.describe('Login and Add to Cart (POM)', () => {
  test('should log in and add first product to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // 1. Navigate and log in
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // 2. Verify inventory page loaded
    await inventoryPage.expectPageLoaded();

    // 3. Add first product to cart
    await inventoryPage.addProductToCart(0);

    // 4. Verify cart badge shows 1 item
    await inventoryPage.expectCartBadgeCount(1);

    // 5. Navigate to cart
    await cartPage.goto();

    // 6. Verify cart contains one item
    await cartPage.expectItemCount(1);
  });
});

