import { CheckStockProps } from './types';

async function checkStock({ browser, url }: CheckStockProps) {
  const page = await browser.newPage();
  await page.goto(url);
  const items = await page.$$('h2 a.js-product-click-datalayer');
  let hasStock = false;
  let shopUrl = '';
  for (const item of items) {
    const text = await item.textContent();
    hasStock = text?.toLocaleLowerCase().includes('oled') ?? false;
    shopUrl = hasStock ?
      (await item.getProperty('href') as unknown as string) :
      '';
    if (hasStock) break;
  }
  await page.close();
  return { hasStock, shopUrl };
}

const alkosto = {
  store: 'Alkosto',
  url: 'https://www.alkosto.com/videojuegos/consolas/consolas-nintendo/c/BI_0390_ALKOS?sort=price-desc',
  checkStock,
};

export default alkosto;
