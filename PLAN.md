# Sections Fine Meats: website plan

Status: **UX direction awaiting approval.** No code until it's approved.

Mockup (desktop + mobile): https://claude.ai/artifact/8iCqy9aPERB3bT1WopbpHT

## What we know

- Specialty butcher, 333 E 17th St, Suite 22, Costa Mesa CA 92627 · (949) 432-5120
- Hours (Birdeye, verify): Mon–Sat 10–7, Sun 10–5
- 4.8★ on Birdeye (77 reviews); Yelp count still to confirm (Yelp blocked automated reads)
- Known for dry-aged ribeye and T-bone, and sausage and charcuterie made from their own trim
- Birdies Bodega (produce, bread, pantry) runs inside the shop on its own Toast page
- Online ordering already runs on Toast: order.toasttab.com/online/sectionsfinemeats
- **sectionsfm.com is their current site, hosted on Wix.** It returns 404 to automated tools (which is why early research missed it) but loads in a browser. Instagram's bio link points straight at Toast. Moving the domain to Vercel means changing DNS away from Wix.
- Instagram: about 3.3k followers; its most recent visible post is from July 2024.

## UX direction (for approval): "Butcher Ticket"

- **Look:** near-black "meat case" background, butcher-paper cream sections, one oxblood accent.
  Tall condensed display type (Big Shoulders Display) in the style of old butcher signs, Inter for body text,
  and mono "price ticket" labels (JetBrains Mono).
- **Conversion first:** "Order for pickup" (Toast) sits in the top nav, the hero, and the Visit section.
  On mobile, a bar fixed to the bottom of the screen offers Call / Directions / Order.
- **Homepage order:** hours strip → hero → "In the case this week" → three pillars (dry-aged / nothing wasted / cut your way)
  → Birdies Bodega → reviews → Instagram grid → Visit (map, hours) → footer.
- **Photos are the brand.** Every photo box is a placeholder for the shop's own photos. The site should not use stock images.

## Traffic plan (built into the site)

1. Pages with their own URLs that target local searches: `/dry-aged-steak-costa-mesa`, `/sausage-charcuterie`,
   `/menu`, `/visit`, `/birdies-bodega`. Each gets a unique title, meta description and H1.
2. `ButcherShop` / `LocalBusiness` JSON-LD with address, geo coordinates, hours, phone, `hasMenu` and `sameAs` (Yelp, Instagram).
3. Static HTML, a Lighthouse score of 95+, and sizes tuned for mobile (most local searches are on phones).
4. Open Graph images, a sitemap and robots.txt; an FAQ block on the Visit page (parking, custom orders, catering).
5. "In the case this week" is edited from one JSON file, so the owner can freshen it every week.
   Regular updates help search ranking.

**Owner tasks (outside the code, but they drive most of the traffic):** point sectionsfm.com at the new site;
claim and update the Google Business Profile with the website link; change the Instagram and Yelp website links;
post weekly; ask happy customers for Google reviews.

## Stack

Astro (static output) with plain CSS custom properties for the design tokens.
Content lives in `src/content/*.json`, and the site deploys to Netlify or Vercel (free tier).
No backend is needed, because ordering stays on Toast.

## Implementation with parallel agents

Each agent gets a model sized to its job and owns its own files, so no two agents edit the same file.

| Phase | Agent | Model | Owns | Depends on |
|---|---|---|---|---|
| 0 | Orchestrator (this session) | Opus | Astro scaffold, `tokens.css`, `BaseLayout`, `Header`, `Footer`, `Button`, `StickyBar`, `PhotoSlot`, content JSON schemas | none |
| 1A | Home page | Sonnet | `src/pages/index.astro`, `src/components/home/*` | Phase 0 |
| 1B | Category pages | Sonnet | `src/pages/{dry-aged-steak-costa-mesa,sausage-charcuterie,menu,birdies-bodega}.astro`, `src/components/category/*` | Phase 0 |
| 1C | SEO and Visit page | Haiku | `src/pages/visit.astro`, `src/components/seo/*` (JSON-LD, meta), `public/robots.txt`, sitemap config | Phase 0 |
| 1D | Content fill | Haiku | `src/content/*.json` (hours, cuts, pillars, FAQ, review slots), `public/og/*` | Phase 0 schemas |
| 2 | QA | Sonnet | Read-only: Lighthouse and accessibility checks at 375px, 768px and 1440px, link check; reports issues | 1A–1D |
| 3 | Final review and fixes | Opus (this session) | Fixes from QA, deploy config | 2 |

Why it's split this way: Opus does the shared design-system work, where a mistake would spread to every page.
Sonnet builds the visual page sections. Haiku does the mechanical work (schema markup, meta tags, JSON data entry).
Phases 1A–1D run at the same time.

## Needed from the owner before launch

- Logo files (if any), and 15–30 photos: cuts, the case, the counter, staff, the bodega
- Real prices and aging days, or approval to hide prices and link to Toast instead
- Permission to quote 3 reviews
- Access to the domain registrar and the Google Business Profile

## Menu (from Toast, captured 2026-11-08)

- Saved in `src/content/menu.json` (7 sections, about 100 items). The `/menu` page and the homepage "From the kitchen" section both read from this file.
- Toast lists sandwiches, the kitchen menu, pantry items, cheese, butter and produce, but **no raw cuts of meat**.
  Confirm with the owner whether the counter cuts should get their own list on the site.
- Toast showed "Currently not accepting online orders" when checked. Confirm online ordering is turned on before launch.
- Veggie sandwich is listed at $8, which looks low; confirm it. Some Toast items have no description; ask the owner for copy.

## Build status (2026-11-08)

Built: 7 pages (home, /menu, /dry-aged-steak-costa-mesa, /sausage-charcuterie, /birdies-bodega, /visit, 404), sitemap, robots.txt,
ButcherShop + Menu + FAQPage JSON-LD. QA pass done; no horizontal scroll at 375px on any page.

Run locally: `export PATH=$HOME/.local/node/bin:$PATH && npm run dev`

### Deploy to Vercel
1. Push this folder to a GitHub repo.
2. vercel.com → Add New Project → import the repo. Vercel detects Astro; no settings needed.
3. Add the domain sectionsfm.com in Project → Domains and update DNS at the registrar.

### Before launch (owner)
- Photos: every photo box is an empty striped placeholder until real images are added (put them in `public/` and pass `src` to PhotoSlot).
- Instagram tiles: add 6 post images and links to `src/content/instagram.json`.
- Reviews: add 3 real, approved quotes to `src/content/reviews.json` (set `placeholder: false`). Until then the section shows a "Read reviews on Yelp" button.
- Confirm the map pin, then add `geo` back to the JSON-LD. Add the review count to `site.rating`.
- Search the code for `CONFIRM:` comments; each one asks a factual question.
- Turn on Toast online ordering ("Currently not accepting online orders").
