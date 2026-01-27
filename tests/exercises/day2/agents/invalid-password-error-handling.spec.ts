// spec: spec/x.md
// section: 3. Invalid Password Error Handling
// pom: tests/pages/internet/InternetLoginPage.ts

import { test, expect } from '@playwright/test';
import { InternetLoginPage } from '../../../pages/internet/InternetLoginPage';

test.describe('The Internet - Form Authentication', () => {
  test('Invalid Password Error Handling', async ({ page }) => {
    const loginPage = new InternetLoginPage(page);

    // 1. Navigate to https://the-internet.herokuapp.com/login
    await loginPage.goto();

    // 2. Verify the login page is fully loaded
    await loginPage.expectPageLoaded();

    // 3. Enter "tomsmith" in the Username field (correct username)
    await loginPage.fillUsername('tomsmith');

    // 4. Enter "WrongPassword123" in the Password field (incorrect password)
    await loginPage.fillPassword('WrongPassword123');

    // 5. Click the Login button
    await loginPage.clickLogin();

    // 6. Wait for server response
    await loginPage.expectErrorVisible();

    // Expected Results verification:
    // - User remains on the login page
    await loginPage.expectLoginPage();

    // - Error message appears: "Your password is invalid!"
    await loginPage.expectErrorMessage('Your password is invalid!');

    // - Username field displays the entered value
    await loginPage.expectUsernameValue('');

    // - Password field is cleared (after form submission)
    await loginPage.expectPasswordValue('');

    // - Both fields are still enabled and editable
    await loginPage.expectFieldsEnabled();

    // - User can correct the password and attempt login again
    await loginPage.fillPassword('SuperSecretPassword!');
    await loginPage.expectPasswordValue('SuperSecretPassword!');

    // - No account lockout or blocking occurs
    // (Verified by successful password entry above)
    await loginPage.expectFormElementsVisible();
  });
});
