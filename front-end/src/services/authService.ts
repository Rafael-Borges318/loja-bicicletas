import { api } from "./api";
import { ApiResponse } from "../types/api.types";
import { AuthResponse } from "../types/user.types";

export const authService = {
  login: async (data: any) => {
    const res = await api.post<ApiResponse<AuthResponse>>("/auth/login", data);
    return res.data.data!;
  },
  register: async (data: any) => {
    const res = await api.post<ApiResponse<AuthResponse>>("/auth/register", data);
    return res.data.data!;
  },
  getProfile: async () => {
    const res = await api.get<ApiResponse<any>>("/users/me");
    return res.data.data!;
  }
};
