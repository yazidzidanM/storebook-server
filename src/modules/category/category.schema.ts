import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core"

export const categories = mysqlTable("categories", {
  id: int().autoincrement().notNull(),
  name: varchar({ length: 100 }).notNull(),
});