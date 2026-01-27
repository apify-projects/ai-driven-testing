import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Page Object Model for The Internet login page.
 *
 * This class encapsulates all interactions and assertions related to the login page
 * on the-internet.herokuapp.com/login
 */
export class InternetLoginPage extends BasePage {
  // Locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly secureAreaHeading: Locator;
  readonly logoutLink: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: ' Login' });
    this.errorMessage = page.locator('text=Your');
    this.secureAreaHeading = page.getByRole('heading', { name: 'Secure Area', level: 2 });
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.successMessage = page.getByText('You logged into a secure area!');
  }

  /**
   * Navigate to The Internet login page
   */
  async goto(): Promise<void> {
    await this.page.goto('https://the-internet.herokuapp.com/login');
  }

  /**
   * Fill in the username field
   */
  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  /**
   * Fill in the password field
   */
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Click the login button
   */
  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Perform a complete login action
   * @param username - The username to use for login
   * @param password - The password to use for login
   */
  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  /**
   * Clear the username field
   */
  async clearUsername(): Promise<void> {
    await this.usernameInput.clear();
  }

  /**
   * Clear the password field
   */
  async clearPassword(): Promise<void> {
    await this.passwordInput.clear();
  }

  /**
   * Get the error message text
   */
  async getErrorMessage(): Promise<string | null> {
    return await this.errorMessage.textContent();
  }

  /**
   * Assert that the error message is visible
   */
  async expectErrorVisible(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
  }

  /**
   * Assert that the error message contains specific text
   */
  async expectErrorMessage(expectedText: string): Promise<void> {
    await expect(this.errorMessage).toContainText(expectedText);
  }

  /**
   * Assert that the login page is loaded
   */
  async expectPageLoaded(): Promise<void> {
    const heading = this.page.getByRole('heading', { name: 'Login Page', level: 2 });
    await expect(heading).toBeVisible();
  }

  /**
   * Assert that the form elements are visible
   */
  async expectFormElementsVisible(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  /**
   * Assert that both fields are enabled
   */
  async expectFieldsEnabled(): Promise<void> {
    await expect(this.usernameInput).toBeEnabled();
    await expect(this.passwordInput).toBeEnabled();
  }

  /**
   * Verify username field value
   */
  async expectUsernameValue(value: string): Promise<void> {
    await expect(this.usernameInput).toHaveValue(value);
  }

  /**
   * Verify password field value
   */
  async expectPasswordValue(value: string): Promise<void> {
    await expect(this.passwordInput).toHaveValue(value);
  }

  /**
   * Click the logout link
   */
  async clickLogout(): Promise<void> {
    await this.logoutLink.click();
  }

  /**
   * Verify success message is visible
   */
  async expectSuccessMessageVisible(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
  }

  /**
   * Verify logout message is visible
   */
  async expectLogoutMessageVisible(): Promise<void> {
    const logoutMessage = this.page.getByText('You logged out of the secure area!');
    await expect(logoutMessage).toBeVisible();
  }

  /**
   * Verify we are on the secure area page
   */
  async expectSecureAreaPage(): Promise<void> {
    await expect(this.page).toHaveURL('https://the-internet.herokuapp.com/secure');
    await expect(this.secureAreaHeading).toBeVisible();
  }

  /**
   * Verify we are on the login page
   */
  async expectLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL('https://the-internet.herokuapp.com/login');
  }

  /**
   * Verify logout link is visible
   */
  async expectLogoutLinkVisible(): Promise<void> {
    await expect(this.logoutLink).toBeVisible();
  }
}
