import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { ProductCard } from '../products/ProductCard';
import { EmptyState } from '../components/common/EmptyState';

export const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex items-center gap-3">
        <Heart className="text-red-500 fill-red-500" size={32} />
        <h1 className="text-3xl font-bold text-gray-900">Meus Favoritos</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
          <Heart size={48} className="text-gray-300 mb-4" />
          <EmptyState 
            title="Nenhum favorito ainda" 
            description="Explore nosso catálogo e clique no coração para salvar suas bicicletas favoritas aqui." 
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
