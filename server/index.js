import express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"

import postRoutes from './routes/posts.js';

dotenv.config()

const app = express();

app.use(bodyParser.json({ limit: "32mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "32mb", extended: true}))
app.use(cors());

//routes
app.use('/posts', postRoutes)

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology : true})
    .then(() => app.listen(PORT, () => console.log("Server running on Port:" + PORT)))
    .catch((error) => console.log(error));