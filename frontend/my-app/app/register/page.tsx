'use client';
import { useState } from 'react';
import Link from 'next/link';
import authService from '@/services/authService';
import { User, Mail, Lock, Phone, FileText, ArrowRight, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    description: '',
    phoneNumber: ''
  });
  const router = useRouter();
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrors({});
  setLoading(true);

  if (formData.password !== formData.confirmPassword) {
    setErrors({ confirmPassword: ["Passwords do not match!"] });
    setLoading(false);
    return;
  }

  try {
    await authService.register(formData);
    toast.success("Registration successful! Please log in.");
    setFormData({
      username: '',
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      description: '',
      phoneNumber: ''
    });
    router.push('/login');
  } catch (err: any) {
    if (err && err.errors) {
      setErrors(err.errors);
    } else {
      setErrors({ general: [typeof err === 'string' ? err : "An error occurred"] });
    }
  } finally {
    setLoading(false);
  }
};

  const FieldError = ({ field }: { field: string }) => (
    errors[field] ? (
      <p className="text-[10px] text-red-400 font-bold mt-1.5 ml-1 uppercase tracking-tight italic animate-in fade-in duration-300">
        {errors[field][0]}
      </p>
    ) : null
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-emerald-500/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[20%] left-[10%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-2xl w-full bg-slate-900/50 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-800 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent italic uppercase">
            Join MG Store
          </h2>
        </div>

        {Object.keys(errors).length > 0 && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2 mb-3 text-red-400 font-black text-[11px] uppercase tracking-widest italic">
              <AlertCircle size={16} />
              <span>Fix Following Issues</span>
            </div>
            <ul className="space-y-1">
              {Object.keys(errors).map((key) => (
                errors[key].map((msg: string, idx: number) => (
                  <li key={`${key}-${idx}`} className="text-[10px] text-red-300/80 font-bold flex items-center gap-2 uppercase italic">
                    <span className="text-red-500 opacity-50">•</span> {msg}
                  </li>
                ))
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1 italic">Username</label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 -translate-y-1/2 ${errors.username ? 'text-red-400' : 'text-slate-500'}`} size={18} />
                <input
                  type="text"
                  className={`w-full pl-11 pr-4 py-3 bg-slate-800/50 border ${errors.username ? 'border-red-500' : 'border-slate-700'} rounded-xl text-white text-sm focus:outline-none transition-all`}
                  placeholder="musti_dev"
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
                <FieldError field="username" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1 italic">Full Name</label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 -translate-y-1/2 ${errors.fullName ? 'text-red-400' : 'text-slate-500'}`} size={18} />
                <input
                  type="text"
                  className={`w-full pl-11 pr-4 py-3 bg-slate-800/50 border ${errors.fullName ? 'border-red-500' : 'border-slate-700'} rounded-xl text-white text-sm focus:outline-none transition-all`}
                  placeholder="Mustafa Güler"
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
                <FieldError field="fullName" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1 italic">Email</label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 ${errors.email ? 'text-red-400' : 'text-slate-500'}`} size={18} />
                <input
                  type="email"
                  className={`w-full pl-11 pr-4 py-3 bg-slate-800/50 border ${errors.email ? 'border-red-500' : 'border-slate-700'} rounded-xl text-white text-sm focus:outline-none transition-all`}
                  placeholder="musti@example.com"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <FieldError field="email" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1 italic">Phone</label>
              <div className="relative">
                <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 ${errors.phoneNumber ? 'text-red-400' : 'text-slate-500'}`} size={18} />
                <input
                  type="text"
                  className={`w-full pl-11 pr-4 py-3 bg-slate-800/50 border ${errors.phoneNumber ? 'border-red-500' : 'border-slate-700'} rounded-xl text-white text-sm focus:outline-none transition-all`}
                  placeholder="90530..."
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                />
                <FieldError field="phoneNumber" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1 italic">Description</label>
            <div className="relative">
              <FileText className={`absolute left-3 top-4 ${errors.description ? 'text-red-400' : 'text-slate-500'}`} size={18} />
              <textarea
                rows={2}
                className={`w-full pl-11 pr-4 py-3 bg-slate-800/50 border ${errors.description ? 'border-red-500' : 'border-slate-700'} rounded-xl text-white text-sm focus:outline-none transition-all resize-none`}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
              <FieldError field="description" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1 italic">Password</label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 ${errors.password ? 'text-red-400' : 'text-slate-500'}`} size={18} />
                <input
                  type="password"
                  className={`w-full pl-11 pr-4 py-3 bg-slate-800/50 border ${errors.password ? 'border-red-500' : 'border-slate-700'} rounded-xl text-white text-sm focus:outline-none transition-all`}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <FieldError field="password" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1 italic">Confirm</label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 ${errors.confirmPassword ? 'text-red-400' : 'text-slate-500'}`} size={18} />
                <input
                  type="password"
                  className={`w-full pl-11 pr-4 py-3 bg-slate-800/50 border ${errors.confirmPassword ? 'border-red-500' : 'border-slate-700'} rounded-xl text-white text-sm focus:outline-none transition-all`}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
                <FieldError field="confirmPassword" />
              </div>
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl font-black shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 uppercase tracking-widest flex items-center justify-center gap-2"
          >
            {loading ? 'Processing...' : 'Create Account'}
            <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}