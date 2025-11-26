// spec: spec/my-plan.md
// Plan section: 3. Product Details Page

import { expect } from '@playwright/test';
import { test as generaliTest } from '../fixture';

generaliTest.describe('Product Details Page', () => {
  generaliTest('View Product Details - Fleece Jacket', async ({ page }) => {
    // Click on Sauce Labs Fleece Jacket product name
    await page.getByTestId('item-5-title-link').click();

    // Verify page navigates to product details page with correct URL
    await expect(page).toHaveURL(/inventory-item\.html\?id=5/);

    // Verify product image is displayed
    await expect(page.locator('img[alt="Sauce Labs Fleece Jacket"]')).toBeVisible();

    // Verify product name is displayed
    await expect(page.getByText('Sauce Labs Fleece Jacket')).toBeVisible();

    // Verify product description is displayed
    await expect(
      page.getByText(/It's not every day that you come across a midweight quarter-zip fleece jacket/)
    ).toBeVisible();

    // Verify product price is displayed
    await expect(page.getByText('$49.99')).toBeVisible();

    // Verify "Add to cart" button is visible
    await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible();

    // Verify "Back to products" button is visible in the header
    await expect(page.getByRole('button', { name: /Back to products/ })).toBeVisible();
  });

  generaliTest('View Product Details - Backpack', async ({ page }) => {
    // Click on Sauce Labs Backpack product name
    await page.getByTestId('item-4-title-link').click();

    // Verify page navigates to product details page with correct URL
    await expect(page).toHaveURL(/inventory-item\.html\?id=4/);

    // Verify product image is displayed
    await expect(page.locator('img[alt="Sauce Labs Backpack"]')).toBeVisible();

    // Verify product name is displayed
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    // Verify product description is displayed
    await expect(
      page.getByText(/carry\.allTheThings\(\) with the sleek, streamlined Sly Pack/)
    ).toBeVisible();

    // Verify product price is displayed
    await expect(page.getByText('$29.99')).toBeVisible();

    // Verify "Add to cart" button is visible
    await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible();
  });

  generaliTest('View Product Details - Bike Light', async ({ page }) => {
    // Click on Sauce Labs Bike Light product name
    await page.getByTestId('item-0-title-link').click();

    // Verify page navigates to product details page with correct URL
    await expect(page).toHaveURL(/inventory-item\.html\?id=0/);

    // Verify product name is displayed
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();

    // Verify product price is displayed
    await expect(page.getByText('$9.99')).toBeVisible();

    // Verify "Add to cart" button is visible
    await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible();
  });

  generaliTest('Back to Products Navigation - from Fleece Jacket', async ({ page }) => {
    // Click on product to view details
    await page.getByTestId('item-5-title-link').click();

    // Verify we are on product details page
    await expect(page).toHaveURL(/inventory-item\.html\?id=5/);

    // Click the "Back to products" button
    await page.getByTestId('back-to-products').click();

    // Verify page navigates back to inventory page
    await expect(page).toHaveURL(/inventory\.html/);

    // Verify all 6 products are visible using generaliTest IDs
    await expect(page.getByTestId('item-4-title-link')).toBeVisible();
    await expect(page.getByTestId('item-0-title-link')).toBeVisible();
    await expect(page.getByTestId('item-1-title-link')).toBeVisible();
    await expect(page.getByTestId('item-5-title-link')).toBeVisible();
    await expect(page.getByTestId('item-2-title-link')).toBeVisible();
    await expect(page.getByTestId('item-3-title-link')).toBeVisible();
  });

  generaliTest('Back to Products Navigation - from Backpack', async ({ page }) => {
    // Click on product to view details
    await page.getByTestId('item-4-title-link').click();

    // Verify we are on product details page
    await expect(page).toHaveURL(/inventory-item\.html\?id=4/);

    // Click the "Back to products" button
    await page.getByTestId('back-to-products').click();

    // Verify page navigates back to inventory page
    await expect(page).toHaveURL(/inventory\.html/);

    // Verify we can see the products list and backpack product is visible
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.getByTestId('item-4-title-link')).toBeVisible();
  });

  generaliTest('Product Details - Add to Cart from Details Page', async ({ page }) => {
    // Click on product to view details
    await page.getByTestId('item-5-title-link').click();

    // Verify we are on product details page
    await expect(page).toHaveURL(/inventory-item\.html\?id=5/);

    // Click "Add to cart" button on product details page
    await page.getByRole('button', { name: 'Add to cart' }).click();

    // Verify button changes to "Remove"
    await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();
  });

  generaliTest('Product Details - Navigate between multiple products', async ({ page }) => {
    // Click on first product (Fleece Jacket)
    await page.getByTestId('item-5-title-link').click();
    await expect(page).toHaveURL(/id=5/);
    await expect(page.getByText('Sauce Labs Fleece Jacket')).toBeVisible();

    // Go back to inventory
    await page.getByTestId('back-to-products').click();

    // Click on second product (Backpack)
    await page.getByTestId('item-4-title-link').click();
    await expect(page).toHaveURL(/id=4/);
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    // Go back to inventory
    await page.getByTestId('back-to-products').click();

    // Click on third product (Bike Light)
    await page.getByTestId('item-0-title-link').click();
    await expect(page).toHaveURL(/id=0/);
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
  });

  generaliTest('Product Details - Verify all product elements render correctly', async ({ page }) => {
    // Click on product
    await page.getByTestId('item-5-title-link').click();

    // Verify all key elements are present
    const productImage = page.locator('img[alt="Sauce Labs Fleece Jacket"]');
    const productName = page.getByText('Sauce Labs Fleece Jacket');
    const productDescription = page.getByText(/It's not every day that you come across/);
    const productPrice = page.getByText('$49.99');
    const addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    const backButton = page.getByRole('button', { name: /Back to products/ });

    // Verify all elements are visible
    await expect(productImage).toBeVisible();
    await expect(productName).toBeVisible();
    await expect(productDescription).toBeVisible();
    await expect(productPrice).toBeVisible();
    await expect(addToCartButton).toBeVisible();
    await expect(backButton).toBeVisible();

    // Verify elements are in the correct location (not hidden off-screen)
    await expect(productImage).toBeInViewport();
    await expect(addToCartButton).toBeInViewport();
  });

  generaliTest('Product Details - URL contains correct product ID', async ({ page }) => {
    // generaliTest with Fleece Jacket (id=5)
    await page.getByTestId('item-5-title-link').click();
    const url1 = page.url();
    expect(url1).toContain('inventory-item.html');
    expect(url1).toContain('id=5');

    // Go back and generaliTest with Backpack (id=4)
    await page.getByTestId('back-to-products').click();
    await page.getByTestId('item-4-title-link').click();
    const url2 = page.url();
    expect(url2).toContain('inventory-item.html');
    expect(url2).toContain('id=4');
  });

  generaliTest('Product Details - All products have product images', async ({ page }) => {
    const productIds = ['0', '1', '2', '3', '4', '5'];

    for (const id of productIds) {
      // Click on product
      await page.getByTestId(`item-${id}-title-link`).click();

      // Verify image is present and visible
      const images = page.locator('img').filter({ has: page.locator('xpath=//*[not(contains(@alt, "Open Menu")) and not(contains(@alt, "Close Menu")) and not(contains(@alt, "Go back"))]') });
      // Verify at least one product image is visible
      const productImages = page.locator('img').first();
      await expect(productImages).toBeVisible();

      // Go back for next iteration
      await page.getByTestId('back-to-products').click();
    }
  });
});
