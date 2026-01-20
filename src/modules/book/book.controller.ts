import catchAsync from "#shared/utils/catchAsync";
import { sendResponse } from "#shared/utils/response";
import { bookRepository } from "./book.repository";
import BookServices from "./book.service";

const BookService = new BookServices(new bookRepository());

export const createBook = catchAsync(
  async (req: any, res: any, next: any) => {
    const result = await BookService.createBook(
      req.body.title,
      req.body.author,
      req.body.categoryId,
      req.body.description,
      req.body.price,
      req.body.stock,
      req.body.image
    );
    sendResponse(res, {}, "book created successfully", 201);
  }
);

export const getAllBooks = catchAsync(
  async (req: any, res: any, next: any) => {
    const result = await BookService.getAllBooks();
    sendResponse(res, result, "books fetched successfully", 200);
  }
);

export const getBookById = catchAsync(
  async (req: any, res: any, next: any) => {
    const result = await BookService.getBookById(Number(req.params.id));
    sendResponse(res, result, "book fetched successfully", 200);
  }
);

export const updateBookById = catchAsync(
  async (req: any, res: any, next: any) => {
    console.log(req.body)
    const result = await BookService.updateBookById(
      Number(req.params.id),
      req.body.title,
      req.body.author,
      req.body.categoryId,
      req.body.description,
      req.body.price,
      req.body.stock,
      req.body.image
    );
    sendResponse(res, {}, "book updated successfully", 200);
  }
);

export const deleteBookById = catchAsync(
  async (req: any, res: any, next: any) => {
    const result = await BookService.deleteBookById(Number(req.params.id));
    sendResponse(res, {}, "book deleted successfully", 200);
  }
);