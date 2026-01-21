// spec: spec/PLAN.md
// scenario: 2. Product Detail Page Navigation with Slow Loading

import { expect } from '@playwright/test';
import { test } from '../fixture';

test.describe('Product Detail Page Navigation with Slow Loading', () => {
  test('Navigate to product detail page and return to inventory', async ({ page }) => {
    // 2. Click on "Sauce Labs Backpack" product image/link
    await page.getByTestId('item-4-img-link').click();

    // 4. Verify page URL changes to inventory-item.html?id=4
    await expect(page).toHaveURL(/inventory-item\.html\?id=4/);

    // 5. Verify product image is displayed
    await expect(page.locator('img[alt="Sauce Labs Backpack"]')).toBeVisible();

    // 6. Verify product name "Sauce Labs Backpack" appears
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    // 7. Verify product description is visible
    await expect(page.getByText('carry.allTheThings() with the sleek, streamlined Sly Pack')).toBeVisible();

    // 8. Verify product price "$29.99" is displayed
    await expect(page.getByText('$29.99')).toBeVisible();

    // 9. Verify "Add to cart" button is present
    await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible();

    // 10. Verify "Back to products" button is present and clickable
    await expect(page.getByRole('button', { name: 'Go back Back to products' })).toBeVisible();

    // 11. Click "Back to products" button
    await page.getByTestId('back-to-products').click();

    // 13. Verify user is back on inventory page with all products visible
    await expect(page).toHaveURL(/inventory\.html$/);
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.getByTestId('item-0-title-link')).toBeVisible();
    await expect(page.getByTestId('item-1-title-link')).toBeVisible();
    await expect(page.getByTestId('item-2-title-link')).toBeVisible();
    await expect(page.getByTestId('item-3-title-link')).toBeVisible();
    await expect(page.getByTestId('item-4-title-link')).toBeVisible();
    await expect(page.getByTestId('item-5-title-link')).toBeVisible();
  });
});
