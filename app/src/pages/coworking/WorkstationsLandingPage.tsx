import { useState } from 'react';
import { Laptop, Wifi, Coffee, MessageCircle, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Clock, ShieldCheck, Armchair, Users, FileText, MapPin } from 'lucide-react';
import useLenis from '../../hooks/useLenis';
import TopNavigation from '../../components/TopNavigation';
import Footer from '../../sections/Footer';
import SEO from '../../components/SEO';
import CoworkingQuoteForm from '../../sections/coworking-page/CoworkingQuoteForm';
import CoworkingStickyMobileCta from '../../components/coworking/CoworkingStickyMobileCta';
import { trackWhatsAppClick } from '../../lib/whatsappAnalytics';

const galleryImages = [
  { src: '/images/coworking/estacoes-geral.webp', label: 'Salão Principal com Iluminação Natural e Ergonomia' },
  { src: '/images/coworking/estacoes-mesas.webp', label: 'Bancadas Compartilhadas com Pontos de Energia' },
  { src: '/images/imgs_coworking/Estações de trabalho 2.webp', label: 'Postos de Trabalho Individuais e Foco' },
  { src: '/images/coworking/lounge-convivencia.webp', label: 'Lounge Integrado para Networking e Descompressão' },
  { src: '/images/coworking/cafe-copa.webp', label: 'Café Especial, Copa e Área de Alimentação' },
];

const features = [
  {
    icon: <Wifi className="w-6 h-6 text-[#378ADD]" />,
    title: 'Internet Ultrarrápida & Redundante',
    desc: 'Links dedicados de alta velocidade e sinal Wi-Fi potente para chamadas de vídeo e upload sem instabilidade.',
  },
  {
    icon: <Armchair className="w-6 h-6 text-[#378ADD]" />,
    title: 'Ergonomia & Conforto',
    desc: 'Cadeiras anatômicas e mesas amplas preparadas para longas jornadas com foco e postura correta.',
  },
  {
    icon: <Coffee className="w-6 h-6 text-[#378ADD]" />,
    title: 'Café Especial & Copa Completa',
    desc: 'Café cortesia à vontade, geladeira, micro-ondas, água filtrada e copa estruturada para seu almoço ou lanche.',
  },
  {
    icon: <Clock className="w-6 h-6 text-[#378ADD]" />,
    title: 'Flexibilidade de Horários',
    desc: 'Opções por diária avulsa (day pass), pacotes de horas mensais ou mesa fixa dedicada com armário privativo.',
  },
  {
    icon: <Users className="w-6 h-6 text-[#378ADD]" />,
    title: 'Comunidade & Networking',
    desc: 'Conecte-se com profissionais de tecnologia, startups, consultores e criativos em um ambiente inovador.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#378ADD]" />,
    title: 'Zero Burocracia ou Fiador',
    desc: 'Chegue, conecte seu notebook e comece a produzir imediatamente. Sem contratos amarrados ou fiador.',
  },
];

const plans = [
  {
    name: 'Hot Desk Avulso',
    image: '/images/coworking/estacoes-geral.webp',
    badge: 'Mais Flexível • Posição Rotativa',
    desc: 'Ideal para quem busca foco pontual sem mensalidade. Contratação avulsa por hora, meio período (4 horas), diária completa (Day Pass) ou semana.',
    features: [
      'Locação flexível por hora, 4h, diária ou semana',
      'Posição rotativa em salão amplo e climatizado',
      'Wi-Fi ultrarrápido redundante e tomadas individuais',
      'Café especial e água filtrada à vontade',
      'Acesso livre à copa, micro-ondas e lounge',
    ],
    highlight: false,
  },
  {
    name: 'Mesa Fixa Exclusiva',
    image: '/images/coworking/estacoes-mesas.webp',
    badge: 'Mais Completo • Posto Exclusivo',
    desc: 'Sua mesa reservada todos os dias, ninguém senta no seu lugar. Inclui gaveteiro privativo com chave e acesso estendido conforme contrato.',
    features: [
      'Posição 100% exclusiva (ninguém senta no seu lugar)',
      'Gaveteiro / armário privativo com chave',
      'Horas de cortesia em salas de reunião executivas',
      'Desconto no endereço fiscal da sua empresa',
      'Planos mensal, semestral ou anual com economia progressiva',
      'Café especial, internet dedicada e climatização total',
    ],
    highlight: true,
  },
  {
    name: 'Flex 40h (Rotina Híbrida)',
    image: '/images/coworking/lounge-convivencia.webp',
    badge: 'Econômico • Trabalho Híbrido',
    desc: 'Franquia de 40 horas mensais em posição rotativa. A solução sob medida para quem intercala entre home office e coworking presencial.',
    features: [
      'Franquia de 40 horas por mês em posição rotativa',
      'Economia inteligente sem pagar por dias não utilizados',
      'Infraestrutura completa de internet, café e áreas comuns',
      'Planos mensais ou contratos com desconto de 3, 6 e 12 meses',
      'Ideal para consultores, programadores e profissionais híbridos',
    ],
    highlight: false,
  },
];

const faqs = [
  {
    q: 'Como funciona o Day Pass (diária)? Preciso agendar antes?',
    a: 'Você pode garantir sua diária diretamente pelo WhatsApp ou chegar à recepção do Vila Tech Hub durante o horário comercial. Recomendamos uma mensagem rápida prévia para garantir sua recepção ágil e sem filas.',
  },
  {
    q: 'O que está incluso na diária ou plano mensal?',
    a: 'Estão inclusos: conexão à internet Wi-Fi de alta velocidade e redundante, energia elétrica em todas as mesas, café especial à vontade, uso da copa e micro-ondas, área de descompressão/lounge e suporte da recepção.',
  },
  {
    q: 'Como funcionam chamadas de vídeo e reuniões?',
    a: 'Para reuniões rápidas e ligações, contamos com espaços de apoio e phone booths. Para reuniões longas, confidenciais ou com clientes, você pode locar salas de reunião privativas por hora com desconto especial.',
  },
  {
    q: 'Posso levar meu almoço ou fazer lanches no local?',
    a: 'Sim! Nossa copa integrada é completa com geladeira, micro-ondas, pias e área de refeição. Além disso, temos o Honest Market (PL Market) com snacks e bebidas 24/7.',
  },
  {
    q: 'Onde o Vila Tech Hub está localizado em Itu?',
    a: 'Estamos estrategicamente localizados no Itu Novo Centro, com facilidade de estacionamento nas proximidades, segurança, restaurantes e acesso rápido às principais vias da cidade.',
  },
];

export default function WorkstationsLandingPage() {
  useLenis();
  const [spaceType, setSpaceType] = useState('Estação de Trabalho');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  const nextPhoto = () => setSelectedPhoto((prev) => (prev + 1) % galleryImages.length);
  const prevPhoto = () => setSelectedPhoto((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));

  const whatsappMsg = encodeURIComponent(
    'Olá! Vi o anúncio no Google e gostaria de saber mais sobre as Estações de Trabalho e diárias no Vila Tech Hub em Itu.'
  );
  const whatsappUrl = `https://wa.me/5511997321522?text=${whatsappMsg}`;

  const scrollToQuote = () => {
    document.getElementById('cotacao')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-void-black text-white min-h-screen pb-16 md:pb-0">
      <SEO
        title="Estações de Trabalho e Mesas Compartilhadas em Itu | Vila Tech Hub"
        description="Alugue estações de trabalho e coworking em Itu. Diárias (Day Pass), planos de mesa fixa e pacotes de horas no Itu Novo Centro. Internet veloz e café incluso."
        url="https://www.vilatechub.com.br/coworking/estacoes-de-trabalho"
      />

      <TopNavigation variant="coworking" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-[#378ADD]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6">
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#378ADD]/15 border border-[#378ADD]/30 text-[#378ADD] text-xs font-syne font-bold uppercase tracking-widest">
                  <Laptop size={14} /> Estações de Trabalho em Itu
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-sans">
                  <MapPin size={13} className="text-[#378ADD]" /> Itu Novo Centro
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-syne font-extrabold text-white leading-[1.1] mb-6">
                Seu posto de trabalho com <span className="text-[#378ADD]">máxima produtividade</span> e conforto.
              </h1>

              <p className="text-lg md:text-xl text-gray-300 font-sans font-light leading-relaxed mb-8 max-w-xl">
                Mesas compartilhadas e fixas no <strong>Itu Novo Centro</strong>. Conexão ultrarrápida redundante, café especial à vontade e ambiente climatizado projetado para seu foco diário.
              </p>

              {/* CTAs com distinção clara entre WhatsApp, Cotação e Planos */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3.5 mb-8">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick({ location: 'workstations_hero' })}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#25D366] text-black font-syne font-bold text-base hover:bg-[#20ba59] transition-all duration-300 shadow-lg shadow-[#25D366]/20 hover:scale-105"
                >
                  <MessageCircle size={22} className="text-black" />
                  Garantir Mesa no WhatsApp
                </a>

                <button
                  type="button"
                  onClick={scrollToQuote}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#378ADD] hover:bg-[#2c77c5] text-white font-syne font-bold text-base shadow-lg shadow-[#378ADD]/25 transition-all duration-300 hover:scale-105"
                >
                  <FileText size={19} />
                  Solicitar Cotação
                </button>

                <button
                  type="button"
                  onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center gap-1.5 px-6 py-4 rounded-full border border-white/20 bg-white/5 text-white/90 font-syne font-semibold hover:bg-white/10 hover:text-white transition-colors"
                >
                  Ver Planos ↓
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-xs text-gray-400 font-sans">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-[#25D366]" /> Diária ou mensal
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-[#25D366]" /> Sem fiador nem burocracia
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-[#25D366]" /> Café especial incluso
                </span>
              </div>
            </div>

            {/* Right Media Preview — Ampliado com Carrossel e Setas */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 aspect-[16/10] group">
                <img
                  src={galleryImages[selectedPhoto].src}
                  alt={galleryImages[selectedPhoto].label}
                  className="w-full h-full object-cover transition-all duration-500"
                  fetchPriority="high"
                />

                {/* Navigation Arrows */}
                <button
                  type="button"
                  onClick={prevPhoto}
                  aria-label="Foto anterior"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all shadow-xl opacity-80 group-hover:opacity-100 z-10"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={nextPhoto}
                  aria-label="Próxima foto"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all shadow-xl opacity-80 group-hover:opacity-100 z-10"
                >
                  <ChevronRight size={22} />
                </button>

                {/* Subtle photo counter badge */}
                <div className="absolute bottom-3 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-white/90">
                  {selectedPhoto + 1} / {galleryImages.length}
                </div>
              </div>

              {/* Thumbnails row */}
              <div className="grid grid-cols-5 gap-2.5 mt-3">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedPhoto(idx)}
                    aria-label={`Ver foto ${idx + 1}`}
                    className={`rounded-xl overflow-hidden aspect-[16/10] border transition-all ${
                      selectedPhoto === idx
                        ? 'border-[#378ADD] scale-105 shadow-md shadow-[#378ADD]/30'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img.src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto md:px-12 border-b border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-syne font-bold uppercase tracking-[0.25em] text-[#378ADD]">
            INFRAESTRUTURA COMPLETA
          </span>
          <h2 className="text-3xl md:text-4xl font-syne font-bold text-white mt-3 mb-4">
            Tudo o que você precisa para focar 100% no seu trabalho
          </h2>
          <p className="text-gray-400 font-sans text-base">
            Elimine as distrações do home office e os custos de manter um escritório comercial próprio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-[#378ADD]/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[#378ADD]/10 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-syne font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm font-sans leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Plans Section */}
      <section id="planos" className="py-20 px-6 max-w-7xl mx-auto md:px-12 border-b border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-syne font-bold uppercase tracking-[0.25em] text-[#378ADD]">
            MODALIDADES & PLANOS
          </span>
          <h2 className="text-3xl md:text-4xl font-syne font-bold text-white mt-3 mb-4">
            Escolha o formato ideal para sua rotina
          </h2>
          <p className="text-gray-400 font-sans text-base">
            De diárias pontuais para quem precisa de foco a planos mensais completos com locker exclusivo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 group ${
                plan.highlight
                  ? 'bg-gradient-to-b from-[#378ADD]/15 via-white/[0.04] to-zinc-950/80 border-2 border-[#378ADD] shadow-2xl shadow-[#378ADD]/10 relative'
                  : 'bg-white/[0.03] border border-white/10 hover:border-white/20'
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-3 right-3 z-10 px-3.5 py-1 rounded-full bg-[#378ADD] text-white text-[11px] font-syne font-bold uppercase tracking-wider shadow-lg">
                  Recomendado
                </div>
              )}

              {/* Foto da Modalidade */}
              <div className="relative h-48 w-full overflow-hidden bg-white/5">
                <img
                  src={plan.image}
                  alt={plan.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                <span className="absolute bottom-3 left-4 inline-block px-3 py-1 rounded-full text-xs font-syne font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md border border-white/15 text-white">
                  {plan.badge}
                </span>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-syne font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm font-sans mb-6 leading-relaxed">{plan.desc}</p>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-sm text-gray-300 font-sans">
                        <CheckCircle2 size={16} className="text-[#378ADD] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Botão Único de Ação no Card: Solicitar Cotação Formal */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSpaceType(`Estação de Trabalho (${plan.name})`);
                      scrollToQuote();
                    }}
                    className={`w-full py-3.5 px-4 rounded-full font-syne font-bold text-xs uppercase tracking-wider text-center transition-all hover:scale-[1.02] flex items-center justify-center gap-2 ${
                      plan.highlight
                        ? 'bg-[#378ADD] text-white hover:bg-[#2c77c5] shadow-lg shadow-[#378ADD]/25'
                        : 'border border-white/20 bg-white/5 hover:bg-white hover:text-black text-white'
                    }`}
                  >
                    <FileText size={16} />
                    Solicitar Cotação deste Plano
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botão Longo de Atendimento WhatsApp (único e destacado abaixo dos cards) */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-zinc-900/90 to-zinc-900 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-[#25D366]/15 flex items-center justify-center shrink-0 border border-[#25D366]/30">
              <MessageCircle size={28} className="text-[#25D366]" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-syne font-bold text-white mb-1">
                Prefere atendimento imediato para tirar dúvidas?
              </h4>
              <p className="text-sm text-gray-400 font-sans leading-relaxed">
                Fale direto com nossos consultores no WhatsApp para consultar valores e disponibilidade em tempo real.
              </p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick({ location: 'workstations_plans_long_button' })}
            className="w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#25D366] text-black font-syne font-bold text-sm uppercase tracking-wider hover:bg-[#20ba59] transition-all duration-300 shadow-xl shadow-[#25D366]/20 hover:scale-105"
          >
            <MessageCircle size={19} className="text-black" />
            Falar com Consultor no WhatsApp
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 max-w-4xl mx-auto md:px-12 border-b border-white/5">
        <div className="text-center mb-12">
          <span className="text-xs font-syne font-bold uppercase tracking-[0.25em] text-[#378ADD]">
            DÚVIDAS FREQUENTES
          </span>
          <h2 className="text-3xl md:text-4xl font-syne font-bold text-white mt-3">
            Tudo o que você precisa saber sobre o espaço
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left font-syne font-bold text-white hover:text-[#378ADD] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={`transition-transform duration-300 text-gray-400 ${openFaq === idx ? 'rotate-180 text-[#378ADD]' : ''}`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 text-gray-300 font-sans text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <div id="cotacao">
        <CoworkingQuoteForm spaceType={spaceType} onSpaceTypeChange={setSpaceType} />
      </div>

      <Footer />

      {/* Sticky Mobile Conversion Bar */}
      <CoworkingStickyMobileCta
        whatsappUrl={whatsappUrl}
        whatsappLocation="workstations_mobile_sticky"
        onQuoteClick={scrollToQuote}
        quoteLabel="Solicitar Cotação"
        accentColor="#378ADD"
      />
    </div>
  );
}
