# RUNBOOK — reproducing the CVE/KEV scan locally

scrye-site has no package manifests, so this is much shorter than DATUM's runbook (see
`Mandolorian92/DATUM`'s `security/RUNBOOK.md` if you're also running that one — tool
versions/install methods are identical).

## Tool versions used (2026-11-04)

Same as DATUM: OSV-Scanner v2.0.2, Trivy v0.58.1, Syft (latest/v1.18.1), Gitleaks v8.21.2,
Semgrep 1.97.0, Checkov 3.2.361. Install methods are in DATUM's runbook.

## Re-running the scan

```bash
# 1. SBOM + confirm there's really nothing to catalog beyond the CI workflow
syft scan dir:. -o cyclonedx-json=security/sbom.cdx.json
trivy fs --scanners vuln --format json --output security/raw/trivy-scryesite.json --skip-dirs security .

# 2. Check the pinned GitHub Actions against OSV's GitHub Actions advisory DB
#    (osv-scanner v2.0.2 has no native workflow-file extractor, so this is a direct
#    download + a small manual match rather than a single osv-scanner invocation)
mkdir -p /tmp/gha-db
curl -sSL -o /tmp/gha-all.zip "https://osv-vulnerabilities.storage.googleapis.com/GitHub%20Actions/all.zip"
unzip -oq /tmp/gha-all.zip -d /tmp/gha-db
python3 - <<'EOF'
import glob, json, re
pinned = dict(re.findall(r"uses:\s*([\w.-]+/[\w.-]+)@(\S+)",
                         open(".github/workflows/deploy-pages.yml").read()))
for fp in glob.glob("/tmp/gha-db/*.json"):
    d = json.load(open(fp))
    for a in d.get("affected", []):
        name = a.get("package", {}).get("name", "")
        if name in pinned:
            print("HIT:", name, pinned[name], d.get("id"))
print(f"checked {len(pinned)} pinned actions, see above for any hits")
EOF

# 3. Secrets (ALWAYS --redact)
gitleaks detect --source . --log-opts="--all" --redact=100 --report-format json \
    --report-path security/raw/gitleaks-scryesite-fullhistory.json
gitleaks dir . --redact=100 --report-format json \
    --report-path security/raw/gitleaks-scryesite-workingtree.json

# 4. SAST + config
semgrep --config p/default --config security/raw/local-semgrep-rules.yaml \
    --json --output security/raw/semgrep-scryesite.json .
checkov -d . --skip-path security -o json --output-file-path security/raw/
```

## Network limitations

Identical to DATUM's assessment (same sandbox, same run) — see that repo's RUNBOOK for
the full list of blocked/reachable hosts. The CI workflow uses the real KEV/EPSS/Semgrep-
registry feeds directly since GitHub Actions runners aren't subject to this sandbox's
restriction.

## Handling a new advisory hit on a pinned action

1. The `actions-sca` job fails and prints which action/version matched an advisory.
2. Check the advisory's fixed version (if any) in the GitHub Advisory Database directly
   (`https://github.com/advisories`), bump the tag/SHA in
   `.github/workflows/deploy-pages.yml`, and re-run.
3. If you decide to act on §5's SHA-pinning recommendation independent of any actual
   advisory, resolve each action's current tag to its commit SHA
   (`gh api repos/<owner>/<repo>/git/refs/tags/<tag>`) and replace `@v4` etc. with
   `@<sha> # v4` so the version is still human-readable in review.
