import { test } from '@playwright/test';
import { LoginPage, InventoryPage } from '../../pages';

/**
 * Seed test for Playwright agents (planner/generator/healer).
 *
 * This test performs a successful login to Sauce Demo, establishing
 * an authenticated session that agents can use as a baseline context.
 *
 * Agents will reference this seed when generating new test plans and specs.
 * Uses Page Object Model pattern for consistency with Day 1 examples.
 */
test.describe('Seed - Authenticated session', () => {
  test('seed - login as standard user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // Navigate to login page and perform login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Verify successful login - expectPageLoaded() checks URL, title, and burger menu
    await inventoryPage.expectPageLoaded();
  });
});
