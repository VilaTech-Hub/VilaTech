import { useState } from 'react';
import { Send } from 'lucide-react';

const CoworkingQuoteForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    spaceType: '',
    capacity: '',
    period: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '', email: '', phone: '', spaceType: '', capacity: '', period: '', message: ''
      });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="cotacao" className="py-24 bg-[#0a0a0a] relative z-10 overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#378ADD]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-syne font-bold text-white mb-4">Fazer Cotação</h2>
          <p className="text-gray-400 font-sans text-lg">
            Conte-nos um pouco sobre a sua necessidade e nossa equipe entrará em contato com a melhor solução.
          </p>
        </div>

        <div className="bg-void-black border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Contato Básico */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-sans text-gray-400 mb-2">Nome Completo *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#378ADD] transition-colors"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="block text-sm font-sans text-gray-400 mb-2">WhatsApp / Telefone *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#378ADD] transition-colors"
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-sans text-gray-400 mb-2">E-mail *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#378ADD] transition-colors"
                placeholder="seu@email.com"
              />
            </div>

            {/* Necessidades do Espaço */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-sans text-gray-400 mb-2">Tipo de Espaço</label>
                <select
                  name="spaceType"
                  value={formData.spaceType}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#378ADD] transition-colors appearance-none"
                >
                  <option value="" className="bg-void-black">Selecione...</option>
                  <option value="Estação de Trabalho" className="bg-void-black">Estação de Trabalho</option>
                  <option value="Sala de Reunião" className="bg-void-black">Sala de Reunião</option>
                  <option value="Auditório" className="bg-void-black">Auditório</option>
                  <option value="Estúdio Podcast" className="bg-void-black">Estúdio Podcast</option>
                  <option value="Endereço Fiscal" className="bg-void-black">Endereço Fiscal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-sans text-gray-400 mb-2">Capacidade (Pessoas)</label>
                <select
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#378ADD] transition-colors appearance-none"
                >
                  <option value="" className="bg-void-black">Selecione...</option>
                  <option value="Apenas eu (1)" className="bg-void-black">Apenas eu (1)</option>
                  <option value="2 pessoas" className="bg-void-black">2 pessoas</option>
                  <option value="4 pessoas" className="bg-void-black">4 pessoas</option>
                  <option value="6 pessoas" className="bg-void-black">6 pessoas</option>
                  <option value="8 pessoas" className="bg-void-black">8 pessoas</option>
                  <option value="10 a 12 pessoas" className="bg-void-black">10 a 12 pessoas</option>
                  <option value="Mais de 12" className="bg-void-black">Mais de 12</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-sans text-gray-400 mb-2">Período de Uso</label>
                <select
                  name="period"
                  value={formData.period}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#378ADD] transition-colors appearance-none"
                >
                  <option value="" className="bg-void-black">Selecione...</option>
                  <option value="Horas Avulsas" className="bg-void-black">Horas Avulsas</option>
                  <option value="Diária (Day Pass)" className="bg-void-black">Diária (Day Pass)</option>
                  <option value="Mensal" className="bg-void-black">Mensal</option>
                  <option value="Semestral/Anual" className="bg-void-black">Semestral/Anual</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-sans text-gray-400 mb-2">Mensagem ou observação (opcional)</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#378ADD] transition-colors resize-none"
                placeholder="Detalhes adicionais sobre o que você precisa..."
              ></textarea>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-[#378ADD] text-white font-syne font-bold text-sm uppercase tracking-widest rounded-lg py-4 hover:bg-white hover:text-[#378ADD] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {status === 'submitting' ? (
                  <span className="animate-pulse">Enviando...</span>
                ) : status === 'success' ? (
                  <span>Solicitação Enviada!</span>
                ) : (
                  <>
                    Solicitar Cotação <Send size={18} />
                  </>
                )}
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </section>
  );
};

export default CoworkingQuoteForm;
