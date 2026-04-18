import { ForbiddenError } from "../utils/errors.js";
export const adminMiddleware = (req, res, next) => {
    if (!req.user) {
        return next(new ForbiddenError("Acesso negado: Usuário não autenticado"));
    }
    if (req.user.role !== "admin") {
        return next(new ForbiddenError("Acesso negado: Requer privilégios de administrador"));
    }
    next();
};
//# sourceMappingURL=admin.middleware.js.map