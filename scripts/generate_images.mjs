import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { Resvg } from '@resvg/resvg-js';

// 1. Render OG Image PNG
const ogSvgPath = path.resolve('public/og-image.svg');
const ogSvg = fs.readFileSync(ogSvgPath, 'utf8');

const ogResvg = new Resvg(ogSvg, {
  fitTo: {
    mode: 'width',
    value: 1200
  }
});
const ogPngData = ogResvg.render();
const ogPngBuffer = ogPngData.asPng();
fs.writeFileSync(path.resolve('public/og-image.png'), ogPngBuffer);
console.log('✅ Generated public/og-image.png (1200x630)');

// 2. Render Favicon PNGs
const favSvgPath = path.resolve('public/favicon.svg');
const favSvg = fs.readFileSync(favSvgPath, 'utf8');

const sizes = [
  { name: 'favicon.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-16x16.png', size: 16 }
];

for (const { name, size } of sizes) {
  const resvg = new Resvg(favSvg, {
    fitTo: {
      mode: 'width',
      value: size
    }
  });
  const pngData = resvg.render();
  fs.writeFileSync(path.resolve(`public/${name}`), pngData.asPng());
  console.log(`✅ Generated public/${name} (${size}x${size})`);
}

// 3. Render Multi-resolution Favicon ICO
try {
  execSync(
    `python3 -c "from PIL import Image; Image.open('public/favicon.png').save('public/favicon.ico', format='ICO', sizes=[(16,16),(32,32),(48,48),(64,64)])"`,
    { stdio: 'inherit' }
  );
  console.log('✅ Generated public/favicon.ico (multi-resolution 16x16, 32x32, 48x48, 64x64)');
} catch (err) {
  console.error('Failed to generate favicon.ico:', err);
  process.exit(1);
}

