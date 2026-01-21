# Performance Glitch User - Slow Inventory Load Test Plan

## Application Overview

The Sauce Demo application (saucedemo.com) is an e-commerce test environment with multiple user personas, each designed to simulate different testing scenarios. The `performance_glitch_user` account is specifically designed to test application behavior under simulated performance degradation conditions.

**Key Features Tested:**
- Inventory page loading with slow resource delivery
- Product detail page access with performance delays
- UI element interaction responsiveness
- Network resource loading (images, API calls)
- Page navigation and routing performance
- Dropdown/select element interaction under load

**Performance Issues Observed:**
- 401 Unauthorized errors when loading resources (backtrace.io API calls)
- Extended page load times with actionTimeout issues
- Delayed response to user interactions (clicks, selections)
- Slow rendering of product inventory items

---

## Test Scenarios

### 1. Initial Login and Inventory Page Load

**Seed:** Assuming fresh browser state without active authentication

**Description:** Verify that the performance_glitch_user account can successfully login and navigate to the inventory page despite slow resource loading.

**Steps:**
1. Navigate to https://www.saucedemo.com/
2. Verify the login page displays with username and password fields
3. Enter "performance_glitch_user" in the Username field
4. Enter "secret_sauce" in the Password field
5. Click the "Login" button
6. Wait for inventory page to load (allow up to 10 seconds for slow resource loading)
7. Verify the "Products" heading appears on the inventory page
8. Verify all 6 products are displayed (Backpack, Bike Light, Bolt T-Shirt, Fleece Jacket, Onesie, Test T-Shirt)
9. Verify sort dropdown is visible and functional
10. Verify shopping cart button is accessible in the header

**Expected Results:**
- Login succeeds despite console errors
- Inventory page eventually loads all products
- 401 Unauthorized errors appear in console (from backtrace.io API attempts)
- Products are fully rendered and visible
- UI elements are accessible but may respond slowly to interactions
- No complete page crashes or blank states

**Assumptions:**
- User credentials (performance_glitch_user / secret_sauce) are valid
- Network connectivity to saucedemo.com is available
- Browser can handle extended timeouts (> 5 seconds)

**Success Criteria:**
- Login completes successfully (navigation to inventory.html)
- All 6 products display with images, names, descriptions, and prices
- No application errors or 500 status codes (401s are expected)
- Page is functionally usable

**Failure Conditions:**
- Login fails or redirects to error page
- Products fail to load entirely (blank list)
- Application crashes or becomes unresponsive
- Critical UI elements are missing or inaccessible

---

### 2. Product Detail Page Navigation with Slow Loading

**Seed:** Logged in as performance_glitch_user on inventory page

**Description:** Verify that clicking on individual products navigates to detail pages despite performance degradation.

**Steps:**
1. Start from inventory page with all products visible
2. Click on "Sauce Labs Backpack" product image/link
3. Wait up to 10 seconds for detail page to load
4. Verify page URL changes to inventory-item.html?id=4
5. Verify product image is displayed
6. Verify product name "Sauce Labs Backpack" appears
7. Verify product description is visible
8. Verify product price "$29.99" is displayed
9. Verify "Add to cart" button is present
10. Verify "Back to products" button is present and clickable
11. Click "Back to products" button
12. Wait up to 10 seconds for inventory page to reload
13. Verify user is back on inventory page with all products visible

**Expected Results:**
- Navigation to product detail page succeeds despite slow loading
- All product information displays correctly
- Back button successfully returns to inventory page
- Page responsiveness is delayed but not blocked
- 401 Unauthorized errors appear in console again during reload

**Assumptions:**
- Product IDs are stable (Backpack = ID 4)
- Detail page structure remains consistent
- Back button functionality is implemented

**Success Criteria:**
- Product detail page loads within reasonable timeframe (< 15 seconds)
- All product details render correctly
- Navigation between pages completes successfully
- User can return to inventory page

**Failure Conditions:**
- Product page fails to load
- Product information is incomplete or missing
- Back button does not function
- Navigation creates redirect loops

---

### 3. Product Sorting with Performance Degradation

**Seed:** Logged in as performance_glitch_user on inventory page with all products visible

**Description:** Verify that the product sort dropdown functions despite extreme performance degradation.

**Steps:**
1. Start on inventory page with products displayed
2. Verify sort dropdown shows "Name (A to Z)" as default option
3. Click on the sort dropdown to open it
4. Verify dropdown shows all 4 sort options:
   - Name (A to Z)
   - Name (Z to A)
   - Price (low to high)
   - Price (high to low)
5. Attempt to select "Price (low to high)" option
6. Wait up to 15 seconds for sorting to complete
7. Observe if products are re-sorted by price
8. Verify product order changes if sorting completes
9. Click sort dropdown again
10. Attempt to select "Name (Z to A)" option
11. Wait up to 15 seconds for re-sorting
12. Verify products are re-ordered if sorting completes

**Expected Results:**
- Dropdown can be opened despite slow interaction response
- Sort options are visible and selectable
- Products may be re-sorted with significant delay (> 5 seconds)
- Page remains responsive for other interactions
- 401 errors continue in console

**Assumptions:**
- Sort functionality is server-side processed
- Delays are caused by performance_glitch_user backend throttling
- Sort options are always available

**Success Criteria:**
- Dropdown interactions complete within 15 seconds
- Sort options are selectable
- Product list updates (even if delayed)
- No application crash from sorting attempt

**Failure Conditions:**
- Sort dropdown becomes unresponsive/frozen
- Sort selection times out (> 15 seconds)
- Application crashes when attempting to sort
- Sort options are missing or disabled

---

### 4. Add to Cart Functionality with Performance Delay

**Seed:** Logged in as performance_glitch_user on inventory page

**Description:** Verify that adding items to cart works despite slow performance and UI delays.

**Steps:**
1. Start on inventory page with products visible
2. Locate "Sauce Labs Bike Light" product (second item)
3. Click "Add to cart" button for Bike Light
4. Wait up to 10 seconds for cart action to complete
5. Verify shopping cart badge appears or updates in header
6. Verify the "Add to cart" button may change state or remain unchanged
7. Locate "Sauce Labs Bolt T-Shirt" product (third item)
8. Click "Add to cart" button for Bolt T-Shirt
9. Wait up to 10 seconds for cart action to complete
10. Verify shopping cart badge updates or shows count
11. Navigate to product detail page (click on Backpack)
12. Verify detail page loads
13. Click "Add to cart" from detail page
14. Wait up to 10 seconds
15. Click "Back to products" to return to inventory
16. Observe shopping cart badge status

**Expected Results:**
- Add to cart actions complete despite delays
- Cart may not update visually immediately
- Multiple items can be added sequentially
- Navigation with items in cart functions
- Backend likely processes cart additions despite slow UI response

**Assumptions:**
- Cart functionality uses same backend as inventory
- Performance degradation affects both frontend and backend
- Cart persistence works during session

**Success Criteria:**
- Add to cart completes without error (< 10 seconds)
- Cart badge appears or updates
- Multiple items can be added in sequence
- Cart state persists during navigation

**Failure Conditions:**
- Add to cart button becomes unresponsive
- Cart state is lost
- Application errors occur on cart action
- Cart functionality is completely unavailable

---

### 5. Rapid Interaction Stress Test

**Seed:** Logged in as performance_glitch_user on inventory page

**Description:** Verify application stability when user attempts multiple rapid interactions despite slow responses.

**Steps:**
1. Start on inventory page
2. Rapidly click "Add to cart" on first product
3. Immediately click "Add to cart" on second product (without waiting)
4. Immediately click on product image to navigate to detail page
5. Wait 2 seconds (do not wait for page to fully load)
6. Attempt to click "Back to products" button
7. Wait 2 seconds
8. Rapidly attempt to click 3 different "Add to cart" buttons in quick succession
9. Wait for page to stabilize
10. Verify current page state and cart status
11. Attempt to open sort dropdown
12. Navigate to different product detail pages rapidly (2-3 products)
13. Verify application is still functional after stress

**Expected Results:**
- Application may queue or drop some interactions
- Some actions may be ignored or delayed significantly
- No complete application crash
- Page remains navigable after rapid interactions
- Potential race conditions in cart or navigation may occur
- Some user actions may not complete

**Assumptions:**
- Application has request queuing or throttling
- Backend may drop some requests due to performance constraints
- Frontend remains reactive despite backend slowness

**Success Criteria:**
- Application does not crash during rapid interactions
- At least some actions complete successfully
- Page remains in a stable, viewable state
- Navigation is still possible after stress test

**Failure Conditions:**
- Application becomes completely unresponsive
- Page crashes or becomes blank
- Browser tab locks up or requires refresh
- No interactions are possible after rapid actions

---

### 6. Page Refresh and State Recovery

**Seed:** Logged in as performance_glitch_user with items added to cart (from scenario 4)

**Description:** Verify that page refresh doesn't cause catastrophic failures under performance degradation.

**Steps:**
1. Start on inventory page with items in cart
2. Note shopping cart badge count/status
3. Navigate to a product detail page
4. Refresh the page (F5 or browser refresh button)
5. Wait up to 10 seconds for page to reload
6. Verify product detail page reloads with same product
7. Verify all product information is re-rendered
8. Navigate back to inventory page using back button or breadcrumb
9. Verify inventory page reloads
10. Verify shopping cart badge still shows items (or is empty if session is lost)
11. Refresh inventory page
12. Wait up to 10 seconds
13. Verify products re-load
14. Attempt to add a new item to cart
15. Verify add to cart functions after refresh

**Expected Results:**
- Page refresh completes without error
- Content reloads but may take extended time (> 5 seconds)
- 401 errors reappear in console during reload
- Cart state may or may not persist (depends on implementation)
- Page becomes functional after refresh completes

**Assumptions:**
- Refresh triggers full page reload
- Session state may be lost during slow loading
- 401 errors are expected during reload

**Success Criteria:**
- Page refresh completes without crash (< 15 seconds)
- Content eventually loads after refresh
- Page functions normally after refresh completes
- Navigation works after refresh

**Failure Conditions:**
- Page fails to load after refresh (blank or error page)
- Browser hangs or becomes unresponsive
- Application stuck in loading state
- Session is corrupted after refresh

---

### 7. Menu Navigation and Logout Under Performance Load

**Seed:** Logged in as performance_glitch_user on inventory page

**Description:** Verify that menu navigation and logout function despite performance constraints.

**Steps:**
1. Start on inventory page
2. Click the hamburger menu button ("Open Menu") in header
3. Wait up to 5 seconds for menu to appear
4. Verify menu displays (typically shows: All Items, About, Logout, Reset App State)
5. Click "About" menu option
6. Wait up to 5 seconds for About page to load
7. Verify About page content displays
8. Click menu button again to open menu
9. Verify "Logout" option is visible
10. Click "Logout" option
11. Wait up to 5 seconds for logout to complete
12. Verify redirect to login page
13. Verify login form is displayed
14. Verify previous cart data is cleared (if applicable)
15. Attempt to login again as performance_glitch_user

**Expected Results:**
- Menu opens with delay but is accessible
- Navigation through menu options functions despite slow load
- About page loads with extended timeout
- Logout successfully clears session
- Return to login page after logout
- Re-login functions normally after logout
- 401 errors present throughout navigation

**Assumptions:**
- Menu is accessible from all pages
- Logout clears session on backend
- About page is a static content page
- Re-login after logout uses same performance degradation

**Success Criteria:**
- All menu interactions complete within 5-10 seconds each
- Navigation through menu items succeeds
- Logout clears session and returns to login
- Re-login after logout works normally

**Failure Conditions:**
- Menu fails to open or becomes unresponsive
- Menu options are non-functional
- Logout fails or hangs
- Unable to return to login page
- Session is not properly cleared

---

### 8. Inventory List Completeness and Product Accuracy

**Seed:** Logged in as performance_glitch_user on inventory page

**Description:** Verify that all products load completely and display accurate information despite performance degradation.

**Steps:**
1. Load inventory page and wait for complete loading
2. Count total number of product containers/cards displayed
3. Verify exactly 6 products are present
4. For each product, verify the following elements are present:
   - Product image (with proper src attribute)
   - Product name text
   - Product description text
   - Product price (starts with $)
   - "Add to cart" button
5. Verify products are:
   - Sauce Labs Backpack ($29.99)
   - Sauce Labs Bike Light ($9.99)
   - Sauce Labs Bolt T-Shirt ($15.99)
   - Sauce Labs Fleece Jacket ($49.99)
   - Sauce Labs Onesie ($7.99)
   - Test.allTheThings() T-Shirt (Red) ($15.99)
6. Verify no duplicate products are shown
7. Verify no products are missing from inventory
8. Verify product prices are formatted consistently
9. Verify product images have alt text or proper accessibility attributes

**Expected Results:**
- All 6 products load eventually
- Product information is accurate and complete
- No duplicate or missing products
- Prices are correctly displayed
- All required elements are present for each product

**Assumptions:**
- Product inventory is static (6 items total)
- Product data is stored on backend
- Price and product info does not change during test

**Success Criteria:**
- Exactly 6 products displayed
- All product information is accurate and complete
- No missing or duplicate products
- All UI elements present for each product

**Failure Conditions:**
- Products fail to load entirely
- Product count is incorrect
- Product information is incomplete or corrupted
- Prices are incorrect or missing
- Duplicate products appear

---

### 9. Error Handling and Recovery

**Seed:** Logged in as performance_glitch_user on inventory page

**Description:** Verify that the application handles errors gracefully and provides recovery paths despite slow performance.

**Steps:**
1. Monitor browser console for errors throughout session
2. Verify that 401 errors from backtrace.io appear but don't block UI
3. Attempt to add item to cart and monitor for any JavaScript errors
4. Navigate between pages and check for console errors
5. Verify that despite backend errors, UI remains functional
6. Attempt to interact with each major UI element and verify no unhandled exceptions
7. Navigate to inventory and check Network tab for failed requests
8. Verify that failed requests (401s) are not critical to page functionality
9. Verify user can complete workflow (login → add to cart → logout) despite errors
10. Check if any error messages display to user on page (not just console)

**Expected Results:**
- 401 errors appear in console but don't crash application
- UI remains functional despite errors
- User can complete workflows without manual intervention
- Errors are not displayed prominently to end user
- Application recovers from network errors
- No unhandled JavaScript exceptions

**Assumptions:**
- 401 errors are expected and intentional for performance_glitch_user
- Errors are non-fatal by design
- Application has error handling middleware

**Success Criteria:**
- No critical errors block user workflows
- Expected 401 errors appear in console
- Application recovers and remains usable
- User can complete full shopping workflow

**Failure Conditions:**
- Unhandled JavaScript exceptions crash application
- Error messages block UI or prevent interaction
- Application stuck in error state
- Console shows critical errors that prevent functionality

---

### 10. Performance Metrics and Timing Verification

**Seed:** Logged in as performance_glitch_user, tracking all navigation events

**Description:** Verify and document performance degradation patterns specific to performance_glitch_user.

**Steps:**
1. Record page load time from login click to inventory page fully rendered (document in seconds)
2. Record product detail page load time from click to full content display
3. Record time for sort dropdown interaction (click to dropdown appearing)
4. Record time for sort selection to update product list (if completed)
5. Record time for add to cart button click to completion
6. Record time for back navigation button to complete page reload
7. Record time for page refresh to complete
8. Record number of 401 errors that appear during full user session
9. Record if any request completes faster than expected (baseline comparison)
10. Verify that all interactions have extended timeouts (typically > 3 seconds each)
11. Verify that performance degradation is consistent across multiple attempts
12. Compare timing differences between performance_glitch_user and standard_user (if available)

**Expected Results:**
- Page loads take 5-10+ seconds each
- Individual interactions delayed 3-5+ seconds
- All user actions have noticeable delays (not instant)
- Multiple 401 errors appear throughout session
- Performance degradation is consistent
- No interactions complete in < 1 second (should be delayed)

**Assumptions:**
- Performance degradation is intentional and consistent
- Delays are introduced server-side or through API throttling
- Timing can be measured through browser dev tools

**Success Criteria:**
- Documented timing shows clear performance degradation
- All major interactions are delayed > 2 seconds
- Page loads exceed 5 seconds
- 401 errors consistently appear

**Failure Conditions:**
- Performance_glitch_user loads as fast as standard_user
- No 401 errors appear
- Interactions complete instantly (< 1 second)
- Performance degradation is inconsistent or absent

---

## Test Execution Notes

### Browser & Environment Requirements
- Modern browser (Chrome, Firefox, Safari, Edge)
- Stable internet connection to saucedemo.com
- Browser dev tools available for error monitoring
- Action timeout tolerance: 10-15 seconds per interaction

### Recommended Test Approach
1. Execute scenarios in order (1-10) for comprehensive coverage
2. Allow extended timeouts for all interactions (minimum 10 seconds)
3. Monitor browser console for errors throughout execution
4. Document all 401 errors and their frequency
5. Take notes on specific interactions that timeout vs. complete
6. Compare behavior across multiple browser sessions

### Known Performance Behaviors
- 401 Unauthorized errors from backtrace.io API (expected)
- Page load times of 5-10+ seconds for initial inventory load
- Individual interaction delays of 3-5+ seconds
- Sort dropdown may timeout on first attempt
- Back button navigation may take extended time
- Application remains functional despite errors

### Recovery Procedures
- If page becomes unresponsive: Refresh browser page
- If stuck in loading: Wait 15+ seconds before declaring failure
- If session lost: Re-login with performance_glitch_user / secret_sauce
- If error in console: Verify UI is still functional (don't panic on 401s)

---

## Summary

The performance_glitch_user test scenarios focus on validating that the Sauce Demo application remains **functionally usable** despite significant performance degradation. The test plan emphasizes:

- **Resilience**: Application maintains functionality despite slow loading
- **Error Tolerance**: 401 errors don't block user workflows
- **State Consistency**: Cart and navigation state persist despite delays
- **User Experience**: UI remains accessible even when responses are delayed

These scenarios ensure quality assurance teams can identify if the application gracefully handles performance constraints versus catastrophically failing under load.
