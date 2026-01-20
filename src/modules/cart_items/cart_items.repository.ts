import { db } from "src/database/drizzle";
import { and, eq } from "drizzle-orm";
import { cartItems } from "./cart_items.schema";
import { cartItem } from "./cart_items.type";

export class CartItemsRepository {
  async createCartItems(IDcart: number, IDbook: number, qty: number) {
    return await db.insert(cartItems).values({
      cartId: IDcart,
      bookId: IDbook,
      quantity: qty,
    });
  }

  async getAllCartItemsByIDcart(IDcart: number) {
    const result = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.cartId, IDcart));
    console.log(result);
    return result;
  }

  async getCartItemByCartIdAndBookId(
    IDcart: number,
    IDbook: number,
  ): Promise<cartItem | null> {
    const result = await db
      .select()
      .from(cartItems)
      .where(and(eq(cartItems.cartId, IDcart), eq(cartItems.bookId, IDbook)));
    return result[0] ?? null;
  }

  async updateQuantityItemByIDcartAndIDbook(
    IDcart: number,
    IDbook: number,
    qty: number,
  ) {
    const result = await db
      .update(cartItems)
      .set({
        quantity: qty,
      })
      .where(and(eq(cartItems.cartId, IDcart), eq(cartItems.bookId, IDbook)));
    return result;
  }

  async removeCartItemByIDcartAndIDbook(IDcart: number, IDbook: number) {
    const result = await db
      .delete(cartItems)
      .where(and(eq(cartItems.cartId, IDcart), eq(cartItems.bookId, IDbook)));
    return result;
  }
}
