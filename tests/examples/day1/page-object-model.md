# Page Object Model (POM) - Introduction

## What is Page Object Model?

Page Object Model (POM) is a design pattern that creates an object repository for web UI elements. Instead of writing locators directly in your tests, you encapsulate them in page classes.

## Why Use POM?

### Problems with Direct Locators in Tests

```typescript
// ❌ Direct locators - hard to maintain
test('login test', async ({ page }) => {
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('.title')).toHaveText('Products');
});
```

**Issues:**
- Locators scattered across multiple tests
- If UI changes, you must update many test files
- Tests are harder to read and understand
- No code reuse

### Benefits of POM

```typescript
// ✅ Using Page Objects - clean and maintainable
test('login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.expectPageLoaded();
});
```

**Benefits:**
- **Single source of truth** - locators defined once in page class
- **Easy maintenance** - update locator in one place
- **Better readability** - tests read like user stories
- **Reusability** - use same page object across multiple tests
- **Type safety** - TypeScript autocomplete and type checking

## POM Structure

### Base Page Class

All page objects extend a base class with common functionality:

```typescript
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }
}
```

### Page Object Example

```typescript
export class LoginPage extends BasePage {
  // Define locators as readonly properties
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  // Encapsulate actions as methods
  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  // Combine actions into higher-level methods
  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }
}
```

## Key Principles

1. **One Page Object = One Page**
   - Each page/component gets its own class
   - Don't mix multiple pages in one class

2. **Locators as Properties**
   - Define all locators as readonly properties
   - Initialize them in the constructor

3. **Actions as Methods**
   - Each user action becomes a method
   - Methods should be descriptive (`clickLogin()`, not `click()`)

4. **Combine Actions**
   - Create higher-level methods for common flows
   - Example: `login()` combines `fillUsername()`, `fillPassword()`, `clickLogin()`

5. **Include Assertions**
   - Page objects can include assertion methods
   - Example: `expectPageLoaded()`, `expectErrorMessage()`

## Comparison: Before vs. After

### Before (Direct Locators)

```typescript
test('login and add to cart', async ({ page }) => {
  // Login
  await page.goto('/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('**/inventory.html');
  
  // Add to cart
  await page.locator('.inventory_item').first().locator('button').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});
```

### After (Page Objects)

```typescript
test('login and add to cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.expectPageLoaded();
  
  await inventoryPage.addProductToCart(0);
  await inventoryPage.expectCartBadgeCount(1);
});
```

## When to Use POM?

**Use POM when:**
- ✅ You have multiple tests using the same page
- ✅ UI changes frequently
- ✅ You want to improve test maintainability
- ✅ Team members need to understand tests easily

**Consider skipping POM when:**
- ❌ You have only one simple test
- ❌ Prototyping or exploring
- ❌ Page is used only once

## Next Steps

1. Review the existing page objects in `tests/pages/`
2. Compare `login.spec.ts` (direct locators) with `login-pom.spec.ts` (POM)
3. Try refactoring one of your tests to use POM
4. See `tests/pages/README.md` for detailed usage examples

## Further Reading

- [Playwright Best Practices - Page Object Model](https://playwright.dev/docs/pom)
- [Page Object Pattern - Martin Fowler](https://martinfowler.com/bliki/PageObject.html)
