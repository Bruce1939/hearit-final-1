import express from "express";
import cors from "cors";
import connectDB from './config/connectDB.js';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
dotenv.config();

const app = express();
import authRoutes from './routes/auth.js';
import podcastRoutes from './routes/podcast.js';
import searchRoutes from './routes/search.js';


await connectDB();

app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.listen(process.env.PORT || 5000, () =>
    console.log(`server started on port ${process.env.PORT || 5000}`)
);

app.use("/auth", authRoutes);
app.use("/podcast", podcastRoutes);
app.use("/search", searchRoutes);
