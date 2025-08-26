import { Page } from '@playwright/test';
import { getItemPrice } from '../utilities/extractPrice'; 

export async function addHighestPricedItemToCart(page: Page): Promise<void> {
  if (page.isClosed()) {
    throw new Error('❌ Cannot interact with page: it has already been closed.');
  }

  const itemLocator = page.locator('.inventory_item');
  const itemCount = await itemLocator.count();

  if (itemCount === 0) {
    console.warn('⚠️ No inventory items found on the page.');
    return;
  }

  let highestPrice = 0;
  let highestItemIndex = -1;

  for (let i = 0; i < itemCount; i++) {
    const item = itemLocator.nth(i);
    const price = await getItemPrice(item);

    if (price > highestPrice) {
      highestPrice = price;
      highestItemIndex = i;
    }
  }

  if (highestItemIndex >= 0) {
    const highestItem = itemLocator.nth(highestItemIndex);
    const addToCartButton = highestItem.locator('button:has-text("Add to cart")');

    try {
      await addToCartButton.click();
      console.log(`✅ Added item with highest price ($${highestPrice.toFixed(2)}) to cart.`);
    } catch (error) {
      console.error(`❌ Failed to click 'Add to cart' button:`, error);
    }
  } else {
    console.warn('⚠️ No valid item with a price found.');
  }
}