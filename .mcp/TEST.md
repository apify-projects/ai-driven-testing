# Testing MCP Server Automatic Artifact Collection

This guide explains how to test that the MCP server automatically saves traces and screenshots based on `.mcp/config.json`.

## Prerequisites

1. VS Code with MCP extension OR Cursor with MCP support
2. MCP server configured (see `.mcp/README.md`)

## Test Steps

### Option 1: Using Cursor/VS Code MCP Chat

1. **Open Cursor or VS Code** with MCP enabled
2. **Restart the IDE** to load the MCP server configuration
3. **Open MCP chat** (in Cursor: Cmd+L, in VS Code: MCP chat panel)
4. **Send this prompt:**
   ```
   Use the browser to navigate to https://www.saucedemo.com/ and take a screenshot
   ```
5. **Wait for the AI to execute** the browser tools
6. **Check the output directory** (`artifacts2` if you're testing):
   ```bash
   ls -la artifacts2/
   ```

   You should see:
   - `trace.zip` or trace files (if `saveTrace: true`)
   - Screenshot files

### Option 2: Manual Verification

1. **Check the config** is correct:
   ```bash
   cat .mcp/config.json
   ```

   Should have:
   - `"saveTrace": true`
   - `"outputDir": "artifacts2"` (or your test directory)

2. **Use MCP tools** through your IDE's AI chat:
   - Navigate to a page
   - Interact with elements
   - Take screenshots

3. **Verify artifacts were created:**
   ```bash
   # Check for trace files
   find artifacts2 -name "*.zip" -o -name "trace*"
   
   # Check for screenshot files
   find artifacts2 -name "*.png" -o -name "*.jpg"
   
   # List all artifacts
   ls -R artifacts2/
   ```

## Expected Results

When `saveTrace: true` is configured:
- **Traces**: Automatically saved to `outputDir` after browser interactions
- **Screenshots**: Saved when explicitly requested via `browser_take_screenshot` tool

## Troubleshooting

- **No artifacts created**: Check that MCP server is actually running (check IDE logs)
- **Wrong output directory**: Verify `outputDir` path in `.mcp/config.json` is correct
- **Traces not saved**: Ensure `"tracing"` is in `capabilities` array or `saveTrace: true` is set

## Reference

- [Playwright MCP Configuration](https://github.com/microsoft/playwright-mcp?tab=readme-ov-file#configuration-file)
- [MCP Server Setup](./README.md)




