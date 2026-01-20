import { int, mysqlEnum, mysqlTable, unique, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
	id: int().autoincrement().notNull(),
	uuid: varchar({ length: 255 }).notNull(),
	name: varchar({ length: 100 }).notNull(),
	username: varchar({ length: 50 }).notNull(),
	password: varchar({ length: 255 }).notNull(),
	role: mysqlEnum(['admin','user']).default('user').notNull(),
	phone: varchar({ length: 255 }).notNull(),
	address: varchar({ length: 255 }).notNull(),
},
(table) => [
	unique("username").on(table.username),
	unique("uuid").on(table.uuid),
]);