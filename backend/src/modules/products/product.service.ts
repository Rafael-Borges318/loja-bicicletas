import * as productRepository from "./product.repository.js";

export async function listProducts() {
  return productRepository.findAll();
}

export async function findProductById(id: string) {
  return productRepository.findById(id);
}
