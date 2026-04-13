// app/products/page.tsx içinde eklemeler:

"use client";
import { useState } from "react"; // Eklendi
import { Filter, Zap, ChevronDown } from "lucide-react";
import ProductList from "@/components/products/ProductList";

export default function ProductsPage() {
  // Seçilen sıralama kriterini burada tutuyoruz
  const [sortBy, setSortBy] = useState("id");
  const [sortDir, setSortDir] = useState("desc");

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20 px-8 relative overflow-hidden">
      {/* ... Arka plan ve başlık tasarımların aynı kalıyor ... */}

      <div className="flex items-center gap-4 w-full md:w-auto">
        {/* Filtre Butonu - Buraya tıklandığında belki bir dropdown açabilirsin */}
        <select
          onChange={(e) => setSortBy(e.target.value)}
          className="appearance-none bg-slate-900 border border-white/5 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-300 hover:text-white hover:border-blue-500/50 transition-all duration-300 outline-none cursor-pointer shadow-xl"
        >
          <option value="id">Latest Gear</option>
          <option value="price">Price: Low to High</option>
          <option value="name">Name: A-Z</option>
        </select>
      </div>

      <div className="relative">
        {/* ProductList'e bu bilgileri gönderiyoruz ki backend'den ona göre istesin */}
        <ProductList
          key={`${sortBy}-${sortDir}`} // Sıralama değişince bileşen resetlenir
          sortBy={sortBy}
          sortDir={sortDir}
        />
      </div>
    </div>
  );
}
