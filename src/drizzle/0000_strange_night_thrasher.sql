-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `books` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`category_id` int(11) DEFAULT 'NULL',
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`price` decimal(10,2) NOT NULL,
	`stock` int(11) NOT NULL DEFAULT 0,
	`image` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `carts` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user_id` int(11) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `cart_items` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`cart_id` int(11) NOT NULL,
	`book_id` int(11) NOT NULL,
	`quantity` int(11) DEFAULT 1
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user_id` int(11) NOT NULL,
	`message` text DEFAULT 'NULL',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user_id` int(11) NOT NULL,
	`order_date` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`status` enum('pending','paid','completed') NOT NULL DEFAULT '''pending'''
);
--> statement-breakpoint
CREATE TABLE `order_items` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`order_id` int(11) NOT NULL,
	`book_id` int(11) DEFAULT 'NULL',
	`quantity` int(11) NOT NULL DEFAULT 1,
	`price` decimal(10,2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `refresh_tokens` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user_id` int(11) NOT NULL,
	`token` varchar(255) NOT NULL,
	`is_revoked` tinyint(1) NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	CONSTRAINT `user_id` UNIQUE(`user_id`),
	CONSTRAINT `token` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`username` varchar(50) NOT NULL,
	`password` varchar(255) NOT NULL,
	`role` enum('admin','user') NOT NULL DEFAULT '''user''',
	CONSTRAINT `username` UNIQUE(`username`)
);
--> statement-breakpoint
ALTER TABLE `books` ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `carts` ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `messages` ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `refresh_tokens` ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;
*/