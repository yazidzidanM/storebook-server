import { Router } from "express";
import * as CartItemsController from "./cart_items.controller";
import { Authentication } from "#middlewares/authentication";

const cartItemRouter = Router();

cartItemRouter.use(Authentication)

cartItemRouter.get("/", CartItemsController.getCartItemsByCartId);
cartItemRouter.post("/", CartItemsController.createCartItem);
cartItemRouter.put("/:bookId", CartItemsController.updateCartItemQuantity);
cartItemRouter.delete("/:bookId", CartItemsController.removeCartItem);
cartItemRouter.post("/sync", CartItemsController.syncCartItems);

export default cartItemRouter;
