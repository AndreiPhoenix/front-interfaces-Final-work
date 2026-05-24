
import { test, expect } from '@playwright/test';

test.describe('Template Creation', () => {
  test.beforeEach(async ({ page }: { page: import('@playwright/test').Page }) => {
    await page.goto('http://localhost:3000/templates/create');
  });

  test('should show validation errors for empty form', async ({ page }: { page: import('@playwright/test').Page }) => {
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Title is required')).toBeVisible();
    await expect(page.locator('text=Content is required')).toBeVisible();
  });

  test('should allow creating a template', async ({ page }: { page: import('@playwright/test').Page }) => {
    // Fill title
    await page.fill('#title', 'Test Template');
    
    // Fill content
    await page.fill('#prompt-editor', '## Hello\nThis is a {{test}} template');
    
    // Add category
    await page.selectOption('#category', 'chain-of-thought');
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/);
  });
});