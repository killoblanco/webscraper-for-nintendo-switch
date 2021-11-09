"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Check stock of a product
 * @param {any} browser
 * @param {string }url
 */
async function checkStock({ browser, url }) {
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
            await item.getProperty("href") :
            "";
    }
    await page.close();
    return { hasStock, shopUrl };
}
const falabella = {
    store: "Falabella",
    url: "https://www.falabella.com.co/falabella-co/category/cat2540955/Nintendo?sortBy=derived.price.search%2Cdesc",
    checkStock,
};
exports.default = falabella;
//# sourceMappingURL=falabella.js.map