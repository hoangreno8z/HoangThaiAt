const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('================================================================');
console.log('TEST SUITE: BỘ DỮ LIỆU KINH TẾ 64 TỈNH THÀNH & ĐỘNG CƠ BÁN KÍNH');
console.log('================================================================\n');

const APP_DIR = 'C:\\Users\\ADMIN\\.gemini\\antigravity\\scratch\\thai_at_app';

// 1. Nạp bộ dữ liệu địa lý và kinh tế
const diaLyCorpus = require(path.join(APP_DIR, 'js', 'dia_ly_64_tinh_thanh_data')).DIA_LY_64_TINH_THANH_CORPUS;
const kinhTeCorpus = require(path.join(APP_DIR, 'js', 'kinh_te_64_tinh_thanh_data')).KINH_TE_64_TINH_THANH_CORPUS;
const economicEngine = require(path.join(APP_DIR, 'js', 'economic_radius_engine'));

// Make available globally for testing
global.DIA_LY_64_TINH_THANH_CORPUS = diaLyCorpus;
global.KINH_TE_64_TINH_THANH_CORPUS = kinhTeCorpus;
global.EconomicRadiusEngine = economicEngine;

let passCount = 0;
let failCount = 0;

function it(name, testFn) {
  try {
    testFn();
    console.log(`  [PASS] ${name}`);
    passCount++;
  } catch (err) {
    console.error(`  [FAIL] ${name}: ${err.message}`);
    failCount++;
  }
}

// ============================================================================
// TEST GROUP 1: KIỂM TOÁN TÍNH TOÀN VẸN 64 ĐƠN VỊ KINH TẾ LỊCH SỬ
// ============================================================================
console.log('--- NHÓM 1: KIỂM TOÁN DỮ LIỆU 64 TỈNH THÀNH (100% NSO/VHLSS/SAE) ---');

it('1.1 Đủ 64/64 đơn vị địa lý lịch sử (63 tỉnh hiện hành + Hà Tây HT_PRE2008)', () => {
  assert.strictEqual(kinhTeCorpus.length, 64, `Số tỉnh thành phải là 64, thực tế: ${kinhTeCorpus.length}`);
  assert.strictEqual(diaLyCorpus.length, 64, `Địa lý 64 phải có 64 tỉnh`);
});

it('1.2 Khớp 1-1 chính xác ID lịch sử với DIA_LY_64_TINH_THANH_CORPUS', () => {
  const diaLyIds = new Set(diaLyCorpus.map(p => p.historical_id));
  const kinhTeIds = new Set(kinhTeCorpus.map(p => p.historical_id));
  assert.strictEqual(diaLyIds.size, 64);
  assert.strictEqual(kinhTeIds.size, 64);

  for (const id of diaLyIds) {
    assert.ok(kinhTeIds.has(id), `Thiếu ID lịch sử ${id} trong kinhTeCorpus`);
  }
});

it('1.3 Toàn bộ 64 tỉnh thành có đủ 7 khối trường kinh tế bắt buộc', () => {
  for (const p of kinhTeCorpus) {
    assert.ok(p.historical_id, `Tỉnh thiếu historical_id`);
    assert.ok(p.province_name, `Tỉnh thiếu province_name`);
    assert.ok(p.region, `Tỉnh thiếu region`);
    assert.ok(p.coordinates, `Tỉnh thiếu coordinates`);

    // Khối 1: Macro Economics
    assert.ok(p.macro_economics, `${p.province_name} thiếu macro_economics`);
    assert.ok(p.macro_economics.grdp_billion_vnd > 0, `${p.province_name} grdp phải > 0`);
    assert.ok(p.macro_economics.grdp_per_capita_usd > 0, `${p.province_name} grdp_per_capita_usd phải > 0`);
    assert.ok(typeof p.macro_economics.grdp_growth_rate_pct === 'number');

    // Khối 2: Retail and Commerce
    assert.ok(p.retail_and_commerce, `${p.province_name} thiếu retail_and_commerce`);
    assert.ok(p.retail_and_commerce.total_retail_billion_vnd > 0);
    assert.ok(p.retail_and_commerce.commercial_infrastructure.markets_count > 0);

    // Khối 3: Household Income & Expenditure
    assert.ok(p.household_income_expenditure, `${p.province_name} thiếu household_income_expenditure`);
    assert.ok(p.household_income_expenditure.monthly_income_per_capita_million_vnd > 0);
    assert.ok(p.household_income_expenditure.monthly_expense_per_capita_million_vnd > 0);
    assert.ok(p.household_income_expenditure.food_expense_ratio_pct > 0);
    assert.ok(p.household_income_expenditure.non_food_expense_ratio_pct > 0);

    // Khối 4: Economic Census 2021
    assert.ok(p.economic_census_2021, `${p.province_name} thiếu economic_census_2021`);
    assert.ok(p.economic_census_2021.active_enterprises_count > 0);
    assert.ok(p.economic_census_2021.individual_business_households > 0);
    assert.ok(p.economic_census_2021.business_density_per_1000_people > 0);

    // Khối 5: Demographics & Urbanization
    assert.ok(p.demographics_and_urbanization, `${p.province_name} thiếu demographics_and_urbanization`);
    assert.ok(p.demographics_and_urbanization.population > 0);
    assert.ok(p.demographics_and_urbanization.population_density_per_km2 > 0);

    // Khối 6: Regional Purchasing Power Index (RPPI)
    assert.ok(p.regional_purchasing_power_index, `${p.province_name} thiếu regional_purchasing_power_index`);
    const rppi = p.regional_purchasing_power_index;
    assert.ok(rppi.overall_score >= 0 && rppi.overall_score <= 100, `${p.province_name} RPPI score ngoài thang 0-100: ${rppi.overall_score}`);
    assert.ok(rppi.tier, `${p.province_name} thiếu RPPI tier`);
    assert.ok(rppi.pillar_scores.income_score >= 0 && rppi.pillar_scores.income_score <= 100);
    assert.ok(rppi.pillar_scores.spending_score >= 0 && rppi.pillar_scores.spending_score <= 100);
    assert.ok(rppi.pillar_scores.market_density_score >= 0 && rppi.pillar_scores.market_density_score <= 100);
    assert.ok(rppi.pillar_scores.commercial_activity_score >= 0 && rppi.pillar_scores.commercial_activity_score <= 100);
    assert.ok(rppi.pillar_scores.growth_score >= 0 && rppi.pillar_scores.growth_score <= 100);
    assert.ok(rppi.commercial_summary && rppi.commercial_summary.length > 50, `${p.province_name} nhận định thương mại quá ngắn`);

    // Khối 7: Key Districts SAE
    assert.ok(Array.isArray(p.key_districts_sae) && p.key_districts_sae.length >= 3, `${p.province_name} phải có ít nhất 3 quận/huyện SAE`);
    for (const d of p.key_districts_sae) {
      assert.ok(d.id && d.name && d.type, `Huyện thiếu id/name/type`);
      assert.ok(d.pop > 0 && d.density > 0 && d.income > 0 && d.expense > 0);
      assert.ok(d.rppi >= 0 && d.rppi <= 100, `Huyện ${d.name} RPPI ngoài 0-100: ${d.rppi}`);
    }
  }
});

// ============================================================================
// TEST GROUP 2: ĐỘNG CƠ BÁN KÍNH KINH TẾ (ECONOMIC RADIUS ENGINE)
// ============================================================================
console.log('\n--- NHÓM 2: KIỂM THỬ ĐỘNG CƠ BÁN KÍNH KINH TẾ & KHÔNG GIAN ---');

it('2.1 Tự động nhận dạng đúng tỉnh thành qua tọa độ GPS (Haversine)', () => {
  // Hà Nội (Hoàn Kiếm)
  const hn = economicEngine.findNearestProvince(21.0285, 105.8542);
  assert.strictEqual(hn.province.historical_id, 'HN_PRE2008');

  // TP.HCM (Quận 1)
  const sg = economicEngine.findNearestProvince(10.7769, 106.7009);
  assert.strictEqual(sg.province.historical_id, 'SG_PRE2008');

  // Đà Nẵng (Hải Châu)
  const dn = economicEngine.findNearestProvince(16.0678, 108.2208);
  assert.strictEqual(dn.province.historical_id, 'DN_PRE2008');

  // Cần Thơ (Ninh Kiều)
  const ct = economicEngine.findNearestProvince(10.0352, 105.7836);
  assert.strictEqual(ct.province.historical_id, 'CT_PRE2008');
});

it('2.2 Tính toán chính xác diện tích hình tròn theo bán kính (500m, 1km, 3km)', () => {
  const r500 = economicEngine.calculateRadiusMarket({ provinceId: 'HN_PRE2008', radiusMeters: 500 });
  assert.strictEqual(r500.location.areaKm2, 0.79);

  const r1000 = economicEngine.calculateRadiusMarket({ provinceId: 'HN_PRE2008', radiusMeters: 1000 });
  assert.strictEqual(r1000.location.areaKm2, 3.14);

  const r3000 = economicEngine.calculateRadiusMarket({ provinceId: 'HN_PRE2008', radiusMeters: 3000 });
  assert.strictEqual(r3000.location.areaKm2, 28.27);
});

it('2.3 Tính dung lượng chi tiêu và phân rã các khoản chi tiêu', () => {
  const res = economicEngine.calculateRadiusMarket({
    provinceId: 'SG_PRE2008',
    districtId: 'SG-Q1',
    radiusMeters: 1000
  });

  assert.ok(res.location.provinceName.includes('Hồ Chí Minh'));
  assert.strictEqual(res.location.districtName, 'Quận 1');
  assert.ok(res.demographics.estimatedPopulation > 10000);
  assert.ok(res.financials.totalMonthlySpendingBillionVnd > 50, `Quận 1 bán kính 1km dung lượng phải > 50 tỷ VNĐ`);
  assert.ok(res.spendingBreakdown.foodExpenseBillion > 0);
  assert.ok(res.spendingBreakdown.housingUtilitiesBillion > 0);
  assert.ok(res.spendingBreakdown.educationHealthBillion > 0);
  assert.ok(res.spendingBreakdown.shoppingLeisureBillion > 0);
  assert.ok(res.marketAssessment.suitableBusinessModels.length >= 3);
  assert.ok(res.marketAssessment.rating);
});

it('2.4 Dung lượng chi tiêu tăng tỷ lệ thuận với bán kính khảo sát', () => {
  const m500 = economicEngine.calculateRadiusMarket({ provinceId: 'HN_PRE2008', radiusMeters: 500 });
  const m1000 = economicEngine.calculateRadiusMarket({ provinceId: 'HN_PRE2008', radiusMeters: 1000 });
  const m3000 = economicEngine.calculateRadiusMarket({ provinceId: 'HN_PRE2008', radiusMeters: 3000 });

  assert.ok(m1000.demographics.estimatedPopulation > m500.demographics.estimatedPopulation);
  assert.ok(m3000.demographics.estimatedPopulation > m1000.demographics.estimatedPopulation);
  assert.ok(m1000.financials.totalMonthlySpendingBillionVnd > m500.financials.totalMonthlySpendingBillionVnd);
  assert.ok(m3000.financials.totalMonthlySpendingBillionVnd > m1000.financials.totalMonthlySpendingBillionVnd);
});

// ============================================================================
// TEST GROUP 3: GIAO DIỆN & TÍCH HỢP HỆ THỐNG
// ============================================================================
console.log('\n--- NHÓM 3: KIỂM THỬ GIAO DIỆN & TÍCH HỢP HỆ THỐNG ---');

it('3.1 File tool_ui.js chứa đầy đủ các phân hệ kinh tế 64', () => {
  const toolUiCode = fs.readFileSync(path.join(APP_DIR, 'js', 'tool_ui.js'), 'utf8');
  assert.ok(toolUiCode.includes("window.toolUI.render('kinhte64')"), 'Thiếu nút tab kinhte64');
  assert.ok(toolUiCode.includes("renderKinhTe64Tab"), 'Thiếu hàm renderKinhTe64Tab');
  assert.ok(toolUiCode.includes("calculateCustomRadius"), 'Thiếu hàm calculateCustomRadius');
  assert.ok(toolUiCode.includes("renderRadiusResultHtml"), 'Thiếu hàm renderRadiusResultHtml');
  assert.ok(toolUiCode.includes("switchDiaLySubTab"), 'Thiếu hàm switchDiaLySubTab');
});

it('3.2 File luopan_map_tool.js chứa nút và modal sức mua bán kính', () => {
  const luopanCode = fs.readFileSync(path.join(APP_DIR, 'js', 'luopan_map_tool.js'), 'utf8');
  assert.ok(luopanCode.includes("btn-economic-radius"), 'Thiếu nút btn-economic-radius');
  assert.ok(luopanCode.includes("modal-economic-radius"), 'Thiếu modal modal-economic-radius');
  assert.ok(luopanCode.includes("openEconomicRadiusModal"), 'Thiếu hàm openEconomicRadiusModal');
  assert.ok(luopanCode.includes("updateEconomicRadiusData"), 'Thiếu hàm updateEconomicRadiusData');
  assert.ok(luopanCode.includes("getSurveyCenterCoordinates"), 'Thiếu hàm getSurveyCenterCoordinates');
});

it('3.3 index.html đã nhúng đủ script kinh tế và động cơ bán kính', () => {
  const html = fs.readFileSync(path.join(APP_DIR, 'index.html'), 'utf8');
  assert.ok(html.includes('js/kinh_te_64_tinh_thanh_data.js'), 'Thiếu thẻ script kinh_te_64_tinh_thanh_data.js');
  assert.ok(html.includes('js/economic_radius_engine.js'), 'Thiếu thẻ script economic_radius_engine.js');
});

console.log('\n================================================================');
console.log(`KẾT QUẢ KIỂM THỬ: ${passCount} PASS, ${failCount} FAIL`);
console.log('================================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('>>> TOÀN BỘ CÁC BÀI TEST CHẤP NHẬN PHÂN HỆ KINH TẾ 64 ĐÃ HOÀN TOÀN THÀNH CÔNG! <<<\n');
}
