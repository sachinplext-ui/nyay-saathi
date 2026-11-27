# NYAY SAATHI — Account and Login Design (Proposal Only)

## Status
**Not implemented.** The current website has no registration, login, user accounts, or personal-data storage. This document is a design proposal, not a promise that authentication is secure or ready to deploy.

## Recommended approach
1. Prefer a reputable, maintained identity provider over writing password handling from scratch.
2. Have a trusted adult/project owner manage the provider account, billing, recovery channels, production secrets, and hosting.
3. Before allowing registration, obtain qualified review of Indian privacy, child-safety, consent, and legal-service obligations. Do not open accounts to minors until age eligibility and guardian-consent requirements are resolved.
4. Keep the public GitHub Pages demo read-only and populated only with fictional examples.

## Minimum account protections to require
- Verified email and secure account recovery.
- Passkeys or provider-managed authentication where supported; never store plaintext passwords.
- Secure, HttpOnly, SameSite cookies for server sessions; CSRF protection for state-changing requests.
- Login and recovery rate limits, generic error messages, and abuse monitoring.
- Short-lived sessions, explicit logout, session revocation, and administrator MFA.
- Authorization checks on every request; a user must never access another user's records by changing an identifier.
- No secrets, access tokens, session IDs, or document contents in browser storage, source control, URLs, or logs.
- Audit security events without logging sensitive case contents.

## Data minimization
Do not ask for Aadhaar, PAN, full FIR copies, bank details, precise home addresses, or other sensitive identifiers merely to create an account. Define a specific necessity and lawful basis before collecting any additional data. Provide clear retention, export, correction, and deletion processes before launch.

## Not part of the first login release
- Case-file uploads or evidence storage.
- Lawyer marketplace or public profiles.
- Legal filings or submission to authorities.
- Payments or subscriptions.

These features require separate product, privacy, security, and legal reviews.

## Acceptance checks before any launch
- Independent review of identity-provider configuration and session handling.
- Tests for account enumeration, CSRF, session fixation, recovery abuse, brute-force attempts, and cross-user authorization.
- Dependency and secret scanning; no secrets committed to Git.
- Published privacy notice, retention/deletion policy, support contact, and incident-response plan.
- Written approval from the responsible adult project owner and qualified privacy/security reviewers.

## Safe test policy
Use synthetic test accounts and fictional records only. Never test with real legal documents or personal identifiers. Keep this proposal disabled until all checks are complete.
