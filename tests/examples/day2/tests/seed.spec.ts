// Setup/Initialization test for Sauce Demo authentication
// This test runs ONCE before all other tests (project: 'setup' in playwright.config.ts)
// It saves the authentication state so other tests start already logged in

// Setup/Initialization test for Sauce Demo authentication
// This test runs ONCE before all other tests (project: 'setup' in playwright.config.ts)
// It saves the authentication state so other tests start already logged in

import { setup } from '../fixture';
import path from 'node:path';
import { LoginPage } from '../../../pages';

const authFile = path.join(__dirname, '../../../../.auth/user.json');

setup('authenticate standard_user', async ({ page }) => {
  // Navigate and authenticate using LoginPage POM
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // Wait for inventory page to confirm successful login
  await page.waitForURL('**/inventory.html');

  // Save authentication state for subsequent tests
  await page.context().storageState({ path: authFile });
});
