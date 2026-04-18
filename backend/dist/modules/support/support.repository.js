import { supabase } from "../../lib/supabase.js";
export async function insertTicket(ticket) {
    const { data, error } = await supabase
        .from("support_tickets")
        .insert(ticket)
        .select("*")
        .single();
    if (error)
        throw error;
    return data;
}
//# sourceMappingURL=support.repository.js.map