// QA-Screenshots aller Seiten in 390 px und 1440 px Breite.
// Aufruf: npm run build && npm run preview (in zweitem Terminal) && node scripts/screenshots.mjs [--slices] [filter]
import { chromium } from 'playwright';
import { mkdir, readFile, rm } from 'node:fs/promises';
import sharp from 'sharp';

const base = process.env.BASE_URL ?? 'http://localhost:4321';
const out = new URL('../screenshots/', import.meta.url).pathname;
const slices = process.argv.includes('--slices');
const filter = process.argv.slice(2).find((arg) => !arg.startsWith('--'));

const sitemap = await readFile(new URL('../dist/sitemap-0.xml', import.meta.url), 'utf8');
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
paths.push('/404.html');

const name = (path) => (path === '/' ? 'home' : path.replace(/^\/|\/$|\.html$/g, '').replaceAll('/', '_'));

// Schutz davor, versehentlich ein anderes lokales Projekt auf demselben Port zu fotografieren
const probe = await fetch(base).then((response) => response.text());
if (!probe.includes('yilmazkan')) {
  console.error(`${base} does not serve this site – set BASE_URL to the preview URL`);
  process.exit(1);
}

await mkdir(out, { recursive: true });
if (slices) {
  await rm(out + 'slices', { recursive: true, force: true });
  await mkdir(out + 'slices', { recursive: true });
}

const browser = await chromium.launch();
let problems = 0;

for (const width of [390, 1440]) {
  const context = await browser.newContext({
    viewport: { width, height: width === 390 ? 844 : 900 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  page.on('response', (response) => {
    if (response.status() >= 400 && !response.url().endsWith('/404.html')) {
      problems++;
      console.log(`  HTTP ${response.status()}: ${response.url()}`);
    }
  });
  page.on('pageerror', (error) => console.log(`  page error: ${error.message}`));

  for (const path of paths) {
    if (filter && !name(path).includes(filter)) continue;
    await page.goto(base + path, { waitUntil: 'networkidle' });
    // einmal durchscrollen, damit lazy geladene Bilder da sind
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => document.fonts.ready);

    const report = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      broken: [...document.images].filter((img) => img.getAttribute('src') && (!img.complete || img.naturalWidth === 0)).map((img) => img.src),
      // Bilder, die größer als ihr Original dargestellt werden (bei DPR 1)
      upscaled: [...document.images]
        .filter((img) => img.naturalWidth && img.clientWidth > Number(img.getAttribute('width')) + 1)
        .map((img) => `${img.getAttribute('width')}px shown at ${img.clientWidth}px: ${img.alt}`),
    }));
    const issues = [
      report.overflow > 0 && `horizontal overflow ${report.overflow}px`,
      ...report.broken.map((src) => `broken image ${src}`),
      ...report.upscaled.map((text) => `upscaled ${text}`),
    ].filter(Boolean);
    problems += issues.length;
    console.log(`${width} ${path}${issues.length ? '\n  ' + issues.join('\n  ') : ''}`);

    const file = `${out}${name(path)}-${width}.png`;
    await page.screenshot({ path: file, fullPage: true });

    if (slices) {
      const { height } = await sharp(file).metadata();
      const step = width === 390 ? 1500 : 1300;
      for (let top = 0, i = 1; top < height; top += step, i++) {
        await sharp(file)
          .extract({ left: 0, top, width, height: Math.min(step, height - top) })
          .jpeg({ quality: 80 })
          .toFile(`${out}slices/${name(path)}-${width}-${String(i).padStart(2, '0')}.jpg`);
      }
    }
  }
  await context.close();
}

await browser.close();
console.log(problems ? `\n${problems} problem(s) found` : '\nno layout problems detected');
