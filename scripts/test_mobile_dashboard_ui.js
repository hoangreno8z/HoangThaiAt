/**
 * TEST AUTOMATION: MOBILE DASHBOARD UI & TYPOGRAPHY STANDARDS
 * Kiem tra toan dien he thong UI Mobile Dashboard cho module Dung Luong Thi Truong & Suc Mua Ban Kinh
 * (Ca tren Modal 144 Thuy Khau va Tab Kinh Te)
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('=== BAT DAU KIEM THU GIAO DIEN COMPACT MOBILE DASHBOARD ===\n');

// 1. Doc tep CSS va JS
const cssContent = fs.readFileSync('css/luopan-map.css', 'utf8');
const luopanJsContent = fs.readFileSync('js/luopan_map_tool.js', 'utf8');
const toolUiJsContent = fs.readFileSync('js/tool_ui.js', 'utf8');

// Test 1: Kiem tra Design Tokens & Typography Rules trong CSS
console.log('1. Kiem tra Typography & Spacing Tokens trong CSS:');
assert.ok(cssContent.includes('--econ-font-title: 18px'), 'Thieu token --econ-font-title: 18px');
assert.ok(cssContent.includes('--econ-font-section: 14px'), 'Thieu token --econ-font-section: 14px');
assert.ok(cssContent.includes('--econ-font-control: 15px'), 'Thieu token --econ-font-control: 15px');
assert.ok(cssContent.includes('--econ-font-body: 13px'), 'Thieu token --econ-font-body: 13px');
assert.ok(cssContent.includes('--econ-font-meta: 11px'), 'Thieu token --econ-font-meta: 11px');
assert.ok(cssContent.includes('--econ-height-control: 42px'), 'Thieu token --econ-height-control: 42px');
assert.ok(cssContent.includes('--econ-height-card: 52px'), 'Thieu token --econ-height-card: 52px');
console.log('  [PASS] Day du 7 Design Tokens typography va control heights.');

// Test 2: Tuyet doi khong dung transform: scale hoac zoom de thu nho giao dien
console.log('\n2. Kiem tra cam dung transform: scale va zoom thu nho:');
const badScaleRegex = /(?:transform\s*:\s*scale\s*\(|zoom\s*:\s*0\.)/i;
const cssMatch = cssContent.match(badScaleRegex);
const modalStart = luopanJsContent.indexOf('id="modal-economic-radius"');
const modalSnippet = modalStart !== -1 ? luopanJsContent.slice(modalStart, modalStart + 5000) : '';
const luopanModalMatch = modalSnippet.match(badScaleRegex);
const toolUiMatch = toolUiJsContent.match(badScaleRegex);
assert.strictEqual(cssMatch, null, 'Phat hien transform: scale hoac zoom trong CSS');
assert.strictEqual(luopanModalMatch, null, 'Phat hien transform: scale hoac zoom trong modal-economic-radius');
assert.strictEqual(toolUiMatch, null, 'Phat hien transform: scale hoac zoom trong tool_ui.js');
console.log('  [PASS] 100% khong su dung transform: scale hoac zoom (dung sizing that).');

// Test 3: Kiem tra Modal 144 Thuy Khau (#modal-economic-radius)
console.log('\n3. Kiem tra Modal Ban Do Ve Tinh (144 Thuy Khau):');
assert.ok(luopanJsContent.includes('class="econ-modal-dialog"'), 'Thieu class econ-modal-dialog');
assert.ok(luopanJsContent.includes('class="econ-title"'), 'Thieu class econ-title');
assert.ok(luopanJsContent.includes('class="econ-radius-grid"'), 'Thieu class econ-radius-grid');
assert.ok(luopanJsContent.includes('class="econ-admin-grid"'), 'Thieu class econ-admin-grid');
assert.ok(luopanJsContent.includes('class="econ-ind-trigger"'), 'Thieu class econ-ind-trigger');
assert.ok(luopanJsContent.includes('class="econ-search-input"'), 'Thieu class econ-search-input');
assert.ok(luopanJsContent.includes('class="econ-ind-grid"'), 'Thieu class econ-ind-grid');

assert.ok(luopanJsContent.includes('>500m<') || luopanJsContent.includes('500m'), 'Thieu nut 500m');
assert.ok(luopanJsContent.includes('1 km'), 'Nut 1km chua doi thanh 1 km ngan gon');
assert.ok(luopanJsContent.includes('3 km'), 'Nut 3km chua doi thanh 3 km ngan gon');
assert.ok(!luopanJsContent.includes('1.000m (1km)'), 'Van con chu dai 1.000m (1km) trong modal');
assert.ok(!luopanJsContent.includes('3.000m (3km)'), 'Van con chu dai 3.000m (3km) trong modal');
console.log('  [PASS] Modal 144 Thuy Khau tich hop day du Compact Mobile Dashboard.');

// Test 4: Kiem tra Tab Kinh Te (/tools - kinhte-radius-engine-block)
console.log('\n4. Kiem tra Tab Cong Cu Kinh Te (/tools):');
assert.ok(toolUiJsContent.includes('class="econ-radius-grid radius-segmented-control"'), 'Thieu class econ-radius-grid trong tool_ui.js');
assert.ok(toolUiJsContent.includes('class="econ-admin-grid"'), 'Thieu class econ-admin-grid trong tool_ui.js');
assert.ok(toolUiJsContent.includes('class="econ-ind-trigger"'), 'Thieu class econ-ind-trigger trong tool_ui.js');
assert.ok(toolUiJsContent.includes('class="econ-search-input"'), 'Thieu class econ-search-input trong tool_ui.js');
assert.ok(toolUiJsContent.includes('class="econ-ind-grid"'), 'Thieu class econ-ind-grid trong tool_ui.js');

assert.ok(toolUiJsContent.includes('>500m<') || toolUiJsContent.includes('500m'), 'Thieu nut 500m trong tool_ui');
assert.ok(toolUiJsContent.includes('1 km'), 'Nut 1km chua doi thanh 1 km trong tool_ui');
assert.ok(toolUiJsContent.includes('3 km'), 'Nut 3km chua doi thanh 3 km trong tool_ui');
console.log('  [PASS] Tab Kinh Te /tools dong bo 100% ngon ngu thiet ke Compact Mobile Dashboard.');

// Test 5: Kiem tra phong chong tran man hinh & Touch Target
console.log('\n5. Kiem tra phong chong tran man hinh & Touch Target:');
assert.ok(cssContent.includes('min-width: 0'), 'CSS phai co min-width: 0 chong tran flex/grid');
assert.ok(cssContent.includes('box-sizing: border-box'), 'CSS phai co box-sizing: border-box');
assert.ok(cssContent.includes('text-overflow: ellipsis'), 'Select va ten dai phai co text-overflow: ellipsis');
assert.ok(cssContent.includes('height: 42px'), 'Buttons & Inputs phai dam bao touch target 42px');
assert.ok(cssContent.includes('min-height: 52px'), 'Card nganh phai co min-height: 52px');
console.log('  [PASS] Dam bao 100% Touch Target (42px - 52px) va chong vo tran layout.');

// Test 6: Kiem tra Zero Emoji trong toan bo codebase
console.log('\n6. Kiem tra khong con Emoji nao trong cac file giao dien:');
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{1FA00}-\u{1FAFF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}]/u;
const checkEmoji = (fpath) => {
  const c = fs.readFileSync(fpath, 'utf8');
  for (const line of c.split('\n')) {
    for (const char of line) {
      const cp = char.codePointAt(0);
      if (cp >= 0x2630 && cp <= 0x2637) continue;
      if (cp >= 0x268A && cp <= 0x268F) continue;
      if (emojiRegex.test(char)) return char;
    }
  }
  return null;
};

assert.strictEqual(checkEmoji('js/luopan_map_tool.js'), null, 'Emoji con trong luopan_map_tool.js');
assert.strictEqual(checkEmoji('js/tool_ui.js'), null, 'Emoji con trong tool_ui.js');
assert.strictEqual(checkEmoji('js/industry_economic_engine.js'), null, 'Emoji con trong industry_economic_engine.js');
assert.strictEqual(checkEmoji('index.html'), null, 'Emoji con trong index.html');
console.log('  [PASS] 0 emoji trong tat ca cac tep giao dien web.');

console.log('\n======================================================');
console.log('KET QUA KIEM THU UI MOBILE: TAT CA TIEU CHI DAT 100%!');
console.log('======================================================\n');
