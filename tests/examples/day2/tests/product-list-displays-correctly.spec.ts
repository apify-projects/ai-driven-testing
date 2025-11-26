// spec: specs/my-plan.md
// section: 2. Product Inventory and Display

import { expect } from '@playwright/test';
import { test as generaliTest } from '../fixture';

generaliTest.describe('Product Inventory and Display', () => {
  generaliTest('Product List Displays Correctly', async ({ page }) => {
    const inventoryItems = page.locator('[data-test="inventory-item"]');
    await expect(inventoryItems).toHaveCount(6);

    // 4. Verify each product displays required elements: image, name, description, price, and action button
    const expectedProducts = [
      {
        name: 'Sauce Labs Backpack',
        price: '$29.99',
        description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.'
      },
      {
        name: 'Sauce Labs Bike Light',
        price: '$9.99',
        description: 'A red light isn\'t the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.'
      },
      {
        name: 'Sauce Labs Bolt T-Shirt',
        price: '$15.99',
        description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.'
      },
      {
        name: 'Sauce Labs Fleece Jacket',
        price: '$49.99',
        description: 'It\'s not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.'
      },
      {
        name: 'Sauce Labs Onesie',
        price: '$7.99',
        description: 'Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won\'t unravel.'
      },
      {
        name: 'Test.allTheThings() T-Shirt (Red)',
        price: '$15.99',
        description: 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.'
      }
    ];

    for (let i = 0; i < expectedProducts.length; i++) {
      const item = inventoryItems.nth(i);

      // Verify product image exists
      await expect(item.locator('img')).toBeVisible();

      // Verify product name
      const productName = item.locator('[data-test="inventory-item-name"]');
      await expect(productName).toContainText(expectedProducts[i].name);

      // Verify product description
      const productDesc = item.locator('[data-test="inventory-item-desc"]');
      await expect(productDesc).toContainText(expectedProducts[i].description);

      // Verify product price in USD format
      const productPrice = item.locator('[data-test="inventory-item-price"]');
      await expect(productPrice).toContainText(expectedProducts[i].price);

      // Verify "Add to cart" button is visible
      const addButton = item.locator('button');
      await expect(addButton).toBeVisible();
      await expect(addButton).toContainText('Add to cart');
    }
  });
});
