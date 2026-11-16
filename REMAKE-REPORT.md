# Remake report

**REMAKE COMPLETE** — 43 of 43 checks passed.

- Reference pattern: https://www.storybrand.com (home page), read 2026-11-16
- Built site: 10 pages for https://www.learningforsuccess.com
- Generated: 2026-11-16 05:54 UTC by `npm run report`

This report is written by `scripts/remake-report.cjs`, which loads every built page in a real browser. The verdict covers the build. Content still waiting on the site owner is listed at the end and does not affect it.

## A · Structure matches the reference pattern

| | Check | Detail |
|---|---|---|
| ✅ | All ten sections present, in the reference order | found: header → hero → trust → paths → plan → showcase → lead-magnet → testimonials → closing → footer |
| ✅ | Header: sticky, logo links home, one primary button |  |
| ✅ | Header: three or more dropdown groups, every link has a descriptor | Courses (2), For Schools (1), Resources (3) |
| ✅ | Hero: dark, eyebrow, one H1, problem line, solution line |  |
| ✅ | Hero: primary button jumps to the paths | /#paths |
| ✅ | Trust strip sits inside the hero with a label and 3+ names | 4 names |
| ✅ | Paths: exactly three cards, each with audience, name, text, price line and button |  |
| ✅ | Paths: one-line aside for visitors who fit none of the three |  |
| ✅ | Plan: dark section, H2, exactly three steps, button repeated |  |
| ✅ | Showcase: 5+ numbered items, each with image, tag, title and button | 5 items |
| ✅ | Showcase: counter, arrows and one tab per item |  |
| ✅ | Lead magnet: cover, H2, email field and submit button |  |
| ✅ | Testimonials: H2 and 3+ cards labelled by customer type | 3 cards |
| ✅ | Closing: dark, "next step" eyebrow, H2 and the three paths repeated |  |
| ✅ | Footer: logo, 2+ link columns, legal links, copyright line |  |

## B · Interactions work

| | Check | Detail |
|---|---|---|
| ✅ | Desktop: dropdown opens on click and closes on Escape |  |
| ✅ | Showcase: one item shown at a time; arrows, tabs and counter all move it |  |
| ✅ | Hero button scrolls to the paths, clear of the sticky header |  |
| ✅ | Without JavaScript every showcase item is still readable |  |
| ✅ | Mobile: menu button opens the navigation, groups expand, Escape closes it |  |
| ✅ | Contact form pre-selects the topic passed in the link |  |

## C · Every link goes somewhere

| | Check | Detail |
|---|---|---|
| ✅ | All 14 distinct internal links and anchors resolve |  |
| ✅ | Outbound links go only to the owner's own sites | https://www.essential-music-practice.com, https://www.essential-music-theory.com |
| ✅ | Unknown addresses get the custom 404 page |  |

## D · Works on every screen size

| | Check | Detail |
|---|---|---|
| ✅ | No sideways scrolling on any of 10 pages at 360, 768, 1280px |  |
| ✅ | Every button and menu link is at least 44px tall on a phone |  |

## E · Accessible

| | Check | Detail |
|---|---|---|
| ✅ | Language, one H1, heading order, landmarks, skip link, names and labels on every page |  |
| ✅ | All text meets WCAG AA colour contrast |  |

## F · Original, not copied

| | Check | Detail |
|---|---|---|
| ✅ | No six-word run of text shared with the reference (1224 fingerprints compared) |  |
| ✅ | No reference brand names anywhere in the built pages |  |
| ✅ | No fonts, images or scripts loaded from the reference site |  |

## G · Ready for search and sharing

| | Check | Detail |
|---|---|---|
| ✅ | Title, description, canonical address and sharing tags on every page |  |
| ✅ | Sitemap lists every page on the www address |  |
| ✅ | robots.txt present and points at the sitemap |  |
| ✅ | Favicon and 1200×630 sharing image present |  |

## H · Ready for Cloudflare

| | Check | Detail |
|---|---|---|
| ✅ | Pure static build in dist/ with index.html and 404.html |  |
| ✅ | _headers sets security headers and long-term caching for assets |  |
| ✅ | _redirects sends the bare domain to www |  |
| ✅ | wrangler.jsonc points at dist/ so `npm run deploy` works |  |
| ✅ | Nothing loaded from other servers (fonts are self-hosted) |  |

## I · Fast

| | Check | Detail |
|---|---|---|
| ✅ | Home page under 400 KB in total | 210 KB over 8 requests (fonts 136 KB, CSS 32 KB) |
| ✅ | Under 20 KB of JavaScript files | 0 KB |

## J · No errors

| | Check | Detail |
|---|---|---|
| ✅ | No browser console errors on any page |  |

## Waiting on the site owner (19)

Each of these shows a red "Draft" tag on the page. They are blanks, not invented content. Fill them in `src/content/site.js`.

- Confirm qualifications — /
- Price to confirm — /, /exam-revision/, /gradeboost/
- Sign-up form not connected to an email provider yet. — /, /free-guide/
- Student testimonial to add — /
- Parent testimonial to add — /
- Teacher testimonial to add — /
- Social links to add — /, /404.html, /about/, /contact/, /exam-revision/, /free-guide/, /gradeboost/, /privacy/, /schools/, /terms/
- Draft biography written from your profile — please check every line and add a photo. — /about/
- Photo of Simon to add — /about/
- Contact form not connected yet — add an endpoint in src/content/site.js. — /contact/
- Contact email to add — /contact/
- Checkout not connected yet, so this button goes to the contact page. — /exam-revision/, /gradeboost/
- Draft unit list — replace with the real Revision Course units. — /exam-revision/
- Answer to add — /exam-revision/, /gradeboost/
- Confirm the free guide exists (title, PDF) and connect the sign-up form to your email provider. — /free-guide/
- Draft unit list — replace with the real GradeBoost units. — /gradeboost/
- Privacy Policy text to be supplied before launch. This page is a holder so the footer link works. — /privacy/
- Draft offer — confirm what the schools package includes. — /schools/
- Terms of Use text to be supplied before launch. This page is a holder so the footer link works. — /terms/

The whole site also carries a "do not index" tag while `draft: true` is set in `src/content/site.js`, so search engines ignore it until launch.

---

REMAKE COMPLETE
