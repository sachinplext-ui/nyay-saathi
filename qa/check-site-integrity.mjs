import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const htmlFiles = fs.readdirSync(root).filter(name => name.endsWith(".html"));
const errors = [];
const knownFiles = new Set(fs.readdirSync(root));

for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  const ids = [...html.matchAll(/\\bid=["']([^"']+)["']/gi)].map(match => match[1]);
  const seen = new Set();
  for (const id of ids) {
    if (seen.has(id)) errors.push(file + ": duplicate id #" + id);
    seen.add(id);
  }

  for (const match of html.matchAll(/\\bhref=["']([^"']+)["']/gi)) {
    const href = match[1].trim();
    if (!href || href.startsWith("#") || /^(https?:|mailto:|tel:|sms:|data:)/i.test(href)) continue;
    if (/^(javascript:|file:)/i.test(href)) {
      errors.push(file + ": unsafe link scheme " + href);
      continue;
    }
    const [pathname, fragment] = href.split("#");
    const targetFile = pathname ? path.posix.normalize(path.posix.join(path.posix.dirname(file), pathname)) : file;
    if (!knownFiles.has(targetFile)) {
      errors.push(file + ": local link target missing: " + href);
    } else if (fragment) {
      const targetHtml = fs.readFileSync(path.join(root, targetFile), "utf8");
      const targetIds = new Set([...targetHtml.matchAll(/\\bid=["']([^"']+)["']/gi)].map(item => item[1]));
      if (!targetIds.has(decodeURIComponent(fragment))) errors.push(file + ": missing local fragment target: " + href);
    }
  }

  for (const match of html.matchAll(/<a\\b[^>]*target=["']_blank["'][^>]*>/gi)) {
    if (!/\\brel=["'][^"']*\\bnoopener\\b/i.test(match[0])) errors.push(file + ": target=_blank link missing rel=noopener");
  }
  for (const match of html.matchAll(/<img\\b([^>]*)>/gi)) {
    if (!/\\balt=["'][^"']*["']/i.test(match[1])) errors.push(file + ": image missing alt text");
  }
  if (!/^<!doctype html>/i.test(html.trimStart())) errors.push(file + ": missing HTML5 doctype");
}

if (errors.length) {
  console.error(errors.join("\\n"));
  process.exit(1);
}
console.log("Site integrity checks passed: " + htmlFiles.length + " HTML pages, unique IDs, local links/fragments, safe new-tab links, image alt text and HTML5 doctypes.");
