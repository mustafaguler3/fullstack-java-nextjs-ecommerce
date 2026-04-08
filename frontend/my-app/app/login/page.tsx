'use client';
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import authService from '@/services/authService';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();
  
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authService.login(formData);

      if (response.statusCode === 200) {
        localStorage.setItem("token", response.data.token);
        
        window.dispatchEvent(new Event("storage"));
        
        router.push("/");
      }
    } catch (error: any) {
      console.error("Login failed:", error.message || error);
      alert(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-blue-500 font-bold italic animate-pulse">
        MG_AUTH_CHECKING...
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#0f172a] px-4">
      <div className="w-full max-w-md p-8 space-y-8 rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-slate-800 shadow-2xl relative z-10">
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent italic">
            WELCOME BACK
          </h1>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-2">Access Secure Terminal</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400" size={20} />
            <input 
              type="email" 
              name="email" 
              placeholder="Email Address" 
              required
              className="w-full pl-11 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              onChange={handleChange}
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400" size={20} />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              required
              className="w-full pl-11 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              onChange={handleChange}
            />
          </div>

          <button 
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white rounded-xl font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-50 transition-all active:scale-[0.98]"
          >
            {loading ? <Loader2 className="animate-spin" /> : <LogIn size={20} />}
            Initialize Session
          </button>
        </form>
      </div>
    </div>
  );
}