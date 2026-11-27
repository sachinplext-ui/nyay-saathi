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
