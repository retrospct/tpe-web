# Test info

- Name: Contact Form Submissions >> should submit contact form on homepage
- Location: /app/e2e/contact-form.spec.ts:32:7

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Invalid url: "/"
Call log:
  - navigating to "/", waiting until "load"

    at /app/e2e/contact-form.spec.ts:33:16
```

# Test source

```ts
   1 | import { test, expect, Page } from '@playwright/test';
   2 |
   3 | interface ContactFormData {
   4 |   email: string;
   5 |   firstName: string;
   6 |   lastName: string;
   7 |   phone: string;
   8 |   comments: string;
   9 |   referralOption: string;
  10 | }
  11 |
  12 | async function fillAndSubmitContactForm(page: Page, data: ContactFormData) {
  13 |   await page.getByPlaceholder('Email*').fill(data.email);
  14 |   await page.getByPlaceholder('First Name*').fill(data.firstName);
  15 |   await page.getByPlaceholder('Last Name*').fill(data.lastName);
  16 |   await page.getByPlaceholder('Phone*').fill(data.phone);
  17 |   await page.getByPlaceholder('What is your event vision?').fill(data.comments);
  18 |
  19 |   await page.getByPlaceholder('How did you hear about us? *').click();
  20 |   await page.getByText(data.referralOption).click();
  21 |   
  22 |   await page.getByLabel('Join our newsletter for tips, tricks, & all things TPE!').check();
  23 |   await page.getByRole('button', { name: 'SUBMIT' }).click();
  24 |
  25 |   const successMessage = page.locator('[data-testid="success-message"]');
  26 |   await expect(successMessage).toBeVisible({ timeout: 10000 });
  27 |   await expect(successMessage).toHaveText(/Thank you for contacting Two Perfect Events!|We will get back to you as soon as possible./, { timeout: 10000 });
  28 |   await expect(page.getByPlaceholder('Email*')).toHaveValue(''); // Check one field for reset
  29 | }
  30 |
  31 | test.describe('Contact Form Submissions', () => {
  32 |   test('should submit contact form on homepage', async ({ page }) => {
> 33 |     await page.goto('/');
     |                ^ Error: page.goto: Protocol error (Page.navigate): Invalid url: "/"
  34 |     await fillAndSubmitContactForm(page, {
  35 |       email: 'test.homepage@example.com',
  36 |       firstName: 'Home',
  37 |       lastName: 'PageUser',
  38 |       phone: '1234567890',
  39 |       comments: 'This is an E2E test submission from the homepage.',
  40 |       referralOption: 'Google',
  41 |     });
  42 |   });
  43 |
  44 |   test('should submit contact form on /contact page', async ({ page }) => {
  45 |     await page.goto('/contact');
  46 |     await fillAndSubmitContactForm(page, {
  47 |       email: 'test.contactpage@example.com',
  48 |       firstName: 'Contact',
  49 |       lastName: 'PageUser',
  50 |       phone: '0987654321',
  51 |       comments: 'This is an E2E test submission from the /contact page.',
  52 |       referralOption: 'Instagram',
  53 |     });
  54 |   });
  55 | });
  56 |
```