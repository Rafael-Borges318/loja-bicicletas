/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { Cart, CartItem } from "../types/cart.types";
import { cartService } from "../services/cartService";
import { AuthContext } from "./AuthContext";
import { Product } from "../types/product.types";

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  fetchCart: () => Promise<void>;
  addItem: (product: Product, quantity: number) => Promise<void>;
  updateItem: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  cartCount: number;
  cartTotal: number;
}

export const CartContext = createContext<CartContextType>({} as CartContextType);

const LOCAL_CART_KEY = '@velostore:cart';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(() => {
    const saved = localStorage.getItem(LOCAL_CART_KEY);
    return saved ? JSON.parse(saved) : { id: 'local-cart', user_id: '', items: [] };
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);

  // Sync to local storage on changes
  useEffect(() => {
    if (cart) {
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart));
    }
  }, [cart]);

  const fetchCart = async () => {
    // Para simplificar a experiência "sem login", o carrinho primário agora é o local.
    // Futuramente pode-se mesclar o carrinho local com o carrinho do backend aqui.
    if (user) {
      // Opcional: buscar do server e fazer merge
    }
  };

  const addItem = async (product: Product, quantity: number) => {
    setCart((prev) => {
      if (!prev) return prev;
      const existingItemIndex = prev.items.findIndex(item => item.product_id === product.id);
      
      let newItems = [...prev.items];
      if (existingItemIndex >= 0) {
        newItems[existingItemIndex].quantity += quantity;
      } else {
        const newItem: CartItem = {
          id: `item-${Date.now()}-${product.id}`,
          cart_id: prev.id,
          product_id: product.id,
          quantity,
          product: product
        };
        newItems.push(newItem);
      }
      return { ...prev, items: newItems };
    });
  };

  const updateItem = async (itemId: string, quantity: number) => {
    setCart((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        items: prev.items.map(item => item.id === itemId ? { ...item, quantity } : item)
      };
    });
  };

  const removeItem = async (itemId: string) => {
    setCart((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        items: prev.items.filter(item => item.id !== itemId)
      };
    });
  };

  const clearCart = async () => {
    setCart({ id: 'local-cart', user_id: '', items: [] });
  };

  const cartCount = cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;
  
  const cartTotal = cart?.items.reduce((acc, item) => {
    return acc + (item.product?.price || 0) * item.quantity;
  }, 0) || 0;

  return (
    <CartContext.Provider value={{
      cart, isLoading, fetchCart, addItem, updateItem, removeItem, clearCart, cartCount, cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};
