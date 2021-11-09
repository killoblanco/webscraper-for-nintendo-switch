"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mailgun_1 = require("ts-mailgun");
const mailgunClient = new ts_mailgun_1.NodeMailgun("key-cba685ce18761381e5657d53cb9378e3", "mg.killoblan.co");
mailgunClient.fromEmail = "switch.alert@mailgun.org";
mailgunClient.fromTitle = "Automated nSwitch stock alert";
mailgunClient.init();
/**
 * Send an email to the user with the stock info
 * @param {any[]} stockInfo
 */
async function sendEmail(stockInfo) {
    let body = "<ul>";
    const shouldSend = stockInfo.some((stock) => stock.hasStock);
    if (shouldSend) {
        for (const stock of stockInfo) {
            if (stock.hasStock) {
                body += `<li>🎉 ${stock.store} has stock in ${stock.shopUrl}</li>`;
            }
            else {
                body += `<li>😖 ${stock.store} is out of stock!</li>`;
            }
        }
        body += "</ul>";
        await mailgunClient.send("killo.blanco@gmail.com", "Nintendo Switch Alert", body);
    }
}
exports.default = sendEmail;
//# sourceMappingURL=send-email.js.map