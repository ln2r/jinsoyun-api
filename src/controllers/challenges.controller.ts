import { Request, Response } from "express";
import { getChallenge } from "../utils/getChallenge.util";

export class ChallengesController {
  public async root (req: Request, res: Response) {
    console.log(`hitting ${req.baseUrl}`);
    
    try {
      const challengesData = await getChallenge();

      res.status(200).json({
        status: 200,
        body: challengesData
      })
    } catch (err) {
      if (err instanceof Error) {
        console.error(err)
        res.status(500).json({
          status: 500,
          body: {
            message: err.message
          }
        })
      }
    }
  }

  public async query (req: Request, res: Response) {
    console.log(`hitting ${req.baseUrl}/${req.params.query}`);
    
    try {
      const challengesData = await getChallenge(req.params.query);

      res.status(200).json({
        status: 200,
        body: challengesData
      })
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        res.status(500).json({
          status: 500,
          body: {
            message: err.message,
          },
        });
      }
    }
  }
}

export const challengesController = new ChallengesController()