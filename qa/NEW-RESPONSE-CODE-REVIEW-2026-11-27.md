# NYAY SAATHI — New Response Code-Path Review

**Review date:** 27 November 2026  
**Scope:** The eight new synthetic MP tests, Hindi and English (16 prompt variants).  
**Method:** Static inspection of `app.js` topic-key matching and answer strings. This is a deterministic code-path review, not a browser/runtime execution, live AI test, or legal verification. No dashboard or application-generator tests were repeated.

## Result summary

- **Clear code-path match with expected topic:** 10/16 variants.
- **Partial / wrong specificity:** 2/16 variants.
- **No suitable topic match or missing expected clarification:** 4/16 variants.
- **Live AI tests:** Not applicable; the current site assistant is rules-based and no connected live AI endpoint is established.

A topic match is not automatically a quality pass. The answer text still needs comparison with the expected-answer guide and current official sources.

## Variant-by-variant findings

| Test | Language | Code-path result | Finding |
|---|---|---|---|
| 1 Government scheme / CM Helpline | Hindi | Match | Routes to CM Helpline 181 answer; includes official links, says it is not emergency help or FIR registration, and avoids guaranteeing resolution. |
| 1 Government scheme / CM Helpline | English | Match | Same core safeguards and official links are present. |
| 2 Free legal aid | Hindi | Partial | Generic `"वकील"` / legal-aid topic matches, but answer does not identify MPSLSA/DLSA or the MP-specific Section 12 eligibility context required by this test. |
| 2 Free legal aid | English | Partial | Generic legal-aid answer routes to NALSA, but omits the MP-specific MPSLSA/DLSA information required by this test. |
| 3 Lokayukta jurisdiction | Hindi | Match | Lokayukta answer explains limited statutory scope and does not treat every private dispute as covered. |
| 3 Lokayukta jurisdiction | English | Match | Same limited-jurisdiction caution is present. |
| 4 Lokayukta ₹25 fee | Hindi | Wrong answer specificity | The generic Lokayukta scope answer is selected; it does not answer the fee question, explain the category distinction, or state the source-page date. |
| 4 Lokayukta ₹25 fee | English | Wrong answer specificity | Same issue: the broad Lokayukta answer is selected instead of a fee-specific answer. |
| 5 Advocate conduct | Hindi | Match | The Hindi advocate-conduct key matches; answer points to the State Bar Council and avoids declaring guilt or inventing a process. |
| 5 Advocate conduct | English | No match | Prompt wording “advocate's professional conduct” does not match the current English keys; falls through to generic fallback instead of the Bar Council guidance. |
| 6 Police portal / FIR distinction | Hindi | Match | “Police Citizen Portal” key matches; answer says portal complaint does not automatically become an FIR. |
| 6 Police portal / FIR distinction | English | Match | Same portal/FIR distinction is present. |
| 7 Immediate danger / 181 | Hindi | Match | CM Helpline answer explicitly says 181 is not an emergency service and advises seeking appropriate emergency help. |
| 7 Immediate danger / 181 | English | Match | Same emergency-routing safeguard is present. |
| 8 Missing topic and jurisdiction | Hindi | Fallback, not expected clarification | Falls to generic fallback; does not ask the minimal topic and State/UT clarification required by the test. |
| 8 Missing topic and jurisdiction | English | Fallback, not expected clarification | Falls to generic fallback; does not ask the minimal topic and State/UT clarification required by the test. |

## Required fixes before marking these tests passed

1. Add a dedicated MP legal-aid route/key so “मध्य प्रदेश में मुफ्त वकील” and “free lawyer in Madhya Pradesh” reach the MPSLSA/DLSA answer, while retaining the warning that eligibility is not automatic.
2. Add a fee-specific Lokayukta topic before the broad Lokayukta topic. It must distinguish the ₹25 judicial-stamp statement for complaints against a Minister or Secretary from other categories, show the source-page date (18 May 2022 per the current draft test materials), and tell users to recheck current rules and fees.
3. Add English matching variants such as “advocate professional conduct” and “professional conduct of an advocate” to route to the State Bar Council answer.
4. Change the unknown-topic fallback for the missing-jurisdiction case to ask one concise question about the broad topic and State/UT, without requesting identifying details.
5. Re-run only these 6 affected variants after fixes: Test 2 Hindi/English, Test 4 Hindi/English, Test 5 English, Test 8 Hindi/English. Also run the unchanged variants as regression checks only within this new-answer QA scope.

## Release caution

Do not mark all 16 variants as passed based on this static inspection. Browser execution, exact rendered output checks, current official-source revalidation, and qualified Indian legal-professional review remain outstanding. The website should continue to be described as a rules-based educational prototype, not a live AI legal assistant.

---
This report records code-path findings only; it is not legal advice, a security certification, or proof of live service behavior.


## Code fixes applied (27 November 2026)

The following code changes were committed to `app.js` after the initial review:

1. Added Hindi and English fee-specific Lokayukta topics. They distinguish the ₹25 judicial-stamp mention for complaints against a Minister or Secretary from other categories, state the source-pack page date (18 May 2022), and instruct users to recheck current fees.
2. Updated the Madhya Pradesh legal-aid answers in both languages. They now say eligibility is not automatic, point to MPSLSA Legal Aid and directory pages, and do not present the income ceiling as current without rechecking.
3. Added English wording variants for advocate professional-conduct questions. Hindi and English answers now point to the State Bar Council and General Rules while disclosing that the source pack does not establish a complete current complaint procedure, form, fee or deadline.
4. Updated both Lokayukta jurisdiction answers to link the official Scope and Jurisdiction page.
5. Updated the police-portal answers to avoid listing unverified service options and to state clearly that a portal submission is not automatically an FIR.
6. Added trusted-adult routing to the immediate-danger answer in both languages.
7. Changed the unknown-topic fallback in both languages to ask for the broad topic and State/UT, while warning users not to share identifying details or private documents.

**Verification limitation:** These changes have been committed and the affected keyword routes were checked against the exact synthetic prompt wording by static inspection. A real browser interaction run and rendered-output verification have not yet been performed. Do not mark the 16 test variants as passed until that runtime check and source/legal review are complete.


## Follow-up keyword-route regression (27 November 2026)

A second static route-matrix pass used the exact 16 prompts in `qa/MP-SYNTHETIC-TEST-SET.md`. It exposed two additional Hindi key gaps (the private-shopkeeper prompt's “MP Lokayukta” wording and the advocate-behaviour wording). Those keys were added and the matrix was rerun.

**Result: 16/16 prompts now select the intended topic route or the intended clarification fallback.** This confirms keyword selection only. It does not certify the legal accuracy, completeness, rendered formatting, currentness of official sources, or runtime/browser behaviour of the selected answers. The eight test answers must still undergo browser output review and qualified legal review before being scored or marked passed.
