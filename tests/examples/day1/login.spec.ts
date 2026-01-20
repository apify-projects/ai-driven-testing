import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  test('standard_user happy path - successful login', async ({ page }) => {
    await page.getByPlaceholder('Username').fill(process.env.USER_NAME ?? '');
    await page.getByPlaceholder('Password').fill(process.env.PASSWORD ?? '');
    await page.getByRole('button', { name: /login/i }).click();

    await expect(page).toHaveURL(/.*inventory/);
    await expect(page.getByText('Products')).toBeVisible();
  });

  test('locked_out_user negative path - account locked', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('locked_out_user');
    await page.getByPlaceholder('Password').fill(process.env.PASSWORD ?? '');
    await page.getByRole('button', { name: /login/i }).click();

    await expect(page.getByTestId('error')).toContainText('Sorry, this user has been locked out');
  });

  test('validation for missing credentials', async ({ page }) => {
    await page.getByRole('button', { name: /login/i }).click();

    await expect(page.getByTestId('error')).toContainText('Username is required');
  });
});