// Erzeugt das Open-Graph-Bild (1200×630) aus Hero-Bild + Logo → public/og.jpg
// Aufruf: node scripts/generate-og.mjs
import { chromium } from 'playwright';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const file = (path) => new URL(path, import.meta.url).href;

const html = `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8" />
<style>
  @font-face { font-family: 'Allura'; src: url('${file('../node_modules/@fontsource/allura/files/allura-latin-400-normal.woff2')}') format('woff2'); }
  @font-face { font-family: 'Jost'; font-weight: 100 900; src: url('${file('../node_modules/@fontsource-variable/jost/files/jost-latin-wght-normal.woff2')}') format('woff2'); }
  @font-face { font-family: 'Jost'; font-weight: 100 900; src: url('${file('../node_modules/@fontsource-variable/jost/files/jost-latin-ext-wght-normal.woff2')}') format('woff2'); unicode-range: U+0100-02BA, U+1E00-1E9F; }
  * { box-sizing: border-box; margin: 0; }
  body {
    width: 1200px; height: 630px; overflow: hidden; position: relative;
    font-family: 'Jost', sans-serif; color: #2B2826;
    background: linear-gradient(rgb(244 241 236 / 0.6), rgb(244 241 236 / 0.6)), url('${file('../src/assets/brand/silk-texture.jpg')}') center / cover;
  }
  .band { position: absolute; left: 0; right: 0; bottom: 96px; height: 84px; background: #7A6E68; }
  .text { position: absolute; left: 90px; top: 92px; }
  .wordmark { font-family: 'Allura', cursive; font-size: 168px; line-height: 1; }
  .tagline { display: inline-block; margin-top: -6px; padding: 10px 26px; background: #7A6E68; color: #fff; font-size: 26px; font-weight: 500; letter-spacing: 0.34em; }
  .name { margin-top: 44px; font-size: 34px; letter-spacing: 0.04em; }
  .photo { position: absolute; right: 100px; bottom: 0; width: 400px; height: 540px; border-radius: 200px 200px 0 0; object-fit: cover; object-position: top; box-shadow: 0 30px 60px -30px rgb(43 40 38 / 0.5); }
</style>
</head>
<body>
  <div class="band"></div>
  <div class="text">
    <div class="wordmark">yilmazkan</div>
    <div class="tagline">INTERIOR DESIGN</div>
    <div class="name">Ayşenur Yılmazkan</div>
  </div>
  <img class="photo" src="${file('../src/assets/brand/hero.jpg')}" alt="" />
</body>
</html>`;

const tmp = fileURLToPath(new URL('../.astro/og-template.html', import.meta.url));
await (await import('node:fs/promises')).writeFile(tmp, html);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(`file://${tmp}`);
await page.evaluate(() => document.fonts.ready);
const png = await page.screenshot({ type: 'png' });
await browser.close();

const out = fileURLToPath(new URL('../public/og.jpg', import.meta.url));
await sharp(png).jpeg({ quality: 84, mozjpeg: true }).toFile(out);
console.log('written', out);
