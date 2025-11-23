import { test, expect } from '@playwright/test';

/**
 * Example test: Login and add product to cart
 *
 * This test demonstrates a complete flow from login to adding a product to the cart.
 * It can be used as a reference when generating similar tests with AI assistance.
 *
 * See prompts.md section 7 for the prompt that can generate this test.
 */
test.describe('Login and Add to Cart', () => {
  test('should log in and add first product to cart', async ({ page }) => {
    // 1. Navigate to login page
    await page.goto('/');

    // 2. Log in as standard_user
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // 3. Wait for inventory page to load and verify
    await page.waitForURL('**/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');

    // 4. Click on the first product in the inventory list
    const firstProduct = page.locator('.inventory_item').first();
    await firstProduct.locator('.inventory_item_name').click();

    // 5. Verify the product detail page loads (optional - depends on app behavior)
    // Note: Sauce Demo may or may not have a detail page, adjust based on actual behavior

    // 6. Add product to cart (if on detail page) or add from inventory list
    // Since we clicked the product, we might be on detail page or back on inventory
    // This approach adds from inventory list directly
    await page.goto('/inventory.html');
    const firstProductAddButton = page.locator('.inventory_item').first().getByRole('button', { name: /Add to cart/i });
    await firstProductAddButton.click();

    // 7. Verify the cart badge shows "1" item
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // 8. Click the cart icon to navigate to the cart page
    await page.locator('.shopping_cart_link').click();

    // 9. Verify the cart page displays the added product
    await page.waitForURL('**/cart.html');
    await expect(page.locator('.cart_item')).toHaveCount(1);
    await expect(page.locator('.inventory_item_name')).toBeVisible();
  });
});

