export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  product?: {
    id: string;
    name: string;
    price: number;
    images: string[];
    slug: string;
  };
}

export interface Cart {
  id: string;
  user_id: string;
  items: CartItem[];
}
