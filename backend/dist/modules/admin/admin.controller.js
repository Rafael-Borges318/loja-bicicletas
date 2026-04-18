import { AdminService } from "./admin.service.js";
import { sendSuccess } from "../../utils/response.js";
export const getDashboardMetrics = async (req, res, next) => {
    try {
        const metrics = await AdminService.getDashboardMetrics();
        sendSuccess(res, 200, "Métricas do dashboard", metrics);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=admin.controller.js.map