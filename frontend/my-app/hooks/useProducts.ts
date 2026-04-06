import productService from '@/services/productService';
import { useQuery } from '@tanstack/react-query';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await productService.getAll();
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}