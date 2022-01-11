import { Request, Response } from 'express'

import { MarketModel } from '../models/market.model';

export class MarketController {
  public async query (req: Request, res: Response) {
  console.log(`hitting ${req.baseUrl}/${req.params.region}/${req.params.query}`);
  
    try {     
      const query = new RegExp(req.params.query, "i")
      const db = await MarketModel.find({name: query, region: (req.params.region).toUpperCase()}).sort({ ISO: -1 });
      
      if (db.length > 0) {
        res.status(200).json({
          status: 200, 
          body: db,
        });
      } else {
        res.status(404).json({
          status: 404,
          body: {
            message: 'Not Found'
          }
        })
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        res.status(500).json({
          status: 500,
          body: {
            message: err.message
          }
        })
      }
    }
  }
}

export const marketController = new MarketController()