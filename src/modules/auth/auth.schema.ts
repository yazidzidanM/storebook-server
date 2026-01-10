import { users } from "#modules/user/user.schema";
import { mysqlTable, int, varchar, timestamp, unique, tinyint } from "drizzle-orm/mysql-core"

export const refreshTokens = mysqlTable("refresh_tokens", {
  id: int().autoincrement().notNull(),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => users.uuid, { onDelete: "cascade", onUpdate: "cascade" } ),
  token: varchar({ length: 255 }).notNull(),
  isRevoked: tinyint("is_revoked").default(0).notNull(),
  createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => [
  unique("token").on(table.token),
  unique("user_id").on(table.userId),
]);