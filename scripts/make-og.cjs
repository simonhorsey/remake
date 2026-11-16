// Renders public/og.png (1200×630), the image shown when the site is shared.
// Run with: node scripts/make-og.cjs
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..');
const font = (pkg, file) => fs.readFileSync(path.join(ROOT, 'node_modules', '@fontsource-variable', pkg, 'files', file)).toString('base64');

const html = `<!doctype html><html><head><style>
@font-face { font-family: 'Sans'; src: url(data:font/woff2;base64,${font('source-sans-3', 'source-sans-3-latin-wght-normal.woff2')}) format('woff2'); font-weight: 200 900; }
@font-face { font-family: 'Slab'; src: url(data:font/woff2;base64,${font('roboto-slab', 'roboto-slab-latin-wght-normal.woff2')}) format('woff2'); font-weight: 100 900; }
</style></head><body style="margin:0">
<div style="width:1200px;height:630px;background:#002442;color:#fff;font-family:Sans,sans-serif;display:flex;flex-direction:column;justify-content:center;padding:0 90px;box-sizing:border-box;position:relative;overflow:hidden">
  <div style="position:absolute;inset:0;background:radial-gradient(800px 460px at 85% 10%, rgba(0,84,153,.75), transparent 62%)"></div>
  <svg viewBox="0 0 520 400" width="620" style="position:absolute;right:-40px;bottom:-30px">
    <path d="M40 360h110v-80h110v-80h110v-80h110" fill="none" stroke="#f57e2c" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="480" cy="120" r="20" fill="#f57e2c"/>
  </svg>
  <div style="display:flex;align-items:center;gap:18px;font-size:34px;font-family:Slab,serif;position:relative">
    <svg viewBox="0 0 40 40" width="56" height="56"><rect width="40" height="40" rx="10" fill="#f57e2c"/><path d="M8 30h7v-6h7v-6h7v-6h4" fill="none" stroke="#002442" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="33" cy="12" r="2.6" fill="#002442"/></svg>
    <span>Learning<b style="font-weight:800">ForSuccess</b></span>
  </div>
  <div style="font-size:80px;font-weight:700;line-height:1.05;margin-top:44px;max-width:760px;letter-spacing:-2px;position:relative">Learn How to Learn. Then Watch Your Grades Follow.</div>
</div></body></html>`;

(async () => {
  const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(ROOT, 'public', 'og.png') });
  await browser.close();
  console.log('Wrote public/og.png');
})();
