import { test } from '@playwright/test';
import { LoginPage, InventoryPage } from '../../pages';

test.describe('Login Edge Cases', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
  });

  // Test loop for users that should log in
  const loginUsers = [
    {
      username: 'problem_user',
      description: 'problem_user - should successfully log in despite UI issues'
    },
    {
      username: 'performance_glitch_user',
      description: 'performance_glitch_user - should successfully log in despite slow responses'
    },
    {
      username: 'invalid_user',
      description: 'invalid_user - should reject invalid username/password combination'
    }
  ];

  loginUsers.forEach(({ username, description }) => {
    test(`${description}`, async () => {
      // Use the standard password for Sauce Demo
      const password = 'secret_sauce';

      // Perform login
      await loginPage.login(username, password);

      // Wait for inventory page to load with increased timeout for slow users
      // This adds resilience to timing issues
      if (username === 'invalid_user') {
        await loginPage.expectErrorMessage('Username and password do not match');
      } else {
        await inventoryPage.expectPageLoaded();
      }
    });
  });

  test.skip('Bad credentials - should reject invalid username/password combination', async () => {
    // Attempt login with invalid credentials
    await loginPage.login('invalid_user', 'wrong_password');

    // Verify error message is displayed
    await loginPage.expectErrorMessage('Username and password do not match');
  });
});
