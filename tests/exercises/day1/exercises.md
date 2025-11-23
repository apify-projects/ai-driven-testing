# Exercises – Day 1

1. **Negative-path hardening**  
   Create a test that verifies wrong password is rejected with an error message. Keep it under 10 lines. Save the test as `tests/exercises/day1/wrong-password.spec.ts`.

2. **MCP tool-based test**  
   Use MCP tools (via Cursor/VS Code MCP chat) to write a test that logs in and adds a product to the cart. The AI should use MCP browser tools (`browser_navigate`, `browser_fill_form`, `browser_click`, etc.) to interact with the page. Save the generated test as `tests/exercises/day1/mcp-cart.ts`.

3. **Page Object Model practice**  
   Create a new test case that is not yet covered in the examples. Write a test that verifies a user can remove a product from the cart using the Page Object Model pattern. The test should:
   - Log in as `standard_user`
   - Add a product to the cart
   - Navigate to the cart page
   - Remove the product from the cart
   - Verify the cart is empty or the product is no longer visible

   Use existing Page Object Model classes from `tests/pages/` (LoginPage, InventoryPage, CartPage). Save the test as `tests/exercises/day1/remove-from-cart-pom.spec.ts`.
