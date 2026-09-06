/**
 * KIỂM TOÁN CHUYÊN SÂU TOÀN DIỆN (DEEP AUDIT) PHÂN HỆ NGÀNH NGHÈ & SỨC MUA 64
 * Kiểm tra 384 tổ hợp (64 tỉnh x 6 ngành), DOM Mocking, UI Rendering, và kiểm soát lỗi NaN/undefined.
 */

const assert = require('assert');
const path = require('path');

// Setup mock global window/document trước khi nạp modules
global.window = global;
global.document = {
  getElementById: () => null,
  querySelectorAll: () => []
};

// Mock renderer & classifier nếu chạy trong môi trường test Node thuần
global.window.LuopanSvgRenderer = class {
  render() { return ''; }
  update() {}
};
global.window.LuopanClassifier = class {
  classify() { return {}; }
};

// 1. Nạp toàn bộ dữ liệu & động cơ
const diaLyCorpus = require('../js/dia_ly_64_tinh_thanh_data.js').DIA_LY_64_TINH_THANH_CORPUS;
const kinhTeData = require('../js/kinh_te_64_tinh_thanh_data.js').KINH_TE_64_TINH_THANH_DATA;
const radiusEngine = require('../js/economic_radius_engine.js');
const industryEngine = require('../js/industry_economic_engine.js');
const { ToolUI } = require('../js/tool_ui.js');
const LuopanMapTool = require('../js/luopan_map_tool.js');

global.DIA_LY_64_TINH_THANH_CORPUS = diaLyCorpus;
global.KINH_TE_64_TINH_THANH_DATA = kinhTeData;
global.EconomicRadiusEngine = radiusEngine;
global.IndustryEconomicEngine = industryEngine;

console.log('=== BẮT ĐẦU KIỂM TOÁN CHUYÊN SÂU TOÀN DIỆN ===\n');

let passCount = 0;
let totalTests = 0;

function runAudit(desc, testFn) {
  totalTests++;
  try {
    testFn();
    console.log(`  [PASS] #${totalTests}: ${desc}`);
    passCount++;
  } catch (err) {
    console.error(`  [FAIL] #${totalTests}: ${desc}`);
    console.error(`         Lỗi: ${err.message}\n${err.stack}`);
  }
}

// =========================================================================
// PHẦN 1: QUÉT TOÀN BỘ 384 TỔ HỢP (64 TỈNH THÀNH x 6 NGÀNH NGHỀ)
// =========================================================================
runAudit('Kiểm tra 384 tổ hợp (64 tỉnh thành x 6 ngành nghề VSIC) không sinh lỗi', () => {
  const industries = ['CAFE', 'NAIL', 'NHA_HANG_FNB', 'SPA_BEAUTY', 'TIEN_LOI', 'NHA_THUOC'];
  let checkedCount = 0;

  diaLyCorpus.forEach(prov => {
    const provId = prov.historical_id;
    const districts = (prov.administrative_units && prov.administrative_units.districts) || [];

    industries.forEach(indKey => {
      // Test huyện đầu tiên nếu có, hoặc null
      const districtId = districts.length > 0 ? districts[0].id : null;
      
      const res = industryEngine.calculateIndustryMarket({
        provinceId: provId,
        districtId: districtId,
        radiusMeters: 1000,
        industryKey: indKey
      });

      assert.ok(res, `Kết quả không được null cho tỉnh ${provId} - ngành ${indKey}`);
      assert.ok(res.marketDemand.totalMonthlyDemandBillionVnd > 0, `Nhu cầu tháng phải > 0 cho ${provId} - ${indKey}`);
      assert.ok(res.competition.estimatedCompetitors >= 2, `Đối thủ phải >= 2 cho ${provId} - ${indKey}`);
      assert.ok(res.feasibility.overallOpportunityScore >= 0 && res.feasibility.overallOpportunityScore <= 100, `Điểm cơ hội phải [0, 100] cho ${provId} - ${indKey}`);
      assert.ok(!isNaN(res.feasibility.dsrRatio), `DSR không được NaN cho ${provId} - ${indKey}`);
      assert.ok(res.feasibility.opportunityTier, `Tier không được rỗng cho ${provId} - ${indKey}`);
      assert.ok(res.feasibility.breakevenMonthlyMillion > 0, `Hòa vốn phải > 0 cho ${provId} - ${indKey}`);

      checkedCount++;
    });
  });

  assert.strictEqual(checkedCount, 64 * 6, `Phải kiểm tra đúng 384 tổ hợp (đã kiểm tra: ${checkedCount})`);
});

// =========================================================================
// PHẦN 2: KIỂM TOÁN CHỐNG LỖI NaN, undefined VÀ [object Object] TRONG RENDER HTML
// =========================================================================
runAudit('Kiểm tra renderIndustryReportHtml không chứa undefined, NaN hoặc [object Object]', () => {
  const instance = new ToolUI();

  const industries = ['CAFE', 'NAIL', 'NHA_HANG_FNB', 'SPA_BEAUTY', 'TIEN_LOI', 'NHA_THUOC'];
  const testProvinces = ['VN-HN', 'VN-SG', 'VN-DN', 'HT_PRE2008', 'VN-DB'];

  testProvinces.forEach(pId => {
    industries.forEach(indKey => {
      const res = industryEngine.calculateIndustryMarket({
        provinceId: pId,
        radiusMeters: 1000,
        industryKey: indKey
      });

      const html = instance.renderIndustryReportHtml(res);
      assert.ok(html.length > 500, `HTML sinh ra cho ${pId} - ${indKey} phải đủ dài`);
      
      // Quét các lỗi phổ biến trong template string
      assert.ok(!html.includes('undefined'), `Không được chứa 'undefined' trong HTML (${pId} - ${indKey})`);
      assert.ok(!html.includes('NaN'), `Không được chứa 'NaN' trong HTML (${pId} - ${indKey})`);
      assert.ok(!html.includes('[object Object]'), `Không được chứa '[object Object]' trong HTML (${pId} - ${indKey})`);
      assert.ok(!html.includes('null'), `Không được chứa 'null' text trong HTML (${pId} - ${indKey})`);
    });
  });
});

// =========================================================================
// PHẦN 3: KIỂM TOÁN TƯƠNG TÁC GIAO DIỆN (MOCK DOM) TRÊN TOOL_UI
// =========================================================================
runAudit('Kiểm tra vòng đời tương tác UI: chuyển đổi ngành nghề, đổi bán kính, đổi quận huyện', () => {
  const instance = new ToolUI();

  // Tạo DOM Mocking đơn giản
  const elements = {};
  function createElement(id, tagName = 'div') {
    return {
      id,
      tagName,
      innerHTML: '',
      value: '',
      style: {},
      getAttribute: (attr) => (attr === 'data-industry' ? id.replace('btn-', '') : ''),
      dataset: {}
    };
  }

  elements['kinhte-industry-report'] = createElement('kinhte-industry-report');
  elements['kinhte-radius-result'] = createElement('kinhte-radius-result');
  elements['kinhte-select-district'] = createElement('kinhte-select-district', 'select');
  elements['kinhte-select-district'].value = 'HN-HK';

  const industryBtns = [
    createElement('btn-CAFE'), createElement('btn-NAIL'), createElement('btn-NHA_HANG_FNB'),
    createElement('btn-SPA_BEAUTY'), createElement('btn-TIEN_LOI'), createElement('btn-NHA_THUOC')
  ];

  global.document = {
    getElementById: (id) => elements[id] || null,
    querySelectorAll: (sel) => {
      if (sel === '.industry-btn') return industryBtns;
      if (sel === '.radius-btn') return [];
      return [];
    }
  };

  // 1. Test chọn ngành Nail
  instance.selectIndustryAndCalculate('VN-HN', 'NAIL');
  assert.strictEqual(instance._currentIndustryKey, 'NAIL');
  assert.ok(elements['kinhte-industry-report'].innerHTML.includes('Nail & Chăm Sóc Sắc Đẹp'));
  assert.ok(elements['kinhte-industry-report'].innerHTML.includes('96220'));

  // 2. Test chọn ngành Tiện Lợi
  instance.selectIndustryAndCalculate('VN-HN', 'TIEN_LOI');
  assert.strictEqual(instance._currentIndustryKey, 'TIEN_LOI');
  assert.ok(elements['kinhte-industry-report'].innerHTML.includes('Cửa Hàng Tiện Lợi'));
  assert.ok(elements['kinhte-industry-report'].innerHTML.includes('47110'));

  // 3. Test đổi bán kính 500m
  instance.setRadiusAndCalculate('VN-HN', 500);
  assert.strictEqual(instance._currentRadiusMeters, 500);
  assert.ok(elements['kinhte-radius-result'].innerHTML.includes('500 m') || elements['kinhte-radius-result'].innerHTML.includes('0.5 km'));
  assert.ok(elements['kinhte-industry-report'].innerHTML.includes('500 m') || elements['kinhte-industry-report'].innerHTML.includes('0.5 km'));

  // 4. Test triggerRadiusCalculation
  instance.triggerRadiusCalculation('VN-HN');
  assert.ok(elements['kinhte-industry-report'].innerHTML.length > 100);
});

// =========================================================================
// PHẦN 4: KIỂM TOÁN TƯƠNG TÁC MODAL TRÊN LA KINH BẢN ĐỒ (LUOPAN_MAP_TOOL)
// =========================================================================
runAudit('Kiểm tra tích hợp Modal Sức Mua Bán Kính trên LuopanMapTool', () => {
  const modalElements = {};
  modalElements['dt-econ-modal-content'] = { innerHTML: '', style: {} };
  modalElements['dt-econ-location-text'] = { textContent: '' };
  modalElements['modal-economic-radius'] = { style: { display: 'none' } };

  global.document = {
    getElementById: (id) => modalElements[id] || null,
    querySelectorAll: () => []
  };

  const tool = new LuopanMapTool({
    containerId: 'dummy-container'
  });

  // Mock survey coordinates (Tọa độ Nhà Thờ Lớn Hà Nội)
  tool.getSurveyCenterCoordinates = () => ({ lat: 21.0285, lng: 105.8542 });

  // 1. Chạy cập nhật dữ liệu với Cà Phê
  tool.updateEconomicRadiusData(1000, 'CAFE');
  const content = modalElements['dt-econ-modal-content'].innerHTML;
  assert.ok(content.includes('Cà Phê & Đồ Uống'));
  assert.ok(content.includes('VSIC 56302'));
  assert.ok(!content.includes('undefined'));
  assert.ok(!content.includes('NaN'));

  // 2. Chạy cập nhật dữ liệu với Nail 500m
  tool.updateEconomicRadiusData(500, 'NAIL');
  const contentNail = modalElements['dt-econ-modal-content'].innerHTML;
  assert.ok(contentNail.includes('Nail & Chăm Sóc Sắc Đẹp'));
  assert.ok(contentNail.includes('VSIC 96220'));
  assert.ok(!contentNail.includes('undefined'));
  assert.ok(!contentNail.includes('NaN'));
});

console.log(`\n======================================================`);
console.log(`KẾT QUẢ ĐỢT KIỂM TOÁN: ${passCount} / ${totalTests} HẠNG MỤC ĐẠT CHUẨN HOÀN HẢO!`);
console.log(`======================================================\n`);

if (passCount !== totalTests) {
  process.exit(1);
}
