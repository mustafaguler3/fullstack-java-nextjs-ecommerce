'use client';

import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/products/ProductCard';
import { Product } from '@/types/product';

export default function ProductList() {
  const { data: products, isLoading, error, refetch } = useProducts();

  if (isLoading) return <div className="p-10 text-center">Loading products...</div>;
  
  if (error) return (
    <div className="text-red-500 p-10">
      Error: {(error as Error).message}
      <button onClick={() => refetch()} className="ml-4 underline">Try Again</button>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {products?.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}