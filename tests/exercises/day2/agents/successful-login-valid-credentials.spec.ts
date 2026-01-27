// spec: spec/x.md
// section: 1. Successful Login with Valid Credentials
// pom: tests/pages/internet/InternetLoginPage.ts

import { test, expect } from '@playwright/test';
import { InternetLoginPage } from '../../../pages/internet/InternetLoginPage';

test.describe('The Internet - Form Authentication', () => {
  test('Successful Login with Valid Credentials', async ({ page }) => {
    const loginPage = new InternetLoginPage(page);

    // 1. Navigate to https://the-internet.herokuapp.com/login
    await loginPage.goto();

    // 2. Verify the login page displays with title "Login Page"
    await loginPage.expectPageLoaded();

    // 3. Verify the form contains Username field, Password field, and Login button
    await loginPage.expectFormElementsVisible();

    // 4. Verify the instructions are visible: "Enter tomsmith for the username and SuperSecretPassword! for the password"
    await expect(page.getByText('Enter tomsmith for the username and SuperSecretPassword! for the password')).toBeVisible();

    // 5-6. Enter "tomsmith" in the Username field
    await loginPage.fillUsername('tomsmith');

    // 7-8. Enter "SuperSecretPassword!" in the Password field
    await loginPage.fillPassword('SuperSecretPassword!');

    // 9. Click the "Login" button
    await loginPage.clickLogin();

    // 10. Verify page redirects to https://the-internet.herokuapp.com/secure
    await loginPage.expectSecureAreaPage();

    // 11. Verify success message appears: "You logged into a secure area!"
    await loginPage.expectSuccessMessageVisible();

    // 12. Verify "Secure Area" heading is displayed
    const secureHeading = page.getByRole('heading', { name: 'Secure Area', exact: true, level: 2 });
    await expect(secureHeading).toBeVisible();

    // 13. Verify Logout link is visible
    await loginPage.expectLogoutLinkVisible();
  });
});
