import { users } from "#modules/user/user.schema";
import { mysqlTable, int, varchar, timestamp, } from "drizzle-orm/mysql-core"

export const carts = mysqlTable("carts", {
  id: int().autoincrement().notNull(),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => users.uuid, { onDelete: "cascade", onUpdate: "cascade" } ),
  createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});