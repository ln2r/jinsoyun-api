import { Schema } from "mongoose";


export const MarketSchema = new Schema({
  name: {
    type: String
  },
  region: {
    type: String
  },
  id: {
    type: Number
  },
  ISO: {
    type: String
  },
  totalListings: {
    type: Number
  },
  priceEach: {
    type: Number
  },
  priceTotal: {
    type: Number
  },
  quantity: {
    type: Number
  },
})