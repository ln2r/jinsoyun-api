import { ChallengesInterface } from "../interfaces/challenges.interface";

export const getChallengeResponse = (query:string | undefined, data:ChallengesInterface | any) => {
  if (query && query !== 'weekly') {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    return {
      metadata: data.metadata,
      daily: data.daily[days.indexOf(query as string)],
    };
  } else if (query === 'weekly') {
    return {
      metadata: data.metadata,
      weekly: data.weekly
    };
  } else {
    return data;
  }
}