# SauceDemo – Comprehensive Test Plan for standard_user

## Application Overview

SauceDemo (https://www.saucedemo.com/) is a React-based e-commerce demo application used for testing purposes. The application simulates a shopping experience for a user named `standard_user` (password: `secret_sauce`).

The application provides the following features:

- **Authentication**: Login page with username/password fields and multi-user support
- **Product Catalog (Inventory)**: Grid of 6 products with names, descriptions, prices, and "Add to cart" buttons
- **Product Sorting**: Sort products by Name (A to Z), Name (Z to A), Price (low to high), Price (high to low)
- **Product Detail Page**: Individual product page with image, description, price, and add/remove cart buttons
- **Shopping Cart**: Cart page showing selected items with quantities, prices, and remove option
- **Checkout Flow**: Three-step checkout process (Information, Overview, Confirmation)
- **Navigation Menu**: Hamburger menu with All Items, About, Logout, Reset App State links
- **Cart Badge**: Real-time counter showing number of items in the cart

The base URL is configured in `playwright.config.ts` as `https://www.saucedemo.com/`.

---

## Test Scenarios

### 1. Authentication

**Seed:** `tests/seed.spec.ts`

#### 1.1 Successful Login with Valid Credentials

**Starting state:** Fresh browser session, no prior authentication.

**Steps:**
1. Navigate to `https://www.saucedemo.com/`
2. Verify the login page is displayed with a "Username" input, "Password" input, and "Login" button
3. Type `standard_user` in the "Username" field
4. Type `secret_sauce` in the "Password" field
5. Click the "Login" button

**Expected Results:**
- Browser navigates to `/inventory.html`
- Page title area shows "Products"
- The hamburger menu button ("Open Menu") is visible in the header
- The shopping cart icon is visible in the header
- Six product items are displayed in the grid

---

#### 1.2 Login with Incorrect Password

**Starting state:** Fresh browser session, no prior authentication.

**Steps:**
1. Navigate to `https://www.saucedemo.com/`
2. Type `standard_user` in the "Username" field
3. Type `wrong_password` in the "Password" field
4. Click the "Login" button

**Expected Results:**
- User remains on the login page (`/`)
- An error message is displayed containing "Username and password do not match any user in this service"
- The username and password fields are highlighted with an error indicator (X icon)

---

#### 1.3 Login with Empty Username

**Starting state:** Fresh browser session, no prior authentication.

**Steps:**
1. Navigate to `https://www.saucedemo.com/`
2. Leave the "Username" field empty
3. Type `secret_sauce` in the "Password" field
4. Click the "Login" button

**Expected Results:**
- User remains on the login page
- An error message is displayed containing "Username is required"

---

#### 1.4 Login with Empty Password

**Starting state:** Fresh browser session, no prior authentication.

**Steps:**
1. Navigate to `https://www.saucedemo.com/`
2. Type `standard_user` in the "Username" field
3. Leave the "Password" field empty
4. Click the "Login" button

**Expected Results:**
- User remains on the login page
- An error message is displayed containing "Password is required"

---

#### 1.5 Login with Both Fields Empty

**Starting state:** Fresh browser session, no prior authentication.

**Steps:**
1. Navigate to `https://www.saucedemo.com/`
2. Leave both "Username" and "Password" fields empty
3. Click the "Login" button

**Expected Results:**
- User remains on the login page
- An error message is displayed containing "Username is required"

---

#### 1.6 Redirect to Login When Accessing Protected Page Without Authentication

**Starting state:** Fresh browser session, no prior authentication.

**Steps:**
1. Navigate directly to `https://www.saucedemo.com/inventory.html` without logging in

**Expected Results:**
- User is redirected to the login page
- An error message is displayed indicating the user must log in first

---

#### 1.7 Logout via Navigation Menu

**Starting state:** Logged in as `standard_user`, on the inventory page.

**Steps:**
1. Click the hamburger menu button ("Open Menu") in the top-left corner
2. Verify the side menu opens and shows links: "All Items", "About", "Logout", "Reset App State"
3. Click the "Logout" link

**Expected Results:**
- User is redirected to the login page (`/`)
- The login form is displayed and the user is no longer authenticated
- Navigating to `/inventory.html` would redirect back to login

---

### 2. Product Catalog (Inventory Page)

**Starting state for all scenarios in this section:** Logged in as `standard_user`, on `/inventory.html`.

#### 2.1 Verify All Products Are Displayed

**Steps:**
1. Log in as `standard_user` with password `secret_sauce`
2. Observe the product grid on the inventory page

**Expected Results:**
- Exactly 6 products are displayed
- Each product shows: product image, product name (as a clickable link), a short description, a price in `$X.XX` format, and an "Add to cart" button
- The default sort order is "Name (A to Z)", displaying products alphabetically:
  1. Sauce Labs Backpack ($29.99)
  2. Sauce Labs Bike Light ($9.99)
  3. Sauce Labs Bolt T-Shirt ($15.99)
  4. Sauce Labs Fleece Jacket ($49.99)
  5. Sauce Labs Onesie ($7.99)
  6. Test.allTheThings() T-Shirt (Red) ($15.99)

---

#### 2.2 Sort Products by Name (Z to A)

**Steps:**
1. Log in and navigate to the inventory page
2. Locate the sort dropdown (currently showing "Name (A to Z)")
3. Select "Name (Z to A)" from the dropdown

**Expected Results:**
- The product list reorders so that "Test.allTheThings() T-Shirt (Red)" appears first
- "Sauce Labs Backpack" appears last
- The dropdown label updates to show "Name (Z to A)"

---

#### 2.3 Sort Products by Price (Low to High)

**Steps:**
1. Log in and navigate to the inventory page
2. Select "Price (low to high)" from the sort dropdown

**Expected Results:**
- The product with the lowest price appears first: Sauce Labs Onesie ($7.99)
- The product with the highest price appears last: Sauce Labs Fleece Jacket ($49.99)
- All 6 products are visible in ascending price order

---

#### 2.4 Sort Products by Price (High to Low)

**Steps:**
1. Log in and navigate to the inventory page
2. Select "Price (high to low)" from the sort dropdown

**Expected Results:**
- Sauce Labs Fleece Jacket ($49.99) appears first
- Sauce Labs Onesie ($7.99) appears last
- All 6 products are visible in descending price order

---

### 3. Product Detail Page

**Starting state:** Logged in as `standard_user`, on `/inventory.html`.

#### 3.1 Navigate to Product Detail via Product Name Link

**Steps:**
1. Log in and navigate to the inventory page
2. Click on the product name link "Sauce Labs Backpack"

**Expected Results:**
- Browser navigates to `/inventory-item.html?id=4`
- The page displays the product image, name ("Sauce Labs Backpack"), description, price ("$29.99"), and an "Add to cart" button
- A "Back to products" button is visible in the header area

---

#### 3.2 Navigate to Product Detail via Product Image

**Steps:**
1. Log in and navigate to the inventory page
2. Click on the product image of "Sauce Labs Bike Light"

**Expected Results:**
- Browser navigates to the product detail page for Sauce Labs Bike Light
- All product details are displayed correctly (name, description, price $9.99, "Add to cart" button)

---

#### 3.3 Add Product to Cart from Detail Page

**Steps:**
1. Log in and navigate to the inventory page
2. Click the name link of "Sauce Labs Backpack" to go to the detail page
3. Click the "Add to cart" button on the detail page

**Expected Results:**
- The "Add to cart" button changes to a "Remove" button
- The shopping cart icon in the header shows a badge with the number "1"

---

#### 3.4 Remove Product from Cart via Detail Page

**Steps:**
1. Log in and navigate to the inventory page
2. Click the name link of "Sauce Labs Backpack" to go to the detail page
3. Click "Add to cart"
4. Click the "Remove" button (which replaced "Add to cart")

**Expected Results:**
- The "Remove" button changes back to "Add to cart"
- The shopping cart badge disappears (no items in cart)

---

#### 3.5 Return to Inventory from Product Detail Page

**Steps:**
1. Log in and navigate to the inventory page
2. Click on any product name to go to the detail page
3. Click the "Back to products" button

**Expected Results:**
- Browser navigates back to the inventory page (`/inventory.html`)
- All 6 products are displayed in the grid

---

### 4. Shopping Cart

**Starting state:** Logged in as `standard_user`.

#### 4.1 Add a Single Product to Cart from Inventory

**Steps:**
1. Log in and navigate to the inventory page
2. Click "Add to cart" on "Sauce Labs Backpack"

**Expected Results:**
- The "Add to cart" button for "Sauce Labs Backpack" changes to "Remove"
- The cart badge in the header shows "1"

---

#### 4.2 Add Multiple Products to Cart

**Steps:**
1. Log in and navigate to the inventory page
2. Click "Add to cart" on "Sauce Labs Bike Light"
3. Click "Add to cart" on "Sauce Labs Bolt T-Shirt"
4. Click "Add to cart" on "Sauce Labs Onesie"

**Expected Results:**
- Each clicked product's button changes from "Add to cart" to "Remove"
- The cart badge increments with each addition, showing "3" after all three are added

---

#### 4.3 Remove a Product from Cart via Inventory Page

**Steps:**
1. Log in and navigate to the inventory page
2. Click "Add to cart" on "Sauce Labs Backpack" (badge shows "1")
3. Click the "Remove" button for "Sauce Labs Backpack"

**Expected Results:**
- The button reverts to "Add to cart"
- The cart badge disappears (or decrements if other items were added)

---

#### 4.4 View Cart Page with Items

**Steps:**
1. Log in and navigate to the inventory page
2. Click "Add to cart" on "Sauce Labs Backpack"
3. Click "Add to cart" on "Sauce Labs Bike Light"
4. Click the cart icon in the header

**Expected Results:**
- Browser navigates to `/cart.html`
- Page title shows "Your Cart"
- Two items are listed: "Sauce Labs Backpack" ($29.99, qty 1) and "Sauce Labs Bike Light" ($9.99, qty 1)
- Each item shows a "Remove" button
- "Continue Shopping" and "Checkout" buttons are visible

---

#### 4.5 Remove a Product from Cart on the Cart Page

**Steps:**
1. Log in and navigate to the inventory page
2. Click "Add to cart" on "Sauce Labs Backpack" and "Sauce Labs Bike Light"
3. Click the cart icon to navigate to `/cart.html`
4. Click the "Remove" button next to "Sauce Labs Backpack"

**Expected Results:**
- "Sauce Labs Backpack" is removed from the cart list
- Only "Sauce Labs Bike Light" remains in the cart
- The cart badge in the header decrements to "1"

---

#### 4.6 View Empty Cart Page

**Steps:**
1. Log in and navigate to the inventory page
2. Click the cart icon without adding any items

**Expected Results:**
- Browser navigates to `/cart.html`
- The cart item list is empty (no items shown)
- The "Continue Shopping" and "Checkout" buttons are still present
- The cart badge in the header is not visible

---

#### 4.7 Continue Shopping from Cart Page

**Steps:**
1. Log in and navigate to the inventory page
2. Add one item to the cart
3. Click the cart icon to navigate to `/cart.html`
4. Click the "Continue Shopping" button

**Expected Results:**
- Browser navigates back to the inventory page (`/inventory.html`)
- The previously added item's button still shows "Remove"
- The cart badge still shows "1"

---

### 5. Checkout Flow

**Starting state:** Logged in as `standard_user` with at least one item in the cart, on `/cart.html`.

#### 5.1 Complete Full Checkout Successfully

**Steps:**
1. Log in and add "Sauce Labs Backpack" to the cart
2. Click the cart icon to navigate to `/cart.html`
3. Click the "Checkout" button
4. Verify the page navigates to `/checkout-step-one.html` with title "Checkout: Your Information"
5. Fill in "First Name" with `John`
6. Fill in "Last Name" with `Doe`
7. Fill in "Zip/Postal Code" with `12345`
8. Click the "Continue" button
9. Verify the page navigates to `/checkout-step-two.html` with title "Checkout: Overview"
10. Verify the order summary shows "Sauce Labs Backpack", item total "$29.99", tax "$2.40", and total "$32.39"
11. Verify payment information shows "SauceCard #31337"
12. Verify shipping information shows "Free Pony Express Delivery!"
13. Click the "Finish" button

**Expected Results:**
- Browser navigates to `/checkout-complete.html`
- Page title shows "Checkout: Complete!"
- A "Thank you for your order!" heading is displayed
- Confirmation text reads "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
- A "Back Home" button is visible
- The cart badge is no longer displayed in the header

---

#### 5.2 Checkout Information Validation - All Fields Empty

**Steps:**
1. Log in and add any product to the cart
2. Navigate to `/cart.html` and click "Checkout"
3. Leave all three fields (First Name, Last Name, Zip/Postal Code) empty
4. Click the "Continue" button

**Expected Results:**
- User remains on `/checkout-step-one.html`
- An error message is displayed: "Error: First Name is required"
- The form fields are highlighted with error indicators

---

#### 5.3 Checkout Information Validation - Missing Last Name

**Steps:**
1. Log in and add any product to the cart
2. Navigate to `/cart.html` and click "Checkout"
3. Fill in "First Name" with `John`
4. Leave "Last Name" empty
5. Fill in "Zip/Postal Code" with `12345`
6. Click the "Continue" button

**Expected Results:**
- User remains on `/checkout-step-one.html`
- An error message is displayed: "Error: Last Name is required"

---

#### 5.4 Checkout Information Validation - Missing Postal Code

**Steps:**
1. Log in and add any product to the cart
2. Navigate to `/cart.html` and click "Checkout"
3. Fill in "First Name" with `John`
4. Fill in "Last Name" with `Doe`
5. Leave "Zip/Postal Code" empty
6. Click the "Continue" button

**Expected Results:**
- User remains on `/checkout-step-one.html`
- An error message is displayed: "Error: Postal Code is required"

---

#### 5.5 Cancel Checkout from Information Page

**Steps:**
1. Log in and add any product to the cart
2. Navigate to `/cart.html` and click "Checkout"
3. Fill in some information in the form fields
4. Click the "Cancel" button

**Expected Results:**
- Browser navigates back to the cart page (`/cart.html`)
- The previously added item is still present in the cart

---

#### 5.6 Cancel Checkout from Overview Page

**Steps:**
1. Log in and add "Sauce Labs Onesie" to the cart
2. Navigate to `/cart.html` and click "Checkout"
3. Fill in all required fields (First Name: `Jane`, Last Name: `Smith`, Zip: `99999`)
4. Click "Continue" to reach the overview page (`/checkout-step-two.html`)
5. Click the "Cancel" button on the overview page

**Expected Results:**
- Browser navigates back to the inventory page (`/inventory.html`)
- The cart still contains "Sauce Labs Onesie" (badge shows "1")

---

#### 5.7 Back Home Button Returns to Inventory After Order Confirmation

**Steps:**
1. Log in and complete a full checkout (steps from scenario 5.1)
2. On the order confirmation page (`/checkout-complete.html`), click "Back Home"

**Expected Results:**
- Browser navigates to the inventory page (`/inventory.html`)
- All 6 products are displayed
- The cart badge is not visible (cart is empty after order)

---

### 6. Navigation Menu

**Starting state:** Logged in as `standard_user`, on `/inventory.html`.

#### 6.1 Open and Close Navigation Menu

**Steps:**
1. Log in and navigate to the inventory page
2. Click the "Open Menu" (hamburger) button in the top-left
3. Verify the side navigation menu is visible with options: "All Items", "About", "Logout", "Reset App State"
4. Click the "Close Menu" button (X icon)

**Expected Results:**
- After step 2: The side menu slides open and displays all four navigation links
- After step 4: The side menu closes and the main content is fully visible again

---

#### 6.2 Navigate to All Items via Menu

**Steps:**
1. Log in and click on a product to navigate to a detail page
2. Click the "Open Menu" hamburger button
3. Click "All Items" in the side menu

**Expected Results:**
- Browser navigates to `/inventory.html`
- All 6 products are displayed in the product grid

---

#### 6.3 Reset App State via Menu

**Steps:**
1. Log in and add two products to the cart (cart badge shows "2")
2. Click the "Open Menu" hamburger button
3. Click "Reset App State" in the side menu

**Expected Results:**
- The cart badge disappears (cart is reset to empty)
- All product "Remove" buttons revert to "Add to cart"
- The user remains on the inventory page

---

#### 6.4 About Link Opens External Sauce Labs Site

**Steps:**
1. Log in and navigate to the inventory page
2. Click the "Open Menu" hamburger button
3. Click the "About" link

**Expected Results:**
- The browser navigates to `https://saucelabs.com/`
- The Sauce Labs marketing website is displayed

---

### 7. Cart Badge and State Persistence

**Starting state:** Logged in as `standard_user`.

#### 7.1 Cart Badge Reflects Total Item Count Correctly

**Steps:**
1. Log in and navigate to the inventory page
2. Verify no cart badge is visible initially
3. Click "Add to cart" for "Sauce Labs Backpack" — verify badge shows "1"
4. Click "Add to cart" for "Sauce Labs Bike Light" — verify badge shows "2"
5. Click "Add to cart" for "Sauce Labs Onesie" — verify badge shows "3"
6. Click "Remove" for "Sauce Labs Bike Light" — verify badge shows "2"

**Expected Results:**
- The badge count increments by 1 for each item added and decrements by 1 for each item removed
- The badge disappears when the cart is empty

---

#### 7.2 Cart Contents Persist When Navigating Between Pages

**Steps:**
1. Log in and add "Sauce Labs Fleece Jacket" to the cart on the inventory page
2. Navigate to the detail page of "Sauce Labs Onesie" and add it to the cart
3. Navigate back to the inventory page using "Back to products"
4. Click the cart icon to view the cart

**Expected Results:**
- Both "Sauce Labs Fleece Jacket" and "Sauce Labs Onesie" are present in the cart
- The cart badge shows "2"
