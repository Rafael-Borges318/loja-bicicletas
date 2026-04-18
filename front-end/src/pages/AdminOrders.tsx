import { AdminLayout } from '../layout/AdminLayout';
import { Search, Eye } from 'lucide-react';
import { useState } from 'react';

export const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for orders
  const orders = [
    { id: '#10045', client: 'Carlos Santos', date: '18/04/2026', items: 2, total: 'R$ 12.500,00', status: 'Enviado', statusColor: 'bg-blue-100 text-blue-700' },
    { id: '#10046', client: 'Maria Oliveira', date: '18/04/2026', items: 1, total: 'R$ 299,90', status: 'Pendente', statusColor: 'bg-yellow-100 text-yellow-700' },
    { id: '#10047', client: 'João Silva', date: '17/04/2026', items: 1, total: 'R$ 5.499,00', status: 'Aprovado', statusColor: 'bg-green-100 text-green-700' },
    { id: '#10048', client: 'Ana Clara', date: '16/04/2026', items: 3, total: 'R$ 850,00', status: 'Cancelado', statusColor: 'bg-red-100 text-red-700' },
    { id: '#10049', client: 'Pedro Alves', date: '15/04/2026', items: 1, total: 'R$ 18.200,00', status: 'Entregue', statusColor: 'bg-emerald-100 text-emerald-700' },
  ];

  const filteredOrders = orders.filter(o => 
    o.id.includes(searchTerm) || o.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pedidos e Vendas</h1>
          <p className="text-gray-500">Acompanhe o status e histórico de todas as vendas.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Buscar por ID ou cliente..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-color1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm">
                <th className="px-6 py-3 font-medium">Pedido</th>
                <th className="px-6 py-3 font-medium">Data</th>
                <th className="px-6 py-3 font-medium">Cliente</th>
                <th className="px-6 py-3 font-medium">Itens</th>
                <th className="px-6 py-3 font-medium">Total</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredOrders.map((order, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 text-gray-900">{order.client}</td>
                  <td className="px-6 py-4 text-gray-600">{order.items}</td>
                  <td className="px-6 py-4 font-medium">{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-color1 transition-colors" title="Ver Detalhes">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};
