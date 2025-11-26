// spec: spec/my-plan.md
// Plan section: 4. Add to Cart Functionality

import { expect } from '@playwright/test';
import { test as generaliTest } from '../fixture';

generaliTest.describe('Add to Cart Functionality', () => {
  generaliTest('Add Single Item to Cart', async ({ page }) => {
    // Click "Add to cart" button for "Sauce Labs Backpack"
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

    // Verify cart badge/counter appears in the header showing "1"
    const cartBadge = page.getByTestId('shopping-cart-badge');
    await expect(cartBadge).toBeVisible();
    await expect(cartBadge).toHaveText('1');

    // Verify button text changes from "Add to cart" to "Remove"
    const backpackButton = page.getByTestId('remove-sauce-labs-backpack');
    await expect(backpackButton).toBeVisible();
    await expect(backpackButton).toHaveText('Remove');

    // Verify no page navigation occurs (URL remains on inventory)
    await expect(page).toHaveURL(/inventory\.html/);

    // Verify product remains visible in inventory
    await expect(page.getByTestId('item-4-title-link')).toBeVisible();
  });

  generaliTest('Add Multiple Items to Cart', async ({ page }) => {
    // Click "Add to cart" for "Sauce Labs Backpack" ($29.99)
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

    // Click "Add to cart" for "Sauce Labs Bike Light" ($9.99)
    await page.getByTestId('add-to-cart-sauce-labs-bike-light').click();

    // Click "Add to cart" for "Sauce Labs Bolt T-Shirt" ($15.99)
    await page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt').click();

    // Verify cart counter shows correct total "3"
    const cartBadge = page.getByTestId('shopping-cart-badge');
    await expect(cartBadge).toHaveText('3');

    // Verify all three "Add to cart" buttons change to "Remove"
    const backpackRemove = page.getByTestId('remove-sauce-labs-backpack');
    const bikeLightRemove = page.getByTestId('remove-sauce-labs-bike-light');
    const boltTShirtRemove = page.getByTestId('remove-sauce-labs-bolt-t-shirt');

    await expect(backpackRemove).toBeVisible();
    await expect(bikeLightRemove).toBeVisible();
    await expect(boltTShirtRemove).toBeVisible();

    // Verify each product can be added independently
    await expect(page.getByTestId('item-4-title-link')).toBeVisible();
    await expect(page.getByTestId('item-0-title-link')).toBeVisible();
    await expect(page.getByTestId('item-1-title-link')).toBeVisible();
  });

  generaliTest('Add Same Item Twice', async ({ page }) => {
    // Click "Add to cart" for "Sauce Labs Backpack" first time
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

    // Verify first click adds item, button shows "Remove"
    const backpackButton = page.getByTestId('remove-sauce-labs-backpack');
    await expect(backpackButton).toBeVisible();

    // Click "Add to cart" for "Sauce Labs Backpack" second time
    await page.getByTestId('remove-sauce-labs-backpack').click();

    // After clicking remove, verify button changes back to "Add to cart"
    const addToCartButton = page.getByTestId('add-to-cart-sauce-labs-backpack');
    await expect(addToCartButton).toBeVisible();

    // Add again to verify the functionality works
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

    // Verify button changes to "Remove" again
    await expect(page.getByTestId('remove-sauce-labs-backpack')).toBeVisible();
  });

  generaliTest('Remove Item from Inventory Page', async ({ page }) => {
    // Click "Add to cart" for "Sauce Labs Backpack"
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

    // Verify cart shows "1"
    const cartBadge = page.getByTestId('shopping-cart-badge');
    await expect(cartBadge).toHaveText('1');

    // Click the "Remove" button for the same product
    await page.getByTestId('remove-sauce-labs-backpack').click();

    // Verify button changes back to "Add to cart"
    const addToCartButton = page.getByTestId('add-to-cart-sauce-labs-backpack');
    await expect(addToCartButton).toBeVisible();

    // Verify cart counter shows "0" or disappears
    await expect(cartBadge).not.toBeVisible();

    // Verify product remains visible in inventory
    await expect(page.getByTestId('item-4-title-link')).toBeVisible();

    // Verify no page navigation occurs
    await expect(page).toHaveURL(/inventory\.html/);
  });

  generaliTest('Add to Cart Updates Immediately', async ({ page }) => {
    // Get initial state - cart should be empty
    const cartBadge = page.getByTestId('shopping-cart-badge');
    await expect(cartBadge).not.toBeVisible();

    // Click add to cart for first product
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

    // Verify cart updates immediately to "1"
    await expect(cartBadge).toHaveText('1');

    // Click add to cart for second product
    await page.getByTestId('add-to-cart-sauce-labs-bike-light').click();

    // Verify cart updates immediately to "2"
    await expect(cartBadge).toHaveText('2');
  });

  generaliTest('Add Multiple Different Products to Cart', async ({ page }) => {
    // Add Backpack
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');

    // Add Bike Light
    await page.getByTestId('add-to-cart-sauce-labs-bike-light').click();
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('2');

    // Add Bolt T-Shirt
    await page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt').click();
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('3');

    // Add Fleece Jacket
    await page.getByTestId('add-to-cart-sauce-labs-fleece-jacket').click();
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('4');

    // Verify all products have Remove button (not Add to cart)
    await expect(page.getByTestId('remove-sauce-labs-backpack')).toBeVisible();
    await expect(page.getByTestId('remove-sauce-labs-bike-light')).toBeVisible();
    await expect(page.getByTestId('remove-sauce-labs-bolt-t-shirt')).toBeVisible();
    await expect(page.getByTestId('remove-sauce-labs-fleece-jacket')).toBeVisible();
  });

  generaliTest('Remove Individual Item from Multiple Items in Cart', async ({ page }) => {
    // Add three items to cart
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
    await page.getByTestId('add-to-cart-sauce-labs-bike-light').click();
    await page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt').click();

    // Verify cart shows "3"
    const cartBadge = page.getByTestId('shopping-cart-badge');
    await expect(cartBadge).toHaveText('3');

    // Remove one item (bike light)
    await page.getByTestId('remove-sauce-labs-bike-light').click();

    // Verify cart shows "2"
    await expect(cartBadge).toHaveText('2');

    // Verify removed item now shows "Add to cart" button
    await expect(page.getByTestId('add-to-cart-sauce-labs-bike-light')).toBeVisible();

    // Verify other items still show "Remove" button
    await expect(page.getByTestId('remove-sauce-labs-backpack')).toBeVisible();
    await expect(page.getByTestId('remove-sauce-labs-bolt-t-shirt')).toBeVisible();
  });

  generaliTest('Cart Badge Visibility on Add and Remove', async ({ page }) => {
    const cartBadge = page.getByTestId('shopping-cart-badge');

    // Initially cart badge should not be visible
    await expect(cartBadge).not.toBeVisible();

    // Add item to cart
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

    // Badge should now be visible showing "1"
    await expect(cartBadge).toBeVisible();
    await expect(cartBadge).toHaveText('1');

    // Remove item from cart
    await page.getByTestId('remove-sauce-labs-backpack').click();

    // Badge should disappear when cart is empty
    await expect(cartBadge).not.toBeVisible();
  });

  generaliTest('Add Product to Cart from Different Sorting Orders', async ({ page }) => {
    // Sort by price high to low
    await page.getByTestId('product-sort-container').selectOption('Price (high to low)');

    // Fleece Jacket should be first (highest price)
    await expect(page.getByTestId('item-5-title-link')).toBeVisible();

    // Add to cart
    await page.getByTestId('add-to-cart-sauce-labs-fleece-jacket').click();

    // Verify cart shows "1"
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');

    // Button should change to Remove
    await expect(page.getByTestId('remove-sauce-labs-fleece-jacket')).toBeVisible();

    // Change sort to low to high
    await page.getByTestId('product-sort-container').selectOption('Price (low to high)');

    // Cart count should remain "1" after sort change
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');

    // Fleece Jacket should still show Remove button
    await expect(page.getByTestId('remove-sauce-labs-fleece-jacket')).toBeVisible();
  });

  generaliTest('Add to Cart Preserves Product Visibility', async ({ page }) => {
    // Verify product is visible before adding to cart
    const backpackProduct = page.getByTestId('item-4-title-link');
    await expect(backpackProduct).toBeVisible();

    // Add product to cart
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

    // Verify product is still visible after adding to cart
    await expect(backpackProduct).toBeVisible();

    // Verify product details are still visible
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('$29.99')).toBeVisible();
  });

  generaliTest('Multiple Add to Cart Operations in Sequence', async ({ page }) => {
    const cartBadge = page.getByTestId('shopping-cart-badge');

    // Add and remove same product multiple times
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
    await expect(cartBadge).toHaveText('1');

    await page.getByTestId('remove-sauce-labs-backpack').click();
    await expect(cartBadge).not.toBeVisible();

    // Add again
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
    await expect(cartBadge).toHaveText('1');

    // Add different products
    await page.getByTestId('add-to-cart-sauce-labs-bike-light').click();
    await expect(cartBadge).toHaveText('2');

    await page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt').click();
    await expect(cartBadge).toHaveText('3');
  });
});
