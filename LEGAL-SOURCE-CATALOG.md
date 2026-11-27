# NYAY SAATHI — Official Legal Source Catalogue

**Status:** Initial source map for development. Not a complete index of Indian law and not a legal certification. Links and availability must be rechecked before each production use.

## 1. Source-use rules

1. Prefer the issuing authority's original Act, rule, notification, order, judgment or official procedure page.
2. A search result, snippet, blog, news story or AI-generated summary is a discovery aid only; it is not proof of the law.
3. Record the exact document and provision used. Do not cite only a homepage when a more specific official document is available.
4. Check publication date, commencement/effective date, amendments, repeal, saving clauses and territorial scope.
5. If an official source is unavailable, inaccessible, contradictory or not current, say that verification is incomplete. Do not fill the gap by guessing.
6. State/UT-specific routes must be selected only after the relevant State/UT is known. Never present one state's process as an all-India process.
7. Keep a retrieval date and recheck high-impact information before displaying it to a user.

## 2. Initial primary-source directory

| Subject | Official source | Intended use | Important limitation |
|---|---|---|---|
| Central Acts and subordinate legislation | [India Code](https://www.indiacode.nic.in/) | Locate central Acts, sections and available rules/regulations | Check the Act's amendment history and commencement; do not assume the displayed text resolves every transitional issue |
| Central Gazette notifications | [e-Gazette of India](https://egazette.gov.in/) | Verify Gazette notifications, commencement and amendments | Identify the exact notification and relevant date; a search listing alone is insufficient |
| Ministry of Home Affairs | [MHA](https://www.mha.gov.in/) | Official central material on criminal-law implementation and home-affairs topics | Not a substitute for the enacted statute, Gazette notification or state-specific police procedure |
| Supreme Court of India | [Supreme Court of India](https://www.sci.gov.in/) | Official judgments, orders, notices and court information | Verify case name/number, decision date, operative directions and later treatment |
| eCourts Services | [eCourts Services](https://ecourts.gov.in/) | Court-service information and case-status access | Case status is not legal advice; do not request or store a user's case identifiers in this prototype |
| National Legal Services Authority | [NALSA](https://nalsa.gov.in/) | Legal-aid framework, schemes and access-to-justice information | Eligibility, application and local contact details must be checked with the relevant State/District Legal Services Authority |
| NALSA legal aid | [Legal Aid](https://nalsa.gov.in/legal-aid/) | General legal-aid information | Verify current eligibility and local process before giving a specific referral |
| Bar Council of India | [BCI](https://www.barcouncilofindia.org/) | National professional-regulation materials and rules | Individual advocate complaints may fall to the relevant State Bar Council; verify the proper forum |
| National Cyber Crime Reporting Portal | [Cyber Crime Portal](https://cybercrime.gov.in/) | Official cybercrime reporting information | Not a general portal for every type of legal complaint; emergency and local police options may also matter |

## 3. State and Union Territory source map

For each State/UT, maintain separately verified official entries for:

- State Police headquarters and official citizen-services/complaint pages.
- State Home Department and relevant police complaint authority, where established.
- State Legal Services Authority and District Legal Services Authorities.
- State Bar Council and its official complaint/procedure information.
- Anti-Corruption Bureau, vigilance department, Lokayukta or other competent authority, as applicable.
- State Gazette and official state legislation/rules portals.
- Relevant High Court official website and its judgments/rules pages.

**Do not populate a State/UT entry from an unofficial directory.** Confirm that the domain is controlled by the relevant government, court or statutory body. Store the exact page/document URL, responsible authority, territorial scope, date checked and any stated eligibility or jurisdiction limits.

## 4. Source record schema

Use one record per document or official procedure page. Suggested JSON shape:

```json
{
  "source_id": "IN-CENTRAL-ACT-EXAMPLE-001",
  "jurisdiction": {
    "level": "Central",
    "state_or_ut": null,
    "territory": "India"
  },
  "instrument_type": "Act | Rule | Regulation | Gazette notification | Judgment | Official procedure",
  "title": "Exact official title",
  "issuing_authority": "Exact issuing authority",
  "provision": "Exact section, rule, paragraph or page",
  "publication_date": "YYYY-MM-DD or null",
  "effective_from": "YYYY-MM-DD or null",
  "effective_to": null,
  "status": "in_force | amended | repealed | superseded | unverified",
  "amends_or_replaces": [],
  "saving_or_transition_notes": "Verified note or null",
  "official_url": "Exact official document URL",
  "language": "en",
  "retrieved_at": "YYYY-MM-DD",
  "last_verified_at": "YYYY-MM-DD",
  "verification_status": "verified | needs_review | unavailable",
  "reviewer_note": "What was checked and what remains uncertain"
}
```

Do not create a source record with invented dates, section numbers, document titles or URLs. Use `null` or `needs_review` when a field is not verified.

## 5. Retrieval and answer requirements

For every legal answer, the future assistant should retain and display:

- Source title and issuing authority.
- Exact provision or paragraph relied upon.
- Official source link.
- Publication/effective date where relevant.
- Jurisdiction and territorial scope.
- Last-checked date.
- Any uncertainty, exception or missing material.

The assistant must distinguish:
- enacted text from draft bills and explanatory material;
- a judgment's binding holding from background observations;
- central law from state rules and local procedure;
- a general legal explanation from advice on a specific person's facts.

If sources conflict, prefer the controlling primary authority after checking hierarchy, date, jurisdiction and subsequent amendments or judgments. If the conflict cannot be resolved confidently, disclose it and recommend qualified legal review.

## 6. Initial coverage priorities

Build and verify source records in this order:

1. Criminal-law statutes and commencement/transition material relevant to the BNS, BNSS and BSA.
2. General police procedure and rights information from applicable statutes and official rules.
3. Legal-aid eligibility and State/District Legal Services Authority contacts.
4. Advocate professional-conduct rules and State Bar Council complaint routes.
5. State-specific anti-corruption/vigilance reporting channels.
6. Other central and state laws only as their official source records are reviewed.

This priority list is a work plan, not a claim that these topics are already fully covered.

## 7. Privacy and prototype boundary

- Use fictional examples only during development and testing.
- Do not ask users to upload FIRs, identity documents, private correspondence or other case files.
- Do not store names, addresses, phone numbers, FIR numbers or other identifying case details.
- Do not claim the website has searched all Indian laws or verified every state procedure.
- A qualified Indian legal professional must review the source set and answer tests before any public legal-assistance launch.
- Any public data collection or live AI service requires appropriate adult oversight and independent legal, privacy and security review.

**Current state:** This catalogue is a development framework. It does not connect the website to live legal databases or make the assistant operational.
