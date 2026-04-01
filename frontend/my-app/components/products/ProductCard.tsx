import { Product } from '@/types/product';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <div className="h-40 bg-gray-100 rounded mb-2 flex items-center justify-center">
        <span className="text-gray-400">No Image</span>
      </div>
      <h3 className="font-bold text-lg">{product.name}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-blue-600 font-bold">${product.price}</span>
        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
          Add to Cart
        </button>
      </div>
    </div>
  );
}