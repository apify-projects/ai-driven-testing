// spec: spec/x.md
// section: 3. Invalid Password Error Handling

import { test, expect } from '@playwright/test';

test.describe('The Internet - Form Authentication', () => {
  test('Invalid Password Error Handling', async ({ page }) => {
    // 1. Navigate to https://the-internet.herokuapp.com/login
    await page.goto('https://the-internet.herokuapp.com/login');

    // 2. Verify the login page is fully loaded
    const heading = page.getByRole('heading', { name: 'Login Page', level: 2 });
    await expect(heading).toBeVisible();

    // 3. Enter "tomsmith" in the Username field (correct username)
    const usernameField = page.getByRole('textbox', { name: 'Username' });
    await usernameField.fill('tomsmith');

    // 4. Enter "WrongPassword123" in the Password field (incorrect password)
    const passwordField = page.getByRole('textbox', { name: 'Password' });
    await passwordField.fill('WrongPassword123');

    // 5. Click the Login button
    const loginButton = page.getByRole('button', { name: ' Login' });
    await loginButton.click();

    // 6. Wait for server response - verify error message appears
    const errorMessage = page.locator('text= Your password is invalid!');
    await expect(errorMessage).toBeVisible();

    // Expected Results verification:
    // - User remains on the login page
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/login');

    // - Error message appears: "Your password is invalid!"
    await expect(errorMessage).toHaveText(' Your password is invalid!');

    // - Username field displays the entered value
    await expect(usernameField).toHaveValue('tomsmith');

    // - Password field is cleared (after form submission)
    await expect(passwordField).toHaveValue('');

    // - Both fields are still enabled and editable
    await expect(usernameField).toBeEnabled();
    await expect(passwordField).toBeEnabled();

    // - User can attempt login again without page refresh
    // Verify that form is ready for another attempt
    const formHeading = page.getByRole('heading', { name: 'Login Page', level: 2 });
    await expect(formHeading).toBeVisible();
  });
});
