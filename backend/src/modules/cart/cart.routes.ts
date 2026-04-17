import { Router } from "express";
import { getCart, addItem, updateItem, removeItem, clearCart } from "./cart.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getCart);
router.post("/items", addItem);
router.put("/items/:itemId", updateItem);
router.delete("/items/:itemId", removeItem);
router.delete("/", clearCart);

export default router;
