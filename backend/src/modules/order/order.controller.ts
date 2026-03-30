import type { Request, Response } from "express";
import * as orderService from "./order.service.js";

export async function createOrder(req: Request, res: Response) {
  const order = await orderService.createOrder(req.body);
  res.status(201).json(order);
}
