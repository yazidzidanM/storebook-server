import express from "express";
import * as bookController from "./book.controller";
import { Authentication } from "#middlewares/authentication";
import { Authorization } from "#middlewares/authorization";
const bookRouter = express.Router();

bookRouter.use(Authentication); 
bookRouter.use(Authorization("admin")); 

bookRouter.post("/", bookController.createBook);
bookRouter.get("/", bookController.getAllBooks);
bookRouter.get("/:id", bookController.getBookById);
bookRouter.put("/:id", bookController.updateBookById);
bookRouter.delete("/:id", bookController.deleteBookById);
export default bookRouter;