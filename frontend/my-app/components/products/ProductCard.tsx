'use client';

import { Product } from '@/types/product';
import { ShoppingCart, Eye, Heart, X } from 'lucide-react'; 
import { useState } from 'react';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(product.price);

  return (
    <>
      {/* --- KARANLIK TEMA ANA KART --- */}
      <div className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-4 shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 ease-in-out overflow-hidden">
        
        {/* Favori Kalp - Daha Şeffaf Koyu Tema Uyumu */}
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className={`absolute top-4 right-4 z-10 p-2.5 bg-slate-800/80 backdrop-blur-md rounded-full shadow-lg transition-all duration-300 hover:scale-110 border border-slate-700 ${
            isFavorite ? 'text-red-500 fill-red-500 border-red-500/20' : 'text-slate-400 hover:text-red-500'
          }`}
        >
          <Heart size={18} strokeWidth={2.5} />
        </button>

        {/* Görsel Alanı */}
        <div className="relative h-52 bg-slate-800/50 rounded-xl mb-4 flex items-center justify-center overflow-hidden border border-slate-700/50">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-in-out"
            />
          ) : (
            <div className="flex flex-col items-center gap-2">
               <span className="text-slate-600 font-bold tracking-tighter text-xs uppercase">No Visual Found</span>
            </div>
          )}
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="p-3 bg-blue-600 text-white rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-all duration-300 hover:bg-blue-500"
            >
               <Eye size={22} />
            </button>
          </div>
        </div>

        {/* İçerik */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-100 text-lg leading-tight line-clamp-1 group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-xs text-slate-400 line-clamp-2 min-h-[32px] font-medium leading-relaxed">
            {product.description}
          </p>

          <div className="pt-2 flex justify-between items-center border-t border-slate-800">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Price Tag</span>
              <span className="text-xl font-black text-white">{formattedPrice}</span>
            </div>

            <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-4 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-900/20 hover:shadow-blue-500/30 active:scale-95 transition-all">
              <ShoppingCart size={18} />
              <span className="text-xs">BUY</span>
            </button>
          </div>
        </div>
        
        {/* Stok Badge - Koyu Tema Uyumu */}
        {product.stockQuantity < 5 && (
          <span className="absolute top-4 left-4 bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-tighter backdrop-blur-md">
            Low Stock
          </span>
        )}
      </div>

      {/* --- MODAL (DETAYLAR) - KOYU TEMA --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn" onClick={() => setIsModalOpen(false)}>
          <div className="relative bg-slate-900 border border-slate-800 rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 z-20 p-2.5 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
              {/* Sol: Görsel */}
              <div className="bg-slate-950/50 flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-slate-800">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="object-contain max-h-[350px] w-full group-hover:scale-105 transition-transform" />
                ) : (
                  <span className="text-slate-800 text-6xl font-black">MG</span>
                )}
              </div>

              {/* Sağ: Detaylar */}
              <div className="p-8 md:p-12 flex flex-col justify-between bg-slate-900/50">
                <div>
                  <h2 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase italic">
                    {product.name}
                  </h2>
                  <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-6">
                    {formattedPrice}
                  </div>
                  
                  <p className="text-slate-400 leading-relaxed mb-8 text-sm font-medium">
                    {product.description}
                  </p>

                  <div className="space-y-4 pt-6 border-t border-slate-800">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 text-xs font-bold uppercase">Availability</span>
                      <span className="text-emerald-400 font-bold text-xs bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                        {product.stockQuantity} IN STOCK
                      </span>
                    </div>
                  </div>
                </div>

                <button className="mt-10 w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-blue-500/20 hover:shadow-emerald-500/20 transition-all hover:-translate-y-1 active:scale-[0.98]">
                  <ShoppingCart size={22} />
                  Add to Gear List
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}