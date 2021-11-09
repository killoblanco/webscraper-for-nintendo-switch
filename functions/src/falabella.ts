import {CheckStockProps} from "./types";

async function checkStock({browser, url}: CheckStockProps) {
  const page = await browser.newPage();
  await page.goto(url);
  const items = await page.$$(".pod-details > a.pod-link");
  let hasStock = false;
  let shopUrl = "";
  for (const item of items) {
    const [textItem] = await item.$$("b.pod-subTitle");
    const text = await textItem.textContent();
    hasStock = text ? text.toLocaleLowerCase().includes("oled") : false;
    shopUrl = hasStock ?
        (await item.getProperty("href") as unknown as string) :
        "";
  }
  await page.close();
  return {hasStock, shopUrl};
}

const falabella = {
  store: "Falabella",
  url: "https://www.falabella.com.co/falabella-co/category/cat2540955/Nintendo?sortBy=derived.price.search%2Cdesc",
  checkStock,
};

export default falabella;
