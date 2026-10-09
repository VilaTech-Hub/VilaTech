import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para o diretório dist (onde ficam os arquivos gerados pelo build)
const DIST_DIR = path.resolve(__dirname, '../dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');

// Configuração das rotas e suas respectivas imagens e títulos para SEO
const routes = [
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
    image: 'https://www.vilatechub.com.br/images/plataforma_educacional/teclado-neon.png'
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
  }
];

async function generateStaticSEO() {
  if (!fs.existsSync(INDEX_HTML_PATH)) {
    console.error('index.html não encontrado no diretório dist. Rode o build primeiro.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');

  for (const route of routes) {
    // Substitui as tags de título
    let newHtml = baseHtml.replace(
      /<title>.*?<\/title>/g,
      `<title>${route.title}</title>`
    );

    newHtml = newHtml.replace(
      /content="Vila Tech Hub \| Ecossistema de Inovação, Coworking & Cursos em Itu"/g,
      `content="${route.title}"`
    );

    // Substitui as descrições
    newHtml = newHtml.replace(
      /content="Descubra o Vila Tech Hub em Itu\/SP. Conectamos tecnologia, educação e negócios através de infraestrutura moderna de coworking, cursos práticos de IA e clube de benefícios."/g,
      `content="${route.description}"`
    );
    newHtml = newHtml.replace(
      /content="Conectamos tecnologia, educação e negócios através de infraestrutura de coworking e cursos práticos de IA."/g,
      `content="${route.description}"`
    );

    // Substitui as imagens (og:image e twitter:image)
    newHtml = newHtml.replace(
      /https:\/\/www\.vilatechub\.com\.br\/images\/imgs_coworking\/recepcao\.png/g,
      route.image
    );

    // Cria a pasta da rota no diretório dist
    const routeDir = path.join(DIST_DIR, route.path.substring(1));
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }

    // Salva o arquivo modificado como index.html dentro da pasta da rota
    fs.writeFileSync(path.join(routeDir, 'index.html'), newHtml);
    console.log(`✅ SEO estático gerado para: ${route.path}`);
  }

  console.log('🎉 Geração de SEO estático concluída!');
}

generateStaticSEO();
