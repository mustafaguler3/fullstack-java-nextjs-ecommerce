import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Logo & About */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              MG STORE
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              High-performance gear for high-performance engineers. We curate the best tools to elevate your coding experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">Explore</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/" className="hover:text-blue-400 transition">Home</Link></li>
              <li><Link href="/products" className="hover:text-blue-400 transition">All Products</Link></li>
              <li><Link href="/categories" className="hover:text-blue-400 transition">Categories</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">Support</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/faq" className="hover:text-blue-400 transition">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-blue-400 transition">Shipping Policy</Link></li>
              <li><Link href="/returns" className="hover:text-blue-400 transition">Returns</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-400 transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Connect</h3>
            <div className="flex space-x-5">
              <a href="#" className="text-xl text-gray-400 hover:text-blue-400 transition"><FaFacebook /></a>
              <a href="#" className="text-xl text-gray-400 hover:text-pink-400 transition"><FaInstagram /></a>
              <a href="#" className="text-xl text-gray-400 hover:text-blue-300 transition"><FaTwitter /></a>
              <a href="#" className="text-xl text-gray-400 hover:text-white transition"><FaGithub /></a>
            </div>
            <div className="pt-4">
              <div className="flex flex-col space-y-2">
                <input 
                  type="email" 
                  placeholder="Join our newsletter" 
                  className="bg-slate-800 border border-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 text-sm transition"
                />
                <button className="bg-blue-600 px-4 py-2 rounded-md font-bold hover:bg-blue-700 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs gap-4">
          <p>© {new Date().getFullYear()} MG STORE. Crafted with passion by Mustafa.</p>
          <div className="flex gap-6">
            <span>Terms of Service</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;