import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para o diretório dist (onde ficam os arquivos gerados pelo build)
const DIST_DIR = path.resolve(__dirname, '../dist');

// Configuração das rotas e suas respectivas imagens e títulos para SEO
export const routes = [
  {
    path: '/',
    title: 'Vila Tech Hub | Ecossistema de Inovação, Coworking & Cursos em Itu',
    description: 'O coworking que conecta a comunidade da inovação, tecnologia e educação, com formações práticas em Inteligência Artificial, Gestão de Negócios, Audiovisual e Games.',
    image: 'https://www.vilatechub.com.br/images/imgs_coworking/recepcao-og.jpg'
  },
  {
    path: '/coworking',
    title: 'Coworking em Itu | Vila Tech Hub',
    description: 'Coworking, salas de reunião e auditório em Itu. Opções por hora, período, diária, pacote de horas, mês, semestre ou ano. Solicite uma cotação.',
    image: 'https://www.vilatechub.com.br/images/imgs_coworking/recepcao-og.jpg'
  },
  {
    path: '/agenda',
    title: 'Agenda Vila Tech Hub | Eventos, Cursos de IA & Tecnologia em Itu',
    description: 'Acompanhe o calendário de atividades do Vila Tech Hub em Itu, SP. Palestras, cursos de Inteligência Artificial, workshops de tecnologia e eventos corporativos gratuitos e pagos.',
    image: 'https://www.vilatechub.com.br/images/agenda/evento-1.jpg'
  },
  {
    path: '/doar',
    title: 'Faça sua Doação | Instituto Vila Tech',
    description: 'Apoie o Instituto Vila Tech e transforme o futuro de jovens em vulnerabilidade social através de educação e tecnologia.',
    image: 'https://www.vilatechub.com.br/images/imgs_coworking/recepcao-og.jpg'
  },
  {
    path: '/politica-de-privacidade',
    title: 'Política de Privacidade | Instituto Cultural e Educacional Vila Tech',
    description: 'Esta política de privacidade descreve como o Instituto Cultural e Educacional Vila Tech coleta, usa e protege suas informações.',
    image: 'https://www.vilatechub.com.br/images/imgs_coworking/recepcao-og.jpg'
  },
  {
    path: '/termos-de-uso',
    title: 'Termos de Uso | Instituto Cultural e Educacional Vila Tech',
    description: 'Termos de uso do site do Instituto Cultural e Educacional Vila Tech.',
    image: 'https://www.vilatechub.com.br/images/imgs_coworking/recepcao-og.jpg'
  },
  {
    path: '/instituto',
    title: 'Instituto Vila Tech | Inovação, Tecnologia & Educação em Itu, SP',
    description: 'O Instituto Cultural e Educacional Vila Tech une inovação tecnológica, arte e desenvolvimento social em Itu, SP. Conheça nossos projetos sociais e de profissionalização.',
    image: 'https://www.vilatechub.com.br/images/instituto/ecossistema.webp'
  },
  {
    path: '/cursos',
    title: 'Cursos de IA, Gestão e Criatividade em Itu | Vila Tech Educação',
    description: 'Formação prática em Inteligência Artificial, Gestão Executiva e Criatividade + Games. Presencial, online e In Company. Vila Tech Hub, Itu/SP.',
    image: 'https://www.vilatechub.com.br/images/plataforma_educacional/teclado-neon-og.jpg'
  },
  {
    path: '/plano-aberto',
    title: 'Plano Sequência | Academia de Cinema Popular Comunitário',
    description: 'Quando a cidade se conta, ela se enxerga. Formação audiovisual para jovens: aprendizado, criação, produção e exibição.',
    image: 'https://www.vilatechub.com.br/images/projeto_captacao/cinema.webp'
  },
  {
    path: '/fiti',
    title: 'FITI — O futuro encontra lugar em Itu',
    description: 'FITI — Festival de Inovação, Criatividade e Tecnologia de Itu. Uma cidade-campus para ideias, negócios e cultura.',
    image: 'https://www.vilatechub.com.br/images/fiti/bom-jesus-mapping.webp'
  },
  {
    path: '/calendario',
    title: 'Agenda Vila Tech Hub | Outubro e Novembro 2026',
    description: 'Ideias que movem. Encontros que transformam. Cursos e encontros presenciais no Vila Tech Hub para ampliar repertórios, conectar pessoas e impulsionar negócios.',
    image: 'https://www.vilatechub.com.br/images/agenda/evento-1.jpg'
  }
];

const SITE_ORIGIN = 'https://www.vilatechub.com.br';
const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

// Match tag attributes, never the previous marketing copy. That copy changes often.
export function renderSeoHtml(baseHtml, route) {
  let html = baseHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);
  const setMeta = (name, value, attribute = 'name') => {
    const pattern = new RegExp(`<meta\\b[^>]*\\b${attribute}=["']${name}["'][^>]*>`, 'gi');
    html = html.replace(pattern, '');
    html = html.replace('</head>', `  <meta ${attribute}="${name}" content="${escapeHtml(value)}" />\n</head>`);
  };
  setMeta('description', route.description);
  setMeta('og:title', route.title, 'property');
  setMeta('og:description', route.description, 'property');
  setMeta('og:url', SITE_ORIGIN + route.path, 'property');
  setMeta('og:image', route.image, 'property');
  setMeta('twitter:title', route.title);
  setMeta('twitter:description', route.description);
  setMeta('twitter:image', route.image);
  html = html.replace(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi, '');
  return html.replace('</head>', `  <link rel="canonical" href="${SITE_ORIGIN}${route.path}" />\n</head>`);
}

export function generateStaticSEO(distDir = DIST_DIR) {
  const indexPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexPath)) throw new Error('index.html não encontrado. Rode o build primeiro.');
  const baseHtml = fs.readFileSync(indexPath, 'utf-8');
  for (const route of routes) {
    const routeDir = path.join(distDir, route.path.substring(1));
    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(path.join(routeDir, 'index.html'), renderSeoHtml(baseHtml, route));
    console.log(`SEO estático gerado para: ${route.path}`);
  }
  // The sitemap uses exactly the same public routes as the generated metadata.
  // Admin and donation confirmation URLs are intentionally not listed.
  const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    routes.map(route => `  <url><loc>${SITE_ORIGIN}${route.path}</loc></url>`).join('\n') +
    '\n</urlset>\n';
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) generateStaticSEO();
