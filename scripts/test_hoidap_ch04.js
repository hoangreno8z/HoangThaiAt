'use strict';

// Chapter 4 release guard: validate the revised content and preserve
// Chapter 1, Chapter 2, Chapter 3, and all 60 entries outside this release's scope.
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..', '..', '..', 'scratch', 'thai_at_app');
const baselineBlobSha = '2200bc186ea6cbb5c46e8ea2dad93d929155bdb1';
const ch01BlobSha = '196c4ea01802549f05b3cc42e5e32a37de518253';
const ch02BlobSha = '708fd9e3e76d645aac3d68ccc07d2b3f269a25e2';
const ch03BlobSha = 'cadb258a519f96b38b46432fee231341a0ed507f';
const dataPath = path.join(root, 'js', 'hoidap_data.js');
const evidenceLevels = new Set([
  'VERIFIED', 'SUPPORTED', 'LINEAGE_DEPENDENT', 'MODERN_EXTENSION', 'UNRESOLVED'
]);
const proseKeys = [
  'title', 'subtitle', 'topo', 'hanviet', 'meaning', 'qi_mechanism',
  'hoa_phuc', 'remediation'
];
const sourceKeys = [
  'id', 'title', 'section', 'url', 'author', 'attributionStatus',
  'evidenceLevel', 'quote', 'note'
];
const rendererOnly = process.argv.includes('--renderer-only');
let passed = 0;
let failed = 0;

function test(name, run) {
  try {
    run();
    passed++;
    console.log(`PASS ${name}`);
  } catch (error) {
    failed++;
    console.error(`FAIL ${name}\n${error.message}`);
  }
}

function loadData(code, filename) {
  const context = { window: {} };
  vm.runInNewContext(code, context, { filename, timeout: 5000 });
  return JSON.parse(JSON.stringify(context.window));
}

function assertNonempty(value, label) {
  assert.equal(typeof value, 'string', `${label}: expected text`);
  assert.ok(value.trim(), `${label}: empty text`);
}

function inspectText(value, label) {
  if (typeof value === 'string') {
    assert.ok(!/(?:\bNaN\b|\bundefined\b|\[object Object\]|\banything\b|\bnewPath\b|\blorem\b|\bipsum\b|\bTODO\b|\bFIXME\b|\uFFFD)/i.test(value),
      `${label}: unresolved placeholder, encoding damage, or garbage token`);
  } else if (Array.isArray(value)) {
    value.forEach((part, index) => inspectText(part, `${label}[${index}]`));
  } else if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, part]) => inspectText(part, `${label}.${key}`));
  }
}

const current = loadData(fs.readFileSync(dataPath, 'utf8'), dataPath);
const baselineCode = execFileSync('git', [
  'show', baselineBlobSha
], { cwd: root, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
const baseline = loadData(baselineCode, 'baseline:js/hoidap_data.js');

const ch01Code = execFileSync('git', [
  'show', ch01BlobSha
], { cwd: root, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
const ch01Data = loadData(ch01Code, 'ch01:js/hoidap_data.js');

const ch02Code = execFileSync('git', [
  'show', ch02BlobSha
], { cwd: root, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
const ch02Data = loadData(ch02Code, 'ch02:js/hoidap_data.js');

const ch03Code = execFileSync('git', [
  'show', ch03BlobSha
], { cwd: root, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
const ch03Data = loadData(ch03Code, 'ch03:js/hoidap_data.js');

const items = current.HOIDAP_DATA;
const chapterFour = items.filter(item => item.chapter === 4);

if (!rendererOnly) test('Catalogue retains 100 unique IDs and ten Chapter 4 questions', () => {
  assert.equal(items.length, 100);
  assert.deepEqual(items.map(item => item.index).sort((a, b) => a - b),
    Array.from({ length: 100 }, (_, index) => index + 1));
  assert.deepEqual(chapterFour.map(item => item.index).sort((a, b) => a - b),
    Array.from({ length: 10 }, (_, index) => index + 31));
  for (const item of items) {
    assert.equal(item.chapter, Math.floor((item.index - 1) / 10) + 1,
      `Question ${item.index}: chapter assignment changed`);
  }
});

if (!rendererOnly) test('Chapter 1 questions 1–10 match the Chapter 1 release commit', () => {
  assert.deepEqual(items.filter(item => item.chapter === 1),
    ch01Data.HOIDAP_DATA.filter(item => item.chapter === 1));
});

if (!rendererOnly) test('Chapter 2 questions 11–20 match the Chapter 2 release commit', () => {
  assert.deepEqual(items.filter(item => item.chapter === 2),
    ch02Data.HOIDAP_DATA.filter(item => item.chapter === 2));
});

if (!rendererOnly) test('Chapter 3 questions 21–30 match the Chapter 3 release commit', () => {
  assert.deepEqual(items.filter(item => item.chapter === 3),
    ch03Data.HOIDAP_DATA.filter(item => item.chapter === 3));
});

if (!rendererOnly) test('Questions 41–100 match the release baseline', () => {
  assert.deepEqual(current.HOIDAP_CHAPTERS, baseline.HOIDAP_CHAPTERS);
  assert.deepEqual(items.filter(item => item.chapter > 4),
    baseline.HOIDAP_DATA.filter(item => item.chapter > 4));
});

function validateQuestion(item) {
  for (const key of proseKeys) assertNonempty(item[key], `Question ${item.index}.${key}`);
  assert.equal(item.chapter_title, current.HOIDAP_CHAPTERS[3].title);
  assertNonempty(item.hanzi, `Question ${item.index}.hanzi`);
  assert.ok(!/(?:\*\*|`|^\s*(?:#{1,6}\s|>\s|[-*]\s)|\[[^\]]+\](?:\([^)]*\))?)/m.test(item.hanzi),
    `Question ${item.index}: hanzi must contain clean quotations without Markdown or provenance labels`);
  assert.ok(Array.isArray(item.sources) && item.sources.length > 0,
    `Question ${item.index}: missing source ledger`);
  const sourceIds = new Set();
  const quotes = [];
  for (const [index, source] of item.sources.entries()) {
    const label = `Question ${item.index}.sources[${index}]`;
    assert.ok(source && typeof source === 'object', `${label}: null source`);
    for (const key of sourceKeys) {
      assert.equal(typeof source[key], 'string', `${label}.${key}: missing text field`);
    }
    for (const key of ['id', 'title', 'section', 'attributionStatus', 'evidenceLevel', 'note']) {
      assertNonempty(source[key], `${label}.${key}`);
    }
    assert.ok(!sourceIds.has(source.id), `${label}: duplicate source ID ${source.id}`);
    sourceIds.add(source.id);
    const url = new URL(source.url);
    assert.equal(url.protocol, 'https:', `${label}: source URL must use HTTPS`);
    assert.ok(url.hostname && !url.username && !url.password && !/\s/.test(source.url),
      `${label}: invalid or credential-bearing source URL`);
    assert.ok(evidenceLevels.has(source.evidenceLevel), `${label}: unknown evidence level`);
    if (source.quote.trim() && source.evidenceLevel !== 'MODERN_EXTENSION') {
      assert.ok(item.hanzi.includes(source.quote), `${label}: quote is missing or changed in hanzi`);
      quotes.push(source.quote);
    }
  }
  assert.ok(quotes.length > 0, `Question ${item.index}: Hán quotation has no source`);
  let remainder = item.hanzi;
  for (const quote of [...new Set(quotes)].sort((a, b) => b.length - a.length)) {
    remainder = remainder.split(quote).join('');
  }
  assert.equal(remainder.trim(), '', `Question ${item.index}: unsourced Hán text or labels remain`);
  inspectText(item, `Question ${item.index}`);
}

if (!rendererOnly) for (const item of chapterFour) {
  test(`Question ${item.index}: complete prose and source-backed clean Hán text`,
    () => validateQuestion(item));
}

function loadRenderer(code, dataset = current) {
  const container = { innerHTML: '' };
  const hanziBlocks = [{ style: { display: 'flex' } }];
  const toggle = { textContent: '', classList: { toggle() {} } };
  const context = {
    URL,
    window: { ...dataset, scrollTo() {} },
    document: {
      getElementById(id) {
        if (id === 'gate-hoidap') return container;
        if (id === 'hoidap-toggle-hanzi-btn') return toggle;
        return null;
      },
      querySelectorAll(selector) {
        return selector === '.hoidap-sec-hanzi' ? hanziBlocks : [];
      }
    }
  };
  vm.runInNewContext(code, context, { timeout: 5000 });
  return { ui: context.window.hoidapUI, container, hanziBlocks, toggle };
}

const rendererCode = fs.readFileSync(path.join(root, 'js', 'hoidap_ui.js'), 'utf8');

const fixtureSource = {
  id: 'fixture-classical', title: 'Sách đối chiếu', section: 'Thiên mở đầu',
  url: 'https://example.org/classical', author: 'Tác giả chưa định',
  attributionStatus: 'Theo bản đối chiếu', evidenceLevel: 'VERIFIED',
  quote: '水見三彎，福壽安閒。', note: 'Chỉ chứng minh câu trích.'
};
const fixture = {
  ...baseline.HOIDAP_DATA[30], hanzi: fixtureSource.quote,
  sources: [fixtureSource, {
    ...fixtureSource, id: 'fixture-modern', title: 'Modern guidance',
    evidenceLevel: 'MODERN_EXTENSION', quote: '',
    note: 'Hướng dẫn khảo sát hiện đại, không phải cổ văn.'
  }]
};
for (const key of proseKeys) {
  fixture[key] = `Đầu ${key}: giữ toàn bộ ý.\n\nĐoạn hai ${key}: đủ ngữ cảnh.\nDòng cuối ${key}.`;
}

test('Reviewed body preserves every prose paragraph across five readable sections', () => {
  const { ui } = loadRenderer(rendererCode);
  const html = ui.renderReviewedBody(fixture);
  const headings = [...html.matchAll(/class="hoidap-sec-heading">([^<]+)</g)].map(match => match[1]);
  assert.deepEqual(headings, [
    'Địa cuộc và khái niệm', 'Căn cứ và diễn nghĩa',
    'Nguyên lý và cách khảo sát', 'Phân loại và giới hạn luận đoán',
    'Xử lý và kết luận thực hành'
  ]);
  for (const key of proseKeys.filter(key => !['title', 'subtitle'].includes(key))) {
    for (const paragraph of fixture[key].split(/\n+/)) {
      assert.ok(html.includes(paragraph), `Reviewed body dropped ${key}: ${paragraph}`);
    }
  }
  assert.ok(html.includes(fixture.hanzi));
  assert.ok(!html.includes('hoidap-hp-row'), 'Reviewed prose fell back to the old Cát/Hung row parser');
});

test('Every Chapter 4 question renders successfully in Reviewed body', () => {
  const { ui } = loadRenderer(rendererCode);
  for (const item of chapterFour) {
    const html = ui.renderReviewedBody(item);
    assert.ok(html.includes('hoidap-reviewed'), `Question ${item.index} failed to render reviewed wrapper`);
    assert.ok(html.includes(item.hanzi), `Question ${item.index} missing hanzi`);
    assert.ok(html.includes(item.sources[0].title), `Question ${item.index} missing source title`);
  }
});

test('Chapter 4 hero description explains the chapter curriculum accurately', () => {
  const { ui, container } = loadRenderer(rendererCode);
  ui.selectChapter(4);
  assert.ok(container.innerHTML.includes('Thâm Hẻm Bế Khí: giải phẫu các địa cuộc ngõ hẻm đô thị'));
});

console.log(`\nChapter 4 release checks: ${passed} passed, ${failed} failed.`);
if (failed) process.exitCode = 1;
