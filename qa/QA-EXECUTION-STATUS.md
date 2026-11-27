# NYAY SAATHI — QA Execution Status

**Checked:** 27 November 2026  
**Release type:** Public static-site prototype  
**Overall status:** Synthetic test set and expected-answer guide are prepared. A static code-path review of the new Hindi/English answers is complete; live AI QA has not been executed.

## Verified repository facts

- The public website is hosted as a GitHub Pages static site.
- The README describes the website assistant as a rules-based demo, not a connected AI model.
- `server/index.js` contains a separate Express API prototype with a `/health` route and `POST /api/ask`.
- The API prototype requires a server-side `OPENAI_API_KEY`; it returns HTTP 503 when the key is not configured.
- The static-site deployment succeeding does not mean the Express API is deployed, reachable, or connected to the website.
- No live AI answers have been run against the eight MP synthetic tests.

## What is ready

1. `qa/MP-SYNTHETIC-TEST-SET.md` — eight fictional test prompts in Hindi and English.
2. `qa/MP-EXPECTED-ANSWERS.md` — draft expected answers, source links, scoring table and critical-failure rules.
3. `qa/NEW-RESPONSE-CODE-REVIEW-2026-11-27.md` — static review of the 16 new Hindi/English prompt variants, including exact matching gaps.
4. `knowledge-packs/MP-STARTER-KNOWLEDGE-PACK.md` — limited Madhya Pradesh starter source pack.
5. `data/source-registry.json` — source metadata registry.

## New Hindi/English code-path review

The current `app.js` matching logic was inspected against the eight new synthetic prompts in both languages. This is code inspection, not browser execution or live AI QA.

- 10/16 variants select the intended topic answer.
- 2/16 select a broad answer that does not meet the test's required specificity (MP legal-aid eligibility and Lokayukta fee).
- 4/16 do not meet the expected route (English advocate-conduct wording misses the key; both missing-jurisdiction prompts fall through without asking the required clarification).
- Required fixes are recorded in `qa/NEW-RESPONSE-CODE-REVIEW-2026-11-27.md`.
- These findings are not legal verification and do not count as passed tests.

## Blockers before live AI testing

- Deploy the API to a server environment that supports Node.js and the required packages.
- Configure the API key only as a server-side secret; never put it in website JavaScript, HTML, repository files or mobile app code.
- Configure and verify the exact production website origin in `ALLOWED_ORIGIN`.
- Connect the website's assistant UI to the deployed API only after endpoint and privacy/security review.
- Confirm request limits, error handling, logging policy, retention settings and abuse protections.
- Recheck every official source link and every changeable fee, time, eligibility rule and procedure.
- Obtain qualified Indian legal-professional review of the knowledge pack and expected answers.

## Safe test procedure after blockers are cleared

- Use only the eight fictional prompts in the synthetic test set.
- Run each prompt in Hindi and English: 16 answer checks total.
- Record the actual answer, source accuracy, qualification, safe routing, privacy and language parity.
- Apply the pass rule in the test set: at least 8/10 per language variant and no zero in Source accuracy, Safe routing or Privacy.
- Treat any critical failure as a release blocker.
- Do not use real FIRs, names, addresses, phone numbers, identity numbers, private case documents or real people's allegations in prototype testing.

## Current release decision

**Do not describe the product as a live AI legal assistant yet.** The current public site remains an educational prototype. A successful GitHub Pages deployment verifies only the static-site deployment, not the separate AI API or legal-answer quality.

---
This is a QA status record, not a security certification or legal review.

## Integration inspection (27 November 2026)

- `api-config.js` sets `window.NYAY_API_BASE = ""`; no production API URL is configured.
- The current `app.js` assistant button calls the browser-side `showGuidance` function; no request to `/api/ask` was found in the inspected assistant flow.
- `render.yaml` defines a Node web service with root directory `server`, a `/health` health check, and server-side environment variables. This is deployment configuration only; it does not prove a Render service exists or is running.
- `server/package.json` and `server/index.js` provide a separate API prototype. The frontend is not yet connected to it.
- The current site is therefore correctly described as a rules-based static demo. Do not change the UI label to “live AI” until the backend is deployed, health-checked, safely integrated and reviewed.


## Bilingual answer routing fixes (27 November 2026)

- Updated `app.js` to add dedicated Hindi/English Lokayukta fee answers with category distinctions, the 18 May 2022 source-page date from the draft source pack, and a current-fee recheck warning.
- Updated Madhya Pradesh legal-aid answers to avoid presenting an unverified income ceiling as current and to link MPSLSA Legal Aid and directory pages.
- Added English advocate professional-conduct matching and linked the State Bar Council General Rules; both language answers disclose that the source pack does not establish a complete current complaint procedure.
- Linked the official Lokayukta scope page in the jurisdiction answers.
- Simplified police portal guidance to avoid unverified service listings and preserve the portal-submission/FIR distinction.
- Added trusted-adult wording to both immediate-danger answers.
- Changed unknown-topic fallbacks to ask for the broad complaint topic and State/UT without requesting identifying details.

**Verification status:** The exact synthetic prompt phrases for the previously affected routes were checked against the updated topic keys by static inspection. This is not a browser/runtime test. Do not mark the 16 variants passed yet; rendered-output checks, current official-source revalidation and qualified legal review remain outstanding.


## Keyword-route regression result (27 November 2026)

- Ran a static keyword-routing matrix using the exact 8 synthetic prompts in Hindi and English.
- The first follow-up exposed two additional Hindi matching gaps; the MP Lokayukta and advocate-behaviour keys were corrected.
- After the corrections, all 16 prompt variants select the intended topic answer or the intended missing-topic/jurisdiction clarification fallback.
- `app.js` passes a JavaScript syntax parse check.

**Important:** This verifies source-code syntax and topic selection only. It is not a browser test, not a legal-content pass, and not a live AI test. Do not record the 16 variants as passed until actual rendered answers are checked, official sources are revalidated, and qualified legal review is completed.


## Source-level answer regression harness (27 November 2026)

- Re-read the current `app.js` topic table from the default branch and ran all 8 fictional prompts in both Hindi and English through the same first-match keyword selection order used by `showGuidance()`.
- Checked the selected answer text for the test-specific required phrases and safeguards (official route/link, fee/date qualification, scope limitation, FIR distinction, emergency routing, and privacy-safe clarification).
- **Result: 16/16 source-level prompt checks passed** for the expected route/fallback and the selected-answer phrase checks.
- This is a source-level JavaScript harness, not a real browser session: it does not verify rendered UI, actual tap/typing behaviour, deployed Pages content, screen-reader/mobile layout, or external links.
- The public site could not be opened by the available page-inspection service, and no interactive browser-control tool is available in this session. Therefore browser/runtime QA remains outstanding.
- This is not legal verification or a live-AI test. Current official sources and all changeable legal facts still require revalidation, followed by qualified Indian legal-professional review.


## Manual mobile screenshot checks (27 November 2026)

The user manually exercised the published GitHub Pages site on an Android mobile browser and shared screenshots. The following visible-output checks were reviewed:

- Test 1, Hindi — Madhya Pradesh government scheme delay / CM Helpline 181: answer and safety qualifications visibly match the expected route.
- Test 1, English — same scenario: answer and safety qualifications visibly match the expected route.
- Test 2, Hindi — Madhya Pradesh free legal aid eligibility: answer visibly identifies MPSLSA, Section 12, directory, helpline 15100 and the need to recheck current income criteria.
- Test 2, English — same scenario: equivalent qualifications and references are visible.

**Manual screenshot review: 4/4 language variants visually consistent with the expected answer content.** This is user-operated mobile evidence reviewed from screenshots, not automated browser testing. It does not verify that external links open, every viewport/layout, source pages' currentness, legal correctness, or the backend/live AI.

### UI observations from screenshots

- The official URLs render as plain text rather than visibly clickable links.
- Long URLs wrap across lines; this is readable but visually untidy.
- The navigation bar is crowded on the narrow mobile viewport and some labels appear mixed between languages in the English screenshot. Review responsive navigation and language translation coverage.


- Test 3, Hindi — private-shopkeeper dispute / MP Lokayukta scope: the shared mobile screenshot visibly shows the limited statutory-scope explanation, says a private person/dispute is not automatically within the Lokayukta route, links the official Scope and Jurisdiction page and government-hosted Act copy, and advises confirming current scope with the official office. **Manual screenshot content check: consistent with the expected answer.** Link click behaviour and legal-source currentness remain unverified.
