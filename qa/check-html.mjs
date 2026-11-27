import fs from "node:fs";

const html = fs.readFileSync("index.html", "utf8");
const errors = [];
const ids = [...html.matchAll(/\\bid=["']([^"']+)["']/g)].map(match => match[1]);
const seen = new Set();
for (const id of ids) {
  if (seen.has(id)) errors.push("Duplicate id: " + id);
  seen.add(id);
}
for (const match of html.matchAll(/<a\\b([^>]*)href=["']#([^"']*)["']([^>]*)>/gi)) {
  const target = match[2];
  if (target && !seen.has(target)) errors.push("Missing in-page target: #" + target);
}
for (const match of html.matchAll(/<a\\b[^>]*target=["']_blank["'][^>]*>/gi)) {
  if (!/\\brel=["'][^"']*\\bnoopener\\b/i.test(match[0])) {
    errors.push("External new-tab link is missing rel=noopener: " + match[0].slice(0, 120));
  }
}
for (const asset of ["styles.css", "app.js", "cases.js"]) {
  if (!html.includes(asset)) errors.push("Missing asset reference: " + asset);
}
if (errors.length) {
  console.error(errors.join("\\n"));
  process.exit(1);
}
console.log("HTML source checks passed: unique IDs, in-page anchors, safe new-tab links and core assets.");
