import { mysqlTable, mysqlSchema, AnyMySqlColumn, foreignKey, int, varchar, text, decimal, timestamp, unique, mysqlEnum, tinyint } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const books = mysqlTable("books", {
	id: int().autoincrement().notNull(),
	categoryId: int("category_id").references(() => categories.id, { onDelete: "set null", onUpdate: "cascade" } ),
	title: varchar({ length: 255 }).notNull(),
	description: text().notNull(),
	price: decimal({ precision: 10, scale: 2 }).notNull(),
	stock: int().default(0).notNull(),
	image: varchar({ length: 255 }).notNull(),
});

export const carts = mysqlTable("carts", {
	id: int().autoincrement().notNull(),
	userId: varchar("user_id", { length: 255 }).notNull().references(() => users.uuid, { onDelete: "cascade", onUpdate: "cascade" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const cartItems = mysqlTable("cart_items", {
	id: int().autoincrement().notNull(),
	cartId: int("cart_id").notNull().references(() => carts.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	bookId: int("book_id").notNull().references(() => books.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	quantity: int().default(1),
});

export const categories = mysqlTable("categories", {
	id: int().autoincrement().notNull(),
	name: varchar({ length: 100 }).notNull(),
});

export const messages = mysqlTable("messages", {
	id: int().autoincrement().notNull(),
	userId: varchar("user_id", { length: 255 }).default('NULL').references(() => users.uuid, { onDelete: "set null", onUpdate: "cascade" } ),
	message: text().default('NULL'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
},
(table) => [
	unique("user_id").on(table.userId),
]);

export const orders = mysqlTable("orders", {
	id: int().autoincrement().notNull(),
	userId: varchar("user_id", { length: 255 }).notNull().references(() => users.uuid, { onDelete: "cascade", onUpdate: "cascade" } ),
	orderDate: timestamp("order_date", { mode: 'string' }).default('current_timestamp()').notNull(),
	status: mysqlEnum(['pending','paid','completed']).default('pending').notNull(),
});

export const orderItems = mysqlTable("order_items", {
	id: int().autoincrement().notNull(),
	orderId: int("order_id").notNull().references(() => orders.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	bookId: int("book_id").references(() => books.id, { onDelete: "set null", onUpdate: "cascade" } ),
	quantity: int().default(1).notNull(),
	price: decimal({ precision: 10, scale: 2 }).notNull(),
});

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

export const users = mysqlTable("users", {
	id: int().autoincrement().notNull(),
	uuid: varchar({ length: 255 }).notNull(),
	name: varchar({ length: 100 }).notNull(),
	username: varchar({ length: 50 }).notNull(),
	password: varchar({ length: 255 }).notNull(),
	role: mysqlEnum(['admin','user']).default('user').notNull(),
},
(table) => [
	unique("username").on(table.username),
	unique("uuid").on(table.uuid),
]);
