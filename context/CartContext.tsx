"use client";

import { createContext, useContext, useState } from "react";

type CartItem = {
  product_id: number;
  product_name: string;
  base_price: number;
  image_url: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("CartContext error");
  return context;
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ✅ add
  const addToCart = (product: any) => {
    setCart((prev) => {
      const exist = prev.find(p => p.product_id === product.product_id);

      if (exist) {
        return prev.map(p =>
          p.product_id === product.product_id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [
        ...prev,
        { ...product, quantity: 1 }
      ];
    });
  };

  // ❌ remove
  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(p => p.product_id !== id));
  };

  // ➕
  const increaseQty = (id: number) => {
    setCart(prev =>
      prev.map(p =>
        p.product_id === id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  // ➖
  const decreaseQty = (id: number) => {
    setCart(prev =>
      prev.map(p =>
        p.product_id === id && p.quantity > 1
          ? { ...p, quantity: p.quantity - 1 }
          : p
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, increaseQty, decreaseQty }}
    >
      {children}
    </CartContext.Provider>
  );
}