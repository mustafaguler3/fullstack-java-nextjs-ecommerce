'use client';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-5 bg-slate-900 text-white shadow-xl">
      <div className="text-xl font-black tracking-tighter">
        <Link href="/">MUSTAFA STORE</Link>
      </div>
      
      <div className="flex gap-8 items-center font-medium">
        <Link href="/" className="hover:text-blue-400 transition">Ana Sayfa</Link>
        <Link href="/login" className="hover:text-blue-400 transition">Giriş</Link>
        <Link href="/register" className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition">
          Kayıt Ol
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;