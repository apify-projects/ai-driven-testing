import { test, expect } from '@playwright/test';
import { LoginPage, InventoryPage, CartPage } from '../../pages';

test.describe('Login and Add to Cart - POM', () => {
  test('should login and add the first product to cart', async ({ page }) => {
    // Initialize page objects
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // Step 1: Navigate to https://www.saucedemo.com/
    await loginPage.goto();

    // Step 2: Log in as standard_user with password secret_sauce
    await loginPage.login('standard_user', 'secret_sauce');

    // Step 3: Wait for the inventory page to load (verify "Products" heading is visible)
    await inventoryPage.expectPageLoaded();

    // Step 4: Get the first product's name from inventory page
    const firstProductName = await inventoryPage.getProductName(0);
    expect(firstProductName).toBeTruthy();

    // Step 5: Click the "Add to cart" button for the first product
    await inventoryPage.addProductToCart(0);

    // Step 6: Verify the cart badge shows "1" item
    await inventoryPage.expectCartBadgeCount(1);

    // Step 7: Click the cart icon to navigate to the cart page
    await inventoryPage.clickShoppingCart();

    // Step 8: Verify the cart page displays the added product
    await cartPage.expectItemCount(1);
    await cartPage.expectItemInCart(firstProductName);

    // Step 9: Log success
  });
});
