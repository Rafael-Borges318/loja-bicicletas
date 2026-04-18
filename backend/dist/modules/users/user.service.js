import { supabase } from "../../lib/supabase.js";
import { NotFoundError } from "../../utils/errors.js";
export class UserService {
    static async getProfile(userId) {
        const { data, error } = await supabase
            .from("users")
            .select("id, email, name, role, created_at")
            .eq("id", userId)
            .single();
        if (error || !data) {
            throw new NotFoundError("Usuário não encontrado");
        }
        return data;
    }
    static async updateProfile(userId, data) {
        const { data: updated, error } = await supabase
            .from("users")
            .update(data)
            .eq("id", userId)
            .select("id, email, name, role, created_at")
            .single();
        if (error || !updated) {
            throw new Error("Erro ao atualizar perfil");
        }
        return updated;
    }
}
//# sourceMappingURL=user.service.js.map