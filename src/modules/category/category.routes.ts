import express from "express";
import * as categoryController from "./category.controller";
import { Authentication } from "#middlewares/authentication";
import { Authorization } from "#middlewares/authorization";
const categoryRouter = express.Router();

categoryRouter.use(Authentication); 
categoryRouter.use(Authorization("admin")); 

categoryRouter.post("/", categoryController.createCategory);
categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:id", categoryController.getCategoryById);
categoryRouter.put("/:id", categoryController.updateCategoryById);
categoryRouter.delete("/:id", categoryController.deleteCategoryById);

export default categoryRouter;