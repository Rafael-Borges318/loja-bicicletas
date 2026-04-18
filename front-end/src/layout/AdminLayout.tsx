import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Tags, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Produtos', path: '/admin/products', icon: Package },
  { name: 'Estoque', path: '/admin/stock', icon: Package },
  { name: 'Pedidos / Vendas', path: '/admin/orders', icon: ShoppingCart },
  { name: 'Clientes', path: '/admin/customers', icon: Users },
  { name: 'Cupons', path: '/admin/coupons', icon: Tags },
  { name: 'Financeiro', path: '/admin/finance', icon: BarChart3 },
  { name: 'Configurações', path: '/admin/settings', icon: Settings },
];

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative
      `}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800">
          <span className="text-xl font-bold text-color4">VeloStore Admin</span>
          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="p-4 flex items-center gap-3 border-b border-gray-800">
          <div className="w-10 h-10 rounded-full bg-color1 flex items-center justify-center font-bold">
            {user?.name?.[0] || 'A'}
          </div>
          <div>
            <p className="text-sm font-medium">{user?.name || 'Administrador'}</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                  ${isActive ? 'bg-color1 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 w-full text-sm font-medium text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Sair do Sistema
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 sm:px-6 z-30">
          <button 
            className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-md"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          <div className="flex-1 flex justify-end">
             {/* Pode adicionar notificações, etc. aqui futuramente */}
             <Link to="/" className="text-sm font-medium text-color1 hover:underline">
               Ver Loja
             </Link>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
