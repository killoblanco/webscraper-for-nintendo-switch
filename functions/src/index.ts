import {pubsub} from "firebase-functions";
import {chromium} from "playwright";
import alkosto from "./alkosto";
import falabella from "./falabella";
import ktronix from "./ktronix";
import panamericana from "./panamericana";
import sendEmail from "./send-email";

const sites = [
  panamericana,
  alkosto,
  ktronix,
  falabella,
];

export const searchForConsole = pubsub.schedule("every 1 hours")
    .onRun(async (context) => {
      const browser = await chromium.launch({timeout: 0});

      const stocks: any[] = [];

      for (const {store, url, checkStock} of sites) {
        const {hasStock, shopUrl} = await checkStock({browser, url: url});
        stocks.push({
          store: store,
          hasStock,
          shopUrl,
        });
      }

      await browser.close();
      await sendEmail(stocks);
    });
