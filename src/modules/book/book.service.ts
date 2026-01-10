import { bookRepository } from "./book.repository";
import bookValidationSchema from "./book.validation";
import ExptectedError from "#shared/errors/errorHandler";
// import redis from "#config/redis";

export const bookCacheKey = "books:all";
class BookServices {
  constructor(private bookRepo: bookRepository) {
    this.bookRepo = new bookRepository();
  }

  async createBook(
    title: string,
    author: string,
    categoryId: number,
    description: string,
    price: string,
    stock: number,
    image: string
  ) {
    const validated = bookValidationSchema.validate({
      title,
      author,
      categoryId,
      description,
      price,
      stock,
      image,
    });
    if (!validated) throw new ExptectedError("validation failed", 400);

    // await redis.del(bookCacheKey);

    return await this.bookRepo.createBook(
      title,
      author,
      categoryId,
      description,
      price,
      stock,
      image
    );
  }

  async getAllBooks() {
    // const cachedBooks = await redis.get(bookCacheKey);
    // if (cachedBooks) {
    //   return JSON.parse(cachedBooks);
    // }
    const books = await this.bookRepo.getAllBooks();
    // await redis.set(bookCacheKey, JSON.stringify(books), 'EX', 3600);

    return books;
  }

  async getBookById(id: number) {
    return await this.bookRepo.getBookById(id);
  }

  async updateBookById(
    id: number,
    title: string,
    author: string,
    categoryId: number,
    description: string,
    price: string,
    stock: number,
    image: string
  ) {

    const validated = bookValidationSchema.validate({
      title,
      author,
      categoryId,
      description,
      price,
      stock,
      image,
    });
    if (!validated) throw new ExptectedError("validation failed", 400);

    // await redis.del(bookCacheKey);

    return await this.bookRepo.updateBookById(
      id,
      title,
      author,
      categoryId,
      description,
      price,
      stock,
      image
    );
  }

  async deleteBookById(id: number) {
    // await redis.del(bookCacheKey);
    return await this.bookRepo.deleteBookById(id);
  }
}

export default BookServices;
