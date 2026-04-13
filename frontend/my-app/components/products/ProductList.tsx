"use client";

import { useState, useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/products/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  sortBy: string;
  sortDir: string;
}

export default function ProductList({ sortBy, sortDir }: Props) {
  const [page, setPage] = useState(0);
  const size = 6;

  const { data, isLoading, error } = useProducts(page, size, sortBy, sortDir);

  const products = data?.content || [];
  const totalPages = data?.totalPages || 0;

  console.log("FULL DATA:", data);
console.log("TOTAL PAGES:", data?.totalPages);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  if (isLoading)
    return (
      <div className="p-20 text-center text-slate-500 animate-pulse font-black uppercase tracking-widest text-xs">
        Loading products...
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 p-10 text-center font-bold">
        Error loading products
      </div>
    );

  return (
    <div className="flex flex-col gap-8">
      
      {/* PRODUCTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 0 && (
        <div className="flex justify-center items-center gap-3 py-10">

          {/* PREV */}
          <button
            disabled={page === 0}
            onClick={() => setPage((prev) => prev - 1)}
            className="p-3 bg-slate-900 border border-white/5 text-slate-400 rounded-xl disabled:opacity-20 hover:text-blue-400 transition-all shadow-xl active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>

          {/* PAGE NUMBERS */}
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-11 h-11 rounded-xl text-xs font-black transition-all duration-300 border ${
                  page === i
                    ? "bg-blue-600 border-blue-400 text-white scale-110 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                    : "bg-slate-900 border-white/5 text-slate-500 hover:border-blue-500/50 hover:text-blue-400"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* NEXT */}
          <button
            disabled={page === totalPages - 1}
            onClick={() => setPage((prev) => prev + 1)}
            className="p-3 bg-slate-900 border border-white/5 text-slate-400 rounded-xl disabled:opacity-20 hover:text-blue-400 transition-all shadow-xl active:scale-95"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* FOOTER */}
      <div className="text-center text-[10px] font-black text-slate-600 uppercase tracking-widest pb-10 italic">
        Viewing Page {page + 1} of {totalPages}
      </div>
    </div>
  );
}