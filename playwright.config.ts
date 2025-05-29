import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
      // use: { ...devices['Desktop Chrome'], ignoreHTTPSErrors: true }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
      // use: { ...devices['Desktop Firefox'], ignoreHTTPSErrors: true }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
      // use: { ...devices['Desktop Safari'], ignoreHTTPSErrors: true }
    }
  ],
  webServer: {
    command: 'pnpm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI
    // timeout: 180 * 1000 // Increased timeout
  }
})
