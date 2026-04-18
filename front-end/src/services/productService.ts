
import { mockProducts } from "../utils/mockProducts";

export const productService = {
  list: async (params?: any) => {
    // Return mock data directly for layout testing
    let filtered = [...mockProducts];
    if (params?.category) {
      filtered = filtered.filter(p => p.category === params.category);
    }
    if (params?.featured) {
      filtered = filtered.filter(p => p.is_featured);
    }
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return filtered;
  },
  getBySlug: async (slug: string) => {
    const product = mockProducts.find(p => p.slug === slug);
    if (!product) throw new Error("Produto não encontrado");
    await new Promise(resolve => setTimeout(resolve, 500));
    return product;
  },
  // Admin
  create: async (data: any) => {
    console.log("Mock create product", data);
    return mockProducts[0];
  },
  update: async (id: string, data: any) => {
    console.log("Mock update product", id, data);
    return mockProducts[0];
  },
  delete: async (id: string) => {
    console.log("Mock delete product", id);
  }
};
