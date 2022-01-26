import get from 'axios'
import { load } from "cheerio"

const getUrl = (html:string) => {
  return new Promise ((resolve, reject) => {
    try {
      const $ = load(html);
      const articles = $(".news-list-item");

      articles.map((idx, element) => {
        const content = $(element).text();

        if (content.includes('Patch Notes')) {
          resolve($(element).find('a').attr('href'))
        }
      })
    } catch (err) {
      if (err instanceof Error) {
        reject(err)
      }
    }
  });
}

export const getArticle = async (url:string) => {
  const newsPage = await get(url as string);
  const articleUrl = await getUrl(newsPage.data);
  const articleData = await get(`https://www.bladeandsoul.com/en-us/${articleUrl}`);
  
  const $ = load(articleData.data);
  const body = $('.article-body').contents();

  const events:any[] = []
  const lists:any[] = []
  body.find('li').map((idx, element) => {
    if ($(element).text() !== ''){
      const clean = $(element).text().replace(/\n.*/ig, '');
      if (clean !== '') {
        lists.push($(element).text().replace(/\n.*/ig, ''));
      }
    } 
  });

  // get the event data
  lists.map((text:string, idx:number) => {
    if (text.includes('Reward Redemption Period: ')) {
      // replace with space won't work for some reason
      // have to do it this way so i can trim it
      const currency = lists[idx+1].replace('Event Currency:', '');
      events.push({
        title: lists[idx-2].trim(),
        duration: lists[idx-1].replace('Duration: ', ''),
        redemption: text.replace('Reward Redemption Period: ', ''),
        currency: currency.trim(),
        summary: lists[idx+3].trim(),
      });
    }
  })

  return {
    url: `https://www.bladeandsoul.com/en-us${articleUrl}`,
    events: events,
  };
}