# Test info

- Name: should load homepage and show main heading
- Location: /app/e2e/homepage.spec.ts:3:5

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Invalid url: "/"
Call log:
  - navigating to "/", waiting until "load"

    at /app/e2e/homepage.spec.ts:4:14
```

# Test source

```ts
  1 | import { test, expect } from '@playwright/test';
  2 |
  3 | test('should load homepage and show main heading', async ({ page }) => {
> 4 |   await page.goto('/');
    |              ^ Error: page.goto: Protocol error (Page.navigate): Invalid url: "/"
  5 |   await expect(page.locator('h1').first()).toBeVisible();
  6 |   await expect(page).toHaveTitle(/Two Perfect Events/);
  7 | });
  8 |
```