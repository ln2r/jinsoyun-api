import { model } from "mongoose";

import { CharacterInterface } from "../interfaces/character.interface";
import { CharacterSchema } from "../schemas/character.schema";

export const CharacterModel = model<CharacterInterface>("Characters", CharacterSchema);