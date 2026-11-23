import { useState } from 'react';
import { Tv, Wifi, Coffee, VolumeX, Clock, MessageCircle, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, MapPin, Sparkles, FileText, Users } from 'lucide-react';
import useLenis from '../../hooks/useLenis';
import TopNavigation from '../../components/TopNavigation';
import Footer from '../../sections/Footer';
import SEO from '../../components/SEO';
import CoworkingQuoteForm from '../../sections/coworking-page/CoworkingQuoteForm';
import CoworkingStickyMobileCta from '../../components/coworking/CoworkingStickyMobileCta';
import { trackWhatsAppClick } from '../../lib/whatsappAnalytics';

const galleryImages = [
  { src: '/images/coworking/reuniao-executiva-1.webp', label: 'Sala de Reunião com TV e Apresentação' },
  { src: '/images/coworking/reuniao-executiva-2.webp', label: 'Sala Privativa para até 4 Pessoas' },
  { src: '/images/coworking/reuniao-mesa-grande.webp', label: 'Mesa de Reunião Executiva Ampla' },
  { src: '/images/coworking/sala1_Vista2.webp', label: 'Ambiente com Isolamento Acústico' },
];

const features = [
  {
    icon: <Tv className="w-6 h-6 text-[#ef7d00]" />,
    title: 'Smart TV & Apresentação',
    desc: 'Telas de alta definição prontas para espelhamento sem fio e videoconferências nítidas.',
  },
  {
    icon: <VolumeX className="w-6 h-6 text-[#ef7d00]" />,
    title: 'Privacidade & Acústica',
    desc: 'Salas fechadas com isolamento acústico para tratar de assuntos confidenciais com tranquilidade.',
  },
  {
    icon: <Wifi className="w-6 h-6 text-[#ef7d00]" />,
    title: 'Internet Dedicada',
    desc: 'Link de alta velocidade e Wi-Fi redundante para chamadas online e uploads sem interrupção.',
  },
  {
    icon: <Coffee className="w-6 h-6 text-[#ef7d00]" />,
    title: 'Café & Recepção Inclusos',
    desc: 'Recepção profissional para acolher seus convidados e café especial à vontade.',
  },
  {
    icon: <Clock className="w-6 h-6 text-[#ef7d00]" />,
    title: 'Blocos Flexíveis de Reserva',
    desc: 'Reserve por hora avulsa, período de 4 horas, diária completa de 8 horas ou franquia mensal.',
  },
  {
    icon: <Users className="w-6 h-6 text-[#ef7d00]" />,
    title: 'Salas de 2 a 8 Pessoas',
    desc: 'Capacidades sob medida para entrevistas individuais, reuniões estratégicas ou encontros de diretoria.',
  },
];

const plans = [
  {
    name: 'Locação por Hora',
    image: '/images/coworking/reuniao-executiva-1.webp',
    badge: 'Mais Flexível • Sem Mensalidade',
    desc: 'Ideal para alinhamentos rápidos, entrevistas ou reuniões pontuais com clientes.',
    features: [
      'Reserva mínima a partir de 1 hora',
      'Salas para 2, 4, 6 e até 8 pessoas',
      'Smart TV e Wi-Fi de alta velocidade inclusos',
      'Café especial e água cortesia para participantes',
      'Recepção corporativa para acolher seus clientes',
    ],
    highlight: false,
  },
  {
    name: 'Meio Período ou Diária (4h ou 8h)',
    image: '/images/coworking/reuniao-executiva-2.webp',
    badge: 'Mais Popular • Melhor Custo/Hora',
    desc: 'Blocos contínuos de 4 horas (manhã ou tarde) ou diária completa de 8 horas para imersões e planejamentos.',
    features: [
      'Bloco de 4 horas ou Diária de 8 horas contínuas',
      'Tarifa proporcional mais econômica por hora',
      'Ideal para dinâmicas de equipe, treinamentos e fechamentos',
      'Café especial à vontade durante todo o período',
      'Estrutura com copa e Honest Market no local',
    ],
    highlight: true,
  },
  {
    name: 'Franquia Mensal (40h/mês)',
    image: '/images/coworking/reuniao-mesa-grande.webp',
    badge: 'Solução Corporativa Recorrente',
    desc: 'Franquia de 40 horas mensais para empresas e consultores que recebem clientes toda semana com economia de até 20%.',
    features: [
      '40 horas por mês para agendar conforme demanda',
      'Economia progressiva em planos de 3, 6 ou 12 meses',
      'Prioridade de agendamento na grade de horários',
      'Endereço empresarial nobre para a sua marca',
      'Contratos flexíveis sem fiador ou burocracia',
    ],
    highlight: false,
  },
];

const faqs = [
  {
    q: 'Como funciona a reserva da sala de reunião?',
    a: 'Você pode consultar a disponibilidade e reservar diretamente pelo WhatsApp em poucos minutos, ou solicitar uma proposta por formulário. Basta nos informar a data, o horário e a quantidade de pessoas.',
  },
  {
    q: 'Quantas pessoas cabem nas salas de reunião?',
    a: 'Temos opções de salas que acomodam confortavelmente até 2 pessoas (1 a 1 ou chamadas), 4 pessoas, 6 pessoas e até 8 pessoas em mesas executivas amplas.',
  },
  {
    q: 'O que está incluso no valor da locação?',
    a: 'Está incluso o uso exclusivo da sala privativa com climatização, Smart TV para projeção, internet dedicada redundante, água, café especial à disposição e nossa recepção profissional para receber seus convidados.',
  },
  {
    q: 'Preciso ser mensalista do coworking para alugar uma sala?',
    a: 'Não! Nossas salas de reunião estão disponíveis tanto para membros do hub quanto para empresas e profissionais autônomos externos que precisam de um espaço corporativo em Itu.',
  },
  {
    q: 'É possível contratar coffee break para reuniões mais longas?',
    a: 'Sim! Além do café cortesia e da nossa cafeteria/Honest Market no local, podemos orçar coffee breaks personalizados para o intervalo da sua reunião ou dinâmica.',
  },
];

export default function MeetingRoomsLandingPage() {
  useLenis();
  const [spaceType, setSpaceType] = useState('Sala de Reunião');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  const nextPhoto = () => setSelectedPhoto((prev) => (prev + 1) % galleryImages.length);
  const prevPhoto = () => setSelectedPhoto((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));

  const whatsappMsg = encodeURIComponent(
    'Olá! Vi o anúncio no Google e gostaria de consultar a disponibilidade e valores para Sala de Reunião no Vila Tech Hub em Itu.'
  );
  const whatsappUrl = `https://wa.me/5511997321522?text=${whatsappMsg}`;

  const scrollToQuote = () => {
    document.getElementById('cotacao')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-void-black text-white min-h-screen pb-16 md:pb-0">
      <SEO
        title="Salas de Reunião em Itu | Locação por Hora e Período | Vila Tech Hub"
        description="Alugue salas de reunião modernas e privativas no Itu Novo Centro. Smart TV, ar-condicionado, Wi-Fi dedicado e café. Reserve por hora ou período no WhatsApp."
        image="https://www.vilatechub.com.br/images/coworking/reuniao-executiva-1.webp"
        url="https://www.vilatechub.com.br/coworking/salas-de-reuniao"
      />

      <TopNavigation variant="coworking" />

      {/* ── HERO SECTION ──────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-[#ef7d00]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6">
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ef7d00]/15 border border-[#ef7d00]/30 text-[#ef7d00] text-xs font-syne font-bold uppercase tracking-widest">
                  <Sparkles size={14} /> Salas de Reunião em Itu
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-sans">
                  <MapPin size={13} className="text-[#ef7d00]" /> Itu Novo Centro
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-syne font-extrabold text-white leading-[1.1] mb-6">
                Impressione seus clientes com uma sala de reunião <span className="text-[#ef7d00]">moderna e privativa</span>.
              </h1>

              <p className="text-lg md:text-xl text-gray-300 font-sans font-light leading-relaxed mb-8 max-w-xl">
                Espaços climatizados com Smart TV, isolamento acústico e café especial no <strong>Itu Novo Centro</strong>. Locação rápida por hora, período de 4h, diária ou franquia de 40h/mês.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3.5 mb-8">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick({ location: 'meeting_rooms_hero' })}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#25D366] text-black font-syne font-bold text-base hover:bg-[#20ba59] transition-all duration-300 shadow-lg shadow-[#25D366]/20 hover:scale-105"
                >
                  <MessageCircle size={22} className="text-black" />
                  Consultar Disponibilidade no WhatsApp
                </a>

                <button
                  type="button"
                  onClick={scrollToQuote}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#ef7d00] hover:bg-[#d87000] text-white font-syne font-bold text-base shadow-lg shadow-[#ef7d00]/25 transition-all duration-300 hover:scale-105"
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
                  <CheckCircle2 size={16} className="text-[#25D366]" /> De 2 a 8 pessoas
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-[#25D366]" /> Sem fiador ou burocracia
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
              <div className="grid grid-cols-4 gap-2.5 mt-3">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedPhoto(idx)}
                    aria-label={`Ver foto ${idx + 1}`}
                    className={`rounded-xl overflow-hidden aspect-[16/10] border transition-all ${
                      selectedPhoto === idx
                        ? 'border-[#ef7d00] scale-105 shadow-md shadow-[#ef7d00]/30'
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

      {/* ── FEATURES / WHAT'S INCLUDED ────────────────────────────────────────── */}
      <section className="py-20 px-6 max-w-7xl mx-auto md:px-12 border-b border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-syne font-bold uppercase tracking-[0.25em] text-[#ef7d00]">
            ESTRUTURA COMPLETA
          </span>
          <h2 className="text-3xl md:text-4xl font-syne font-bold text-white mt-3 mb-4">
            Tudo o que sua reunião precisa para ser um sucesso
          </h2>
          <p className="text-gray-400 font-sans text-base">
            Esqueça reuniões com barulho de cafeteria ou conexões instáveis. Proporcione uma experiência corporativa impecável para sua equipe e clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-[#ef7d00]/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[#ef7d00]/10 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-syne font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm font-sans leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MODALITIES / PLANS ────────────────────────────────────────────────── */}
      <section id="formatos" className="py-20 px-6 max-w-7xl mx-auto md:px-12 border-b border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-syne font-bold uppercase tracking-[0.25em] text-[#ef7d00]">
            FORMATOS DE RESERVA
          </span>
          <h2 className="text-3xl md:text-4xl font-syne font-bold text-white mt-3 mb-4">
            Escolha o período ideal para sua necessidade
          </h2>
          <p className="text-gray-400 font-sans text-base">
            De reservas por hora para reuniões pontuais a franquias mensais com desconto progressivo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 group ${
                plan.highlight
                  ? 'bg-gradient-to-b from-[#ef7d00]/15 via-white/[0.04] to-zinc-950/80 border-2 border-[#ef7d00] shadow-2xl shadow-[#ef7d00]/10 relative'
                  : 'bg-white/[0.03] border border-white/10 hover:border-white/20'
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-3 right-3 z-10 px-3.5 py-1 rounded-full bg-[#ef7d00] text-white text-[11px] font-syne font-bold uppercase tracking-wider shadow-lg">
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
                        <CheckCircle2 size={16} className="text-[#ef7d00] shrink-0 mt-0.5" />
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
                      setSpaceType(`Sala de Reunião (${plan.name})`);
                      scrollToQuote();
                    }}
                    className={`w-full py-3.5 px-4 rounded-full font-syne font-bold text-xs uppercase tracking-wider text-center transition-all hover:scale-[1.02] flex items-center justify-center gap-2 ${
                      plan.highlight
                        ? 'bg-[#ef7d00] text-white hover:bg-[#d87000] shadow-lg shadow-[#ef7d00]/25'
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
                Precisa checar horários e datas com urgência?
              </h4>
              <p className="text-sm text-gray-400 font-sans leading-relaxed">
                Fale com nossa equipe no WhatsApp para verificar disponibilidade imediata e agendar sua sala.
              </p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick({ location: 'meeting_rooms_plans_long_button' })}
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
          <span className="text-xs font-syne font-bold uppercase tracking-[0.25em] text-[#ef7d00]">
            TIRA-DÚVIDAS
          </span>
          <h2 className="text-3xl md:text-4xl font-syne font-bold text-white mt-3">
            Perguntas Frequentes sobre as Salas
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
                className="w-full px-6 py-5 flex items-center justify-between text-left font-syne font-bold text-white hover:text-[#ef7d00] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={`transition-transform duration-300 text-gray-400 ${openFaq === idx ? 'rotate-180 text-[#ef7d00]' : ''}`}
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
        whatsappLocation="meeting_rooms_mobile_sticky"
        onQuoteClick={scrollToQuote}
        quoteLabel="Solicitar Cotação"
        accentColor="#ef7d00"
      />
    </div>
  );
}
