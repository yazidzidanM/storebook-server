import { Request, Response, NextFunction } from "express";
import catchAsync from "#shared/utils/catchAsync";
import { sendResponse } from "#shared/utils/response";
import { CategoryRepository } from "./category.repository";
import CategoryServices from "./category.service";

const categoryService = new CategoryServices(new CategoryRepository());

export const createCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await categoryService.createCategory(req.body.name, req.body.description);
  sendResponse(res, {}, "category created successfully", 201);
});

export const getAllCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await categoryService.getAllCategories();
  sendResponse(res, result, "categories fetched successfully", 200);
});

export const getCategoryById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await categoryService.getCategoryById(Number(req.params.id));
  sendResponse(res, result, "category fetched successfully", 200);
});

export const updateCategoryById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await categoryService.updateCategoryById(
    Number(req.params.id),
    req.body.name,
    req.body.description
  );
  sendResponse(res, {}, "category updated successfully", 200);
});

export const deleteCategoryById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await categoryService.deleteCategoryById(Number(req.params.id));
  sendResponse(res, {}, "category deleted successfully", 200);
});