import { z } from "zod";
export const createProductSchema = z.object({
    name: z.string().min(2, "Nome do produto é obrigatório"),
    description: z.string().optional(),
    price: z.number().positive("O preço deve ser positivo"),
    stock: z.number().int().nonnegative("O estoque não pode ser negativo"),
    category: z.string().min(1, "Categoria é obrigatória"),
    images: z.array(z.string().url()).default([]),
    is_featured: z.boolean().default(false),
    is_active: z.boolean().default(true),
});
export const updateProductSchema = createProductSchema.partial();
export const productQuerySchema = z.object({
    category: z.string().optional(),
    featured: z.enum(["true", "false"]).optional(),
    search: z.string().optional(),
});
//# sourceMappingURL=product.schemas.js.map