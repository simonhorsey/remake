# LearningForSuccess

The website for the Essentials for Learning courses (GradeBoost and ExamX
Revision), built for <https://www.learning-for-success.com> and Cloudflare.

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

The site deploys as a Cloudflare Worker serving static files (`wrangler.jsonc`
points at `dist/`). No domain is needed to start: Cloudflare gives it a free
`workers.dev` address.

**First build**

1. In the Cloudflare dashboard go to **Workers & Pages → Create application**
   and choose **GitHub**. Authorise Cloudflare for your GitHub account when asked.
2. Pick the `remake` repository.
3. Keep the project name as `learningforsuccess` (it must match `name` in
   `wrangler.jsonc`). Build command `npm run build`, deploy command
   `npx wrangler deploy`.
4. **Save and Deploy.** Every push to `main` rebuilds the site from then on.

**Connect the domain (when ready to launch)**

A Worker can only use a domain that Cloudflare manages, and
`learning-for-success.com` is registered through Sitejet, so:

1. Add `learning-for-success.com` as a site in Cloudflare and copy across any
   existing DNS records (especially MX records if you use email on the domain).
2. Either transfer the domain away from Sitejet (Domain Manager → Transfer gives
   you the auth code) or point its nameservers at Cloudflare.
3. On the Worker, open **Domains** and add `www.learning-for-success.com`.
4. Add a redirect rule from the bare domain to `https://www.learning-for-success.com`,
   plus a proxied DNS record for the bare domain so the rule can run.

The current Sitejet site stops being served at that address once DNS changes.

`npm run deploy` also works from your own machine once you have run
`npx wrangler login`.

## Where things are

| Path | What it is |
|---|---|
| `src/content/site.js` | All copy, prices, links and settings |
| `src/pages/` | One file per page |
| `src/components/` | Header, footer, path cards, forms, artwork |
| `src/styles/global.css` | Colours, type and shared styles |
| `reference/` | Our description of the reference pattern, plus one-way text fingerprints |
| `scripts/remake-report.cjs` | The audit behind `npm run report` |
