import { z } from "zod";

export const createTicketSchema = z.object({
  subject: z.string().min(5, "Assunto muito curto"),
  problem_type: z.string().min(1, "Tipo de problema é obrigatório"),
  description: z.string().min(10, "Descrição muito curta"),
  order_id: z.string().uuid("ID de pedido inválido").optional(),
});

export const updateTicketStatusSchema = z.object({
  status: z.enum(["open", "in_progress", "resolved", "closed"]),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;
export type UpdateTicketStatusInput = z.infer<typeof updateTicketStatusSchema>;
