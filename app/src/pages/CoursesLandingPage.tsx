import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TopNavigation from '../components/TopNavigation';
import Footer from '../sections/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import useLenis from '../hooks/useLenis';
import SEO from '../components/SEO';
import { ArrowRight, Calendar, Building2, Laptop, Users, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─── DATA ─────────────────────────────────────────────────────────────────────

const PILARES = [
  { id: 'academia-ia', label: 'AcademIA', accent: '#e83a79', iconSrc: '/images/plataforma_educacional/Icone_AcademIA.png', desc: 'IA aplicada a negócios' },
  { id: 'escola-gestao', label: 'Escola de Gestão', accent: '#378ADD', iconSrc: '/images/plataforma_educacional/Icone_escola-de-gestao.png', desc: 'Formação executiva' },
  { id: 'criatividade-games', label: 'Criatividade + Games', accent: '#ef7d00', iconSrc: '/images/plataforma_educacional/icone-criatividade-games-branco-transparente.png', desc: 'Produção criativa' },
];

const ACADEMIA_MODULOS = [
  { num: '01', carga: '8H', titulo: 'IA para Iniciantes', cor: '#e83a79' },
  { num: '02', carga: '8H', titulo: 'IA para Marketing e Vendas', cor: '#378ADD' },
  { num: '03', carga: '8H', titulo: 'IA para Contabilidade e Finanças', cor: '#ef7d00' },
  { num: '04', carga: '8H', titulo: 'IA em Processos Industriais', cor: '#639922' },
  { num: '05', carga: '8H', titulo: 'IA para Advocacia', cor: '#C0392B' },
  { num: '06', carga: '12H', titulo: 'IA Avançada Agêntica', cor: '#e83a79' },
];

const GESTAO_TRILHAS = [
  {
    label: 'Estratégia & Continuidade',
    cor: '#e83a79',
    cursos: ['Planejamento Estratégico', 'Sucessão Empresarial'],
  },
  {
    label: 'Pessoas & Cultura',
    cor: '#378ADD',
    cursos: ['Estratégia Centrada no Humano', 'Os Desafios do RH Moderno'],
  },
  {
    label: 'Governança & Ambiente Regulatório',
    cor: '#e83a79',
    cursos: ['ESG com Governança', 'Legislação Tributária: o Novo Cenário do Brasil'],
  },
  {
    label: 'Mercado & Crescimento',
    cor: '#ef7d00',
    cursos: ['Marketing e Vendas', 'Growth Hacking — Acelerando o Crescimento de Empresas'],
  },
];

const GAMES_CURSOS = [
  { num: '01', titulo: 'Edição de Vídeo com IA', sub: 'DaVinci Resolve', cor: '#e83a79' },
  { num: '02', titulo: 'Animação Avançada', sub: 'After Effects', cor: '#378ADD' },
  { num: '03', titulo: 'Games: do Zero à Play Store', sub: 'Criação e desenvolvimento com Unreal', cor: '#639922' },
  { num: '04', titulo: 'Construção de Projetos Audiovisuais', sub: 'A arquitetura das ideias', cor: '#ef7d00' },
];

const FORMATOS = [
  { icon: Users, label: 'Presencial', desc: 'Imersão no Vila Tech Hub, em Itu/SP' },
  { icon: Laptop, label: 'Online', desc: 'Trilhas síncronas e assíncronas' },
  { icon: Building2, label: 'In Company', desc: 'Treinamento customizado na sua empresa' },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

const CoursesLandingPage = () => {
  useLenis();
  const heroRef = useRef<HTMLElement>(null);
  const pilaresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current?.querySelectorAll('.hero-anim') ?? [],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.18, ease: 'power4.out', delay: 0.2 }
      );

      gsap.fromTo(
        pilaresRef.current?.querySelectorAll('.pilar-card') ?? [],
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: pilaresRef.current, start: 'top 80%' }
        }
      );

      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 82%' }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Vila Tech Educação',
    url: 'https://www.vilatechub.com.br/cursos',
    description: 'Plataforma de cursos ágeis com formação prática em IA, Gestão Executiva e Criatividade. Presencial, online e In Company.',
    address: { '@type': 'PostalAddress', addressLocality: 'Itu', addressRegion: 'SP', addressCountry: 'BR' },
  };

  return (
    <div className="bg-[#0a0a0a] text-[#F5F0FA] min-h-screen font-sans selection:bg-[#e83a79] selection:text-white">
      <SEO
        title="Cursos de IA, Gestão e Criatividade em Itu | Vila Tech Educação"
        description="Formação prática em Inteligência Artificial, Gestão Executiva e Criatividade + Games. Presencial, online e In Company. Vila Tech Hub, Itu/SP."
        image="https://www.vilatechub.com.br/images/plataforma_educacional/ChatGPT%20Image%202%20de%20out.%20de%202026,%2011_03_03.png"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TopNavigation variant="home" />

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image: teclado */}
        <div className="absolute inset-0">
          <img
            src="/images/plataforma_educacional/ChatGPT Image 2 de out. de 2026, 11_03_03.png"
            alt="Teclado tecnológico com iluminação neon"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradients over image — lighter so the image breathes */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </div>
        <div className="relative z-10 max-w-[85rem] mx-auto px-6 md:px-8 pt-32 pb-24 md:pt-44 md:pb-32 w-full">
          <div className="max-w-3xl">
            <div className="hero-anim flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-[#e83a79] mb-8 font-syne">
              <span className="w-8 h-[1px] bg-[#e83a79]" />
              Vila Tech Educação
            </div>

            <h1 className="hero-anim text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-syne leading-[1.1] mb-8">
              Cursos de aplicação prática de <br className="hidden md:block" />
              <span className="bg-[#e83a79] text-white px-2 inline-block -ml-2 mb-2 mt-2">Inteligência Artificial</span><br />
              conduzidos com inteligência humana
            </h1>

            <p className="hero-anim text-base md:text-xl text-gray-300 font-light max-w-xl leading-relaxed mb-10">
              <strong className="text-white font-bold">AcademIA:</strong> Metodologias inovadoras no ensino de IA<br />
              <strong className="text-white font-bold">Gestão Estratégica</strong><br />
              <strong className="text-white font-bold">Games e Audiovisual</strong>
            </p>

            {/* Formatos */}
            <div className="hero-anim flex flex-wrap gap-4 mb-12">
              {FORMATOS.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 bg-black/50 backdrop-blur-sm border border-white/10 px-6 py-4 hover:border-[#e83a79]/50 transition-colors"
                >
                  <Icon className="w-5 h-5 text-[#e83a79] shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-white font-syne uppercase tracking-wider">{label}</div>
                    <div className="text-xs text-gray-400">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="hero-anim flex flex-wrap gap-4">
              <Link
                to="/agenda"
                className="inline-flex items-center gap-2 bg-[#e83a79] hover:bg-[#c42866] text-white font-bold text-sm uppercase tracking-widest px-8 py-4 font-syne transition-all duration-300 hover:shadow-[0_0_30px_rgba(232,58,121,0.4)] hover:-translate-y-0.5"
              >
                Ver Agenda de Eventos
                <Calendar className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 PILARES ───────────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-section mb-14">
            <p className="text-xs text-[#e83a79] font-bold uppercase tracking-[0.3em] font-syne mb-3">Plataforma de Cursos Ágeis</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white font-syne leading-tight">
              Formação prática em <br className="hidden md:block" />
              <span className="text-[#e83a79]">três pilares</span> de atuação.
            </h2>
            <p className="text-gray-400 text-base mt-4 max-w-xl leading-relaxed">
              Trilha de conhecimento e formação personalizada. Programas de treinamento
              guiados por IA, da captação à qualificação.
            </p>
          </div>

          <div ref={pilaresRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILARES.map((p) => {
              return (
                <a
                  key={p.id}
                  href={`#${p.id}`}
                  className="pilar-card group block bg-[#111] border border-white/5 p-8 hover:border-[#e83a79]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60"
                >
                  <img src={p.iconSrc} alt={`Ícone ${p.label}`} className="h-10 w-auto mb-5 transition-transform duration-300 group-hover:scale-110 object-contain" />
                  <div className="w-8 h-[2px] mb-5 group-hover:w-14 transition-all duration-300" style={{ backgroundColor: p.accent }} />
                  <p className="text-[10px] uppercase tracking-[0.25em] font-bold font-syne mb-2" style={{ color: p.accent }}>
                    {p.desc}
                  </p>
                  <h3 className="text-xl md:text-2xl font-extrabold text-white font-syne mb-4 group-hover:text-[#e83a79] transition-colors">
                    {p.label}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500 group-hover:text-[#e83a79] transition-colors font-syne uppercase tracking-widest">
                    Ver módulos <ChevronRight className="w-3 h-3" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ACADEMIA IA ─────────────────────────────────────────────────── */}
      <section id="academia-ia" className="border-t border-white/5 scroll-mt-24 overflow-hidden">
        {/* Split layout: image left, text right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
          {/* Left: image */}
          <div className="relative h-72 lg:h-auto">
            <img
              src="/images/plataforma_educacional/Corporate_1.webp"
              alt="AcademIA — Formação em IA para negócios"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a0a] via-transparent to-transparent" />
          </div>
          {/* Right: text */}
          <div className="bg-[#0a0a0a] py-20 px-6 md:px-12 lg:px-16 flex flex-col justify-center reveal-section">
            <div className="flex items-center gap-3 mb-4">
              <img src="/images/plataforma_educacional/Icone_AcademIA.png" alt="Ícone AcademIA" className="h-8 w-auto object-contain" />
              <p className="text-xs text-[#e83a79] font-bold uppercase tracking-[0.3em] font-syne">Pilar 01 — Formação em ferramentas de IA para negócios</p>
            </div>
            <h2 className="text-5xl md:text-6xl font-syne leading-none mb-4">
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 200, letterSpacing: '0.08em' }} className="text-white/70">Academ</span><span className="font-extrabold text-[#e83a79]">IA</span>
            </h2>
            <p className="text-gray-300 text-base leading-relaxed mb-8">
              Uma plataforma de cursos online e presenciais para formação prática
              com tecnologia de IA. Do conceito ao uso no dia a dia.
            </p>
          </div>
        </div>

        {/* Módulos grid */}
        <div className="bg-[#080808] py-16 px-6 md:px-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="reveal-section mb-10 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold font-syne">
                6 módulos de formação em IA aplicada — Do conceito ao uso prático no dia a dia.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Presencial', 'Online', 'In Company'].map((f) => (
                  <span key={f} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 border border-[#e83a79]/40 text-[#e83a79] font-syne rounded-sm">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="reveal-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ACADEMIA_MODULOS.map((m) => (
                <div key={m.num} className="bg-[#0f0f0f] border border-white/10 rounded-lg p-6 md:p-8 hover:border-[#e83a79]/50 hover:bg-[#151515] transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl font-extrabold font-syne leading-none" style={{ color: m.cor }}>{m.num}</span>
                    <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest font-syne">{m.carga}</span>
                  </div>
                  <div className="w-5 h-[2px] mb-4 group-hover:w-10 transition-all duration-300" style={{ backgroundColor: m.cor }} />
                  <p className="text-xs md:text-sm font-bold text-white font-syne uppercase tracking-wide leading-snug">{m.titulo}</p>
                </div>
              ))}
            </div>

            {/* Gestão de IA card */}
            <div className="reveal-section mt-6 relative overflow-hidden border border-[#e83a79]/30 rounded-lg p-8 md:p-10 hover:border-[#e83a79] transition-colors group">
              <div className="absolute inset-0">
                <img src="/images/plataforma_educacional/man-is-working-laptop-cafe.jpg" alt="Gestão de IA Corporativa" className="w-full h-full object-cover object-[center_57%] group-hover:scale-105 transition-transform duration-700 opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/90 to-transparent" />
              </div>
              <div className="relative z-10">
                <p className="text-[10px] text-[#e83a79] uppercase tracking-[0.25em] font-bold font-syne mb-2">Aplicando IA na sua organização</p>
                <h4 className="text-2xl md:text-3xl font-extrabold text-white font-syne mb-3">Gestão de IA Corporativa</h4>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl">
                  Planejamento estratégico, alinhamento de agentes e otimização de recursos
                  para transformar capacitação em aplicação real no negócio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ESCOLA DE GESTÃO ────────────────────────────────────────────── */}
      <section id="escola-gestao" className="border-t border-white/5 scroll-mt-24 overflow-hidden">
        {/* Split layout: image right, text left */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
          {/* Left: text */}
          <div className="bg-[#0a0a0a] py-20 px-6 md:px-12 lg:px-16 flex flex-col justify-center reveal-section order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/images/plataforma_educacional/Icone_escola-de-gestao.png" alt="Ícone Escola de Gestão" className="h-8 w-auto object-contain" />
              <p className="text-xs text-[#378ADD] font-bold uppercase tracking-[0.3em] font-syne">Pilar 02 — Formação Executiva</p>
            </div>
            <h2 className="text-5xl md:text-6xl font-syne leading-none mb-4">
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 200, letterSpacing: '0.08em' }} className="text-white/70">Escola de </span><span className="font-extrabold text-[#378ADD]">Gestão</span>
            </h2>
            <p className="text-gray-300 text-base leading-relaxed mb-2">
              Conhecimento para decidir, liderar e acelerar negócios.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Cursos orientados aos desafios reais da gestão, das pessoas, da governança e do crescimento empresarial.
            </p>
            <p className="text-sm text-gray-400 italic">
              Formação presencial, online e In Company.
            </p>
          </div>
          {/* Right: image */}
          <div className="relative h-72 lg:h-auto order-1 lg:order-2">
            <img
              src="/images/plataforma_educacional/grisalho2.webp"
              alt="Escola de Gestão — Formação executiva"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent lg:bg-gradient-to-l" />
          </div>
        </div>

        {/* 4 trilhas */}
        <div className="bg-[#080808] py-16 px-6 md:px-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <p className="reveal-section text-sm text-gray-400 font-semibold mb-10">
              Formação integrada para pessoas e empresas em transformação.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {GESTAO_TRILHAS.map((t) => (
                <div key={t.label} className="reveal-section bg-[#0f0f0f] border border-white/10 rounded-lg p-8 hover:border-white/20 transition-colors">
                  <div className="w-8 h-[3px] mb-5" style={{ backgroundColor: t.cor }} />
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] font-syne mb-5" style={{ color: t.cor }}>
                    {t.label}
                  </p>
                  <div className="space-y-4">
                    {t.cursos.map((c, i) => (
                      <div key={c} className="flex items-start gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                        <span className="text-xs font-bold text-gray-600 font-syne shrink-0 pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                        <p className="text-sm font-bold text-white uppercase tracking-wide font-syne leading-snug">{c}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CRIATIVIDADE + GAMES ─────────────────────────────────────────── */}
      <section id="criatividade-games" className="border-t border-white/5 scroll-mt-24 overflow-hidden">
        {/* Split layout: image left, text right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
          {/* Left: image */}
          <div className="relative h-72 lg:h-auto">
            <img
              src="/images/plataforma_educacional/Game 1.webp"
              alt="Criatividade e Games — Formação criativa"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a0a] via-transparent to-transparent" />
          </div>
          {/* Right: text */}
          <div className="bg-[#0a0a0a] py-20 px-6 md:px-12 lg:px-16 flex flex-col justify-center reveal-section">
            <div className="flex items-center gap-3 mb-4">
              <img src="/images/plataforma_educacional/icone-criatividade-games-branco-transparente.png" alt="Ícone Criatividade" className="h-8 w-auto object-contain" />
              <p className="text-xs text-[#ef7d00] font-bold uppercase tracking-[0.3em] font-syne">Pilar 03 — Formação Criativa</p>
            </div>
            <h2 className="text-5xl md:text-6xl font-syne leading-none mb-6">
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 200, letterSpacing: '0.08em' }} className="text-white/70">Criatividade </span><span className="font-extrabold" style={{ color: '#ef7d00' }}>+ Games</span>
            </h2>
            <p className="text-gray-300 text-base leading-relaxed mb-2">
              Ferramentas, repertório e produção para transformar ideias em experiências.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed italic mb-8">
              Da técnica à criação. Da ideia à entrega.
            </p>
            <div className="flex gap-3 text-[10px] uppercase font-bold tracking-[0.3em] text-gray-500 font-syne">
              <span>Criar</span>
              <span className="text-[#ef7d00]">•</span>
              <span>Experimentar</span>
              <span className="text-[#ef7d00]">•</span>
              <span>Produzir</span>
            </div>
          </div>
        </div>

        {/* Cursos grid + audiovisual image */}
        <div className="bg-[#080808] py-16 px-6 md:px-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cursos */}
              <div className="lg:col-span-2 reveal-section grid grid-cols-1 sm:grid-cols-2 gap-4">
                {GAMES_CURSOS.map((c) => (
                  <div key={c.num} className="bg-[#0f0f0f] border border-white/10 rounded-lg p-6 md:p-8 hover:border-[#ef7d00]/50 hover:bg-[#151515] transition-all group">
                    <div className="flex items-end justify-between mb-6">
                      <span className="text-4xl font-extrabold font-syne leading-none" style={{ color: c.cor }}>{c.num}</span>
                      <div className="w-8 h-[2px] group-hover:w-14 transition-all duration-300" style={{ backgroundColor: c.cor }} />
                    </div>
                    <h3 className="text-xs md:text-sm font-extrabold text-white uppercase tracking-wider font-syne leading-snug mb-1">{c.titulo}</h3>
                    <p className="text-xs text-gray-500">{c.sub}</p>
                  </div>
                ))}
              </div>
              {/* Audiovisual image */}
              <div className="reveal-section relative overflow-hidden min-h-[260px] rounded-lg border border-white/10">
                <img
                  src="/images/plataforma_educacional/AudioVisual 2.webp"
                  alt="Projetos audiovisuais — Criatividade e Games"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[10px] text-[#ef7d00] uppercase tracking-widest font-bold font-syne">Formação presencial, online e In Company</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 border-t border-white/5 bg-gradient-to-b from-[#0a0a0a] via-[#140c10] to-[#0a0a0a]">
        <div className="max-w-4xl mx-auto text-center reveal-section">
          <div className="w-12 h-[2px] bg-[#e83a79] mx-auto mb-8" />
          <h2 className="text-4xl md:text-6xl font-extrabold text-white font-syne mb-6 leading-tight">
            Pronto para começar<br />
            <span className="text-[#e83a79]">sua jornada?</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-12">
            Confira nossa agenda de eventos e cursos ou entre em contato com nossa equipe
            para uma trilha de conhecimento personalizada para você ou sua empresa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/agenda"
              className="inline-flex items-center justify-center gap-2 bg-[#e83a79] hover:bg-[#c42866] text-white font-bold text-sm uppercase tracking-widest px-10 py-5 font-syne transition-all duration-300 hover:shadow-[0_0_40px_rgba(232,58,121,0.4)] hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              Ver Agenda de Eventos
            </Link>
            <a
              href="https://wa.link/2wbzbb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-[#e83a79] text-white hover:text-[#e83a79] font-bold text-sm uppercase tracking-widest px-10 py-5 font-syne transition-all duration-300"
            >
              Falar com a equipe
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <p className="text-xs text-gray-600 mt-8 tracking-widest uppercase font-syne">
            Itu, SP — Presencial · Online · In Company
          </p>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CoursesLandingPage;

