export interface ChallengesInterface {
  metadata: {
    updated: number,
    source: string,
  },
  daily: string[][],
  weekly: string[]
}