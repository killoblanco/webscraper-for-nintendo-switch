import { chromium } from 'playwright';
import alkosto from './alkosto';
import falabella from './falabella';
import ktronix from './ktronix';
import panamericana from './panamericana';
import sendEmail from './send-email';
import { StockInfo } from './types';

const sites = [
  panamericana,
  alkosto,
  ktronix,
  falabella,
];

async function searchForConsole() {
  console.log('Job started');
  const browser = await chromium.launch({ timeout: 0 });
  console.log('Browser lauched');

  const stocks: StockInfo[] = [];

  for (const { store, url, checkStock } of sites) {
    console.log(`Searching stocks in ${store}`);
    const { hasStock, shopUrl } = await checkStock({ browser, url: url });
    stocks.push({
      store: store,
      hasStock,
      shopUrl,
    });
  }

  await browser.close();
  console.log('Browser closed');
  await sendEmail(stocks);
  console.log('Job finished.');
}

(async () => {
  await searchForConsole();
  setInterval(async () => {
    await searchForConsole();
  }, 1000 * 15 * 60);
})();
