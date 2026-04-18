import { supabase } from "../../lib/supabase.js";
import { NotFoundError } from "../../utils/errors.js";
export class CartService {
    static async getCart(userId) {
        // 1. Encontrar o carrinho do usuário
        let { data: cart } = await supabase
            .from("carts")
            .select("id, user_id")
            .eq("user_id", userId)
            .single();
        if (!cart) {
            // Cria um se não existir
            const { data: newCart, error } = await supabase
                .from("carts")
                .insert({ user_id: userId })
                .select()
                .single();
            if (error || !newCart)
                throw new Error("Erro ao criar carrinho");
            cart = newCart;
        }
        // 2. Buscar itens do carrinho
        const { data: items } = await supabase
            .from("cart_items")
            .select(`
        id, cart_id, product_id, quantity,
        product:products (id, name, price, images, slug)
      `)
            .eq("cart_id", cart.id);
        return { ...cart, items: items || [] };
    }
    static async addItem(userId, data) {
        const cart = await this.getCart(userId);
        // Verificar se produto existe e tem estoque
        const { data: product } = await supabase
            .from("products")
            .select("id, stock")
            .eq("id", data.product_id)
            .single();
        if (!product)
            throw new NotFoundError("Produto não encontrado");
        if (product.stock < data.quantity)
            throw new Error("Estoque insuficiente");
        // Verificar se já tem o item no carrinho
        const { data: existingItem } = await supabase
            .from("cart_items")
            .select("id, quantity")
            .eq("cart_id", cart.id)
            .eq("product_id", data.product_id)
            .single();
        if (existingItem) {
            const newQuantity = existingItem.quantity + data.quantity;
            if (product.stock < newQuantity)
                throw new Error("Estoque insuficiente");
            const { data: updated, error } = await supabase
                .from("cart_items")
                .update({ quantity: newQuantity })
                .eq("id", existingItem.id)
                .select()
                .single();
            if (error)
                throw new Error("Erro ao atualizar item do carrinho");
            return updated;
        }
        // Criar novo item
        const { data: newItem, error } = await supabase
            .from("cart_items")
            .insert({
            cart_id: cart.id,
            product_id: data.product_id,
            quantity: data.quantity
        })
            .select()
            .single();
        if (error)
            throw new Error("Erro ao adicionar item");
        return newItem;
    }
    static async updateItem(userId, itemId, data) {
        const cart = await this.getCart(userId);
        // Verificar se o item pertence ao carrinho
        const { data: item } = await supabase
            .from("cart_items")
            .select("id, product_id")
            .eq("id", itemId)
            .eq("cart_id", cart.id)
            .single();
        if (!item)
            throw new NotFoundError("Item não encontrado no carrinho");
        // Verificar estoque
        const { data: product } = await supabase
            .from("products")
            .select("stock")
            .eq("id", item.product_id)
            .single();
        if (product && product.stock < data.quantity)
            throw new Error("Estoque insuficiente");
        const { data: updated, error } = await supabase
            .from("cart_items")
            .update({ quantity: data.quantity })
            .eq("id", itemId)
            .select()
            .single();
        if (error)
            throw new Error("Erro ao atualizar quantidade");
        return updated;
    }
    static async removeItem(userId, itemId) {
        const cart = await this.getCart(userId);
        const { error } = await supabase
            .from("cart_items")
            .delete()
            .eq("id", itemId)
            .eq("cart_id", cart.id);
        if (error)
            throw new Error("Erro ao remover item");
    }
    static async clearCart(userId) {
        const cart = await this.getCart(userId);
        const { error } = await supabase
            .from("cart_items")
            .delete()
            .eq("cart_id", cart.id);
        if (error)
            throw new Error("Erro ao limpar carrinho");
    }
}
//# sourceMappingURL=cart.service.js.map