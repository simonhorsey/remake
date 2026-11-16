// Renders guide/guide.html to the free-guide PDF the site delivers by email.
// Run with: npm run guide
const path = require('path');
const { pathToFileURL } = require('url');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'downloads', 'quick-wins-study-guide.pdf');

(async () => {
  const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
  const page = await browser.newPage();
  await page.goto(pathToFileURL(path.join(ROOT, 'guide', 'guide.html')).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  // Fail loudly if any page's content runs past its edge or into the footer area.
  const overflow = await page.evaluate(() => [...document.querySelectorAll('.page')].map((p, i) => {
    const box = p.getBoundingClientRect();
    const footer = p.querySelector('.footer');
    const limit = footer ? footer.getBoundingClientRect().top : box.bottom;
    const lowest = Math.max(...[...p.querySelectorAll(':scope > *:not(.footer):not(svg)')].map((e) => e.getBoundingClientRect().bottom));
    return { page: i + 1, over: Math.round(lowest - limit) };
  }).filter((r) => r.over > 0));
  if (overflow.length) { console.error('Content overflows on:', JSON.stringify(overflow)); await browser.close(); process.exit(1); }

  await page.pdf({ path: OUT, format: 'A4', printBackground: true, preferCSSPageSize: true });
  if (process.argv[2]) {
    // Optional: also save one PNG per page into the given folder, for proofreading.
    await page.setViewportSize({ width: 794, height: 1123 });
    const count = await page.locator('.page').count();
    for (let i = 0; i < count; i++) await page.locator('.page').nth(i).screenshot({ path: path.join(process.argv[2], `guide-${i + 1}.png`) });
  }
  await browser.close();
  console.log('Wrote', path.relative(ROOT, OUT));
})();
