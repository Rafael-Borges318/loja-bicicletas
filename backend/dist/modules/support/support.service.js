import { supabase } from "../../lib/supabase.js";
export class SupportService {
    static async createTicket(userId, data) {
        const { data: ticket, error } = await supabase
            .from("support_tickets")
            .insert({
            user_id: userId,
            ...data,
            status: "open"
        })
            .select()
            .single();
        if (error || !ticket)
            throw new Error("Erro ao criar ticket");
        return ticket;
    }
    static async getUserTickets(userId) {
        const { data, error } = await supabase
            .from("support_tickets")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });
        if (error)
            throw new Error("Erro ao listar tickets");
        return data || [];
    }
    static async listAllTickets() {
        const { data, error } = await supabase
            .from("support_tickets")
            .select("*, user:users(name, email)")
            .order("created_at", { ascending: false });
        if (error)
            throw new Error("Erro ao listar todos os tickets");
        return data || [];
    }
    static async updateTicketStatus(ticketId, data) {
        const { data: ticket, error } = await supabase
            .from("support_tickets")
            .update({ status: data.status, updated_at: new Date().toISOString() })
            .eq("id", ticketId)
            .select()
            .single();
        if (error || !ticket)
            throw new Error("Erro ao atualizar status do ticket");
        return ticket;
    }
}
//# sourceMappingURL=support.service.js.map