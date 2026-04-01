export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white border shadow-sm">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <input type="email" placeholder="E-posta" className="w-full p-2 border rounded-md" />
        <input type="password" placeholder="Şifre" className="w-full p-2 border rounded-md" />
        <button className="w-full py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800">
          Login
        </button>
      </div>
    </div>
  );
}