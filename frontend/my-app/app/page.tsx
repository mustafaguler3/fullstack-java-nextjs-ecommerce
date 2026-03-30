import { fetchProducts } from '@/utils/api';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock_quantity: number;
}

export default async function HomePage() {
  const products: Product[] = await fetchProducts().catch(() => []);

  return (
    <div className="container mx-auto px-4 py-12">
      
      <section className="bg-slate-900 rounded-3xl p-10 text-white mb-12 shadow-2xl">
        <h1 className="text-4xl font-extrabold mb-4">Welcome!</h1>
        <p className="text-lg text-slate-300">The latest technology products are now in stock.</p>
      </section>

      <h2 className="text-2xl font-bold mb-8 text-gray-800 border-b-2 border-blue-500 inline-block">
        Today&apos;s Deals
      </h2>

      {/* Ürün Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="border rounded-xl p-4 hover:shadow-lg transition bg-white">
              <div className="h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400 italic">
                Image is coming soon
              </div>
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-gray-600 text-sm h-10 overflow-hidden mt-1">
                {product.description}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xl font-bold text-blue-600">{product.price} TL</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center p-10 bg-gray-50 rounded-lg border-2 border-dashed">
            <p className="text-gray-500">We could not find any products.</p>
          </div>
        )}
      </div>
    </div>
  );
}