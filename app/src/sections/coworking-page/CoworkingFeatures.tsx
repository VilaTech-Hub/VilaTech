import { Users, Monitor, Coffee, Presentation, Mic, MapPin, Wifi, Sofa, ShoppingCart } from 'lucide-react';

const featuresList = [
  {
    icon: <Users size={32} />,
    title: "40 Postos de Trabalho",
    description: "Estações flexíveis e fixas preparadas para receber profissionais e equipes de todos os tamanhos."
  },
  {
    icon: <Monitor size={32} />,
    title: "4 Salas de Reunião",
    description: "Ambientes privativos e totalmente equipados com TV e internet dedicada para suas reuniões."
  },
  {
    icon: <Presentation size={32} />,
    title: "Auditório (70 pessoas)",
    description: "Amplo espaço com projetor e som profissional para eventos, palestras e workshops corporativos."
  },
  {
    icon: <Coffee size={32} />,
    title: "Café & Convivência",
    description: "Área de alimentação com café especial para gerar conexões e momentos valiosos de networking."
  },
  {
    icon: <Mic size={32} />,
    title: "Estúdio Podcast",
    description: "Estúdio com isolamento acústico e equipamentos profissionais para gravação de áudio e vídeo."
  },
  {
    icon: <MapPin size={32} />,
    title: "Endereço Fiscal e Comercial",
    description: "Regularize sua empresa com nosso endereço fiscal e utilize nosso endereço comercial para receber correspondências."
  },
  {
    icon: <Wifi size={32} />,
    title: "Internet de Alta Velocidade",
    description: "Conexão Wi-Fi rápida e estável em todos os ambientes para garantir sua produtividade sem interrupções."
  },
  {
    icon: <Sofa size={32} />,
    title: "Área de Descompressão",
    description: "Espaços projetados para descanso, criatividade e relaxamento entre as atividades do dia a dia."
  },
  {
    icon: <ShoppingCart size={32} />,
    title: "Honest Market",
    description: "Mercadinho inteligente e prático à sua disposição, incluindo os produtos selecionados do PL Market."
  }
];

const CoworkingFeatures = () => {
  return (
    <section className="py-24 bg-[#0a0a0a] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-syne font-bold text-white mb-6">
            Tudo o que você busca em um Coworking
          </h2>
          <p className="text-gray-400 font-sans text-lg">
            Oferecemos uma infraestrutura completa e moderna, pensada nos mínimos detalhes
            para o crescimento do seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresList.map((item, index) => (
            <div
              key={index}
              className="bg-void-black border border-white/10 rounded-2xl p-8 hover:border-[#378ADD]/50 transition-colors duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-[#378ADD] mb-6 group-hover:bg-[#378ADD] group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-syne font-bold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400 font-sans leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoworkingFeatures;
