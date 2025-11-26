// spec: specs/my-plan.md
// section: 2. Product Inventory and Display

import { expect } from '@playwright/test';
import { test as generaliTest } from '../fixture';

generaliTest.describe('Product Inventory and Display', () => {
  generaliTest('Product Sorting by Name (Z to A)', async ({ page }) => {
    // 4. Click on the sort dropdown
    await page.getByTestId('product-sort-container').click();

    // 5. Select "Name (Z to A)"
    await page.getByTestId('product-sort-container').selectOption(['za']);

    // 6. Verify sort dropdown changed to "Name (Z to A)"
    const sortDropdown = page.getByTestId('product-sort-container');
    await expect(sortDropdown).toHaveValue('za');

    // 7. Verify products are sorted in reverse alphabetical order
    const productNames = page.locator('[data-test="inventory-item-name"]');
    const expectedOrder = [
      'Test.allTheThings() T-Shirt (Red)',
      'Sauce Labs Onesie',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Bike Light',
      'Sauce Labs Backpack'
    ];

    // Verify first product is "Test.allTheThings() T-Shirt (Red)"
    await expect(productNames.first()).toContainText(expectedOrder[0]);

    // Verify last product is "Sauce Labs Backpack"
    await expect(productNames.last()).toContainText(expectedOrder[expectedOrder.length - 1]);

    // Verify all products are in the correct order
    for (let i = 0; i < expectedOrder.length; i++) {
      await expect(productNames.nth(i)).toContainText(expectedOrder[i]);
    }
  });
});
