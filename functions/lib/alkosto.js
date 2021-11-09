"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Check stock
 * @param browser
 * @param url
 */
async function checkStock({ browser, url }) {
    const page = await browser.newPage();
    await page.goto(url);
    const items = await page.$$("h2 a.js-product-click-datalayer");
    let hasStock = false;
    let shopUrl = "";
    for (const item of items) {
        const text = await item.textContent();
        hasStock = text ? text.toLocaleLowerCase().includes("oled") : false;
        shopUrl = hasStock ?
            await item.getProperty("href") :
            "";
    }
    await page.close();
    return { hasStock, shopUrl };
}
const alkosto = {
    store: "Alkosto",
    url: "https://www.alkosto.com/videojuegos/consolas/consolas-nintendo/c/BI_0390_ALKOS?sort=price-desc",
    checkStock,
};
exports.default = alkosto;
//# sourceMappingURL=alkosto.js.map