# LearningForSuccess

The website for the Essentials for Learning courses (GradeBoost and the Exam
Revision Course), built for <https://www.learning-for-success.com> and Cloudflare.

It follows the section pattern of the StoryBrand home page — hero, three paths,
three-step plan, numbered showcase, free guide, testimonials, closing paths —
with original design, wording and artwork. Nothing from the reference site is
reused; `npm run report` proves it on every run.

## Change the words

Everything you can read on the site lives in one file: **`src/content/site.js`**.
Prices, testimonials, links, form endpoints and FAQs are all there.

While `draft: true` is set, anything still waiting on you shows a red "Draft"
tag on the page and search engines are told not to index the site. Fill a blank
in and its tag goes. Set `draft: false` to launch.

## Run it

```bash
npm install
```

```bash
npm run dev
```

## Check it

```bash
npm run report
```

Builds the site, opens every page in a real browser and writes
`REMAKE-REPORT.md`. The last line reads `REMAKE COMPLETE` only when every check
passes. It needs Playwright (`npm i -D playwright && npx playwright install chromium`).

## Put it on Cloudflare

1. In the Cloudflare dashboard, create a Pages project from this repository:
   build command `npm run build`, output directory `dist`.
2. Connect the domain. It is registered through Sitejet, so pick one route:

   **A. Move the domain's DNS to Cloudflare (recommended).** Add
   `learning-for-success.com` as a site in Cloudflare, copy across any existing
   DNS records (especially MX records if you use email on the domain), then
   either transfer the domain away from Sitejet (Domain Manager → Transfer gives
   you the auth code) or point its nameservers at Cloudflare. Add both
   `www.learning-for-success.com` and `learning-for-success.com` as custom
   domains on the Pages project, then create a Bulk Redirect in Cloudflare from
   the bare domain to `https://www.learning-for-success.com`.

   **B. Leave DNS at Sitejet.** Add `www.learning-for-success.com` as a custom
   domain on the Pages project first, then create a CNAME record for `www` at
   Sitejet pointing to `<your-project>.pages.dev`. Only `www` works this way;
   the bare domain cannot point at Cloudflare without route A.

Either way the current Sitejet site stops being served at that address once DNS
changes. The bare-domain redirect is a Cloudflare dashboard setting: a
`_redirects` file cannot do it.

`npm run deploy` is also available if you prefer to publish from your own
machine with Wrangler.

## Where things are

| Path | What it is |
|---|---|
| `src/content/site.js` | All copy, prices, links and settings |
| `src/pages/` | One file per page |
| `src/components/` | Header, footer, path cards, forms, artwork |
| `src/styles/global.css` | Colours, type and shared styles |
| `reference/` | Our description of the reference pattern, plus one-way text fingerprints |
| `scripts/remake-report.cjs` | The audit behind `npm run report` |
