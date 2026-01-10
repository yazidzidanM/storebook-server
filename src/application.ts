import express from "express";
import dotenv from "dotenv";
import mainRouter from "./routes"
import globalErrorHandler from "./middlewares/error.middleware";
import { setupSwagger } from "./config/swagger";
import corsMiddleware from "./middlewares/cors.middleware";
import notFound from "./middlewares/notFound.middleware";
import cookiesParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookiesParser());

app.use(express.urlencoded({ extended: true }));

app.use(corsMiddleware);

app.use("/api", mainRouter);

setupSwagger(app);

app.use(notFound);

app.use(globalErrorHandler);

export default app
