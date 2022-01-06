import { model } from "mongoose";

import { MarketInterface } from "../interfaces/market.interface";
import { MarketSchema } from "../schemas/market.schema";


export const MarketModel = model<MarketInterface>("market", MarketSchema);