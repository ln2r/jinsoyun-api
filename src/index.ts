import { config } from "dotenv"
import { resolve } from "path"

import { connect } from 'mongoose'

// loading .env data
config({ path: resolve(__dirname, "../.env") })

import app from "./app" 

connect(process.env.MONGODB_URL as string, {
}, () => {
  console.log(`DB connected`);
})

app.listen(process.env.API_PORT, () => {
  console.log(`Started: ${process.env.API_PORT}`)
})