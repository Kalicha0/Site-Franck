import { createContext, useContext, useState, useEffect, useCallback } from "react";

export type CartItem = {
  slug: string;
  titre: string;
  prix: string;
  image: string;
  categorie: string;
};

type CartContextType = {
  items: CartItem[];
  count: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "fn_cart";

function loadFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadFromStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((item: CartItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.slug === item.slug)) return prev;
      return [...prev, item];
    });
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <CartContext.Provider value={{ items, count: items.length, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
