# SauceDemo – Test Plan for standard_user (POM Edition)

## Application Overview

SauceDemo (`https://www.saucedemo.com/`) is a React-based e-commerce demo application used for Playwright testing practice. All tests in this plan target the `standard_user` account (password: `secret_sauce`).

The application exposes these features:

- **Authentication** – Login page with username/password fields and error messages
- **Product Catalog (Inventory)** – Grid of 6 products with names, descriptions, prices, and "Add to cart" / "Remove" buttons; sortable by name and price
- **Product Detail Page** – Individual product view reachable by clicking a product name or image
- **Shopping Cart** – Cart page listing selected items with quantities, prices, and a "Remove" option
- **Checkout Flow** – Three-step process: Information entry (`/checkout-step-one.html`), Overview (`/checkout-step-two.html`), and Confirmation (`/checkout-complete.html`)
- **Navigation Menu** – Hamburger side menu with "All Items", "About", "Logout", and "Reset App State" links
- **Cart Badge** – Real-time counter in the header showing the number of items currently in the cart

Page Object Models available in `tests/pages/`:
- `LoginPage` – login form interactions and error assertions
- `InventoryPage` – product grid, sort dropdown, cart badge, add/remove
- `CartPage` – cart item list, checkout and continue-shopping navigation, item removal
- `CheckoutPage` – information form, overview step, confirmation step

The base URL is `https://www.saucedemo.com/` as configured in `playwright.config.ts`.

---

## Test Scenarios

### 1. Authentication / Login

*(no Seed – these tests exercise the login flow itself)*

#### 1.1 Successful Login with Valid Credentials

**Starting State:** Fresh browser session, no active session. User is on the login page (`/`).

**Steps:**
1. Navigate to `/`
2. Verify the Username input, Password input, and Login button are all visible
3. Enter `standard_user` in the Username field
4. Enter `secret_sauce` in the Password field
5. Click the Login button

**Expected Results:**
- Browser redirects to `/inventory.html`
- Page title area shows "Products"
- The hamburger menu button ("Open Menu") is visible in the header
- The shopping cart icon is visible in the header
- Exactly 6 product cards are displayed in the grid

---

#### 1.2 Login Fails with Incorrect Password

**Starting State:** Fresh browser session, no active session. User is on the login page (`/`).

**Steps:**
1. Navigate to `/`
2. Enter `standard_user` in the Username field
3. Enter `wrong_password` in the Password field
4. Click the Login button

**Expected Results:**
- User remains on the login page
- An error message is visible containing "Username and password do not match any user in this service"
- Both the Username and Password fields display an error indicator (X icon)

---

#### 1.3 Login Fails with Empty Username

**Starting State:** Fresh browser session, no active session. User is on the login page (`/`).

**Steps:**
1. Navigate to `/`
2. Leave the Username field empty
3. Enter `secret_sauce` in the Password field
4. Click the Login button

**Expected Results:**
- User remains on the login page
- An error message is visible containing "Username is required"

---

#### 1.4 Login Fails with Empty Password

**Starting State:** Fresh browser session, no active session. User is on the login page (`/`).

**Steps:**
1. Navigate to `/`
2. Enter `standard_user` in the Username field
3. Leave the Password field empty
4. Click the Login button

**Expected Results:**
- User remains on the login page
- An error message is visible containing "Password is required"

---

#### 1.5 Login Fails with Both Fields Empty

**Starting State:** Fresh browser session, no active session. User is on the login page (`/`).

**Steps:**
1. Navigate to `/`
2. Leave both Username and Password fields empty
3. Click the Login button

**Expected Results:**
- User remains on the login page
- An error message is visible containing "Username is required"

---

### 2. Access Control

*(no Seed – these tests verify unauthenticated behavior)*

#### 2.1 Direct Navigation to Inventory Without a Session is Blocked

**Starting State:** No active session.

**Steps:**
1. Navigate directly to `/inventory.html` without logging in

**Expected Results:**
- User is redirected to the login page (`/`)
- An error message is displayed indicating the user must log in first (e.g., "You can only access '/inventory.html' when you are logged in")

---

#### 2.2 Direct Navigation to Cart Without a Session is Blocked

**Starting State:** No active session.

**Steps:**
1. Navigate directly to `/cart.html` without logging in

**Expected Results:**
- User is redirected to the login page
- An appropriate error or redirect message is displayed

---

#### 2.3 Direct Navigation to Checkout Without a Session is Blocked

**Starting State:** No active session.

**Steps:**
1. Navigate directly to `/checkout-step-one.html` without logging in

**Expected Results:**
- User is redirected to the login page
- An appropriate error or redirect message is displayed

---

### 3. Product Catalog (Inventory Page)

**Seed:** `tests/seed.spec.ts`

#### 3.1 Inventory Page Displays All Products

**Starting State:** User is logged in and on `/inventory.html`.

**Steps:**
1. Navigate to `/inventory.html`
2. Observe the product grid

**Expected Results:**
- Page title shows "Products"
- Exactly 6 product cards are visible
- Default sort order is "Name (A to Z)"
- Products displayed in order:
  1. Sauce Labs Backpack ($29.99)
  2. Sauce Labs Bike Light ($9.99)
  3. Sauce Labs Bolt T-Shirt ($15.99)
  4. Sauce Labs Fleece Jacket ($49.99)
  5. Sauce Labs Onesie ($7.99)
  6. Test.allTheThings() T-Shirt (Red) ($15.99)
- Each card shows an image, name, description, price, and "Add to cart" button

---

#### 3.2 Sort Products by Name (Z to A)

**Starting State:** User is logged in and on `/inventory.html`.

**Steps:**
1. Navigate to `/inventory.html`
2. Locate the sort dropdown (default value: "Name (A to Z)")
3. Select "Name (Z to A)" from the dropdown

**Expected Results:**
- Product list reorders so "Test.allTheThings() T-Shirt (Red)" appears first
- "Sauce Labs Backpack" appears last
- The sort dropdown label updates to "Name (Z to A)"
- All 6 products remain visible

---

#### 3.3 Sort Products by Price (Low to High)

**Starting State:** User is logged in and on `/inventory.html`.

**Steps:**
1. Navigate to `/inventory.html`
2. Select "Price (low to high)" from the sort dropdown

**Expected Results:**
- Sauce Labs Onesie ($7.99) appears first
- Sauce Labs Fleece Jacket ($49.99) appears last
- All 6 products are visible in ascending price order

---

#### 3.4 Sort Products by Price (High to Low)

**Starting State:** User is logged in and on `/inventory.html`.

**Steps:**
1. Navigate to `/inventory.html`
2. Select "Price (high to low)" from the sort dropdown

**Expected Results:**
- Sauce Labs Fleece Jacket ($49.99) appears first
- Sauce Labs Onesie ($7.99) appears last
- All 6 products are visible in descending price order

---

#### 3.5 Navigate to Product Detail via Product Name

**Starting State:** User is logged in and on `/inventory.html`.

**Steps:**
1. Navigate to `/inventory.html`
2. Click the product name link "Sauce Labs Backpack"

**Expected Results:**
- Browser navigates to `/inventory-item.html?id=4`
- Page displays the product image, name ("Sauce Labs Backpack"), description, price ("$29.99"), and an "Add to cart" button
- A "Back to products" button is visible

---

#### 3.6 Navigate to Product Detail via Product Image

**Starting State:** User is logged in and on `/inventory.html`.

**Steps:**
1. Navigate to `/inventory.html`
2. Click the product image of "Sauce Labs Bike Light"

**Expected Results:**
- Browser navigates to the product detail page for Sauce Labs Bike Light
- Product name, description, price ($9.99), and "Add to cart" button are displayed
- A "Back to products" button is visible

---

#### 3.7 Return to Inventory from Product Detail Page

**Starting State:** User is logged in and on `/inventory.html`.

**Steps:**
1. Navigate to `/inventory.html`
2. Click on any product name to reach the detail page
3. Click the "Back to products" button

**Expected Results:**
- Browser navigates back to `/inventory.html`
- All 6 products are displayed in the grid

---

#### 3.8 Add Product to Cart from Product Detail Page

**Starting State:** User is logged in and on a product detail page (reached by clicking a product on `/inventory.html`).

**Steps:**
1. Navigate to `/inventory.html`
2. Click the name "Sauce Labs Backpack" to open its detail page
3. Click the "Add to cart" button on the detail page

**Expected Results:**
- The "Add to cart" button changes to a "Remove" button
- The cart badge in the header shows "1"

---

#### 3.9 Remove Product from Cart via Product Detail Page

**Starting State:** User is logged in; "Sauce Labs Backpack" has already been added to the cart from its detail page.

**Steps:**
1. Navigate to `/inventory.html`
2. Click the name "Sauce Labs Backpack" to open its detail page
3. Click "Add to cart"
4. Click the "Remove" button (which replaced "Add to cart")

**Expected Results:**
- The button reverts to "Add to cart"
- The cart badge disappears (cart is empty)

---

### 4. Shopping Cart

**Seed:** `tests/seed.spec.ts`

#### 4.1 Add a Single Product to Cart from Inventory

**Starting State:** User is logged in and on `/inventory.html`. Cart is empty.

**Steps:**
1. Navigate to `/inventory.html`
2. Click "Add to cart" on "Sauce Labs Backpack"

**Expected Results:**
- The "Add to cart" button for "Sauce Labs Backpack" changes to "Remove"
- The cart badge shows "1"

---

#### 4.2 Add Multiple Products to Cart

**Starting State:** User is logged in and on `/inventory.html`. Cart is empty.

**Steps:**
1. Navigate to `/inventory.html`
2. Click "Add to cart" on "Sauce Labs Bike Light"
3. Click "Add to cart" on "Sauce Labs Bolt T-Shirt"
4. Click "Add to cart" on "Sauce Labs Onesie"

**Expected Results:**
- Each product's button changes from "Add to cart" to "Remove" after clicking
- The cart badge increments with each addition, showing "3" after all three

---

#### 4.3 Remove a Product from Cart via Inventory Page

**Starting State:** User is logged in and on `/inventory.html`. "Sauce Labs Backpack" is in the cart.

**Steps:**
1. Navigate to `/inventory.html`
2. Click "Add to cart" on "Sauce Labs Backpack" (badge shows "1")
3. Click the "Remove" button that replaced "Add to cart" for "Sauce Labs Backpack"

**Expected Results:**
- The button reverts to "Add to cart"
- The cart badge disappears

---

#### 4.4 View Cart Page with Multiple Items

**Starting State:** User is logged in and on `/inventory.html`. Cart is empty.

**Steps:**
1. Navigate to `/inventory.html`
2. Click "Add to cart" on "Sauce Labs Backpack"
3. Click "Add to cart" on "Sauce Labs Bike Light"
4. Click the shopping cart icon in the header

**Expected Results:**
- Browser navigates to `/cart.html`
- Page title shows "Your Cart"
- Two items are listed: "Sauce Labs Backpack" (qty 1, $29.99) and "Sauce Labs Bike Light" (qty 1, $9.99)
- Each item has a "Remove" button
- "Continue Shopping" and "Checkout" buttons are visible

---

#### 4.5 Remove a Product from Cart on the Cart Page

**Starting State:** User is logged in. Cart contains "Sauce Labs Backpack" and "Sauce Labs Bike Light". User is on `/cart.html`.

**Steps:**
1. Navigate to `/inventory.html`, add "Sauce Labs Backpack" and "Sauce Labs Bike Light" to the cart
2. Click the cart icon to navigate to `/cart.html`
3. Click the "Remove" button next to "Sauce Labs Backpack"

**Expected Results:**
- "Sauce Labs Backpack" is removed from the cart list
- Only "Sauce Labs Bike Light" remains
- The cart badge in the header decrements to "1"

---

#### 4.6 View Empty Cart Page

**Starting State:** User is logged in and on `/inventory.html`. Cart is empty.

**Steps:**
1. Navigate to `/inventory.html`
2. Click the cart icon without adding any items

**Expected Results:**
- Browser navigates to `/cart.html`
- No items are listed in the cart
- "Continue Shopping" and "Checkout" buttons are still present
- The cart badge is not visible in the header

---

#### 4.7 Continue Shopping from Cart Returns to Inventory

**Starting State:** User is logged in. One item has been added to the cart. User is on `/cart.html`.

**Steps:**
1. Navigate to `/inventory.html` and add "Sauce Labs Onesie" to the cart
2. Click the cart icon to navigate to `/cart.html`
3. Click the "Continue Shopping" button

**Expected Results:**
- Browser navigates back to `/inventory.html`
- The previously added item's button still shows "Remove"
- The cart badge still shows "1"

---

### 5. Checkout Flow

**Seed:** `tests/seed.spec.ts`

#### 5.1 Complete Full Checkout Successfully

**Starting State:** User is logged in. "Sauce Labs Backpack" is in the cart. User is on `/cart.html`.

**Steps:**
1. Navigate to `/inventory.html`, add "Sauce Labs Backpack" to the cart
2. Click the cart icon to navigate to `/cart.html`
3. Click the "Checkout" button
4. Verify page title shows "Checkout: Your Information" and URL is `/checkout-step-one.html`
5. Fill in First Name: `John`
6. Fill in Last Name: `Doe`
7. Fill in Zip/Postal Code: `12345`
8. Click the "Continue" button
9. Verify page title shows "Checkout: Overview" and URL is `/checkout-step-two.html`
10. Verify "Sauce Labs Backpack" is listed in the order summary
11. Verify item total shows `$29.99`, tax shows `$2.40`, and total shows `$32.39`
12. Verify payment info shows "SauceCard #31337"
13. Verify shipping info shows "Free Pony Express Delivery!"
14. Click the "Finish" button

**Expected Results:**
- Browser navigates to `/checkout-complete.html`
- Page title shows "Checkout: Complete!"
- Heading reads "Thank you for your order!"
- Confirmation text reads "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
- A "Back Home" button is visible
- The cart badge is no longer displayed

---

#### 5.2 Checkout Information Validation – All Fields Empty

**Starting State:** User is logged in. At least one item is in the cart. User is on `/checkout-step-one.html`.

**Steps:**
1. Navigate to `/inventory.html`, add any product to the cart
2. Navigate to `/cart.html` and click "Checkout"
3. Leave all three fields (First Name, Last Name, Zip/Postal Code) empty
4. Click the "Continue" button

**Expected Results:**
- User remains on `/checkout-step-one.html`
- An error message is visible: "Error: First Name is required"
- Error indicator is shown on the form

---

#### 5.3 Checkout Information Validation – Missing Last Name

**Starting State:** User is logged in. At least one item is in the cart. User is on `/checkout-step-one.html`.

**Steps:**
1. Navigate to `/inventory.html`, add any product to the cart
2. Navigate to `/cart.html` and click "Checkout"
3. Fill in First Name: `John`
4. Leave Last Name empty
5. Fill in Zip/Postal Code: `12345`
6. Click the "Continue" button

**Expected Results:**
- User remains on `/checkout-step-one.html`
- An error message is visible: "Error: Last Name is required"

---

#### 5.4 Checkout Information Validation – Missing Postal Code

**Starting State:** User is logged in. At least one item is in the cart. User is on `/checkout-step-one.html`.

**Steps:**
1. Navigate to `/inventory.html`, add any product to the cart
2. Navigate to `/cart.html` and click "Checkout"
3. Fill in First Name: `John`
4. Fill in Last Name: `Doe`
5. Leave Zip/Postal Code empty
6. Click the "Continue" button

**Expected Results:**
- User remains on `/checkout-step-one.html`
- An error message is visible: "Error: Postal Code is required"

---

#### 5.5 Cancel Checkout from Information Page Returns to Cart

**Starting State:** User is logged in. At least one item is in the cart. User is on `/checkout-step-one.html`.

**Steps:**
1. Navigate to `/inventory.html`, add any product to the cart
2. Navigate to `/cart.html` and click "Checkout"
3. Fill in some data in the form fields
4. Click the "Cancel" button

**Expected Results:**
- Browser navigates back to `/cart.html`
- The previously added item is still present in the cart

---

#### 5.6 Cancel Checkout from Overview Page Returns to Inventory

**Starting State:** User is logged in. "Sauce Labs Onesie" is in the cart. User is on `/checkout-step-two.html`.

**Steps:**
1. Navigate to `/inventory.html`, add "Sauce Labs Onesie" to the cart
2. Navigate to `/cart.html` and click "Checkout"
3. Fill in First Name: `Jane`, Last Name: `Smith`, Zip/Postal Code: `99999`
4. Click "Continue" to reach `/checkout-step-two.html`
5. Click the "Cancel" button on the overview page

**Expected Results:**
- Browser navigates back to `/inventory.html`
- The cart badge still shows "1" (cart still contains "Sauce Labs Onesie")

---

#### 5.7 Back Home After Order Confirmation Returns to Inventory

**Starting State:** User is logged in and has just completed a checkout (on `/checkout-complete.html`).

**Steps:**
1. Complete a full checkout as described in scenario 5.1
2. On `/checkout-complete.html`, click the "Back Home" button

**Expected Results:**
- Browser navigates to `/inventory.html`
- All 6 products are displayed
- The cart badge is not visible (cart is empty after order completion)

---

### 6. Navigation Menu

**Seed:** `tests/seed.spec.ts`

#### 6.1 Open and Close the Hamburger Navigation Menu

**Starting State:** User is logged in and on `/inventory.html`.

**Steps:**
1. Navigate to `/inventory.html`
2. Click the "Open Menu" hamburger button in the top-left corner
3. Verify the side navigation menu is visible with all four links: "All Items", "About", "Logout", "Reset App State"
4. Click the "Close Menu" button (X icon) inside the side menu

**Expected Results:**
- After step 2: Side menu slides open and all four links are visible
- After step 4: Side menu closes and the main content is fully visible again

---

#### 6.2 "All Items" Link Navigates to Inventory

**Starting State:** User is logged in and currently on a product detail page.

**Steps:**
1. Navigate to `/inventory.html`
2. Click any product name to navigate to its detail page
3. Click the "Open Menu" hamburger button
4. Click "All Items" in the side menu

**Expected Results:**
- Browser navigates to `/inventory.html`
- All 6 products are displayed in the product grid

---

#### 6.3 Logout via Navigation Menu

**Starting State:** User is logged in and on `/inventory.html`.

**Steps:**
1. Navigate to `/inventory.html`
2. Click the "Open Menu" hamburger button
3. Click "Logout" in the side menu

**Expected Results:**
- User is redirected to the login page (`/`)
- The login form is displayed
- Navigating directly to `/inventory.html` would redirect back to the login page

---

#### 6.4 "Reset App State" Clears Cart

**Starting State:** User is logged in and on `/inventory.html`. Two products have been added to the cart.

**Steps:**
1. Navigate to `/inventory.html`
2. Click "Add to cart" on "Sauce Labs Backpack" and "Sauce Labs Bike Light" (badge shows "2")
3. Click the "Open Menu" hamburger button
4. Click "Reset App State" in the side menu

**Expected Results:**
- The cart badge disappears (cart is reset to empty)
- All product buttons that previously showed "Remove" revert to "Add to cart"
- The user remains on the inventory page

---

#### 6.5 "About" Link Navigates to Sauce Labs Site

**Starting State:** User is logged in and on `/inventory.html`.

**Steps:**
1. Navigate to `/inventory.html`
2. Click the "Open Menu" hamburger button
3. Click the "About" link

**Expected Results:**
- Browser navigates to `https://saucelabs.com/`
- The Sauce Labs website is displayed

---

### 7. Cart Badge and State Persistence

**Seed:** `tests/seed.spec.ts`

#### 7.1 Cart Badge Count Updates Correctly on Add and Remove

**Starting State:** User is logged in and on `/inventory.html`. Cart is empty.

**Steps:**
1. Navigate to `/inventory.html`
2. Verify no cart badge is visible
3. Click "Add to cart" for "Sauce Labs Backpack" — verify badge shows "1"
4. Click "Add to cart" for "Sauce Labs Bike Light" — verify badge shows "2"
5. Click "Add to cart" for "Sauce Labs Onesie" — verify badge shows "3"
6. Click "Remove" for "Sauce Labs Bike Light" — verify badge shows "2"

**Expected Results:**
- Badge increments by 1 for each item added
- Badge decrements by 1 for each item removed
- Badge is not visible when the cart is empty

---

#### 7.2 Cart Contents Persist Across Page Navigation

**Starting State:** User is logged in and on `/inventory.html`. Cart is empty.

**Steps:**
1. Navigate to `/inventory.html`
2. Click "Add to cart" for "Sauce Labs Fleece Jacket" (badge shows "1")
3. Click the name "Sauce Labs Onesie" to navigate to its detail page
4. Click "Add to cart" on the detail page (badge shows "2")
5. Click "Back to products" to return to `/inventory.html`
6. Click the cart icon to navigate to `/cart.html`

**Expected Results:**
- Both "Sauce Labs Fleece Jacket" and "Sauce Labs Onesie" are listed in the cart
- Cart badge showed "2" throughout navigation
- Item count on `/cart.html` is 2
