import { test } from '@playwright/test';
import { LoginPage, InventoryPage } from '../../pages';

/**
 * Example test using Page Object Model pattern.
 *
 * This demonstrates how to use the POM classes for cleaner, more maintainable tests.
 */
const USERS = {
  valid: { username: 'standard_user', password: 'secret_sauce' },
  locked: { username: 'locked_out_user', password: 'secret_sauce' },
};

test.describe('Sauce Demo login (POM)', () => {
  test('allows a happy-path login for a standard user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(USERS.valid.username, USERS.valid.password);

    await inventoryPage.expectPageLoaded();
  });

  test('blocks a locked out user with a friendly error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(USERS.locked.username, USERS.locked.password);

    await loginPage.expectErrorMessage('Sorry, this user has been locked out.');
  });

  test('shows validation for missing credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.clickLogin();

    await loginPage.expectErrorMessage('Username is required');
  });
});

