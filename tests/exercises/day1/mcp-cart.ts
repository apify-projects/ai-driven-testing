/**
 * Exercise: MCP tool-based test
 *
 * This script demonstrates using MCP tools programmatically to interact with the browser.
 * It uses the same approach as scripts/mcp-login-demo.ts.
 *
 * This is a reference solution for Day 1 Exercise 2.
 * In the actual exercise, participants should use MCP chat in Cursor/VS Code to generate this test.
 */

import { createConnection } from '@playwright/mcp';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import fs from 'node:fs/promises';
import path from 'node:path';

type TranscriptEntry = {
  tool: string;
  arguments: Record<string, unknown>;
  result?: unknown;
  timestamp: string;
};

const ARTIFACT_ROOT = path.resolve('artifacts');
const TRANSCRIPT_PATH = path.join(ARTIFACT_ROOT, 'mcp-cart-transcript.json');

const record = (
  transcript: TranscriptEntry[],
  tool: string,
  args: Record<string, unknown>,
  result?: unknown
) => {
  transcript.push({
    tool,
    arguments: args,
    result,
    timestamp: new Date().toISOString()
  });
};

async function run() {
  await fs.mkdir(ARTIFACT_ROOT, { recursive: true });
  const transcript: TranscriptEntry[] = [];

  // Create MCP server using createConnection
  await createConnection({
    browser: {
      launchOptions: { headless: false }
    }
  });

  // Create MCP client connected to the MCP server via stdio
  const client = new Client({
    name: 'mcp-cart',
    version: '1.0.0',
  }, {
    capabilities: {}
  });

  const clientTransport = new StdioClientTransport({
    command: 'npx',
    args: ['@playwright/mcp@latest', '--config', '.mcp/config.json', '--caps=testing']
  });

  await client.connect(clientTransport);

  try {
    // Navigate to login page (browser_navigate)
    const navigateResult = await client.callTool({
      name: 'browser_navigate',
      arguments: {
        url: 'https://www.saucedemo.com/'
      }
    });
    record(transcript, 'browser_navigate', { url: 'https://www.saucedemo.com/' }, navigateResult);

    // Get page snapshot to find elements
    const snapshot = await client.callTool({
      name: 'browser_snapshot',
      arguments: {}
    });
    record(transcript, 'browser_snapshot', {}, snapshot);

    // Parse snapshot to find element refs
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

    // Fill login form (browser_fill_form)
    const fillFormResult = await client.callTool({
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
    record(transcript, 'browser_fill_form', {
      fields: [
        { name: 'Username', value: 'standard_user' },
        { name: 'Password', value: 'secret_sauce' }
      ]
    }, fillFormResult);

    // Click login button (browser_click)
    const clickResult = await client.callTool({
      name: 'browser_click',
      arguments: {
        element: 'Login button',
        ref: loginButtonRef
      }
    });
    record(transcript, 'browser_click', { element: 'Login button' }, clickResult);

    // Wait for navigation (browser_wait_for)
    const waitForResult = await client.callTool({
      name: 'browser_wait_for',
      arguments: {
        text: 'Products'
      }
    });
    record(transcript, 'browser_wait_for', { text: 'Products' }, waitForResult);

    // Verify "Products" text is visible (browser_verify_text_visible)
    const verifyProductsResult = await client.callTool({
      name: 'browser_verify_text_visible',
      arguments: {
        text: 'Products'
      }
    });
    record(transcript, 'browser_verify_text_visible', { text: 'Products' }, verifyProductsResult);

    // Get snapshot after login to find "Add to cart" button
    const postLoginSnapshot = await client.callTool({
      name: 'browser_snapshot',
      arguments: {}
    });
    record(transcript, 'browser_snapshot', { note: 'post-login' }, postLoginSnapshot);

    const postLoginSnapshotContent = postLoginSnapshot.content;
    const postLoginSnapshotText = Array.isArray(postLoginSnapshotContent) && postLoginSnapshotContent[0] && typeof postLoginSnapshotContent[0] === 'object' && 'text' in postLoginSnapshotContent[0]
      ? String(postLoginSnapshotContent[0].text)
      : JSON.stringify(postLoginSnapshotContent);

    // Find first "Add to cart" button
    const addToCartButtonRegex = /button\s+"Add to cart"[^\n]*\[ref=([^\]]+)\]/i;
    const addToCartButtonMatch = addToCartButtonRegex.exec(postLoginSnapshotText);

    if (addToCartButtonMatch) {
      const addToCartButtonRef = addToCartButtonMatch[1];

      // Click "Add to cart" button (browser_click)
      const addToCartClickResult = await client.callTool({
        name: 'browser_click',
        arguments: {
          element: 'Add to cart button',
          ref: addToCartButtonRef
        }
      });
      record(transcript, 'browser_click', { element: 'Add to cart button' }, addToCartClickResult);

      // Verify cart badge shows "1" (browser_verify_text_visible)
      const verifyCartBadgeResult = await client.callTool({
        name: 'browser_verify_text_visible',
        arguments: {
          text: '1'
        }
      });
      record(transcript, 'browser_verify_text_visible', { text: '1' }, verifyCartBadgeResult);

      // Find cart icon in snapshot
      const cartIconRegex = /link\s+"[^"]*cart[^"]*"[^\n]*\[ref=([^\]]+)\]/i;
      const cartIconMatch = cartIconRegex.exec(postLoginSnapshotText);

      if (cartIconMatch) {
        const cartIconRef = cartIconMatch[1];

        // Click cart icon (browser_click)
        const cartIconClickResult = await client.callTool({
          name: 'browser_click',
          arguments: {
            element: 'Shopping cart link',
            ref: cartIconRef
          }
        });
        record(transcript, 'browser_click', { element: 'Shopping cart link' }, cartIconClickResult);

        // Wait for cart page (browser_wait_for)
        const waitForCartResult = await client.callTool({
          name: 'browser_wait_for',
          arguments: {
            text: 'Your Cart'
          }
        });
        record(transcript, 'browser_wait_for', { text: 'Your Cart' }, waitForCartResult);

        // Verify product is in cart (browser_verify_element_visible)
        const verifyCartItemResult = await client.callTool({
          name: 'browser_verify_element_visible',
          arguments: {
            role: 'listitem',
            accessibleName: /cart item/i
          }
        });
        record(transcript, 'browser_verify_element_visible', {
          role: 'listitem',
          accessibleName: 'cart item'
        }, verifyCartItemResult);
      }
    }

  } finally {
    await client.close();
  }

  // Save transcript
  await fs.writeFile(TRANSCRIPT_PATH, JSON.stringify(transcript, null, 2));

  console.log('MCP cart test complete:');
  console.log(`- Transcript: ${TRANSCRIPT_PATH}`);
}

try {
  await run();
} catch (error) {
  console.error('MCP cart test failed:', error);
  process.exitCode = 1;
}
