'use client';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-5 bg-slate-900 text-white shadow-2xl border-b border-gray-800">
      {/* Brand Logo with Gradient */}
      <div className="text-2xl font-black tracking-tighter">
        <Link href="/" className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent hover:opacity-80 transition">
          MG STORE
        </Link>
      </div>
      
      {/* Navigation Links */}
      <div className="flex gap-8 items-center font-medium">
        <Link href="/" className="hover:text-blue-400 transition">Home</Link>
        <Link href="/products" className="hover:text-blue-400 transition">Products</Link>
        <Link href="/login" className="hover:text-blue-400 transition">Login</Link>
        <Link href="/register" className="bg-blue-600 px-5 py-2 rounded-full font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-900/20">
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;