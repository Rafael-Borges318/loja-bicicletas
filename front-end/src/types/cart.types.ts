import { Product } from "./product.types";

export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  product?: Partial<Product>;
}

export interface Cart {
  id: string;
  user_id: string;
  items: CartItem[];
}
