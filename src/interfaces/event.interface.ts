import { MetadataInterface } from "./metadata.interface";

export interface EventInterface {
  metadata: MetadataInterface,
  events: {
    title: string,
    duration: string,
    redemption: string,
    currency: string,
    summary: string,
  }[]
}