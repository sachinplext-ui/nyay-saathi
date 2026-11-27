# NYAY SAATHI — Secure Product Roadmap

## Current release status

The public GitHub Pages site is an educational prototype. Dashboard case cards, reminders and document categories are fictional UI examples. There is no user account system, case database, file upload, encrypted evidence vault, lawyer marketplace, or filing workflow.

**Do not enter real case details or upload identity/legal documents.**

## Security-first implementation order

### Phase 1 — Product and privacy foundation
- Keep the public demo free of real personal/case data.
- Define the minimum data each future feature actually needs.
- Publish a plain-language privacy notice, retention/deletion rules, contact route and incident process before collecting any data.
- Decide age eligibility and parental/guardian consent requirements with qualified legal/privacy advice before offering accounts to minors.
- Use synthetic test records only during development.

### Phase 2 — Authentication (not enabled yet)
- Use a maintained identity provider or a reviewed authentication implementation.
- Require verified email, secure session cookies, CSRF protection where applicable, login throttling and account recovery safeguards.
- Never store plaintext passwords or secrets in browser code or Git.
- Add administrator access controls and audit events without logging document contents.
- Complete independent security review before launch.

### Phase 3 — Case records (not enabled yet)
- Define strict ownership checks on every read/write request.
- Collect only necessary fields; avoid sensitive identifiers by default.
- Add export, correction and deletion workflows.
- Encrypt transport with HTTPS and sensitive stored data with managed keys.
- Establish backup, retention and breach-response procedures.

### Phase 4 — Document storage (not enabled yet)
- Keep uploads disabled until private object storage, malware scanning, file-type/size limits, access control, encryption, retention and deletion are implemented and tested.
- Never store uploads in the public GitHub repository or public web directory.
- Do not promise an “Evidence Vault” is secure until an independent review confirms the design and deployment.

### Phase 5 — Verification before public launch
- Threat model and privacy impact review.
- Automated tests for authorization boundaries and file access.
- Dependency and secret scanning.
- Independent penetration/security review.
- Review applicable Indian privacy, child-safety and legal-service obligations with qualified professionals.

## Safe development rules
- Use only fictional/sample data in this repository and screenshots.
- Never send API keys, passwords, OTPs, identity numbers, FIR/case details or private documents in chat or commit them to Git.
- A trusted adult should manage hosting accounts, billing, production secrets and any public launch decisions.
- NYAY SAATHI is not a law firm, government service, emergency service or substitute for a qualified advocate.
