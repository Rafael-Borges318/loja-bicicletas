import type { Request, Response } from "express";
import * as productService from "./product.service.js";

export async function getAllProducts(_req: Request, res: Response) {
  const products = await productService.listProducts();
  res.json(products);
}

export async function getProductById(req: Request, res: Response) {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  if (!id) {
    return res.status(400).json({ message: "ID do produto não informado" });
  }

  const product = await productService.findProductById(id);

  if (!product) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }

  return res.json(product);
}
