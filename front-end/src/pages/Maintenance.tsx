import React, { useState } from 'react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { useToast } from '../context/ToastContext';
import { Wrench, CheckCircle, AlertTriangle, Send } from 'lucide-react';

export const Maintenance = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bikeModel: '',
    bikeType: '',
    brand: '',
    rimSize: '',
    usageTime: '',
    problemType: '',
    description: '',
    whenStarted: '',
    hadFall: 'Não',
    preventsUse: 'Não',
    contactPref: 'WhatsApp',
    urgency: 'Média',
    budgetFirst: 'Sim',
    location: '',
    observations: ''
  });

  const [checklist, setChecklist] = useState<string[]>([]);

  const checklistItems = [
    'Freio', 'Corrente', 'Roda', 'Marcha', 'Guidão', 
    'Pedal', 'Banco', 'Quadro', 'Barulho Estranho', 'Pneu/Câmara'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleChecklist = (item: string) => {
    setChecklist(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.phone || !formData.bikeModel || !formData.problemType) {
      toast.error('Por favor, preencha todos os campos obrigatórios marcados com *');
      setIsSubmitting(false);
      return;
    }

    // Format WhatsApp Message
    const text = `
*Triagem de Manutenção - VeloStore* 🔧

*Dados do Cliente*
Nome: ${formData.name}
Telefone: ${formData.phone}
Local: ${formData.location || 'Não informado'}
Pref. Contato: ${formData.contactPref}

*Sobre a Bicicleta*
Modelo: ${formData.bikeModel}
Tipo: ${formData.bikeType || 'Não informado'}
Marca: ${formData.brand || 'Não informado'}
Aro: ${formData.rimSize || 'Não informado'}
Tempo de uso: ${formData.usageTime || 'Não informado'}

*Problema Relatado*
Tipo principal: ${formData.problemType}
Urgência: ${formData.urgency}
Sofreu queda? ${formData.hadFall}
Impede o uso? ${formData.preventsUse}
Orçamento prévio? ${formData.budgetFirst}

*Detalhes do Problema:*
${formData.description || 'Nenhum detalhe adicional.'}
Desde quando: ${formData.whenStarted || 'Não informado'}

*Checklist de Áreas Afetadas:*
${checklist.length > 0 ? checklist.join(', ') : 'Nenhuma área específica marcada.'}

${formData.observations ? `*Observações:* ${formData.observations}` : ''}
    `.trim();

    const encodedText = encodeURIComponent(text);
    const whatsappNumber = '5511999999999'; // Número fictício do técnico
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

    toast.success('Redirecionando para o WhatsApp do nosso técnico...');
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-color5 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wrench size={32} className="text-color1" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Triagem para Manutenção</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Preencha o formulário abaixo para nos ajudar a entender o problema da sua bicicleta. Nosso técnico receberá as informações prontas e poderá te atender mais rapidamente.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">
          
          {/* Sessão 1: Dados do Cliente */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 border-b pb-2">
              <span className="bg-color1 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
              Seus Dados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Nome Completo *" name="name" value={formData.name} onChange={handleInputChange} required />
              <Input label="Telefone / WhatsApp *" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="(11) 99999-9999" />
              <Input label="Bairro / Cidade" name="location" value={formData.location} onChange={handleInputChange} />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferência de Contato</label>
                <select name="contactPref" value={formData.contactPref} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-color1 focus:border-color1">
                  <option>WhatsApp</option>
                  <option>Ligação</option>
                  <option>E-mail</option>
                </select>
              </div>
            </div>
          </section>

          {/* Sessão 2: Sobre a Bike */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 border-b pb-2">
              <span className="bg-color1 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
              Sua Bicicleta
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Modelo da Bicicleta *" name="bikeModel" value={formData.bikeModel} onChange={handleInputChange} required placeholder="Ex: Caloi Elite Carbon" />
              <Input label="Marca" name="brand" value={formData.brand} onChange={handleInputChange} placeholder="Ex: Caloi, Trek, Specialized" />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Bicicleta</label>
                <select name="bikeType" value={formData.bikeType} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-color1">
                  <option value="">Selecione...</option>
                  <option>Mountain Bike</option>
                  <option>Speed / Road</option>
                  <option>Urbana</option>
                  <option>Elétrica</option>
                  <option>BMX</option>
                </select>
              </div>
              <Input label="Aro (Opcional)" name="rimSize" value={formData.rimSize} onChange={handleInputChange} placeholder="Ex: 29" />
              <Input label="Tempo aproximado de uso" name="usageTime" value={formData.usageTime} onChange={handleInputChange} placeholder="Ex: 1 ano, 6 meses" />
            </div>
          </section>

          {/* Sessão 3: O Problema */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 border-b pb-2">
              <span className="bg-color1 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
              O Problema
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Qual o problema principal? *" name="problemType" value={formData.problemType} onChange={handleInputChange} required placeholder="Ex: Freio não funciona" />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nível de Urgência</label>
                  <select name="urgency" value={formData.urgency} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-color1">
                    <option>Baixa - Pode esperar</option>
                    <option>Média - Uso regularmente</option>
                    <option>Alta - Preciso com urgência</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quais áreas estão apresentando problema? (Marque as que souber)</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {checklistItems.map(item => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggleChecklist(item)}
                      className={`px-3 py-2 text-sm rounded-lg border transition-colors flex items-center justify-between
                        ${checklist.includes(item) ? 'bg-color5 border-color1 text-color1 font-medium' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                    >
                      {item}
                      {checklist.includes(item) && <CheckCircle size={14} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sofreu queda ou impacto?</label>
                  <select name="hadFall" value={formData.hadFall} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-color1">
                    <option>Não</option>
                    <option>Sim</option>
                    <option>Não tenho certeza</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">O problema impede o uso?</label>
                  <select name="preventsUse" value={formData.preventsUse} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-color1">
                    <option>Não</option>
                    <option>Sim, não consigo andar</option>
                    <option>Parcialmente</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quer orçamento antes?</label>
                  <select name="budgetFirst" value={formData.budgetFirst} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-color1">
                    <option>Sim, aguardar aprovação</option>
                    <option>Não, pode realizar o reparo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição detalhada do problema</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-color1 focus:border-color1"
                  placeholder="Conte-nos o que está acontecendo com a bicicleta em detalhes..."
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Desde quando o problema ocorre?" name="whenStarted" value={formData.whenStarted} onChange={handleInputChange} placeholder="Ex: Há uma semana, Ontem..." />
                <Input label="Observações adicionais" name="observations" value={formData.observations} onChange={handleInputChange} placeholder="Qualquer outra informação relevante" />
              </div>
            </div>
          </section>

          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg flex-1">
              <AlertTriangle size={20} className="flex-shrink-0" />
              <p>Ao clicar no botão, você será direcionado para o nosso WhatsApp comercial com todos os dados preenchidos.</p>
            </div>
            
            <Button 
              type="submit" 
              size="lg" 
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg shadow-green-500/30 flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <Send size={20} />
              {isSubmitting ? 'Gerando mensagem...' : 'Enviar para o técnico pelo WhatsApp'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
