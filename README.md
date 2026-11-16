# LearningForSuccess

The website for the Essentials for Learning courses (GradeBoost and the Exam
Revision Course), built for <https://www.learningforsuccess.com> and Cloudflare.

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

Either connect this repository in the Cloudflare dashboard (build command
`npm run build`, output directory `dist`), or deploy from your machine:

```bash
npm run deploy
```

Then add `www.learningforsuccess.com` as a custom domain. `public/_redirects`
already sends the bare domain to `www`.

## Where things are

| Path | What it is |
|---|---|
| `src/content/site.js` | All copy, prices, links and settings |
| `src/pages/` | One file per page |
| `src/components/` | Header, footer, path cards, forms, artwork |
| `src/styles/global.css` | Colours, type and shared styles |
| `reference/` | Our description of the reference pattern, plus one-way text fingerprints |
| `scripts/remake-report.cjs` | The audit behind `npm run report` |
