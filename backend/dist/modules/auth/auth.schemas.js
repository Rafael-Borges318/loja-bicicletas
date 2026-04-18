import { z } from "zod";
export const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});
export const registerSchema = z.object({
    name: z.string().min(2, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});
//# sourceMappingURL=auth.schemas.js.map