"use client";


import { Product } from "@/types/Product";
import { ShoppingCart, Eye, Heart, X, Zap } from "lucide-react";
import { useState, useEffect } from "react";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <>
      <div className="group relative bg-slate-900 border border-white/5 rounded-3xl p-4 shadow-2xl hover:border-blue-500/30 hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-500 ease-in-out overflow-hidden backdrop-blur-sm">
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`absolute top-5 right-5 z-10 p-2.5 bg-slate-800 rounded-full shadow-inner transition-all duration-300 hover:scale-110 border border-white/5 ${
            isFavorite
              ? "text-red-500 fill-red-500 border-red-500/20"
              : "text-slate-500 hover:text-red-500 hover:border-red-500/20"
          }`}
        >
          <Heart size={16} strokeWidth={3} />
        </button>

        <div className="relative h-56 bg-slate-800 rounded-2xl mb-5 flex items-center justify-center overflow-hidden border border-white/5 group-hover:border-blue-500/20 transition-colors duration-500">
          {product.imageUrl ? (
            <img
              src={`http://localhost:8080${product.imageUrl}`}
              alt={product.name}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-slate-600">
              <Zap size={24} className="opacity-50" />
              <span className="text-[10px] font-black uppercase tracking-widest italic">
                No Part Image
              </span>
            </div>
          )}

          {/* Hoverda Açılan Göz İkonu Katmanı */}
          <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-4 bg-white text-slate-950 rounded-full hover:bg-blue-500 hover:text-white transition-colors shadow-2xl scale-75 group-hover:scale-100 duration-500 ease-out"
            >
              <Eye size={20} />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-start gap-3">
            <h3 className="font-extrabold text-white text-lg leading-tight line-clamp-1 group-hover:text-blue-400 transition-colors uppercase italic tracking-tight">
              {product.name}
            </h3>
            <span className="text-[9px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded-md font-bold border border-blue-500/20 whitespace-nowrap">
              ID: {product.id}
            </span>
          </div>

          <p className="text-xs text-slate-500 line-clamp-2 min-h-[32px] font-medium leading-relaxed">
            {product.description}
          </p>

          <div className="pt-3 flex justify-between items-center mt-3 border-t border-white/5">
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-600 uppercase font-black tracking-widest">
                Price
              </span>
              <span className="text-2xl font-black text-emerald-400 tracking-tighter">
                {formattedPrice}
              </span>
            </div>

            <button className="flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-3 rounded-xl font-bold text-xs hover:saturate-150 active:scale-95 transition-all duration-200 overflow-hidden relative group/btn shadow-lg shadow-blue-600/10">
              <ShoppingCart size={16} />
              <span className="font-black uppercase tracking-widest text-[10px]">
                Add
              </span>

              <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500 skew-x-12" />
            </button>
          </div>
        </div>

        {product.stockQuantity < 5 && (
          <span className="absolute top-5 left-5 bg-orange-500/10 text-orange-400 text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest shadow-xl border border-orange-500/20 animate-pulse">
            Low Stock
          </span>
        )}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex justify-center bg-slate-950/90 backdrop-blur-md animate-fadeIn overflow-y-auto pt-24 pb-12 px-4 md:px-8"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative bg-slate-900 rounded-[3rem] w-full max-w-6xl h-fit min-h-[500px] shadow-[0_0_100px_-20px_rgba(0,0,0,0.5)] p-8 md:p-16 animate-scaleIn border border-white/5 mb-12"
            onClick={(e) => e.stopPropagation()}
          >
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 md:top-10 md:right-10 p-4 bg-slate-800/80 rounded-full text-slate-400 hover:bg-white hover:text-slate-900 transition-all border border-white/5 z-20"
            >
              <X size={20} strokeWidth={3} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
    
              <div className="bg-slate-800/30 rounded-[2.5rem] aspect-square flex items-center justify-center p-8 border border-white/5">
                {product.imageUrl ? (
                  <img
                    src={`http://localhost:8080${product.imageUrl}`}
                    alt={product.name}
                    className="object-contain w-full h-full drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <Zap size={64} className="text-slate-800" />
                )}
              </div>

              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                  <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.4em]">
                    Hardware Engine
                  </span>
                  <h2 className="text-5xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">
                    {product.name}
                  </h2>
                  <p className="text-5xl font-black text-emerald-400 tracking-tighter">
                    ${product.price}
                  </p>
                </div>

                <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed max-w-md">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-8">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                      Stock
                    </p>
                    <p className="text-white font-bold">
                      {product.stockQuantity} Units
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                      Category
                    </p>
                    <p className="text-white font-bold">Pro Gear</p>
                  </div>
                </div>

                <div className="pt-6">
                  <button className="w-full bg-white text-slate-950 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-500 hover:text-white transition-all shadow-xl active:scale-95">
                    Add to Shopping Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
