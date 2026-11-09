import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { routes, generateStaticSEO } from '../scripts/postbuild-seo.js';
import { canonicalUrl } from '../src/lib/seo-url.ts';

test('canonical metadata consolidates protocol, host, query, fragment and slash variants', () => {
  for (const input of [
    'http://vilatechub.com.br/coworking/?gclid=example#cotacao',
    'https://preview.vercel.app/coworking?utm_source=test',
    'http://localhost:5173/coworking/', '/coworking',
  ]) assert.equal(canonicalUrl(input), 'https://www.vilatechub.com.br/coworking');
  assert.equal(canonicalUrl('https://vilatechub.com.br/?gclid=example#home'), 'https://www.vilatechub.com.br/');
});

test('every public route ships distinct metadata and a matching sitemap without JS', () => {
  const distDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vth-seo-'));
  const base = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  try {
    fs.writeFileSync(path.join(distDir, 'index.html'), base);
    generateStaticSEO(distDir);
    const sitemap = fs.readFileSync(path.join(distDir, 'sitemap.xml'), 'utf8');
    const unescape = s => s.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&lt;', '<').replaceAll('&gt;', '>');
    const htmlRoutes = [...fs.readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8').matchAll(/<Route path="([^"*]+)"/g)]
      .map(m => m[1]).filter(p => p.startsWith('/') && !p.startsWith('/admin') && !p.startsWith('/doacao-'));
    assert.deepEqual(routes.map(r => r.path).sort(), htmlRoutes.sort());
    for (const route of routes) {
      const html = fs.readFileSync(path.join(distDir, route.path.slice(1), 'index.html'), 'utf8');
      const metas = [...html.matchAll(/<meta (name|property)="([^"]+)" content="([^"]*)"/g)];
      for (const [name, value] of [['description', route.description], ['og:description', route.description], ['twitter:description', route.description], ['og:url', 'https://www.vilatechub.com.br' + route.path]]) {
        const found = metas.filter(m => m[2] === name);
        assert.equal(found.length, 1, route.path + ': ' + name);
        assert.equal(unescape(found[0][3]), value);
      }
      assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
      assert.ok(html.includes(`href="https://www.vilatechub.com.br${route.path}"`));
      assert.ok(sitemap.includes(`<loc>https://www.vilatechub.com.br${route.path}</loc>`));
      assert.equal(html.match(/<script>[\s\S]*?<\/script>/)[0], base.match(/<script>[\s\S]*?<\/script>/)[0], 'Tracking remains unchanged');
      assert.equal(html.slice(html.indexOf('<body>')), base.slice(base.indexOf('<body>')), 'Visible app remains unchanged');
      assert.ok(!html.includes('noindex'));
    }
    assert.ok(!sitemap.includes('/admin'));
    assert.ok(!sitemap.includes('/doacao-sucesso'));
  } finally { fs.rmSync(distDir, { recursive: true, force: true }); }
});
