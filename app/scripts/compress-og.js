import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function compress() {
  const recepcaoIn = path.resolve(__dirname, '../public/images/imgs_coworking/recepcao.png');
  const recepcaoOut = path.resolve(__dirname, '../public/images/imgs_coworking/recepcao-og.jpg');
  
  await sharp(recepcaoIn)
    .resize(1200, 630, { fit: 'cover' })
    .jpeg({ quality: 80 })
    .toFile(recepcaoOut);
    
  console.log('Compressed recepcao.png -> recepcao-og.jpg');

  const tecladoIn = path.resolve(__dirname, '../public/images/plataforma_educacional/teclado-neon.png');
  const tecladoOut = path.resolve(__dirname, '../public/images/plataforma_educacional/teclado-neon-og.jpg');
  
  await sharp(tecladoIn)
    .resize(1200, 630, { fit: 'cover' })
    .jpeg({ quality: 80 })
    .toFile(tecladoOut);
    
  console.log('Compressed teclado-neon.png -> teclado-neon-og.jpg');
}

compress().catch(console.error);
