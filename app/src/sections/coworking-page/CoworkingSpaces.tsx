import { ArrowRight } from 'lucide-react';

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
    ],
    cta: 'Conhecer o Espaço',
  },
  {
    id: 'recepcao',
    tag: 'RECEPÇÃO & ESTRUTURA',
    tagColor: '#378ADD',
    title: 'Recepção e Ambientes Comuns',
    subtitle: 'Design pensado para impressionar desde a entrada.',
    description: 'Recepção moderna, balcão de atendimento e ambientes comuns que refletem inovação e profissionalismo. Endereço fiscal e comercial disponíveis.',
    images: [
      { src: '/images/imgs_coworking/Recepção Vila Tech Hub.png', label: 'Recepção' },
      { src: '/images/imgs_coworking/Balcao.jpg', label: 'Balcão de Atendimento' },
      { src: '/images/coworking/Pickup.jpg', label: 'Área de Convívio' },
    ],
    cta: 'Agendar Visita',
  },
];

/* ─── COMPONENT ───────────────────────────────────────────────────────────── */

const CoworkingSpaces = () => {

  const scrollToCotacao = () => {
    const el = document.getElementById('cotacao');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="espacos" className="bg-void-black relative z-10">

      {/* Section Header */}
      <div className="py-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <p className="text-[#378ADD] text-xs font-syne font-bold uppercase tracking-[0.3em] mb-4">Nossos Espaços</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-syne font-bold text-white mb-6">
            Conheça cada ambiente
          </h2>
          <p className="text-gray-400 font-sans text-lg max-w-2xl mx-auto">
            Descubra os espaços que preparamos para você e sua empresa prosperarem.
          </p>
        </div>
      </div>

      {/* Space Sections */}
      {spaceSections.map((space, sectionIndex) => (
        <div
          key={space.id}
          className={`py-20 border-b border-white/5 ${sectionIndex % 2 === 1 ? 'bg-[#080808]' : 'bg-void-black'}`}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12">

            {/* Tag + Title + Description */}
            <div className="mb-12 max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-1 rounded-full" style={{ backgroundColor: space.tagColor }} />
                <span
                  className="text-xs font-syne font-bold uppercase tracking-[0.25em]"
                  style={{ color: space.tagColor }}
                >
                  {space.tag}
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-syne font-bold text-white mb-4">{space.title}</h3>
              <p className="text-xl text-gray-300 font-light mb-2">{space.subtitle}</p>
              <p className="text-gray-500 leading-relaxed">{space.description}</p>
            </div>

            {/* Photos Grid — horizontal row */}
            <div className={`grid gap-4 mb-10 ${space.images.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}>
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

            {/* CTA Button */}
            <button
              onClick={scrollToCotacao}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-syne font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: space.tagColor,
                color: '#fff',
              }}
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
