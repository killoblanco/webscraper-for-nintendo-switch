"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchForConsole = void 0;
const firebase_functions_1 = require("firebase-functions");
const playwright_1 = require("playwright");
const alkosto_1 = require("./alkosto");
const falabella_1 = require("./falabella");
const ktronix_1 = require("./ktronix");
const panamericana_1 = require("./panamericana");
const send_email_1 = require("./send-email");
const sites = [
    panamericana_1.default,
    alkosto_1.default,
    ktronix_1.default,
    falabella_1.default,
];
exports.searchForConsole = firebase_functions_1.pubsub.schedule("every 1 hours")
    .onRun(async () => {
    const browser = await playwright_1.chromium.launch({ timeout: 0 });
    const stocks = [];
    for (const { store, url, checkStock } of sites) {
        const { hasStock, shopUrl } = await checkStock({ browser, url: url });
        stocks.push({
            store: store,
            hasStock,
            shopUrl,
        });
    }
    await browser.close();
    await send_email_1.default(stocks);
});
//# sourceMappingURL=index.js.map