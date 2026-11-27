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

- Test 3, English — private-shopkeeper dispute / MP Lokayukta scope: the shared mobile screenshot visibly shows the limited statutory-scope explanation, does not treat every private dispute as a Lokayukta matter, links the official scope page and government-hosted Act copy, and qualifies current amendments/procedure as unverified. **Manual screenshot content check: consistent with the expected answer.** Link click behaviour and legal-source currentness remain unverified.


## Lokayukta fee route defect found in mobile check (27 November 2026)

- The user's Hindi mobile screenshot for the prompt “क्या MP Lokayukta में हर शिकायत के लिए ₹25 देना जरूरी है?” displayed the broad Lokayukta scope answer instead of the fee-specific answer. This is a real observed route failure; Test 4 Hindi is not visually passed.
- Root cause: the short key `₹25` has length 3 and is excluded by the first matching pass (`key.length > 3`). The broad `लोकायुक्त` key therefore wins before the fallback pass can select the fee topic.
- Fixed `app.js` by adding longer Hindi fee phrases (`₹25 देना`, `₹25 फीस`, `₹25 शुल्क`, and `25 देना जरूरी`) to the fee-specific topic.
- Re-ran source-level matching for the exact screenshot prompt, the original Hindi synthetic prompt, and the English synthetic prompt: all three now select the fee-specific answer, including the ₹25 judicial-stamp distinction and 18 May 2022 source-page date.
- Code commit: `e52e4c65ddc721bedfb3d945f0622472fcab614d`.
- **Next required check:** refresh/reopen the published mobile site after GitHub Pages deployment and repeat the Hindi ₹25 question. Do not mark Test 4 Hindi as visually passed until the fee-specific answer appears on screen. Then perform the English visual check.


## Lokayukta fee-priority fix (27 November 2026)

- A manual mobile screenshot of the Hindi ₹25 question showed that the broad Lokayukta jurisdiction answer was selected instead of the fee-specific answer.
- Updated `showGuidance()` so a prompt containing Lokayukta/लोकायुक्त plus ₹25/25 rupees or fee/शुल्क terms explicitly prioritizes the dedicated fee answer before the broad jurisdiction topic.
- Checked the priority condition against the exact Hindi screenshot prompt, the English synthetic fee prompt, and a Hindi “25 रुपये फीस” wording. All three trigger the fee-priority condition in a source-level check.
- Code commit: `f36a6a4`.

**Pending:** The new code must propagate to GitHub Pages and be rechecked on the user's phone. Do not mark the manual Hindi fee test passed until the updated fee-specific answer is visible. This source-level check is not browser testing or legal verification.

- Test 4, Hindi — Lokayukta ₹25 fee: after the priority fix, the user's refreshed mobile screenshot visibly shows the dedicated fee answer (not the broad jurisdiction answer), distinguishes the ₹25 judicial stamp reference for complaints against a Minister or Secretary from other categories, includes the 18 May 2022 source-page date and warns to recheck current filing information. **Manual screenshot content check: correct fee-specific route now displayed.** The linked filing URL is visible as plain text; click behaviour and current fee rules remain unverified.

- Test 4, English — MP Lokayukta ₹25 fee: the user's refreshed mobile screenshot visibly shows the dedicated English fee answer, distinguishes the ₹25 judicial stamp reference for complaints against a Minister or Secretary from other categories, gives the 18 May 2022 source-page date, and advises checking current official filing information. **Manual screenshot content check: correct fee-specific route now displayed.** Link click behaviour and current fee rules remain unverified.


## Advocate complaint Hindi-routing correction (27 November 2026)

- A user screenshot showed a Hindi question about a lawyer's “गलत व्यवहार” while the page language toggle was set to English. The app selected the English topic list and fell through to generic legal-aid guidance.
- Updated `showGuidance()` to detect Devanagari script in the entered question and use Hindi answer topics for Hindi-script questions, even if the page toggle is currently English.
- Added Hindi matching phrases for “वकील के गलत व्यवहार” and “वकील के व्यवहार की शिकायत”.
- Confirmed at source level that the exact screenshot prompt detects Hindi and matches the advocate-conduct topic. The corrected Devanagari regex is present in the current source.
- Code commits: `d6ece93`, `b47647a`.

**Pending:** Refresh the published site and repeat the same Hindi prompt. The screenshot supplied before this correction is a failed route, not a pass. English-language advocate prompt still requires its separate manual screenshot check.

- Advocate-conduct Hindi prompt — manual mobile retest after script-detection and keyword fixes: the user's screenshot now shows the Hindi State Bar Council of Madhya Pradesh guidance, General Rules link, and the qualification that the source pack does not establish the full complaint procedure/form/fee/deadline. The page toggle remains English while the question is Hindi; the answer correctly follows the Hindi question script. **Manual screenshot content check: expected advocate-conduct route now displayed.** Link click behaviour and legal-source currentness remain unverified.


## Advocate misconduct English matching correction (27 November 2026)

- A manual mobile screenshot showed the English prompt “Where can I complain about an advocate's professional misconduct in Madhya Pradesh?” falling through to the generic clarification response.
- Added English topic keys for “advocate professional misconduct”, “professional misconduct”, “complain about an advocate”, “complaint about an advocate”, and the full “where can I complain” phrasing.
- A source-level check of the exact screenshot prompt now matches the advocate-conduct topic, whose answer includes the State Bar Council of Madhya Pradesh and General Rules references.
- Code commit: `b3d8f3e`.

**Pending:** Refresh the published site and repeat the English prompt. The screenshot before this correction is a failed route, not a pass. Link click behaviour and legal-source currentness remain unverified.


- Follow-up screenshot after the English advocate-key update still showed the generic English clarification response. The current `main` branch source contains the expected “professional misconduct” key and the exact prompt matches it in source-level inspection. This indicates the published mobile page was not yet executing the updated script (likely stale deployed asset/cache; deployment propagation itself not independently observed).
- Bumped the HTML script URL from `app.js?v=40` to `app.js?v=41` and the service-worker cache from `nyay-saathi-v47` to `nyay-saathi-v48` to force clients to request the current script and refresh cached assets.
- Cache-bust commits: `7563fc6` (index.html), `56fac08` (sw.js).

**Pending:** Wait for GitHub Pages deployment, then hard-refresh/reopen the site and repeat the exact English advocate misconduct prompt. Do not mark this test passed until the State Bar Council answer is visible on the phone.

- English advocate professional misconduct — manual mobile retest after script cache-bust: the latest user screenshot now visibly shows the correct State Bar Council of Madhya Pradesh guidance, General Rules link, and the qualification that the source pack does not establish the full complaint procedure/form/fee/deadline. **Manual screenshot content check: expected English advocate-conduct route displayed.** Link click behaviour and legal-source currentness remain unverified.

- Test 6, Hindi — MP Police Citizen Portal / automatic FIR registration: the user's mobile screenshot visibly shows the cautious answer that the source pack does not establish that every portal complaint automatically becomes an FIR, advises checking service-specific portal instructions or the local police authority, and distinguishes an ordinary online complaint from FIR registration. Official portal URL and privacy warning are visible. **Manual screenshot content check: expected route displayed.** Link click behaviour and current official procedure remain unverified.

- Test 6, English — MP Police Citizen Portal / automatic FIR registration: the user's mobile screenshot visibly shows the expected cautious answer, distinguishes a general online grievance from FIR registration, and advises checking the specific service instructions or confirming with local police. The official portal and Indore Police URLs are displayed, along with the privacy warning. **Manual screenshot content check: expected route displayed.** UI issue: the MP Police Citizen Portal URL is repeated twice in the answer; remove the duplicate. Link click behaviour and current official procedure remain unverified.
