import { config } from "dotenv"
import { resolve } from "path"

import { connect } from 'mongoose'

import { marketFetch } from './crons/market.cron'

// loading .env data
config({ path: resolve(__dirname, "../.env") })

import app from "./app" 

// connect db
connect(process.env.MONGODB_URL as string)
  .then(() => console.log('Database connected'))
  .catch((err) => console.error(err.message))

// start cron
marketFetch();

app.listen(process.env.API_PORT, () => {
  console.log(`Started: ${process.env.API_PORT}`)
})