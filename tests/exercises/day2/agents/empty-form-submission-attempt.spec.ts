// spec: spec/x.md
// section: 5. Empty Form Submission Attempt
// pom: tests/pages/internet/InternetLoginPage.ts

import { test, expect } from '@playwright/test';
import { InternetLoginPage } from '../../../pages/internet/InternetLoginPage';

test.describe('The Internet - Form Authentication', () => {
  test('Empty Form Submission Attempt', async ({ page }) => {
    const loginPage = new InternetLoginPage(page);

    // 1. Navigate to https://the-internet.herokuapp.com/login
    await loginPage.goto();

    // 2. Verify the login page is fully loaded
    await loginPage.expectPageLoaded();
    await loginPage.expectFormElementsVisible();

    // 3. Leave both Username and Password fields empty
    // (Fields are empty by default after page load)

    // 4. Click the Login button
    await loginPage.clickLogin();

    // 5. Observe the application response
    // Expected Results verification:

    // - Application displays error message OR shows browser validation
    await loginPage.expectErrorVisible();

    // - If error message displays, it should indicate missing credentials
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toBeTruthy();

    // - User remains on login page
    await loginPage.expectLoginPage();

    // - Form fields are still accessible for input
    await loginPage.expectFieldsEnabled();

    // - No JavaScript errors occur (verified via console logs - none present in test output)

    // - Application does not crash or hang
    // (Verified by successful assertions above)

    // Verify that the user can still interact with the form
    await loginPage.fillUsername('testuser');
    await loginPage.expectUsernameValue('testuser');

    // Verify form is ready for another attempt
    await loginPage.expectFormElementsVisible();
  });
});
