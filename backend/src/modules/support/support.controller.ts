import type { Request, Response } from "express";
import * as supportService from "./support.service.js";

export async function createTicket(req: Request, res: Response) {
  const ticket = await supportService.createTicket(req.body);
  res.status(201).json(ticket);
}
