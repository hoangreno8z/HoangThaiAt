/**
 * KIỂM THỬ TÍNH TOÀN VẸN DỮ LIỆU CHURN & GIAO DIỆN MOBILE MODULE /TOOLS
 * Quy tắc: Tuyệt đối không bịa số liệu thống kê. Missing data = null/unavailable.
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const provinceData = require('../js/dia_ly_64_tinh_thanh_data.js');
const kinhTeData = require('../js/kinh_te_64_tinh_thanh_data.js');
const radiusEngine = require('../js/economic_radius_engine.js');
const industryEngine = require('../js/industry_economic_engine.js');

let passCount = 0;
let totalTests = 0;

function runTest(desc, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  [PASS] Test ${totalTests}: ${desc}`);
    passCount++;
  } catch (err) {
    console.error(`  [FAIL] Test ${totalTests}: ${desc}`);
    console.error(`         Lỗi: ${err.message}`);
  }
}

console.log('=== BẮT ĐẦU KIỂM THỬ DATA INTEGRITY & RESPONSIVE UI ===\n');

// 1. Kiểm tra 6 ngành x 5 địa bàn x 3 bán kính: KHÔNG BAO GIỜ bịa số 1/1
const industries = ['CAFE', 'NAIL', 'NHA_HANG_FNB', 'SPA_BEAUTY', 'TIEN_LOI', 'NHA_THUOC'];
const locations = [
  { p: 'VN-SG', d: 'SG-CC', name: 'Củ Chi, TP.HCM' },
  { p: 'VN-HN', d: 'HN-HK', name: 'Hoàn Kiếm, Hà Nội' },
  { p: 'VN-DN', d: 'DN-HC', name: 'Hải Châu, Đà Nẵng' },
  { p: 'VN-CT', d: 'CT-NK', name: 'Ninh Kiều, Cần Thơ' },
  { p: 'VN-DB', d: 'DB-DB', name: 'Điện Biên Phủ, Điện Biên' }
];
const radii = [500, 1000, 3000];

runTest('Quy tắc Data Integrity: 90 tổ hợp ngành - địa bàn - bán kính đều trả về status unavailable và null', () => {
  let checkedCombinations = 0;
  for (const ind of industries) {
    for (const loc of locations) {
      for (const r of radii) {
        const res = industryEngine.calculateIndustryMarket({
          provinceId: loc.p,
          districtId: loc.d,
          radiusMeters: r,
          industryKey: ind
        });

        assert.ok(res, 'Kết quả không được rỗng');
        const dyn = res.survivalDynamics;
        assert.ok(dyn, 'Phải có survivalDynamics');
        assert.strictEqual(dyn.status, 'unavailable');
        assert.strictEqual(dyn.provenance, 'UNAVAILABLE_AT_MICRO_RADIUS');
        assert.strictEqual(dyn.newlyAddedCount, null);
        assert.strictEqual(dyn.removedCount, null);
        assert.strictEqual(dyn.netGrowthCount, null);
        assert.strictEqual(dyn.netGrowthRatePct, null);
        assert.strictEqual(dyn.churnRatePct, null);
        assert.ok(dyn.survivalOver2YearsPct > 0 && dyn.survivalOver2YearsPct <= 100);
        assert.ok(dyn.survivalRates && typeof dyn.survivalRates.under_6m === 'number');

        checkedCombinations++;
      }
    }
  }
  assert.strictEqual(checkedCombinations, 6 * 5 * 3);
});

// 2. Kiểm tra Mobile Collapsible District Cards trong tool_ui.js
runTest('UI Responsive: tool_ui.js tích hợp Mobile Collapsible District Cards & Segmented Control 3 cột', () => {
  const toolUiContent = fs.readFileSync(path.join(__dirname, '../js/tool_ui.js'), 'utf8');

  assert.ok(toolUiContent.includes('class="sae-mobile-cards-wrapper"'), 'Phải có wrapper thẻ mobile');
  assert.ok(toolUiContent.includes('id="sae-mobile-toggle-btn"'), 'Phải có nút toggle menu');
  assert.ok(toolUiContent.includes('id="sae-mobile-collapsible-body"'), 'Phải có thân menu rút gọn');
  assert.ok(toolUiContent.includes('id="kinhte-search-sae-mobile"'), 'Phải có ô tìm kiếm huyện mobile');
  assert.ok(toolUiContent.includes('class="sae-sort-btn"'), 'Phải có nút sort nhanh');
  assert.ok(toolUiContent.includes('class="sae-mobile-district-card"'), 'Phải render các thẻ quận huyện');

  assert.ok(toolUiContent.includes('class="radius-segmented-control"'), 'Phải có Segmented Control');
  assert.ok(toolUiContent.includes('data-radius="500"'), 'Nút 500m');
  assert.ok(toolUiContent.includes('data-radius="1000"'), 'Nút 1.000m');
  assert.ok(toolUiContent.includes('data-radius="3000"'), 'Nút 3.000m');

  assert.ok(toolUiContent.includes('id="kinhte-search-district"') && toolUiContent.includes('font-size:16px'));
  assert.ok(toolUiContent.includes('id="kinhte-select-district"') && toolUiContent.includes('font-size:16px'));
  assert.ok(toolUiContent.includes('id="kinhte-select-commune"') && toolUiContent.includes('font-size:16px'));

  assert.ok(toolUiContent.includes('toggleMobileSaeCards()'));
  assert.ok(toolUiContent.includes('filterMobileSaeCards('));
  assert.ok(toolUiContent.includes('sortMobileSaeCards('));
  assert.ok(toolUiContent.includes('selectDistrictFromCard('));
});

// 3. Kiểm tra CSS Responsive trong css/style.css
runTest('CSS Responsive: style.css ẩn bảng desktop và hiển thị thẻ mobile dưới 768px, chống auto-zoom', () => {
  const cssContent = fs.readFileSync(path.join(__dirname, '../css/style.css'), 'utf8');

  assert.ok(cssContent.includes('.sae-mobile-cards-wrapper'));
  assert.ok(cssContent.includes('.sae-desktop-table'));
  assert.ok(cssContent.includes('@media (max-width: 767px)'));
  assert.ok(cssContent.includes('overflow-x: clip'));
  assert.ok(cssContent.includes('font-size: 16px !important;'));
});

// 4. Kiểm tra viewport trong index.html
runTest('HTML Viewport: index.html chứa viewport-fit=cover', () => {
  const indexContent = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  assert.ok(indexContent.includes('viewport-fit=cover'));
});

// 5. Kiểm tra tính minh bạch trong luopan_map_tool.js
runTest('Luopan Map Tool: hiển thị minh bạch tham chiếu chuẩn ngành', () => {
  const luopanContent = fs.readFileSync(path.join(__dirname, '../js/luopan_map_tool.js'), 'utf8');
  assert.ok(!luopanContent.includes('+${survivalDynamics.newlyAddedCount}'));
  assert.ok(!luopanContent.includes('-${survivalDynamics.removedCount}'));
  assert.ok(luopanContent.includes('Tham chiếu chuẩn ngành'));
});

console.log('\n========================================');
console.log(`KẾT QUẢ KIỂM THỬ: ${passCount} / ${totalTests} BÀI KIỂM TRA ĐẠT TUYỆT ĐỐI!`);
console.log('========================================\n');

if (passCount !== totalTests) {
  process.exit(1);
}