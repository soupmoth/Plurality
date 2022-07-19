import express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"

import constituencyRoutes from './routes/constituencies.js';
import partyRoutes from './routes/parties.js';

dotenv.config()

const app = express();

app.use(bodyParser.json({ limit: "32mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "32mb", extended: true}))
app.use(cors());

//routes
app.use('/constituencies', constituencyRoutes)
app.use('/parties', partyRoutes)

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology : true})
    .then(() => app.listen(PORT, () => console.log("Server running on Port:" + PORT)))
    .catch((error) => console.log(error));