
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-xl font-bold text-white mb-4">VeloStore</h4>
          <p className="text-sm text-gray-400">
            A melhor loja de bicicletas do Brasil. Encontre a bike perfeita para sua aventura.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-medium text-white mb-4">Links Úteis</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-blue-400">Início</Link></li>
            <li><Link to="/products" className="hover:text-blue-400">Bicicletas</Link></li>
            <li><Link to="/support" className="hover:text-blue-400">Suporte</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-medium text-white mb-4">Contato</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>contato@velostore.com.br</li>
            <li>(11) 99999-9999</li>
            <li>São Paulo, SP</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-medium text-white mb-4">Newsletter</h4>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Seu email" 
              className="bg-gray-800 border border-gray-700 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 w-full"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Assinar
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} VeloStore. Todos os direitos reservados.
      </div>
    </footer>
  );
};
