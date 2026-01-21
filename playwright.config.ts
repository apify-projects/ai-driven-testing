import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

const SAUCE_DEMO_BASE_URL = 'https://www.saucedemo.com/';
// Read from ".env" file.
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  fullyParallel: true,
  retries: 1,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'artifacts/junit-results.xml' }],
  ],
  use: {
    baseURL: SAUCE_DEMO_BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    testIdAttribute: 'data-test',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.seed\.ts/,
    },
    {
      name: 'logged-in-chromium',
      testMatch: /.examples\/day2\/tests\/.*\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/user.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/user.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
         storageState: '.auth/user.json'
        },
      dependencies: ['setup'],
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        storageState: '.auth/user.json'
       },
      dependencies: ['setup'],
    },
  ],
  outputDir: 'test-results',
});


