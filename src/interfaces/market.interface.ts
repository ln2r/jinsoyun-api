export interface MarketInterface {
  metadata: {
    updated: number,
    source: string,
  }
  name: string,
  region: string,
  id: number,
  ISO: string,
  totalListings: number,
  priceEach: number,
  priceTotal: number,
  quantity: number,
}