# NYAY SAATHI — AI Legal Rights & Justice Assistant Blueprint

**Status:** Planning document only. This blueprint does not mean the AI feature is live or legally verified.

## 1. Product objective

Build a Hindi/English educational legal-information assistant for India. It should help people understand general rights, legal processes, official complaint routes and questions to ask a qualified advocate. It must not present itself as a lawyer, government service or substitute for legal representation.

## 2. Main user journeys

- **Know Your Rights:** explain general rights and common procedures involving police, courts and public authorities.
- **Police Concern Guide:** explain lawful, non-confrontational options for concerns such as refusal to record information, misconduct or questions about arrest/bail.
- **Advocate Fees & Conduct:** distinguish, where reliable official material exists, court/government fees from privately agreed professional fees; explain receipts, second opinions and the relevant Bar Council complaint route.
- **Bribery / Corruption Guide:** explain safe official reporting channels for the relevant state or department. Never encourage paying a bribe, confronting a person, secretly obtaining evidence unlawfully or making public accusations.
- **Law & Section Checker:** explain statutes and sections with the jurisdiction, effective date, amendment status and official source.
- **Complaint Preparation:** provide a neutral checklist or generic draft using fictional placeholders only.

## 3. Answer workflow

1. Identify the broad topic and whether the user is asking for general information or an urgent safety issue.
2. Establish only the minimum non-identifying context needed: state/UT, broad subject, and relevant date range. Do not request names, addresses, phone numbers, FIR numbers, identity numbers or private documents.
3. Retrieve relevant official material and exact passages.
4. Select the law in force for the relevant date, including transition/saving provisions where applicable.
5. Explain the general rule, exceptions/uncertainties, practical lawful options and when to contact a qualified advocate or legal-aid service.
6. Show source title, issuing authority, link, relevant section/paragraph and last-checked date. If a source cannot be verified, say so rather than guessing.

## 4. Legal knowledge and retrieval design

Prefer primary and authoritative sources:
- India Code and the e-Gazette for Acts, rules and amendments.
- Supreme Court and relevant High Court official websites for judgments and orders.
- Central and State Government department websites for procedures and schemes.
- NALSA and State/District Legal Services Authorities for legal-aid information.
- Bar Council of India and the relevant State Bar Council for professional-conduct and complaint information.
- Official State ACB / vigilance / Lokayukta sources for corruption-reporting routes, as applicable.

Every stored legal source should carry metadata:
- jurisdiction (Central, State/UT and relevant territory);
- instrument type and exact title;
- section/rule/paragraph;
- publication and effective dates;
- amendment, repeal or supersession status;
- official source URL and retrieval date;
- language and source-text version.

Do not treat search snippets, blogs, social posts or model memory as authoritative legal text. Secondary sources may help explain a topic but must not replace the primary source.

## 5. Date-aware law handling

The assistant must ask for a broad incident or proceeding date only when it materially affects the answer. It must not assume that a newer statute automatically applies to every older event or pending proceeding. It should check commencement, amendment, repeal and saving/transition provisions before mapping old and new section numbers. If the facts are insufficient, explain the uncertainty and direct the user to a qualified advocate.

## 6. Police, advocate and corruption safeguards

- Do not declare any named or identifiable person guilty based on a one-sided account.
- Use neutral wording such as “if this happened as described” and explain that facts require proper review.
- Do not promise an FIR, arrest, bail, disciplinary action, refund or case outcome.
- Do not recommend confrontation, threats, bribery, evasion of lawful process, evidence alteration/destruction or unlawful recording.
- Encourage preserving original records lawfully and seeking qualified help.
- For urgent danger, advise contacting local emergency services and a trusted adult.
- Make clear that complaint authorities and procedures vary by state, department and type of allegation.

## 7. Privacy and security requirements

- Keep API keys on the server; never put secrets in browser JavaScript or GitHub.
- Minimize request data and logs; do not retain question text or case files by default.
- Do not enable uploads, accounts, case histories or evidence storage as part of the first release.
- Do not solicit real FIRs, identity documents, addresses, contact details or private case records in the prototype.
- Use fictional test scenarios only.
- Apply rate limits, strict input-size limits, origin controls, secure headers, abuse monitoring and clear service limits.
- Before any public data collection or paid service, obtain appropriate adult oversight and independent privacy, security and legal review.

## 8. User-facing answer format

Each answer should normally contain:
1. **Short answer** — plain Hindi or English.
2. **What the law/source says** — exact provision and date context.
3. **What you can do lawfully** — general, safe next steps.
4. **Where to get official help** — verified authority for the relevant state/subject.
5. **Limits** — what is unknown and when a qualified advocate is needed.
6. **Sources** — clickable official sources and last-checked date.

## 9. Quality assurance before launch

Create a synthetic test set covering:
- old-law/new-law date transitions;
- Central versus State jurisdiction;
- police procedure and complaint routes;
- advocate fee and professional-conduct questions;
- bribery/corruption reporting;
- missing facts and conflicting sources;
- urgent safety scenarios;
- Hindi/English consistency.

A qualified Indian legal professional should review legal answers and test cases. Track citation accuracy, incorrect section mappings, stale sources, unsupported claims and unsafe recommendations. Do not launch a feature that cannot show its source or clearly communicate uncertainty.

## 10. Current repository boundary

The current website is a static educational prototype. Its existing assistant is rules-based; the backend folder is not proof of a live, source-grounded legal AI service. This blueprint does not activate or deploy the backend, connect an AI provider, collect user data or claim comprehensive legal coverage.

**Recommended implementation order:** (1) build and review the official-source catalogue, (2) implement retrieval with citations and date/jurisdiction metadata, (3) add the guided user interface, (4) test with synthetic scenarios and legal review, (5) only then consider a carefully supervised limited release.
