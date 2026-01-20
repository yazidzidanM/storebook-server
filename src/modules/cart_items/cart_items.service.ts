import { CartItemsRepository } from "./cart_items.repository";
import cartItemValidationSchema from "./cart_items.validation";
import ExpectedError from "#shared/errors/errorHandler";
import { cartItem } from "./cart_items.type";
import { CartRepository } from "#modules/cart/cart.repository";
import { bookRepository } from "#modules/book/book.repository";
import { IBook } from "#modules/book/book.type";

class CartItemsService {
  constructor(
    private cartItemsRepo: CartItemsRepository,
    private cartRepo: CartRepository,
    private bookRepo: bookRepository,
  ) {
    this.cartItemsRepo = new CartItemsRepository();
  }

  async syncCartItem(uuid: string, data: cartItem[]) {
    if (!Array.isArray(data) || data.length === 0) {
      throw new ExpectedError("Cart items cannot be empty", 400);
    }

    const cart = await this.cartRepo.getCartIdByUuid(uuid);
    if (!cart) throw new ExpectedError("cart not found", 500);

    const bookIds = data.map((item) => item.bookId);
    const books = await this.bookRepo.getBooksByIds(bookIds);

    const bookMap = new Map(books.map((b) => [b.id, b]));

    for (const item of data) {
      const validated = await this.validateCartItem(item);
      if (!validated) {
        throw new ExpectedError("validation failed", 400);
      }

      const book = bookMap.get(item.bookId);
      if (!book) {
        console.log(`Book ${item.bookId} not found`, 404);
      }
    }

    for (const book of books) {
      const item = data.find((d) => d.bookId === book.id);
      if (!item) continue;

      const existing = await this.cartItemsRepo.getCartItemByCartIdAndBookId(
        cart.id,
        item.bookId,
      );

      if (existing) {
        await this.cartItemsRepo.updateQuantityItemByIDcartAndIDbook(
          cart.id,
          item.bookId,
          existing.quantity + item.quantity,
        );
      } else {
        await this.cartItemsRepo.createCartItems(
          cart.id,
          item.bookId,
          item.quantity,
        );
      }
    }

    const cartItems = await this.cartItemsRepo.getAllCartItemsByIDcart(cart.id);

    if (!cartItems || cartItems.length === 0) return [];

    const arrayItems: cartItem[] = cartItems.map((item) => ({
      bookId: item.bookId,
      quantity: item.quantity,
    }));

    return arrayItems;
  }

  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjRhMzY1OWItZDY3OC00YmIwLTkwOTYtYTdjMzZkOTcyZjhkIiwibmFtZSI6IkNhbHZpbiIsInVzZXJuYW1lIjoidXNlcjEyMzQiLCJ0eXBlIjoiYWNjZXNzIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3Njg4ODI2NjgsImV4cCI6MTc2ODk2OTA2OH0.gZDDHY6XKk2H1Z6soD28NWld-0wO89DaBp1bzySdWPU

  async createCartItem(uuid: string, bookId: number, quantity: number) {
    if (!bookId || !quantity) {
      throw new ExpectedError("invalid Cart items", 400);
    }

    const cart = await this.cartRepo.getCartIdByUuid(uuid);
    if (!cart) throw new ExpectedError("cart not found", 500);

    const existing = await this.cartItemsRepo.getCartItemByCartIdAndBookId(
      cart.id,
      bookId,
    );

    if (existing) {
      await this.cartItemsRepo.updateQuantityItemByIDcartAndIDbook(
        cart.id,
        bookId,
        existing.quantity + quantity,
      );
    } else {
      await this.cartItemsRepo.createCartItems(cart.id, bookId, quantity);
    }
  }

  async getCartItemsByCartId(uuid: string) {
    if (!uuid) {
      throw new ExpectedError("Invalid id", 400);
    }

    const cart = await this.cartRepo.getCartIdByUuid(uuid);
    if (!cart) throw new ExpectedError("cart not found", 500);

    const cartItems = await this.cartItemsRepo.getAllCartItemsByIDcart(cart.id);
    let arrayItems: cartItem[] = [];
    for (const item of cartItems) {
      arrayItems.push({ bookId: item.bookId, quantity: item.quantity });
    }
    return arrayItems;
  }

  async updateCartItemQuantity(uuid: string, bookId: number, quantity: number) {
    const cart = await this.cartRepo.getCartIdByUuid(uuid);
    if (!cart) throw new ExpectedError("cart not found", 500);

    await this.validateCartItem({
      bookId,
      quantity,
    });

    return await this.cartItemsRepo.updateQuantityItemByIDcartAndIDbook(
      cart.id,
      bookId,
      quantity,
    );
  }

  async removeCartItem(uuid: string, bookId: number) {
    if (!uuid || !bookId) {
      throw new ExpectedError("Invalid cart or book id", 400);
    }

    const cart = await this.cartRepo.getCartIdByUuid(uuid);
    if (!cart) throw new ExpectedError("cart not found", 500);

    return await this.cartItemsRepo.removeCartItemByIDcartAndIDbook(
      cart.id,
      bookId,
    );
  }

  private async validateCartItem(payload: {
    bookId: number;
    quantity: number;
  }): Promise<boolean> {
    try {
      await cartItemValidationSchema.validate(payload, {
        abortEarly: false,
      });
      return true;
    } catch (err: any) {
      throw new ExpectedError(
        err.errors?.join(", ") || "Validation failed",
        400,
      );
    }
  }
}

export default CartItemsService;
