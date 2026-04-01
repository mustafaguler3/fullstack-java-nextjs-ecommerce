'use client';
import { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#0f172a] px-4 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-emerald-500/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[20%] left-[10%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-800 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent italic">
            JOIN US
          </h2>
          <p className="mt-2 text-sm text-slate-400 font-medium">
            Start your premium shopping journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={18} />
              <input
                type="text"
                required
                className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                placeholder="Mustafa Güler"
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={18} />
              <input
                type="email"
                required
                className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                placeholder="mustafa@example.com"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1 text-center">Passwords</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input
                  type="password"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  placeholder="••••••••"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input
                  type="password"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  placeholder="Confirm Password"
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl font-bold shadow-xl shadow-emerald-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
          >
            Create My Account
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-400">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-emerald-400 hover:text-blue-400 transition-colors underline underline-offset-4">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}