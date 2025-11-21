# Page Object Model (POM)

This directory contains Page Object Model classes for the Sauce Demo application. Page Objects encapsulate page-specific logic and provide a clean API for test interactions.

## Structure

- `BasePage.ts` - Base class with common functionality for all page objects
- `LoginPage.ts` - Login page interactions and assertions
- `InventoryPage.ts` - Inventory/Products page interactions and assertions
- `index.ts` - Central export file for all page objects

## Usage

### Basic Example

```typescript
import { test } from '@playwright/test';
import { LoginPage, InventoryPage } from '../pages';

test('login and verify inventory page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  // Navigate and login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // Verify inventory page loaded
  await inventoryPage.expectPageLoaded();
});
```

### Complete Checkout Flow Example

```typescript
import { test } from '@playwright/test';
import { LoginPage, InventoryPage, CartPage, CheckoutPage } from '../pages';

test('complete checkout flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.expectPageLoaded();

  // Add product to cart
  await inventoryPage.addProductToCart(0);
  await inventoryPage.expectCartBadgeCount(1);

  // Go to cart and checkout
  await cartPage.goto();
  await cartPage.clickCheckout();

  // Complete checkout
  await checkoutPage.completeCheckout('Test', 'User', '12345');
  await checkoutPage.expectOrderConfirmation();
});
```

### Benefits

1. **Reusability** - Page objects can be reused across multiple tests
2. **Maintainability** - If UI changes, update the page object in one place
3. **Readability** - Tests read like user stories
4. **Type Safety** - TypeScript provides autocomplete and type checking

## Best Practices

- Keep page objects focused on a single page or component
- Use descriptive method names that reflect user actions
- Include both interactions (clicks, fills) and assertions (expects)
- Don't put test logic in page objects - keep them as thin wrappers
- Use locators that are resilient to UI changes (prefer `getByRole`, `getByTestId`)

## Adding New Page Objects

1. Create a new file (e.g., `CartPage.ts`)
2. Extend `BasePage` class
3. Define locators as readonly properties
4. Add methods for interactions and assertions
5. Export from `index.ts`

Example:

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
```

