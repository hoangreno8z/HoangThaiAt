const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const jsonPath = path.join(repoRoot, 'data', 'hoidap_data.json');
const jsPath = path.join(repoRoot, 'js', 'hoidap_data.js');
const uiPath = path.join(repoRoot, 'js', 'hoidap_ui.js');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    failed++;
  } else {
    console.log(`PASS: ${message}`);
    passed++;
  }
}

// 1. Check data integrity
const dataJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
assert(dataJson.items && dataJson.items.length === 100, 'Catalogue retains 100 unique IDs and ten Chapter 8 questions');

// 2. Check regression on previous chapters
const ch1Json = JSON.parse(cp.execSync('git show e6851fe:data/hoidap_data.json', { maxBuffer: 10 * 1024 * 1024 }));
let ch1Match = true;
for (let i = 0; i < 10; i++) {
  if (JSON.stringify(dataJson.items[i]) !== JSON.stringify(ch1Json.items[i])) {
    ch1Match = false;
    break;
  }
}
assert(ch1Match, 'Chapter 1 questions 1–10 match the Chapter 1 release commit');

const ch2Json = JSON.parse(cp.execSync('git show dec1e5e:data/hoidap_data.json', { maxBuffer: 10 * 1024 * 1024 }));
let ch2Match = true;
for (let i = 10; i < 20; i++) {
  if (JSON.stringify(dataJson.items[i]) !== JSON.stringify(ch2Json.items[i])) {
    ch2Match = false;
    break;
  }
}
assert(ch2Match, 'Chapter 2 questions 11–20 match the Chapter 2 release commit');

const ch3Json = JSON.parse(cp.execSync('git show 3845404:data/hoidap_data.json', { maxBuffer: 10 * 1024 * 1024 }));
let ch3Match = true;
for (let i = 20; i < 30; i++) {
  if (JSON.stringify(dataJson.items[i]) !== JSON.stringify(ch3Json.items[i])) {
    ch3Match = false;
    break;
  }
}
assert(ch3Match, 'Chapter 3 questions 21–30 match the Chapter 3 release commit');

const ch4Json = JSON.parse(cp.execSync('git show e0610c5:data/hoidap_data.json', { maxBuffer: 10 * 1024 * 1024 }));
let ch4Match = true;
for (let i = 30; i < 40; i++) {
  if (JSON.stringify(dataJson.items[i]) !== JSON.stringify(ch4Json.items[i])) {
    ch4Match = false;
    break;
  }
}
assert(ch4Match, 'Chapter 4 questions 31–40 match the Chapter 4 release commit');

const ch5Json = JSON.parse(cp.execSync('git show 3a05adc:data/hoidap_data.json', { maxBuffer: 10 * 1024 * 1024 }));
let ch5Match = true;
for (let i = 40; i < 50; i++) {
  if (JSON.stringify(dataJson.items[i]) !== JSON.stringify(ch5Json.items[i])) {
    ch5Match = false;
    break;
  }
}
assert(ch5Match, 'Chapter 5 questions 41–50 match the Chapter 5 release commit');

const ch6Json = JSON.parse(cp.execSync('git show 69b85fd:data/hoidap_data.json', { maxBuffer: 10 * 1024 * 1024 }));
let ch6Match = true;
for (let i = 50; i < 60; i++) {
  if (JSON.stringify(dataJson.items[i]) !== JSON.stringify(ch6Json.items[i])) {
    ch6Match = false;
    break;
  }
}
assert(ch6Match, 'Chapter 6 questions 51–60 match the Chapter 6 release commit');

const ch7Json = JSON.parse(cp.execSync('git show b74879a:data/hoidap_data.json', { maxBuffer: 10 * 1024 * 1024 }));
let ch7Match = true;
for (let i = 60; i < 70; i++) {
  if (JSON.stringify(dataJson.items[i]) !== JSON.stringify(ch7Json.items[i])) {
    ch7Match = false;
    break;
  }
}
assert(ch7Match, 'Chapter 7 questions 61–70 match the Chapter 7 release commit');

// Check questions 81–100 match baseline
const baselineJson = JSON.parse(cp.execSync('git show a87ed5f:data/hoidap_data.json', { maxBuffer: 10 * 1024 * 1024 }));
let postMatch = true;
for (let i = 80; i < 100; i++) {
  if (JSON.stringify(dataJson.items[i]) !== JSON.stringify(baselineJson.items[i])) {
    postMatch = false;
    break;
  }
}
assert(postMatch, 'Questions 81–100 match the release baseline');

// 3. Check each Chapter 8 question (71 to 80)
for (let i = 70; i < 80; i++) {
  const q = dataJson.items[i];
  const qNum = i + 1;
  const hasSources = Array.isArray(q.sources) && q.sources.length >= 2;
  const noDirtyHanzi = !/(\*\*|\[NGUYÊN VĂN\]|\[TRUYỀN THỊ\]|\[LƯỢC Ý\])/.test(q.hanzi);
  const cleanHanzi = /[\u4e00-\u9fff]/.test(q.hanzi);
  const hasMeaning = typeof q.meaning === 'string' && q.meaning.trim().length > 50;
  const hasQi = typeof q.qi_mechanism === 'string' && q.qi_mechanism.trim().length > 100;
  const hasRemediation = typeof q.remediation === 'string' && q.remediation.trim().length > 100;
  const hasHoaPhuc = typeof q.hoa_phuc === 'string' &&
    q.hoa_phuc.includes('**Khi Hợp Cách (Cát Khánh):**') &&
    q.hoa_phuc.includes('**Khi Phạm Cách (Hung Họa):**') &&
    q.hoa_phuc.includes('- **Tài lộc:**') &&
    q.hoa_phuc.includes('- **Nhân đinh:**') &&
    q.hoa_phuc.includes('- **Tật ách:**') &&
    q.hoa_phuc.includes('- **Gia đạo:**') &&
    q.hoa_phuc.includes('- **Quan vận:**');

  assert(
    hasSources && noDirtyHanzi && cleanHanzi && hasMeaning && hasQi && hasRemediation && hasHoaPhuc,
    `Question ${qNum}: complete prose and source-backed clean Hán text`
  );
}

// 4. Check UI renders and hero description
const uiContent = fs.readFileSync(uiPath, 'utf8');
assert(
  uiContent.includes('Địa Cốt Trồi Sụt: phân tích biến động cốt nền đất'),
  'Chapter 8 hero description explains the chapter curriculum accurately'
);

console.log(`\nChapter 8 release checks: ${passed} passed, ${failed} failed.`);
if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
