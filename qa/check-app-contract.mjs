import fs from "node:fs";

const html = fs.readFileSync("index.html", "utf8");
const app = fs.readFileSync("app.js", "utf8");
const api = fs.readFileSync("server/index.js", "utf8");
const errors = [];

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
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("App contract checks passed: bilingual presets, safe print escaping and pagination, isolated assistant language state, disabled API, no browser storage, and key input limits.");
