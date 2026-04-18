import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();
const envSchema = z.object({
    PORT: z.string().default("3000"),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    SUPABASE_URL: z.string().url("SUPABASE_URL deve ser uma URL válida"),
    SUPABASE_KEY: z.string().min(1, "SUPABASE_KEY é obrigatória"),
    JWT_SECRET: z.string().min(10, "JWT_SECRET deve ter no mínimo 10 caracteres"),
});
const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
    console.error("❌ Erro de validação das variáveis de ambiente:", parsedEnv.error.format());
    process.exit(1);
}
export const env = parsedEnv.data;
//# sourceMappingURL=env.js.map