import { Users, ShoppingBag, DollarSign, Activity } from 'lucide-react';
import { AdminLayout } from '../layout/AdminLayout';

export const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Resumo geral das atividades da loja.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total de Vendas', value: 'R$ 45.231,89', icon: DollarSign, color: 'bg-green-100 text-green-600' },
          { title: 'Pedidos Hoje', value: '12', icon: ShoppingBag, color: 'bg-blue-100 text-blue-600' },
          { title: 'Novos Clientes', value: '128', icon: Users, color: 'bg-purple-100 text-purple-600' },
          { title: 'Visitantes', value: '1.204', icon: Activity, color: 'bg-orange-100 text-orange-600' },
        ].map((metric, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-4 rounded-lg ${metric.color}`}>
              <metric.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{metric.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders (Mock) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Pedidos Recentes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm">
                <th className="px-6 py-3 font-medium">Pedido</th>
                <th className="px-6 py-3 font-medium">Cliente</th>
                <th className="px-6 py-3 font-medium">Data</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { id: '#1234', client: 'João Silva', date: 'Hoje, 14:30', status: 'Aprovado', statusColor: 'bg-green-100 text-green-700', total: 'R$ 5.499,00' },
                { id: '#1233', client: 'Maria Oliveira', date: 'Hoje, 11:20', status: 'Pendente', statusColor: 'bg-yellow-100 text-yellow-700', total: 'R$ 299,90' },
                { id: '#1232', client: 'Carlos Santos', date: 'Ontem', status: 'Enviado', statusColor: 'bg-blue-100 text-blue-700', total: 'R$ 12.500,00' },
                { id: '#1231', client: 'Ana Clara', date: 'Ontem', status: 'Cancelado', statusColor: 'bg-red-100 text-red-700', total: 'R$ 850,00' },
              ].map((order, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-gray-600">{order.client}</td>
                  <td className="px-6 py-4 text-gray-500">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};
