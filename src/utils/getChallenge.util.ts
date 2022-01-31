import get from 'axios'
import { ChallengesInterface } from 'interfaces/challenges.interface';

import { ChallengesModel } from '../models/challenges.model';
import { getChallengeResponse } from './getChallengesResponse.util';

// flow: hit db > check update > return
//                             > hit site > update db > return
// https://www.hongmoon-archives.com/challenge/list-of-challenges
export const getChallenge = async (query?:string) => {
  const currentTime = new Date().getTime();
  let db = await ChallengesModel.findOne();

  const outdated = (!db)? true : ((((db as any).metadata.updated + parseInt(process.env.CHALLENGES_EXPIRE as string)) - currentTime) < 0)? true : false;

  if (outdated) {
    console.log(`Refreshing data`);

    const challengesData = {
      metadata: {
        updated: currentTime,
        source: 'hongmoon-archive'
      },
      daily: [[], [], [], [], [], [], []],
      weekly: [],
    }

    const response = await get(process.env.BNS_CHALLENGES_URL as string);
    
    let section = 'daily';
    let idx:number = 0;
    let max:number = 6;
    let tableData = response.data.match(/&quot;&gt;(.*)&lt;/ig);
        tableData = tableData.splice(7, tableData.length)
        tableData = tableData.filter((data:string) => !data.match(/Instance|Quest|PvP|img|Raids|Dungeons/igm))

    tableData.map((data:string, index:number) => {
      // switch data type when hit "Content"
      if (data.includes('Content')) {
        section = 'weekly';
      }
      
      if (section === 'daily') {
        (challengesData as any)[section][idx].push(data.replace(/(&quot;&gt;)|(&lt);/igm, ''));
        
        idx = (idx < max)? idx += 1 : 0
      } else if (section === 'weekly') {
        if (index % 2 !== 0) {
          (challengesData as any)[section].push(data.replace(/(&quot;&gt;)|(&lt);/igm, ''));
        }
      }
    });

    if (!db) {
      await ChallengesModel.create(challengesData);
    } else {
      await ChallengesModel.findOneAndUpdate({}, challengesData);
    }

    return getChallengeResponse(query, challengesData);
  }
  
  return getChallengeResponse(query, db);
}