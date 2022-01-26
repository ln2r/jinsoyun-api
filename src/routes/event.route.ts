import { Request, Response, Router } from "express";
import { eventController } from "../controllers/event.controller";

class EventRoute {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.get("/", (req: Request, res: Response) => 
      eventController.query(req, res)
    )
  }
}

export const eventRoute = new EventRoute().router