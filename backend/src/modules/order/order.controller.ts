import { Request, Response, NextFunction } from "express";
import { OrderService } from "./order.service.js";
import { createOrderSchema, updateOrderStatusSchema } from "./order.schemas.js";
import { sendSuccess } from "../../utils/response.js";
import { UnauthorizedError } from "../../utils/errors.js";

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new UnauthorizedError();
    const data = createOrderSchema.parse(req.body);
    const order = await OrderService.createOrder(req.user.userId, data);
    sendSuccess(res, 201, "Pedido criado com sucesso", order);
  } catch (error) {
    next(error);
  }
};

export const getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new UnauthorizedError();
    const orders = await OrderService.getUserOrders(req.user.userId);
    sendSuccess(res, 200, "Pedidos listados", orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new UnauthorizedError();
    const order = await OrderService.getOrderById(req.user.userId, req.params.id as string, req.user.role);
    sendSuccess(res, 200, "Detalhes do pedido", order);
  } catch (error) {
    next(error);
  }
};

// Admin
export const listAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await OrderService.listAllOrders();
    sendSuccess(res, 200, "Todos os pedidos", orders);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = updateOrderStatusSchema.parse(req.body);
    const order = await OrderService.updateOrderStatus(req.params.id as string, data);
    sendSuccess(res, 200, "Status atualizado", order);
  } catch (error) {
    next(error);
  }
};
