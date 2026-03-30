import express from "express";
import cors from "cors";

import productRoutes from "./modules/products/product.routes.js";
import orderRoutes from "./modules/order/order.routes.js";
import supportRoutes from "./modules/support/support.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, message: "API rodando" });
});

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/support", supportRoutes);

export default app;
