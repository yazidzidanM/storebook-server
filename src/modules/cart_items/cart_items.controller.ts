import { Request, Response } from "express";
import catchAsync from "#shared/utils/catchAsync";
import { sendResponse } from "#shared/utils/response";
import CartItemsService from "./cart_items.service";
import { CartItemsRepository } from "./cart_items.repository";
import { CartRepository } from "#modules/cart/cart.repository";
import { bookRepository } from "#modules/book/book.repository";

const CartItemService = new CartItemsService(
  new CartItemsRepository(),
  new CartRepository(),
  new bookRepository()
);

export const syncCartItems = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CartItemService.syncCartItem(
      req.user.uuid,
      req.body
    );

    sendResponse(res, result, "cart item successfully sync", 200);
  }
);

export const createCartItem = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CartItemService.createCartItem(
      req.user.uuid,
      req.body.bookId,
      req.body.quantity
    );

    sendResponse(res, result, "cart item successfully created", 200);
  }
)

export const getCartItemsByCartId = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CartItemService.getCartItemsByCartId(
      req.user.uuid
    );
    console.log(result)

    sendResponse(res, result, "cart items fetched successfully", 200);
  }
);

export const updateCartItemQuantity = catchAsync(
  async (req: Request, res: Response) => {
    console.log(req.params.bookId)
    console.log(req.body)
    const result = await CartItemService.updateCartItemQuantity(
      req.user.uuid,
      Number(req.params.bookId),
      req.body.quantity
    );

    sendResponse(res, result, "cart item updated successfully", 200);
  }
);

export const removeCartItem = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CartItemService.removeCartItem(
      req.user.uuid,
      Number(req.params.bookId)
    );

    sendResponse(res, result, "cart item removed successfully", 200);
  }
);
