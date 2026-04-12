import { chromium } from 'playwright';
import { mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const DEV_URL = 'http://localhost:22690';
const DIST_ASSETS = resolve(ROOT, 'artifacts/franck-nathie/dist/public/assets');
const OUTPUT_DIR = resolve(ROOT, 'artifacts/franck-nathie/public');

const PAGES = [
  { route: '/', filename: 'accueil.html', title: 'Accueil – Franck Nathie' },
  { route: '/qui-suis-je', filename: 'qui-suis-je.html', title: 'Qui suis-je – Franck Nathie' },
  { route: '/dpae', filename: 'la-dpec.html', title: 'La DPEC – Franck Nathie' },
  { route: '/articles/blessures', filename: 'article-blessures.html', title: 'Les blessures – Franck Nathie' },
  { route: '/coming-soon', filename: 'coming-soon.html', title: 'Bientôt disponible – Franck Nathie' },
];

const SECTIONS = [
  { selector: '[data-testid="section-hero"]',          filename: 'section-1-hero.html',               title: 'Section Hero – Franck Nathie' },
  { selector: '[data-testid="section-why-therapy"]',   filename: 'section-2-pourquoi-therapie.html',  title: 'Section Pourquoi une thérapie – Franck Nathie' },
  { selector: '[data-testid="section-inner-wound"]',   filename: 'section-3-blessure-interieure.html',title: 'Section Blessure intérieure – Franck Nathie' },
  { selector: '[data-testid="section-healing-process"]',filename: 'section-4-comment-guerir.html',    title: 'Section Comment guérir – Franck Nathie' },
  { selector: '[data-testid="section-dpec-intro"]',    filename: 'section-5-therapie-dpec.html',      title: 'Section Thérapie DPEC – Franck Nathie' },
  { selector: '.py-8.bg-white.flex.justify-center',    filename: 'section-6-transition.html',         title: 'Section Transition – Franck Nathie' },
  { selector: '[data-testid="section-moi-vs-soi"]',    filename: 'section-7-moi-vs-soi.html',         title: 'Section Moi vs Soi – Franck Nathie' },
];

// Animation pour les pages complètes (scroll-based, threshold 0.1)
const SCROLL_ANIM_JS = `(function(){
  if(!window.IntersectionObserver)return;
  function activate(el){
    el.style.transition='opacity 0.7s ease, transform 0.7s ease';
    el.style.opacity='1';
    el.style.transform='translateY(0)';
  }
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){activate(e.target);obs.unobserve(e.target);}
    });
  },{threshold:0.1});
  document.querySelectorAll('[style]').forEach(function(el){
    var s=el.getAttribute('style')||'';
    if(s.indexOf('opacity: 0')!==-1||s.indexOf('opacity:0')!==-1){
      obs.observe(el);
    }
  });
})();`;

// Animation pour les sections individuelles (threshold 0, déclenche dès le chargement)
const SECTION_ANIM_JS = `(function(){
  if(!window.IntersectionObserver)return;
  function activate(el){
    el.style.transition='opacity 0.7s ease, transform 0.7s ease';
    el.style.opacity='1';
    el.style.transform='translateY(0) scale(1)';
  }
  window.addEventListener('DOMContentLoaded',function(){
    setTimeout(function(){
      var obs=new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){activate(e.target);obs.unobserve(e.target);}
        });
      },{threshold:0});
      document.querySelectorAll('[style]').forEach(function(el){
        var s=el.getAttribute('style')||'';
        if(s.indexOf('opacity: 0')!==-1||s.indexOf('opacity:0')!==-1){
          obs.observe(el);
        }
      });
    },100);
  });
})();`;

const HTML_HEAD = (title, css) => `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Atma:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>${css}</style>
</head>`;

function getBuiltCSS() {
  const cssFiles = readdirSync(DIST_ASSETS).filter(f => f.endsWith('.css'));
  if (!cssFiles.length) throw new Error('No CSS file found in dist/public/assets/');
  console.log(`  CSS: ${cssFiles[0]}`);
  return readFileSync(resolve(DIST_ASSETS, cssFiles[0]), 'utf8');
}

async function inlineImages(page, selector = null) {
  return await page.evaluate(async (sel) => {
    const container = sel ? document.querySelector(sel) : document.body;
    if (!container) return 0;
    const allImgs = Array.from(container.querySelectorAll('img[src]'));
    let count = 0;
    for (const img of allImgs) {
      const src = img.getAttribute('src');
      if (!src || src.startsWith('data:')) continue;
      try {
        const absoluteUrl = new URL(src, window.location.href).href;
        const resp = await fetch(absoluteUrl);
        if (!resp.ok) continue;
        const buf = await resp.arrayBuffer();
        const bytes = new Uint8Array(buf);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
        const b64 = btoa(binary);
        const ct = resp.headers.get('content-type') || 'image/png';
        img.src = `data:${ct};base64,${b64}`;
        if (img.srcset) img.srcset = '';
        count++;
      } catch {}
    }
    return count;
  }, selector);
}

async function capturePage(browser, route, filename, title, builtCSS) {
  console.log(`\nCapturing ${route} → ${filename}`);
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  try {
    await page.goto(`${DEV_URL}${route}`, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(3000);

    const inlinedCount = await inlineImages(page);
    console.log(`  → Inlined ${inlinedCount} images`);
    await page.waitForTimeout(300);

    const metaDesc = await page.evaluate(
      () => document.querySelector('meta[name="description"]')?.getAttribute('content') ?? ''
    );

    let bodyHTML = await page.evaluate(() => document.body.outerHTML);
    bodyHTML = bodyHTML
      .replace(/<script\b[^>]*><\/script>/g, '')
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');

    const remainingScripts = (bodyHTML.match(/<script/g) || []).length;
    if (remainingScripts > 0) console.warn(`  WARNING: ${remainingScripts} script tag(s) remaining`);

    const unresolved = (bodyHTML.match(/\/assets\/[^\s"'`]+\.(png|jpg|jpeg|avif|webp|svg)/g) || []).length;
    if (unresolved > 0) console.warn(`  WARNING: ${unresolved} unresolved /assets/ refs`);

    const standalone = `${HTML_HEAD(title, builtCSS)}
${bodyHTML}
<script>${SCROLL_ANIM_JS}</script>
</html>`;

    writeFileSync(resolve(OUTPUT_DIR, filename), standalone, 'utf8');
    console.log(`  ✓ Saved ${filename} (${Math.round(standalone.length / 1024)} KB)`);
  } catch (err) {
    console.error(`  ✗ Error capturing ${route}:`, err.message);
  } finally {
    await page.close();
  }
}

async function captureSections(browser, builtCSS) {
  console.log('\n=== Capturing individual home sections ===');
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  try {
    await page.goto(`${DEV_URL}/`, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(3000);

    // Inline ALL images on the page upfront (sections share the page)
    const total = await inlineImages(page);
    console.log(`  → Inlined ${total} images across all sections`);
    await page.waitForTimeout(300);

    for (const { selector, filename, title } of SECTIONS) {
      console.log(`\n  Section: ${filename}`);

      const sectionHTML = await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        // Strip any nested script tags
        const clone = el.cloneNode(true);
        clone.querySelectorAll('script').forEach(s => s.remove());
        return clone.outerHTML;
      }, selector);

      if (!sectionHTML) {
        console.warn(`  ✗ Selector not found: ${selector}`);
        continue;
      }

      const unresolved = (sectionHTML.match(/\/assets\/[^\s"'`]+\.(png|jpg|jpeg|avif|webp|svg)/g) || []).length;
      if (unresolved > 0) console.warn(`  WARNING: ${unresolved} unresolved /assets/ refs`);

      const standalone = `${HTML_HEAD(title, builtCSS)}
<body style="margin:0;padding:0;background:#fff;">
${sectionHTML}
<script>${SECTION_ANIM_JS}</script>
</body>
</html>`;

      writeFileSync(resolve(OUTPUT_DIR, filename), standalone, 'utf8');
      console.log(`  ✓ Saved ${filename} (${Math.round(standalone.length / 1024)} KB)`);
    }
  } catch (err) {
    console.error('  ✗ Error during section capture:', err.message);
  } finally {
    await page.close();
  }
}

async function createZip(pages, sections) {
  const zipPath = resolve(OUTPUT_DIR, 'franck-nathie-pages.zip');
  if (existsSync(zipPath)) execSync(`rm "${zipPath}"`);

  const pageFiles = pages.map(p => `"${p.filename}"`).join(' ');
  const sectionFiles = sections.map(s => `"${s.filename}"`).join(' ');
  const svgFile = existsSync(resolve(OUTPUT_DIR, 'scroll-indicator.svg')) ? '"scroll-indicator.svg"' : '';

  execSync(
    `cd "${OUTPUT_DIR}" && /home/runner/.nix-profile/bin/zip -j "${zipPath}" ${pageFiles} ${sectionFiles} ${svgFile}`,
    { stdio: 'inherit' },
  );
  return zipPath;
}

async function main() {
  console.log('=== Franck Nathie — Static HTML Export (no React runtime) ===');
  console.log(`Source: ${DEV_URL}`);
  console.log(`Output: ${OUTPUT_DIR}`);

  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log('\nLoading built CSS...');
  const builtCSS = getBuiltCSS();
  console.log(`  CSS size: ${Math.round(builtCSS.length / 1024)} KB`);

  const browser = await chromium.launch({
    headless: true,
    executablePath: '/home/runner/.nix-profile/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    console.log('\n=== Capturing full pages ===');
    for (const { route, filename, title } of PAGES) {
      await capturePage(browser, route, filename, title, builtCSS);
    }
    await captureSections(browser, builtCSS);
  } finally {
    await browser.close();
  }

  console.log('\nCreating ZIP archive...');
  const zipPath = await createZip(PAGES, SECTIONS);
  const zipSizeMB = Math.round(readFileSync(zipPath).length / 1024 / 1024);
  console.log(`\n✓ All done! ZIP: ${zipPath} (${zipSizeMB} MB)`);

  console.log('\nValidation — Pages:');
  for (const { filename } of PAGES) {
    const html = readFileSync(resolve(OUTPUT_DIR, filename), 'utf8');
    const scripts = (html.match(/<script\b/g) || []).length;
    const unresolved = (html.match(/\/assets\/[^\s"'`]+\.(png|jpg|jpeg|avif|webp|svg)/g) || []).length;
    console.log(`  ${filename}: scripts=${scripts}, unresolved=${unresolved}, css=${html.includes('<style>')}, atma=${html.includes('Atma')}`);
  }
  console.log('\nValidation — Sections:');
  for (const { filename } of SECTIONS) {
    if (!existsSync(resolve(OUTPUT_DIR, filename))) { console.log(`  ${filename}: MISSING`); continue; }
    const html = readFileSync(resolve(OUTPUT_DIR, filename), 'utf8');
    const scripts = (html.match(/<script\b/g) || []).length;
    const unresolved = (html.match(/\/assets\/[^\s"'`]+\.(png|jpg|jpeg|avif|webp|svg)/g) || []).length;
    console.log(`  ${filename}: scripts=${scripts}, unresolved=${unresolved}, css=${html.includes('<style>')}`);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
