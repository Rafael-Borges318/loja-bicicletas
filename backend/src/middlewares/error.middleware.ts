import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors.js";
import { sendError } from "../utils/response.js";
import { ZodError } from "zod";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("🔥 Error:", err);

  if (err instanceof AppError) {
    return sendError(res, err.statusCode, err.message, (err as any).details);
  }

  if (err instanceof ZodError) {
    return sendError(res, 400, "Erro de validação de dados", err.format());
  }

  // Erro não tratado (em dev mostra o stack trace, em prod mascara)
  const isProd = process.env.NODE_ENV === "production";
  return sendError(
    res,
    500,
    "Erro interno do servidor",
    isProd ? undefined : err.stack
  );
};
