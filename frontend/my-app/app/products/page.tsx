import ProductList from '@/components/products/ProductList';

export default function ProductsPage() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Product Catalog</h1>
      <ProductList />
    </main>
  );
}