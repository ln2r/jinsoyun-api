import { Router, Request, Response } from "express";

import { characterController } from "../controllers/character.controller";

class CharacterRoute {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.get("/:region/:query", (req: Request, res: Response) => 
      characterController.query(req, res)
    )
  }
}

export const characterRoute = new CharacterRoute().router