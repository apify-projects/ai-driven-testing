import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object Model for the Sauce Demo shopping cart page.
 *
 * This class encapsulates all interactions and assertions related to the cart page.
 */
export class CartPage extends BasePage {
  // Locators
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly cartItems: Locator;
  readonly cartItemNames: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = page.getByTestId('checkout');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
    this.cartItems = page.locator('.cart_item');
    this.cartItemNames = page.locator('.inventory_item_name');
  }

  /**
   * Navigate to the cart page
   */
  async goto(): Promise<void> {
    await this.page.goto('/cart.html');
  }

  /**
   * Click the checkout button
   */
  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  /**
   * Click the continue shopping button
   */
  async clickContinueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  /**
   * Get the number of items in the cart
   */
  async getItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Get the names of all items in the cart
   */
  async getItemNames(): Promise<string[]> {
    const names: string[] = [];
    const count = await this.cartItemNames.count();
    for (let i = 0; i < count; i++) {
      const name = await this.cartItemNames.nth(i).textContent();
      if (name) {
        names.push(name);
      }
    }
    return names;
  }

  /**
   * Remove an item from cart by index
   */
  async removeItem(index: number): Promise<void> {
    const item = this.cartItems.nth(index);
    const removeButton = item.getByRole('button', { name: 'Remove' });
    await removeButton.click();
  }

  /**
   * Assert that the cart contains a specific number of items
   */
  async expectItemCount(expectedCount: number): Promise<void> {
    const actualCount = await this.getItemCount();
    expect(actualCount).toBe(expectedCount);
  }

  /**
   * Assert that the cart contains a specific item by name
   */
  async expectItemInCart(itemName: string): Promise<void> {
    const itemNames = await this.getItemNames();
    expect(itemNames).toContain(itemName);
  }
}

