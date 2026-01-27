// spec: spec/x.md
// section: 2. Invalid Username Error Handling
// description: Verify that the application displays appropriate error message when incorrect username is provided

import { test, expect } from '@playwright/test';

test.describe('Form Authentication', () => {
  test('Invalid Username Error Handling', async ({ page }) => {
    // 1. Navigate to https://the-internet.herokuapp.com/login
    await page.goto('https://the-internet.herokuapp.com/login');

    // 2. Verify the login page is fully loaded
    await expect(page.getByText('Login Page')).toBeVisible();

    // 3. Enter "wronguser" in the Username field
    const usernameField = page.getByRole('textbox', { name: 'Username' });
    await usernameField.click();
    await usernameField.fill('wronguser');

    // 4. Enter "wrongpassword" in the Password field
    const passwordField = page.getByRole('textbox', { name: 'Password' });
    await passwordField.click();
    await passwordField.fill('wrongpassword');

    // 5. Click the Login button
    await page.getByRole('button', { name: ' Login' }).click();

    // 6. Wait for response from server and verify error message
    // Expected: Error message appears: "Your username is invalid!"
    await expect(page.getByText('Your username is invalid!')).toBeVisible();

    // Verify user remains on the login page
    expect(page.url()).toBe('https://the-internet.herokuapp.com/login');

    // Verify both fields are still enabled and editable
    await expect(usernameField).toBeEnabled();
    await expect(passwordField).toBeEnabled();
  });
});
