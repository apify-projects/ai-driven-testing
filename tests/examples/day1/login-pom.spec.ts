import { test } from '@playwright/test';
import { LoginPage, InventoryPage } from '../../pages';

test.describe('Login Page - POM', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
  });

  test('should login successfully with standard_user', async () => {
    // Arrange & Act
    await loginPage.login('standard_user', 'secret_sauce');

    // Assert
    await inventoryPage.expectPageLoaded();
  });

  test('should show error message for locked_out_user', async () => {
    // Arrange & Act
    await loginPage.login('locked_out_user', 'secret_sauce');

    // Assert
    await loginPage.expectErrorMessage('Sorry, this user has been locked out.');
  });

  test('should show validation error for missing credentials', async () => {
    // Arrange & Act
    await loginPage.clickLogin();

    // Assert
    await loginPage.expectErrorMessage('Username is required');
  });
});
