'use client';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';
import { Send, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10 border-t border-white/5 relative overflow-hidden font-sans">
      <div className="absolute bottom-0 right-0 w-[30%] h-[30%] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="space-y-6">
            <div className="text-3xl font-black tracking-tighter group inline-block">
              <Link href="/" className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent italic hover:saturate-150 transition-all duration-500">
                MG STORE
              </Link>
              <div className="h-0.5 w-full bg-gradient-to-r from-blue-400 to-emerald-400 opacity-30"></div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-medium max-w-xs">
              High-performance gear for high-performance engineers. We curate the best tools to elevate your <span className="text-blue-400 font-bold">digital workspace.</span>
            </p>
          </div>
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8">Explore</h3>
            <ul className="space-y-4 text-sm font-bold text-slate-400">
              <li><Link href="/" className="hover:text-blue-400 transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 transition-all"></span>Home</Link></li>
              <li><Link href="/products" className="hover:text-emerald-400 transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-0.5 bg-emerald-500 transition-all"></span>All Products</Link></li>
              <li><Link href="/categories" className="hover:text-blue-400 transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 transition-all"></span>Categories</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8">Support</h3>
            <ul className="space-y-4 text-sm font-bold text-slate-400">
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors">Returns</Link></li>
            </ul>
          </div>
          <div className="space-y-8">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Join the Fleet</h3>
            
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Engineer's email" 
                className="w-full bg-slate-900/50 border border-slate-800 text-white px-5 py-3.5 rounded-2xl focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 text-xs transition-all backdrop-blur-sm placeholder:text-slate-600"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 p-2.5 rounded-xl hover:bg-emerald-500 transition-all duration-300 shadow-lg shadow-blue-500/20 group-hover:shadow-emerald-500/20">
                <Send size={16} className="text-white" />
              </button>
            </div>
            <div className="flex space-x-4">
              {[
                { icon: <FaFacebook size={18} />, href: "#", hover: "hover:text-blue-500" },
                { icon: <FaInstagram size={18} />, href: "#", hover: "hover:text-pink-500" },
                { icon: <FaTwitter size={18} />, href: "#", hover: "hover:text-cyan-400" },
                { icon: <FaGithub size={18} />, href: "#", hover: "hover:text-white" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`p-3 bg-slate-900 rounded-xl border border-white/5 text-slate-500 ${social.hover} hover:border-slate-700 hover:-translate-y-1 transition-all duration-300 shadow-inner`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 gap-6">
          <p>© {new Date().getFullYear()} MG STORE. Crafted with passion by <span className="text-blue-400">Mustafa Guler</span></p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}