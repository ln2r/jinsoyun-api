import express from 'express'

import { challengesRoute } from './routes/challenges.route'
import { characterRoute } from './routes/character.route'

class App {
  public app: express.Application

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: false}));

    // routing
    this.app.use("/challenges", challengesRoute);
    this.app.use("/character", characterRoute);

    this.app.use("/", (req, res) => {
      res.status(200).json({
        status: 200,
        body: {
          message: 'hello from jinsoyun-api'
        }
      });
    });
  }
}

export default new App().app;