import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./config/db";
import CountryRouter from "./routers/CountryRouter";
import GenresRouter from "./routers/GenresRouter";
import MoviesRouter from "./routers/MoviesRouter";
import AuthRouter from "./routers/AuthRouter";
import { checkrole } from "./controllers/auth";
import CommentRouter from "./routers/commentRouter";
import EpisodesRouter from "./routers/episodesRouter";
const app = express();

dotenv.config();
//Middleware
app.use(express.json());
// app.use(morgan("tiny"));
app.use(cors());
// Log chi tiết hơn khi phát triển với morgan ở mức "dev"
app.use(morgan("dev"));
// kết nối database
connectDB(process.env.DB_URI);

app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use(`/api/v1/auth`, AuthRouter);
app.use(`/api`, EpisodesRouter);
app.use(`/api/comment`, CommentRouter);
app.use(`/api/v1`, MoviesRouter);
app.use(`/api/v1`, CountryRouter);
app.use(`/api/v1`, GenresRouter);
export const viteNodeApp = app;
