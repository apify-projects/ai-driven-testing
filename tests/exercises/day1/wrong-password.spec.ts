import { test, expect } from '@playwright/test';

/**
 * Exercise: Negative-path hardening
 *
 * This test demonstrates handling negative test cases (wrong password).
 * It serves as a reference solution for Day 1 Exercise 1.
 */
test.describe('Sauce Demo login - Negative path', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('rejects wrong password with error message', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('wrong_password');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByTestId('error')).toContainText('Username and password do not match');
  });
});

