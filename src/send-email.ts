import sendGrid from '@sendgrid/mail';
import { config as dotConfig } from 'dotenv';
import { StockInfo } from './types';

dotConfig();

sendGrid.setApiKey(process.env.SG_AK!);

async function sendEmail(stockInfo: StockInfo[]) {
  const msg = {
    to: process.env.SG_TO!,
    from: process.env.SG_FROM!,
    subject: 'Automated nSwitch stock alert',
    text: 'Stock Found',
  };
  let html = '<p>Stock Found:</p><ul>';

  const shouldSend = stockInfo.some((stock) => stock.hasStock);

  if (shouldSend) {
    console.log('Stock found, sending email...');
    for (const stock of stockInfo) {
      if (stock.hasStock) {
        const link = `<a href="${stock.shopUrl}">here</a>`
        html += `<li>🎉 ${stock.store} has stock in ${link}</li>`;
      } else {
        html += `<li>😖 ${stock.store} is out of stock!</li>`;
      }
    }

    html += '</ul>';

    await sendGrid.send({ ...msg, html });
    console.log('Email sent.')
  }
}

export default sendEmail;
