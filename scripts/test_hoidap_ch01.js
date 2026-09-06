'use strict';

// Chapter 1 release guard: validate the revised content and preserve the
// chapter catalogue and all 90 entries outside this release's scope.
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const baselineSha = 'a87ed5fed6fdb388f81bd4528cf666fda4011d9e';
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
  // Normalize VM objects before deep comparisons across contexts.
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
  'show', `${baselineSha}:js/hoidap_data.js`
], { cwd: root, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
const baseline = loadData(baselineCode, `${baselineSha}:js/hoidap_data.js`);
const items = current.HOIDAP_DATA;
const chapterOne = items.filter(item => item.chapter === 1);

if (!rendererOnly) test('Catalogue retains 100 unique IDs and ten Chapter 1 questions', () => {
  assert.equal(items.length, 100);
  assert.deepEqual(items.map(item => item.index).sort((a, b) => a - b),
    Array.from({ length: 100 }, (_, index) => index + 1));
  assert.deepEqual(chapterOne.map(item => item.index).sort((a, b) => a - b),
    Array.from({ length: 10 }, (_, index) => index + 1));
  for (const item of items) {
    assert.equal(item.chapter, Math.floor((item.index - 1) / 10) + 1,
      `Question ${item.index}: chapter assignment changed`);
  }
});

if (!rendererOnly) test('Chapter catalogue and questions 11–100 match the release baseline', () => {
  assert.deepEqual(current.HOIDAP_CHAPTERS, baseline.HOIDAP_CHAPTERS);
  assert.deepEqual(items.filter(item => item.chapter !== 1),
    baseline.HOIDAP_DATA.filter(item => item.chapter !== 1));
});

function validateQuestion(item) {
    for (const key of proseKeys) assertNonempty(item[key], `Question ${item.index}.${key}`);
    assert.equal(item.chapter_title, current.HOIDAP_CHAPTERS[0].title);
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
      // A modern reference may quote engineering guidance in another language;
      // it is not classical Hán text and need not appear in the Hán toggle.
      if (source.quote.trim() && source.evidenceLevel !== 'MODERN_EXTENSION') {
        assert.ok(item.hanzi.includes(source.quote), `${label}: quote is missing or changed in hanzi`);
        quotes.push(source.quote);
      }
    }
    assert.ok(quotes.length > 0, `Question ${item.index}: Hán quotation has no source`);
    let remainder = item.hanzi;
    // Longer quotations first so an overlapping short quotation cannot hide
    // an unsourced fragment. Duplicate source quotations are harmless.
    for (const quote of [...new Set(quotes)].sort((a, b) => b.length - a.length)) {
      remainder = remainder.split(quote).join('');
    }
    assert.equal(remainder.trim(), '', `Question ${item.index}: unsourced Hán text or labels remain`);
    inspectText(item, `Question ${item.index}`);
}

if (!rendererOnly) for (const item of chapterOne) {
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
  quote: '氣乘風則散，界水則止。', note: 'Chỉ chứng minh câu trích.'
};
const fixture = {
  ...baseline.HOIDAP_DATA[0], hanzi: fixtureSource.quote,
  sources: [fixtureSource, {
    ...fixtureSource, id: 'fixture-modern', title: 'Modern guidance',
    evidenceLevel: 'MODERN_EXTENSION', quote: '',
    note: 'Hướng dẫn khảo sát hiện đại, không phải cổ văn.'
  }]
};
for (const key of proseKeys) {
  fixture[key] = `Đầu ${key}: giữ toàn bộ ý.\n\nĐoạn hai ${key}: đủ ngữ cảnh.\nDòng cuối ${key}.`;
}

test('Source validation permits modern references without adding them to Hán text', () => {
  validateQuestion(fixture);
  const withModernQuote = JSON.parse(JSON.stringify(fixture));
  withModernQuote.sources[1].quote = 'Measure the actual site conditions.';
  validateQuestion(withModernQuote);
});

test('Source links reject scripts, data URLs, HTTP, malformed URLs and credentials', () => {
  const { ui } = loadRenderer(rendererCode);
  const badUrls = [
    'javascript:alert(1)', 'data:text/html,<script>alert(1)</script>',
    'http://example.org/source', '//example.org/source', 'broken URL',
    'https://user:password@example.org/source', 'https://user@example.org/source'
  ];
  for (const url of badUrls) {
    const html = ui.renderSources({ sources: [{ ...fixtureSource, url }] });
    assert.ok(!/<a\b/i.test(html), `Unsafe or malformed source produced a link: ${url}`);
  }
  const safe = ui.renderSources({ sources: [fixtureSource] });
  assert.match(safe, /href="https:\/\/example\.org\/classical"/);
  assert.match(safe, /target="_blank" rel="noopener noreferrer"/);
});

test('Source metadata and notes escape HTML while keeping ordinary labels readable', () => {
  const { ui } = loadRenderer(rendererCode);
  const payload = '<img src=x onerror="alert(1)"> & "citation"';
  const source = { ...fixtureSource };
  for (const key of ['title', 'section', 'author', 'attributionStatus', 'note']) source[key] = payload;
  const html = ui.renderSources({ sources: [source] });
  assert.ok(!/<(?:img|script|svg)\b/i.test(html), 'Metadata inserted executable HTML');
  assert.equal((html.match(/&lt;img/g) || []).length, 5, 'All five text fields must be escaped');
  assert.ok(html.includes('&amp; &quot;citation&quot;'));
  assert.ok(html.includes('Đã đối chiếu câu trích'));
  assert.ok(!html.includes('VERIFIED'), 'Internal evidence enum leaked into source label');
});

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

test('Hán toggle hides quotations while preserving sources and explanations', () => {
  const { ui, hanziBlocks, toggle } = loadRenderer(rendererCode);
  ui.toggleHanzi();
  assert.equal(ui.showHanzi, false);
  assert.equal(hanziBlocks[0].style.display, 'none');
  assert.equal(toggle.textContent, 'Bật Hán Văn');
  const html = ui.renderReviewedBody(fixture);
  assert.match(html, /class="hoidap-sec-hanzi" style="display: none;"/);
  assert.ok(html.includes(ui.renderSources(fixture)), 'Source ledger vanished with Hán text');
  // Sources must come after the closing tags for the Hán-only container.
  assert.match(html, /hoidap-hanzi-box">[^<]+<\/div><\/div>[\s\S]*class="hoidap-sources"/);
  assert.ok(html.includes('Đoạn hai meaning: đủ ngữ cảnh.'));
  ui.toggleHanzi();
  assert.equal(hanziBlocks[0].style.display, 'flex');
});

test('Chapter 2 renders the same cards and sections as the baseline renderer', () => {
  const baselineRenderer = execFileSync('git', [
    'show', `${baselineSha}:js/hoidap_ui.js`
  ], { cwd: root, encoding: 'utf8', maxBuffer: 2 * 1024 * 1024 });
  const before = loadRenderer(baselineRenderer, baseline);
  const after = loadRenderer(rendererCode, baseline);
  before.ui.selectChapter(2);
  after.ui.selectChapter(2);
  const cards = html => (html.match(/<article\b[\s\S]*?<\/article>/g) || [])
    .map(card => card.replace(/>\s+</g, '><').trim());
  assert.equal(cards(after.container.innerHTML).length, 10);
  assert.deepEqual(cards(after.container.innerHTML), cards(before.container.innerHTML));
  assert.ok(!after.container.innerHTML.includes('hoidap-reviewed'));
});

console.log(`\nChapter 1 release checks: ${passed} passed, ${failed} failed.`);
if (failed) process.exitCode = 1;
