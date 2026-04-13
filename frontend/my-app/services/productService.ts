import axiosClient from "./axiosClient";

const productService = {
  getAll: async (page: number, size: number, sortBy: string, sortDir: string) => {
    const response = await axiosClient.get(
      `/products?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`
    );
console.log("Product Service:", response.data.content);
    return response.data;
  },
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