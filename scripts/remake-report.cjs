// Remake audit. Run with: npm run report
//
// Serves the built site from ./dist, opens every page in a real browser and
// checks it against the section pattern in reference/structure.json, plus
// behaviour, links, mobile layout, accessibility, originality, SEO, weight and
// Cloudflare readiness. Writes REMAKE-REPORT.md.
//
// The verdict is "REMAKE COMPLETE" only when every check passes. Content the
// site owner still has to supply (prices, testimonials…) is listed separately:
// it does not block the build verdict, but it does block launch.
const fs = require('fs');
const path = require('path');
const http = require('http');
const { shingles, hash } = require('./lib-text.cjs');

let chromium;
try { ({ chromium } = require('playwright')); } catch {
  console.error('This audit needs Playwright: npm i -D playwright && npx playwright install chromium');
  process.exit(2);
}

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const reference = JSON.parse(fs.readFileSync(path.join(ROOT, 'reference', 'structure.json'), 'utf8'));
const fingerprint = JSON.parse(fs.readFileSync(path.join(ROOT, 'reference', 'shingles.json'), 'utf8'));
let SITE_HOST = ''; // read from src/content/site.js at start-up
const BANNED = [/storybrand/i, /donald\s+miller/i, /business made simple/i];
const WIDTHS = [360, 768, 1280];

const results = [];
const check = (group, name, pass, detail = '') => results.push({ group, name, pass: !!pass, detail: String(detail) });

// ── tiny static server ───────────────────────────────────────────────────────
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json' };
function serve() {
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    let file = path.join(DIST, p);
    if (!file.startsWith(DIST)) { res.writeHead(403).end(); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) {
      res.writeHead(404, { 'content-type': TYPES['.html'] });
      res.end(fs.readFileSync(path.join(DIST, '404.html')));
      return;
    }
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' });
    res.end(fs.readFileSync(file));
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

function listPages() {
  const out = [];
  (function walk(dir) {
    for (const f of fs.readdirSync(dir)) {
      const full = path.join(dir, f);
      if (fs.statSync(full).isDirectory()) walk(full);
      else if (f === 'index.html') out.push('/' + path.relative(DIST, dir).split(path.sep).join('/') + (dir === DIST ? '' : '/'));
    }
  })(DIST);
  if (fs.existsSync(path.join(DIST, '404.html'))) out.push('/404.html');
  return out.sort();
}

(async () => {
  if (!fs.existsSync(path.join(DIST, 'index.html'))) { console.error('No build found. Run: npm run build'); process.exit(2); }
  const { site } = await import(require('url').pathToFileURL(path.join(ROOT, 'src', 'content', 'site.js')).href);
  SITE_HOST = new URL(site.url).host;
  const server = await serve();
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
  const pages = listPages();
  const placeholders = [];
  const shotsDir = path.join(ROOT, 'report', 'screens');
  fs.mkdirSync(shotsDir, { recursive: true });

  // ── A · Structure parity (home page) ───────────────────────────────────────
  {
    const G = 'A · Structure matches the reference pattern';
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(base + '/', { waitUntil: 'networkidle' });
    const s = await page.evaluate(() => {
      const q = (sel, root = document) => root.querySelector(sel);
      const qa = (sel, root = document) => [...root.querySelectorAll(sel)];
      const sec = (id) => q(`[data-section="${id}"]`);
      const order = qa('[data-section]').map((e) => e.dataset.section);
      const cardInfo = (root) => qa('[data-path]', root).map((c) => ({
        audience: !!q('.path__audience', c)?.textContent.trim(), title: !!q('h3', c)?.textContent.trim(),
        text: !!q('.path__text', c)?.textContent.trim(), price: !!q('.path__price', c), cta: !!q('a.btn[href]', c),
      }));
      return {
        order,
        header: {
          sticky: getComputedStyle(sec('header')).position === 'sticky',
          logoHome: q('[data-section="header"] a.logo')?.getAttribute('href') === '/',
          groups: qa('.nav-group').map((g) => ({ label: q('button', g).textContent.trim(), items: qa('.nav-panel a', g).length, notes: qa('.nav-panel__note', g).filter((n) => n.textContent.trim()).length })),
          cta: !!q('.site-nav__cta[href]'),
        },
        hero: {
          h1: qa('h1').length, eyebrow: !!q('[data-section="hero"] .eyebrow'), problem: !!q('.hero__problem')?.textContent.trim(), solution: !!q('.hero__solution')?.textContent.trim(),
          ctaHref: q('.hero__actions a.btn')?.getAttribute('href'), dark: sec('hero').classList.contains('section--dark'),
        },
        trust: { inHero: !!q('[data-section="hero"] [data-section="trust"]'), label: !!q('.trust__label')?.textContent.trim(), items: qa('.trust__list li').length },
        paths: { h2: !!q('[data-section="paths"] h2'), cards: cardInfo(sec('paths')), aside: !!q('.paths__aside a[href]') },
        plan: { dark: sec('plan').classList.contains('section--dark'), h2: !!q('[data-section="plan"] h2'), steps: qa('[data-section="plan"] .step').length, cta: !!q('[data-section="plan"] a.btn') },
        showcase: {
          h2: !!q('[data-section="showcase"] h2'),
          panels: qa('[data-panel]').map((p) => ({ art: !!q('svg, img', p), tag: !!q('.showcase__tag', p), num: !!q('.showcase__num', p), h3: !!q('h3', p), cta: !!q('a.btn[href]', p) })),
          tabs: qa('[data-tab]').length, counter: !!q('[data-current]'), arrows: !!q('[data-prev]') && !!q('[data-next]'),
        },
        lead: { h2: !!q('[data-section="lead-magnet"] h2'), cover: !!q('.lead__cover'), email: !!q('[data-section="lead-magnet"] input[type="email"]'), submit: !!q('[data-section="lead-magnet"] button[type="submit"]') },
        testimonials: sec('testimonials') ? { h2: !!q('[data-section="testimonials"] h2'), cards: qa('[data-section="testimonials"] figure').length, grouped: qa('[data-section="testimonials"] .quote__group').length } : null,
        closing: { dark: sec('closing').classList.contains('section--dark'), eyebrow: !!q('[data-section="closing"] .eyebrow'), h2: !!q('[data-section="closing"] h2'), cards: cardInfo(sec('closing')) },
        footer: { logo: !!q('[data-section="footer"] a.logo'), columns: qa('[data-section="footer"] nav').length, legal: qa('.site-footer__legal a').length, copyright: /©\s*\d{4}/.test(sec('footer').textContent) },
      };
    });
    const want = reference.sections.map((x) => x.id);
    check(G, 'All ten sections present, in the reference order', JSON.stringify(s.order) === JSON.stringify(want), `found: ${s.order.join(' → ')}`);
    check(G, 'Header: sticky, logo links home, one primary button', s.header.sticky && s.header.logoHome && s.header.cta);
    check(G, 'Header: three or more dropdown groups, every link has a descriptor', s.header.groups.length >= 3 && s.header.groups.every((g) => g.items > 0 && g.items === g.notes), s.header.groups.map((g) => `${g.label} (${g.items})`).join(', '));
    check(G, 'Hero: dark, eyebrow, one H1, problem line, solution line', s.hero.dark && s.hero.eyebrow && s.hero.h1 === 1 && s.hero.problem && s.hero.solution);
    check(G, 'Hero: primary button jumps to the paths', s.hero.ctaHref === '/#paths', s.hero.ctaHref);
    check(G, 'Trust strip sits inside the hero with a label and 3+ names', s.trust.inHero && s.trust.label && s.trust.items >= 3, `${s.trust.items} names`);
    const full = (c) => c.audience && c.title && c.text && c.price && c.cta;
    check(G, 'Paths: exactly three cards, each with audience, name, text, price line and button', s.paths.h2 && s.paths.cards.length === 3 && s.paths.cards.every(full));
    check(G, 'Paths: one-line aside for visitors who fit none of the three', s.paths.aside);
    check(G, 'Plan: dark section, H2, exactly three steps, button repeated', s.plan.dark && s.plan.h2 && s.plan.steps === 3 && s.plan.cta);
    check(G, 'Showcase: 5+ numbered items, each with image, tag, title and button', s.showcase.h2 && s.showcase.panels.length >= 5 && s.showcase.panels.every((p) => p.art && p.tag && p.num && p.h3 && p.cta), `${s.showcase.panels.length} items`);
    check(G, 'Showcase: counter, arrows and one tab per item', s.showcase.counter && s.showcase.arrows && s.showcase.tabs === s.showcase.panels.length);
    check(G, 'Lead magnet: cover, H2, email field and submit button', s.lead.h2 && s.lead.cover && s.lead.email && s.lead.submit);
    check(G, 'Testimonials: H2 and 3+ cards labelled by customer type', s.testimonials && s.testimonials.h2 && s.testimonials.cards >= 3 && s.testimonials.grouped === s.testimonials.cards, s.testimonials ? `${s.testimonials.cards} cards` : 'section missing');
    check(G, 'Closing: dark, "next step" eyebrow, H2 and the three paths repeated', s.closing.dark && s.closing.eyebrow && s.closing.h2 && s.closing.cards.length === 3 && s.closing.cards.every(full));
    check(G, 'Footer: logo, 2+ link columns, legal links, copyright line', s.footer.logo && s.footer.columns >= 2 && s.footer.legal >= 2 && s.footer.copyright);
    await page.screenshot({ path: path.join(shotsDir, 'home-desktop.png'), fullPage: true });
    await page.close();
  }

  // ── B · Behaviour ──────────────────────────────────────────────────────────
  {
    const G = 'B · Interactions work';
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(base + '/', { waitUntil: 'networkidle' });
    const btn = page.locator('.nav-group__btn').first();
    const panel = page.locator('.nav-panel').first();
    const before = await panel.isVisible();
    await btn.click();
    const opened = await panel.isVisible();
    await page.keyboard.press('Escape');
    const closed = !(await panel.isVisible());
    check(G, 'Desktop: dropdown opens on click and closes on Escape', !before && opened && closed);

    const visiblePanels = () => page.locator('[data-panel]:visible').count();
    const one = (await visiblePanels()) === 1;
    await page.locator('[data-next]').click();
    const afterNext = await page.locator('[data-panel].is-active').getAttribute('data-panel');
    const counter = (await page.locator('[data-current]').textContent()).trim();
    await page.locator('[data-tab="3"]').click();
    const afterTab = await page.locator('[data-panel].is-active').getAttribute('data-panel');
    await page.locator('[data-prev]').click();
    const afterPrev = await page.locator('[data-panel].is-active').getAttribute('data-panel');
    check(G, 'Showcase: one item shown at a time; arrows, tabs and counter all move it', one && afterNext === '1' && counter === '02' && afterTab === '3' && afterPrev === '2' && (await visiblePanels()) === 1);

    await page.locator('.hero__actions a.btn').first().click();
    await page.waitForTimeout(900);
    const inView = await page.evaluate(() => { const r = document.getElementById('paths').getBoundingClientRect(); return r.top >= 0 && r.top < innerHeight / 2; });
    check(G, 'Hero button scrolls to the paths, clear of the sticky header', inView);
    await page.close();

    const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });
    const p2 = await noJs.newPage();
    await p2.goto(base + '/', { waitUntil: 'load' });
    check(G, 'Without JavaScript every showcase item is still readable', (await p2.locator('[data-panel]:visible').count()) >= 5);
    await noJs.close();

    const mobile = await browser.newPage({ viewport: { width: 390, height: 800 } });
    await mobile.goto(base + '/', { waitUntil: 'networkidle' });
    const navHidden = !(await mobile.locator('.site-nav').isVisible());
    await mobile.locator('.menu-toggle').click();
    const navShown = await mobile.locator('.site-nav').isVisible();
    await mobile.locator('.nav-group__btn').first().click();
    const linkShown = await mobile.locator('.nav-panel a').first().isVisible();
    await mobile.keyboard.press('Escape');
    const navClosed = !(await mobile.locator('.site-nav').isVisible());
    check(G, 'Mobile: menu button opens the navigation, groups expand, Escape closes it', navHidden && navShown && linkShown && navClosed);
    await mobile.screenshot({ path: path.join(shotsDir, 'home-mobile.png'), fullPage: true });
    await mobile.close();

    const contact = await browser.newPage();
    await contact.goto(base + '/contact/?about=schools', { waitUntil: 'networkidle' });
    check(G, 'Contact form pre-selects the topic passed in the link', (await contact.locator('#c-about').inputValue()) === 'schools');
    await contact.close();
  }

  // ── C–J · every page ───────────────────────────────────────────────────────
  const allLinks = new Map(); // href → [pages]
  const issues = { overflow: [], taps: [], a11y: [], contrast: [], console: [], thirdParty: [], overlap: [], banned: [], meta: [] };
  let homeWeight = null;

  for (const route of pages) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const requests = [];
    page.on('console', (m) => { if (m.type() === 'error') issues.console.push(`${route}: ${m.text()}`); });
    page.on('pageerror', (e) => issues.console.push(`${route}: ${e.message}`));
    page.on('response', async (r) => { try { requests.push({ url: r.url(), type: r.request().resourceType(), size: (await r.body()).length }); } catch { /* aborted */ } });
    await page.goto(base + route, { waitUntil: 'networkidle' });

    for (const r of requests) if (!r.url.startsWith(base) && !r.url.startsWith('data:')) issues.thirdParty.push(`${route}: ${r.url}`);
    if (route === '/') {
      const sum = (t) => requests.filter((r) => t.includes(r.type)).reduce((a, r) => a + r.size, 0);
      homeWeight = { total: requests.reduce((a, r) => a + r.size, 0), js: sum(['script']), css: sum(['stylesheet']), font: sum(['font']), requests: requests.length };
    }

    const info = await page.evaluate(() => {
      const qa = (sel) => [...document.querySelectorAll(sel)];
      const visible = (el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 1 && r.height > 1 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
      const name = (el) => (el.getAttribute('aria-label') || el.textContent || '').trim();
      const a11y = [];
      if (!document.documentElement.lang) a11y.push('missing lang attribute');
      if (qa('h1').length !== 1) a11y.push(`${qa('h1').length} H1 elements`);
      let last = 0;
      for (const h of qa('h1,h2,h3,h4,h5,h6')) { const l = +h.tagName[1]; if (last && l > last + 1) a11y.push(`heading jumps H${last}→H${l}: "${h.textContent.trim().slice(0, 40)}"`); last = l; }
      for (const lm of ['header', 'main', 'footer']) if (!document.querySelector(lm)) a11y.push(`no <${lm}> landmark`);
      if (!document.querySelector('a.skip[href="#main"]')) a11y.push('no skip link');
      for (const img of qa('img')) if (!img.hasAttribute('alt')) a11y.push('image without alt text');
      for (const svg of qa('svg')) if (svg.getAttribute('aria-hidden') !== 'true' && !svg.closest('[aria-hidden="true"]') && !svg.getAttribute('aria-label') && !svg.querySelector('title')) a11y.push('svg neither hidden nor named');
      for (const el of qa('a[href], button')) if (!name(el)) a11y.push(`${el.tagName.toLowerCase()} with no accessible name`);
      for (const el of qa('input, select, textarea')) if (!(el.id && document.querySelector(`label[for="${el.id}"]`)) && !el.getAttribute('aria-label')) a11y.push(`form field "${el.name}" has no label`);
      for (const b of qa('button[aria-controls]')) if (!document.getElementById(b.getAttribute('aria-controls'))) a11y.push('aria-controls points at a missing element');

      // Contrast (WCAG AA): text colour against the nearest solid background.
      const parse = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,/]+/).map(Number); return { r: p[0], g: p[1], b: p[2], a: p[3] === undefined ? 1 : p[3] }; };
      const lum = ({ r, g, b }) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
      const bgOf = (el) => { for (let e = el; e; e = e.parentElement) { const c = parse(getComputedStyle(e).backgroundColor); if (c && c.a > 0.95) return c; } return { r: 255, g: 255, b: 255, a: 1 }; };
      const contrast = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const seen = new Set();
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        const el = n.parentElement;
        if (!n.textContent.trim() || seen.has(el) || el.closest('svg, script, style, .sr-only, fieldset[disabled], a.skip')) continue;
        seen.add(el);
        if (!visible(el)) continue;
        const cs = getComputedStyle(el); const fg = parse(cs.color); if (!fg) continue;
        const bg = bgOf(el); const l1 = lum(fg), l2 = lum(bg);
        const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        const px = parseFloat(cs.fontSize); const large = px >= 24 || (px >= 18.66 && +cs.fontWeight >= 700);
        if (ratio < (large ? 3 : 4.5)) contrast.push(`"${n.textContent.trim().slice(0, 30)}" ${ratio.toFixed(2)}:1`);
      }

      const meta = (sel, attr = 'content') => document.querySelector(sel)?.getAttribute(attr) || '';
      return {
        a11y, contrast,
        links: qa('a[href]').map((a) => a.getAttribute('href')),
        text: document.body.innerText,
        html: document.documentElement.outerHTML,
        placeholders: [...new Set(qa('[data-placeholder]').map((e) => e.dataset.placeholder))],
        meta: { title: document.title, description: meta('meta[name="description"]'), canonical: meta('link[rel="canonical"]', 'href'), ogTitle: meta('meta[property="og:title"]'), ogImage: meta('meta[property="og:image"]'), robots: meta('meta[name="robots"]'), viewport: meta('meta[name="viewport"]'), icon: meta('link[rel="icon"]', 'href') },
      };
    });

    for (const a of info.a11y) issues.a11y.push(`${route}: ${a}`);
    for (const c of info.contrast) issues.contrast.push(`${route}: ${c}`);
    for (const href of info.links) { if (!allLinks.has(href)) allLinks.set(href, []); allLinks.get(href).push(route); }
    for (const p of info.placeholders) placeholders.push({ route, label: p });

    const mine = new Set(shingles(info.text, fingerprint.size).map(hash));
    const ref = new Set(fingerprint.hashes);
    const shared = [...mine].filter((h) => ref.has(h)).length;
    if (shared) issues.overlap.push(`${route}: ${shared} shared six-word runs`);
    for (const re of BANNED) if (re.test(info.html)) issues.banned.push(`${route}: matches ${re}`);

    const m = info.meta; const expected = `https://${SITE_HOST}${route}`;
    if (route !== '/404.html') {
      if (m.title.length < 15 || m.title.length > 70) issues.meta.push(`${route}: title is ${m.title.length} characters`);
      if (m.description.length < 50 || m.description.length > 160) issues.meta.push(`${route}: description is ${m.description.length} characters`);
      if (m.canonical !== expected) issues.meta.push(`${route}: canonical is ${m.canonical}`);
      if (!m.ogTitle || !m.ogImage.startsWith(`https://${SITE_HOST}/`)) issues.meta.push(`${route}: Open Graph tags incomplete`);
    }
    if (!m.viewport.includes('width=device-width')) issues.meta.push(`${route}: viewport meta missing`);
    if (!m.icon) issues.meta.push(`${route}: favicon link missing`);

    for (const w of WIDTHS) {
      await page.setViewportSize({ width: w, height: 800 });
      await page.waitForTimeout(60);
      const r = await page.evaluate(() => {
        const over = document.documentElement.scrollWidth - document.documentElement.clientWidth;
        const small = [...document.querySelectorAll('a.btn, button, .nav-panel a')].filter((el) => { const b = el.getBoundingClientRect(); return b.width > 1 && b.height > 1 && b.height < 44; }).map((el) => `${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 24)} (${Math.round(el.getBoundingClientRect().height)}px)`);
        return { over, small };
      });
      if (r.over > 0) issues.overflow.push(`${route} @${w}px: ${r.over}px wider than the screen`);
      if (w === 360) for (const sm of r.small) issues.taps.push(`${route}: ${sm}`);
    }
    await page.close();
  }

  // ── C · Links ──────────────────────────────────────────────────────────────
  {
    const G = 'C · Every link goes somewhere';
    const broken = []; const external = new Set(); let internal = 0;
    for (const [href, from] of allLinks) {
      if (/^(mailto:|tel:)/.test(href)) continue;
      if (/^https?:/.test(href)) { external.add(href); continue; }
      internal++;
      const [p, frag] = href.split('#');
      const clean = (p || from[0]).split('?')[0];
      const file = path.join(DIST, clean, clean.endsWith('/') ? 'index.html' : '');
      if (clean === '/404.html' && !p) { if (frag && !new RegExp(`id=["']${frag}["']`).test(fs.readFileSync(file, 'utf8'))) broken.push(href); continue; }
      if (!fs.existsSync(file)) { broken.push(`${href} (on ${from[0]})`); continue; }
      if (frag && !new RegExp(`id=["']${frag}["']`).test(fs.readFileSync(file, 'utf8'))) broken.push(`${href} — no #${frag} on that page`);
    }
    check(G, `All ${internal} distinct internal links and anchors resolve`, broken.length === 0, broken.join('; '));
    const strays = [...external].filter((u) => !/essential-music-(practice|theory)\.com/.test(u));
    check(G, 'Outbound links go only to the owner\'s own sites', strays.length === 0, strays.join(', ') || [...external].join(', '));
    const res = await fetch(base + '/no-such-page/');
    check(G, 'Unknown addresses get the custom 404 page', res.status === 404 && (await res.text()).includes('Gone Missing'));
  }

  // ── D–J summaries ──────────────────────────────────────────────────────────
  const list = (a) => a.slice(0, 8).join('; ') + (a.length > 8 ? ` … +${a.length - 8} more` : '');
  check('D · Works on every screen size', `No sideways scrolling on any of ${pages.length} pages at ${WIDTHS.join(', ')}px`, issues.overflow.length === 0, list(issues.overflow));
  check('D · Works on every screen size', 'Every button and menu link is at least 44px tall on a phone', issues.taps.length === 0, list(issues.taps));

  check('E · Accessible', 'Language, one H1, heading order, landmarks, skip link, names and labels on every page', issues.a11y.length === 0, list(issues.a11y));
  check('E · Accessible', 'All text meets WCAG AA colour contrast', issues.contrast.length === 0, list(issues.contrast));

  check('F · Original, not copied', `No six-word run of text shared with the reference (${fingerprint.count} fingerprints compared)`, issues.overlap.length === 0, list(issues.overlap));
  check('F · Original, not copied', 'No reference brand names anywhere in the built pages', issues.banned.length === 0, list(issues.banned));
  {
    const hay = fs.readdirSync(DIST, { recursive: true }).filter((f) => /\.(html|css|js)$/.test(f)).map((f) => fs.readFileSync(path.join(DIST, f), 'utf8')).join('\n');
    check('F · Original, not copied', 'No fonts, images or scripts loaded from the reference site', !/storybrand\.com|typekit|LyonDisplay/i.test(hay));
  }

  check('G · Ready for search and sharing', 'Title, description, canonical address and sharing tags on every page', issues.meta.length === 0, list(issues.meta));
  {
    const G = 'G · Ready for search and sharing';
    const sm = ['sitemap-index.xml', 'sitemap-0.xml'].map((f) => path.join(DIST, f));
    const smText = fs.existsSync(sm[1]) ? fs.readFileSync(sm[1], 'utf8') : '';
    const mustList = pages.filter((p) => p !== '/404.html');
    check(G, 'Sitemap lists every page on the www address', fs.existsSync(sm[0]) && mustList.every((p) => smText.includes(`https://${SITE_HOST}${p}`)));
    const robots = fs.existsSync(path.join(DIST, 'robots.txt')) ? fs.readFileSync(path.join(DIST, 'robots.txt'), 'utf8') : '';
    check(G, 'robots.txt present and points at the sitemap on the www address', robots.includes(`https://${SITE_HOST}/sitemap-index.xml`));
    const og = path.join(DIST, 'og.png');
    check(G, 'Favicon and 1200×630 sharing image present', fs.existsSync(path.join(DIST, 'favicon.svg')) && fs.existsSync(og) && fs.readFileSync(og).readUInt32BE(16) === 1200 && fs.readFileSync(og).readUInt32BE(20) === 630);
  }

  {
    const G = 'H · Ready for Cloudflare';
    check(G, 'Pure static build in dist/ with index.html and 404.html', fs.existsSync(path.join(DIST, 'index.html')) && fs.existsSync(path.join(DIST, '404.html')));
    const headers = fs.existsSync(path.join(DIST, '_headers')) ? fs.readFileSync(path.join(DIST, '_headers'), 'utf8') : '';
    check(G, '_headers sets security headers and long-term caching for assets', /X-Content-Type-Options/.test(headers) && /immutable/.test(headers));
    const wr = fs.existsSync(path.join(ROOT, 'wrangler.jsonc')) ? fs.readFileSync(path.join(ROOT, 'wrangler.jsonc'), 'utf8') : '';
    check(G, 'wrangler.jsonc points at dist/ so `npm run deploy` works', /"directory":\s*"\.\/dist"/.test(wr));
    check(G, 'Nothing loaded from other servers (fonts are self-hosted)', issues.thirdParty.length === 0, list(issues.thirdParty));
  }

  {
    const G = 'I · Fast';
    const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
    check(G, 'Home page under 400 KB in total', homeWeight.total < 400 * 1024, `${kb(homeWeight.total)} over ${homeWeight.requests} requests (fonts ${kb(homeWeight.font)}, CSS ${kb(homeWeight.css)})`);
    check(G, 'Under 20 KB of JavaScript files', homeWeight.js < 20 * 1024, kb(homeWeight.js));
  }

  check('J · No errors', 'No browser console errors on any page', issues.console.length === 0, list(issues.console));

  await browser.close();
  server.close();

  // ── Report ─────────────────────────────────────────────────────────────────
  const failed = results.filter((r) => !r.pass);
  const verdict = failed.length === 0 ? 'REMAKE COMPLETE' : 'REMAKE INCOMPLETE';
  const groups = [...new Set(results.map((r) => r.group))];
  const uniquePlaceholders = [...new Map(placeholders.map((p) => [p.label, p])).values()];
  const byLabel = (label) => placeholders.filter((p) => p.label === label).map((p) => p.route);

  let md = `# Remake report\n\n`;
  md += `**${verdict}** — ${results.length - failed.length} of ${results.length} checks passed.\n\n`;
  md += `- Reference pattern: ${reference.source}\n- Built site: ${pages.length} pages for https://${SITE_HOST}\n- Generated: ${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC by \`npm run report\`\n\n`;
  md += `This report is written by \`scripts/remake-report.cjs\`, which loads every built page in a real browser. The verdict covers the build. Content still waiting on the site owner is listed at the end and does not affect it.\n\n`;
  if (failed.length) { md += `## Failing checks\n\n`; for (const f of failed) md += `- **${f.name}**${f.detail ? ` — ${f.detail}` : ''}\n`; md += `\n`; }
  for (const g of groups) {
    md += `## ${g}\n\n| | Check | Detail |\n|---|---|---|\n`;
    for (const r of results.filter((x) => x.group === g)) md += `| ${r.pass ? '✅' : '❌'} | ${r.name} | ${r.detail.replace(/\|/g, '/')} |\n`;
    md += `\n`;
  }
  md += `## Waiting on the site owner (${uniquePlaceholders.length})\n\n`;
  md += `Each of these shows a red "Draft" tag on the page. They are blanks, not invented content. Fill them in \`src/content/site.js\`.\n\n`;
  for (const p of uniquePlaceholders) md += `- ${p.label} — ${[...new Set(byLabel(p.label))].join(', ')}\n`;
  md += `\nThe whole site also carries a "do not index" tag while \`draft: true\` is set in \`src/content/site.js\`, so search engines ignore it until launch.\n`;
  md += `\n---\n\n${verdict}\n`;
  fs.writeFileSync(path.join(ROOT, 'REMAKE-REPORT.md'), md);

  for (const g of groups) { console.log(`\n${g}`); for (const r of results.filter((x) => x.group === g)) console.log(`  ${r.pass ? '✓' : '✗'} ${r.name}${!r.pass && r.detail ? `\n      ${r.detail}` : ''}`); }
  console.log(`\nWaiting on the site owner: ${uniquePlaceholders.length} items (see REMAKE-REPORT.md)`);
  console.log(`\n${verdict} — ${results.length - failed.length}/${results.length} checks passed`);
  process.exit(failed.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
