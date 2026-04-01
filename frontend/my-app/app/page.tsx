import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <section className="relative py-20 px-10 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent -z-10"></div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
          Equip Your{" "}
          <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Digital Workspace
          </span>
        </h1>

        <p className="text-gray-400 text-xl max-w-2xl mb-10 leading-relaxed">
          Premium mechanical keyboards, ergonomic gear, and developer essentials
          curated for the modern engineer.
        </p>

        <div className="flex gap-4">
          <Link
            href="/products"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition shadow-lg shadow-blue-900/40"
          >
            Explore Collection
          </Link>
          <Link
            href="/categories"
            className="border border-gray-700 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-bold text-lg transition"
          >
            Categories
          </Link>
        </div>
      </section>
    </div>
  );
}
