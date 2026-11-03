import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import WhatsAppButton from '../components/WhatsAppButton';
import SEO from '../components/SEO';
import { trackAgendaAction } from '../lib/agendaAnalytics';

interface AgendaItem {
  id: string;
  month: 'outubro' | 'novembro';
  startsAt: string;
  title: string;
  speakers: string;
  link: string;
  image: string;
}

const EVENTS: AgendaItem[] = [
  {
    id: 'evento-1',
    month: 'outubro',
    startsAt: '2026-10-28T19:00:00-03:00',
    title: 'O Futuro do RH Começou Ontem',
    speakers: 'Cristiane Mainardes & Tu Evangelista',
    link: 'https://www.sympla.com.br/evento/o-futuro-do-rh-comecou-ontem-o-novo-papel-do-rh-nas-organizacoes/3623318',
    image: '/images/agenda/evento-1.jpg',
  },
  {
    id: 'evento-2',
    month: 'outubro',
    startsAt: '2026-10-29T19:00:00-03:00',
    title: 'Reforma Tributária:',
    speakers: 'Carla Bertoncello',
    link: 'https://www.sympla.com.br/evento/reforma-tributaria-os-impactos-diretos-no-seu-negocio/3626284',
    image: '/images/agenda/evento-2.jpg',
  },
  {
    id: 'evento-3',
    month: 'outubro',
    startsAt: '2026-10-31T09:00:00-03:00',
    title: 'Tudo que você deveria saber sobre IA',
    speakers: 'Achilles, Carlos Tabosa & Convidados',
    link: 'https://www.sympla.com.br/evento/tudo-que-voce-deveria-saber-sobre-ia-mas-ainda-nao-te-contaram/3629324',
    image: '/images/agenda/evento-3.jpg',
  },
  {
    id: 'evento-4',
    month: 'novembro',
    startsAt: '2026-11-04T18:30:00-03:00',
    title: 'ESG para empresas',
    speakers: 'Gilberto de Moura',
    link: 'https://www.sympla.com.br/evento/esg-para-empresas---o-resultado-voce-percebe-no-valor-da-sua-empresa/3619054',
    image: '/images/agenda/evento-4.jpg',
  },
  {
    id: 'evento-5',
    month: 'novembro',
    startsAt: '2026-11-05T19:00:00-03:00',
    title: 'Growth Machine',
    speakers: 'Tiago Lara',
    link: 'https://www.sympla.com.br/evento/growth-machine--o-curso-pratico-para-fazer-sua-empresa-crescer/3614438',
    image: '/images/agenda/evento-5.jpg',
  },
  {
    id: 'evento-6',
    month: 'novembro',
    startsAt: '2026-11-11T19:00:00-03:00',
    title: 'Ferramentas Ágeis em Planejamento Estratégico',
    speakers: 'Gilberto de Moura',
    link: 'https://www.sympla.com.br/evento/ferramentas-Ageis-em-planejamento-estratEgico/3630862',
    image: '/images/agenda/evento-6.jpg',
  },
  {
    id: 'evento-7',
    month: 'novembro',
    startsAt: '2026-11-18T19:00:00-03:00',
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

  const trackRegistration = (event: AgendaItem) => trackAgendaAction({
    tipo: event.id === 'evento-3' ? 'Evento' : 'Curso',
    linkInscricao: event.link,
  });

  const now = Date.now();
  const eventDate = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
  });
  const eventTime = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
  });

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
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-[13px] tracking-[3px] font-[800] text-[#141414] uppercase">
              VILA TECH HUB · AGENDA 2026
            </div>
            <Link
              to="/agenda"
              className="text-xs font-bold uppercase tracking-wider text-[#141414]/70 hover:text-[#00d1d1] transition-colors inline-flex items-center gap-1.5"
            >
              ← Voltar para a Agenda Geral
            </Link>
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

        {(['novembro', 'outubro'] as const).map((month) => (
          <section key={month} aria-labelledby={month}>
            <h2 id={month} className="m-0 py-7 px-6 sm:px-10 bg-[#101010] text-white text-[26px] sm:text-[30px] font-bold scroll-mt-6 capitalize">
              {month} <span className="text-[14px] font-normal ml-3 text-white/70">2026</span>
            </h2>
            {EVENTS.filter((event) => event.month === month).map((event) => {
              const start = new Date(event.startsAt);
              const registrationClosed = start.getTime() <= now;
              const campaignImage = (
                <img
                  src={event.image}
                  alt={registrationClosed ? `Registro visual: ${event.title}` : `Campanha: ${event.title}`}
                  className="w-full h-auto block align-top m-0 transition-transform duration-500 group-hover:scale-[1.01]"
                  loading="lazy"
                />
              );

              return (
                <article key={event.id} id={event.id} className="mb-8 last:mb-0">
                  {registrationClosed ? campaignImage : (
                    <a
                      href={event.link}
                      onClick={() => trackRegistration(event)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Inscreva-se: ${event.title}`}
                      className="block leading-none m-0 p-0 overflow-hidden group"
                    >
                      {campaignImage}
                    </a>
                  )}
                  <div className="py-6 px-6 sm:px-10 pb-7 flex flex-col md:flex-row gap-5 md:gap-6 items-start md:items-center justify-between border-b border-black/5">
                    <div>
                      <time dateTime={event.startsAt} className="block text-[16px] font-[800] text-[#1b5555] mb-2">
                        {eventDate.format(start)} · {eventTime.format(start).replace(':', 'h')}
                      </time>
                      <h3 className="m-0 text-[22px] sm:text-[25px] font-bold leading-[1.2] text-[#141414]">{event.title}</h3>
                      <p className="leading-[1.5] mb-0 text-[#444] text-[15px] sm:text-[16px] mt-1">{event.speakers}</p>
                    </div>
                    {registrationClosed ? (
                      <span className="text-sm font-bold text-[#444]">Inscrições encerradas para esta data</span>
                    ) : (
                      <a
                        href={event.link}
                        onClick={() => trackRegistration(event)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Inscreva-se: ${event.title}`}
                        className="inline-block shrink-0 bg-[#ff8300] hover:bg-[#00d1d1] text-[#111] py-4 px-6 no-underline text-[16px] font-[800] whitespace-nowrap transition-all duration-200 text-center w-full md:w-auto shadow-sm"
                      >
                        Inscreva-se ↗
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </section>
        ))}

        {/* Footer */}
        <footer className="py-9 px-6 sm:px-10 pb-12 bg-[#101010] text-white text-[14px] leading-[1.7] mt-8">
          <strong className="tracking-wide">VILA TECH HUB</strong>
          <br />
          Rua Francisco José Ferreira Sampaio, 90 · Novo Centro · Itu/SP
          <br />
          <div className="flex flex-wrap gap-4 mt-2">
            <Link
              to="/"
              className="text-[#65e1e1] font-semibold hover:underline inline-block"
            >
              Conheça o Vila Tech Hub ↗
            </Link>
            <span className="text-white/30">·</span>
            <Link
              to="/agenda"
              className="text-[#65e1e1] font-semibold hover:underline inline-block"
            >
              Agenda Geral Completa ↗
            </Link>
          </div>
        </footer>
      </main>

      {/* Botão de contato rápido com suporte */}
      <WhatsAppButton />
    </div>
  );
}
