import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object Model for the Sauce Demo inventory/products page.
 *
 * This class encapsulates all interactions and assertions related to the inventory page
 * that appears after successful login.
 */
export class InventoryPage extends BasePage {
  // Locators
  readonly pageTitle: Locator;
  readonly burgerMenuButton: Locator;
  readonly productItems: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.burgerMenuButton = page.locator('#react-burger-menu-btn');
    this.productItems = page.locator('.inventory_item');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
  }

  /**
   * Wait for the inventory page to load
   */
  async waitForLoad(): Promise<void> {
    await this.page.waitForURL('**/inventory.html');
    await expect(this.pageTitle).toBeVisible();
  }

  /**
   * Assert that the page title shows "Products"
   */
  async expectPageTitle(): Promise<void> {
    await expect(this.pageTitle).toHaveText('Products');
  }

  /**
   * Assert that the burger menu button is visible (indicates authenticated state)
   */
  async expectBurgerMenuVisible(): Promise<void> {
    await expect(this.burgerMenuButton).toBeVisible();
  }

  /**
   * Assert that the page is loaded and user is authenticated
   */
  async expectPageLoaded(): Promise<void> {
    await this.waitForLoad();
    await this.expectPageTitle();
    await this.expectBurgerMenuVisible();
  }

  /**
   * Get the number of products displayed
   */
  async getProductCount(): Promise<number> {
    return await this.productItems.count();
  }

  /**
   * Get the shopping cart badge count (number of items in cart)
   */
  async getCartBadgeCount(): Promise<number> {
    const badgeText = await this.shoppingCartBadge.textContent();
    return badgeText ? parseInt(badgeText, 10) : 0;
  }

  /**
   * Assert that the cart badge shows a specific count
   */
  async expectCartBadgeCount(expectedCount: number): Promise<void> {
    await expect(this.shoppingCartBadge).toHaveText(expectedCount.toString());
  }

  /**
   * Click on a product by index (0-based)
   */
  async clickProduct(index: number): Promise<void> {
    const product = this.productItems.nth(index);
    await product.click();
  }

  /**
   * Click on the shopping cart link
   */
  async clickShoppingCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  /**
   * Add a product to cart by index
   */
  async addProductToCart(index: number): Promise<void> {
    const product = this.productItems.nth(index);
    const addToCartButton = product.locator('button').filter({ hasText: 'Add to cart' });
    await addToCartButton.click();
  }
}

