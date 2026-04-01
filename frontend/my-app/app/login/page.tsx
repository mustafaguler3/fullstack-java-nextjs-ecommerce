'use client';
import Link from 'next/link';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#0f172a] px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="w-full max-w-md p-8 space-y-8 rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-slate-800 shadow-2xl relative z-10">
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent italic">
            WELCOME BACK
          </h1>
          <p className="mt-3 text-slate-400 text-sm font-medium">Please enter your details</p>
        </div>

        <form className="space-y-5">
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={20} />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full pl-11 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={20} />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full pl-11 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-xs font-semibold text-blue-400 hover:text-emerald-400 transition-colors">
              Forgot Password?
            </button>
          </div>

          <button className="w-full py-4 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <LogIn size={20} />
            Login to MG Store
          </button>
        </form>

        <p className="text-center text-sm text-slate-400">
          New here?{' '}
          <Link href="/register" className="text-blue-400 font-bold hover:text-emerald-400 transition-colors underline underline-offset-4">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}