import { Schema } from "mongoose";

export const ChallengesSchema = new Schema({
  metadata: {
    updated: {
      type: Number,
    },
    source: {
      type: String,
    },
  },
  daily: {
    type: [[String]],
  },
  weekly: {
    type: [String],
  }
})