import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service.js";
import { loginSchema, registerSchema } from "./auth.schemas.js";
import { sendSuccess } from "../../utils/response.js";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = registerSchema.parse(req.body);
    const result = await AuthService.register(data);
    sendSuccess(res, 201, "Usuário registrado com sucesso", result);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = loginSchema.parse(req.body);
    const result = await AuthService.login(data);
    sendSuccess(res, 200, "Login realizado com sucesso", result);
  } catch (error) {
    next(error);
  }
};
