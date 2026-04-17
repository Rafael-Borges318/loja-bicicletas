import { z } from "zod";

export const createOrderSchema = z.object({
  payment_method: z.string().min(1, "Método de pagamento é obrigatório"),
  pickup_location: z.string().min(1, "Local de retirada é obrigatório"),
  customer_info: z.object({
    name: z.string().min(2, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    phone: z.string().min(10, "Telefone inválido"),
  }),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(["pending", "paid", "shipped", "delivered", "cancelled"]),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
