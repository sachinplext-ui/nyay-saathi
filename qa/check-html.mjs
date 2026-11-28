import fs from "node:fs";

const html = fs.readFileSync("index.html", "utf8");
const errors = [];
const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1]);
const seen = new Set();
for (const id of ids) {
  if (seen.has(id)) errors.push("Duplicate id: " + id);
  seen.add(id);
}
for (const match of html.matchAll(/<a\b([^>]*)href=["']#([^"']*)["']([^>]*)>/gi)) {
  const target = match[2];
  if (target && !seen.has(target)) errors.push("Missing in-page target: #" + target);
}
for (const match of html.matchAll(/<a\b[^>]*target=["']_blank["'][^>]*>/gi)) {
  if (!/\brel=["'][^"']*\bnoopener\b/i.test(match[0])) {
    errors.push("External new-tab link is missing rel=noopener: " + match[0].slice(0, 120));
  }
}
for (const asset of ["styles.css", "app.js", "cases.js"]) {
  if (!html.includes(asset)) errors.push("Missing asset reference: " + asset);
}
const labelTargets = new Set([...html.matchAll(/<label\\b[^>]*\\bfor=["']([^"']+)["']/gi)].map(match => match[1]));
for (const match of html.matchAll(/<(input|select|textarea)\\b([^>]*)>/gi)) {
  const attrs = match[2];
  if (/\\btype=["']hidden["']/i.test(attrs)) continue;
  const id = attrs.match(/\\bid=["']([^"']+)["']/i)?.[1];
  const hasAriaLabel = /\\baria-label=["'][^"']+["']/i.test(attrs);
  if (!hasAriaLabel && (!id || !labelTargets.has(id))) {
    errors.push("Form control is missing an associated label or aria-label: <" + match[1] + "> " + attrs.slice(0, 100));
  }
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("HTML source checks passed: unique IDs, in-page anchors, safe new-tab links and core assets.");
