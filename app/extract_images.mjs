import { readFileSync, writeFileSync } from 'fs';

const src = readFileSync('C:/Users/luan2/.gemini/antigravity/brain/402d924f-aaeb-4621-8d06-fe9741fb7b3d/.user_uploaded/media_1793288431474_44afd35c.html', 'utf8');

const regex = /src="data:image\/(jpeg|png);base64,([^"]+)"/g;
let m;
let i = 0;
while ((m = regex.exec(src)) !== null) {
  const ext = m[1] === 'jpeg' ? 'jpg' : 'png';
  const buf = Buffer.from(m[2], 'base64');
  const outPath = `c:/Users/luan2/VilaTech/app/public/images/agenda/extracted_${i}.${ext}`;
  writeFileSync(outPath, buf);
  console.log(`Salvo: extracted_${i}.${ext} (${buf.length} bytes)`);
  i++;
}
console.log('Total:', i, 'imagens');

