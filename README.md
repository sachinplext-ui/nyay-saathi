# NYAY SAATHI — न्याय का साथ

A responsive Hindi/English educational legal-information website and document-template prototype for India.

## Live website
https://sachinplext-ui.github.io/nyay-saathi/

## Development and QA plans

- [India National Legal Foundation](knowledge-packs/INDIA-NATIONAL-LEGAL-FOUNDATION.md) — selected central Acts and NALSA official guidance, with territorial and date-of-law cautions.
- [Pan-India jurisdiction coverage register](data/pan-india-jurisdiction-register.json) — 28 states and 8 Union Territories tracked separately; entries remain unverified until official-source research is completed.


- [Pan-India jurisdiction coverage register](data/pan-india-jurisdiction-register.json) — 28 states and 8 Union Territories tracked separately; entries remain unverified until official-source research is completed.


- [AI Legal Assistant Blueprint](AI-LEGAL-ASSISTANT-BLUEPRINT.md)
- [API Integration Plan](API-INTEGRATION-PLAN.md)
- [QA Execution Status](qa/QA-EXECUTION-STATUS.md)
- [MP Synthetic Test Set](qa/MP-SYNTHETIC-TEST-SET.md)
- [MP Expected Answers](qa/MP-EXPECTED-ANSWERS.md)

## Product security status

This release is a public educational prototype only. No real accounts, case database, document uploads, or secure evidence vault are enabled. Read [SECURITY-ROADMAP.md](SECURITY-ROADMAP.md), [AUTH-DESIGN.md](AUTH-DESIGN.md), [PRIVACY-POLICY.md](PRIVACY-POLICY.md), and [DATA-RETENTION.md](DATA-RETENTION.md) before considering production use. Use fictional sample data only.

## Current features
- Responsive dark-navy and gold interface
- Hindi/English interface toggle
- Expanded Hindi/English general guidance on FIR procedure under BNSS Sections 173 and 174, including Zero FIR, e-FIR, non-cognizable information, police refusal, FIR copies, disputed allegations, cyber-fraud reporting and NALSA legal aid, with official references
- Fictional sample-case manager with search, status filters, edit, delete and draft/review/closed transitions (session memory only)
- Interactive case-preparation checklist with live completion percentage
- FIR Support Center with a browser-side police-complaint draft form (local formatting only; it does not submit a complaint or register an FIR)
- Browser-side bilingual application templates with type-specific subject, fact prompts and request presets for police complaints, official-record requests, FIR-copy requests, Zero FIR representations, police-refusal representations and cybercrime follow-ups; user edits are preserved, with factual-accuracy reminders and acknowledgement wording
- Copy application text
- Copy feedback is announced accessibly and the copy-button label resets when the draft is edited or cleared
- Mobile navigation has larger touch targets, visible keyboard focus and reduced-motion support
- Standalone A4-oriented print page for saving as PDF
- PWA manifest and service worker for basic offline support
- Links to official public resources: NALSA, Ministry of Home Affairs, National Cyber Crime Portal and India Code

## Important limitations
- The assistant is a rules-based demo, not a connected AI model and not a lawyer. The optional API endpoint remains disabled until verified legal-source retrieval and citation handling are implemented.
- Assistant questions are handled by the browser-side rules demo; do not enter real names, contact details, case identifiers or private documents.
- It does not assess individual cases or predict legal outcomes.
- My Cases data is held only in page memory and is lost when the page is refreshed or closed; it is not a real case-management database.
- The FIR Support Center and draft generator create generic editable templates only; they do not submit complaints, register FIRs, or provide a legally reviewed pleading.
- Do not enter sensitive personal information, identity numbers, private case documents, passwords or financial details.
- Review all facts and documents with a qualified lawyer or eligible legal-aid service before submitting anything.
- This is not a government service and does not create an advocate-client relationship.

## Hosting
The current prototype is a static site suitable for GitHub Pages. No paid Render service or API key is required for these static features.

## Local development
Open `index.html` through a local static web server. For production changes, test the Hindi/English toggle, mobile layout, application copy, print-to-PDF flow and service-worker refresh on a phone.

## Next development milestones
1. Complete the remaining front-end workflows and accessibility improvements.
2. Review bilingual document templates and official-source links.
3. Finish privacy, security and deployment design for any real account or case-data feature.
4. Only after verified legal-source retrieval, citations, privacy review and QA, consider enabling an optional AI backend.
