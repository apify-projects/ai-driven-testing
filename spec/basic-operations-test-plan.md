**Executive Summary**

This test plan covers basic operations for the Swag Labs demo application (https://www.saucedemo.com). The plan is intended for functional QA and covers core user journeys that a typical end user would perform: authentication, product browsing and sorting, cart management, checkout, session behavior, and main menu actions (logout, reset app state). Tests assume a fresh browser state unless stated otherwise.

**Test Environment & Assumptions**

- **Base URL:** https://www.saucedemo.com
- **Test accounts:** Use the official demo credentials documented for Swag Labs (e.g., `standard_user`, `locked_out_user`, `problem_user`, `performance_glitch_user`) with the known demo password.
- **Starting State:** Each scenario assumes a clean, fresh browser session unless the scenario explicitly requires a logged-in state.
- **Data Persistence:** App stores cart and session information in client-side storage for the duration of the session.
- **Success Criteria:** Each step's Expected Results must match exactly; any visual or logical divergence is a failure unless otherwise noted.

**How to use this plan**

- Execute scenarios independently where possible.
- If running multiple scenarios sequentially in the same session, use the "Reset App State" action from the menu or clear browser storage between scenarios.

**Test Scenarios**

### 1. Successful Login

Assumption: Browser at `https://www.saucedemo.com`, not logged in.

Steps:
1. Navigate to the login page.
2. Enter username `standard_user`.
3. Enter the correct demo password.
4. Click the `Login` button.

Expected Results:
- User is redirected to the products page (`/inventory.html`).
- Product list is visible with multiple items.
- No error message is shown.

Success Criteria: The URL is `/inventory.html` and product cards are present.

Failure Conditions: Login error message shown or user remains on login page.

### 2. Failed Login — Invalid Credentials

Assumption: Fresh browser session.

Steps:
1. Open login page.
2. Enter username `standard_user`.
3. Enter an incorrect password.
4. Click `Login`.

Expected Results:
- An error notification is displayed with a relevant message (e.g., "Username and password do not match any user in this service").
- User stays on login page.

Success Criteria: Error message visible and login not permitted.

Failure Conditions: User gets redirected to products page or no error shown.

### 3. Locked-out User

Assumption: Fresh browser session.

Steps:
1. Open login page.
2. Enter username `locked_out_user`.
3. Enter the demo password.
4. Click `Login`.

Expected Results:
- Error message explains that the user is locked out.
- User remains on login page.

Success Criteria: Locked-out message visible.

Failure Conditions: User can log in or a generic/incorrect error message shown.

### 4. Add a Single Item to Cart

Assumption: User is logged in (use `standard_user`) and on the products page.

Steps:
1. From the products list, locate a specific product (e.g., "Sauce Labs Backpack").
2. Click `Add to cart` for that product.
3. Observe the cart icon/count in the header.

Expected Results:
- The cart count increments to `1`.
- The `Add to cart` button changes to `Remove` (or equivalent state change).
- Item appears in the cart page when opening the cart.

Success Criteria: Cart shows the added item and item count is correct.

Failure Conditions: Cart count does not change, item missing from cart, or button state does not update.

### 5. Remove Item from Cart

Assumption: A product is already added to the cart and the user is on the products or cart page.

Steps:
1. Navigate to the cart page or use the `Remove` button in the products list.
2. Click `Remove` for the item in the cart.

Expected Results:
- Cart count decrements to `0` (or removes the badge).
- Item no longer appears in the cart contents.
- `Remove` button returns to `Add to cart` state on the products list.

Success Criteria: Cart empty and UI reflects removal.

Failure Conditions: Item still present or cart count incorrect.

### 6. Checkout — Happy Path

Assumption: User is logged in and there is at least one item in the cart.

Steps:
1. Click the cart icon and confirm items are present.
2. Click `Checkout` on the cart page.
3. Fill in checkout information (First Name, Last Name, Postal Code) with valid data.
4. Click `Continue`.
5. Review order summary and click `Finish`.

Expected Results:
- After `Finish`, user sees an order confirmation screen with a success message (e.g., "THANK YOU FOR YOUR ORDER").
- Cart is emptied after returning to products or via Reset.

Success Criteria: Order confirmation page appears and shows expected confirmation text.

Failure Conditions: Errors during checkout, missing confirmation, or cart still contains items after completion.

### 7. Product Sorting and Filtering

Assumption: User is on the products page and logged in.

Steps:
1. Locate the product sort dropdown.
2. Select `Price (low to high)`.
3. Inspect visible product prices order.
4. Change selection to `Name (Z to A)` and inspect order.

Expected Results:
- Products re-order according to the selected sort rule.
- No products are lost during sorting.

Success Criteria: Sorting matches the selected criteria.

Failure Conditions: Incorrect order, missing products, or UI errors.

### 8. Menu Options — Reset App State

Assumption: User is logged in and may have items in cart or modified state.

Steps:
1. Click the application menu (`Open Menu`).
2. Click `Reset App State`.
3. Close the menu and inspect cart and product page state.

Expected Results:
- Cart is emptied.
- Any added items or local changes are reset to default.

Success Criteria: Cart count is 0 and product buttons show `Add to cart`.

Failure Conditions: Cart retains items or state is only partially reset.

### 9. Logout

Assumption: User is logged in.

Steps:
1. Open the application menu.
2. Click `Logout`.

Expected Results:
- User is redirected to the login page.
- Access to `/inventory.html` requires re-login.

Success Criteria: Session cleared and login page displayed.

Failure Conditions: User remains on protected pages or sensitive actions still available.

### 10. Session Persistence / Refresh Behavior

Assumption: User is logged in and has items in the cart.

Steps:
1. Add one or more items to the cart.
2. Refresh the browser page.
3. Observe cart count and items.

Expected Results:
- Cart count and contents persist across the page refresh for the session.

Success Criteria: Cart state unchanged by refresh.

Failure Conditions: Cart empties unexpectedly or user is logged out after a simple refresh.

### 11. Problem & Performance User Checks (optional)

Assumption: Use special demo accounts such as `problem_user` or `performance_glitch_user`.

Steps:
1. Log in with `problem_user` and observe UI anomalies.
2. Log in with `performance_glitch_user` and measure page load times.

Expected Results:
- `problem_user` may reveal UI inconsistencies; record repro steps and screenshots.
- `performance_glitch_user` will exhibit slower performance; measure and compare to baseline.

Success Criteria: Issues are reproducible and documented.

Failure Conditions: Intermittent behavior that cannot be reproduced.

**Reporting and Triage**

- For any failed test, capture:
  - Steps to reproduce
  - Browser and OS
  - Console errors and network failures (if any)
  - Screenshot and, if helpful, a short video
- Tag failures as `blocker/critical/major/minor` depending on impact to core flows (checkout/login are `critical`).

**Notes & Next Steps**

- Convert high-value scenarios (Login, Checkout, Add/Remove Cart) into automated Playwright tests in `tests/`.
- Add negative cases and boundary tests for input fields (e.g., very long names or postal codes).
- Extend plan with accessibility checks and cross-browser validation.

---

Generated by QA planner for the Swag Labs demo. 
