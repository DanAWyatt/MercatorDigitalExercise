import { test as base } from '@playwright/test';
import fs from 'fs';

export const test = base.extend<{
  loggedInPage: import('@playwright/test').Page;
}>({
  loggedInPage: async ({ browser }, use) => {
    const storageStatePath = 'storageState.json';

    // Create login state if missing
    if (!fs.existsSync(storageStatePath)) {
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto('https://www.saucedemo.com/');
      await page.fill('[data-test="username"]', 'standard_user');
      await page.fill('[data-test="password"]', 'secret_sauce');
      await page.click('[data-test="login-button"]');
      await page.waitForURL('**/inventory.html'); // Wait for login to complete
      await context.storageState({ path: storageStatePath });
      await context.close();
    }

    // Use saved login state
    const context = await browser.newContext({ storageState: storageStatePath });
    const page = await context.newPage();
    await page.goto('https://www.saucedemo.com/inventory.html');
    await use(page);
    await context.close();
  },
});
