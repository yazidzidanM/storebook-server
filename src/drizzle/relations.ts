import { relations } from "drizzle-orm/relations";
import { categories, books, users, carts, cartItems, messages, orders, orderItems, refreshTokens } from "./schema";

export const booksRelations = relations(books, ({one, many}) => ({
	category: one(categories, {
		fields: [books.categoryId],
		references: [categories.id]
	}),
	cartItems: many(cartItems),
	orderItems: many(orderItems),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	books: many(books),
}));

export const cartsRelations = relations(carts, ({one, many}) => ({
	user: one(users, {
		fields: [carts.userId],
		references: [users.uuid]
	}),
	cartItems: many(cartItems),
}));

export const usersRelations = relations(users, ({many}) => ({
	carts: many(carts),
	messages: many(messages),
	orders: many(orders),
	refreshTokens: many(refreshTokens),
}));

export const cartItemsRelations = relations(cartItems, ({one}) => ({
	cart: one(carts, {
		fields: [cartItems.cartId],
		references: [carts.id]
	}),
	book: one(books, {
		fields: [cartItems.bookId],
		references: [books.id]
	}),
}));

export const messagesRelations = relations(messages, ({one}) => ({
	user: one(users, {
		fields: [messages.userId],
		references: [users.uuid]
	}),
}));

export const ordersRelations = relations(orders, ({one, many}) => ({
	user: one(users, {
		fields: [orders.userId],
		references: [users.uuid]
	}),
	orderItems: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({one}) => ({
	order: one(orders, {
		fields: [orderItems.orderId],
		references: [orders.id]
	}),
	book: one(books, {
		fields: [orderItems.bookId],
		references: [books.id]
	}),
}));

export const refreshTokensRelations = relations(refreshTokens, ({one}) => ({
	user: one(users, {
		fields: [refreshTokens.userId],
		references: [users.uuid]
	}),
}));