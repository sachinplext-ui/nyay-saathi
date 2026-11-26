# NYAY SAATHI API

A small Node.js backend for the static GitHub Pages website. It keeps the OpenAI API key on the server and exposes only a limited legal-information endpoint.

## Environment variables

- `OPENAI_API_KEY` — set privately in the hosting provider's environment settings. Never put it in GitHub source files or browser JavaScript.
- `ALLOWED_ORIGIN` — defaults to `https://sachinplext-ui.github.io`.
- `OPENAI_MODEL` — optional; defaults to `gpt-5.5`.
- `PORT` — supplied by most hosting providers.

## Deploy

Deploy this folder as a separate Node web service using:
- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`

Set the environment variables privately in the hosting dashboard. A trusted adult should manage any API account, secret key, and billing. Never send the key in chat or commit it to this repository.

After deployment, test `/health` and configure the website's `window.NYAY_API_BASE` to the service's HTTPS base URL in a small public config script. Do not place secrets in that script.

## Privacy and limits

The endpoint does not save questions in an application database and asks the model not to store the response (`store: false`). Hosting providers may still process operational logs. Rate limiting is enabled. Do not enter personal identifiers or confidential case documents.

This is an educational information tool, not a law firm, government service, emergency service, or substitute for a qualified advocate. It does not file complaints or determine legal rights.