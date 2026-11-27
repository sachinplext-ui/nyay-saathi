# NYAY SAATHI — Data Retention and Deletion Plan

## Current prototype

No NYAY SAATHI user accounts, case database, document upload, evidence vault, or online filing are enabled. The static application-draft generator formats text in the browser and does not send the draft to the NYAY SAATHI server. The project therefore does not currently maintain user case records to delete.

Static assets may be cached by the browser service worker. Users can clear site data/cache using their browser settings. Hosting-provider technical logs are governed by that provider's own policies and retention practices.

## Before any future personal-data feature is enabled

The project owner must document and approve:

1. **Data inventory:** each field/file collected, why it is necessary, and whether it can be avoided.
2. **Retention period:** a defined period for each data category, with a clear start point and reason. Do not retain data indefinitely by default.
3. **Deletion workflow:** user-requested deletion, account closure, expired records, backup expiry, and confirmation of completion.
4. **Backups:** how deleted records age out of backups and how restoration avoids resurrecting deleted data.
5. **Legal holds:** a reviewed, narrowly scoped process where retention is legally required; notify the affected person where lawful.
6. **Processors:** documented hosting, identity, storage, email, analytics, and AI providers, including their retention settings and contracts.
7. **Audit:** record that a deletion request was processed without retaining the deleted document contents.
8. **Rights and contact:** publish a responsible contact and a clear process for access, correction, export, and deletion requests.

## Proposed minimization defaults

- Do not collect Aadhaar, PAN, bank details, passwords, OTPs, full FIR copies, or precise home addresses merely for registration.
- Keep development and QA data synthetic.
- Disable file uploads until private storage, access control, malware scanning, encryption, retention, deletion, and independent security review are ready.
- Never store user documents in the public GitHub repository or public website directory.

## Launch gate

No personal-data collection or document storage may be enabled until qualified privacy/legal and security reviewers have approved the data inventory, notice, retention schedule, deletion workflow, child-safety/age eligibility, and incident-response process. A trusted adult project owner must oversee hosting, accounts, and production secrets.
