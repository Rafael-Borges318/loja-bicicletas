import { Request, Response, NextFunction } from "express";
import { AdminService } from "./admin.service.js";
import { sendSuccess } from "../../utils/response.js";

export const getDashboardMetrics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const metrics = await AdminService.getDashboardMetrics();
    sendSuccess(res, 200, "Métricas do dashboard", metrics);
  } catch (error) {
    next(error);
  }
};
