import { Router } from "express";
import { login, register } from "./auth.controller.js";
import { rateLimit } from "../../middlewares/rateLimit.middleware.js";

const router = Router();

// Rate limit para rotas sensíveis: máx 5 requisições a cada 15 min por IP
const loginLimiter = rateLimit(5, 15 * 60 * 1000);
const registerLimiter = rateLimit(3, 60 * 60 * 1000); // 3 cadastros por hora

router.post("/register", registerLimiter, register);
router.post("/login", loginLimiter, login);

export default router;
