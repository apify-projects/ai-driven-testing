# Sauce Demo E-Commerce Application - Comprehensive Test Plan

## Application Overview

Sauce Demo is a React-based e-commerce application designed for learning and practicing automated testing. The application simulates an online store selling Sauce Labs merchandise and provides multiple user accounts with different behavior patterns for testing purposes.

### Key Features:
- **User Authentication**: Login with multiple test user accounts
- **Product Catalog**: Display of 6 products with filtering and sorting capabilities
- **Shopping Cart**: Add/remove items, view cart contents
- **Checkout Process**: Multi-step checkout with customer information and order confirmation
- **User Menu**: Navigation, logout, and app state reset functionality
- **Product Details**: Individual product pages with descriptions and pricing
- **Responsive Layout**: Social media links and footer information

### Test User Accounts:
- `standard_user` - Normal user with standard behavior
- `locked_out_user` - Account that cannot log in
- `problem_user` - User with visual rendering issues
- `performance_glitch_user` - User experiencing performance delays
- `error_user` - User seeing error messages
- `visual_user` - User with visual discrepancies
- Password: `secret_sauce` (for all users)

---

## Test Scenarios

### 1. Authentication and Login

#### 1.1 Successful Login with Standard User
**Steps:**
1. Navigate to https://www.saucedemo.com
2. Verify login page displays "Swag Labs" title
3. Verify username field is visible and labeled
4. Verify password field is visible and labeled
5. Verify accepted usernames list is displayed
6. Verify password hint is displayed
7. Enter "standard_user" in the username field
8. Enter "secret_sauce" in the password field
9. Click the Login button
10. Wait for page navigation to complete

**Expected Results:**
- Login page loads successfully
- Accepted usernames and password are clearly displayed
- User is successfully authenticated
- Page redirects to inventory page (https://www.saucedemo.com/inventory.html)
- Inventory page displays product list with 6 items
- Username and password fields are cleared

---

#### 1.2 Failed Login with Invalid Username
**Steps:**
1. Navigate to https://www.saucedemo.com
2. Enter "invalid_user" in the username field
3. Enter "secret_sauce" in the password field
4. Click the Login button
5. Wait for error response

**Expected Results:**
- Error message appears indicating invalid credentials
- User remains on login page
- User is not authenticated
- Page URL remains at login page

---

#### 1.3 Failed Login with Invalid Password
**Steps:**
1. Navigate to https://www.saucedemo.com
2. Enter "standard_user" in the username field
3. Enter "wrong_password" in the password field
4. Click the Login button

**Expected Results:**
- Error message appears indicating invalid credentials
- User remains on login page
- User is not authenticated

---

#### 1.4 Login with Locked Out User
**Steps:**
1. Navigate to https://www.saucedemo.com
2. Enter "locked_out_user" in the username field
3. Enter "secret_sauce" in the password field
4. Click the Login button

**Expected Results:**
- Error message displays indicating user is locked out
- User remains on login page
- User cannot access the inventory

---

#### 1.5 Empty Field Validation on Login
**Steps:**
1. Navigate to https://www.saucedemo.com
2. Leave username field empty
3. Leave password field empty
4. Click the Login button

**Expected Results:**
- Appropriate error message or validation message appears
- User remains on login page
- Fields display placeholder or helper text

---

### 2. Product Inventory and Display

#### 2.1 Product List Displays Correctly
**Steps:**
1. Log in with standard_user credentials
2. Verify inventory page loads
3. Count visible products on the page
4. Verify each product displays: image, name, description, price, and action button

**Expected Results:**
- Inventory page displays exactly 6 products
- All products are visible in a grid layout
- Each product displays:
  - Product image
  - Product name
  - Product description
  - Product price (in USD format like $X.XX)
  - "Add to cart" button
- Products include: Backpack, Bike Light, Bolt T-Shirt, Fleece Jacket, Onesie, Test.allTheThings() T-Shirt

---

#### 2.2 Product Sorting by Name (A to Z)
**Steps:**
1. Log in with standard_user credentials
2. Verify inventory page is displayed
3. Click on the sort dropdown
4. Select "Name (A to Z)"
5. Observe the order of products

**Expected Results:**
- Sort dropdown changes to "Name (A to Z)"
- Products are sorted alphabetically by name
- First product is "Sauce Labs Backpack"
- Last product is "Test.allTheThings() T-Shirt (Red)"
- Sort is applied immediately without page reload

---

#### 2.3 Product Sorting by Name (Z to A)
**Steps:**
1. Log in with standard_user credentials
2. Click on the sort dropdown
3. Select "Name (Z to A)"
4. Observe the order of products

**Expected Results:**
- Sort dropdown changes to "Name (Z to A)"
- Products are sorted in reverse alphabetical order
- First product is "Test.allTheThings() T-Shirt (Red)"
- Last product is "Sauce Labs Backpack"

---

#### 2.4 Product Sorting by Price (Low to High)
**Steps:**
1. Log in with standard_user credentials
2. Click on the sort dropdown
3. Select "Price (low to high)"
4. Observe the order of products

**Expected Results:**
- Sort dropdown changes to "Price (low to high)"
- Products are sorted by price in ascending order
- First product is "Sauce Labs Onesie" ($7.99)
- Last product is "Sauce Labs Fleece Jacket" ($49.99)

---

#### 2.5 Product Sorting by Price (High to Low)
**Steps:**
1. Log in with standard_user credentials
2. Click on the sort dropdown
3. Select "Price (high to low)"
4. Observe the order of products

**Expected Results:**
- Sort dropdown changes to "Price (high to low)"
- Products are sorted by price in descending order
- First product is "Sauce Labs Fleece Jacket" ($49.99)
- Last product is "Sauce Labs Onesie" ($7.99)

---

### 3. Product Details Page

#### 3.1 View Product Details
**Steps:**
1. Log in with standard_user credentials
2. Click on any product name (e.g., "Sauce Labs Fleece Jacket")
3. Wait for product details page to load
4. Verify all details are displayed

**Expected Results:**
- Page navigates to product details page (URL contains ?id=X)
- Product image is displayed
- Product name is displayed
- Product description is displayed
- Product price is displayed
- "Add to cart" button is visible
- "Back to products" button is visible in the header

---

#### 3.2 Back to Products Navigation
**Steps:**
1. Log in with standard_user credentials
2. Click on a product name to view details
3. Click the "Back to products" button
4. Verify inventory page is displayed

**Expected Results:**
- User is taken back to the inventory page
- URL changes to inventory.html
- All 6 products are visible
- Sort preference is maintained from before navigation

---

### 4. Add to Cart Functionality

#### 4.1 Add Single Item to Cart
**Steps:**
1. Log in with standard_user credentials
2. Click "Add to cart" button for "Sauce Labs Backpack"
3. Verify cart indicator updates
4. Verify button text changes to "Remove"

**Expected Results:**
- Cart badge/counter appears in the header showing "1"
- Button text changes from "Add to cart" to "Remove"
- No page navigation occurs
- Product remains visible in inventory

---

#### 4.2 Add Multiple Items to Cart
**Steps:**
1. Log in with standard_user credentials
2. Click "Add to cart" for "Sauce Labs Backpack" ($29.99)
3. Click "Add to cart" for "Sauce Labs Bike Light" ($9.99)
4. Click "Add to cart" for "Sauce Labs Bolt T-Shirt" ($15.99)
5. Verify cart counter shows correct total

**Expected Results:**
- Cart counter shows "3"
- All three "Add to cart" buttons change to "Remove"
- Each product can be added independently
- Cart updates immediately

---

#### 4.3 Add Same Item Twice
**Steps:**
1. Log in with standard_user credentials
2. Click "Add to cart" for "Sauce Labs Backpack"
3. Click "Add to cart" for "Sauce Labs Backpack" again
4. View the cart

**Expected Results:**
- First click adds item, button shows "Remove"
- Second click either shows quantity increase or prevents duplicate addition
- Cart displays correct item(s) and quantity

---

#### 4.4 Remove Item from Inventory Page
**Steps:**
1. Log in with standard_user credentials
2. Click "Add to cart" for "Sauce Labs Backpack"
3. Verify cart shows "1"
4. Click the "Remove" button for the same product
5. Verify cart updates

**Expected Results:**
- Button changes back to "Add to cart"
- Cart counter shows "0" or disappears
- Product remains visible in inventory
- No page navigation occurs

---

### 5. Shopping Cart Page

#### 5.1 View Cart with Items
**Steps:**
1. Log in with standard_user credentials
2. Add "Sauce Labs Backpack" to cart
3. Click on the cart icon/counter
4. Verify cart page displays

**Expected Results:**
- Page navigates to cart page (URL: cart.html)
- Page title shows "Your Cart"
- Cart displays the added item(s) with:
  - Quantity (QTY column)
  - Product name
  - Product description
  - Product price
  - Remove button
- "Continue Shopping" button is visible
- "Checkout" button is visible
- Cart total or item total is displayed

---

#### 5.2 View Empty Cart
**Steps:**
1. Log in with standard_user credentials
2. Do not add any items
3. Click on the cart icon
4. Verify cart page displays

**Expected Results:**
- Page navigates to cart page
- Message indicates cart is empty or no items are displayed
- "Continue Shopping" button is visible
- "Checkout" button may be disabled or visible

---

#### 5.3 Remove Item from Cart
**Steps:**
1. Log in with standard_user credentials
2. Add "Sauce Labs Backpack" and "Sauce Labs Bike Light" to cart
3. Navigate to cart page
4. Click "Remove" button for one item
5. Verify cart updates

**Expected Results:**
- Item is removed from cart
- Cart counter updates (shows "1" instead of "2")
- Remaining item still displays in cart
- Page updates without full reload

---

#### 5.4 Continue Shopping from Cart
**Steps:**
1. Log in with standard_user credentials
2. Add an item to cart
3. Navigate to cart page
4. Click "Continue Shopping" button
5. Verify inventory page is displayed

**Expected Results:**
- User returns to inventory page
- Cart still shows the item count
- All products are visible
- Sort preference is maintained

---

### 6. Checkout Process - Step One (Shipping Information)

#### 6.1 Successful Checkout Step One
**Steps:**
1. Log in with standard_user credentials
2. Add "Sauce Labs Backpack" to cart
3. Navigate to cart page
4. Click "Checkout" button
5. Verify checkout page displays
6. Enter "John" in First Name field
7. Enter "Doe" in Last Name field
8. Enter "12345" in Zip/Postal Code field
9. Click "Continue" button
10. Verify page advances to step two

**Expected Results:**
- Page navigates to checkout-step-one.html
- Page title shows "Checkout: Your Information"
- Three input fields are displayed:
  - First Name
  - Last Name
  - Zip/Postal Code
- "Cancel" button is visible to go back
- "Continue" button is visible
- All fields accept input
- Page advances to step two with valid data

---

#### 6.2 Checkout with Missing First Name
**Steps:**
1. Log in with standard_user credentials
2. Add an item to cart
3. Navigate to checkout page
4. Leave First Name empty
5. Enter "Doe" in Last Name
6. Enter "12345" in Zip/Postal Code
7. Click "Continue" button

**Expected Results:**
- Error message appears indicating "First Name is required"
- User remains on checkout step one
- Form data is preserved for other fields

---

#### 6.3 Checkout with Missing Last Name
**Steps:**
1. Log in with standard_user credentials
2. Add an item to cart
3. Navigate to checkout page
4. Enter "John" in First Name
5. Leave Last Name empty
6. Enter "12345" in Zip/Postal Code
7. Click "Continue" button

**Expected Results:**
- Error message appears indicating "Last Name is required"
- User remains on checkout step one
- First Name value is preserved

---

#### 6.4 Checkout with Missing Zip Code
**Steps:**
1. Log in with standard_user credentials
2. Add an item to cart
3. Navigate to checkout page
4. Enter "John" in First Name
5. Enter "Doe" in Last Name
6. Leave Zip/Postal Code empty
7. Click "Continue" button

**Expected Results:**
- Error message appears indicating "Postal Code is required"
- User remains on checkout step one
- Previous field values are preserved

---

#### 6.5 Cancel Checkout - Return to Cart
**Steps:**
1. Log in with standard_user credentials
2. Add an item to cart
3. Navigate to checkout page
4. Enter sample data in all fields
5. Click "Cancel" button

**Expected Results:**
- User returns to cart page
- Cart still contains the item(s)
- No order is created

---

### 7. Checkout Process - Step Two (Order Overview)

#### 7.1 Order Overview Display
**Steps:**
1. Complete checkout step one with valid data
2. Verify checkout step two page displays
3. Verify all order information is shown

**Expected Results:**
- Page navigates to checkout-step-two.html
- Page title shows "Checkout: Overview"
- Cart items are displayed in a table with:
  - Quantity (QTY)
  - Product description
  - Product name
  - Product price
- Payment information displays: "SauceCard #31337"
- Shipping information displays: "Free Pony Express Delivery!"
- Price summary displays:
  - Item total
  - Tax (calculated based on subtotal)
  - Total (subtotal + tax)
- "Cancel" button is visible
- "Finish" button is visible

---

#### 7.2 Order Summary with Multiple Items
**Steps:**
1. Log in with standard_user credentials
2. Add three different items to cart
3. Complete checkout step one
4. Verify order overview page

**Expected Results:**
- All three items display in the order summary
- Quantities are correct (1 for each if added once)
- Item total is sum of all product prices
- Tax is calculated correctly (approximately 8% of subtotal)
- Total equals Item total + Tax

---

#### 7.3 Cancel Checkout - Return from Overview
**Steps:**
1. Complete checkout step one
2. Verify step two page is displayed
3. Click "Cancel" button
4. Verify previous page

**Expected Results:**
- User returns to inventory page or cart page
- No order is created
- Cart still contains items

---

#### 7.4 Verify Tax Calculation
**Steps:**
1. Add items totaling $100 to cart
2. Complete checkout step one
3. Verify step two displays tax amount

**Expected Results:**
- Tax is calculated correctly (8% of subtotal)
- Total = Item Total + Tax
- Calculations are accurate to two decimal places

---

### 8. Checkout Completion

#### 8.1 Successful Order Completion
**Steps:**
1. Log in with standard_user credentials
2. Add "Sauce Labs Backpack" ($29.99) to cart
3. Navigate to cart
4. Click Checkout
5. Fill in checkout information: John Doe, 12345
6. Click Continue
7. Verify order overview
8. Click "Finish" button
9. Verify order completion page

**Expected Results:**
- Page navigates to checkout-complete.html
- Page displays "Checkout: Complete!" header
- Message "Thank you for your order!" is displayed
- Confirmation message appears: "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
- Pony express image displays
- "Back Home" button is visible
- No errors appear

---

#### 8.2 Return to Home After Order
**Steps:**
1. Complete an order successfully
2. Click "Back Home" button
3. Verify inventory page displays

**Expected Results:**
- User returns to inventory page
- URL changes to inventory.html
- Cart is empty (counter shows 0 or is hidden)
- All products display

---

### 9. Navigation and Menu

#### 9.1 Navigation Menu Display
**Steps:**
1. Log in with standard_user credentials
2. Click the hamburger menu icon (Open Menu button)
3. Verify menu displays

**Expected Results:**
- Menu overlay appears
- Menu contains the following links:
  - "All Items" (marked as active/current)
  - "About" (links to saucelabs.com)
  - "Logout"
  - "Reset App State"
- Close Menu button is visible

---

#### 9.2 All Items Menu Link
**Steps:**
1. Log in and navigate to any page
2. Open menu
3. Click "All Items"
4. Verify page displays

**Expected Results:**
- User is taken to inventory page
- All products are displayed

---

#### 9.3 About Link Navigation
**Steps:**
1. Log in with standard_user credentials
2. Open menu
3. Click "About" link

**Expected Results:**
- Page navigates to external saucelabs.com URL
- Link opens to Sauce Labs company website

---

#### 9.4 Logout Functionality
**Steps:**
1. Log in with standard_user credentials
2. Open menu
3. Click "Logout"
4. Verify user is logged out

**Expected Results:**
- User is logged out
- Page redirects to login page
- URL changes to root (/)
- Login page displays with empty username and password fields
- User cannot access inventory without logging in again

---

#### 9.5 Reset App State
**Steps:**
1. Log in with standard_user credentials
2. Add multiple items to cart
3. Open menu
4. Click "Reset App State"
5. Verify app state resets

**Expected Results:**
- Cart is cleared (counter shows 0)
- "Add to cart" buttons appear for all products (not "Remove")
- User remains logged in
- Inventory page displays with fresh state

---

#### 9.6 Close Menu
**Steps:**
1. Log in with standard_user credentials
2. Open menu
3. Click "Close Menu" button
4. Verify menu closes

**Expected Results:**
- Menu overlay disappears
- Page content is fully visible
- User remains on the same page

---

### 10. Special User Accounts

#### 10.1 Problem User Experience
**Steps:**
1. Navigate to https://www.saucedemo.com
2. Enter "problem_user" in username field
3. Enter "secret_sauce" in password field
4. Click Login
5. Browse inventory and checkout process

**Expected Results:**
- User successfully logs in
- User may experience visual rendering issues or text misalignments
- Shopping functionality remains intact
- Checkout process can still be completed

---

#### 10.2 Performance Glitch User
**Steps:**
1. Log in with "performance_glitch_user" credentials
2. Perform checkout actions
3. Monitor page load times

**Expected Results:**
- User can log in successfully
- Page interactions may have noticeable delays
- All functionality still works but slower than standard_user
- Checkout can be completed despite delays

---

#### 10.3 Error User Experience
**Steps:**
1. Log in with "error_user" credentials
2. Browse products
3. Add items to cart
4. Proceed through checkout

**Expected Results:**
- User logs in successfully
- Error messages may display inconsistently
- Functionality may be limited or show error conditions
- Errors appear to be related to backend/frontend mismatches

---

#### 10.4 Visual User Experience
**Steps:**
1. Log in with "visual_user" credentials
2. Compare product information with standard_user

**Expected Results:**
- Product information may display differently
- Pricing, images, or product names may vary from standard_user
- Visual rendering is different but checkout works

---

### 11. Footer and External Links

#### 11.1 Social Media Links in Footer
**Steps:**
1. Log in with standard_user credentials
2. Scroll to footer
3. Verify social media links are present
4. Click each social media link

**Expected Results:**
- Twitter link points to: https://twitter.com/saucelabs
- Facebook link points to: https://www.facebook.com/saucelabs
- LinkedIn link points to: https://www.linkedin.com/company/sauce-labs/
- Links open in appropriate way (may open in new tab or same tab)

---

#### 11.2 Footer Copyright and Legal
**Steps:**
1. Log in with standard_user credentials
2. Scroll to footer
3. Verify copyright notice and legal links

**Expected Results:**
- Copyright notice displays: "© 2025 Sauce Labs. All Rights Reserved."
- "Terms of Service" link is visible
- "Privacy Policy" link is visible

---

### 12. Data Validation and Error Handling

#### 12.1 Postal Code Format Validation
**Steps:**
1. Log in with standard_user credentials
2. Add item to cart
3. Start checkout
4. Enter "John" in First Name
5. Enter "Doe" in Last Name
6. Enter special characters in Zip: "@#$%"
7. Click Continue

**Expected Results:**
- Either accepts any format or shows validation error for invalid characters
- Behavior is consistent with business rules

---

#### 12.2 Name Field Character Limits
**Steps:**
1. Log in with standard_user credentials
2. Start checkout
3. Enter very long name (100+ characters) in First Name
4. Click Continue

**Expected Results:**
- Either accepts long strings or enforces maximum length
- No application crash occurs
- Error message appears if applicable

---

#### 12.3 XSS Prevention in Form Fields
**Steps:**
1. Log in with standard_user credentials
2. Start checkout
3. Enter JavaScript code in First Name: `<script>alert('XSS')</script>`
4. Click Continue

**Expected Results:**
- Script is not executed
- Input is treated as plain text
- No alerts or unexpected behavior occurs

---

### 13. Cart State Management

#### 13.1 Cart Persistence on Page Navigation
**Steps:**
1. Log in with standard_user credentials
2. Add "Sauce Labs Backpack" to cart
3. Navigate to inventory (sort products, change view)
4. Verify cart counter still shows "1"

**Expected Results:**
- Cart count persists across page navigation
- Item is still in cart
- Sort/filter actions don't clear cart

---

#### 13.2 Cart State After Page Refresh
**Steps:**
1. Log in with standard_user credentials
2. Add items to cart
3. Refresh the page
4. Verify cart still contains items

**Expected Results:**
- Cart items persist after page refresh
- Cart counter shows correct count
- Items are accessible in cart page

---

### 14. Responsive Design (if applicable)

#### 14.1 Mobile Display - Inventory Page
**Steps:**
1. Log in with standard_user credentials
2. Resize browser to mobile width (320px)
3. Verify page layout

**Expected Results:**
- Products display in appropriate layout for mobile
- Menu functions properly
- Cart icon is accessible
- Text is readable

---

#### 14.2 Mobile Display - Checkout
**Steps:**
1. Log in with standard_user credentials
2. Resize to mobile width
3. Add item to cart
4. Complete checkout

**Expected Results:**
- Checkout form is usable on mobile
- Input fields are accessible
- Form submission works properly

---

### 15. Performance and Load Times

#### 15.1 Page Load Performance
**Steps:**
1. Navigate to https://www.saucedemo.com
2. Monitor page load time
3. Log in and measure inventory page load time

**Expected Results:**
- Login page loads within reasonable time (< 3 seconds)
- Inventory page loads within reasonable time (< 3 seconds)
- No hanging or frozen pages

---

#### 15.2 Image Loading
**Steps:**
1. Log in with standard_user credentials
2. Verify all product images display
3. Check image sizes and quality

**Expected Results:**
- All product images load successfully
- Images display correctly in the layout
- No broken image icons appear

---

## Test Execution Notes

- **Prerequisites**: Each test scenario should start with a fresh browser session
- **Test Data**: Use provided test accounts with password "secret_sauce"
- **Browser Compatibility**: Test in Chrome, Firefox, Safari, and Edge
- **Network Conditions**: Test both on stable and simulated slow networks
- **Accessibility**: Verify keyboard navigation works for all interactive elements

## Success Criteria

- All scenarios execute without critical errors
- All expected results are achieved
- No data loss occurs during transactions
- Error messages are clear and helpful
- User flows are intuitive and consistent
