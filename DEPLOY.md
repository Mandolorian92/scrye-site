# Deploying the site

The site is a plain static folder. No build step — any static host works.
Below are three common paths, then the DNS records each needs.

> Note: you'll need to create your own hosting account and manage your own DNS.
> This guide gives you the values to paste; it can't enter passwords, tokens, or
> change DNS on your behalf.

---

## Adding the images first

Save image files into `assets/` with these exact names and they'll appear
automatically. Use images you have the right to use, and keep them compressed
(~1600px wide, under ~400 KB each) so the page stays fast.

| Save as | Used for |
|---------|----------|
| `assets/hero.jpg` | Hero background (faint, behind the orb) |
| `assets/edge.jpg` | Offline / edge section |
| `assets/band.jpg` | Mid-page image band |
| `assets/showcase.jpg` | Showcase panel |

---

## Option A — drag-and-drop host (easiest, no command line)

1. Sign up with a static host that supports manual deploys.
2. Create a new site and drag the site folder onto the upload area.
   You get a temporary URL immediately.
3. In the site's domain settings, add your custom domain.
4. Add the DNS records the host shows you (see below). HTTPS is automatic once
   DNS resolves.

## Option B — DNS-integrated host

If your DNS is already managed by your host's provider, adding a custom domain
can wire the records for you automatically.

## Option C — static hosting from a Git repo

Push the folder to a repository and enable static hosting on the branch. Add a
custom-domain file if the host requires one, then add the DNS records below.

---

## DNS records (add these at your registrar / DNS provider)

Exact targets depend on the host, but the shape is always:

- **Apex / root domain**: an `A` record (or `ALIAS`/`ANAME` if supported),
  pointing at the IP(s) your host specifies.
- **`www` subdomain**: a `CNAME` record pointing at the host-provided target.

Notes:
- TTL: default/auto is fine. Propagation: minutes to a few hours.
- HTTPS/SSL is issued automatically by most hosts once DNS resolves.
- Pick one canonical host (apex **or** www) and redirect the other.
