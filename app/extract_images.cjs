const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'public', 'images', 'agenda');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Copiar a foto real do Tabosa já existente no projeto se houver
const tabosaLocal = path.join(__dirname, 'public', 'images', 'coworking', 'tabosa1.jpg');
if (fs.existsSync(tabosaLocal)) {
  fs.copyFileSync(tabosaLocal, path.join(outDir, 'carlos-tabosa.jpg'));
  console.log('Copied carlos-tabosa.jpg from coworking/tabosa1.jpg');
}

