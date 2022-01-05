import { ChallengesInterface } from "../interfaces/challenges.interface";
import { model } from "mongoose";
import { ChallengesSchema } from "../schemas/challenges.schema";

export const ChallengesModel = model<ChallengesInterface>("Challenges", ChallengesSchema);