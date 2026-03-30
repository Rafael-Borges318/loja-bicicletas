import { supabase } from "../../lib/supabase.js";

type TicketInsert = {
  customer_name: string;
  phone: string;
  product_id: string | null;
  order_id: string | null;
  problem_type: string;
  description: string;
  status: string;
  priority: string;
};

export async function insertTicket(ticket: TicketInsert) {
  const { data, error } = await supabase
    .from("support_tickets")
    .insert(ticket)
    .select("*")
    .single();

  if (error) throw error;

  return data;
}
