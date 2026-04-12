import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SCREENSHOTS_DIR = resolve(ROOT, 'screenshots');

const DEV_URL = 'http://localhost:22690';

const PAGES = [
  { route: '/',                       filename: 'page-accueil.jpg',          label: 'Accueil' },
  { route: '/qui-suis-je',            filename: 'page-qui-suis-je.jpg',      label: 'Qui suis-je' },
  { route: '/dpae',                   filename: 'page-dpec.jpg',             label: 'La DPEC c\'est quoi' },
  { route: '/boutique',               filename: 'page-boutique.jpg',         label: 'Boutique' },
  { route: '/boutique/stage-guerison',filename: 'page-produit-stage.jpg',    label: 'Produit - Stage de guérison' },
  { route: '/boutique/jeu-gai-rire',  filename: 'page-produit-jeu.jpg',      label: 'Produit - Jeu Gai-Rire' },
  { route: '/articles/blessures',     filename: 'page-article-blessures.jpg',label: 'Article 12 blessures' },
];

mkdirSync(SCREENSHOTS_DIR, { recursive: true });

const browser = await chromium.launch({
  executablePath: '/home/runner/.nix-profile/bin/chromium',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const context = await browser.newContext({
  viewport: { width: 1280, height: 900 },
});

for (const page of PAGES) {
  const p = await context.newPage();
  console.log(`📸 Capture pleine page : ${page.label} (${page.route})`);
  try {
    await p.goto(`${DEV_URL}${page.route}`, { waitUntil: 'networkidle', timeout: 30000 });
    // Attendre que les images et polices soient chargées
    await p.waitForTimeout(2000);
    // Scroll pour déclencher les animations
    await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await p.waitForTimeout(1000);
    await p.evaluate(() => window.scrollTo(0, 0));
    await p.waitForTimeout(500);
    // Capture pleine page
    await p.screenshot({
      path: resolve(SCREENSHOTS_DIR, page.filename),
      fullPage: true,
      type: 'jpeg',
      quality: 85,
    });
    console.log(`  ✅ Sauvegardé : screenshots/${page.filename}`);
  } catch (err) {
    console.error(`  ❌ Erreur sur ${page.route} : ${err.message}`);
  }
  await p.close();
}

await browser.close();
console.log('\n✅ Toutes les captures pleine page sont prêtes dans screenshots/');
