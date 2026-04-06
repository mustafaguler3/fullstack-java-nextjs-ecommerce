import axiosClient from "./axiosClient";

const productService = {
  getAll: (): Promise<any> => axiosClient.get("/products"),
  getById: (id: number): Promise<any> => axiosClient.get(`/products/${id}`),
  getByCategory: (categoryId: number): Promise<any> => 
    axiosClient.get(`/products/category/${categoryId}`),
  create: (product: any): Promise<any> => 
    axiosClient.post("/products", product),
  update: (id: number, product: any): Promise<any> => 
    axiosClient.put(`/products/${id}`, product),
  delete: (id: number): Promise<any> => 
    axiosClient.delete(`/products/${id}`)
};

export default productService;