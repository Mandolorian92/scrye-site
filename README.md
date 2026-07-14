# Scrye — website

A dependency-free, multi-page static marketing site. Dark, restrained aesthetic.
No build step, no framework, no CDN calls, no trackers, no web-font loads.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Home page. |
| `about.html` | About page. |
| `privacy.html` | Privacy Policy. |
| `terms.html` | Terms of Use. |
| `accessibility.html` | Accessibility Statement. |
| `styles.css` | All styling. One accent color, set in `:root` (`--accent`). |
| `main.js` | Nav behavior and scroll reveals. No dependencies. |
| `assets/` | Favicon and images. |
| `robots.txt` | Asks crawlers not to index the site. |

## Preview locally

Open `index.html` in a browser, or serve the folder:

```powershell
# from the website/ directory
python -m http.server 8080
# then visit http://localhost:8080
```

> Tip: after editing `styles.css`, do a hard refresh (Ctrl+F5) — browsers cache
> CSS aggressively on plain static servers.

## Common edits

- **Accent color** — `--accent` / `--accent-hi` in `styles.css` `:root`.
- **Copy** — all content lives in the `.html` files.
- **Search indexing** — every page carries `<meta name="robots" content="noindex, nofollow">`
  and `robots.txt` disallows all crawlers. Remove those to allow indexing.

## Accessibility

Implemented: semantic landmarks and heading order, skip link, keyboard focus styles,
`prefers-reduced-motion` support, AA color contrast, and alt text on meaningful images
(decorative graphics hidden from assistive tech). The Accessibility Statement targets
WCAG 2.1 AA.

## Deploy

It's a static folder — host it on any static host (drag-and-drop the folder, or push
it and enable static hosting on the branch).
