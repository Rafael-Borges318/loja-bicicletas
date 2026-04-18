import { api } from "./api";
import { ApiResponse } from "../types/api.types";
import { SupportTicket } from "../types/support.types";

export const supportService = {
  create: async (data: any) => {
    const res = await api.post<ApiResponse<SupportTicket>>("/support", data);
    return res.data.data!;
  },
  getMyTickets: async () => {
    const res = await api.get<ApiResponse<SupportTicket[]>>("/support/my-tickets");
    return res.data.data!;
  },
  // Admin
  listAll: async () => {
    const res = await api.get<ApiResponse<SupportTicket[]>>("/support");
    return res.data.data!;
  },
  updateStatus: async (id: string, status: string) => {
    const res = await api.put<ApiResponse<SupportTicket>>(`/support/${id}/status`, { status });
    return res.data.data!;
  }
};
