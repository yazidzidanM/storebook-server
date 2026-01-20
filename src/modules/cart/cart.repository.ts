import { db } from "src/database/drizzle";
import { eq } from "drizzle-orm";
import { carts } from "./cart.schema";

export class CartRepository {
  async createCart(userId: string) {
    return await db.insert(carts).values({
      userId,
    });
  }

  async getCartIdByUuid(userId: string) {
    const result = await db
      .select()
      .from(carts)
      .where(eq(carts.userId, userId));
    return result[0];
  }
}
