import React, { createContext, useContext, useState, useEffect } from "react";
import { api, CartItem } from "../utils/api";
import { useAuth } from "./AuthContext";

type CartContextType = {
  items: CartItem[];
  loading: boolean;
  error: Error | null;
  addItem: (productId: string, quantity: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  total: number;
  itemCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  const loadCart = async () => {
    if (!user) {
      setItems([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await api.cart.getItems();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load cart"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, [user]);

  const addItem = async (productId: string, quantity: number) => {
    try {
      await api.cart.addItem(productId, quantity);
      await loadCart();
    } catch (err) {
      throw err instanceof Error
        ? err
        : new Error("Failed to add item to cart");
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      await api.cart.updateQuantity(itemId, quantity);
      await loadCart();
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to update quantity");
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      await api.cart.removeItem(itemId);
      await loadCart();
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to remove item");
    }
  };

  const clearCart = async () => {
    try {
      await api.cart.clear();
      await loadCart();
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to clear cart");
    }
  };

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        error,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
