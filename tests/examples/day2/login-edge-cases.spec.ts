import { test } from '@playwright/test';
import { LoginPage, InventoryPage } from '../../pages';

test.describe('Login - Edge Cases', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
  });

  test.describe('Successful login with special users', () => {
    // Edge case users who have UI issues or performance glitches but can log in
    const specialUsers = [
      { username: 'problem_user', description: 'UI issues' },
      { username: 'performance_glitch_user', description: 'slow server responses' },
    ];

    for (const user of specialUsers) {
      test(`should successfully log in with ${user.username} (${user.description})`, async () => {
        await loginPage.login(user.username, 'secret_sauce');
        // Increased timeout for performance_glitch_user to handle slow responses
        await inventoryPage.expectPageLoaded();
      });
    }
  });

  test('should reject invalid credentials with error message', async () => {
    await loginPage.login('invalid_user', 'wrong_password');
    await loginPage.expectErrorMessage('Username and password do not match');
  });
});
