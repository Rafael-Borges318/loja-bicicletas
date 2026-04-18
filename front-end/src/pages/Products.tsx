import { useState, useMemo } from 'react';
import { useProducts } from '../hooks/useProducts';
import { Loading } from '../components/common/Loading';
import { EmptyState } from '../components/common/EmptyState';
import { ProductCard } from '../products/ProductCard';
import { Input } from '../components/common/Input';
import { Search, Filter } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const Products = () => {
  const { products, isLoading, error } = useProducts();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || '';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedType, setSelectedType] = useState('');
  
  const categories = ['Todas', 'Mountain Bike', 'Speed/Road', 'Urbana', 'BMX', 'Infantil', 'Capacetes', 'Guidões', 'Bancos', 'Acessórios', 'Peças', 'Manutenção', 'Ofertas'];
  const types = ['Todos', 'Trilha', 'Passeio', 'Competição', 'Elétrica'];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory === '' || selectedCategory === 'Todas' || product.category === selectedCategory;
      const matchType = selectedType === '' || selectedType === 'Todos' || product.category === selectedType; // Simplificação para usar category
      
      return matchSearch && matchCategory && matchType;
    });
  }, [products, searchTerm, selectedCategory, selectedType]);

  if (isLoading) return <Loading fullScreen />;
  if (error) return <EmptyState title="Erro" description={error} />;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
              <Search size={20} className="text-color1" />
              Buscar
            </h2>
            <Input 
              placeholder="Ex: Aro 29, Capacete..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
              <Filter size={20} className="text-color1" />
              Categorias
            </h2>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {categories.map(cat => (
                <label key={cat} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <input 
                    type="radio" 
                    name="category"
                    checked={selectedCategory === cat || (cat === 'Todas' && !selectedCategory)}
                    onChange={() => setSelectedCategory(cat === 'Todas' ? '' : cat)}
                    className="text-color1 focus:ring-color1 w-4 h-4"
                  />
                  <span className="text-gray-700">{cat}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Catálogo</h1>
            <span className="text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">{filteredProducts.length} resultados</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
               <EmptyState title="Nenhum produto encontrado" description="Tente ajustar seus filtros ou termos de busca." />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
