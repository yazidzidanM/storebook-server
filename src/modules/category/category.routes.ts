import express from "express";
import * as categoryController from "./category.controller";
import { Authentication } from "#middlewares/authentication";
import { Authorization } from "#middlewares/authorization";
const categoryRouter = express.Router();

categoryRouter.post(
  "/",
  Authentication,
  Authorization("admin"),
  categoryController.createCategory,
);
categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get(
  "/:id",
  Authentication,
  Authorization("admin"),
  categoryController.getCategoryById,
);
categoryRouter.put(
  "/:id",
  Authentication,
  Authorization("admin"),
  categoryController.updateCategoryById,
);
categoryRouter.delete(
  "/:id",
  Authentication,
  Authorization("admin"),
  categoryController.deleteCategoryById,
);

export default categoryRouter;
