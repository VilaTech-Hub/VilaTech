import { useState } from 'react';
import { Building2, ShieldCheck, Mail, MessageCircle, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, DollarSign, Clock, FileText, Briefcase, MapPin } from 'lucide-react';
import useLenis from '../../hooks/useLenis';
import TopNavigation from '../../components/TopNavigation';
import Footer from '../../sections/Footer';
import SEO from '../../components/SEO';
import CoworkingQuoteForm from '../../sections/coworking-page/CoworkingQuoteForm';
import CoworkingStickyMobileCta from '../../components/coworking/CoworkingStickyMobileCta';
import { trackWhatsAppClick } from '../../lib/whatsappAnalytics';

const galleryImages = [
  { src: '/images/coworking/recepcao-principal.webp', label: 'Recepção Corporativa e Atendimento Profissional' },
  { src: '/images/coworking/fachada-limpa.webp', label: 'Fachada Moderna no Itu Novo Centro' },
  { src: '/images/coworking/fachada-angulo.webp', label: 'Arquitetura Contemporânea e Fácil Acesso' },
  { src: '/images/coworking/estacoes-geral.webp', label: 'Espaço Completo para Receber Clientes e Parceiros' },
];

const benefits = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#378ADD]" />,
    title: 'Registro Fiscal 100% Regularizado',
    desc: 'Totalmente aceito perante a Receita Federal, JUCESP e Prefeitura de Itu para emissão de CNPJ, alvará e notas fiscais.',
  },
  {
    icon: <Building2 className="w-6 h-6 text-[#378ADD]" />,
    title: 'Endereço Comercial de Prestígio',
    desc: 'Divulgue um endereço de alto padrão no Itu Novo Centro no seu site, redes sociais, cartões e propostas comerciais.',
  },
  {
    icon: <Mail className="w-6 h-6 text-[#378ADD]" />,
    title: 'Gestão Ágil de Correspondências',
    desc: 'Recebimento seguro de notificações e encomendas com aviso imediato por WhatsApp ou e-mail para você não perder prazos.',
  },
  {
    icon: <DollarSign className="w-6 h-6 text-[#378ADD]" />,
    title: 'Redução Drástica de Custos Fixos',
    desc: 'Economize até 85% em relação ao aluguel de um imóvel próprio. Sem IPTU, condomínio, fiador ou contas de consumo.',
  },
  {
    icon: <Briefcase className="w-6 h-6 text-[#378ADD]" />,
    title: 'Privacidade Total para sua Residência',
    desc: 'Evite expor o endereço da sua casa na internet pública ou nas consultas de CNPJ da Receita Federal.',
  },
  {
    icon: <Clock className="w-6 h-6 text-[#378ADD]" />,
    title: 'Desconto em Salas de Reunião',
    desc: 'Desconto especial para alugar salas executivas ou auditório sempre que precisar de uma reunião presencial.',
  },
];

const plans = [
  {
    name: 'Endereço Básico',
    image: '/images/coworking/recepcao-principal.webp',
    badge: 'Domicílio Fiscal para CNPJ',
    desc: 'A solução essencial para abrir ou transferir seu CNPJ com total conformidade contábil e jurídica em Itu.',
    features: [
      'Endereço fiscal aceito na Receita Federal, JUCESP e Prefeitura',
      'Emissão legal de notas fiscais e alvará de funcionamento',
      'Recebimento e guarda de correspondências (até 5 volumes)',
      'Sem IPTU, fiador, caução ou contas de consumo',
      'Desconto especial na locação avulsa de salas de reunião',
    ],
    highlight: false,
  },
  {
    name: 'Escritório Virtual',
    image: '/images/coworking/fachada-limpa.webp',
    badge: 'Mais Escolhido • Fiscal & Comercial',
    desc: 'Endereço fiscal para registro legal + endereço comercial de prestígio no Itu Novo Centro para divulgar em seu site e propostas.',
    features: [
      'Endereço fiscal para CNPJ + Endereço comercial de prestígio',
      'Recebimento e gestão de correspondências ilimitado',
      'Notificação digital em tempo real da chegada de documentos',
      'Divulgação permitida em site, Google Meu Negócio e cartões',
      'Condições e descontos exclusivos em salas de reunião',
    ],
    highlight: true,
  },
  {
    name: 'Virtual Premium',
    image: '/images/coworking/fachada-angulo.webp',
    badge: 'Mais Completo • Benefício Coworking',
    desc: 'A solução corporativa completa com atendimento personalizado e diárias de coworking inclusas todo mês.',
    features: [
      'Endereço fiscal e comercial completo no Itu Novo Centro',
      'Recebimento e gestão ilimitada de correspondências',
      'Atendimento telefônico personalizado para sua empresa',
      'Acesso de 1 dia/mês nas estações de coworking incluso',
      'Descontos VIP na locação de salas executivas e auditório',
    ],
    highlight: false,
  },
];

const steps = [
  {
    step: '01',
    title: 'Solicite sua Proposta',
    desc: 'Fale conosco pelo WhatsApp ou formulário e receba a documentação em minutos.',
  },
  {
    step: '02',
    title: 'Assine Digitalmente',
    desc: 'Contrato 100% digital, sem burocracia, fiador ou necessidade de reconhecer firma.',
  },
  {
    step: '03',
    title: 'Ative seu CNPJ',
    desc: 'Envie o contrato para o seu contador registrar na JUCESP e Prefeitura de Itu e comece a faturar.',
  },
];

const faqs = [
  {
    q: 'O que é Endereço Fiscal e para quem serve?',
    a: 'O endereço fiscal é o domicílio tributário da sua empresa registrado perante os órgãos oficiais (Receita Federal, Junta Comercial e Prefeitura). É ideal para prestadores de serviços, consultores, desenvolvedores, corretores, advogados, e-commerces (sem estoque físico local) e empresas que trabalham remotamente ou não necessitam de um ponto comercial físico aberto ao público.',
  },
  {
    q: 'Qual a diferença entre Endereço Fiscal e Endereço Comercial?',
    a: 'O Endereço Fiscal é voltado para os registros formais, tributários e legais do CNPJ. Já o Endereço Comercial é o endereço divulgado publicamente para clientes, no cartão de visitas, site e propostas corporativas. No Vila Tech Hub você tem ambos em uma localização nobre de Itu.',
  },
  {
    q: 'Como funciona o recebimento e notificação de correspondências?',
    a: 'Nossa equipe de recepção recebe suas encomendas, cartas e notificações judiciais/fiscais em horário comercial, cadastra a chegada e envia uma notificação imediata via WhatsApp e e-mail. Você pode retirar quando quiser ou solicitar digitalização emergencial.',
  },
  {
    q: 'Preciso de fiador ou caução para contratar?',
    a: 'Não! A contratação do endereço fiscal no Vila Tech Hub é 100% desburocratizada, sem fiador, sem depósito caução e com assinatura digital rápida.',
  },
  {
    q: 'Posso utilizar salas de reunião para atender clientes?',
    a: 'Com certeza! Clientes do plano de endereço fiscal têm condições e descontos exclusivos para reservar salas de reunião executivas equipadas com TV, internet rápida e café cortesia quando precisarem de encontros presenciais.',
  },
];

export default function FiscalAddressLandingPage() {
  useLenis();
  const [spaceType, setSpaceType] = useState('Endereço Fiscal');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  const nextPhoto = () => setSelectedPhoto((prev) => (prev + 1) % galleryImages.length);
  const prevPhoto = () => setSelectedPhoto((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));

  const whatsappMsg = encodeURIComponent(
    'Olá! Vi o anúncio no Google e gostaria de informações para contratar o Endereço Fiscal no Vila Tech Hub em Itu.'
  );
  const whatsappUrl = `https://wa.me/5511997321522?text=${whatsappMsg}`;

  const scrollToQuote = () => {
    document.getElementById('cotacao')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-void-black text-white min-h-screen pb-16 md:pb-0">
      <SEO
        title="Endereço Fiscal e Comercial em Itu | Vila Tech Hub"
        description="Abra ou transfira seu CNPJ para o melhor endereço comercial de Itu. Gestão de correspondências, redução de custos e conformidade contábil no Vila Tech Hub."
        url="https://www.vilatechub.com.br/coworking/endereco-fiscal"
      />

      <TopNavigation variant="coworking" />

      {/* ── HERO SECTION ──────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-[#378ADD]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6">
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#378ADD]/15 border border-[#378ADD]/30 text-[#378ADD] text-xs font-syne font-bold uppercase tracking-widest">
                  <Building2 size={14} /> Endereço Fiscal & Comercial em Itu
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-sans">
                  <MapPin size={13} className="text-[#378ADD]" /> Itu Novo Centro
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-syne font-extrabold text-white leading-[1.1] mb-6">
                Seu CNPJ no melhor endereço empresarial de <span className="text-[#378ADD]">Itu</span>.
              </h1>

              <p className="text-lg md:text-xl text-gray-300 font-sans font-light leading-relaxed mb-8 max-w-xl">
                Abra sua empresa ou transfira sua sede com endereço fiscal de prestígio no <strong>Itu Novo Centro</strong>. Gestão segura de correspondências, redução de até 85% em custos fixos e aprovação contábil ágil.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3.5 mb-8">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick({ location: 'fiscal_address_hero' })}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#25D366] text-black font-syne font-bold text-base hover:bg-[#20ba59] transition-all duration-300 shadow-lg shadow-[#25D366]/20 hover:scale-105"
                >
                  <MessageCircle size={22} className="text-black" />
                  Contratar via WhatsApp
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
                  <CheckCircle2 size={16} className="text-[#25D366]" /> Ativação rápida em 24h
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-[#25D366]" /> Sem fiador ou caução
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-[#25D366]" /> Aviso de cartas no WhatsApp
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

      {/* ── BENEFITS GRID ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 max-w-7xl mx-auto md:px-12 border-b border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-syne font-bold uppercase tracking-[0.25em] text-[#378ADD]">
            VANTAGENS EXCLUSIVAS
          </span>
          <h2 className="text-3xl md:text-4xl font-syne font-bold text-white mt-3 mb-4">
            Por que contratar o Endereço Fiscal no Vila Tech Hub?
          </h2>
          <p className="text-gray-400 font-sans text-base">
            Tudo o que sua empresa precisa para se formalizar e transmitir credibilidade de alto padrão sem os custos de um escritório físico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-[#378ADD]/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[#378ADD]/10 flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-syne font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-400 text-sm font-sans leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS: 3 STEPS ─────────────────────────────────────────────── */}
      <section className="py-20 px-6 max-w-7xl mx-auto md:px-12 border-b border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-syne font-bold uppercase tracking-[0.25em] text-[#378ADD]">
            PASSO A PASSO
          </span>
          <h2 className="text-3xl md:text-4xl font-syne font-bold text-white mt-3 mb-4">
            Como funciona em 3 passos simples
          </h2>
          <p className="text-gray-400 font-sans text-base">
            Processo ágil e descomplicado para você legalizar sua empresa ainda esta semana.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/10 overflow-hidden"
            >
              <span className="text-6xl font-black text-[#378ADD]/20 absolute top-4 right-4 font-syne">
                {st.step}
              </span>
              <div className="relative z-10">
                <h3 className="text-xl font-syne font-bold text-white mb-3">{st.title}</h3>
                <p className="text-sm text-gray-400 font-sans leading-relaxed">{st.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PLANS SECTION (TABELA COMERCIAL 2026) ────────────────────────────── */}
      <section id="planos" className="py-20 px-6 max-w-7xl mx-auto md:px-12 border-b border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-syne font-bold uppercase tracking-[0.25em] text-[#378ADD]">
            PLANOS & MODALIDADES
          </span>
          <h2 className="text-3xl md:text-4xl font-syne font-bold text-white mt-3 mb-4">
            Escolha o plano ideal para sua empresa
          </h2>
          <p className="text-gray-400 font-sans text-base">
            De registro fiscal básico a pacotes completos com benefício de coworking e atendimento personalizado.
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
                  Mais Escolhido
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

                {/* Botão Único de Cotação */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSpaceType(`Endereço Fiscal (${plan.name})`);
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

        {/* Botão Longo de Atendimento WhatsApp */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-zinc-900/90 to-zinc-900 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-[#25D366]/15 flex items-center justify-center shrink-0 border border-[#25D366]/30">
              <MessageCircle size={28} className="text-[#25D366]" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-syne font-bold text-white mb-1">
                Dúvidas sobre abertura ou transferência de CNPJ?
              </h4>
              <p className="text-sm text-gray-400 font-sans leading-relaxed">
                Fale com nossos consultores no WhatsApp e tire todas as suas dúvidas fiscais e contratuais em minutos.
              </p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick({ location: 'fiscal_address_plans_long_button' })}
            className="w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#25D366] text-black font-syne font-bold text-sm uppercase tracking-wider hover:bg-[#20ba59] transition-all duration-300 shadow-xl shadow-[#25D366]/20 hover:scale-105"
          >
            <MessageCircle size={19} className="text-black" />
            Tirar Dúvidas no WhatsApp
          </a>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 max-w-4xl mx-auto md:px-12 border-b border-white/5">
        <div className="text-center mb-12">
          <span className="text-xs font-syne font-bold uppercase tracking-[0.25em] text-[#378ADD]">
            DÚVIDAS FREQUENTES
          </span>
          <h2 className="text-3xl md:text-4xl font-syne font-bold text-white mt-3">
            Perguntas Frequentes sobre Endereço Fiscal
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

      {/* ── FORM SECTION ──────────────────────────────────────────────────────── */}
      <div id="cotacao">
        <CoworkingQuoteForm spaceType={spaceType} onSpaceTypeChange={setSpaceType} />
      </div>

      <Footer />

      {/* Sticky Mobile Conversion Bar */}
      <CoworkingStickyMobileCta
        whatsappUrl={whatsappUrl}
        whatsappLocation="fiscal_address_mobile_sticky"
        onQuoteClick={scrollToQuote}
        quoteLabel="Solicitar Cotação"
        accentColor="#378ADD"
      />
    </div>
  );
}
