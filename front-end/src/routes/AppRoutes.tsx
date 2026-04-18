import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AdminRoute } from './AdminRoute';

import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Products } from '../pages/Products';
import { AdminDashboard } from '../pages/AdminDashboard';
import { AdminProducts } from '../pages/AdminProducts';
import { AdminOrders } from '../pages/AdminOrders';
import { AdminLayout } from '../layout/AdminLayout';
import { Favorites } from '../pages/Favorites';
import { Maintenance } from '../pages/Maintenance';
// Add placeholder for missing pages to avoid breaking app
const Placeholder = ({ name }: { name: string }) => <div className="p-8 text-center text-2xl font-bold">{name} - Em Desenvolvimento</div>;
const AdminPlaceholder = ({ name }: { name: string }) => (
  <AdminLayout>
    <div className="p-12 text-center">
      <h1 className="text-3xl font-bold text-gray-400 mb-4">{name}</h1>
      <p className="text-gray-500">Este módulo está em desenvolvimento.</p>
    </div>
  </AdminLayout>
);
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:slug" element={<Placeholder name="Detalhes do Produto" />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/maintenance" element={<Maintenance />} />
      
      {/* Rotas Protegidas de Usuário */}
      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<Placeholder name="Carrinho" />} />
        <Route path="/checkout" element={<Placeholder name="Checkout" />} />
        <Route path="/order-success" element={<Placeholder name="Sucesso" />} />
        <Route path="/my-orders" element={<Placeholder name="Meus Pedidos" />} />
        <Route path="/support" element={<Placeholder name="Suporte" />} />
      </Route>

      {/* Rotas de Admin */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/stock" element={<AdminPlaceholder name="Gestão de Estoque" />} />
        <Route path="/admin/customers" element={<AdminPlaceholder name="Clientes" />} />
        <Route path="/admin/coupons" element={<AdminPlaceholder name="Cupons de Desconto" />} />
        <Route path="/admin/finance" element={<AdminPlaceholder name="Financeiro e Relatórios" />} />
        <Route path="/admin/settings" element={<AdminPlaceholder name="Configurações da Loja" />} />
        <Route path="/admin/tickets" element={<AdminPlaceholder name="Tickets de Suporte" />} />
      </Route>

      <Route path="*" element={<Placeholder name="404 - Not Found" />} />
    </Routes>
  );
};
