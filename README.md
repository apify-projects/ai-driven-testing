# AI-Driven Testing Workshop (Playwright + MCP)

This repository contains the starter template for a 1.5-day hands-on training focused on AI-assisted end-to-end testing with Playwright, MCP tooling, and CI/CD automation. All workshop assets (prompts, slides, exercises, and Page Object Model classes) are included to help you build tests during the workshop.

**Workshop Structure:** Day 1 starts with a Playwright introduction (for beginners), then covers MCP setup, prompting principles, Page Object Model, environment variables with dotenv, baseline test generation, and CI/CD integration. Day 2 focuses on AI-generated edge cases and Playwright agents.

> Looking for the step-by-step branch to recreate the project live? Create a new branch (e.g. `walkthrough/day1`) from `main` and progressively cherry-pick commits or remove folders as you teach. Instructions below explain each component so it is easy to rebuild during the workshop.

## Repository layout

```
tests/
  examples/
    day1/        # AI-assisted prompts and documentation
    day2/        # Documentation for agents and edge case generation
  exercises/     # Hands-on tasks organized by day
    day1/        # Day 1 exercises
    day2/        # Day 2 exercises
  pages/         # Page Object Model (POM) classes
artifacts/       # Transcripts, screenshots, traces (gitignored outputs)
scripts/         # Utility scripts (MCP demo, CI helpers, etc.)
slides/          # MARP slide deck source + compiled output
.github/workflows# GitHub Actions workflow for Playwright
```

## Prerequisites

| Tool | Why we need it | Install hint |
| --- | --- | --- |
| Node.js 20+ & npm | Run Playwright tests, scripts, and the slide tooling | Use nvm: `nvm install 20 && nvm use 20` |
| Playwright browsers | Required for consistent E2E runs locally/CI | `npm run playwright:install` |
| Docker (optional) | Run tests in an isolated, reproducible container | [Install Docker Desktop](https://www.docker.com/products/docker-desktop/) |
| MCP-capable client | Drive the Playwright MCP server demo | Cursor, VS Code MCP extension, or CLI client |
| Marp CLI | Build/render the slide deck | Installed via devDependencies (`npm install`) |

## Getting started

```bash
git clone git@github.com:martinkristof/ai-driven-testing.git
cd ai-driven-testing
npm install
npm run playwright:install
```

### MCP Server Setup

**Step 1: Basic Setup (Official MCP Server)**

First, set up the Playwright MCP server following the [official documentation](https://github.com/microsoft/playwright-mcp?tab=readme-ov-file#getting-started):

**For Cursor:**
1. Open Cursor settings
2. Add Playwright MCP server configuration (see [official docs](https://github.com/microsoft/playwright-mcp?tab=readme-ov-file#getting-started))
3. Restart Cursor to load the server

**For VS Code:**
1. Install the MCP extension (if not already installed)
2. Add Playwright MCP server configuration (see [official docs](https://github.com/microsoft/playwright-mcp?tab=readme-ov-file#getting-started))
3. Restart VS Code to load the server

**Step 2: Custom Configuration (Advanced)**

After you're comfortable with the basic setup, you can use the pre-configured custom settings in this repository:

**For Cursor:**
1. The custom MCP server configuration is in `.cursor/mcp.json`
2. It uses custom settings from `.mcp/config.json` (output directory, capabilities, etc.)
3. Restart Cursor to load the custom configuration

**For VS Code:**
1. The custom MCP server configuration is in `.vscode/mcp.json`
2. It uses custom settings from `.mcp/config.json` (output directory, capabilities, etc.)
3. Restart VS Code to load the custom configuration

**Verification:**
- Open MCP chat in your IDE (Cursor: Cmd+L, VS Code: MCP chat panel)
- Check IDE logs to confirm the server started successfully
- See `.mcp/README.md` for detailed setup instructions and troubleshooting

### NPM scripts overview

| Command | Description |
| --- | --- |
| `npm test` | Run Playwright tests (tests will be created during the workshop) |
| `npm run test:headed` | Same suite but with visible browsers (demo friendly) |
| `npm run test:ui` | Launch Playwright UI mode |
| `npm run test:report` | Open the last HTML report |
| `npm run mcp:demo` | Execute the scripted MCP login flow (produces transcript + trace + screenshot under `artifacts/`) |
| `npm run slides:dev` | Preview the MARP deck with live reload |
| `npm run slides:build` | Export slides to `slides/dist/ai-testing.html` |
| `npm run docker:build` | Build the workshop container image |
| `npm run docker:test` | Run the Playwright suite inside the built container image (requires `docker:build` first) |

## Day 1 content

- **Playwright Introduction**: Slides cover Playwright basics, key concepts, and selector best practices (accessible selectors vs. brittle CSS selectors). This section is designed for attendees new to Playwright.
- `tests/pages/`: Page Object Model classes (`LoginPage`, `InventoryPage`, `CartPage`, `CheckoutPage`) that encapsulate page-specific logic. Use these classes when generating tests with AI.
- `tests/examples/day1/prompts.md`: prompt engineering walkthrough for generating the login flow with an AI assistant; includes review tips and red-team prompts. Use these prompts to generate your tests during the workshop.
- `tests/examples/day1/page-object-model.md`: documentation explaining the Page Object Model pattern and how to use it.
- **Environment Variables with dotenv**: Section 8 in `prompts.md` covers using `dotenv` for managing credentials and sensitive data. The `playwright.config.ts` is pre-configured to load `.env` file. Create a `.env` file with `USER_NAME` and `PASSWORD` variables for secure credential management.
- `scripts/mcp-login-demo.ts`: example MCP-style script that demonstrates how MCP tool calls map to Playwright APIs. Study this to understand the MCP workflow.
- `artifacts/`: output directory for MCP transcripts (`mcp-transcript.json`), screenshots, and traces. The folder is ignored by Git so your local artifacts do not pollute version control.

## Day 2 content

- `tests/examples/day2/prompts-enhancing.md`: prompts and guide for reviewing and enhancing AI-generated edge case tests. Use this to generate edge case tests during the workshop.
- `tests/examples/day2/agents.md`: quick primer on Playwright agents for the chat-driven part (planner/generator/healer, guardrails).
- `.github/workflows/playwright.yml`: CI pipeline with `pw-tests` job, artifact uploads (trace, screenshots, MCP transcript), and a GitHub Job Summary snippet.
- `slides/ai-testing.md`: MARP deck covering the agenda for both days, including references to agents and CI/CD.

## Playwright Test Agents (VS Code / Claude / OpenCode)

Playwright ships official Planner / Generator / Healer agents that can run inside VS Code (v1.105+ Insiders) or other supported loops. They explore the app, emit Markdown test plans, generate Playwright specs, and repair flaky tests. To scaffold the agent definitions and keep them in sync with the Playwright version used in this repo:

```bash
npx playwright init-agents --loop=vscode
# or: --loop=claude / --loop=opencode
```

This command adds the agent definition files under `.github/` so your IDE can expose the tools directly. After that, open the repo in VS Code Insiders, connect to the Playwright Test Agents panel, and run Planner → Generator → Healer workflows against the Sauce Demo app. More details: [Playwright Test Agents docs](https://playwright.dev/docs/test-agents#agent-definitions).

## MCP demo workflow

This repository demonstrates two approaches to using Playwright with MCP:

### Approach 1: Custom MCP-style script

The `scripts/mcp-login-demo.ts` script demonstrates a manual MCP-style workflow where you control each step:

1. Run `npm run mcp:demo` to generate the baseline artifacts locally.
2. Study `scripts/mcp-login-demo.ts` to see how tool calls map to Playwright APIs.
3. Share `artifacts/mcp-transcript.json`, `artifacts/mcp-login.png`, and `artifacts/traces/` with attendees.

This approach gives you full control over the workflow and is useful for understanding the underlying Playwright APIs.

### Approach 2: Official Playwright MCP Server

Use the official `@playwright/mcp` package with automatic tracing and screenshots. The MCP server runs as a stdio server and is typically launched by your MCP client (not as a standalone process).

**For VS Code:**
The `.vscode/mcp.json` file already configures the Playwright MCP server. When you use VS Code with the MCP extension, the server will be automatically started and you can interact with it through the MCP interface.

**For Cursor:**
The repository includes a Cursor MCP configuration at `.cursor/mcp.json` that automatically uses the config file at `.mcp/config.json`. After opening the project in Cursor, restart the IDE to load the MCP server.

**For other MCP clients (CLI, etc.):**
Configure your MCP client to use the Playwright MCP server:
```json
{
  "command": "npx",
  "args": ["@playwright/mcp@latest", "--config", ".mcp/config.json"]
}
```

The server automatically handles tracing and screenshots based on `.mcp/config.json`:
- **Traces**: Automatically saved when `saveTrace: true` is set
- **Screenshots**: Captured automatically during interactions
- All artifacts are saved to the `outputDir` specified in the config

You interact with the server through your MCP client's interface (VS Code, Cursor, etc.), not by running it directly.

### MCP Configuration

The repository includes a Playwright MCP server configuration file at `.mcp/config.json` that defines:
- Output directory for artifacts (e.g., `artifacts`)
- Enabled capabilities (e.g., `["core"]`, `["browser"]`, `["testing"]`, `["tracing"]`)
- Browser settings (browserName, isolated mode)
- Automatic artifact collection (saveTrace, saveSession)

For detailed setup instructions for different MCP clients (VS Code, Cursor, CLI) and configuration examples, see [`.mcp/README.md`](.mcp/README.md).

For VS Code, the MCP server is already configured in `.vscode/mcp.json`. To use the Playwright MCP server with other clients, refer to the [Playwright MCP documentation](https://github.com/microsoft/playwright-mcp) for setup instructions.

## Docker option

Use the provided `Dockerfile` to package dependencies for classrooms where attendees cannot install browsers locally.

```bash
npm run docker:build
npm run docker:test
```

The Dockerfile is based on the official Playwright image (`mcr.microsoft.com/playwright:v1.56.1-jammy`), so fonts, browsers, and system dependencies are already present. The built image runs `npm test` by default.

## CI/CD workflow

The GitHub Actions workflow under `.github/workflows/playwright.yml` installs dependencies, runs the tests headlessly, uploads screenshots/trace/MCP artifacts, and writes a short job summary with helpful links. Copy it into another project or adapt the steps to your preferred CI system.

## Exercises and slides

- `tests/exercises/day1/exercises.md` & `tests/exercises/day2/exercises.md` contain bite-sized challenges mapped to the agenda.
- `tests/exercises/checklist.md` doubles as a facilitator tracker.
- `slides/ai-testing.md` can be rendered with `npm run slides:build` (HTML output lives in `slides/dist/`).

## Workshop flow

This repository is set up as a starter template. During the workshop, you will:

1. Learn Playwright basics (if new to Playwright) - key concepts, selectors, and best practices.
2. Set up MCP server and configure it.
3. Use prompts from `tests/examples/day1/prompts.md` to generate login tests with AI.
4. Learn Page Object Model pattern and generate POM-based tests.
5. Configure environment variables with dotenv for secure credential management.
6. Generate edge case tests using prompts from `tests/examples/day2/prompts-enhancing.md`.
7. Use Playwright agents (Planner, Generator, Healer) to create tests for different applications.
8. Set up CI/CD workflow to run tests automatically.

---

Need help or want to contribute improvements? Open an issue or share feedback in your cohort’s channel. Happy testing! 🎯
