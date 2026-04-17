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
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_time: number;
  product?: {
    name: string;
    images: string[];
    slug: string;
  };
}
