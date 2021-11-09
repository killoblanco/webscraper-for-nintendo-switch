import {CheckStockProps} from "./types";

async function checkStock({browser, url}: CheckStockProps) {
  const page = await browser.newPage();
  await page.goto(url);
  const orderSelector = await page.$$("#orderDesktop");
  orderSelector[0].click();
  const sortOption = await page.waitForSelector(".edd-option[title=\"Mayor precio\"]");
  await sortOption.click();
  await page.waitForTimeout(1000);
  const items = await page.$$(".item__showcase__productname__link");
  let hasStock = false;
  let shopUrl = "";
  for (const item of items) {
    const text = await item.textContent();
    hasStock = text ? text.toLocaleLowerCase().includes("oled") : false;
    shopUrl = hasStock ?
        (await item.getProperty("href") as unknown as string) :
        "";
  }
  await page.close();
  return {hasStock, shopUrl};
}

const panamericana = {
  store: "Panamericana",
  url: "https://www.panamericana.com.co/consolas-y-videojuegos/nintendo",
  checkStock,
};

export default panamericana;
