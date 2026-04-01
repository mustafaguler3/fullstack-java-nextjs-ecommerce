import { ApiResponse } from '@/types/api-response';
import api from './api';
import { Product, CreateProductDTO } from '@/types/product';

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const { data } = await api.get<ApiResponse<Product[]>>('/products');
    return data.data;
  },

  
  getById: async (id: number): Promise<Product> => {
    const { data } = await api.get<ApiResponse<Product>>(`/products/${id}`);
    return data.data;
  },

  
  getByCategory: async (categoryId: number): Promise<Product[]> => {
    const { data } = await api.get<ApiResponse<Product[]>>(`/products/category/${categoryId}`);
    return data.data;
  },

  
  create: async (product: CreateProductDTO): Promise<Product> => {
    const { data } = await api.post<ApiResponse<Product>>('/products', product);
    return data.data;
  },

  
  update: async (id: number, product: Partial<CreateProductDTO>): Promise<Product> => {
    const { data } = await api.put<ApiResponse<Product>>(`/products/${id}`, product);
    return data.data;
  },

  
  delete: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
  }
};