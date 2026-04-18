import { Product } from "./product.types";

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_time: number;
  product?: Partial<Product>;
}

export interface Order {
  id: string;
  user_id: string;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  total_amount: number;
  payment_method: string;
  pickup_location: string;
  customer_info: {
    name: string;
    email: string;
    phone: string;
  };
  items?: OrderItem[];
  created_at: string;
}
