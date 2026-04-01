import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/productService';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: productService.getAll,
    staleTime: 1000 * 60 * 5,
  });
}