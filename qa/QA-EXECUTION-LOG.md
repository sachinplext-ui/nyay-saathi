# NYAY SAATHI — QA Execution Log

**Date:** 27 November 2026
**Environment:** Public GitHub Pages website, mobile browser
**Build under test:** Static rules-based demo
**Important:** This log records UI/demo behavior only. It is not a live AI test, legal validation or production certification.

## Run 1 — Hindi FIR-copy prompt

- **Test prompt:** `FIR की कॉपी कैसे मिलेगी?`
- **Language:** Hindi
- **Observed behavior:** The assistant returned the predefined FIR-copy guidance from the browser-side rules-based topic matcher.
- **Observed content:** It directs the user to the concerned police station or official State police service; references BNSS Section 173(2); says the recorded information copy is to be provided forthwith and free of cost to the informant or victim; advises keeping the acknowledgement/reference; and says to confirm the process through official sources.
- **Privacy reminder:** The response tells users not to enter names, addresses, phone numbers, FIR numbers, identity numbers or private documents.
- **UI observation:** The answer rendered visibly in the mobile page below the guidance button.
- **Result:** **PASS — basic Hindi rules-based UI response observed.**
- **Not verified:** The linked PDF was not opened as part of this test; statutory accuracy was not independently reviewed in this run.
- **AI status:** **NOT TESTED.** The prompt was handled by local browser rules, not the connected AI API.

## Remaining tests

The other seven synthetic scenarios, the English variants, API deployment, API health check, frontend/backend integration, source-grounded retrieval and legal-professional review remain untested or blocked. Do not report the 16-case AI QA suite as passed.

## Safety

Use fictional prompts only. Do not enter real names, addresses, phone numbers, FIR/case numbers, identity numbers or private documents.

## Run 2 — English FIR prompt

- **Test prompt:** `How can I get a copy of an FIR?`
- **Language:** English
- **Observed behavior:** The assistant returned the predefined English FIR guidance from the browser-side rules-based topic matcher.
- **Observed content:** It explains the general FIR recording process under BNSS Section 173, mentions oral/electronic information, the three-day signature requirement for electronic information, reading over oral information, the free copy under Section 173(2), and the written-to-SP route described under Section 173(4) if the station officer refuses to record information. It recommends consulting a qualified advocate for case-specific steps and displays an official-text link.
- **Privacy reminder:** The response tells users not to enter names, addresses, phone numbers, FIR numbers, identity numbers or private documents.
- **UI observation:** The answer rendered visibly in English on the mobile page.
- **Result:** **PASS — basic English rules-based UI response observed.**
- **Not verified:** The linked PDF was not opened and the statutory summary was not independently reviewed in this run.
- **AI status:** **NOT TESTED.** The prompt was handled by local browser rules, not the connected AI API.

## QA tally

- Hindi demo UI checks observed: 1/1 passed.
- English demo UI checks observed: 1/1 passed.
- Live AI tests: 0 executed.
- Remaining synthetic scenarios: 7 topics × 2 languages not yet run.

## Run 3 — Hindi MP scheme grievance prompt

- **Test prompt:** `एक सरकारी योजना का आवेदन लंबित है। मध्य प्रदेश में जानकारी या शिकायत कहाँ करूँ?`
- **Language:** Hindi
- **Observed behavior:** The assistant returned the generic application-format guidance instead of the Madhya Pradesh CM Helpline route.
- **Result:** **FAIL — topic routing / intent matching.**
- **Likely cause:** The generic keyword `आवेदन` matched before any MP government-scheme grievance topic existed.
- **Privacy:** The observed answer included a general privacy reminder. No private details were used.
- **AI status:** **NOT TESTED.** This was the browser-side rules-based assistant.

## Corrective change

A more specific Madhya Pradesh government-scheme / state-grievance topic was added before the generic application topic in both Hindi and English. The new guidance identifies CM Helpline 181 as an initial route, links the official About and FAQ pages, and states that 181 is not an emergency service, court, legal representation or FIR registration channel. It avoids promising acceptance or resolution.

**Fix commit:** `d13603ae40f8de5051fc7a9c02d5d61698c18e70`

**Retest status:** Pending. The correction must be checked on the deployed website after the Pages workflow completes. Do not count Run 3 as passed until retested.

## Interactive controls — root-cause fix (27 November 2026)

- **Root cause found:** During initial Hindi page setup, `applyDraftLanguage()` selected `translations["hi"]`, but the Hindi dictionary is stored separately as `hi`. This produced an undefined dictionary and a JavaScript error while initializing the page, stopping later event handlers from being registered.
- **Correction:** The language initializer now merges the English fallback dictionary with the Hindi dictionary when Hindi is active. This allows the document-generator controls and later dashboard/print handlers to initialize.
- **Cache refresh:** Updated the app.js query version and service-worker cache name to force the corrected script to load.
- **Status:** Code change saved; deployment and mobile retest still pending. Do not mark buttons fixed until the live page is checked.

## Follow-up diagnosis — assistant still unresponsive

- **Root cause confirmed:** The previous CM Helpline topic insertion left the literal characters `\n` between two JavaScript object entries (Hindi and English topic lists). This made the entire `app.js` file fail JavaScript parsing, so none of its click handlers could initialize.
- **Correction:** Replaced both malformed separators with actual line breaks. The complete script now passes a JavaScript syntax parse check.
- **Cache refresh:** Updated the script URL to `app.js?v=39` and service-worker cache to `nyay-saathi-v45`.
- **Status:** Fix committed. Live deployment and mobile retest pending.

## Retest after JavaScript syntax correction — Hindi FIR prompt

- **Observed evidence:** User screenshot shows the FIR guidance answer rendered in the assistant response panel after submitting a Hindi FIR question.
- **Result:** **PASS — AI Assistant button and answer rendering are responding in the live mobile page.**
- **Scope:** This confirms the assistant interaction shown in this screenshot only. It does not confirm every navigation, dashboard, generator, copy, print or language control.
- **AI status:** Still a local rules-based demo, not connected generative AI.

## Run 4 — Rights Guide navigation

- **Observed evidence:** User screenshot shows the “NYAY SAATHI / Legal Rights & Justice Guide” page loaded in the mobile browser, including the introductory rights guide content and educational-use disclaimer.
- **Result:** **PASS — Rights Guide navigation opens the intended page.**
- **Scope:** This confirms page navigation and visible rendering only; it does not validate every external link or legal statement on the page.

## Run 5 — Document generator feature tile navigation

- **Observed evidence:** User screenshot shows the page scrolled to the “दस्तावेज़ टेम्पलेट” section and the “Application generator” form, including its safety notice and application-type selector.
- **Result:** **PASS — document generator tile navigation reaches the intended generator section on mobile.**
- **Scope:** This confirms navigation and form visibility only. Form generation, copy/print controls and output accuracy have not yet been tested.
- **Safety:** Use fictional/sample details only; do not enter real personal or case information.

