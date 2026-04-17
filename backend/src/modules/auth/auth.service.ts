import { supabase } from "../../lib/supabase.js";
import { User } from "../users/user.types.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { UnauthorizedError, ValidationError } from "../../utils/errors.js";
import { LoginInput, RegisterInput } from "./auth.schemas.js";

export class AuthService {
  static async register(data: RegisterInput): Promise<{ user: Omit<User, 'password_hash'>, token: string }> {
    // Verificar se usuário existe
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", data.email)
      .single();

    if (existingUser) {
      throw new ValidationError("Email já cadastrado");
    }

    // Hash da senha (se não usar o Auth do Supabase diretamente)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);

    // Criar usuário
    const { data: newUser, error } = await supabase
      .from("users")
      .insert({
        email: data.email,
        name: data.name,
        password_hash: passwordHash,
        role: "user"
      })
      .select("id, email, name, role")
      .single();

    if (error || !newUser) {
      throw new Error("Erro ao criar usuário");
    }

    // Gerar JWT
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email, role: newUser.role },
      env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return { user: newUser, token };
  }

  static async login(data: LoginInput): Promise<{ user: Omit<User, 'password_hash'>, token: string }> {
    const { data: user, error } = await supabase
      .from("users")
      .select("id, email, name, role, password_hash")
      .eq("email", data.email)
      .single();

    if (error || !user) {
      throw new UnauthorizedError("Credenciais inválidas");
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password_hash);

    if (!isValidPassword) {
      throw new UnauthorizedError("Credenciais inválidas");
    }

    const { password_hash, ...userWithoutPassword } = user;

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return { user: userWithoutPassword, token };
  }
}
