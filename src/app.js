import express from "express";
import dotenv from "dotenv";
import mainRouter from "./routes.js"
import corsMiddleware from "#middlewares/cors.middleware";
import notFound from "#middlewares/notFound.middleware";
import globalErrorHandler from "./middlewares/error.middleware.js";
import { setupSwagger } from "#config/swagger";

dotenv.config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(corsMiddleware);

app.use("/api", mainRouter);

setupSwagger(app);

app.use(notFound);

app.use(globalErrorHandler);

export default app
