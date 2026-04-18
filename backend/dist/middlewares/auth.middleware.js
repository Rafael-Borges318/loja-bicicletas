import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { UnauthorizedError } from "../utils/errors.js";
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new UnauthorizedError("Token não fornecido ou inválido"));
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        return next(new UnauthorizedError("Token expirado ou inválido"));
    }
};
//# sourceMappingURL=auth.middleware.js.map