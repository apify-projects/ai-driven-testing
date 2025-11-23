# Playwright MCP Server Configuration

This directory contains the configuration for the official Playwright MCP server.

## Configuration File

The `config.json` file defines:
- `outputDir`: Directory where artifacts (screenshots, traces) are saved
- `capabilities`: Enabled MCP capabilities (e.g., `["core"]`, `["browser"]`, `["testing"]`, `["tracing"]`)
- `browser`: Default browser settings (browserName, isolated mode, etc.)
- `saveTrace`: Automatically save trace files for browser interactions
- `saveSession`: Save browser session state for debugging
- `playwrightConfig`: Path to the Playwright configuration file - optional
- `testing`: Test directory and file patterns - optional

### Example Configuration

Here's an example `config.json` that matches our setup:

```json
{
  "outputDir": "artifacts",
  "capabilities": [
    "core"
  ],
  "browser": {
    "browserName": "chromium",
    "isolated": true
  },
  "saveTrace": true,
  "saveSession": true
}
```

**Configuration Options:**

- **`outputDir`**: All artifacts (traces, screenshots) will be saved to this directory
- **`capabilities`**: Array of enabled capabilities. Common values:
  - `"core"`: Basic browser operations
  - `"browser"`: Full browser automation
  - `"testing"`: Test generation and execution
  - `"tracing"`: Trace recording capabilities
- **`browser.browserName`**: Which browser to use (`"chromium"`, `"firefox"`, `"webkit"`)
- **`browser.isolated`**: Run browser in isolated mode (recommended for security)
- **`saveTrace`**: Automatically save trace files for all browser interactions
- **`saveSession`**: Save browser session state (useful for debugging)

**Automatic Artifact Collection:**

The MCP server automatically captures artifacts based on the configuration:
- **Traces**: When `saveTrace: true` is set, the server automatically saves trace files for all browser interactions. Alternatively, use `browser_start_tracing` and `browser_stop_tracing` tools (requires `--caps=tracing`).
- **Screenshots**: Screenshots are captured automatically when configured
- **Sessions**: When `saveSession: true` is set, browser session state is saved
- **Video**: Video recording is available via `--save-video` flag (e.g., `--save-video=800x600`)
- **Test Assertions**: Available via `--caps=testing` (e.g., `browser_verify_text_visible`, `browser_verify_element_visible`, `browser_generate_locator`)
- All artifacts are saved to the `outputDir` specified in the config


For more details on configuration options, see the [official Playwright MCP documentation](https://github.com/microsoft/playwright-mcp?tab=readme-ov-file#configuration-file).

## How to Use the MCP Server

The Playwright MCP server runs as a **stdio server** and must be launched by an MCP client, not as a standalone process.

### VS Code

The server is already configured in `.vscode/mcp.json`. The configuration uses `@playwright/mcp@latest` with a custom config file:

```json
{
  "servers": {
    "playwright-vscode-custom-config": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "@playwright/mcp@latest",
        "--config",
        ".mcp/config.json"
      ]
    }
  }
}
```

When you use VS Code with the MCP extension enabled, the server will be automatically started and you can interact with it through the MCP interface. The server will use the settings from `.mcp/config.json` (output directory, browser settings, capabilities, etc.).

**Important:** After creating or updating `.vscode/mcp.json`, restart VS Code to load the MCP server configuration.

### Cursor

Cursor is already configured in `.cursor/mcp.json` to use the Playwright MCP server with the config file at `.mcp/config.json`:

```json
{
  "mcpServers": {
    "playwright-cursor-custom-config": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "@playwright/mcp@latest",
        "--config",
        ".mcp/config.json"
      ],
      "env": {}
    }
  }
}
```

After creating or updating this file, restart Cursor to load the MCP server configuration. The server will then use the settings from `.mcp/config.json` (output directory, browser settings, capabilities, etc.).

### Other MCP Clients

For other MCP clients (Claude Desktop, custom clients, etc.), configure them to launch the server with:

```bash
npx @playwright/mcp@latest --config .mcp/config.json
```

Or without a config file (uses defaults):

```bash
npx @playwright/mcp@latest
```

**Note:** The `@playwright/mcp@latest` package is the official Playwright MCP server. The `--config` parameter points to your `.mcp/config.json` file where you can customize output directories, browser settings, capabilities, and artifact collection.

The server will communicate via stdio, so your client needs to support stdio-based MCP servers.

## Testing the Configuration

The MCP server is automatically started by your MCP client (VS Code, Cursor, etc.) when you use it. You don't need to run it manually. The server communicates via stdio and waits for input from the MCP client.

## Further Reading

- [Playwright MCP Server Documentation](https://github.com/microsoft/playwright-mcp)
- [Model Context Protocol (MCP) Documentation](https://modelcontextprotocol.io/)

