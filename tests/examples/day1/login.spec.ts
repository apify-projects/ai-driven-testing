import { test, expect } from '@playwright/test';

const USERS = {
  valid: { username: 'standard_user', password: 'secret_sauce' },
  locked: { username: 'locked_out_user', password: 'secret_sauce' },
};

test.describe('Sauce Demo login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('allows a happy-path login for a standard user', async ({ page }) => {
    await page.getByPlaceholder('Username').fill(USERS.valid.username);
    await page.getByPlaceholder('Password').fill(USERS.valid.password);
    await page.getByRole('button', { name: 'Login' }).click();

    await page.waitForURL('**/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');
    await expect(page.locator('#react-burger-menu-btn')).toBeVisible();
  });

  test('blocks a locked out user with a friendly error', async ({ page }) => {
    await page.getByPlaceholder('Username').fill(USERS.locked.username);
    await page.getByPlaceholder('Password').fill(USERS.locked.password);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByTestId('error')).toContainText('Sorry, this user has been locked out.');
  });

  test('shows validation for missing credentials', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByTestId('error')).toContainText('Username is required');
  });
});


