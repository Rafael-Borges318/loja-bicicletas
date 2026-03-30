import { z } from "zod";
import * as orderRepository from "./order.repository.js";
import { supabase } from "../../lib/supabase.js";

const createOrderSchema = z.object({
  customerName: z.string().min(2),
  customerPhone: z.string().min(8),
  customerEmail: z.string().email(),
  pickupDate: z.string(),
  pickupPeriod: z.string(),
  paymentMethod: z.string(),
  items: z
    .array(
      z.object({
        productId: z.string().uuid(),
        quantity: z.number().int().min(1),
      }),
    )
    .min(1),
});

export async function createOrder(payload: unknown) {
  const parsed = createOrderSchema.parse(payload);

  const productIds = parsed.items.map((item) => item.productId);

  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, price")
    .in("id", productIds);

  if (error) throw error;
  if (!products || products.length === 0) {
    throw new Error("Nenhum produto encontrado");
  }

  const normalizedItems = parsed.items.map((item) => {
    const product = products.find((p) => p.id === item.productId);

    if (!product) {
      throw new Error(`Produto ${item.productId} não encontrado`);
    }

    const unitPrice = Number(product.price);
    const subtotal = unitPrice * item.quantity;

    return {
      product_id: item.productId,
      product_name: product.name,
      unit_price: unitPrice,
      quantity: item.quantity,
      subtotal,
    };
  });

  const total = normalizedItems.reduce((acc, item) => acc + item.subtotal, 0);

  return orderRepository.insertOrder(
    {
      customer_name: parsed.customerName,
      customer_phone: parsed.customerPhone,
      customer_email: parsed.customerEmail,
      total,
      status: "pending",
      pickup_date: parsed.pickupDate,
      pickup_period: parsed.pickupPeriod,
      payment_method: parsed.paymentMethod,
      payment_status: "pending",
    },
    normalizedItems,
  );
}
