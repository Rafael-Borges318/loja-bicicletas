import { supabase } from "../../lib/supabase.js";

type OrderInsert = {
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  total: number;
  status: string;
  pickup_date: string;
  pickup_period: string;
  payment_method: string;
  payment_status: string;
};

type OrderItemInsert = {
  product_id: string;
  product_name: string;
  unit_price: number;
  quantity: number;
  subtotal: number;
};

export async function insertOrder(
  order: OrderInsert,
  items: OrderItemInsert[],
) {
  const { data: createdOrder, error: orderError } = await supabase
    .from("orders")
    .insert(order)
    .select("*")
    .single();

  if (orderError) throw orderError;

  const orderItems = items.map((item) => ({
    ...item,
    order_id: createdOrder.id,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) throw itemsError;

  return {
    order: createdOrder,
    items: orderItems,
  };
}
