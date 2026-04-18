import { z } from "zod";
export const updateUserSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").optional(),
    email: z.string().email("Email inválido").optional(),
});
//# sourceMappingURL=user.schemas.js.map