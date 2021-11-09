import {Browser} from "playwright";

export interface CheckStockProps {
  browser: Browser;
  url: string;
}

export interface StockInfo {
  store: string,
  hasStock: boolean,
  shopUrl: string,
}
