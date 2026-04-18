import { useState, useEffect, useCallback } from "react";
import { SupportTicket } from "../types/support.types";
import { supportService } from "../services/supportService";
import { useAuth } from "./useAuth";

export const useSupport = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchTickets = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = user.role === 'admin'
        ? await supportService.listAll()
        : await supportService.getMyTickets();
      setTickets(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao buscar tickets");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return { tickets, isLoading, error, fetchTickets };
};
