import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '../components/common/Button';
import { formatCurrency } from '../utils/currency';
import { Product } from '../types/product.types';
import { useCart } from '../hooks/useCart';
import { useToast } from '../context/ToastContext';
import { useFavorites } from '../context/FavoritesContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [isAdding, setIsAdding] = useState(false);

  const favorite = isFavorite(product.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAdding) return;
    setIsAdding(true);
    try {
      await addItem(product, 1);
      toast.success(`${product.name} adicionado ao carrinho!`);
    } catch {
      toast.error("Erro ao adicionar produto. Tente novamente.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Impede navegação para a tela de detalhes
    toggleFavorite(product);
    if (!favorite) {
      toast.success(`${product.name} adicionado aos favoritos!`);
    } else {
      toast.info(`${product.name} removido dos favoritos.`);
    }
  };

  return (
    <Link to={`/products/${product.slug}`} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1">
      <div className="h-64 bg-color5/20 relative p-6 flex items-center justify-center">
        {/* Favorite Button */}
        <button 
          onClick={handleToggleFavorite}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm transition-colors focus:outline-none"
          title={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Heart size={20} className={`transition-colors ${favorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`} />
        </button>

        {product.images?.[0] ? (
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-color3">Sem Imagem</div>
        )}
        {product.is_featured && (
          <span className="absolute top-4 left-4 bg-color1 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
            Destaque
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-xs text-color2 mb-2 font-bold tracking-widest uppercase">{product.category}</div>
        <h3 className="font-bold text-gray-900 text-xl mb-3 line-clamp-2 leading-snug group-hover:text-color1 transition-colors">{product.name}</h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">{product.description}</p>
        <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-2xl text-gray-900">{formatCurrency(product.price)}</span>
            {product.price > 2000 && (
              <span className="text-xs font-bold text-color1 bg-color5 px-2 py-1 rounded-md">10x sem juros</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex-1 text-sm text-color1 border-color1 hover:bg-color5 transition-colors">
              Ver Detalhes
            </Button>
            <Button size="md" onClick={handleAddToCart} disabled={product.stock === 0 || isAdding} className={`rounded-md w-12 h-10 p-0 flex items-center justify-center bg-color1 hover:bg-color2 shadow-md transition-transform ${isAdding ? 'opacity-75 cursor-not-allowed' : 'hover:scale-105'}`}>
              <ShoppingCart size={20} className={isAdding ? 'animate-pulse' : ''} />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
