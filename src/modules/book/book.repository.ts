import { db } from "src/database/drizzle";
import { eq, inArray } from "drizzle-orm";
import { books } from "./book.schema";
import { IBook } from "./book.type.d";

export class bookRepository {
  async createBook(
    title: string,
    author: string,
    categoryId: number,
    description: string,
    price: string,
    stock: number,
    image: string,
  ) {
    const result = await db.insert(books).values({
      categoryId,
      title,
      author,
      description,
      price,
      stock,
      image,
    });
    return result;
  }

  async getAllBooks(): Promise<IBook[]> {
    const result = await db.select().from(books);
    return result;
  }

  async getBookById(id: number): Promise<IBook | undefined> {
    const result = await db.select().from(books).where(eq(books.id, id));
    return result[0];
  }

  async getBooksByIds(ids: number[]) {
    if (ids.length === 0) return [];

    return await db.select().from(books).where(inArray(books.id, ids));
  }

  async updateBookById(
    id: number,
    title: string,
    author: string,
    categoryId: number,
    description: string,
    price: string,
    stock: number,
    image: string,
  ) {
    const result = await db
      .update(books)
      .set({ title, author, categoryId, description, price, stock, image })
      .where(eq(books.id, id));
    return result;
  }
  async deleteBookById(id: number) {
    const result = await db.delete(books).where(eq(books.id, id));
    return result;
  }
}
