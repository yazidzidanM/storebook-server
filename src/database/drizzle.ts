import { drizzle } from "drizzle-orm/mysql2";
import pool from "#config/db";

export const db = drizzle(pool);
