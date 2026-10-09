import { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

/* ─── SPACES DATA ─────────────────────────────────────────────────────────── */

const spaceSections = [
  {
    id: 'estacoes',
    tag: 'POSTOS DE TRABALHO',
    tagColor: '#378ADD',
    title: 'Estações de Trabalho',
    subtitle: 'Flexíveis e fixas, para profissionais e equipes de todos os tamanhos.',
    description: 'Ambientes projetados para produtividade máxima, com internet de alta velocidade, armários individuais e acesso às áreas comuns.',
    images: [
      { src: '/images/imgs_coworking/Estações de trabalho.png', label: 'Estações Individuais' },
      { src: '/images/imgs_coworking/Estações de trabalho 1.png', label: 'Área Colaborativa' },
      { src: '/images/imgs_coworking/Estações de trabalho 2.png', label: 'Postos Fixos' },
    ],
    cta: 'Solicitar Cotação',
  },
  {
    id: 'salas',
    tag: 'SALAS DE REUNIÃO',
    tagColor: '#ef7d00',
    title: 'Salas de Reunião',
    subtitle: 'Privativas e equipadas para reuniões, brainstorms e videoconferências.',
    description: 'Salas com TV, projeção, internet dedicada e isolamento acústico. Disponíveis por hora ou pacotes mensais, para até 8 pessoas.',
    images: [
      { src: '/images/coworking/sala1_Vista2.jpg', label: 'Sala 01 — Até 4 pessoas' },
      { src: '/images/coworking/Sala2.jpg', label: 'Sala 02 — Até 8 pessoas' },
      { src: '/images/coworking/Mesa_grande.jpg', label: 'Mesa de Reunião Executiva' },
    ],
    cta: 'Reservar Sala',
  },
  {
    id: 'auditorio',
    tag: 'AUDITÓRIO',
    tagColor: '#e83a79',
    title: 'Auditório para até 70 pessoas',
    subtitle: 'Para palestras, workshops, eventos corporativos e lançamentos.',
    description: 'Espaço amplo e modular com projetor profissional, sistema de som, iluminação cênica e área para coffee break. Configuração com mesas ou plateia.',
    images: [
      { src: '/images/imgs_coworking/Auditório com mesas.png', label: 'Configuração Mesas' },
      { src: '/images/imgs_coworking/Auditório com cadeiras.png', label: 'Configuração Plateia' },
    ],
    cta: 'Agendar Evento',
  },
  {
    id: 'cafe',
    tag: 'CAFÉ & CONVIVÊNCIA',
    tagColor: '#9B35AE',
    title: 'Café, Lounge & Honest Market',
    subtitle: 'Área de descompressão, networking e alimentação.',
    description: 'Espaço com café especial, Honest Market (mercadinho inteligente PL Market), lounge para relaxar e vinil para inspirar. Ideal para conexões que fazem a diferença.',
    images: [
      { src: '/images/coworking/Honest Mkt.jpg', label: 'Honest Market' },
      { src: '/images/coworking/lounge2.png', label: 'Lounge de Convivência' },
      { src: '/images/imgs_coworking/xicaras.jpg', label: 'Café Especial' },
      { src: '/images/imgs_coworking/Balcao.jpg', label: 'Balcão de Atendimento' },
      { src: '/images/coworking/Pickup.jpg', label: 'Área de Convívio' },
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
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-1.5">
            {Array.from({ length: maxStart + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-white' : 'bg-white/20'}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            disabled={current === maxStart}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

/* ─── MAIN COMPONENT ──────────────────────────────────────────────────────── */

const CoworkingSpaces = () => {

  const scrollToCotacao = () => {
    const el = document.getElementById('cotacao');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="espacos" className="bg-void-black relative z-10">

      {/* ── Endereço Fiscal — Hero-style split section ─────────────── */}
      <div className="py-14 border-b border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Image Left */}
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-white/5">
              <img
                src="/images/imgs_coworking/recepcao.png"
                alt="Recepção Vila Tech Hub"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

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
              <button
                onClick={scrollToCotacao}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#378ADD] text-white font-syne font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-[#378ADD] transition-all duration-300 hover:scale-105"
              >
                Solicitar Cotação <ArrowRight size={16} />
              </button>
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

            {/* CTA Button */}
            <button
              onClick={scrollToCotacao}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-syne font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: space.tagColor, color: '#fff' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = space.tagColor; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = space.tagColor; e.currentTarget.style.color = '#fff'; }}
            >
              {space.cta} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CoworkingSpaces;
