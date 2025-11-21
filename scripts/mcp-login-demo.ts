/**
 * MCP Login Demo Script
 *
 * This script demonstrates how MCP (Model Context Protocol) tool calls map to Playwright APIs.
 * Each step is recorded in a transcript JSON file, and artifacts (screenshot, video, trace) are saved.
 *
 * MCP Tool → Playwright API mapping:
 * - open(url) → page.goto()
 * - fill(selector, value) → getByPlaceholder().fill() / getByRole().fill()
 * - click(selector) → getByRole().click()
 * - waitForNavigation() → page.waitForURL()
 * - assertText(selector, text) → expect(locator).toHaveText()
 * - saveScreenshot(path) → page.screenshot()
 * - saveTrace(path) → context.tracing.start/stop()
 * - saveVideo(path) → page.video().path()
 */

import { chromium, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

type TranscriptEntry = {
  step: string;
  details: Record<string, unknown>;
  timestamp: string;
};

const ARTIFACT_ROOT = path.resolve('artifacts');
const SCREENSHOT_PATH = path.join(ARTIFACT_ROOT, 'screenshots', 'mcp-login.png');
const VIDEO_PATH = path.join(ARTIFACT_ROOT, 'videos', 'mcp-login.webm');
const TRACE_PATH = path.join(ARTIFACT_ROOT, 'trace.zip');
const TRANSCRIPT_PATH = path.join(ARTIFACT_ROOT, 'mcp-transcript.json');

const record = (entries: TranscriptEntry[], step: string, details: Record<string, unknown>) => {
  entries.push({ step, details, timestamp: new Date().toISOString() });
};

async function ensureDirs() {
  await fs.mkdir(path.dirname(SCREENSHOT_PATH), { recursive: true });
  await fs.mkdir(path.dirname(VIDEO_PATH), { recursive: true });
}

async function run() {
  await ensureDirs();
  const transcript: TranscriptEntry[] = [];

  // Launch browser in headed mode for debugging
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    recordVideo: {
      dir: path.dirname(VIDEO_PATH),
      size: { width: 1280, height: 720 },
    },
  });
  await context.tracing.start({ screenshots: true, snapshots: true });
  const page = await context.newPage();

  try {
    // MCP tool: open(url) -> Playwright API: page.goto()
    record(transcript, 'open', { url: 'https://www.saucedemo.com/' });
    await page.goto('https://www.saucedemo.com/');

    // MCP tool: fill(selector, value) -> Playwright API: getByPlaceholder().fill()
    record(transcript, 'fill-username', { selector: '#user-name', value: 'standard_user' });
    await page.getByPlaceholder('Username').fill('standard_user');

    // MCP tool: fill(selector, value) -> Playwright API: getByPlaceholder().fill()
    record(transcript, 'fill-password', { selector: '#password', value: '********' });
    await page.getByPlaceholder('Password').fill('secret_sauce');

    // MCP tool: click(selector) -> Playwright API: getByRole().click()
    record(transcript, 'click-login', { selector: '#login-button' });
    await page.getByRole('button', { name: 'Login' }).click();

    // MCP tool: waitForNavigation() -> Playwright API: page.waitForURL()
    await page.waitForURL('**/inventory.html');

    // MCP tool: assertText(selector, text) -> Playwright API: expect(locator).toHaveText()
    record(transcript, 'assert-heading', { text: 'Products' });
    await expect(page.locator('.title')).toHaveText('Products');

    // MCP tool: saveScreenshot(path) -> Playwright API: page.screenshot()
    await page.screenshot({ path: SCREENSHOT_PATH, fullPage: true });
    record(transcript, 'screenshot', { path: SCREENSHOT_PATH });
  } finally {
    // MCP tool: saveTrace(path) -> Playwright API: context.tracing.stop()
    await context.tracing.stop({ path: TRACE_PATH });
    record(transcript, 'trace', { path: TRACE_PATH });

    // Close context first to finalize video
    await context.close();

    // MCP tool: saveVideo(path) -> Playwright API: page.video().path()
    // Video is finalized after context.close()
    const video = page.video();
    if (video) {
      const videoPath = await video.path();
      if (videoPath && videoPath !== VIDEO_PATH) {
        // Wait a bit for video to be fully written
        await new Promise(resolve => setTimeout(resolve, 500));
        await fs.copyFile(videoPath, VIDEO_PATH);
        // Clean up the original hash-named file
        await fs.unlink(videoPath).catch(() => {});
        record(transcript, 'video', { path: VIDEO_PATH });
      }
    }

    await browser.close();
  }

  await fs.writeFile(TRANSCRIPT_PATH, JSON.stringify(transcript, null, 2));
  console.log('MCP demo complete:');
  console.log(`- Transcript: ${TRANSCRIPT_PATH}`);
  console.log(`- Screenshot: ${SCREENSHOT_PATH}`);
  console.log(`- Video: ${VIDEO_PATH}`);
  console.log(`- Trace: ${TRACE_PATH}`);
}

run().catch((error) => {
  console.error('MCP demo failed:', error);
  process.exitCode = 1;
});


