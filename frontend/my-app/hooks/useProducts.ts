import productService from '@/services/productService';
import { useQuery } from '@tanstack/react-query';

export function useProducts(page: number, size: number, sortBy: string, sortDir: string) {
  return useQuery({
    queryKey: ['products', page, size, sortBy, sortDir],
    queryFn: () => productService.getAll(page, size, sortBy, sortDir),
  });
}