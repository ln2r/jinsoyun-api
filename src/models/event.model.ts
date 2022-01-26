import { model } from "mongoose";
import { EventSchema } from "../schemas/event.schema";
import { EventInterface } from "../interfaces/event.interface";

export const EventModel = model<EventInterface>("Events", EventSchema);