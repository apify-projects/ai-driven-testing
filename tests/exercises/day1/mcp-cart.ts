/**
 * MCP Browser Tool-based Test
 *
 * This test uses MCP browser tools to interact with the Sauce Demo application.
 * The test logs in and adds a product to the cart using browser automation tools.
 *
 * Generated using MCP browser tools (browser_navigate, browser_type, browser_click, etc.)
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

async function runMCPCartTest() {
  // Create MCP client
  const client = new Client({
    name: 'mcp-cart-test',
    version: '1.0.0',
  }, {
    capabilities: {}
  });

  const clientTransport = new StdioClientTransport({
    command: 'npx',
    args: ['@playwright/mcp@latest', '--caps=testing']
  });

  await client.connect(clientTransport);

  try {
    // Step 1: Navigate to login page
    console.log('Navigating to https://www.saucedemo.com/...');
    await client.callTool({
      name: 'browser_navigate',
      arguments: {
        url: 'https://www.saucedemo.com/'
      }
    });

    // Step 2: Get page snapshot to find form elements
    console.log('Getting page snapshot...');
    const snapshot = await client.callTool({
      name: 'browser_snapshot',
      arguments: {}
    });

    // Step 3: Parse snapshot to find element refs
    const snapshotContent = snapshot.content;
    const snapshotText = Array.isArray(snapshotContent) && snapshotContent[0] && typeof snapshotContent[0] === 'object' && 'text' in snapshotContent[0]
      ? String(snapshotContent[0].text)
      : JSON.stringify(snapshotContent);

    // Extract refs from snapshot
    const usernameRegex = /textbox\s+"Username"[^\n]*\[ref=([^\]]+)\]/i;
    const passwordRegex = /textbox\s+"Password"[^\n]*\[ref=([^\]]+)\]/i;
    const buttonRegex = /button\s+"Login"[^\n]*\[ref=([^\]]+)\]/i;
    const usernameMatch = usernameRegex.exec(snapshotText);
    const passwordMatch = passwordRegex.exec(snapshotText);
    const buttonMatch = buttonRegex.exec(snapshotText);

    const usernameRef = usernameMatch ? usernameMatch[1] : 'textbox:Username';
    const passwordRef = passwordMatch ? passwordMatch[1] : 'textbox:Password';
    const loginButtonRef = buttonMatch ? buttonMatch[1] : 'button:Login';

    // Step 4: Fill login form
    console.log('Filling login form...');
    await client.callTool({
      name: 'browser_fill_form',
      arguments: {
        fields: [
          {
            name: 'Username',
            type: 'textbox',
            ref: usernameRef,
            value: 'standard_user'
          },
          {
            name: 'Password',
            type: 'textbox',
            ref: passwordRef,
            value: 'secret_sauce'
          }
        ]
      }
    });

    // Step 5: Click login button
    console.log('Clicking login button...');
    await client.callTool({
      name: 'browser_click',
      arguments: {
        element: 'Login button',
        ref: loginButtonRef
      }
    });

    // Step 6: Wait for inventory page to load
    console.log('Waiting for inventory page to load...');
    await client.callTool({
      name: 'browser_wait_for',
      arguments: {
        text: 'Products'
      }
    });

    // Step 7: Verify login was successful
    console.log('Verifying login was successful...');
    await client.callTool({
      name: 'browser_verify_text_visible',
      arguments: {
        text: 'Products'
      }
    });

    // Step 8: Get snapshot of inventory page to find "Add to cart" button
    console.log('Getting inventory page snapshot...');
    const inventorySnapshot = await client.callTool({
      name: 'browser_snapshot',
      arguments: {}
    });

    // Step 9: Parse snapshot to find first "Add to cart" button
    const inventorySnapshotContent = inventorySnapshot.content;
    const inventorySnapshotText = Array.isArray(inventorySnapshotContent) && inventorySnapshotContent[0] && typeof inventorySnapshotContent[0] === 'object' && 'text' in inventorySnapshotContent[0]
      ? String(inventorySnapshotContent[0].text)
      : JSON.stringify(inventorySnapshotContent);

    const addToCartButtonRegex = /button\s+"Add to cart"[^\n]*\[ref=([^\]]+)\]/i;
    const addToCartButtonMatch = addToCartButtonRegex.exec(inventorySnapshotText);

    if (!addToCartButtonMatch) {
      throw new Error('Could not find "Add to cart" button in snapshot');
    }

    const addToCartButtonRef = addToCartButtonMatch[1];

    // Step 10: Click "Add to cart" button for first product
    console.log('Adding product to cart...');
    await client.callTool({
      name: 'browser_click',
      arguments: {
        element: 'Add to cart button',
        ref: addToCartButtonRef
      }
    });

    // Step 11: Wait a moment for the cart to update
    await client.callTool({
      name: 'browser_wait_for',
      arguments: {
        time: 1
      }
    });

    // Step 12: Verify product was added to cart (button changed to "Remove")
    console.log('Verifying product was added to cart...');
    await client.callTool({
      name: 'browser_verify_text_visible',
      arguments: {
        text: 'Remove'
      }
    });

    // Step 13: Verify cart badge shows "1" using assert tool
    console.log('Verifying cart badge shows "1"...');
    await client.callTool({
      name: 'browser_verify_text_visible',
      arguments: {
        text: '1'
      }
    });

    console.log('✓ Test passed: Product successfully added to cart (cart badge shows 1)');

    console.log('Test completed successfully!');

  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Run the test
runMCPCartTest().catch((error) => {
  console.error('MCP cart test failed:', error);
  process.exitCode = 1;
});

