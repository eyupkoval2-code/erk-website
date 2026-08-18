# Changelog

Semantic versioning. Newest first. See `CLAUDE.md` for the commit and version workflow.

## 1.3.0 — 2026-08-17

### Removed
- **The Electronic Warfare page is gone.** `erk-ew.html` deleted along with its five
  images (`ew-hardware.jpg`, `ew-uav.jpg`, `threat-*.png`). With it went the operational
  record section and the threat-assessment illustrations.
- Every reference removed: primary navigation and both footer columns on all four
  remaining pages, the ERK EW product card on the home page, the "System of interest"
  option on the contact form, and the cross-link at the foot of the Systems page.

### Changed
- Home page now reads "Four platforms, built to work together".
- The first capability-domain card is ERK SHIELD alone again; its copy no longer
  references the strategic EW layer.
- The ecosystem "Neutralise" row no longer mentions wide-area GNSS denial.
- Systems page CTA points at the ecosystem section instead of the EW page.

## 1.2.1 — 2026-08-17

### Deployment
- Published. Repository made public, GitHub Pages enabled on `main` at the root, custom
  domain **erkdefense.com** attached. `CNAME` is now tracked in the repository.
- `https_enforced` cannot be enabled: Cloudflare proxies the domain, so GitHub cannot
  complete certificate validation. Visitors are served Cloudflare's certificate, and
  HTTP does not redirect to HTTPS. `www.erkdefense.com` returns GitHub's 404 for the
  same reason — GitHub only answers for the exact configured host. Both are fixed by
  turning the Cloudflare proxy off, or by handling redirect and SSL on Cloudflare.

## 1.2.0 — 2026-08-17

### Changed
- **Removed the graphic logo mark.** The brand is now the ERK wordmark alone, in the header
  and footer of all five pages. The mast/signal SVG is gone; the hamburger and contact
  icons are untouched.
- Favicon replaced with an ERK wordmark so the browser tab no longer shows the mark that
  was removed from the site.
- Dropped the now-dead `.brand svg` rule.

## 1.1.3 — 2026-08-17

### Changed
- Home page ERK GRID card: image now fills its frame edge to edge. The plate carries the
  image's own 366:298 aspect ratio with `.plate.bleed`, so nothing is stretched and nothing
  is cropped — but `grid-unit.png` is only 366×298, so it is upscaled 1.4–1.5× on desktop
  and 2.3× around 900 px. A larger source is still the real fix.

## 1.1.2 — 2026-08-17

### Changed
- Home hero image replaced with `newone.png` (457×584, transparent). Installed
  byte-for-byte, no processing.

## 1.1.1 — 2026-08-17

### Changed
- Home hero image swapped for `shieldana-arkaplansiz.png`, supplied with its alpha channel
  already cut. Installed byte-for-byte, no processing. Replaces the version keyed locally
  in 1.1.0.
- `.hero-media img` max-height raised 520 → 560 px (410 px on mobile) so the product keeps
  the same visual weight: the new file carries transparent padding the previous one did not,
  and 584 px of native height leaves the headroom.

## 1.1.0 — 2026-08-17

### Changed
- **Home hero rebuilt as a two-column layout.** The product render now sits beside the
  headline as a real `<img>` with alt text, replacing the full-bleed background photograph
  and its gradient scrim. The image is `shield-mast-cutout.png` — the ERK SHIELD fixed
  platform with its white studio background removed.
- Removed `shield-mast-hero.jpg`; no longer referenced anywhere.

### Notes
- The cutout was keyed at a **pure-white (255) threshold**, not the usual near-white one.
  This image's radome peaks at 252–254 while the background is exactly 255, so the tighter
  threshold separates them; the dome's own 255 specular highlight survives because it is
  enclosed by 252–254 dome pixels that a border-seeded flood fill cannot cross. A near-white
  threshold erases half the dome — do not "simplify" this back.

## 1.0.0 — 2026-08-17

First release, published to GitHub Pages.

### Pages
- **Home** — hero over the SHIELD mast photograph, three capability domains, five-product
  grid, detect/identify/neutralise/communicate/monitor ecosystem chain, production and
  support, Intelligence Suite teaser.
- **Systems** — ERK SHIELD, TRACE, WATCH and GRID on one page with a sticky module
  switcher and stable anchors (`#shield`, `#trace`, `#watch`, `#grid`). Consolidated from
  four separate pages to cut the primary navigation from seven items to four.
- **Electronic Warfare** — threat assessment with illustrations cropped from the deck,
  GNSS-denial capability, specifications, operational record, production and support.
- **Intelligence Suite** — OSINT / image search / ADINT at full depth: per-module figures,
  capability lists, source and signal coverage, nine investigation flows, combined flow,
  deployment and supply conditions. `noindex` and disallowed in `robots.txt`.
- **Contact** — structured enquiry form that composes a `mailto:` message client-side,
  plus direct email and phone.

### Technical
- Static HTML, CSS and vanilla JavaScript. No build step, no framework, no dependencies.
- Zero third-party requests. IBM Plex Sans + IBM Plex Mono self-hosted as woff2, shipping
  only the weights in use, split by `unicode-range` so `latin-ext` loads on demand.
  Three files preloaded per page.
- Contact form transmits nothing to the site; it prepares a message in the visitor's own
  email client.
- Verified at 1400 / 980 / 768 / 560 / 375 px: no horizontal overflow, no broken images,
  no image upscaled past its natural resolution, no aspect-ratio distortion, all internal
  links and anchors resolve.

### Notes
- Product imagery replaced with high-resolution sources supplied by ERK; several images
  were cropped or had their studio background keyed out. Details in `README.md`.
- Two wordings depart deliberately from the source decks, and two categories of deck
  material were held back. Both documented in `README.md`.
