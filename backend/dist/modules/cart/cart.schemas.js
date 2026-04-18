import { z } from "zod";
export const addToCartSchema = z.object({
    product_id: z.string().uuid("ID de produto inválido"),
    quantity: z.number().int().positive("A quantidade deve ser maior que 0"),
});
export const updateCartItemSchema = z.object({
    quantity: z.number().int().positive("A quantidade deve ser maior que 0"),
});
//# sourceMappingURL=cart.schemas.js.map