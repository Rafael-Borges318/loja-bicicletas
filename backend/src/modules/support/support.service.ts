import { z } from "zod";
import * as supportRepository from "./support.repository.js";

const createTicketSchema = z.object({
  customerName: z.string().min(2),
  phone: z.string().min(8),
  productId: z.string().uuid().optional(),
  orderId: z.string().uuid().optional(),
  problemType: z.string().min(2),
  description: z.string().min(10),
});

export async function createTicket(payload: unknown) {
  const parsed = createTicketSchema.parse(payload);

  return supportRepository.insertTicket({
    customer_name: parsed.customerName,
    phone: parsed.phone,
    product_id: parsed.productId ?? null,
    order_id: parsed.orderId ?? null,
    problem_type: parsed.problemType,
    description: parsed.description,
    status: "received",
    priority: "normal",
  });
}
