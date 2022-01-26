import { Schema } from "mongoose";


export const EventSchema = new Schema({
  metadata: {
    updated: {
      type: Number,
    },
    source: {
      type: String,
    },
  },
  events: [
    {
      title: {
        type: String
      },
      duration: {
        type: String
      },
      redemption: {
        type: String
      },
      currency: {
        type: String
      },
      summary: {
        type: String
      },
    },
  ]
})