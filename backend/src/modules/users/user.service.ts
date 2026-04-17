import { supabase } from "../../lib/supabase.js";
import { User } from "./user.types.js";
import { UpdateUserInput } from "./user.schemas.js";
import { NotFoundError } from "../../utils/errors.js";

export class UserService {
  static async getProfile(userId: string): Promise<Omit<User, 'password_hash'>> {
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

  static async updateProfile(userId: string, data: UpdateUserInput): Promise<Omit<User, 'password_hash'>> {
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
