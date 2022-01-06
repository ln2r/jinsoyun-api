import { marketController } from "../controllers/market.controller";
import { Router, Request, Response } from "express";


class MarketRoute {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.get("/:region/:query", (req: Request, res: Response) => 
      marketController.query(req, res)
    )
  }
}

export const marketRoute = new MarketRoute().router