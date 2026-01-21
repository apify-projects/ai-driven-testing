// spec: spec/PLAN.md
// scenario: 1. Initial Login and Inventory Page Load

import { expect } from '@playwright/test';
import { test } from '../fixture';

test.describe('Initial Login and Inventory Page Load', () => {
  test('Login with performance_glitch_user and verify inventory loads', async ({ page }) => {
    // 7. Verify the "Products" heading appears on the inventory page
    await expect(page.getByText('Products')).toBeVisible();

    // 8. Verify all 6 products are displayed
    await expect(page.getByTestId('item-0-title-link')).toBeVisible();
    await expect(page.getByTestId('item-1-title-link')).toBeVisible();
    await expect(page.getByTestId('item-2-title-link')).toBeVisible();
    await expect(page.getByTestId('item-3-title-link')).toBeVisible();
    await expect(page.getByTestId('item-4-title-link')).toBeVisible();
    await expect(page.getByTestId('item-5-title-link')).toBeVisible();

    // 9. Verify sort dropdown is visible and functional
    await expect(page.getByTestId('product-sort-container')).toBeVisible();
    await expect(page.getByTestId('active-option')).toBeVisible();

    // 10. Verify shopping cart button is accessible in the header
    // Cart button is in the header - verify it exists by checking for the cart icon
    await expect(page.locator('a.shopping_cart_link')).toBeVisible();
  });
});
