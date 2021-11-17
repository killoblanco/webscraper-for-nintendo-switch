import { NodeMailgun } from 'ts-mailgun';
import { config as dotConfig } from 'dotenv';
import { StockInfo } from './types';

dotConfig();

const mailgunClient = new NodeMailgun(
  process.env.MG_PK! as string,
  process.env.MG_HOST! as string,
);

mailgunClient.fromEmail = 'switch.alert@mailgun.org';
mailgunClient.fromTitle = 'Automated nSwitch stock alert';

mailgunClient.init();

async function sendEmail(stockInfo: StockInfo[]) {
  let body = '<ul>';

  const shouldSend = stockInfo.some((stock) => stock.hasStock);

  if (shouldSend) {
    console.log('Stock found, sending email...');
    for (const stock of stockInfo) {
      if (stock.hasStock) {
        body += `<li>🎉 ${stock.store} has stock in ${stock.shopUrl}</li>`;
      } else {
        body += `<li>😖 ${stock.store} is out of stock!</li>`;
      }
    }

    body += '</ul>';

    await mailgunClient.send(
      process.env.MG_MAIL_TO! as string,
      'Nintendo Switch Alert',
      body,
    );
  }
}

export default sendEmail;
