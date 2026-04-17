import { supabase } from "../../lib/supabase.js";
import { Order, OrderItem } from "./order.types.js";
import { CreateOrderInput, UpdateOrderStatusInput } from "./order.schemas.js";
import { CartService } from "../cart/cart.service.js";
import { NotFoundError, ValidationError } from "../../utils/errors.js";

export class OrderService {
  static async createOrder(userId: string, data: CreateOrderInput): Promise<Order> {
    const cart = await CartService.getCart(userId);

    if (!cart.items || cart.items.length === 0) {
      throw new ValidationError("O carrinho está vazio");
    }

    // 1. Recalcular o total com base no banco de dados para segurança
    let totalAmount = 0;
    const orderItemsData = [];

    for (const item of cart.items) {
      const { data: product } = await supabase
        .from("products")
        .select("id, price, stock")
        .eq("id", item.product_id)
        .single();

      if (!product) throw new Error(`Produto ${item.product_id} não encontrado`);
      if (product.stock < item.quantity) throw new Error(`Estoque insuficiente para o produto ${item.product_id}`);

      totalAmount += product.price * item.quantity;

      orderItemsData.push({
        product_id: product.id,
        quantity: item.quantity,
        price_at_time: product.price,
      });
    }

    // 2. Criar o pedido
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        status: "pending",
        total_amount: totalAmount,
        payment_method: data.payment_method,
        pickup_location: data.pickup_location,
        customer_info: data.customer_info,
      })
      .select()
      .single();

    if (orderError || !order) throw new Error("Erro ao criar pedido");

    // 3. Criar os itens do pedido e atualizar estoque
    const itemsToInsert = orderItemsData.map(item => ({
      order_id: order.id,
      ...item
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(itemsToInsert);
    if (itemsError) throw new Error("Erro ao salvar itens do pedido");

    // Atualizar estoques
    for (const item of orderItemsData) {
      const { data: currentProduct } = await supabase.from("products").select("stock").eq("id", item.product_id).single();
      if (currentProduct) {
        await supabase
          .from("products")
          .update({ stock: currentProduct.stock - item.quantity })
          .eq("id", item.product_id);
      }
    }

    // 4. Limpar o carrinho
    await CartService.clearCart(userId);

    return order;
  }

  static async getUserOrders(userId: string): Promise<Order[]> {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        items:order_items (
          id, quantity, price_at_time,
          product:products (name, images, slug)
        )
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw new Error("Erro ao listar pedidos");
    return data || [];
  }

  static async getOrderById(userId: string, orderId: string, role: string): Promise<Order> {
    let query = supabase
      .from("orders")
      .select(`
        *,
        items:order_items (
          id, quantity, price_at_time,
          product:products (name, images, slug)
        )
      `)
      .eq("id", orderId);

    if (role !== "admin") {
      query = query.eq("user_id", userId);
    }

    const { data, error } = await query.single();

    if (error || !data) throw new NotFoundError("Pedido não encontrado");
    return data;
  }

  static async listAllOrders(): Promise<Order[]> {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        user:users (name, email)
      `)
      .order("created_at", { ascending: false });

    if (error) throw new Error("Erro ao listar pedidos");
    return data || [];
  }

  static async updateOrderStatus(orderId: string, data: UpdateOrderStatusInput): Promise<Order> {
    const { data: order, error } = await supabase
      .from("orders")
      .update({ status: data.status, updated_at: new Date().toISOString() })
      .eq("id", orderId)
      .select()
      .single();

    if (error || !order) throw new Error("Erro ao atualizar status do pedido");
    return order;
  }
}
