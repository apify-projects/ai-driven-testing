import { test } from '@playwright/test';
import { LoginPage, InventoryPage } from '../../pages';

test.describe('Login Page - POM', () => {
  test('should login successfully with standard_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.expectPageLoaded();
  });

  test('should show error for locked_out_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.expectErrorMessage('Sorry, this user has been locked out.');
  });

  test('should show validation error for missing credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.clickLogin();
    await loginPage.expectErrorMessage('Username is required');
  });
});
