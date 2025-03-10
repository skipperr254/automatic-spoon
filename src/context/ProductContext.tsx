import React, { createContext, useContext, useState, useCallback } from "react";
import { api, Product } from "../utils/api";

type ProductContextType = {
  products: Product[];
  loading: boolean;
  error: Error | null;
  loadProducts: (
    params?: Parameters<typeof api.products.list>[0]
  ) => Promise<void>;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadProducts = useCallback(
    async (params?: Parameters<typeof api.products.list>[0]) => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.products.list(params);
        setProducts(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load products")
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return (
    <ProductContext.Provider value={{ products, loading, error, loadProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
