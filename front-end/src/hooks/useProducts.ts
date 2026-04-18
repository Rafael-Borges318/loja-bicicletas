import { useState, useEffect, useCallback } from "react";
import { Product } from "../types/product.types";
import { productService } from "../services/productService";

export const useProducts = (initialParams?: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (params?: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await productService.list(params);
      setProducts(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao buscar produtos");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(initialParams);
  }, [fetchProducts]); // Remove initialParams from dependency to avoid infinite loops if passed inline

  return { products, isLoading, error, fetchProducts };
};
