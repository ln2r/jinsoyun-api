import { scheduleJob } from 'node-schedule'

import get from 'axios'

import { MarketInterface } from '../interfaces/market.interface'
import { MarketModel } from '../models/market.model'

export const marketFetch = () => {
  console.log(`Automation started for market data`);

  scheduleJob('0 5 * * * *', async () => {
    console.log(`Running market data fetch`);

    const marketNAApi = await get('https://api.silveress.ie/bns/v3/market/na/current/lowest');
    const marketEUApi = await get('https://api.silveress.ie/bns/v3/market/eu/current/lowest');

    marketNAApi.data.map((item:MarketInterface) => {
      item.region = 'NA'
    });

    marketEUApi.data.map((item:MarketInterface) => {
      item.region = 'EU'
    });

    const marketData = [...marketNAApi.data, ...marketEUApi.data];

    // drop cols
    await MarketModel.collection.drop();
    // insertd

    await MarketModel.create(marketData);
 
  })
}