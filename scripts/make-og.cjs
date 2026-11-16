// Renders public/og.png (1200×630), the image shown when the site is shared.
// Run with: node scripts/make-og.cjs
const path = require('path');
const { chromium } = require('playwright');

const html = `<!doctype html><html><body style="margin:0">
<div style="width:1200px;height:630px;background:#0d1b2a;color:#f6f1e7;font-family:Georgia,serif;display:flex;flex-direction:column;justify-content:center;padding:0 90px;box-sizing:border-box;position:relative;overflow:hidden">
  <svg viewBox="0 0 520 400" width="620" style="position:absolute;right:-40px;bottom:-30px;opacity:.9">
    <path d="M40 360h110v-80h110v-80h110v-80h110" fill="none" stroke="#ffb703" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="480" cy="120" r="20" fill="#ffb703"/>
  </svg>
  <div style="display:flex;align-items:center;gap:18px;font-size:34px">
    <svg viewBox="0 0 40 40" width="56" height="56"><rect width="40" height="40" rx="10" fill="#ffb703"/><path d="M8 30h7v-6h7v-6h7v-6h4" fill="none" stroke="#0d1b2a" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="33" cy="12" r="2.6" fill="#0d1b2a"/></svg>
    <span>Learning<b>ForSuccess</b></span>
  </div>
  <div style="font-size:76px;font-weight:700;line-height:1.08;margin-top:44px;max-width:780px;letter-spacing:-1px">Learn How to Learn. Then Watch Your Grades Follow.</div>
</div></body></html>`;

(async () => {
  const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(html);
  await page.screenshot({ path: path.join(__dirname, '..', 'public', 'og.png') });
  await browser.close();
  console.log('Wrote public/og.png');
})();
