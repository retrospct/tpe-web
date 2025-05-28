import { test, expect, Page } from '@playwright/test';

interface ContactFormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  comments: string;
  referralOption: string;
}

async function fillAndSubmitContactForm(page: Page, data: ContactFormData) {
  await page.getByPlaceholder('Email*').fill(data.email);
  await page.getByPlaceholder('First Name*').fill(data.firstName);
  await page.getByPlaceholder('Last Name*').fill(data.lastName);
  await page.getByPlaceholder('Phone*').fill(data.phone);
  await page.getByPlaceholder('What is your event vision?').fill(data.comments);

  await page.getByPlaceholder('How did you hear about us? *').click();
  await page.getByText(data.referralOption).click();
  
  await page.getByLabel('Join our newsletter for tips, tricks, & all things TPE!').check();
  await page.getByRole('button', { name: 'SUBMIT' }).click();

  const successMessage = page.locator('[data-testid="success-message"]');
  await expect(successMessage).toBeVisible({ timeout: 10000 });
  await expect(successMessage).toHaveText(/Thank you for contacting Two Perfect Events!|We will get back to you as soon as possible./, { timeout: 10000 });
  await expect(page.getByPlaceholder('Email*')).toHaveValue(''); // Check one field for reset
}

test.describe('Contact Form Submissions', () => {
  test('should submit contact form on homepage', async ({ page }) => {
    await page.goto('/');
    await fillAndSubmitContactForm(page, {
      email: 'test.homepage@example.com',
      firstName: 'Home',
      lastName: 'PageUser',
      phone: '1234567890',
      comments: 'This is an E2E test submission from the homepage.',
      referralOption: 'Google',
    });
  });

  test('should submit contact form on /contact page', async ({ page }) => {
    await page.goto('/contact');
    await fillAndSubmitContactForm(page, {
      email: 'test.contactpage@example.com',
      firstName: 'Contact',
      lastName: 'PageUser',
      phone: '0987654321',
      comments: 'This is an E2E test submission from the /contact page.',
      referralOption: 'Instagram',
    });
  });
});
