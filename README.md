# ERK Defense — website

Static marketing site built from the ERK product decks. Plain HTML, CSS and vanilla
JavaScript — no build step, no framework, no external requests.

## Files

```
website/
├── index.html            Home — capability domains, product grid, ecosystem, production
├── systems.html          SHIELD, TRACE, WATCH and GRID on one page (#shield … #grid)
├── erk-ew.html           Strategic electronic warfare / GNSS denial
├── intelligence.html     Intelligence Suite — capability level only, noindex
├── contact.html          Enquiry form + direct contact
├── robots.txt
└── assets/
    ├── css/site.css
    ├── js/site.js
    └── img/              Product images extracted from the decks
```

## Running locally

Open `index.html` directly in a browser, or serve the folder:

```bash
npx serve website
```

## Deploying

The site is fully static. Drag the `website` folder onto Netlify Drop, or push it to a
repository and point Vercel / Cloudflare Pages / GitHub Pages at it. No build command
and no environment variables are required.

## Deliberate technical choices

- **No external requests.** No CDN, no analytics, no hosted fonts. Typography is
  IBM Plex Sans + IBM Plex Mono, **self-hosted** from `assets/fonts/`. Using Google Fonts
  would have leaked every visitor's IP to Google — a GDPR problem for EU customers and a
  poor look for a defence site. Nothing about a visitor reaches a third party.
- **Only the weights in use are shipped**: sans 400/600/700, mono 400/600, as woff2.
  Each weight has a `latin` and a `latin-ext` file with `unicode-range` set, so an English
  page downloads five files (~99 KB) and the `latin-ext` files are fetched only if Turkish
  or accented characters actually appear. Three files are preloaded in each page head.
  If you add a CSS rule using a weight that is not on that list, the browser will fake it
  and it will look wrong — either pick a shipped weight or add the file.
- **The contact form does not post anywhere.** It composes a `mailto:` message in the
  visitor's own email client. Nothing is transmitted to or stored by the website.
  To switch to a hosted form endpoint instead, add `action="…" method="POST"` to the
  `<form id="inquiry-form">` element in `contact.html` and remove the submit handler at
  the bottom of `assets/js/site.js`. Netlify Forms only needs `netlify` and
  `name="inquiry"` attributes on the form tag.
- **`intelligence.html` carries `noindex`** and is disallowed in `robots.txt`, so it stays
  out of search results while remaining reachable from the site navigation.
- **The four tactical systems share one page.** SHIELD, TRACE, WATCH and GRID were
  originally four pages; they were merged into `systems.html` to cut the primary nav from
  seven items to four. Each keeps a stable anchor (`systems.html#shield`, `#trace`,
  `#watch`, `#grid`) so a single system can still be linked directly, and a sticky
  in-page switcher tracks the section in view. The cost is SEO: one page now competes for
  four sets of capability keywords instead of four pages competing separately. If inbound
  search ever becomes a real channel, splitting them back out is the first thing to undo —
  the superseded files are recoverable from the handover notes.

## Before going live

1. **Domain and email.** The site uses `erkdefense@protonmail.com` throughout, taken from
   the decks. A domain-based address (`sales@erkdefense.com`) reads as more established to
   a ministry procurement office; if you change it, update `contact.html`, `index.html`
   and the `data-mailto` attribute on the enquiry form.
2. **Company details.** No legal entity name, registered address, or company registration
   number appears anywhere yet — several jurisdictions require these in a site imprint,
   and defence buyers look for them. Add them to the footer.
3. **`robots.txt`.** Uncomment the sitemap line and insert the real domain.
4. **Open Graph image.** `index.html` has OG title and description but no image; add a
   1200×630 image and an `og:image` tag so shared links preview properly.

## Content notes

Copy comes from the ERK product decks, which are kept outside this repository.
Provenance detail, the deliberate departures from the deck wording, and the material
held back from the public site are recorded in `NOTES-private.md` — deliberately not
committed, because this repository is public. Read that file before "correcting"
anything on the site to match a deck.

### Images cropped out of deck slides

Several EW-deck slides are single flat images with their text baked in, so they cannot be
used as-is. The artwork was cropped out of them and the text re-set as real HTML:

| File | Source |
|---|---|
| `threat-mass-attack.png` | Threat-assessment slide — UAV and ballistic missile |
| `threat-precision.png` | Threat-assessment slide — strike drone and FPV quadcopter |
| `threat-infrastructure.png` | Threat-assessment slide — isometric facilities |
| `ew-hardware.jpg` | Solution slide — mast amplifier close-up |
| `ew-uav.jpg` | Validation slide — downed UAV photograph |
| `shield-vehicle-unit.jpg` | Marketing deck, portable-series slide — cropped in on the roof-mounted unit so the card shows equipment rather than landscape. The uncropped scene photo is still used on the home page |
| `shield-fixed.png` | Marketing deck — white studio background removed, edges feathered, transparent margins trimmed (292×564 → 182×478) |

**`shield-fixed.png` has a transparent background**, so it must sit on a dark surface —
the radome is white and disappears against a light one. It is used with
`.split-media.product` on `systems.html` and with `.plate.dark` on the home page. If you
place it anywhere new, keep the backing dark.

The background was removed by keying out every pixel at or above 232 in all three
channels. That threshold is safe for this specific image and was not guessed: a connected-
component pass showed every near-white region at that level to be background (mean
luminance ~254), while the radome — the one white-looking part of the product — is shaded
and falls below it. A gentler flood-fill from the borders was tried first and left the
white pockets enclosed by the tripod legs behind, because they are sealed off from the
edge of the frame. Re-key from the original in the decks if you ever need to redo this.

Keeping the text as HTML rather than shipping the slide images means it stays selectable,
translatable, indexable and readable at any screen width.
