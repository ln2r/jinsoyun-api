import { MetadataInterface } from "./metadata.interface";

export interface ChallengesInterface {
  metadata: MetadataInterface,
  daily: string[][],
  weekly: string[]
}