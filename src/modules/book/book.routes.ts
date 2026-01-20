import express from "express";
import * as bookController from "./book.controller";
import { Authentication } from "#middlewares/authentication";
import { Authorization } from "#middlewares/authorization";
const bookRouter = express.Router();

bookRouter.post(
  "/",
  Authentication,
  Authorization("admin"),
  bookController.createBook,
);
bookRouter.get("/", bookController.getAllBooks);
bookRouter.get(
  "/:id",
  Authentication,
  Authorization("admin"),
  bookController.getBookById,
);
bookRouter.put(
  "/:id",
  Authentication,
  Authorization("admin"),
  bookController.updateBookById,
);
bookRouter.delete(
  "/:id",
  Authentication,
  Authorization("admin"),
  bookController.deleteBookById,
);

export default bookRouter;
