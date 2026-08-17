# ERK Defense website — working notes

Static marketing site for ERK Defense (electronic warfare, counter-drone, signal
intelligence, tactical communications). Plain HTML, CSS and vanilla JavaScript.
No build step, no framework, no package manager.

Repository: `https://github.com/eyupkoval2-code/erk-website` (private)
Live: GitHub Pages, `main` branch, `/` root.

---

## Commit and version workflow

**Every change gets its own commit.** Do not batch unrelated edits.

1. Make the change.
2. Verify it (see *Verification* below). Do not commit unverified layout changes.
3. Bump `VERSION` using semantic versioning:
   - **patch** (1.0.x) — copy fixes, image swaps, styling corrections, bug fixes
   - **minor** (1.x.0) — a new page, a new section, a new component
   - **major** (x.0.0) — restructure of navigation or information architecture
4. Add an entry to the top of `CHANGELOG.md` under the new version.
5. Commit `VERSION`, `CHANGELOG.md` and the change together:

```bash
cd "C:/Users/User/Desktop/Erk/website" && git add -A && git commit -m "..." && git push
```

Commit messages: imperative subject under ~65 chars, blank line, then bullets for
anything non-obvious. End with:

```
Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
```

Push authentication is already stored in Windows Credential Manager, so `git push`
works with no prompt and no token in any file. Never write a token into a tracked
file — this repo is pushed to GitHub and anything committed goes with it.

---

## Structure

```
index.html            Home — capability domains, product grid, ecosystem, production
systems.html          SHIELD / TRACE / WATCH / GRID on one page (#shield … #grid)
erk-ew.html           Strategic electronic warfare / GNSS denial
intelligence.html     Intelligence Suite — OSINT / image search / ADINT (noindex)
contact.html          Enquiry form + direct contact
robots.txt
assets/css/site.css   Single stylesheet, all components
assets/js/site.js     Mobile nav, sticky sub-nav scroll-spy, mailto form
assets/fonts/         Self-hosted IBM Plex woff2
assets/img/
```

Header and footer markup is duplicated per page — there is no templating. **A change to
the nav or footer must be applied to all five pages.** Scripted find-and-replace across
`*.html` is the practical way; always print a per-file confirmation count afterwards.

## Hard rules

- **No third-party requests, ever.** No CDN, no Google Fonts, no analytics, no remote
  images. This is deliberate: visitor data must not reach a third party, and hosted fonts
  are a GDPR exposure for EU customers.
- **Fonts.** IBM Plex Sans + IBM Plex Mono, self-hosted. Only these weights ship:
  **sans 400 / 600 / 700, mono 400 / 600.** Using any other weight makes the browser
  synthesise it and it looks wrong — pick a shipped weight or add the woff2 file.
  Each weight has `latin` and `latin-ext` files with `unicode-range`, so Turkish and
  accented characters load on demand and English pages do not pay for them.
- **Never upscale an image.** Rendered width must not exceed the file's natural width at
  any viewport. Measure it — do not assume.
- **Never distort an image.** `object-fit: contain` letterboxes, `cover` crops; both keep
  the aspect ratio. Beware that `.split-media > img { width: 100% }` will stretch an image
  that sits directly inside it.
- **No absolute paths** (`href="/..."`). The site is served from a subpath on GitHub Pages
  and absolute paths break there.
- Do not commit the source decks or raw image drops — `.gitignore` guards against this.

## Image plate treatments

| Class | Use |
|---|---|
| `.plate` | Light grey panel |
| `.plate.white` | For shots with their own pure-white studio background |
| `.plate.dark` | For cut-out PNGs whose light parts would vanish on white |
| `.plate.bleed` | Image fills the panel edge to edge, `cover`, no padding |
| `.card-media` | Dark illustration strip at the top of a card |
| `.card-media.light` | Same, white — for white-background product shots |
| `.card-media.bleed` | Same, full-bleed `cover` — scene photos only, crops slightly |
| `.split-media.portrait` | Caps a portrait image so it is never upscaled |

## Verification

There is no test suite. Before committing anything visual, run a measurement pass in the
browser preview — start the server with `preview_start` (`erk-website` in
`.claude/launch.json`), then in the page context load each page into an iframe at
**1400 / 980 / 768 / 560 / 375** and assert:

- `documentElement.scrollWidth <= innerWidth` — no horizontal overflow
- no element's `right` exceeds `innerWidth`
- every `img` has `naturalWidth > 0` — force `loading = 'eager'` and await load first,
  or lazy images report as broken and you will chase a phantom
- for each image, compute the painted scale honouring `object-fit` and assert `<= 1.0`
  (element `getBoundingClientRect` is **not** the painted size when `object-fit` is set)
- aspect ratio preserved
- `.subnav .wrap` does not scroll horizontally (the scrollbar is hidden, so off-screen
  items would be unreachable)
- all local `href`/`src` targets resolve, and every `#anchor` matches an existing `id`

`IntersectionObserver` does not fire when the preview pane is hidden — that is why the
sub-nav scroll-spy is geometry-based instead. Do not "fix" it back to an observer.

## Content provenance

Copy comes from three decks kept outside this repo (`../ERK EW`,
`../ERK_Defense_Marketing_Deck`, `../ERK_Intelligence_Suite`). The marketing deck is the
reference for wording. Deliberate departures from it, and the material held back, are
documented in `README.md` — read that section before "correcting" anything to match a deck.

## Known gaps

- No legal entity name, registered address or company registration number anywhere.
  Several jurisdictions require an imprint and defence buyers look for it.
- `grid-unit.png` is 366×298 and is upscaled 1.5–2.3× to fill its frame. Needs a larger
  source.
- `trace-variants.png` has its labels baked into the pixels — unreadable on narrow
  screens, not translatable, not indexable. Separate per-variant images would fix it.
- No `og:image`; `robots.txt` sitemap line is still a commented placeholder.
