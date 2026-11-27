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

## Run 6 — Application generation with required subject

- **Observed evidence:** User screenshot shows the generated application preview with the subject “Sample application”, factual description and request populated.
- **Result:** **PASS — required-field validation clears and application preview is generated when the subject is supplied.**
- **Scope:** This confirms browser-side text formatting only; it does not submit or file an application.
- **Next checks:** Copy and PDF/Print controls remain to be tested separately.

## Run 7 — Copy application

- **Observed evidence:** User screenshot shows the Copy application control changed to the Hindi success label “कॉपी हो गया ✓” and the browser displayed the “Copied.” confirmation toast.
- **Result:** **PASS — copy action reported success in the mobile browser.**
- **Scope:** Clipboard contents were not independently pasted into another app for comparison; this confirms the browser's success feedback only.

## Run 8 — PDF / Print output

- **Observed evidence:** User uploaded the PDF produced by the application generator. The uploaded PDF was parsed as a one-page document and contains the sample subject, fictional factual description, request, date and placeholder applicant fields.
- **Result:** **PASS — PDF output was generated and uploaded successfully; one-page content is readable/extractable.**
- **Scope:** This verifies PDF creation and basic text content only. It does not certify print layout across devices or legal suitability of the template.

## Run 9 — Dashboard My Cases tab

- **Observed evidence:** User screenshot shows the dashboard with “माय केस” selected and the My Cases panel rendered, including two clearly labelled fictional sample entries and a demo-only privacy notice.
- **Result:** **PASS — My Cases dashboard tab switches to and displays its sample panel.**
- **Scope:** Confirms tab selection and panel rendering only. The entries are demo placeholders; no real case storage or case-management capability is implied.

## Run 10 — Case Analyzer / preparation checklist panel

- **Observed evidence:** User screenshot shows the “CASE REVIEW WORKSPACE / केस तैयारी चेकलिस्ट” panel with four checklist items and a warning that it is not AI analysis or legal advice.
- **Result:** **PASS — case preparation checklist panel is visible after selecting the Case Analyzer dashboard tab.**
- **Scope:** This verifies panel navigation/rendering only. It does not perform AI case analysis, store uploaded documents, or provide legal advice.

## Run 11 — Deadline Alerts dashboard tab

- **Observed evidence:** User screenshot shows the “डेडलाइन अलर्ट” tab selected and the “महत्वपूर्ण तारीखें” reminders panel rendered with two sample reminder cards.
- **Result:** **PASS — Deadline Alerts tab switches to and displays its sample reminders panel.**
- **Scope:** Confirms navigation/rendering only. Dates are explicitly labelled fictional; no real reminders, notifications, or deadline calculations are active.

## Run 12 — Evidence Vault dashboard tab

- **Observed evidence:** User screenshot shows “एविडेंस वॉल्ट” selected and the “दस्तावेज़ सूची” panel with three sample document categories.
- **Result:** **PASS — Evidence Vault tab switches to and displays the document-category demo panel.**
- **Scope:** Confirms navigation/rendering only. The page explicitly says it is not a secure cloud vault and does not upload or save files.

## Run 13 — Lawyer Support dashboard tab

- **Observed evidence:** User screenshot shows “वकील सहायता” selected and the “वकील / कानूनी सहायता” panel rendered with NALSA legal-aid information and helpline 15100.
- **Result:** **PASS — Lawyer Support tab switches to and displays its legal-aid information panel.**
- **Scope:** Confirms navigation and display only. The NALSA link/helpline were not independently tested in this run, and eligibility must be checked with the official service.

## Run 14 — Settings / Privacy dashboard tab

- **Observed evidence:** User screenshot shows “सेटिंग” selected and the “सेटिंग और गोपनीयता” panel rendered. It states that the prototype does not save private data on an account or server and that login, cloud storage, and real case management are not currently available.
- **Result:** **PASS — Settings tab switches to and displays its privacy/preferences panel.**
- **Scope:** Confirms navigation and visible content only; no account or privacy control interaction is available in this panel.

## Run 15 — Dashboard Overview tab

- **Observed evidence:** User screenshot shows the “आपका स्वागत है” dashboard overview panel with sample metrics, a demo case-status timeline, and quick links to the application generator, general assistant, and legal guide.
- **Result:** **PASS — Dashboard tab switches to and displays its overview panel.**
- **Scope:** Confirms navigation and rendering only. Metrics and case status are explicitly sample/demo content; quick-link actions still require separate tests.

## Run 16 — Dashboard quick link: Application Generator

- **Observed evidence:** User screenshot shows the application-generator form opened from the Dashboard quick link, including the demo-safety notice and application-type selector.
- **Result:** **PASS — the “आवेदन जनरेटर खोलें” quick link navigates to the generator form.**
- **Scope:** Confirms navigation only; generation, copy and PDF/Print were tested separately above.

## Run 17 — Dashboard quick link: General Assistant

- **Observed evidence:** User screenshot shows the “NYAY SAATHI ASSISTANT / अपना सवाल लिखें” page, with the question field and “सामान्य मार्गदर्शन देखें” button.
- **Result:** **PASS — the “सामान्य सवाल पूछें” Dashboard quick link navigates to the assistant page.**
- **Scope:** Confirms navigation only. The page identifies itself as an introductory demo; this does not establish a live AI connection or verify answer quality.

## Run 18 — Dashboard quick link: Legal Guide

- **Observed evidence:** User confirmed “Done” after being asked to open the “कानूनी गाइड देखें” quick link.
- **Result:** **PASS — user confirms the Legal Guide quick link opened.**
- **Scope:** Confirmation only; the destination page content and individual links were not rechecked in this run.

## Run 19 — Main navigation: Legal Library / Legal Guide

- **Observed evidence:** User screenshot shows the “लीगल लाइब्रेरी” navigation item highlighted and the “कानूनी गाइड” page rendered with introductory legal topics, including “FIR क्या है?” and “FIR में गलत तथ्य हों तो?”.
- **Result:** **PASS — Legal Library navigation opens the legal guide page.**
- **Scope:** Confirms navigation and page rendering only; individual external source links have not been tested here.

