import { books } from "#modules/book/book.schema";
import { carts } from "#modules/cart/cart.schema";
import { mysqlTable, mysqlSchema, AnyMySqlColumn, foreignKey, int, varchar, text, decimal, timestamp, unique, mysqlEnum, tinyint } from "drizzle-orm/mysql-core"

export const cartItems = mysqlTable("cart_items", {
  id: int().autoincrement().notNull(),
  cartId: int("cart_id").notNull().references(() => carts.id, { onDelete: "cascade", onUpdate: "cascade" } ),
  bookId: int("book_id").notNull().references(() => books.id, { onDelete: "cascade", onUpdate: "cascade" } ),
  quantity: int().default(1).notNull(),
});