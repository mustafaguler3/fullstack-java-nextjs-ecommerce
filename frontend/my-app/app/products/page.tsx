'use client';
import { Filter, Zap } from 'lucide-react';
import ProductList from '@/components/products/ProductList'; 

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20 px-8 relative overflow-hidden">
     
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/5 pb-10 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Zap size={18} className="text-emerald-400 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
                Premium Hardware
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white italic uppercase leading-none">
              The <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Gear</span> List
            </h1>
            <p className="text-slate-500 mt-4 font-medium max-w-md text-sm leading-relaxed">
              Curated high-performance tools and equipment, specifically selected for the modern software engineer.
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-900 border border-white/5 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-300 hover:text-white hover:border-blue-500/50 transition-all duration-300 active:scale-95 shadow-xl">
              <Filter size={16} className="text-blue-400" /> 
              Filter
            </button>
          </div>
        </div>

        <div className="relative">
          <ProductList />
        </div>

      </div>
    </div>
  );
}