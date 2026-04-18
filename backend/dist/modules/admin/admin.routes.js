import { Router } from "express";
import { getDashboardMetrics } from "./admin.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { adminMiddleware } from "../../middlewares/admin.middleware.js";
const router = Router();
router.use(authMiddleware, adminMiddleware);
router.get("/metrics", getDashboardMetrics);
export default router;
//# sourceMappingURL=admin.routes.js.map