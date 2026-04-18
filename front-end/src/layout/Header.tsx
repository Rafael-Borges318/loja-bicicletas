import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../context/FavoritesContext';
import { ShoppingCart, Menu, User, LogOut, Heart } from 'lucide-react';

export const Header = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { favoritesCount } = useFavorites();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-color1">
          VeloStore
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          <Link to="/" className="text-gray-600 hover:text-color1 font-medium transition-colors">Home</Link>
          <Link to="/products" className="text-gray-600 hover:text-color1 font-medium transition-colors">Bicicletas</Link>
          <Link to="/maintenance" className="text-gray-600 hover:text-color1 font-medium transition-colors">Manutenção</Link>
          <Link to="/support" className="text-gray-600 hover:text-color1 font-medium transition-colors">Suporte</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/favorites" className="relative p-2 text-gray-600 hover:text-color1 transition-colors" title="Favoritos">
            <Heart size={24} />
            {favoritesCount > 0 && (
              <span className="absolute top-0 right-0 bg-color1 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative p-2 text-gray-600 hover:text-color1 transition-colors" title="Carrinho">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 p-2 text-gray-600 hover:text-color1 transition-colors">
                <User size={24} />
                <span className="hidden md:block font-medium">{user.name.split(' ')[0]}</span>
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="p-2 border-b">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                {user.role === 'admin' && (
                  <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Painel Admin</Link>
                )}
                <Link to="/my-orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Meus Pedidos</Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <LogOut size={16} /> Sair
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="text-sm font-medium bg-color1 text-white px-5 py-2.5 rounded-md hover:bg-color2 transition-colors shadow-sm">
              Entrar
            </Link>
          )}

          <button className="md:hidden p-2 text-gray-600">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};
