import { Router, Request, Response } from "express";

import { challengesController } from "../controllers/challenges.controller";

class ChallengesRoute {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.get("/:query", (req: Request, res: Response) =>
      challengesController.query(req, res)
    )
    
    this.router.get("/", (req: Request, res: Response) => 
      challengesController.root(req, res)
    )
  }
}

export const challengesRoute = new ChallengesRoute().router