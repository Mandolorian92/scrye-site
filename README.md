# Scrye — marketing site

A dependency-free, multi-page marketing site. Dark "defense-tech" aesthetic,
deliberately **discreet** — it describes capability *themes* only, with no
specific use cases, formats, or doctrine. Built to WCAG 2.1 AA accessibility
practices, with privacy/terms/accessibility pages and discreet, ITAR/EAR-aware
disclosures (see the footer + legal pages).

> **"Scrye" is a placeholder name** pending your naming research.
> See [Rebranding](#rebranding) for the one-step swap.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Home: hero, capabilities, approach, terrain band, principles, About, contact. |
| `about.html` | About Us + founder bio. |
| `privacy.html` | Privacy Policy. |
| `terms.html` | Terms of Use (incl. disclaimers, limitation of liability, export control). |
| `accessibility.html` | Accessibility Statement (WCAG 2.1 AA commitment). |
| `styles.css` | All styling. One accent color, set in `:root` (`--accent`). |
| `main.js` | Nav behavior, scroll reveals, contact form. No dependencies. |
| `assets/favicon.svg` | Tab icon (concentric-rings mark). |
| `assets/terrain-mesh.svg` | Abstract terrain visual (home image band). |
| `assets/coverage.svg` | Abstract sensor/scan motif (spare graphic). |
| `assets/founder.svg` | Founder monogram placeholder — swap for a real headshot. |

No build step, no framework, no CDN calls, no trackers, no web-font loads —
nothing leaves the visitor's browser except (optionally) the contact email.
All imagery is original SVG (no stock photos = no licensing risk).

## Preview locally

Just open `index.html` in a browser, or serve the folder:

```powershell
# from the website/ directory
python -m http.server 8080
# then visit http://localhost:8080
```

> Tip: after editing `styles.css`, do a hard refresh (Ctrl+F5) — browsers cache
> CSS aggressively on plain static servers. Production hosts handle this for you.

## Rebranding

The name appears as the literal string **`Scrye`** everywhere. To rename:

1. Find-replace `Scrye` → `YourName` across **all `.html` files** (and this README).
2. Replace the email placeholders `contact@scrye.example` and
   `careers@scrye.example` across all `.html` files, and `CONTACT_EMAIL` in `main.js`.
3. (Optional) Swap the logo mark — the inline `<svg class="brand__mark">` in
   each page and `assets/favicon.svg`.

Uppercase styling (nav, footer) is handled by CSS `text-transform`, so the
source string stays consistent — a single find-replace is enough.

## Common edits

- **Accent color** — `--accent` / `--accent-hi` in `styles.css` `:root`.
- **Copy** — all in `index.html`; sections are commented (`HERO`, `CAPABILITIES`, …).
- **Hide from search engines** (stealth) — in `index.html`, swap the robots meta
  for `<meta name="robots" content="noindex, nofollow" />`.
- **Contact form** — currently composes a `mailto:` (no server needed). To post
  to a real endpoint (e.g. Formspree, your own API), replace the body of
  `handleSubmit()` in `main.js`.

## Legal & compliance — placeholders you MUST fill before publishing

The legal pages are solid, conventional boilerplate, **not legal advice.** Have
counsel review them and your export-control posture before going live. Search all
`.html` files for these bracketed tokens and replace them:

| Placeholder | Replace with |
|-------------|--------------|
| `[Company Legal Name]` | Your registered entity (e.g. "Scrye Systems, LLC"). |
| `[State]` | Governing-law U.S. state (Terms → *Governing law*). |
| `[County / State]` | Venue for disputes (Terms → *Governing law*). |
| `contact@scrye.example` | Your real contact inbox. |
| Effective date `June 8, 2026` | Date you publish (Privacy / Terms / Accessibility). |

What's already handled for you:

- **Privacy** — the site uses no cookies, analytics, or third-party scripts, and
  the contact form is `mailto:` (no server-side data collection), which keeps the
  privacy story simple and truthful. *If you wire a real form backend, update the
  Privacy Policy to describe what you then collect and store.*
- **Disclaimers** — forward-looking/illustrative, no-offer, "as is", limitation of
  liability, IP/trademark, and export-control notices are in the footer + Terms.
- **Truthful claims** — copy is vague/thematic by design, which also lowers
  false-advertising risk. Keep it that way after edits.

## Accessibility (ADA / WCAG 2.1 AA)

Implemented: semantic landmarks + heading order, skip link, keyboard focus styles,
`prefers-reduced-motion` support, AA color contrast (incl. a lightened `--text-dim`),
alt text on meaningful images (decorative graphics hidden from assistive tech),
labeled form controls, and links that don't rely on color alone. The Accessibility
Statement targets WCAG 2.1 AA. For a compliance *guarantee*, commission a formal
third-party audit — automated + manual screen-reader testing.

## Deploy

It's a static folder — host it anywhere:

- **Netlify / Vercel / Cloudflare Pages** — drag-and-drop the `website/` folder.
- **GitHub Pages** — push the folder; enable Pages on the branch.
- **S3 + CloudFront** — `aws s3 sync website/ s3://your-bucket` and front with CloudFront.

## Notes on discretion

The copy was written to be **publicly releasable**: it names no platforms,
formats, doctrine, or mission specifics. Before going live, have whoever owns
export-control compliance review the final text — the footer states the site
carries general information only, which should remain true after any edits.
