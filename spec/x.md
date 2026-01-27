# The Internet Application - Form Authentication Test Plan

## Application Overview

The Internet (the-internet.herokuapp.com) is a comprehensive web testing playground application that provides multiple test scenarios for learning web automation and QA testing. The Form Authentication feature is a simple login system designed to test authentication flows and error handling.

**Key Features Tested:**
- Login form with username and password fields
- Form submission and validation
- Successful authentication and secure area access
- Error message handling for invalid credentials
- Session management and logout functionality
- User feedback messages for success and failure scenarios

**Purpose:**
This test plan focuses on the Form Authentication module, which serves as a basic example for testing user authentication workflows, including happy path scenarios and error conditions.

---

## Test Scenarios

### 1. Successful Login with Valid Credentials

**Seed:** Fresh browser state, login page should be displayed

**Description:** Verify that a user can successfully login using correct credentials and access the secure area.

**Steps:**
1. Navigate to https://the-internet.herokuapp.com/login
2. Verify the login page displays with title "Login Page"
3. Verify the form contains Username field, Password field, and Login button
4. Verify the instructions are visible: "Enter tomsmith for the username and SuperSecretPassword! for the password"
5. Click on the Username input field
6. Enter "tomsmith" in the Username field
7. Click on the Password input field
8. Enter "SuperSecretPassword!" in the Password field
9. Click the "Login" button
10. Wait for page navigation to complete

**Expected Results:**
- Login page loads successfully with all form elements visible
- Both input fields accept the entered values
- Login button is clickable
- Page redirects to https://the-internet.herokuapp.com/secure
- Success message appears: "You logged into a secure area!"
- User is presented with "Secure Area" heading
- Logout link is visible for user to exit session
- No error messages are displayed

---

### 2. Invalid Username Error Handling

**Seed:** Fresh browser state on login page

**Description:** Verify that the application displays appropriate error message when incorrect username is provided.

**Steps:**
1. Navigate to https://the-internet.herokuapp.com/login
2. Verify the login page is fully loaded
3. Enter "wronguser" in the Username field
4. Enter "wrongpassword" in the Password field
5. Click the Login button
6. Wait for response from server

**Expected Results:**
- User remains on the login page (https://the-internet.herokuapp.com/login)
- Error message appears: "Your username is invalid!"
- Form fields retain the entered values (for user reference)
- Both Username and Password fields are still enabled and editable
- User can attempt login again without page refresh
- No partial navigation or loading state persists

---

### 3. Invalid Password Error Handling

**Seed:** Fresh browser state on login page

**Description:** Verify that the application displays specific error message when correct username but incorrect password is provided.

**Steps:**
1. Navigate to https://the-internet.herokuapp.com/login
2. Verify the login page is fully loaded
3. Enter "tomsmith" in the Username field (correct username)
4. Enter "WrongPassword123" in the Password field (incorrect password)
5. Click the Login button
6. Wait for server response

**Expected Results:**
- User remains on the login page (https://the-internet.herokuapp.com/login)
- Error message appears: "Your password is invalid!"
- Error message is different from the invalid username error
- Username field displays the entered value
- Password field is cleared or displays asterisks (depending on browser behavior)
- User can correct the password and attempt login again
- No account lockout or blocking occurs

---

### 4. Logout Functionality and Session Termination

**Seed:** User is logged in and on the Secure Area page

**Description:** Verify that logout successfully terminates the user session and returns to login page with appropriate message.

**Steps:**
1. Navigate to https://the-internet.herokuapp.com/login
2. Login successfully using credentials: username "tomsmith", password "SuperSecretPassword!"
3. Verify user is redirected to secure area page
4. Verify "You logged into a secure area!" message appears
5. Locate and click the "Logout" link
6. Wait for page navigation

**Expected Results:**
- Logout link is visible and clickable on the secure area page
- Page redirects back to https://the-internet.herokuapp.com/login
- Success message appears: "You logged out of the secure area!"
- Login form is displayed again with empty fields
- User can login again using valid credentials
- Previous session is fully terminated
- No cached authentication data persists

---

### 5. Empty Form Submission Attempt

**Seed:** Fresh browser state on login page

**Description:** Verify application behavior when user attempts to login without entering any credentials.

**Steps:**
1. Navigate to https://the-internet.herokuapp.com/login
2. Verify the login page is fully loaded
3. Leave both Username and Password fields empty
4. Click the Login button
5. Observe the application response

**Expected Results:**
- Application either displays error message OR shows browser's native validation
- If error message displays, it should indicate missing credentials
- User remains on login page
- Form fields are still accessible for input
- No JavaScript errors occur in the console
- Application does not crash or hang

