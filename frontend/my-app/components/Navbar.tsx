'use client';
import Link from 'next/link';
import { ShoppingBag, User, LogIn, LayoutGrid, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-[100] flex justify-between items-center px-8 py-4 bg-slate-950/80 backdrop-blur-md text-white shadow-2xl border-b border-white/5">
      <div className="flex items-center gap-12">
        <div className="text-2xl font-black tracking-tighter group">
          <Link href="/" className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent transition-all duration-500 group-hover:saturate-150 italic">
            MG STORE
          </Link>
          <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-400 to-emerald-400 transition-all duration-500"></div>
        </div>
        <div className="hidden md:flex gap-8 items-center font-bold text-[11px] uppercase tracking-[0.2em] text-slate-400">
          <Link href="/" className="hover:text-white transition-colors relative group py-1">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/products" className="hover:text-white transition-colors relative group py-1 flex items-center gap-2">
            <LayoutGrid size={14} className="text-emerald-500" />
            Products
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <div className="pr-4 border-r border-white/10">
          <button className="group relative p-2.5 bg-slate-900/50 rounded-xl border border-white/5 hover:border-emerald-500/50 transition-all active:scale-90 hover:bg-slate-800">
            <ShoppingBag size={20} className="text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-slate-950 shadow-lg shadow-blue-500/20">
              0
            </span>
          </button>
        </div>
        <div className="flex items-center gap-5 pl-2">
          <Link href="/login" className="flex items-center gap-2 text-slate-400 hover:text-blue-400 font-bold text-[11px] uppercase tracking-wider transition-all group">
            <LogIn size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Login</span>
          </Link>

          <Link href="/register" className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-black text-[10px] uppercase tracking-widest text-white transition-all duration-300 bg-slate-800 rounded-xl group hover:bg-blue-600 shadow-xl border border-white/5">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center gap-2">
              <User size={14} />
              Register
            </span>
          </Link>
        </div>

      </div>
    </nav>
  );
}