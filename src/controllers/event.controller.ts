import { Request, Response } from "express";
import { getEvent } from "../utils/getEvent.util";


export class EventController {
  public async query (req: Request, res: Response) {
    const event = await getEvent();

    res.status(200).json({
      status: 200,
      body: event
    });
  }
}

export const eventController = new EventController()