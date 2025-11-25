import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('standard_user happy path - should navigate to inventory page after login', async ({ page }) => {
    // Login as standard_user
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify successful login by checking inventory page elements
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page).toHaveURL(/.*inventory/);
  });

  test('locked_out_user negative path - should wait for error message, NOT navigation', async ({ page }) => {
    // Attempt to login as locked_out_user
    await page.getByPlaceholder('Username').fill('locked_out_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for error message, do NOT wait for navigation
    await expect(page.getByTestId('error')).toContainText('Sorry, this user has been locked out.');

    // Verify we're still on the login page
    await expect(page).toHaveURL(/.*saucedemo/);
    await expect(page.getByText('Products')).not.toBeVisible();
  });

  test('validation for missing credentials - should show validation error', async ({ page }) => {
    // Try to login without entering any credentials
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify validation error message is displayed
    await expect(page.getByTestId('error')).toContainText('Username is required');
  });
});
