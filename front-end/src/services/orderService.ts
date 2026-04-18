import { api } from "./api";
import { ApiResponse } from "../types/api.types";
import { Order } from "../types/order.types";

export const orderService = {
  create: async (data: any) => {
    const res = await api.post<ApiResponse<Order>>("/orders", data);
    return res.data.data!;
  },
  getMyOrders: async () => {
    const res = await api.get<ApiResponse<Order[]>>("/orders/my-orders");
    return res.data.data!;
  },
  getById: async (id: string) => {
    const res = await api.get<ApiResponse<Order>>(`/orders/${id}`);
    return res.data.data!;
  },
  // Admin
  listAll: async () => {
    const res = await api.get<ApiResponse<Order[]>>("/orders");
    return res.data.data!;
  },
  updateStatus: async (id: string, status: string) => {
    const res = await api.put<ApiResponse<Order>>(`/orders/${id}/status`, { status });
    return res.data.data!;
  }
};
