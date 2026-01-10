import authRouter from "#modules/auth/auth.routes";
import bookRouter from "#modules/book/book.routes";
import categoryRouter from "#modules/category/category.routes";
import express from "express";
const mainRouter = express.Router()

mainRouter.use("/auth", authRouter)
mainRouter.use("/categories", categoryRouter)
mainRouter.use("/books", bookRouter)

export default mainRouter