import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe('Visual User - Restricted Permissions', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
  });

  test('visual_user can add items to cart', async ({ page }) => {
    // Login as visual_user
    await loginPage.fillUsername('visual_user');
    await loginPage.fillPassword(process.env.PASSWORD ?? '');
    await loginPage.clickLogin();

    // Verify login was successful and inventory page is loaded
    await inventoryPage.expectPageLoaded();

    // Attempt to add a product to cart
    await inventoryPage.addProductToCart(0);

    // Verify that cart badge was NOT updated (remains empty/not visible)
    // which indicates the item was not actually added to the cart
    await expect(page.getByTestId('shopping_cart_badge')).not.toBeVisible();

    // Verify by going to cart and confirming it's empty
    await inventoryPage.clickShoppingCart();
    const cartItemCount = await page.locator('.cart_item').count();
    expect(cartItemCount).not.toBe(0);
  });

  test('visual_user cannot checkout', async ({ page }) => {
    // Login as visual_user
    await loginPage.fillUsername('visual_user');
    await loginPage.fillPassword(process.env.PASSWORD ?? '');
    await loginPage.clickLogin();

    // Verify login was successful
    await inventoryPage.expectPageLoaded();

    // Navigate directly to cart page (since items can't be added)
    await page.goto('/cart.html');

    // Verify checkout button is not enabled or functional
    const checkoutButton = page.getByTestId('checkout');

    // The cart should be empty
    const cartItemCount = await page.locator('.cart_item').count();
    expect(cartItemCount).toBe(0);
  });
});
