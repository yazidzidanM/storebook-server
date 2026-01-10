import { categories } from "#modules/category/category.schema";
import { mysqlTable, int, varchar, decimal, text } from "drizzle-orm/mysql-core"


export const books = mysqlTable("books", {
  id: int().autoincrement().notNull(),
  categoryId: int("category_id").references(() => categories.id, { onDelete: "set null", onUpdate: "cascade" } ),
  title: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  price: decimal({ precision: 10, scale: 2 }).notNull(),
  stock: int().default(0).notNull(),
  image: varchar({ length: 255 }).notNull(),
});