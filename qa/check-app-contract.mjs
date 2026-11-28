import fs from "node:fs";

const html = fs.readFileSync("index.html", "utf8");
const app = fs.readFileSync("app.js", "utf8");
const cases = fs.readFileSync("cases.js", "utf8");
const api = fs.readFileSync("server/index.js", "utf8");
const errors = [];

function objectKeys(source) {
  return new Set([...source.matchAll(/(?:^|[,{\s])\s*([A-Za-z_$][\w$]*)\s*:/g)].map(match => match[1]));
}

const englishStart = app.indexOf("const translations={en:{") + "const translations={en:{".length;
const hindiStart = app.indexOf("},hi:{", englishStart);
const hindiEnd = app.indexOf("}};", hindiStart);
const englishKeys = objectKeys(app.slice(englishStart, hindiStart));
const pageHindiStart = app.indexOf("const hi={") + "const hi={".length;
const pageHindiEnd = app.indexOf(";\nlet language", pageHindiStart);
const hindiKeys = objectKeys(app.slice(pageHindiStart, pageHindiEnd));
const pageKeys = [...html.matchAll(/data-i18n=["']([^"']+)["']/g)].map(match => match[1]);
for (const key of new Set(pageKeys)) {
  if (!englishKeys.has(key)) errors.push("Missing English page translation: " + key);
  if (!hindiKeys.has(key)) errors.push("Missing Hindi page translation: " + key);
}
if (hindiStart < 0 || hindiEnd < 0 || pageHindiStart < "const hi={".length || pageHindiEnd < 0) {
  errors.push("Could not locate both page translation dictionaries for language coverage checks.");
}

const caseHiStart = cases.indexOf("hi:{") + "hi:{".length;
const caseEnStart = cases.indexOf("en:{", caseHiStart) + "en:{".length;
const caseDictEnd = cases.indexOf("};", caseEnStart);
const caseHindiKeys = objectKeys(cases.slice(caseHiStart, caseEnStart - "en:{".length));
const caseEnglishKeys = objectKeys(cases.slice(caseEnStart, caseDictEnd));
const casePageKeys = [...html.matchAll(/data-case-text=["']([^"']+)["']/g)].map(match => match[1]);
for (const key of new Set(casePageKeys)) {
  if (!caseHindiKeys.has(key)) errors.push("Missing Hindi case-manager translation: " + key);
  if (!caseEnglishKeys.has(key)) errors.push("Missing English case-manager translation: " + key);
}
if (caseHiStart < "hi:{".length || caseEnStart < "en:{".length || caseDictEnd < 0) {
  errors.push("Could not locate both case-manager translation dictionaries.");
}
if (!cases.includes('new MutationObserver(()=>{labels();render();})')) {
  errors.push("Case manager must refresh translated labels and cards when page language changes.");
}

const firSupportStart = app.indexOf("/* FIR support center:");
const firSupportEnd = app.indexOf("\n})();", firSupportStart);
const firSupportSource = firSupportStart >= 0 && firSupportEnd > firSupportStart ? app.slice(firSupportStart, firSupportEnd) : "";
for (const required of ['hi:{', 'en:{', 'labels:[', 'placeholders:[', 'new MutationObserver(updateLanguage)', 'label.textContent=t.labels[i]', 'input.placeholder=t.placeholders[i]']) {
  if (!firSupportSource.includes(required)) errors.push("FIR support center is missing bilingual live-update contract: " + required);
}
if (!firSupportSource.includes('copy[document.documentElement.lang==="en"?"en":"hi"].required') || !firSupportSource.includes('copy[en?"en":"hi"].status')) {
  errors.push("FIR complaint draft status messages must follow the selected language.");
}

const selectStart = html.indexOf('<select id="draftType"');
const selectEnd = html.indexOf("</select>", selectStart);
const selector = selectStart >= 0 && selectEnd > selectStart ? html.slice(selectStart, selectEnd) : "";
const types = [...selector.matchAll(/<option[^>]*value=["']([^"']+)["']/g)].map(match => match[1]);
const presetStart = app.indexOf("const draftPresets");
const presetEnd = app.indexOf("let lastDraftPreset", presetStart);
const presetSource = presetStart >= 0 && presetEnd > presetStart ? app.slice(presetStart, presetEnd) : "";

for (const type of types) {
  if (!new RegExp("\\b" + type + ":\\s*\\{").test(presetSource)) {
    errors.push("Missing bilingual draft preset: " + type);
  }
}
for (const required of ["general", "police", "records", "fircopy", "zeroFir", "refusal", "cyber"]) {
  if (!types.includes(required)) errors.push("Missing draft type option: " + required);
}
const printStart = app.indexOf('document.getElementById("printDraft")');
const printEnd = app.indexOf("/* Hero quick-question", printStart);
const printSource = printStart >= 0 && printEnd > printStart ? app.slice(printStart, printEnd) : "";
if (!printSource.includes('.replace(/&/g') || !printSource.includes('.replace(/</g') || !printSource.includes('.replace(/>/g')) {
  errors.push("Print flow must escape user text before writing HTML.");
}
if (!api.includes("return res.status(503)") || !api.includes("Fail closed until verified legal-source retrieval")) {
  errors.push("AI API must remain fail-closed until verified legal-source retrieval is implemented.");
}
if (/localStorage|sessionStorage/.test(app)) {
  errors.push("Unexpected browser storage reference found; review privacy implications.");
}
for (const [id, max] of [["heroQuestion", "300"], ["question", "1200"], ["firFacts", "1800"], ["draftFacts", "1800"]]) {
  const tag = html.match(new RegExp("<(?:input|textarea)\\b[^>]*id=[\\\"']" + id + "[\\\"'][^>]*>", "i"))?.[0] || "";
  if (!tag.includes('maxlength="' + max + '"')) errors.push("Missing expected input limit for " + id);
}
const guidanceStart = app.indexOf("function showGuidance()");
const guidanceEnd = app.indexOf("\nconst questionInput", guidanceStart);
const guidanceSource = guidanceStart >= 0 && guidanceEnd > guidanceStart ? app.slice(guidanceStart, guidanceEnd) : "";
if (!guidanceSource.includes("const answerLanguage=") || /(^|[^\w])language\s*=/.test(guidanceSource)) {
  errors.push("Assistant answer language must stay local and must not mutate interface language state.");
}
if (printSource.includes("break-inside:avoid-page")) {
  errors.push("Long print drafts must be allowed to paginate across pages.");
}
if (!printSource.includes("widows:3") || !printSource.includes("orphans:3")) {
  errors.push("Print flow should retain widow/orphan controls for readable pagination.");
}

// Reference-design and navigation integrity checks.
const htmlIds = [...html.matchAll(/\\bid=["']([^"']+)["']/g)].map(match => match[1]);
const duplicateIds = htmlIds.filter((id, index) => htmlIds.indexOf(id) !== index);
for (const id of new Set(duplicateIds)) errors.push("Duplicate HTML id: " + id);
const internalTargets = [...html.matchAll(/href=["']#([^"']+)["']/g)].map(match => match[1]);
for (const target of new Set(internalTargets)) {
  if (!htmlIds.includes(target)) errors.push("Internal navigation target does not exist: #" + target);
}
for (const required of [
  'class="topbar"', 'class="hero"', 'class="hero-art"', 'class="globe"',
  'class="justice-statue"', 'class="feature-ribbon"', 'class="platform-preview section"',
  'class="preview-dashboard"', 'class="preview-analysis"', 'class="preview-phone"',
  'class="preview-case"', 'id="case-preview"', 'id="fir-help"', 'id="assistant"',
  'id="guides"', 'id="lawyer-connect"', 'id="drafts"'
]) {
  if (!html.includes(required)) errors.push("Reference-design structure is missing: " + required);
}
for (const required of ["--navy:#071426", "--gold:#d9b66f", ".hero-art", ".feature-ribbon", ".preview-grid"]) {
  if (!app && !css.includes(required)) errors.push("Premium design token or layout is missing: " + required);
}
const unsafeExternalTargets = [...html.matchAll(/<a\\b(?=[^>]*target=["']_blank["'])(?![^>]*rel=["'][^"']*noopener)[^>]*>/gi)];
if (unsafeExternalTargets.length) errors.push("External links opening new tabs must include rel=noopener.");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("App contract checks passed: page translation coverage, bilingual presets, safe print escaping and pagination, isolated assistant language state, disabled API, no browser storage, and key input limits.");
