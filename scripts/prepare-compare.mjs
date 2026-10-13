// Schneidet Render/Foto-Paare für den Vorher/Nachher-Slider auf identische Größe zu (ohne Hochskalieren).
// Aufruf: node scripts/prepare-compare.mjs
import sharp from 'sharp';

const src = new URL('../src/assets/projects/', import.meta.url).pathname;
const out = new URL('../src/assets/compare/', import.meta.url).pathname;

const pairs = [
  { name: 'dentaline-klinik', render: 'dentaline-klinik/render.jpg', real: 'dentaline-klinik/gercek.jpg' },
  { name: 'lobi', render: 'lobi/render.jpg', real: 'lobi/gercek.jpg' },
  { name: 'dis-cephe-on', render: 'dis-cephe/on-render.jpg', real: 'dis-cephe/on-gercek.jpg' },
  { name: 'dis-cephe-aci', render: 'dis-cephe/aci-render.jpg', real: 'dis-cephe/aci-gercek.jpg' },
];

// Einheitliche Größe (Seitenverhältnis 5:6) für alle Paare: die kleinste gemeinsame, damit nichts hochskaliert wird
const sizes = await Promise.all(
  pairs.flatMap((pair) => [pair.render, pair.real]).map((path) => sharp(src + path).metadata()),
);
const height = Math.min(...sizes.map((size) => Math.min(size.height, Math.floor((size.width * 6) / 5))));
const width = Math.floor((height * 5) / 6);

for (const pair of pairs) {
  for (const kind of ['render', 'real']) {
    await sharp(src + pair[kind])
      .resize({ width, height, fit: 'cover', position: 'centre' })
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(`${out}${pair.name}-${kind}.jpg`);
  }
  console.log(pair.name, `${width}x${height}`);
}
