"use client";
import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  User,
  LogIn,
  LayoutGrid,
  LogOut,
  Settings,
  Package,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleOutsideClick = () => {
      setIsMenuOpen(false);
    };

    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isMenuOpen]);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const isLoggedIn = useSyncExternalStore(
    (callback) => {
      window.addEventListener("storage", callback);
      return () => window.removeEventListener("storage", callback);
    },
    () => !!localStorage.getItem("token"),
    () => false,
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-[100] flex justify-between items-center px-8 py-4 bg-slate-950/80 backdrop-blur-md text-white shadow-2xl border-b border-white/5">
      <div className="flex items-center gap-12">
        <div className="text-2xl font-black tracking-tighter group">
          <Link
            href="/"
            className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent transition-all duration-500 group-hover:saturate-150 italic"
          >
            MG STORE
          </Link>
        </div>

        <div className="hidden md:flex gap-8 items-center font-bold text-[11px] uppercase tracking-[0.2em] text-slate-400">
          <Link
            href="/"
            className="hover:text-white transition-colors relative group py-1"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="hover:text-white transition-colors relative group py-1 flex items-center gap-2"
          >
            <LayoutGrid size={14} className="text-emerald-500" />
            Products
          </Link>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="pr-4 border-r border-white/10">
          <button className="group relative p-2.5 bg-slate-900/50 rounded-xl border border-white/5 hover:border-emerald-500/50 transition-all active:scale-90">
            <ShoppingBag
              size={20}
              className="text-emerald-400 group-hover:scale-110 transition-transform"
            />
            <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-slate-950 shadow-lg">
              0
            </span>
          </button>
        </div>

        {!isLoggedIn ? (
          <div className="flex items-center gap-5 pl-2">
            <Link
              href="/login"
              className="flex items-center gap-2 text-slate-400 hover:text-blue-400 font-bold text-[11px] uppercase tracking-wider transition-all group"
            >
              <LogIn
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span>Login</span>
            </Link>

            <Link
              href="/register"
              className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-black text-[10px] uppercase tracking-widest text-white bg-slate-800 rounded-xl group hover:bg-blue-600 shadow-xl border border-white/5"
            >
              <span className="relative flex items-center gap-2">
                <User size={14} />
                Register
              </span>
            </Link>
          </div>
        ) : (
          <div className="relative pl-2">
            <button
              onClick={toggleMenu}
              className="flex items-center gap-2 p-1.5 bg-slate-900 rounded-full border border-white/10 hover:border-blue-500/50 transition-all active:scale-95"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center font-black text-xs text-white shadow-inner">
                M
              </div>
              <ChevronDown
                size={14}
                className={`text-slate-500 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-3 w-52 bg-slate-900 border border-white/5 rounded-2xl p-2 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in duration-200">
                <div className="px-4 py-3 border-b border-white/5 mb-2">
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none">
                    Operator
                  </p>
                  <p className="text-xs font-bold text-white mt-1 truncate">
                    Mustafa
                  </p>
                </div>

                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-bold text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all group"
                >
                  <User size={16} className="group-hover:text-blue-400" />
                  Profile Details
                </Link>

                <Link
                  href="/orders"
                  className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-bold text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all group"
                >
                  <Package size={16} className="group-hover:text-emerald-400" />
                  Order History
                </Link>

                <Link
                  href="/settings"
                  className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-bold text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all group"
                >
                  <Settings
                    size={16}
                    className="group-hover:rotate-45 transition-transform"
                  />
                  Settings
                </Link>

                <div className="h-px bg-white/5 my-2 mx-2"></div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-black text-red-400 hover:bg-red-500/10 rounded-xl transition-all uppercase tracking-widest"
                >
                  <LogOut size={16} />
                  Terminate Session
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
