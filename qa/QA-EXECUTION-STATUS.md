# NYAY SAATHI — QA Execution Status

**Checked:** 27 November 2026
**Release type:** Public static-site prototype
**Overall status:** Test cases and expected-answer guide are prepared; live AI QA has not been executed.

## Verified repository facts

- The public website is hosted as a GitHub Pages static site.
- The README describes the website assistant as a rules-based demo, not a connected AI model.
- `server/index.js` contains a separate Express API prototype with a `/health` route and `POST /api/ask`.
- The API prototype requires a server-side `OPENAI_API_KEY`; it returns HTTP 503 when the key is not configured.
- The static-site deployment succeeding does not mean the Express API is deployed, reachable, or connected to the website.
- No live AI answers have been run against the eight MP synthetic tests as part of this QA stage.

## What is ready

1. `qa/MP-SYNTHETIC-TEST-SET.md` — eight fictional test prompts in Hindi and English.
2. `qa/MP-EXPECTED-ANSWERS.md` — draft expected answers, source links, scoring table and critical-failure rules.
3. `knowledge-packs/MP-STARTER-KNOWLEDGE-PACK.md` — limited Madhya Pradesh starter source pack.
4. `data/source-registry.json` — source metadata registry.

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
