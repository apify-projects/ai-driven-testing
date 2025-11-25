import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('wrong password should show error message', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'wrong_password');
  await loginPage.expectErrorMessage('Username and password do not match');
});
