import { supabase } from "../../lib/supabase.js";
import { Product } from "./product.types.js";
import { CreateProductInput, UpdateProductInput } from "./product.schemas.js";
import { slugify } from "../../utils/formatters.js";
import { NotFoundError } from "../../utils/errors.js";

export class ProductService {
  static async listProducts(filters: { category?: string; featured?: string; search?: string }): Promise<Product[]> {
    let query = supabase.from("products").select("*").eq("is_active", true);

    if (filters.category) {
      query = query.eq("category", filters.category);
    }
    if (filters.featured === "true") {
      query = query.eq("is_featured", true);
    }
    if (filters.search) {
      query = query.ilike("name", `%${filters.search}%`);
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) throw new Error("Erro ao listar produtos");
    return data || [];
  }

  static async getProductById(id: string): Promise<Product> {
    const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
    if (error || !data) throw new NotFoundError("Produto não encontrado");
    return data;
  }

  static async getProductBySlug(slug: string): Promise<Product> {
    const { data, error } = await supabase.from("products").select("*").eq("slug", slug).single();
    if (error || !data) throw new NotFoundError("Produto não encontrado");
    return data;
  }

  static async createProduct(data: CreateProductInput): Promise<Product> {
    const slug = slugify(data.name);
    
    // Garantir slug único
    const { data: existing } = await supabase.from("products").select("id").eq("slug", slug).single();
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const { data: product, error } = await supabase
      .from("products")
      .insert({ ...data, slug: finalSlug })
      .select()
      .single();

    if (error || !product) throw new Error("Erro ao criar produto");
    return product;
  }

  static async updateProduct(id: string, data: UpdateProductInput): Promise<Product> {
    let slugData = {};
    if (data.name) {
      const slug = slugify(data.name);
      slugData = { slug };
    }

    const { data: product, error } = await supabase
      .from("products")
      .update({ ...data, ...slugData, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error || !product) throw new Error("Erro ao atualizar produto");
    return product;
  }

  static async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw new Error("Erro ao excluir produto");
  }
}
