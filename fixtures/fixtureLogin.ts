import { test as base } from '@playwright/test';
import fs from 'fs';

export const test = base.extend<{
  loggedInPage: import('@playwright/test').Page;
}>({
  loggedInPage: async ({ browser }, use) => {
    const storageStatePath = 'storageState.json';

    // Always delete storageState.json before creating a new one (fresh login)
    if (fs.existsSync(storageStatePath)) {
      fs.unlinkSync(storageStatePath);
    }

    // Create a new login state
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await page.waitForURL('**/inventory.html'); // Wait for login to complete
    await context.storageState({ path: storageStatePath });
    await context.close();

    // Use the freshly saved login state
    const freshContext = await browser.newContext({ storageState: storageStatePath });
    const freshPage = await freshContext.newPage();
    await freshPage.goto('https://www.saucedemo.com/inventory.html');
    await use(freshPage);
    await freshContext.close();
  },
});