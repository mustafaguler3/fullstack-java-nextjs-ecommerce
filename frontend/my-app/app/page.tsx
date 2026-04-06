'use client';
import Link from "next/link";
import { ArrowRight, Terminal, Cpu, Layout } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-[#0f172a] text-white min-h-screen relative overflow-hidden">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full"></div>
      </div>

      <section className="relative pt-32 pb-20 px-6 flex flex-col items-center text-center z-10">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 mb-8 animate-fadeIn">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold tracking-widest text-slate-300 uppercase">New Collection 2026 is Live</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
          EQUIP YOUR <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent italic">
            DIGITAL WORKSPACE
          </span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed font-medium">
          High-performance mechanical keyboards, ergonomic gear, and developer 
          essentials curated for the <span className="text-white">next generation of engineers.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full">
          <Link
            href="/products"
            className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 active:scale-95 w-full sm:w-auto"
          >
            Explore Collection
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            href="/categories"
            className="inline-flex items-center justify-center px-10 py-5 rounded-2xl font-bold text-lg border border-slate-700 hover:bg-slate-800/50 hover:border-slate-500 transition-all active:scale-95 w-full sm:w-auto"
          >
            Categories
          </Link>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
          {[
            { icon: <Terminal className="text-blue-400" />, title: "Dev Focused", desc: "Built for long coding sessions" },
            { icon: <Cpu className="text-emerald-400" />, title: "Precision", desc: "Ultra-fast mechanical switches" },
            { icon: <Layout className="text-cyan-400" />, title: "Ergonomic", desc: "Optimized for posture and speed" }
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm hover:border-slate-700 transition-colors">
              <div className="mb-4 inline-block p-3 bg-slate-800 rounded-2xl">{feature.icon}</div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-slate-500 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}