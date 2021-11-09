"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Check stock
 * @param {any} browser
 * @param {string }url
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
const ktronix = {
    store: "Ktronix",
    url: "https://www.ktronix.com/videojuegos/consolas/consolas-nintendo/c/BI_0390_KTRON?sort=price-desc",
    checkStock,
};
exports.default = ktronix;
//# sourceMappingURL=ktronix.js.map