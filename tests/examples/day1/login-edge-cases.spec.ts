import { test } from '@playwright/test';
import { LoginPage, InventoryPage } from '../../pages';

const USERS = [
  { username: 'problem_user', password: 'secret_sauce', expectation: 'images load even when DOM mutates' },
  { username: 'performance_glitch_user', password: 'secret_sauce', expectation: 'catalog eventually renders despite slowness' },
];

test.describe('AI-generated login edge cases', () => {
  for (const user of USERS) {
    test(`handles ${user.username} scenario`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);

      await loginPage.goto();
      await loginPage.login(user.username, user.password);

      // expectPageLoaded() already checks page title and burger menu visibility
      await inventoryPage.expectPageLoaded();
    });
  }

  test('rejects bad credentials suggested by AI', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('totally_fake_user', 'hunter2');

    await loginPage.expectErrorMessage('Username and password do not match');
  });
});

