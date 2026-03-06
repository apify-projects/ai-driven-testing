# SauceDemo – Comprehensive Test Plan for error_user

## Application Overview

SauceDemo (https://www.saucedemo.com/) is a React-based e-commerce demo application used for testing purposes. The
application simulates a shopping experience and supports multiple user accounts with different behaviors.

The `error_user` (password: `secret_sauce`) is a special test account designed to expose error handling and broken
functionality throughout the application. Unlike `standard_user`, this account triggers JavaScript errors, broken
interactions, and silent failures across several key user flows. The purpose of this test plan is to document the
actual behavior encountered by `error_user` and verify whether the application handles errors gracefully or silently
fails.

The application provides the following features under test:

- **Authentication**: Login page with username/password fields
- **Product Catalog (Inventory)**: Grid of 6 products with names, descriptions, prices, and "Add to cart" buttons
- **Product Sorting**: Dropdown to sort by name or price
- **Product Detail Page**: Individual product pages
- **Shopping Cart**: Cart page with items, quantities, and checkout entry point
- **Checkout Flow**: Three-step checkout process (Information, Overview, Confirmation)
- **Navigation Menu**: Hamburger menu with All Items, About, Logout, Reset App State links

The base URL is configured in `playwright.config.ts` as `https://www.saucedemo.com/`.

---

## Test Scenarios

### 1. Authentication

#### 1.1 Successful Login with error_user Credentials

**Starting state:** Fresh browser session, no prior authentication.

**Steps:**
1. Navigate to `https://www.saucedemo.com/`
2. Verify the login page is displayed with a "Username" input, "Password" input, and "Login" button
3. Type `error_user` in the "Username" field
4. Type `secret_sauce` in the "Password" field
5. Click the "Login" button

**Expected Results:**
- Browser navigates to `/inventory.html`
- Page title area shows "Products"
- The hamburger menu button is visible in the header
- The shopping cart icon is visible in the header
- Six product items are displayed in the grid
- Product images are displayed correctly (no broken image placeholders)

---

#### 1.2 Login with Incorrect Password for error_user

**Starting state:** Fresh browser session, no prior authentication.

**Steps:**
1. Navigate to `https://www.saucedemo.com/`
2. Type `error_user` in the "Username" field
3. Type `wrong_password` in the "Password" field
4. Click the "Login" button

**Expected Results:**
- User remains on the login page (`/`)
- An error message is displayed containing "Username and password do not match any user in this service"
- The username and password fields are highlighted with an error indicator (X icon)

---

#### 1.3 Logout via Navigation Menu

**Starting state:** Fresh browser session, logged in as `error_user`, on the inventory page.

**Steps:**
1. Navigate to `https://www.saucedemo.com/` and log in as `error_user` with password `secret_sauce`
2. Click the hamburger menu button ("Open Menu") in the top-left corner
3. Verify the side menu opens and shows links: "All Items", "About", "Logout", "Reset App State"
4. Click the "Logout" link

**Expected Results:**
- User is redirected to the login page (`/`)
- The login form is displayed and the user is no longer authenticated
- Navigating directly to `/inventory.html` redirects back to the login page

---

### 2. Product Catalog (Inventory Page)

**Starting state for all scenarios in this section:** Fresh browser session, logged in as `error_user`, on
`/inventory.html`.

#### 2.1 Verify All Products Are Displayed

**Steps:**
1. Navigate to `https://www.saucedemo.com/` and log in as `error_user` with password `secret_sauce`
2. Observe the product grid on the inventory page

**Expected Results:**
- Exactly 6 products are displayed in the grid
- Each product shows: a product image, a product name (as a clickable link), a short description, a price in `$X.XX`
  format, and an "Add to cart" button
- Product images are correctly displayed (not swapped or broken)
- Products appear in the default alphabetical order (Name A to Z)

---

#### 2.2 Sort Products by Name (Z to A)

**Steps:**
1. Navigate to `https://www.saucedemo.com/` and log in as `error_user` with password `secret_sauce`
2. Locate the sort dropdown (currently showing "Name (A to Z)")
3. Select "Name (Z to A)" from the dropdown

**Expected Results:**
- The product list reorders so that "Test.allTheThings() T-Shirt (Red)" appears first
- "Sauce Labs Backpack" appears last
- The dropdown label updates to show "Name (Z to A)"
- No JavaScript errors are thrown in the browser console

---

#### 2.3 Sort Products by Price (Low to High)

**Steps:**
1. Navigate to `https://www.saucedemo.com/` and log in as `error_user` with password `secret_sauce`
2. Select "Price (low to high)" from the sort dropdown

**Expected Results:**
- The product with the lowest price appears first: Sauce Labs Onesie ($7.99)
- The product with the highest price appears last: Sauce Labs Fleece Jacket ($49.99)
- All 6 products are visible in ascending price order
- No JavaScript errors are thrown in the browser console

---

#### 2.4 Sort Products by Price (High to Low)

**Steps:**
1. Navigate to `https://www.saucedemo.com/` and log in as `error_user` with password `secret_sauce`
2. Select "Price (high to low)" from the sort dropdown

**Expected Results:**
- Sauce Labs Fleece Jacket ($49.99) appears first
- Sauce Labs Onesie ($7.99) appears last
- All 6 products are visible in descending price order
- No JavaScript errors are thrown in the browser console

---

### 3. Add to Cart Functionality (Known Broken Area)

**Starting state for all scenarios in this section:** Fresh browser session, logged in as `error_user`, on
`/inventory.html`.

These scenarios target the core broken behavior for `error_user`. Adding items to the cart is expected to trigger
errors or fail to update state correctly.

#### 3.1 Attempt to Add a Single Product to Cart

**Steps:**
1. Navigate to `https://www.saucedemo.com/` and log in as `error_user` with password `secret_sauce`
2. Click "Add to cart" on "Sauce Labs Backpack"

**Expected Results (standard behavior — verify if error_user deviates):**
- The "Add to cart" button changes to "Remove"
- The cart badge in the header shows "1"

**Error conditions to check:**
- The button does NOT change to "Remove" (click has no visible effect)
- The cart badge does NOT appear or shows an incorrect count
- A JavaScript error is thrown in the browser console
- An error message or dialog is displayed to the user

---

#### 3.2 Attempt to Add Multiple Products to Cart

**Steps:**
1. Navigate to `https://www.saucedemo.com/` and log in as `error_user` with password `secret_sauce`
2. Click "Add to cart" on "Sauce Labs Bike Light"
3. Click "Add to cart" on "Sauce Labs Bolt T-Shirt"
4. Click "Add to cart" on "Sauce Labs Onesie"

**Expected Results (standard behavior — verify if error_user deviates):**
- Each clicked product's button changes from "Add to cart" to "Remove"
- The cart badge increments with each addition, showing "3" after all three are added

**Error conditions to check:**
- One or more buttons fail to change state after clicking
- The cart badge count is incorrect or missing
- The cart badge count does not match the number of items added
- JavaScript errors appear in the browser console

---

#### 3.3 Attempt to Remove a Product from the Inventory Page

**Steps:**
1. Navigate to `https://www.saucedemo.com/` and log in as `error_user` with password `secret_sauce`
2. Click "Add to cart" on "Sauce Labs Backpack"
3. If the button changed to "Remove", click the "Remove" button for "Sauce Labs Backpack"

**Expected Results (standard behavior — verify if error_user deviates):**
- The button reverts to "Add to cart"
- The cart badge disappears

**Error conditions to check:**
- The "Remove" button click has no effect
- The button remains as "Remove" after clicking
- The cart badge does not decrement

---

#### 3.4 Verify Cart Contents After Adding Items

**Steps:**
1. Navigate to `https://www.saucedemo.com/` and log in as `error_user` with password `secret_sauce`
2. Click "Add to cart" on "Sauce Labs Backpack"
3. Click "Add to cart" on "Sauce Labs Bike Light"
4. Click the cart icon in the header to navigate to `/cart.html`

**Expected Results (standard behavior — verify if error_user deviates):**
- Browser navigates to `/cart.html`
- The cart contains the items that appeared to be added (Sauce Labs Backpack and Sauce Labs Bike Light)
- Each item shows its name, quantity (1), and price

**Error conditions to check:**
- The cart is empty despite items appearing to have been added
- Only some of the items appear in the cart (partial failure)
- Items appear in the cart that were not selected by the user

---

### 4. Product Detail Page

**Starting state for all scenarios in this section:** Fresh browser session, logged in as `error_user`, on
`/inventory.html`.

#### 4.1 Navigate to Product Detail via Product Name Link

**Steps:**
1. Navigate to `https://www.saucedemo.com/` and log in as `error_user` with password `secret_sauce`
2. Click on the product name link "Sauce Labs Backpack"

**Expected Results:**
- Browser navigates to `/inventory-item.html?id=4`
- The page displays the correct product image, name ("Sauce Labs Backpack"), description, price ("$29.99"), and an
  "Add to cart" button
- A "Back to products" button is visible

---

#### 4.2 Add Product to Cart from Product Detail Page

**Steps:**
1. Navigate to `https://www.saucedemo.com/` and log in as `error_user` with password `secret_sauce`
2. Click the name link of "Sauce Labs Backpack" to go to the detail page
3. Click the "Add to cart" button on the detail page

**Expected Results (standard behavior — verify if error_user deviates):**
- The "Add to cart" button changes to a "Remove" button
- The shopping cart icon in the header shows a badge with the number "1"

**Error conditions to check:**
- Button does not change to "Remove" after clicking
- Cart badge does not appear or shows incorrect count
- A JavaScript error is thrown in the browser console

---

#### 4.3 Return to Inventory from Product Detail Page

**Steps:**
1. Navigate to `https://www.saucedemo.com/` and log in as `error_user` with password `secret_sauce`
2. Click on any product name to go to the detail page
3. Click the "Back to products" button

**Expected Results:**
- Browser navigates back to the inventory page (`/inventory.html`)
- All 6 products are displayed in the grid

---

### 5. Shopping Cart Page

**Starting state for all scenarios in this section:** Fresh browser session, logged in as `error_user`.

#### 5.1 View Empty Cart Page

**Steps:**
1. Navigate to `https://www.saucedemo.com/` and log in as `error_user` with password `secret_sauce`
2. Click the cart icon in the header without adding any items

**Expected Results:**
- Browser navigates to `/cart.html`
- The cart item list is empty (no items shown)
- The "Continue Shopping" and "Checkout" buttons are visible
- The cart badge in the header is not visible

---

#### 5.2 Continue Shopping from Cart Page

**Steps:**
1. Navigate to `https://www.saucedemo.com/` and log in as `error_user` with password `secret_sauce`
2. Click the cart icon to navigate to `/cart.html`
3. Click the "Continue Shopping" button

**Expected Results:**
- Browser navigates back to the inventory page (`/inventory.html`)
- All 6 products are displayed

---

#### 5.3 Remove an Item from the Cart Page

**Steps:**
1. Navigate to `https://www.saucedemo.com/` and log in as `error_user` with password `secret_sauce`
2. Attempt to add "Sauce Labs Backpack" to the cart from the inventory page
3. Click the cart icon to navigate to `/cart.html`
4. If the item is present in the cart, click the "Remove" button next to it

**Expected Results (standard behavior — verify if error_user deviates):**
- The item is removed from the cart list
- The cart is now empty
- The cart badge in the header disappears

**Error conditions to check:**
- The "Remove" button click has no effect on the cart page
- The item count does not change after clicking "Remove"
- A JavaScript error is thrown

---

### 6. Checkout Flow (Known Broken Area)

**Starting state for all scenarios in this section:** Fresh browser session, logged in as `error_user` with at least
one item in the cart (if add-to-cart works), on `/cart.html`.

The checkout flow is a key area where `error_user` is expected to encounter errors. Each step should be tested to
identify exactly where the failure occurs.

#### 6.1 Attempt to Access Checkout Page

**Steps:**
1. Navigate to `https://www.saucedemo.com/` and log in as `error_user` with password `secret_sauce`
2. Attempt to add "Sauce Labs Backpack" to the cart
3. Click the cart icon to navigate to `/cart.html`
4. Click the "Checkout" button

**Expected Results (standard behavior — verify if error_user deviates):**
- Browser navigates to `/checkout-step-one.html`
- Page title shows "Checkout: Your Information"
- Three input fields are visible: First Name, Last Name, Zip/Postal Code

**Error conditions to check:**
- The "Checkout" button click has no visible effect
- A JavaScript error is thrown when clicking "Checkout"
- An error message is displayed on the cart page
- The user is redirected to an unexpected page

---

#### 6.2 Fill Checkout Information and Attempt to Continue

**Steps:**
1. Navigate to `https://www.saucedemo.com/` and log in as `error_user` with password `secret_sauce`
2. Add any product to the cart and navigate to `/cart.html`
3. Click the "Checkout" button to reach `/checkout-step-one.html`
4. Fill in "First Name" with `John`
5. Fill in "Last Name" with `Doe`
6. Fill in "Zip/Postal Code" with `12345`
7. Click the "Continue" button

**Expected Results (standard behavior — verify if error_user deviates):**
- Browser navigates to `/checkout-step-two.html` (Checkout Overview)
- The order summary displays the correct item, pricing, and shipping information

**Error conditions to check:**
- The "Continue" button click has no effect
- A JavaScript error is thrown in the browser console
- An error message appears on the checkout information page
- The user cannot proceed past this step

---

#### 6.3 Checkout Information Validation - Empty First Name

**Steps:**
1. Navigate to `https://www.saucedemo.com/` and log in as `error_user` with password `secret_sauce`
2. Add any product to the cart and navigate to `/cart.html`
3. Click the "Checkout" button
4. Leave "First Name" empty, fill "Last Name" with `Doe` and "Zip/Postal Code" with `12345`
5. Click the "Continue" button

**Expected Results:**
- User remains on `/checkout-step-one.html`
- An error message is displayed: "Error: First Name is required"

---

#### 6.4 Checkout Information Validation - All Fields Empty

**Steps:**
1. Navigate to `https://www.saucedemo.com/` and log in as `error_user` with password `secret_sauce`
2. Add any product to the cart and navigate to `/cart.html`
3. Click the "Checkout" button
4. Leave all three fields (First Name, Last Name, Zip/Postal Code) empty
5. Click the "Continue" button

**Expected Results:**
- User remains on `/checkout-step-one.html`
- An error message is displayed: "Error: First Name is required"

---

#### 6.5 Attempt to Complete Full Checkout

**Steps:**
1. Navigate to `https://www.saucedemo.com/` and log in as `error_user` with password `secret_sauce`
2. Add "Sauce Labs Backpack" to the cart
3. Click the cart icon to navigate to `/cart.html`
4. Click "Checkout"
5. Fill in "First Name" with `John`, "Last Name" with `Doe`, "Zip/Postal Code" with `12345`
6. Click "Continue"
7. If on the overview page (`/checkout-step-two.html`), click "Finish"

**Expected Results (standard behavior — verify if error_user deviates):**
- Browser navigates to `/checkout-complete.html`
- Page title shows "Checkout: Complete!"
- A "Thank you for your order!" heading is displayed
- A "Back Home" button is visible

**Error conditions to check:**
- The checkout cannot be completed due to errors at any step
- A JavaScript error is thrown when clicking "Finish"
- The application becomes unresponsive or displays an unexpected error state
- The order confirmation page is never reached

---

#### 6.6 Cancel Checkout from Information Page

**Steps:**
1. Navigate to `https://www.saucedemo.com/` and log in as `error_user` with password `secret_sauce`
2. Add any product to the cart and navigate to `/cart.html`
3. Click the "Checkout" button
4. Fill in some information in the form fields
5. Click the "Cancel" button

**Expected Results:**
- Browser navigates back to the cart page (`/cart.html`)
- The previously added item (if it was successfully added) is still present in the cart

---

### 7. Navigation Menu

**Starting state for all scenarios in this section:** Fresh browser session, logged in as `error_user`, on
`/inventory.html`.

#### 7.1 Open and Close Navigation Menu

**Steps:**
1. Navigate to `https://www.saucedemo.com/` and log in as `error_user` with password `secret_sauce`
2. Click the "Open Menu" (hamburger) button in the top-left
3. Verify the side navigation menu is visible with options: "All Items", "About", "Logout", "Reset App State"
4. Click the "Close Menu" button (X icon)

**Expected Results:**
- After step 2: The side menu slides open and displays all four navigation links
- After step 4: The side menu closes and the main content is fully visible again

---

#### 7.2 Navigate to All Items via Menu

**Steps:**
1. Navigate to `https://www.saucedemo.com/` and log in as `error_user` with password `secret_sauce`
2. Click on any product to navigate to its detail page
3. Click the "Open Menu" hamburger button
4. Click "All Items" in the side menu

**Expected Results:**
- Browser navigates to `/inventory.html`
- All 6 products are displayed in the product grid

---

#### 7.3 Reset App State via Menu

**Steps:**
1. Navigate to `https://www.saucedemo.com/` and log in as `error_user` with password `secret_sauce`
2. Attempt to add two products to the cart
3. Click the "Open Menu" hamburger button
4. Click "Reset App State" in the side menu

**Expected Results (standard behavior — verify if error_user deviates):**
- The cart badge disappears (cart is reset to empty)
- All product "Remove" buttons revert to "Add to cart"
- The user remains on the inventory page

**Error conditions to check:**
- "Reset App State" triggers a JavaScript error
- The page state does not reset correctly (badges or button states remain unchanged)

---

#### 7.4 About Link Opens External Sauce Labs Site

**Steps:**
1. Navigate to `https://www.saucedemo.com/` and log in as `error_user` with password `secret_sauce`
2. Click the "Open Menu" hamburger button
3. Click the "About" link

**Expected Results:**
- The browser navigates to `https://saucelabs.com/`
- The Sauce Labs marketing website is displayed

---

### 8. Error Handling and Console Errors

These scenarios focus specifically on validating how the application surfaces errors to users and whether any
JavaScript errors are logged that would affect the user experience.

#### 8.1 Check for JavaScript Console Errors on Login

**Steps:**
1. Open the browser with developer tools console visible
2. Navigate to `https://www.saucedemo.com/`
3. Log in as `error_user` with password `secret_sauce`
4. Observe the browser console for errors

**Expected Results:**
- No JavaScript errors in the browser console upon login and page load
- If errors are present, they should be logged and compared against `standard_user` behavior

---

#### 8.2 Check for JavaScript Console Errors During Add to Cart

**Steps:**
1. Navigate to `https://www.saucedemo.com/` and log in as `error_user` with password `secret_sauce`
2. Open the browser developer tools console
3. Click "Add to cart" on "Sauce Labs Backpack"
4. Click "Add to cart" on "Sauce Labs Bike Light"
5. Observe the browser console

**Expected Results:**
- No unhandled JavaScript errors appear in the console
- If errors appear, they indicate the source of the broken add-to-cart behavior

---

#### 8.3 Check for JavaScript Console Errors During Checkout

**Steps:**
1. Navigate to `https://www.saucedemo.com/` and log in as `error_user` with password `secret_sauce`
2. Open the browser developer tools console
3. Attempt to add a product to the cart and proceed through the full checkout flow
4. Observe the browser console at each step (add to cart, view cart, checkout information, overview, finish)

**Expected Results:**
- Console errors, if any, are identified at the specific step where they occur
- The error messages provide actionable information about what is failing for `error_user`

---

#### 8.4 Verify User-Facing Error Messages Are Displayed (Not Silent Failures)

**Steps:**
1. Navigate to `https://www.saucedemo.com/` and log in as `error_user` with password `secret_sauce`
2. Attempt to add "Sauce Labs Backpack" to the cart
3. Navigate to `/cart.html` and click "Checkout"
4. Fill in all checkout information and click "Continue"
5. On the overview page (if reached), click "Finish"

**Expected Results:**
- If any operation fails, the user should see a clear, visible error message on screen
- Silent failures (where nothing happens on click with no user feedback) should be flagged as defects
- Error messages should be descriptive enough for a user to understand what went wrong

---
