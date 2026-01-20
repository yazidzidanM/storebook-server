import authRouter from "#modules/auth/auth.routes";
import bookRouter from "#modules/book/book.routes";
import categoryRouter from "#modules/category/category.routes";
import userRouter from "#modules/user/user.routes";
import cartItemRouter from "#modules/cart_items/cart_items.routes"
import express from "express";

const mainRouter = express.Router()

mainRouter.use("/auth", authRouter)
mainRouter.use("/categories", categoryRouter)
mainRouter.use("/books", bookRouter)
mainRouter.use("/users", userRouter)
mainRouter.use("/cartItems", cartItemRouter)

export default mainRouter