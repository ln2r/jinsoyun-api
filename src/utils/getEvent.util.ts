import { EventModel } from '../models/event.model';
import { getArticle } from './getArticle.util';

export const getEvent = async () => {
  const currentTime = new Date().getTime();
  const db = await EventModel.findOne();

  const outdated = (!db)? true : ((((db as any).metadata.updated + parseInt(process.env.EVENT_EXPIRE as string)) - currentTime) < 0)? true : false;

  if (outdated) {
    console.log('Event data outdated, refreshing');

    const article = await getArticle(process.env.BNS_NEWS_URL as string);
    // handling if the "latest" articles aren't patch notes
    if (article) {
      const eventData = {
        metadata: {
          updated: currentTime,
          source: article.url
        },
        events: article.events,
      };
  
      if (!db) {
        await EventModel.create(eventData);
      } else {
        await EventModel.findOneAndUpdate({}, eventData);
      }
  
      return eventData;
    } else {
      return db;
    }
  }

  return db;
}