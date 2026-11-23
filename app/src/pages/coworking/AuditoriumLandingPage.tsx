import { useState } from 'react';
import { Presentation, Users, Volume2, Sparkles, MessageCircle, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, MapPin, Coffee, FileText } from 'lucide-react';
import useLenis from '../../hooks/useLenis';
import TopNavigation from '../../components/TopNavigation';
import Footer from '../../sections/Footer';
import SEO from '../../components/SEO';
import CoworkingQuoteForm from '../../sections/coworking-page/CoworkingQuoteForm';
import CoworkingStickyMobileCta from '../../components/coworking/CoworkingStickyMobileCta';
import { trackWhatsAppClick } from '../../lib/whatsappAnalytics';

const galleryImages = [
  { src: '/images/coworking/auditorio-plateia.webp', label: 'Configuração Plateia & Telão Profissional' },
  { src: '/images/coworking/auditorio-mesas.webp', label: 'Configuração com Mesas para Treinamentos' },
  { src: '/images/imgs_coworking/Auditório com cadeiras.webp', label: 'Capacidade Ampla para até 70 Pessoas' },
  { src: '/images/coworking/lounge-convivencia.webp', label: 'Área Integrada para Coffee Break' },
];

const features = [
  {
    icon: <Users className="w-6 h-6 text-[#e83a79]" />,
    title: 'Capacidade até 70 Pessoas',
    desc: 'Layout versátil e modular que se adapta para palestras (plateia até 70p) ou treinamentos (mesas até 56p).',
  },
  {
    icon: <Presentation className="w-6 h-6 text-[#e83a79]" />,
    title: 'Projetor & Telão de Alta Definição',
    desc: 'Sistema de projeção de grande escala para slides, vídeos e transmissões com nitidez impecável.',
  },
  {
    icon: <Volume2 className="w-6 h-6 text-[#e83a79]" />,
    title: 'Sonorização & Microfones Sem Fio',
    desc: 'Acústica planejada e equipamentos de áudio profissionais para oradores, palestrantes e dinâmicas.',
  },
  {
    icon: <Coffee className="w-6 h-6 text-[#e83a79]" />,
    title: 'Área para Coffee Break',
    desc: 'Espaço anexo com copa, cafeteria e lounge perfeito para momentos de networking e lanches.',
  },
  {
    icon: <Sparkles className="w-6 h-6 text-[#e83a79]" />,
    title: 'Iluminação & Climatização Total',
    desc: 'Ambiente 100% climatizado com iluminação cênica ajustável para criar a atmosfera perfeita.',
  },
  {
    icon: <MapPin className="w-6 h-6 text-[#e83a79]" />,
    title: 'Localização Privilegiada',
    desc: 'No Itu Novo Centro, com fácil acesso para participantes locais e caravanas da região.',
  },
];

const configurations = [
  {
    name: 'Cadeiras · Palestra',
    image: '/images/coworking/auditorio-plateia.webp',
    badge: 'Até 70 Pessoas • Formato Plateia',
    desc: 'Configuração em plateia com visão desobstruída do palco e telão. Perfeito para palestras, painéis, conferências e lançamentos.',
    features: [
      'Capacidade de até 70 participantes confortavelmente sentados',
      'Telão e projetor de alta definição com sonorização inclusa',
      'Microfones sem fio e mesa de controle de áudio',
      'Climatização total e iluminação dimerizável',
      'Área anexa para credenciamento e recepção',
    ],
    highlight: false,
  },
  {
    name: 'Mesas · Treinamento',
    image: '/images/coworking/auditorio-mesas.webp',
    badge: 'Até 56 Pessoas • Workshops & Cursos',
    desc: 'Configuração em bancadas com tomadas e espaço confortável para notebooks. O formato ideal para workshops práticos e cursos.',
    features: [
      'Bancadas e mesas para até 56 pessoas com notebooks',
      'Pontos de energia acessíveis em todas as posições',
      'Wi-Fi corporativo ultrarrápido redundante',
      'Projeção de slides, vídeos ou demonstrações ao vivo',
      'Apoio completo para coffee break e intervalos',
    ],
    highlight: true,
  },
  {
    name: 'Formato Híbrido & Evento Premium',
    image: '/images/coworking/lounge-convivencia.webp',
    badge: 'Até 64 Pessoas • Conteúdo & Dinâmica',
    desc: 'Mesas centrais com cadeiras para dinâmicas em grupo, ou produção customizada com apoio técnico sob medida.',
    features: [
      'Layout versátil combinando mesas de apoio e plateia',
      'Opções de locação por hora, 4h, diária de 8h ou pacotes',
      'Estrutura com cafeteria e Honest Market 24/7',
      'Suporte técnico e montagem prévia garantida',
      'Orçamento complementar para buffet, operador e gravação',
    ],
    highlight: false,
  },
];

const faqs = [
  {
    q: 'Qual a capacidade máxima do auditório?',
    a: 'No formato plateia/palestra acomodamos confortavelmente até 70 pessoas sentadas. No formato com mesas para workshops e treinamentos práticos, a capacidade recomendada é de até 56 pessoas, e no formato híbrido até 64 pessoas.',
  },
  {
    q: 'Os equipamentos de som e projeção já estão inclusos?',
    a: 'Sim! A locação inclui projetor profissional, telão de alta definição, sistema de sonorização, microfones sem fio, climatização e Wi-Fi de alta velocidade.',
  },
  {
    q: 'Podemos levar nosso próprio buffet ou coffee break?',
    a: 'Sim! Temos uma área anexa e estrutura de apoio para que sua empresa traga o coffee break de sua preferência, além da nossa cafeteria e mercadinho autônomo (Honest Market) no local.',
  },
  {
    q: 'Quais os períodos disponíveis para locação?',
    a: 'Você pode locar por hora avulsa, período de 4 horas (manhã ou tarde), diária completa de 8 horas ou pacotes especiais de 20 horas para programações recorrentes.',
  },
  {
    q: 'Como é feita a reserva de datas?',
    a: 'Para garantir a data do seu evento, basta entrar em contato pelo WhatsApp para verificar a disponibilidade na agenda do espaço ou solicitar uma proposta por formulário.',
  },
];

export default function AuditoriumLandingPage() {
  useLenis();
  const [spaceType, setSpaceType] = useState('Auditório');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  const nextPhoto = () => setSelectedPhoto((prev) => (prev + 1) % galleryImages.length);
  const prevPhoto = () => setSelectedPhoto((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));

  const whatsappMsg = encodeURIComponent(
    'Olá! Vi o anúncio no Google e gostaria de consultar datas e orçamento para o Auditório do Vila Tech Hub em Itu.'
  );
  const whatsappUrl = `https://wa.me/5511997321522?text=${whatsappMsg}`;

  const scrollToQuote = () => {
    document.getElementById('cotacao')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-void-black text-white min-h-screen pb-16 md:pb-0">
      <SEO
        title="Auditório para Eventos e Workshops em Itu | Até 70 Pessoas | Vila Tech Hub"
        description="Alugue auditório moderno para palestras, workshops e eventos corporativos em Itu. Capacidade para 70 pessoas, projetor, som e área para coffee break. Consulte datas!"
        image="https://www.vilatechub.com.br/images/coworking/auditorio-plateia.webp"
        url="https://www.vilatechub.com.br/coworking/auditorio"
      />

      <TopNavigation variant="coworking" />

      {/* ── HERO SECTION ──────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-[#e83a79]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6">
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e83a79]/15 border border-[#e83a79]/30 text-[#e83a79] text-xs font-syne font-bold uppercase tracking-widest">
                  <Sparkles size={14} /> Auditório para Eventos em Itu
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-sans">
                  <MapPin size={13} className="text-[#e83a79]" /> Itu Novo Centro
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-syne font-extrabold text-white leading-[1.1] mb-6">
                O espaço ideal para seus <span className="text-[#e83a79]">eventos corporativos e workshops</span>.
              </h1>

              <p className="text-lg md:text-xl text-gray-300 font-sans font-light leading-relaxed mb-8 max-w-xl">
                Capacidade modular para até <strong>70 pessoas</strong> no Itu Novo Centro. Telão, projetor de alta definição, sonorização profissional e área integrada para coffee break.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3.5 mb-8">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick({ location: 'auditorium_hero' })}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#25D366] text-black font-syne font-bold text-base hover:bg-[#20ba59] transition-all duration-300 shadow-lg shadow-[#25D366]/20 hover:scale-105"
                >
                  <MessageCircle size={22} className="text-black" />
                  Consultar Datas no WhatsApp
                </a>

                <button
                  type="button"
                  onClick={scrollToQuote}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#e83a79] hover:bg-[#d02c6b] text-white font-syne font-bold text-base shadow-lg shadow-[#e83a79]/25 transition-all duration-300 hover:scale-105"
                >
                  <FileText size={19} />
                  Solicitar Cotação
                </button>

                <button
                  type="button"
                  onClick={() => document.getElementById('formatos')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center gap-1.5 px-6 py-4 rounded-full border border-white/20 bg-white/5 text-white/90 font-syne font-semibold hover:bg-white/10 hover:text-white transition-colors"
                >
                  Ver Formatos ↓
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-xs text-gray-400 font-sans">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-[#25D366]" /> Até 70 pessoas
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-[#25D366]" /> Projetor e som inclusos
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-[#25D366]" /> Climatização total
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
              <div className="grid grid-cols-4 gap-2.5 mt-3">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedPhoto(idx)}
                    aria-label={`Ver foto ${idx + 1}`}
                    className={`rounded-xl overflow-hidden aspect-[16/10] border transition-all ${
                      selectedPhoto === idx
                        ? 'border-[#e83a79] scale-105 shadow-md shadow-[#e83a79]/30'
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

      {/* ── FEATURES ──────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 max-w-7xl mx-auto md:px-12 border-b border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-syne font-bold uppercase tracking-[0.25em] text-[#e83a79]">
            INFRAESTRUTURA DE PONTA
          </span>
          <h2 className="text-3xl md:text-4xl font-syne font-bold text-white mt-3 mb-4">
            Projetado para encantar seu público e garantir o foco
          </h2>
          <p className="text-gray-400 font-sans text-base">
            Do primeiro participante que chega até o coffee break de encerramento, cada detalhe foi pensado para eventos corporativos marcantes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-[#e83a79]/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[#e83a79]/10 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-syne font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm font-sans leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONFIGURAÇÕES / FORMATOS ────────────────────────────────────────── */}
      <section id="formatos" className="py-20 px-6 max-w-7xl mx-auto md:px-12 border-b border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-syne font-bold uppercase tracking-[0.25em] text-[#e83a79]">
            CONFIGURAÇÕES DE ESPAÇO
          </span>
          <h2 className="text-3xl md:text-4xl font-syne font-bold text-white mt-3 mb-4">
            Qual layout você precisa para o seu evento?
          </h2>
          <p className="text-gray-400 font-sans text-base">
            Configurações homologadas para palestras, workshops com bancadas ou eventos corporativos integrados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {configurations.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 group ${
                plan.highlight
                  ? 'bg-gradient-to-b from-[#e83a79]/15 via-white/[0.04] to-zinc-950/80 border-2 border-[#e83a79] shadow-2xl shadow-[#e83a79]/10 relative'
                  : 'bg-white/[0.03] border border-white/10 hover:border-white/20'
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-3 right-3 z-10 px-3.5 py-1 rounded-full bg-[#e83a79] text-white text-[11px] font-syne font-bold uppercase tracking-wider shadow-lg">
                  Recomendado
                </div>
              )}

              {/* Foto do Formato */}
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
                        <CheckCircle2 size={16} className="text-[#e83a79] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Botão Único de Cotação */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSpaceType(`Auditório (${plan.name})`);
                      scrollToQuote();
                    }}
                    className={`w-full py-3.5 px-4 rounded-full font-syne font-bold text-xs uppercase tracking-wider text-center transition-all hover:scale-[1.02] flex items-center justify-center gap-2 ${
                      plan.highlight
                        ? 'bg-[#e83a79] text-white hover:bg-[#d02c6b] shadow-lg shadow-[#e83a79]/25'
                        : 'border border-white/20 bg-white/5 hover:bg-white hover:text-black text-white'
                    }`}
                  >
                    <FileText size={16} />
                    Solicitar Cotação deste Formato
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botão Longo de Atendimento WhatsApp */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-zinc-900/90 to-zinc-900 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-[#25D366]/15 flex items-center justify-center shrink-0 border border-[#25D366]/30">
              <MessageCircle size={28} className="text-[#25D366]" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-syne font-bold text-white mb-1">
                Deseja consultar datas disponíveis na agenda do auditório?
              </h4>
              <p className="text-sm text-gray-400 font-sans leading-relaxed">
                Fale com nossa equipe pelo WhatsApp para checar o calendário de eventos e garantir sua reserva.
              </p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick({ location: 'auditorium_plans_long_button' })}
            className="w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#25D366] text-black font-syne font-bold text-sm uppercase tracking-wider hover:bg-[#20ba59] transition-all duration-300 shadow-xl shadow-[#25D366]/20 hover:scale-105"
          >
            <MessageCircle size={19} className="text-black" />
            Consultar Agenda no WhatsApp
          </a>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 max-w-4xl mx-auto md:px-12 border-b border-white/5">
        <div className="text-center mb-12">
          <span className="text-xs font-syne font-bold uppercase tracking-[0.25em] text-[#e83a79]">
            DÚVIDAS FREQUENTES
          </span>
          <h2 className="text-3xl md:text-4xl font-syne font-bold text-white mt-3">
            Tudo o que você precisa saber sobre a locação
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
                className="w-full px-6 py-5 flex items-center justify-between text-left font-syne font-bold text-white hover:text-[#e83a79] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={`transition-transform duration-300 text-gray-400 ${openFaq === idx ? 'rotate-180 text-[#e83a79]' : ''}`}
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

      {/* ── FORM SECTION ──────────────────────────────────────────────────────── */}
      <div id="cotacao">
        <CoworkingQuoteForm spaceType={spaceType} onSpaceTypeChange={setSpaceType} />
      </div>

      <Footer />

      {/* Sticky Mobile Conversion Bar */}
      <CoworkingStickyMobileCta
        whatsappUrl={whatsappUrl}
        whatsappLocation="auditorium_mobile_sticky"
        onQuoteClick={scrollToQuote}
        quoteLabel="Solicitar Cotação"
        accentColor="#e83a79"
      />
    </div>
  );
}
