import "dotenv/config";

export const env = {
  port: Number(process.env.PORT) || 3333,
  supabaseUrl: process.env.SUPABASE_URL || "",
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
};

if (!env.supabaseUrl || !env.supabaseServiceRoleKey) {
  throw new Error("Faltam variáveis do Supabase no .env");
}
