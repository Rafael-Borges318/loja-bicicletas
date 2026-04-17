import { Request, Response, NextFunction } from "express";
import { ForbiddenError } from "../utils/errors.js";

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new ForbiddenError("Acesso negado: Usuário não autenticado"));
  }

  if (req.user.role !== "admin") {
    return next(new ForbiddenError("Acesso negado: Requer privilégios de administrador"));
  }

  next();
};
