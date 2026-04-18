import { ProductService } from "./product.service.js";
import { createProductSchema, updateProductSchema, productQuerySchema } from "./product.schemas.js";
import { sendSuccess } from "../../utils/response.js";
export const listProducts = async (req, res, next) => {
    try {
        const filters = productQuerySchema.parse(req.query);
        const products = await ProductService.listProducts(filters);
        sendSuccess(res, 200, "Produtos listados", products);
    }
    catch (error) {
        next(error);
    }
};
export const getProductById = async (req, res, next) => {
    try {
        const product = await ProductService.getProductById(req.params.id);
        sendSuccess(res, 200, "Produto recuperado", product);
    }
    catch (error) {
        next(error);
    }
};
export const getProductBySlug = async (req, res, next) => {
    try {
        const product = await ProductService.getProductBySlug(req.params.slug);
        sendSuccess(res, 200, "Produto recuperado", product);
    }
    catch (error) {
        next(error);
    }
};
// Admin Routes
export const createProduct = async (req, res, next) => {
    try {
        const data = createProductSchema.parse(req.body);
        const product = await ProductService.createProduct(data);
        sendSuccess(res, 201, "Produto criado", product);
    }
    catch (error) {
        next(error);
    }
};
export const updateProduct = async (req, res, next) => {
    try {
        const data = updateProductSchema.parse(req.body);
        const product = await ProductService.updateProduct(req.params.id, data);
        sendSuccess(res, 200, "Produto atualizado", product);
    }
    catch (error) {
        next(error);
    }
};
export const deleteProduct = async (req, res, next) => {
    try {
        await ProductService.deleteProduct(req.params.id);
        sendSuccess(res, 200, "Produto excluído");
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=product.controller.js.map