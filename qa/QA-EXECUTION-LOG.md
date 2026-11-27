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
