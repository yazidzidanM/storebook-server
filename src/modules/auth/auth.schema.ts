import { mysqlTable, int, varchar, date, boolean } from "drizzle-orm/mysql-core";

const authRepository = mysqlTable("refresh_tokens", {
  id: int("id").primaryKey().autoincrement(),
  user_id: int("user_id").unique(),
  token: varchar("token", { length: 255 }),
  is_revoked: boolean("is_revoked").default(false),
  created_at: date("created_at").notNull(),
});

export default authRepository;