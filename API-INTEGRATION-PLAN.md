# NYAY SAATHI — API Integration Plan

**Status:** Planning only. No live API URL is configured and no frontend-to-backend request is enabled.
**Reviewed:** 27 November 2026

## Current architecture

- GitHub Pages serves the static website.
- `api-config.js` currently sets an empty `window.NYAY_API_BASE`.
- `app.js` currently runs the local rules-based `showGuidance()` assistant.
- `server/index.js` is a separate Express API prototype with `GET /health` and `POST /api/ask`.
- `render.yaml` describes a possible Render deployment; it does not confirm a deployed service.
- The API currently sends the question to a general model. It does not retrieve the legal-source registry or the MP knowledge pack and does not return source citations.

## Why the frontend must not be connected yet

A general model answer without retrieval from current, verified Indian legal sources can be incomplete, outdated or incorrect. The existing API response has only an `answer` field and does not provide auditable source references. Connecting it now could make a prototype appear to be a reliable legal assistant when it is not.

## Required stages before connection

### Stage 1 — Legal-source retrieval
- Build a controlled retrieval layer from reviewed official-source documents.
- Store source title, issuing authority, jurisdiction, effective date, last-checked date and canonical URL with each passage.
- Apply state/UT and date-of-event context only where the source supports it.
- Do not claim coverage for laws or states that are not in the verified corpus.

### Stage 2 — Grounded API response
- Return answer text plus structured source references and review metadata.
- Require the assistant to say when no reliable source is available.
- Do not invent section numbers, deadlines, fees, eligibility rules or case citations.
- Keep model/API keys server-side. Never place secrets in static website files or the repository.

### Stage 3 — Privacy and security review
- Use fictional prompts only during prototype testing.
- Do not collect real FIRs, identity documents, names, addresses, phone numbers or private case files.
- Review data retention, provider settings, logs, rate limits, abuse controls, CORS and error handling.
- Obtain appropriate adult oversight and qualified Indian legal-professional review before any public launch.

### Stage 4 — Controlled frontend integration
- Configure the API base URL only after a real deployment is verified.
- Keep the rules-based guide available as a clearly labelled fallback.
- Show source links and a visible general-information disclaimer for every AI response.
- Provide a clear service-unavailable state; never silently present a fallback as an AI answer.

### Stage 5 — Release testing
- Run the 16 Hindi/English synthetic checks in `qa/MP-SYNTHETIC-TEST-SET.md`.
- Compare against `qa/MP-EXPECTED-ANSWERS.md`.
- Record actual outputs in a dated execution log. Do not mark tests passed before they are run.
- Block release for any critical source-accuracy, safe-routing or privacy failure.

## Release rule

Until all stages are completed and reviewed, describe NYAY SAATHI as a **static educational prototype with a rules-based demo assistant**, not a live AI legal service.
