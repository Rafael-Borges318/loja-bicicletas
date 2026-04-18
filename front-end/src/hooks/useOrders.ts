import { useState, useEffect, useCallback } from "react";
import { Order } from "../types/order.types";
import { orderService } from "../services/orderService";
import { useAuth } from "./useAuth";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchOrders = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = user.role === 'admin' 
        ? await orderService.listAll() 
        : await orderService.getMyOrders();
      setOrders(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao buscar pedidos");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { orders, isLoading, error, fetchOrders };
};
