import { api } from "./api";
import { ApiResponse } from "../types/api.types";
import { Cart, CartItem } from "../types/cart.types";

export const cartService = {
  getCart: async () => {
    const res = await api.get<ApiResponse<Cart>>("/cart");
    return res.data.data!;
  },
  addItem: async (product_id: string, quantity: number) => {
    const res = await api.post<ApiResponse<CartItem>>("/cart/items", { product_id, quantity });
    return res.data.data!;
  },
  updateItem: async (itemId: string, quantity: number) => {
    const res = await api.put<ApiResponse<CartItem>>(`/cart/items/${itemId}`, { quantity });
    return res.data.data!;
  },
  removeItem: async (itemId: string) => {
    await api.delete(`/cart/items/${itemId}`);
  },
  clearCart: async () => {
    await api.delete("/cart");
  }
};
