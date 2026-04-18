
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Shield, Truck, Clock, Wrench } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../products/ProductCard';
import { Loading } from '../components/common/Loading';

export const Home = () => {
  const { products, isLoading } = useProducts({ featured: true });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-color1/90 to-gray-900/90 mix-blend-multiply" />
        
        {/* Background Graphic Patterns */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-color3 opacity-10 blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-color2 opacity-20 blur-[100px]"></div>

        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-left max-w-2xl">
              <span className="inline-block py-1 px-3 rounded-full bg-color5/10 text-color4 text-sm font-semibold tracking-wider mb-6 border border-color5/20">
                NOVA COLEÇÃO 2026
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                A Revolução sobre <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-color4 to-color3">Duas Rodas</span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 max-w-xl">
                Descubra nossa coleção exclusiva de bicicletas premium. Desempenho, conforto e uma estética inigualável para você dominar qualquer terreno.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button size="lg" className="font-bold text-lg bg-color2 hover:bg-color1 text-white border-none shadow-[0_0_20px_rgba(60,160,51,0.4)] hover:shadow-[0_0_30px_rgba(60,160,51,0.6)] transition-all hover:-translate-y-1">
                    Explorar Catálogo
                  </Button>
                </Link>
                <Link to="/products?category=Ofertas">
                  <Button size="lg" variant="outline" className="font-bold text-lg text-white border-white/30 hover:bg-white/10 transition-all">
                    Ver Ofertas
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex-1 relative flex justify-center items-center">
              <div className="absolute w-[120%] h-[120%] bg-gradient-to-tr from-color2/20 to-transparent rounded-full blur-[80px] -z-10 animate-pulse"></div>
              <img 
                src="/hero-bike.png" 
                alt="Bicicleta Premium" 
                className="w-full max-w-xl object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Frete Grátis", desc: "Para todo o Brasil em compras acima de R$500" },
              { icon: Shield, title: "Garantia Estendida", desc: "Até 5 anos em quadros de carbono" },
              { icon: Clock, title: "Entrega Rápida", desc: "Sua bike montada e regulada em 48h" },
              { icon: Wrench, title: "Suporte Técnico", desc: "Atendimento especializado e vitalício" }
            ].map((b, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 hover:border-color4">
                <div className="bg-color5 p-5 rounded-full text-color1 mb-6">
                  <b.icon size={36} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{b.title}</h3>
                <p className="text-gray-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Destaques da Temporada</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">As bicicletas mais desejadas pelos nossos clientes, com design e tecnologia de ponta.</p>
          </div>
          
          {isLoading ? (
            <div className="py-12"><Loading /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="mt-16 text-center">
            <Link to="/products">
              <Button variant="ghost" size="lg" className="text-color1 border border-color1 hover:bg-color5">
                Ver Todas as Bicicletas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Explore por Categoria</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Encontre exatamente o que você precisa em nossas categorias especializadas.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              'Mountain Bike', 'Speed/Road', 'Urbana', 'BMX', 
              'Infantil', 'Capacetes', 'Guidões', 'Bancos', 
              'Acessórios', 'Peças', 'Ofertas'
            ].map((cat, i) => (
              <Link 
                to={`/products?category=${encodeURIComponent(cat)}`} 
                key={i} 
                className="group relative overflow-hidden bg-white rounded-xl border border-gray-100 p-6 flex flex-col items-center justify-center text-center hover:shadow-xl hover:border-color3 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-color5/0 to-color5/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-color1 transition-colors relative z-10">
                  {cat}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
