import fs from "node:fs";

const path = "data/pan-india-jurisdiction-register.json";
const registry = JSON.parse(fs.readFileSync(path, "utf8"));
const expectedStates = 28;
const expectedUTs = 8;
const required = [
  "state_or_ut",
  "police_authority_url",
  "home_department_url",
  "state_legal_services_authority_url",
  "state_bar_council_url",
  "anti_corruption_or_vigilance_authority_url",
  "state_gazette_url",
  "high_court_url",
  "high_court_name",
  "high_court_jurisdiction_source_url",
  "last_verified_at",
  "verification_status"
];

if (!Array.isArray(registry.states) || registry.states.length !== expectedStates) {
  throw new Error(`Expected ${expectedStates} states in Pan-India register.`);
}
if (!Array.isArray(registry.union_territories) || registry.union_territories.length !== expectedUTs) {
  throw new Error(`Expected ${expectedUTs} Union Territories in Pan-India register.`);
}

for (const [kind, entries] of [["state", registry.states], ["UT", registry.union_territories]]) {
  const names = entries.map((entry) => entry.state_or_ut);
  if (names.some((name) => typeof name !== "string" || !name.trim())) {
    throw new Error(`Every ${kind} entry must have a name.`);
  }
  if (new Set(names).size !== names.length) {
    throw new Error(`Duplicate ${kind} names found.`);
  }
  for (const entry of entries) {
    for (const field of required) {
      if (!(field in entry)) throw new Error(`Missing ${field} for ${entry.state_or_ut}.`);
    }
    for (const [field, value] of Object.entries(entry)) {
      if (field.endsWith("_url") && value !== null) {
        try {
          const url = new URL(value);
          if (!["http:", "https:"].includes(url.protocol)) throw new Error();
        } catch {
          throw new Error(`Invalid URL in ${entry.state_or_ut}: ${field}`);
        }
      }
    }
  }
}

const linkedStates = registry.states.filter((entry) => entry.state_legal_services_authority_url).length;
const mappedHighCourts = [...registry.states, ...registry.union_territories].filter((entry) => entry.high_court_name && entry.high_court_jurisdiction_source_url).length;
if (mappedHighCourts !== expectedStates + expectedUTs) throw new Error("Every state/UT must have a High Court jurisdiction mapping and source.");
if (linkedStates < 1) throw new Error("No State Legal Services Authority links recorded.");
console.log(`Pan-India register valid: ${registry.states.length} states, ${registry.union_territories.length} UTs, ${linkedStates} SLSA links, ${mappedHighCourts} High Court jurisdiction mappings.`);
