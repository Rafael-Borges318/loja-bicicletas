import { Router } from "express";
import { 
  createOrder, 
  getUserOrders, 
  getOrderById,
  listAllOrders,
  updateOrderStatus
} from "./order.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { adminMiddleware } from "../../middlewares/admin.middleware.js";

const router = Router();

router.use(authMiddleware);

// User
router.post("/", createOrder);
router.get("/my-orders", getUserOrders);
router.get("/:id", getOrderById);

// Admin Only
router.use(adminMiddleware);
router.get("/", listAllOrders);
router.put("/:id/status", updateOrderStatus);

export default router;
