import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware.js";

import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import productRoutes from "./modules/products/product.routes.js";
import cartRoutes from "./modules/cart/cart.routes.js";
import orderRoutes from "./modules/order/order.routes.js";
import supportRoutes from "./modules/support/support.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";

const app = express();

app.disable('x-powered-by'); // Mitigar footprinting básico

app.use(cors());
app.use(express.json({ limit: '10kb' })); // Prevenção contra DoS (Payload muito grande)
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.get("/health", (_req, res) => {
  res.json({ ok: true, message: "API rodando e saudável" });
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/support", supportRoutes);
app.use("/admin", adminRoutes);

// Middleware global de tratamento de erros
app.use(errorHandler);

export default app;
