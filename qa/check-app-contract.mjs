import fs from "node:fs";

const html = fs.readFileSync("index.html", "utf8");
const css = fs.readFileSync("styles.css", "utf8");
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

const htmlIds = [...html.matchAll(/id="([^"]+)"/g)].map(match => match[1]);
const duplicateIds = htmlIds.filter((id, index) => htmlIds.indexOf(id) !== index);
for (const id of new Set(duplicateIds)) errors.push("Duplicate HTML id: " + id);
const internalTargets = [...html.matchAll(/href="#([^"]+)"/g)].map(match => match[1]);
for (const target of new Set(internalTargets)) {
  if (!htmlIds.includes(target)) errors.push("Internal navigation target does not exist: #" + target);
}
for (const required of [
  'class="topbar"', 'class="hero"', 'class="hero-art"', 'class="globe"',
  'class="justice-figure"', 'class="feature-ribbon"', 'class="platform-preview section"',
  'preview-dashboard', 'preview-analysis', 'preview-phone', 'class="preview-case"',
  'id="case-preview"', 'id="fir-help"', 'id="assistant"', 'id="guides"',
  'id="lawyer-connect"', 'id="drafts"'
]) {
  if (!html.includes(required)) errors.push("Reference-design structure is missing: " + required);
}
for (const required of ["--navy:#071426", "--gold:#d9b66f", ".hero-art", ".feature-ribbon", ".preview-grid"]) {
  if (!css.includes(required)) errors.push("Premium design token or layout is missing: " + required);
}


const functionalContracts = [
  [app, 'document.getElementById("askBtn").addEventListener("click",showGuidance)', "Assistant action button is not wired."],
  [app, 'form.addEventListener("submit",event=>', "FIR complaint form submit handler is missing."],
  [app, 'document.getElementById("generateDraft").addEventListener("click"', "Draft generation action is not wired."],
  [app, 'document.getElementById("copyDraft").addEventListener("click"', "Draft copy action is not wired."],
  [app, 'document.getElementById("printDraft").addEventListener("click"', "Draft print action is not wired."],
  [app, 'document.getElementById("clearDraft").addEventListener("click"', "Draft clear action is not wired."],
  [app, 'document.querySelectorAll("[data-dashboard-tab]")', "Dashboard tab navigation is missing."],
  [app, 'checks.forEach(item=>item.addEventListener("change",update))', "Preparation checklist progress is not wired."],
  [app, 'source?.value||""', "Hero quick-question handoff is missing."],
  [cases, 'root.addEventListener("submit"', "Sample case creation/edit handler is missing."],
  [cases, 'function changeStatus(id,status)', "Sample case status transitions are missing."],
  [cases, 'function removeItem(id)', "Sample case removal handler is missing."],
  [cases, 'function beginEdit(id)', "Sample case editing handler is missing."]
];
for (const [source, needle, message] of functionalContracts) {
  if (!source.includes(needle)) errors.push(message);
}
for (const id of ["heroChatForm", "firDraftForm", "demoCaseForm", "askBtn", "generateDraft", "copyDraft", "printDraft", "clearDraft"]) {
  if (!new RegExp('id="' + id + '"').test(html)) errors.push("Required interactive control is missing: " + id);
}
if (!html.includes('aria-live="polite"') || !html.includes('id="firDraftStatus"') || !html.includes('id="draftStatus"')) {
  errors.push("Accessible live status feedback is missing from form workflows.");
}
if (/fetch\s*\(|XMLHttpRequest|sendBeacon/.test(cases)) {
  errors.push("Sample case manager must remain local-only and must not transmit case entries.");
}


const languageToggleStart = app.indexOf('document.getElementById("langToggle").addEventListener("click"');
const languageToggleEnd = app.indexOf("\nconst legalTopics=", languageToggleStart);
const languageToggleSource = languageToggleStart >= 0 && languageToggleEnd > languageToggleStart ? app.slice(languageToggleStart, languageToggleEnd) : "";
if (!languageToggleSource.includes('document.documentElement.lang=language')) errors.push("Language toggle must update the document language.");
if (!languageToggleSource.includes('applyDraftLanguage()')) errors.push("Language toggle must refresh the document generator labels.");
if (!app.includes('if(field&&(!field.value.trim()||field.value===lastDraftPreset[key]))field.value=preset[key]')) {
  errors.push("Changing interface language must preserve user-edited draft fields.");
}
if (!css.includes('.topbar nav a:focus-visible') || !css.includes('min-height:44px')) {
  errors.push("Mobile navigation must provide visible keyboard focus and 44px touch targets.");
}
if (!css.includes('@media(prefers-reduced-motion:reduce)') || !css.includes('.card:hover{transform:none}')) {
  errors.push("Reduced-motion preferences must disable card hover movement.");
}


const generatorEditHandlerStart = app.indexOf('draftFieldIds.forEach(id=>');
const generatorEditHandlerEnd = app.indexOf('document.getElementById("generateDraft").addEventListener("click"', generatorEditHandlerStart);
const generatorEditHandler = generatorEditHandlerStart >= 0 && generatorEditHandlerEnd > generatorEditHandlerStart ? app.slice(generatorEditHandlerStart, generatorEditHandlerEnd) : "";
if (!generatorEditHandler.includes('copyButton.textContent=translations[language].copyDraft')) {
  errors.push("Editing a generated draft must reset the copy button label.");
}
const generatorClearStart = app.indexOf('document.getElementById("clearDraft").addEventListener("click"');
const generatorClearEnd = app.indexOf('async function copyTextWithFallback', generatorClearStart);
const generatorClearHandler = generatorClearStart >= 0 && generatorClearEnd > generatorClearStart ? app.slice(generatorClearStart, generatorClearEnd) : "";
if (!generatorClearHandler.includes('document.getElementById("copyDraft").textContent=translations[language].copyDraft')) {
  errors.push("Clearing the generator must reset the copy button label.");
}
const generatorCopyStart = app.indexOf('document.getElementById("copyDraft").addEventListener("click"');
const generatorCopyEnd = app.indexOf('applyDraftLanguage();', generatorCopyStart);
const generatorCopyHandler = generatorCopyStart >= 0 && generatorCopyEnd > generatorCopyStart ? app.slice(generatorCopyStart, generatorCopyEnd) : "";
if (!generatorCopyHandler.includes('status.textContent=copied?translations[language].copied:translations[language].copyUnavailable') || !generatorCopyHandler.includes('status.hidden=false')) {
  errors.push("Copy success/failure must be announced through the accessible live status.");
}


if (!app.includes('function renderGuidance(container,content,answerLanguage=document.documentElement.lang==="en"?"en":"hi")')) {
  errors.push("Assistant link labels must accept the actual answer language.");
}
if (!app.includes('link.setAttribute("aria-label",answerLanguage==="hi"')) {
  errors.push("Assistant official-link accessibility labels must match the answer language.");
}
if (!app.includes('renderGuidance(out,(match?match.answer:') || !app.includes('))+privacy,answerLanguage);')) {
  errors.push("Assistant guidance must pass its detected answer language to the renderer.");
}
if (!cases.includes('search.setAttribute("aria-label",t().searchPlaceholder)') || !cases.includes('filter.setAttribute("aria-label",lang()==="en"?"Filter by status":"स्थिति के अनुसार फ़िल्टर")')) {
const caseActionLabels = [
  'move.setAttribute("aria-label",t().moveToReview+": "+displayTitle(item))',
  'move.setAttribute("aria-label",t().returnToDraft+": "+displayTitle(item))',
  'move.setAttribute("aria-label",t().reopenAction+": "+displayTitle(item))',
  'close.setAttribute("aria-label",t().closeAction+": "+displayTitle(item))',
  'edit.setAttribute("aria-label",t().edit+": "+displayTitle(item))',
  'del.setAttribute("aria-label",t().remove+": "+displayTitle(item))'
];
for (const label of caseActionLabels) {
  if (!cases.includes(label)) errors.push("Case manager action is missing a descriptive, case-specific accessible label: " + label);
}
  errors.push("Case search and status-filter accessible labels must follow the selected language.");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("App contract checks passed: page translation coverage, bilingual presets, safe print escaping and pagination, isolated assistant language state, disabled API, no browser storage, and key input limits.");
