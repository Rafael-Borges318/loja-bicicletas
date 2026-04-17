import { Router } from "express";
import { 
  listProducts, 
  getProductById, 
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct
} from "./product.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { adminMiddleware } from "../../middlewares/admin.middleware.js";

const router = Router();

// Public
router.get("/", listProducts);
router.get("/slug/:slug", getProductBySlug);
router.get("/:id", getProductById);

// Admin Only
router.use(authMiddleware, adminMiddleware);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
