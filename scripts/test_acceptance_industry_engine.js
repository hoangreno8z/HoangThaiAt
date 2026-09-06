/**
 * SUITE KIỂM THỬ CHẤP NHẬN: ĐỘNG CƠ PHÂN TÍCH NGÀNH NGHỀ & ĐỘNG THÁI SINH - TỬ CỬA HÀNG
 * (INDUSTRY ECONOMIC ENGINE ACCEPTANCE TESTS)
 */

const assert = require('assert');
const path = require('path');

// Nạp dữ liệu nền tảng
const provinceData = require('../js/dia_ly_64_tinh_thanh_data.js');
const kinhTeData = require('../js/kinh_te_64_tinh_thanh_data.js');
const radiusEngine = require('../js/economic_radius_engine.js');
const industryEngine = require('../js/industry_economic_engine.js');

console.log('=== BẮT ĐẦU KIỂM THỬ INDUSTRY ECONOMIC ENGINE ===\n');

let passCount = 0;
let totalTests = 0;

function runTest(desc, testFn) {
  totalTests++;
  try {
    testFn();
    console.log(`  [PASS] Test ${totalTests}: ${desc}`);
    passCount++;
  } catch (err) {
    console.error(`  [FAIL] Test ${totalTests}: ${desc}`);
    console.error(`         Lỗi: ${err.message}`);
  }
}

// 1. Kiểm tra Danh mục Ngành nghề VSIC 2025
runTest('Danh mục hồ sơ 6 ngành nghề kinh doanh trọng điểm chuẩn hóa VSIC 2025', () => {
  const catalog = industryEngine.getIndustryCatalog();
  const expectedKeys = ['CAFE', 'NAIL', 'NHA_HANG_FNB', 'SPA_BEAUTY', 'TIEN_LOI', 'NHA_THUOC'];
  
  assert.strictEqual(Object.keys(catalog).length, 6, 'Phải đủ đúng 6 ngành');
  
  expectedKeys.forEach(k => {
    const p = catalog[k];
    assert.ok(p, `Ngành ${k} phải tồn tại`);
    assert.ok(p.vsic_code, `Ngành ${k} phải có mã VSIC`);
    assert.ok(p.breakeven_monthly_revenue > 0, `Ngành ${k} phải có doanh thu hòa vốn > 0`);
    assert.ok(p.churn_rate_annual > 0 && p.churn_rate_annual < 1, `Ngành ${k} phải có churn rate hợp lệ (0 < r < 1)`);
    assert.ok(p.survival_rates.over_2y > 0, `Ngành ${k} phải có tỷ lệ trụ vững > 2 năm`);
    assert.ok(Array.isArray(p.suitable_models) && p.suitable_models.length > 0, `Ngành ${k} phải có danh sách mô hình đề xuất`);
    assert.ok(p.fengshui_affinity.length > 0, `Ngành ${k} phải có khẩu quyết phong thủy vị trí`);
  });

  assert.strictEqual(catalog.CAFE.vsic_code, '56302', 'Cà phê mã VSIC 56302');
  assert.strictEqual(catalog.NAIL.vsic_code, '96220', 'Nail mã VSIC 96220');
});

// 2. Kiểm tra tính toán Cà phê (CAFE) tại Hà Nội - Hoàn Kiếm (1km)
runTest('Khảo sát thị trường Cà phê (CAFE) bán kính 1km tại Hoàn Kiếm, Hà Nội', () => {
  const res = industryEngine.calculateIndustryMarket({
    provinceId: 'VN-HN',
    districtId: 'HN-HK',
    radiusMeters: 1000,
    industryKey: 'CAFE'
  });

  assert.ok(res, 'Kết quả không được rỗng');
  assert.strictEqual(res.profile.id, 'CAFE');
  assert.strictEqual(res.profile.vsic_code, '56302');
  assert.strictEqual(res.location.radiusMeters, 1000);
  assert.strictEqual(res.location.areaKm2, 3.14);

  // Khối 1: Khách tiềm năng & Sức mua ngành
  assert.ok(res.demographics.targetCustomerCount > 10000, 'Khách hàng mục tiêu trung tâm Hoàn Kiếm phải > 10,000');
  assert.ok(res.marketDemand.totalMonthlyDemandBillionVnd > 5, 'Dung lượng tiêu thụ cafe/tháng phải > 5 tỷ VNĐ');
  assert.ok(res.marketDemand.totalYearlyDemandBillionVnd > 60, 'Dung lượng năm cafe phải > 60 tỷ VNĐ');

  // Khối 2: Đối thủ & Cạnh tranh
  assert.ok(res.competition.estimatedCompetitors >= 20, 'Số quán cafe Hoàn Kiếm bán kính 1km phải >= 20');
  assert.ok(res.competition.chainCount >= 5, 'Phải có sự hiện diện của chuỗi');
  assert.ok(res.competition.avgDistanceBetweenCompetitorsMeters > 0, 'Khoảng cách trung bình giữa 2 quán phải > 0');

  // Khối 3: Động thái Sinh - Tử & Churn (Minh bạch dữ liệu: không bịa số 1/1)
  assert.strictEqual(res.survivalDynamics.status, 'unavailable', 'Trạng thái dữ liệu vi mô phải là unavailable');
  assert.strictEqual(res.survivalDynamics.newlyAddedCount, null, 'Không tự ý bịa số quán mở mới');
  assert.strictEqual(res.survivalDynamics.removedCount, null, 'Không tự ý bịa số quán đóng cửa');
  assert.ok(res.survivalDynamics.survivalOver2YearsPct > 0, 'Phải có tỷ lệ sống sót > 2 năm chuẩn hóa ngành');

  // Khối 4: DSR & Điểm Cơ Hội
  assert.ok(res.feasibility.dsrRatio > 0, 'Tỷ số DSR phải > 0');
  assert.ok(res.feasibility.overallOpportunityScore >= 50 && res.feasibility.overallOpportunityScore <= 100, 'Opportunity score trong khoảng [50, 100]');
  assert.strictEqual(res.feasibility.breakevenMonthlyMillion, 115, 'Doanh thu hòa vốn cafe chuẩn 115 tr/tháng');
  assert.ok(res.feasibility.fengshuiAdvice.includes('Kim Thành Hoàn Bão') || res.feasibility.fengshuiAdvice.includes('Khí Khẩu'), 'Phải có khẩu quyết phong thủy phù hợp');
});

// 3. Kiểm tra tính toán Nail (NAIL) tại TP.HCM - Quận 1 (500m)
runTest('Khảo sát thị trường Nail & Móng (NAIL) bán kính 500m tại Quận 1, TP.HCM', () => {
  const res = industryEngine.calculateIndustryMarket({
    provinceId: 'VN-SG',
    districtId: 'SG-Q1',
    radiusMeters: 500,
    industryKey: 'NAIL'
  });

  assert.ok(res);
  assert.strictEqual(res.profile.id, 'NAIL');
  assert.strictEqual(res.profile.vsic_code, '96220');
  assert.strictEqual(res.location.radiusMeters, 500);
  assert.strictEqual(res.location.areaKm2, 0.79);

  assert.ok(res.demographics.targetCustomerCount > 2000, 'Tệp khách nữ tiềm năng > 2,000');
  assert.ok(res.competition.estimatedCompetitors >= 2, 'Đối thủ hiện hữu >= 2');
  assert.strictEqual(res.feasibility.breakevenMonthlyMillion, 65, 'Doanh thu hòa vốn tiệm nail chuẩn 65 tr/tháng');
  assert.ok(res.survivalDynamics.survivalOver2YearsPct >= 30, 'Tỷ lệ trụ vững > 2 năm ngành nail >= 30%');
  assert.ok(res.feasibility.overallOpportunityScore >= 60, 'Quận 1 TP.HCM điểm cơ hội ngành Nail phải cao');
});

// 4. Kiểm tra tính toán F&B (NHA_HANG_FNB) tại Đà Nẵng - Hải Châu (1km)
runTest('Khảo sát thị trường Nhà Hàng F&B (NHA_HANG_FNB) tại Hải Châu, Đà Nẵng', () => {
  const res = industryEngine.calculateIndustryMarket({
    provinceId: 'VN-DN',
    districtId: 'DN-HC',
    radiusMeters: 1000,
    industryKey: 'NHA_HANG_FNB'
  });

  assert.ok(res);
  assert.strictEqual(res.profile.id, 'NHA_HANG_FNB');
  assert.strictEqual(res.profile.vsic_code, '56101');
  assert.ok(res.marketDemand.totalMonthlyDemandBillionVnd > 10, 'Dung lượng F&B Hải Châu/tháng > 10 tỷ');
  assert.strictEqual(res.feasibility.breakevenMonthlyMillion, 240, 'Doanh thu hòa vốn F&B chuẩn 240 tr');
});

// 5. Kiểm tra tính toán Spa (SPA_BEAUTY) theo Tọa độ GPS thực tế
runTest('Khảo sát thị trường Spa (SPA_BEAUTY) qua Tọa độ GPS thực tế', () => {
  const res = industryEngine.calculateIndustryMarket({
    lat: 10.7769,
    lng: 106.7009,
    radiusMeters: 1000,
    industryKey: 'SPA_BEAUTY'
  });

  assert.ok(res);
  assert.strictEqual(res.profile.id, 'SPA_BEAUTY');
  assert.strictEqual(res.profile.vsic_code, '96210');
  assert.ok(res.location.provinceName.includes('Hồ Chí Minh'));
  assert.ok(res.demographics.targetCustomerCount > 0);
  assert.ok(res.feasibility.overallOpportunityScore > 0);
});

// 6. Kiểm tra tính toán Tiện Lợi (TIEN_LOI) và Nhà Thuốc (NHA_THUOC)
runTest('Khảo sát Tiện Lợi (47110) và Nhà Thuốc (47721) tại Cần Thơ - Ninh Kiều', () => {
  const resTienLoi = industryEngine.calculateIndustryMarket({
    provinceId: 'VN-CT',
    districtId: 'CT-NK',
    radiusMeters: 1000,
    industryKey: 'TIEN_LOI'
  });
  assert.strictEqual(resTienLoi.profile.vsic_code, '47110');
  assert.ok(resTienLoi.competition.chainRatioPct >= 50, 'Tỷ lệ chuỗi tiện lợi cao >= 50%');

  const resThuoc = industryEngine.calculateIndustryMarket({
    provinceId: 'VN-CT',
    districtId: 'CT-NK',
    radiusMeters: 1000,
    industryKey: 'NHA_THUOC'
  });
  assert.strictEqual(resThuoc.profile.vsic_code, '47721');
  assert.ok(resThuoc.survivalDynamics.churnRatePct <= 10, 'Nhà thuốc tính ổn định cao, churn rate <= 10%');
});

// 7. Kiểm tra Logic phân định DSR và Phân hạng Cơ hội thị trường
runTest('Phân định ngưỡng DSR (Demand-to-Supply Ratio) và Opportunity Score', () => {
  const res = industryEngine.calculateIndustryMarket({
    provinceId: 'VN-HN',
    districtId: 'HN-CG', // Cầu Giấy
    radiusMeters: 1000,
    industryKey: 'CAFE'
  });

  const { dsrRatio, dsrStatus, dsrColor, overallOpportunityScore, opportunityTier, opportunityColor } = res.feasibility;
  
  if (dsrRatio >= 1.35) {
    assert.strictEqual(dsrColor, '#10B981');
    assert.ok(dsrStatus.includes('rất lớn'));
  } else if (dsrRatio >= 1.05) {
    assert.strictEqual(dsrColor, '#34D399');
    assert.ok(dsrStatus.includes('dư địa'));
  } else if (dsrRatio >= 0.85) {
    assert.strictEqual(dsrColor, '#FBBF24');
    assert.ok(dsrStatus.includes('cân bằng'));
  } else {
    assert.strictEqual(dsrColor, '#EF4444');
    assert.ok(dsrStatus.includes('bão hòa'));
  }

  assert.ok(overallOpportunityScore >= 0 && overallOpportunityScore <= 100);
  assert.ok(['#10B981', '#38BDF8', '#FBBF24', '#EF4444'].includes(opportunityColor));
  assert.ok(opportunityTier.length > 0);
});

// 8. Kiểm tra Khả năng xử lý Fallback và Biên an toàn dữ liệu
runTest('Xử lý an toàn khi thiếu tham số hoặc tỉnh thành xa xôi', () => {
  // Test huyện vùng cao Điện Biên
  const resDB = industryEngine.calculateIndustryMarket({
    provinceId: 'VN-DB',
    districtId: 'DB-DB',
    radiusMeters: 3000,
    industryKey: 'CAFE'
  });

  assert.ok(resDB);
  assert.ok(resDB.competition.estimatedCompetitors >= 2, 'Luôn có ít nhất 2 đối thủ ước tính tối thiểu');
  assert.strictEqual(resDB.survivalDynamics.status, 'unavailable', 'Dữ liệu vi mô vùng cao phải trả về unavailable');
  assert.ok(resDB.feasibility.overallOpportunityScore > 0);
});

console.log(`\n========================================`);
console.log(`KẾT QUẢ KIỂM THỬ: ${passCount} / ${totalTests} BÀI KIỂM TRA ĐẠT TUYỆT ĐỐI!`);
console.log(`========================================\n`);

if (passCount !== totalTests) {
  process.exit(1);
}
