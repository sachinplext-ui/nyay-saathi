# NYAY SAATHI — न्याय का साथ

A responsive Hindi/English educational legal-information website and document-template prototype for India.

## Live website
https://sachinplext-ui.github.io/nyay-saathi/

## Development and QA plans

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
- Expanded Hindi/English general guidance on FIR procedure under BNSS Section 173, disputed allegations, cyber-fraud reporting and NALSA legal aid, with official references
- Browser-side application draft generator
- Copy application text
- Standalone A4-oriented print page for saving as PDF
- PWA manifest and service worker for basic offline support
- Links to official public resources: NALSA, Ministry of Home Affairs, National Cyber Crime Portal and India Code

## Important limitations
- The assistant is a rules-based demo, not a connected AI model and not a lawyer.
- It does not assess individual cases or predict legal outcomes.
- The draft generator creates a generic editable template, not a legally reviewed pleading.
- Do not enter sensitive personal information, identity numbers, private case documents, passwords or financial details.
- Review all facts and documents with a qualified lawyer or eligible legal-aid service before submitting anything.
- This is not a government service and does not create an advocate-client relationship.

## Hosting
The current prototype is a static site suitable for GitHub Pages. No paid Render service or API key is required for these static features.

## Local development
Open `index.html` through a local static web server. For production changes, test the Hindi/English toggle, mobile layout, application copy, print-to-PDF flow and service-worker refresh on a phone.

## Next development milestones
1. Improve and test bilingual document templates.
2. Add accessible form validation and clearer privacy guidance.
3. Expand and verify general topic guides with official-source references.
4. Only later consider an optional backend/AI service with privacy, security and cost controls.
