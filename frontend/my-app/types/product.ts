export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  categoryId: number;
  category?: Category;
}

export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  categoryId: number;
}