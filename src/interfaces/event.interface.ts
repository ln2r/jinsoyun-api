export interface EventInterface {
  metadata: {
    updated: number,
    source: string,
  },
  events: {
    title: string,
    duration: string,
    redemption: string,
    currency: string,
    summary: string,
  }[]
}