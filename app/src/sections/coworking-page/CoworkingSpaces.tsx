import { useState } from 'react';
import { Wifi, Coffee, Users, Key, Monitor, Presentation } from 'lucide-react';

const spaces = [
  {
    id: 'postos',
    title: 'Postos de Trabalho',
    description: 'Estações de trabalho flexíveis e fixas em um ambiente colaborativo, projetado para produtividade e networking.',
    images: [
      '/images/imgs_coworking/Estações de trabalho.png',
      '/images/imgs_coworking/Estações de trabalho 1.png',
    ],
    features: [
      { icon: <Wifi size={18} />, text: 'Internet de alta velocidade' },
      { icon: <Coffee size={18} />, text: 'Acesso ao Café e Copa' },
      { icon: <Key size={18} />, text: 'Armários (Lockers)' },
    ]
  },
  {
    id: 'reuniao',
    title: 'Salas de Reunião',
    description: 'Salas privativas e equipadas para reuniões com clientes, sessões de brainstorming e videoconferências.',
    images: [
      '/images/coworking/sala1_Vista2.jpg',
      '/images/coworking/Sala2.jpg',
    ],
    features: [
      { icon: <Monitor size={18} />, text: 'TV e Projeção' },
      { icon: <Users size={18} />, text: 'Para 4 a 8 pessoas' },
      { icon: <Wifi size={18} />, text: 'Internet dedicada' },
    ]
  },
  {
    id: 'auditorio',
    title: 'Auditório',
    description: 'Espaço amplo e modular para palestras, workshops e eventos corporativos, com capacidade para até 70 pessoas.',
    images: [
      '/images/coworking/Auditório 1_trat.png',
      '/images/coworking/Auditório 2_trat.png',
    ],
    features: [
      { icon: <Presentation size={18} />, text: 'Projetor e Som Profissional' },
      { icon: <Users size={18} />, text: 'Até 70 pessoas' },
      { icon: <Coffee size={18} />, text: 'Espaço para Coffee Break' },
    ]
  },
  {
    id: 'convivencia',
    title: 'Café & Convivência',
    description: 'Área de descompressão com Honest Market, ideal para relaxar, tomar um café especial e fazer networking.',
    images: [
      '/images/coworking/Honest Mkt.jpg',
      '/images/coworking/lounge2.png',
    ],
    features: [
      { icon: <Coffee size={18} />, text: 'Clube do Vinil Café' },
      { icon: <Users size={18} />, text: 'Área de Descompressão' },
      { icon: <Wifi size={18} />, text: 'Honest Market' },
    ]
  }
];

const CoworkingSpaces = () => {
  const [activeTab, setActiveTab] = useState(spaces[0].id);

  const activeSpace = spaces.find(s => s.id === activeTab) || spaces[0];

  return (
    <section id="espacos" className="py-24 bg-void-black border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-syne font-bold text-white mb-4">Nossos Espaços</h2>
          <p className="text-gray-400 font-sans text-lg max-w-2xl mx-auto">
            Descubra os ambientes que preparamos para você e sua empresa prosperarem.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {spaces.map((space) => (
            <button
              key={space.id}
              onClick={() => setActiveTab(space.id)}
              className={`px-6 py-3 rounded-full font-syne font-semibold text-sm transition-all duration-300 ${
                activeTab === space.id
                  ? 'bg-[#378ADD] text-white shadow-lg'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {space.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-[#0a0a0a] rounded-3xl border border-white/5 overflow-hidden">
            <div
              key={activeTab}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12 animate-fade-in"
            >
              {/* Text side */}
              <div className="flex flex-col justify-center">
                <h3 className="text-3xl font-syne font-bold text-white mb-6">{activeSpace.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {activeSpace.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeSpace.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-gray-300">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#378ADD]">
                        {feat.icon}
                      </div>
                      <span className="font-sans text-sm">{feat.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image side */}
              <div className="grid grid-cols-2 gap-4">
                {activeSpace.images.map((img, idx) => (
                  <div key={idx} className={`rounded-2xl overflow-hidden bg-white/5 ${idx === 0 ? 'col-span-2 aspect-video' : 'col-span-1 aspect-square'}`}>
                    <img 
                      src={img} 
                      alt={`${activeSpace.title} - ${idx + 1}`} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default CoworkingSpaces;
