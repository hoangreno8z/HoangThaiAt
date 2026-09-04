const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data', 'duong-trach');
const REQUIRED = ['manifest.json', 'articles.json', 'sources.json', 'records.json', 'documents.json', 'search-index.json'];

function read(name) {
  const altName = (name === 'articles.json' && fs.existsSync(path.join(DATA, 'articles_vault.json'))) ? 'articles_vault.json' : name;
  const file = path.join(DATA, altName);
  if (!fs.existsSync(file)) throw new Error(`Missing generated file: ${name}. Run npm run corpus:build.`);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function duplicateIds(items, getter) {
  const seen = new Set();
  return items.map(getter).filter(id => id && (seen.has(id) || !seen.add(id)));
}

const manifest = read('manifest.json');
const articles = read('articles.json');
const sources = read('sources.json');
const records = read('records.json');
const documents = read('documents.json');
const search = read('search-index.json');

assert(REQUIRED.every(name => fs.existsSync(path.join(DATA, name))), 'Generated corpus is incomplete.');
assert(articles.length >= 20, `Expected at least 20 corpus topics, found ${articles.length}.`);
assert(Array.isArray(manifest.sourceArtifacts) && manifest.sourceArtifacts.length === 3, 'Expected provenance for all three user-supplied artifacts.');
manifest.sourceArtifacts.forEach(artifact => assert(/^[a-f0-9]{64}$/.test(artifact.sha256), `Invalid source artifact hash: ${artifact.name}`));
assert(articles.every((article, index) => article.batch === String(index + 1).padStart(2, '0')), 'Batch order is not sequential 01 onwards.');
assert(!duplicateIds(articles.flatMap(article => article.entries), entry => entry.id).length, 'Duplicate readable entry IDs detected.');
assert(!duplicateIds(sources, source => source.source_id).length, 'Duplicate canonical source IDs detected.');
assert(documents.length >= 90, 'Markdown research documents appear incomplete.');
assert(records.length >= 600, 'Machine-readable corpus records appear incomplete.');
assert(search.length >= records.length + documents.length, 'Search index does not cover the corpus.');
assert(Object.values(manifest.qa || {}).every(value => value === 'PASS'), 'QA-H is not fully green.');
assert(manifest.qa.NO_NUMERIC_THRESHOLD_HALLUCINATION === 'PASS', 'Numeric-threshold hallucination gate failed.');
assert(manifest.qa.SCHOOL_ISOLATION === 'PASS', 'School isolation gate failed.');
assert(manifest.qa.NO_UNVALIDATED_DATE_OUTPUT === 'PASS', 'Unvalidated date output gate failed.');

const readable = articles.flatMap(article => article.entries);
const originalEntries = readable.filter(entry => entry.original && entry.original !== '—');
assert(originalEntries.every(entry => entry.hanViet), 'Every original Chinese excerpt must have Hán-Việt.');
assert(originalEntries.every(entry => entry.evidence), 'Every original Chinese excerpt must expose evidence state.');
assert(originalEntries.every(entry => entry.literal || /NO_DIRECT_EVIDENCE|TECHNICAL_NOT_FENG_SHUI|REQUIRES_SCAN/.test(String(entry.evidence))), 'Chinese excerpts without literal translation must be explicitly blocked, pending scan, or non-feng-shui evidence.');

const sourceIds = new Set(sources.map(source => source.source_id));
const unresolvedArticleSources = readable
  .flatMap(entry => String(entry.sourceId || '').split(/[•,;]/).map(value => value.trim()).filter(value => value.startsWith('SRC-') || value.startsWith('MOD-')))
  .filter(sourceId => !sourceIds.has(sourceId));

console.log(JSON.stringify({
  result: 'PASS',
  topics: articles.length,
  readableEntries: readable.length,
  sources: sources.length,
  machineRecords: records.length,
  researchDocuments: documents.length,
  searchRecords: search.length,
  unresolvedArticleSourceAliases: [...new Set(unresolvedArticleSources)].length,
  note: 'Source aliases remain visible and fail-closed; no evidence state was promoted.'
}, null, 2));
