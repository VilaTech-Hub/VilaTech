import { useEffect } from 'react';
import WhatsAppButton from '../components/WhatsAppButton';
import SEO from '../components/SEO';

interface AgendaItem {
  id: string;
  month: 'outubro' | 'novembro';
  date: string;
  title: string;
  speakers: string;
  link: string;
  image: string;
}

const EVENTS: AgendaItem[] = [
  {
    id: 'evento-1',
    month: 'outubro',
    date: '28/10 · 19h00',
    title: 'O Futuro do RH Começou Ontem',
    speakers: 'Cristiane Mainardes & Tu Evangelista',
    link: 'https://www.sympla.com.br/evento/o-futuro-do-rh-comecou-ontem-o-novo-papel-do-rh-nas-organizacoes/3623318',
    image: '/images/agenda/evento-1.jpg',
  },
  {
    id: 'evento-2',
    month: 'outubro',
    date: '29/10 · 19h00',
    title: 'Reforma Tributária:',
    speakers: 'Carla Bertoncello',
    link: 'https://www.sympla.com.br/evento/reforma-tributaria-os-impactos-diretos-no-seu-negocio/3626284',
    image: '/images/agenda/evento-2.jpg',
  },
  {
    id: 'evento-3',
    month: 'outubro',
    date: '31/10 · 09h00',
    title: 'Tudo que você deveria saber sobre IA',
    speakers: 'Achilles, Carlos Tabosa & Convidados',
    link: 'https://www.sympla.com.br/evento/tudo-que-voce-deveria-saber-sobre-ia-mas-ainda-nao-te-contaram/3629324',
    image: '/images/agenda/evento-3.jpg',
  },
  {
    id: 'evento-4',
    month: 'novembro',
    date: '04/11 · 18h30',
    title: 'ESG para empresas',
    speakers: 'Gilberto de Moura',
    link: 'https://www.sympla.com.br/evento/esg-para-empresas---o-resultado-voce-percebe-no-valor-da-sua-empresa/3619054',
    image: '/images/agenda/evento-4.jpg',
  },
  {
    id: 'evento-5',
    month: 'novembro',
    date: '05/11 · 19h00',
    title: 'Growth Machine',
    speakers: 'Tiago Lara',
    link: 'https://www.sympla.com.br/evento/growth-machine--o-curso-pratico-para-fazer-sua-empresa-crescer/3614438',
    image: '/images/agenda/evento-5.jpg',
  },
  {
    id: 'evento-6',
    month: 'novembro',
    date: '11/11 · 19h00',
    title: 'Ferramentas Ágeis em Planejamento Estratégico',
    speakers: 'Gilberto de Moura',
    link: 'https://www.sympla.com.br/evento/ferramentas-Ageis-em-planejamento-estratEgico/3630862',
    image: '/images/agenda/evento-6.jpg',
  },
  {
    id: 'evento-7',
    month: 'novembro',
    date: '18/11 · 19h00',
    title: 'IA Aplicada à Advocacia',
    speakers: 'Felipe Scalet',
    link: 'https://www.sympla.com.br/evento/ia-aplicada-a-advocacia/3630824',
    image: '/images/agenda/evento-7.jpg',
  },
];

export default function CalendarPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const outubroEvents = EVENTS.filter((e) => e.month === 'outubro');
  const novembroEvents = EVENTS.filter((e) => e.month === 'novembro');

  return (
    <div className="min-h-screen bg-[#f3f3f0] text-[#141414] font-['Avenir',_'Helvetica_Neue',_Arial,_sans-serif] selection:bg-[#00d1d1] selection:text-[#111]">
      <SEO
        title="Agenda Vila Tech Hub | Outubro e Novembro 2026"
        description="Ideias que movem. Encontros que transformam. Cursos e encontros presenciais no Vila Tech Hub para ampliar repertórios, conectar pessoas e impulsionar negócios."
        image="https://www.vilatechub.com.br/images/agenda/evento-1.jpg"
      />

      <main className="max-w-[1080px] mx-auto bg-white shadow-sm">
        {/* Header com borda turquesa / ciano */}
        <header className="pt-[52px] pb-[32px] px-6 sm:px-10 border-t-[10px] border-[#00d1d1]">
          <div className="text-[13px] tracking-[3px] font-[800] text-[#141414] uppercase">
            VILA TECH HUB · AGENDA 2026
          </div>
          <h1 className="text-[clamp(34px,7vw,76px)] font-bold leading-[1.02] tracking-[-2px] sm:tracking-[-3px] my-6 text-[#141414]">
            Ideias que movem.
            <br />
            Encontros que transformam.
          </h1>
          <p className="text-base sm:text-[18px] leading-[1.5] text-[#333] max-w-2xl font-normal">
            Cursos e encontros presenciais para ampliar repertórios, conectar pessoas e impulsionar negócios.
          </p>
          <nav aria-label="Meses" className="flex gap-5 mt-6">
            <a
              href="#outubro"
              className="text-[#111] font-bold underline underline-offset-[7px] hover:text-[#00d1d1] transition-colors"
            >
              Outubro
            </a>
            <a
              href="#novembro"
              className="text-[#111] font-bold underline underline-offset-[7px] hover:text-[#00d1d1] transition-colors"
            >
              Novembro
            </a>
          </nav>
        </header>

        {/* Mês: Outubro */}
        <h2 id="outubro" className="m-0 py-7 px-6 sm:px-10 bg-[#101010] text-white text-[26px] sm:text-[30px] font-bold scroll-mt-6">
          Outubro <span className="text-[14px] font-normal ml-3 text-white/70">2026</span>
        </h2>

        <div>
          {outubroEvents.map((ev) => (
            <article key={ev.id} id={ev.id} className="mb-8 last:mb-0">
              <a
                href={ev.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Inscreva-se: ${ev.title}`}
                className="block leading-none m-0 p-0 overflow-hidden group"
              >
                <img
                  src={ev.image}
                  alt={`Campanha: ${ev.title}`}
                  className="w-full h-auto block align-top m-0 transition-transform duration-500 group-hover:scale-[1.01]"
                  loading="lazy"
                />
              </a>
              <div className="py-6 px-6 sm:px-10 pb-7 flex flex-col md:flex-row gap-5 md:gap-6 items-start md:items-center justify-between border-b border-black/5">
                <div>
                  <p className="text-[16px] font-[800] text-[#1b5555] mb-2">{ev.date}</p>
                  <h3 className="m-0 text-[22px] sm:text-[25px] font-bold leading-[1.2] text-[#141414]">{ev.title}</h3>
                  <p className="leading-[1.5] mb-0 text-[#444] text-[15px] sm:text-[16px] mt-1">{ev.speakers}</p>
                </div>
                <a
                  href={ev.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Inscreva-se: ${ev.title}`}
                  className="inline-block shrink-0 bg-[#ff8300] hover:bg-[#00d1d1] text-[#111] py-4 px-6 no-underline text-[16px] font-[800] whitespace-nowrap transition-all duration-200 text-center w-full md:w-auto shadow-sm"
                >
                  Inscreva-se ↗
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Mês: Novembro */}
        <h2 id="novembro" className="m-0 py-7 px-6 sm:px-10 bg-[#101010] text-white text-[26px] sm:text-[30px] font-bold scroll-mt-6 mt-6">
          Novembro <span className="text-[14px] font-normal ml-3 text-white/70">2026</span>
        </h2>

        <div>
          {novembroEvents.map((ev) => (
            <article key={ev.id} id={ev.id} className="mb-8 last:mb-0">
              <a
                href={ev.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Inscreva-se: ${ev.title}`}
                className="block leading-none m-0 p-0 overflow-hidden group"
              >
                <img
                  src={ev.image}
                  alt={`Campanha: ${ev.title}`}
                  className="w-full h-auto block align-top m-0 transition-transform duration-500 group-hover:scale-[1.01]"
                  loading="lazy"
                />
              </a>
              <div className="py-6 px-6 sm:px-10 pb-7 flex flex-col md:flex-row gap-5 md:gap-6 items-start md:items-center justify-between border-b border-black/5">
                <div>
                  <p className="text-[16px] font-[800] text-[#1b5555] mb-2">{ev.date}</p>
                  <h3 className="m-0 text-[22px] sm:text-[25px] font-bold leading-[1.2] text-[#141414]">{ev.title}</h3>
                  <p className="leading-[1.5] mb-0 text-[#444] text-[15px] sm:text-[16px] mt-1">{ev.speakers}</p>
                </div>
                <a
                  href={ev.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Inscreva-se: ${ev.title}`}
                  className="inline-block shrink-0 bg-[#ff8300] hover:bg-[#00d1d1] text-[#111] py-4 px-6 no-underline text-[16px] font-[800] whitespace-nowrap transition-all duration-200 text-center w-full md:w-auto shadow-sm"
                >
                  Inscreva-se ↗
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Footer */}
        <footer className="py-9 px-6 sm:px-10 pb-12 bg-[#101010] text-white text-[14px] leading-[1.7] mt-8">
          <strong className="tracking-wide">VILA TECH HUB</strong>
          <br />
          Rua Francisco José Ferreira Sampaio, 90 · Novo Centro · Itu/SP
          <br />
          <a
            href="/"
            className="text-[#65e1e1] font-semibold hover:underline mt-2 inline-block"
          >
            Conheça o Vila Tech Hub ↗
          </a>
        </footer>
      </main>

      {/* Botão de contato rápido com suporte */}
      <WhatsAppButton />
    </div>
  );
}
