const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('Ürünler yüklenirken hata oluştu');
  return response.json();
};