import { test } from '@playwright/test';
import { LoginPage } from '../../pages';

/**
 * Exercise: Additional Edge Cases
 *
 * This test demonstrates additional edge cases that can be added to login-edge-cases.spec.ts.
 * It serves as a reference solution for Day 2 Exercise 1.
 */
test.describe('Additional login edge cases', () => {
  test('rejects empty username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillPassword('secret_sauce');
    await loginPage.clickLogin();

    await loginPage.expectErrorMessage('Username is required');
  });

  test('rejects empty password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsername('standard_user');
    await loginPage.clickLogin();

    await loginPage.expectErrorMessage('Password is required');
  });

  test('rejects special characters in username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('user<script>alert("xss")</script>', 'secret_sauce');

    await loginPage.expectErrorMessage('Username and password do not match');
  });

  test('rejects very long username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const longUsername = 'a'.repeat(1000);

    await loginPage.goto();
    await loginPage.login(longUsername, 'secret_sauce');

    await loginPage.expectErrorMessage('Username and password do not match');
  });
});

