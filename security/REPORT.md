# CVE/KEV Vulnerability Assessment — mandolorian92/scrye-site

**Generated:** 2026-11-04 · **Branch:** `security/cve-kev-scan` · **Scope:** full repository

## Executive summary

| Tier | Count |
|---|---|
| 1. KEV-listed (any severity) | **0** |
| 2. Verified/active-looking secrets | **0** |
| 3. Critical/High, EPSS ≥ 0.1 or confirmed reachable | **0** |
| 4. Remaining Critical/High with a fix available | **0** |
| 5. Everything else | **0** |
| **Total CVEs found** | **0** |

**Top 10 risks:** none. This is a static HTML/CSS/JS site with zero package manifests
— its own `main.js` says so in its header comment ("No dependencies."), confirmed by
direct inspection and by both Syft and Trivy finding nothing to catalog beyond the site's
own CI workflow. The only real supply-chain surface is the 4 GitHub Actions pinned in
`.github/workflows/deploy-pages.yml`, all checked clean against OSV's GitHub Actions
advisory database (50 tracked packages as of this scan; none of the 4 appear).

**Secrets:** 0 findings (Gitleaks, full history — 21 commits — and working tree).

**What was fixed:** nothing — there was nothing to fix.

**What needs a human decision:** one informational item, not a vulnerability — see §5.

**Open items:** same network-sandbox limitation as DATUM's assessment (KEV/EPSS/live-OSV/
Semgrep-registry feeds blocked here; the CI workflow uses the real feeds directly). See
`security/RUNBOOK.md`.

## 1. Inventory

| Item | Finding |
|---|---|
| Package manifests/lockfiles | **None.** Confirmed by manual inspection, Syft, and Trivy (`fs` scan: 0 language-specific files). |
| Dockerfiles / IaC | None. |
| CI workflow (pre-existing) | `.github/workflows/deploy-pages.yml` — GitHub Pages static deploy, pins 4 actions by **tag**, not commit SHA: `actions/checkout@v4`, `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4`. |
| Third-party runtime script | `https://cloud.umami.is/script.js` (Umami analytics), loaded live from Umami's own CDN at page-view time. Not a pinned/vendored dependency — not SCA-scannable, not a finding. See §5 for a related recommendation. |

## 2. SBOM

`security/sbom.cdx.json` — CycloneDX 1.6, 4 components, all `pkg:github/actions/...` —
the repository's actual entire dependency surface. Structurally validated.

## 3. SCA results

| Target | Tool | Result |
|---|---|---|
| The 4 pinned GitHub Actions | OSV-Scanner v2.0.2, offline DB manually downloaded from `storage.googleapis.com/osv-vulnerabilities/GitHub%20Actions/all.zip` (osv-scanner v2.0.2 has no native workflow-file extractor) | **0 advisories** (sanity-checked: `tj-actions/changed-files`, the real 2025 supply-chain-compromise action, correctly appears in the same 50-package advisory set — confirms the database is genuine, not empty/broken) |
| Whole repo | Trivy v0.58.1, `fs` scan | 0 language-specific files detected (confirms "zero manifests" independently) |

De-duplication: n/a, nothing to merge.

Raw: `security/raw/gha-advisory-check-scryesite.json`, `security/raw/trivy-scryesite.json`, `security/raw/syft-scryesite-raw.json`.

## 4. Secrets (Gitleaks v8.21.2, `--redact=100`)

| Mode | Scope | Findings |
|---|---|---|
| `detect` | Full git history (21 commits) | **0** |
| `dir` | Working tree | **0** |

Raw: `security/raw/gitleaks-scryesite-fullhistory.json`, `security/raw/gitleaks-scryesite-workingtree.json`.

## 5. SAST + config

**Semgrep 1.97.0**, local ruleset (shared with DATUM's assessment — the same
`security/raw/local-semgrep-rules.yaml`): **0 findings** across 34 files. Same registry-
unreachable caveat as DATUM's report — the real CI workflow uses `p/default` directly.

**Checkov 3.2.361** against `.github/workflows/deploy-pages.yml`: **24/24 built-in
GitHub-Actions-workflow checks passed, 0 failed** (shell-injection patterns, unsecure
commands, suspicious curl/netcat usage, top-level `permissions`). Full list of checks
run is in `security/raw/checkov-scryesite.json`.

**Informational, not a tool finding — manual review:** the 4 pinned actions
(`actions/checkout@v4` etc.) are pinned by **mutable tag**, not commit SHA. None of
Checkov's built-in checks cover this (verified by reading the actual check list — `CKV_GHA_1`
through `CKV_GHA_7` and `CKV2_GHA_1` don't include one). Pinning by tag means if `v4` were
ever repointed (by a compromised upstream account, the exact mechanism behind the 2025
`tj-actions/changed-files` incident referenced in §3), the next workflow run would silently
pull different code. This is a standard, well-known hardening recommendation — not an
active vulnerability — worth a decision, not an emergency: pin to the current commit SHA
for each action, or accept the tag-pinning convention scrye-site already uses (same as
most GitHub Pages sites).

## 6. Git host platform check

GitHub.com (confirmed) — no self-hosted version check applies.

## 7. Remediation

Nothing to remediate — zero CVEs found.

## 8. CI integration (new)

- `.github/workflows/cve-kev-scan.yml` — 3 jobs (`actions-sca`, `secrets`,
  `sast-and-config`). Does **not** modify or interfere with the existing
  `deploy-pages.yml` workflow. Fails the build on a KEV/advisory hit against the pinned
  actions, or any new secret. Same "why not a marketplace Action" design note as DATUM's
  workflow — see that repo's `cve-kev-scan.yml` header comment.
- `.github/dependabot.yml` — weekly `github-actions` updates (this repo's only real
  ecosystem).

## Acceptance criteria status

Same as DATUM's report — see that repo's `security/REPORT.md` for the shared checklist;
every item applies here vacuously (zero manifests, zero CVEs, zero secrets) except the
GitHub Actions ecosystem check, which was genuinely exercised.
