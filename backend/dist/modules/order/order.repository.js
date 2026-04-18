import { supabase } from "../../lib/supabase.js";
export async function insertOrder(order, items) {
    const { data: createdOrder, error: orderError } = await supabase
        .from("orders")
        .insert(order)
        .select("*")
        .single();
    if (orderError)
        throw orderError;
    const orderItems = items.map((item) => ({
        ...item,
        order_id: createdOrder.id,
    }));
    const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);
    if (itemsError)
        throw itemsError;
    return {
        order: createdOrder,
        items: orderItems,
    };
}
//# sourceMappingURL=order.repository.js.map