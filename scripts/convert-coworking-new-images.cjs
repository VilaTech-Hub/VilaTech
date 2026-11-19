const fs = require('fs');
const path = require('path');
const sharp = require('../app/node_modules/sharp');

const srcDir = 'Arquivos/Escolhidas finais-20261118T172750Z-1-001/Escolhidas finais';
const destDir = 'app/public/images/coworking';

const mapping = [
  { src: 'Auditorio2.jpg', dest: 'auditorio-plateia.webp', maxDim: 1600 },
  { src: 'Auditório_mesas.png', dest: 'auditorio-mesas.webp', maxDim: 1600 },
  { src: 'café 1.png', dest: 'cafe-copa.webp', maxDim: 1600 },
  { src: 'Fachada Limpa.png', dest: 'fachada-limpa.webp', maxDim: 1600 },
  { src: 'Fachada2.jpg', dest: 'fachada-angulo.webp', maxDim: 1600 },
  { src: 'Geral1.png', dest: 'estacoes-geral.webp', maxDim: 1600 },
  { src: 'Honest Mkt.jpg', dest: 'honest-market.webp', maxDim: 1600 },
  { src: 'Lounge 1.png', dest: 'lounge-convivencia.webp', maxDim: 1600 },
  { src: 'Mesas 1.png', dest: 'estacoes-mesas.webp', maxDim: 1600 },
  { src: 'Mesa_grande.jpg', dest: 'reuniao-mesa-grande.webp', maxDim: 1600 },
  { src: 'Pickup.jpg', dest: 'pickup-convivio.webp', maxDim: 1600 },
  { src: 'recepcao.jpg', dest: 'recepcao-principal.webp', maxDim: 1600 },
  { src: 'reuniao 1.png', dest: 'reuniao-executiva-1.webp', maxDim: 1600 },
  { src: 'Reuniao2.png', dest: 'reuniao-executiva-2.webp', maxDim: 1600 },
  { src: 'xicaras.jpg', dest: 'cafe-xicaras.webp', maxDim: 1600 },
];

async function convert() {
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  let totalOrig = 0;
  let totalNew = 0;

  for (const item of mapping) {
    const files = fs.readdirSync(srcDir);
    const matched = files.find(f => f.normalize('NFC') === item.src.normalize('NFC') || f === item.src);
    if (!matched) {
      console.warn(`File not found: ${item.src}`);
      continue;
    }
    const fullSrc = path.join(srcDir, matched);
    const fullDest = path.join(destDir, item.dest);

    const origSize = fs.statSync(fullSrc).size;
    totalOrig += origSize;

    const meta = await sharp(fullSrc).metadata();

    let width = meta.width;
    let height = meta.height;
    if (Math.max(width, height) > item.maxDim) {
      if (width > height) {
        height = Math.round(height * (item.maxDim / width));
        width = item.maxDim;
      } else {
        width = Math.round(width * (item.maxDim / height));
        height = item.maxDim;
      }
    }

    await sharp(fullSrc)
      .rotate()
      .resize(width, height)
      .webp({ quality: 82, effort: 6 })
      .toFile(fullDest);

    const newSize = fs.statSync(fullDest).size;
    totalNew += newSize;

    console.log(`✓ ${item.src} -> ${item.dest}: ${(origSize/1024/1024).toFixed(2)} MB -> ${(newSize/1024).toFixed(1)} KB (${width}x${height})`);
  }

  // Also update hero-poster.webp in imgs_coworking from recepcao.jpg
  const recepcaoFile = path.join(srcDir, 'recepcao.jpg');
  if (fs.existsSync(recepcaoFile)) {
    const heroPoster = 'app/public/images/imgs_coworking/hero-poster.webp';
    await sharp(recepcaoFile)
      .rotate()
      .resize(1920, 1080, { fit: 'cover' })
      .webp({ quality: 82, effort: 6 })
      .toFile(heroPoster);
    console.log(`✓ Updated hero-poster.webp (${(fs.statSync(heroPoster).size/1024).toFixed(1)} KB)`);
  }

  console.log(`\n🎉 Redução Total: ${(totalOrig/1024/1024).toFixed(2)} MB -> ${(totalNew/1024/1024).toFixed(2)} MB (Economia de ${((totalOrig - totalNew)/1024/1024).toFixed(2)} MB / ${(((totalOrig - totalNew)/totalOrig)*100).toFixed(1)}%)`);
}

convert().catch(console.error);
