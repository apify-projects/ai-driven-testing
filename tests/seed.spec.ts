import { test } from '@playwright/test';
import { LoginPage, InventoryPage } from './pages';

test('authenticate as standard_user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(
    process.env.USER_NAME ?? 'standard_user',
    process.env.PASSWORD ?? 'secret_sauce',
  );
  await new InventoryPage(page).waitForLoad();

  await page.context().storageState({ path: '.auth/user.json' });
});
