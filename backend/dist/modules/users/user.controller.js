import { UserService } from "./user.service.js";
import { updateUserSchema } from "./user.schemas.js";
import { sendSuccess } from "../../utils/response.js";
import { UnauthorizedError } from "../../utils/errors.js";
export const getProfile = async (req, res, next) => {
    try {
        if (!req.user)
            throw new UnauthorizedError();
        const profile = await UserService.getProfile(req.user.userId);
        sendSuccess(res, 200, "Perfil recuperado", profile);
    }
    catch (error) {
        next(error);
    }
};
export const updateProfile = async (req, res, next) => {
    try {
        if (!req.user)
            throw new UnauthorizedError();
        const data = updateUserSchema.parse(req.body);
        const updated = await UserService.updateProfile(req.user.userId, data);
        sendSuccess(res, 200, "Perfil atualizado", updated);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=user.controller.js.map