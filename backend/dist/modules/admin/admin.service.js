import { supabase } from "../../lib/supabase.js";
export class AdminService {
    static async getDashboardMetrics() {
        const [{ count: productsCount }, { count: ordersCount }, { count: ticketsCount }, { count: usersCount }, { data: recentOrders }] = await Promise.all([
            supabase.from("products").select("*", { count: "exact", head: true }),
            supabase.from("orders").select("*", { count: "exact", head: true }),
            supabase.from("support_tickets").select("*", { count: "exact", head: true }),
            supabase.from("users").select("*", { count: "exact", head: true }),
            supabase.from("orders").select("id, status, total_amount, created_at").order("created_at", { ascending: false }).limit(5)
        ]);
        return {
            productsCount: productsCount || 0,
            ordersCount: ordersCount || 0,
            ticketsCount: ticketsCount || 0,
            usersCount: usersCount || 0,
            recentOrders: recentOrders || []
        };
    }
}
//# sourceMappingURL=admin.service.js.map