import { Request, Response, NextFunction } from "express";
import { CartService } from "./cart.service.js";
import { addToCartSchema, updateCartItemSchema } from "./cart.schemas.js";
import { sendSuccess } from "../../utils/response.js";
import { UnauthorizedError } from "../../utils/errors.js";

export const getCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new UnauthorizedError();
    const cart = await CartService.getCart(req.user.userId);
    sendSuccess(res, 200, "Carrinho recuperado", cart);
  } catch (error) {
    next(error);
  }
};

export const addItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new UnauthorizedError();
    const data = addToCartSchema.parse(req.body);
    const item = await CartService.addItem(req.user.userId, data);
    sendSuccess(res, 201, "Item adicionado ao carrinho", item);
  } catch (error) {
    next(error);
  }
};

export const updateItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new UnauthorizedError();
    const data = updateCartItemSchema.parse(req.body);
    const item = await CartService.updateItem(req.user.userId, req.params.itemId, data);
    sendSuccess(res, 200, "Quantidade atualizada", item);
  } catch (error) {
    next(error);
  }
};

export const removeItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new UnauthorizedError();
    await CartService.removeItem(req.user.userId, req.params.itemId);
    sendSuccess(res, 200, "Item removido do carrinho");
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new UnauthorizedError();
    await CartService.clearCart(req.user.userId);
    sendSuccess(res, 200, "Carrinho esvaziado");
  } catch (error) {
    next(error);
  }
};
