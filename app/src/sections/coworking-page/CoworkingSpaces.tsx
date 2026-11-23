import { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─── SPACES DATA ─────────────────────────────────────────────────────────── */

const spaceSections = [
  {
    id: 'estacoes',
    spaceType: 'Estação de Trabalho',
    tag: 'POSTOS DE TRABALHO',
    tagColor: '#378ADD',
    title: 'Estações de Trabalho',
    subtitle: 'Flexíveis e fixas, para profissionais e equipes de todos os tamanhos.',
    description: 'Ambientes projetados para produtividade máxima, com internet de alta velocidade, armários individuais e acesso às áreas comuns.',
    images: [
      { src: '/images/coworking/estacoes-geral.webp', label: 'Visão Geral do Salão' },
      { src: '/images/coworking/estacoes-mesas.webp', label: 'Mesas Colaborativas & Postos Fixos' },
      { src: '/images/imgs_coworking/Estações de trabalho 2.webp', label: 'Postos de Trabalho Individuais' },
    ],
    cta: 'Solicitar Cotação',
    dedicatedRoute: '/coworking/estacoes-de-trabalho',
    dedicatedLabel: 'Ver Detalhes das Estações',
  },
  {
    id: 'salas',
    spaceType: 'Sala de Reunião',
    tag: 'SALAS DE REUNIÃO',
    tagColor: '#ef7d00',
    title: 'Salas de Reunião',
    subtitle: 'Privativas e equipadas para reuniões, brainstorms e videoconferências.',
    description: 'Salas com TV, projeção, internet dedicada e isolamento acústico. Disponíveis por hora ou pacotes mensais, para até 8 pessoas.',
    images: [
      { src: '/images/coworking/reuniao-executiva-1.webp', label: 'Sala de Reunião Executiva com TV' },
      { src: '/images/coworking/reuniao-executiva-2.webp', label: 'Sala para até 4 Pessoas' },
      { src: '/images/coworking/reuniao-mesa-grande.webp', label: 'Mesa de Reunião Ampla & Confortável' },
      { src: '/images/coworking/sala1_Vista2.webp', label: 'Open Space' },
    ],
    cta: 'Reservar Sala',
    dedicatedRoute: '/coworking/salas-de-reuniao',
    dedicatedLabel: 'Ver Detalhes da Sala de Reunião',
    carousel: true,
  },
  {
    id: 'auditorio',
    spaceType: 'Auditório',
    tag: 'AUDITÓRIO',
    tagColor: '#e83a79',
    title: 'Auditório para até 70 pessoas',
    subtitle: 'Para palestras, workshops, eventos corporativos e lançamentos.',
    description: 'Espaço amplo e modular com projetor profissional, sistema de som, iluminação cênica e área para coffee break. Configuração com mesas ou plateia.',
    images: [
      { src: '/images/coworking/auditorio-plateia.webp', label: 'Configuração Plateia & Telão Profissional' },
      { src: '/images/coworking/auditorio-mesas.webp', label: 'Configuração com Mesas para Workshops' },
      { src: '/images/imgs_coworking/Auditório com cadeiras.webp', label: 'Capacidade para até 70 Pessoas' },
    ],
    cta: 'Agendar Evento',
    dedicatedRoute: '/coworking/auditorio',
    dedicatedLabel: 'Ver Detalhes do Auditório',
  },
  {
    id: 'cafe',
    spaceType: '',
    tag: 'CAFÉ & CONVIVÊNCIA',
    tagColor: '#9B35AE',
    title: 'Café, Lounge & Honest Market',
    subtitle: 'Área de descompressão, networking e alimentação.',
    description: 'Espaço com café especial, Honest Market (mercadinho inteligente PL Market), lounge para relaxar e vinil para inspirar. Ideal para conexões que fazem a diferença.',
    images: [
      { src: '/images/coworking/cafe-copa.webp', label: 'Café & Copa Integrada' },
      { src: '/images/coworking/lounge-convivencia.webp', label: 'Lounge de Convivência & Relaxamento' },
      { src: '/images/coworking/honest-market.webp', label: 'Honest Market — PL Market 24/7' },
      { src: '/images/coworking/pickup-convivio.webp', label: 'Área de Convívio & Encontros' },
      { src: '/images/coworking/cafe-xicaras.webp', label: 'Café Especial & Clube do Vinil' },
    ],
    cta: 'Conhecer o Espaço',
    carousel: true,
  },
];

/* ─── IMAGE CAROUSEL ──────────────────────────────────────────────────────── */

const ImageCarousel = ({ images }: { images: { src: string; label: string }[] }) => {
  const [current, setCurrent] = useState(0);
  const visibleCount = 3; // Show 3 at a time
  const maxStart = Math.max(0, images.length - visibleCount);

  const prev = () => setCurrent(c => Math.max(0, c - 1));
  const next = () => setCurrent(c => Math.min(maxStart, c + 1));

  const visibleImages = images.slice(current, current + visibleCount);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {visibleImages.map((img, idx) => (
          <div key={current + idx} className="group">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white/5">
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <p className="mt-3 text-sm text-gray-400 font-sans tracking-wide">{img.label}</p>
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      {images.length > visibleCount && (
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={prev}
            disabled={current === 0}
            aria-label="Foto anterior"
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: maxStart + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Ver foto ${i + 1}`}
                className="w-7 h-7 flex items-center justify-center rounded-full transition-colors"
              >
                <span className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-white' : 'bg-white/20'}`} />
              </button>
            ))}
          </div>
          <button
            onClick={next}
            disabled={current === maxStart}
            aria-label="Próxima foto"
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

/* ─── FISCAL SECTION CAROUSEL ─────────────────────────────────────────────── */

const FiscalCarousel = () => {
  const [current, setCurrent] = useState(0);
  const images = [
    { src: '/images/coworking/recepcao-principal.webp', label: 'Recepção Vila Tech Hub' },
    { src: '/images/coworking/fachada-limpa.webp', label: 'Fachada & Acesso — Itu Novo Centro' },
    { src: '/images/coworking/fachada-angulo.webp', label: 'Edifício Vila Tech Hub' },
  ];

  const prev = () => setCurrent(c => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent(c => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div className="relative group">
      <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-white/5 relative">
        {images.map((img, idx) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.label}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
            loading="lazy"
          />
        ))}

        {/* Gradient overlay for bottom badge */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent z-20 pointer-events-none" />

        {/* Label badge */}
        <div className="absolute bottom-3 left-4 z-20">
          <span className="text-xs font-sans text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            {images[current].label}
          </span>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prev}
          aria-label="Foto anterior da recepção e fachada"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all opacity-80 group-hover:opacity-100 z-30"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          aria-label="Próxima foto da recepção e fachada"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all opacity-80 group-hover:opacity-100 z-30"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Pagination dots below */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Ver foto ${i + 1} de endereço fiscal`}
            className="w-7 h-7 flex items-center justify-center rounded-full transition-colors"
          >
            <span
              className={`h-2 rounded-full transition-all ${
                i === current ? 'bg-[#378ADD] w-5' : 'bg-white/20 w-2'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

/* ─── MAIN COMPONENT ──────────────────────────────────────────────────────── */

const CoworkingSpaces = ({ onRequestQuote }: { onRequestQuote: (spaceType: string) => void }) => {
  return (
    <section id="espacos" className="bg-void-black relative z-10">

      {/* ── Endereço Fiscal — Hero-style split section ─────────────── */}
      <div className="py-14 border-b border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Image Left - Interactive Carousel with Reception and Facade */}
            <FiscalCarousel />

            {/* Text Right */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-1 rounded-full bg-[#378ADD]" />
                <span className="text-xs font-syne font-bold uppercase tracking-[0.25em] text-[#378ADD]">
                  ENDEREÇO FISCAL & COMERCIAL
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-syne font-bold text-white mb-4 leading-tight">
                Seu negócio no melhor<br />endereço de Itu
              </h3>
              <p className="text-gray-300 text-lg font-light mb-4">
                Regularize sua empresa com nosso endereço fiscal ou utilize nosso endereço comercial para fortalecer sua marca.
              </p>
              <ul className="space-y-3 mb-8 text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-[#378ADD] mt-1">•</span>
                  Endereço fiscal para registro de CNPJ
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#378ADD] mt-1">•</span>
                  Endereço comercial para divulgação
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#378ADD] mt-1">•</span>
                  Recebimento de correspondências
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#378ADD] mt-1">•</span>
                  Localização privilegiada no Itu Novo Centro
                </li>
              </ul>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/coworking/endereco-fiscal"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#378ADD] text-white font-syne font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-[#378ADD] transition-all duration-300 hover:scale-105"
                >
                  Conhecer Planos de Endereço Fiscal <ArrowRight size={16} />
                </Link>
                <button
                  onClick={() => onRequestQuote('Endereço Fiscal')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 text-white font-syne font-semibold text-sm uppercase tracking-wider hover:bg-white/10 transition-colors"
                >
                  Solicitar Cotação
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Space Sections ────────────────────────────────────────── */}
      {spaceSections.map((space, sectionIndex) => (
        <div
          key={space.id}
          className={`py-14 border-b border-white/5 ${sectionIndex % 2 === 0 ? 'bg-void-black' : 'bg-[#080808]'}`}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12">

            {/* Tag + Title + Description */}
            <div className="mb-10 max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-1 rounded-full" style={{ backgroundColor: space.tagColor }} />
                <span
                  className="text-xs font-syne font-bold uppercase tracking-[0.25em]"
                  style={{ color: space.tagColor }}
                >
                  {space.tag}
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-syne font-bold text-white mb-3">{space.title}</h3>
              <p className="text-lg text-gray-300 font-light mb-2">{space.subtitle}</p>
              <p className="text-gray-500 leading-relaxed text-sm">{space.description}</p>
            </div>

            {/* Photos — Grid or Carousel */}
            {space.carousel ? (
              <div className="mb-8">
                <ImageCarousel images={space.images} />
              </div>
            ) : (
              <div className={`grid gap-4 mb-8 ${space.images.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}>
                {space.images.map((img, idx) => (
                  <div key={idx} className="group">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white/5">
                      <img
                        src={img.src}
                        alt={img.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                    <p className="mt-3 text-sm text-gray-400 font-sans tracking-wide">{img.label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              {space.dedicatedRoute ? (
                <>
                  <Link
                    to={space.dedicatedRoute}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-syne font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: space.tagColor, color: '#fff' }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = space.tagColor; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = space.tagColor; e.currentTarget.style.color = '#fff'; }}
                  >
                    {space.dedicatedLabel} <ArrowRight size={16} />
                  </Link>
                  <button
                    onClick={() => onRequestQuote(space.spaceType)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 text-white font-syne font-semibold text-sm uppercase tracking-wider hover:bg-white/10 transition-colors"
                  >
                    {space.cta}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onRequestQuote(space.spaceType)}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-syne font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: space.tagColor, color: '#fff' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = space.tagColor; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = space.tagColor; e.currentTarget.style.color = '#fff'; }}
                >
                  {space.cta} <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CoworkingSpaces;
