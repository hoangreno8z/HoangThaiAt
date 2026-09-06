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

// 1. Kiểm tra Danh mục Ngành nghề VSIC 2025 (Đầy đủ 40 ngành kinh tế thực tế theo 8 nhóm phân loại)
runTest('Danh mục hồ sơ 40 ngành nghề kinh doanh chuẩn hóa VSIC 2025 (8 nhóm danh mục)', () => {
  const catalog = industryEngine.getIndustryCatalog();
  assert.strictEqual(Object.keys(catalog).length, 40, 'Phải đủ đúng 40 ngành kinh doanh');
  
  Object.keys(catalog).forEach(k => {
    const p = catalog[k];
    assert.ok(p, `Ngành ${k} phải tồn tại`);
    assert.ok(p.vsic_code, `Ngành ${k} phải có mã VSIC`);
    assert.ok(p.breakeven_monthly_revenue > 0, `Ngành ${k} phải có doanh thu hòa vốn > 0`);
    assert.ok(p.churn_rate_annual > 0 && p.churn_rate_annual < 1, `Ngành ${k} phải có churn rate hợp lệ (0 < r < 1)`);
    assert.ok(p.survival_rates.over_2y > 0, `Ngành ${k} phải có tỷ lệ trụ vững > 2 năm`);
    assert.ok(Array.isArray(p.suitable_models) && p.suitable_models.length > 0, `Ngành ${k} phải có danh sách mô hình đề xuất`);
    assert.ok(p.fengshui_affinity.length > 0, `Ngành ${k} phải có khẩu quyết phong thủy vị trí`);
    assert.ok(p.matchCriteria, `Ngành ${k} phải có bộ tiêu chí vị trí tối ưu (matchCriteria)`);
    assert.ok(p.category, `Ngành ${k} phải thuộc 1 trong 8 nhóm phân loại chuẩn`);
  });

  // Kiểm tra mã chuẩn VSIC 2025 của các ngành tiêu biểu
  assert.strictEqual(catalog.CAFE.vsic_code, '56302', 'Cà phê mã VSIC 56302');
  assert.strictEqual(catalog.NAIL.vsic_code, '96220', 'Nail mã VSIC 96220');
  assert.strictEqual(catalog.TOC_NAM_BARBER.vsic_code, '96220', 'Tóc nam mã VSIC 96220');
  assert.strictEqual(catalog.TIEM_VANG.vsic_code, '47732', 'Tiệm vàng mã VSIC 47732');
  assert.strictEqual(catalog.CAY_XANG.vsic_code, '47300', 'Cây xăng mã VSIC 47300');
  assert.strictEqual(catalog.BAT_DONG_SAN.vsic_code, '68200', 'Bất động sản mã VSIC 68200');
  assert.strictEqual(catalog.PHONG_KHAM_DA_KHOA.vsic_code, '86201', 'Phòng khám đa khoa mã VSIC 86201');
  assert.strictEqual(catalog.PHAN_BON_BVTV.vsic_code, '47731', 'Phân bón & BVTV mã VSIC 47731');
  assert.strictEqual(catalog.SHOWROOM_O_TO.vsic_code, '45111', 'Showroom ô tô mã VSIC 45111');
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

// 9. Kiểm tra tính toán các ngành đang phát triển & xu hướng mới (Pickleball, Pet Care, EV, Laundromat...)
runTest('Khảo sát thị trường các ngành xu hướng mới: Pickleball, Pet Care, Trạm sạc EV, Giặt sấy 24/7', () => {
  // Test Pickleball tại Củ Chi
  const resPB = industryEngine.calculateIndustryMarket({
    provinceId: 'VN-SG',
    districtId: 'SG-CC',
    radiusMeters: 1000,
    industryKey: 'PICKLEBALL'
  });
  assert.ok(resPB);
  assert.strictEqual(resPB.profile.id, 'PICKLEBALL');
  assert.strictEqual(resPB.profile.vsic_code, '93110');
  assert.ok(resPB.marketDemand.totalMonthlyDemandBillionVnd > 0);
  assert.ok(resPB.feasibility.overallOpportunityScore > 0);

  // Test Trạm sạc EV tại Hải Châu, Đà Nẵng
  const resEV = industryEngine.calculateIndustryMarket({
    provinceId: 'VN-DN',
    districtId: 'DN-HC',
    radiusMeters: 1000,
    industryKey: 'TRAM_SAC_EV'
  });
  assert.ok(resEV);
  assert.strictEqual(resEV.profile.id, 'TRAM_SAC_EV');
  assert.strictEqual(resEV.profile.chain_ratio_avg, 0.68, 'Trạm sạc EV tỷ lệ chuỗi lớn cao 68%');

  // Test Pet Care tại Hoàn Kiếm, Hà Nội
  const resPet = industryEngine.calculateIndustryMarket({
    provinceId: 'VN-HN',
    districtId: 'HN-HK',
    radiusMeters: 1000,
    industryKey: 'PET_CARE'
  });
  assert.ok(resPet);
  assert.strictEqual(resPet.profile.id, 'PET_CARE');
  assert.ok(resPet.demographics.targetCustomerCount > 1000);
});

// 10. Kiểm tra Phân hệ Cảnh báo Ngành có nguy cơ đào thải (Sunset Industry Radar)
runTest('Phân hệ Cảnh báo Ngành có nguy cơ đào thải (Sunset Industry Radar): đủ 6 ngành truyền thống suy giảm', () => {
  const sunsetList = industryEngine.getSunsetIndustries();
  assert.strictEqual(sunsetList.length, 6, 'Phải có đủ đúng 6 ngành có nguy cơ đào thải');

  const expectedSunsetKeys = [
    'NET_CO_TRADITIONAL',
    'PHOTOCOPY_IN_AN',
    'CD_BANG_DIA_SACH_BAO',
    'MAY_DO_THU_CONG_CU',
    'DAI_LY_VE_MAY_BAY_GIAY',
    'DIEN_MAY_GIA_DUNG_NHO'
  ];

  expectedSunsetKeys.forEach(k => {
    const p = industryEngine.getSunsetIndustryProfile(k);
    assert.ok(p, `Ngành ${k} phải tồn tại`);
    assert.ok(p.vsic_code, `Ngành ${k} phải có mã VSIC`);
    assert.ok(p.riskScore >= 60 && p.riskScore <= 100, `Ngành ${k} phải có rủi ro cao (>= 60%)`);
    assert.ok(p.annualDeclineRatePct < 0, `Ngành ${k} phải có tốc độ sụt giảm âm`);
    assert.ok(Array.isArray(p.coreCauses) && p.coreCauses.length >= 3, `Ngành ${k} phải có danh sách nguyên nhân`);
    assert.ok(p.strategicPivot.length > 10, `Ngành ${k} phải có khuyến nghị chuyển dịch`);
    assert.ok(p.fengshuiWarning.length > 10, `Ngành ${k} phải có lời khuyên phong thủy thoái vận`);
  });

  const netCo = industryEngine.getSunsetIndustryProfile('NET_CO_TRADITIONAL');
  assert.strictEqual(netCo.vsic_code, '93290');
  assert.strictEqual(netCo.riskScore, 88);

  const bangDia = industryEngine.getSunsetIndustryProfile('CD_BANG_DIA_SACH_BAO');
  assert.strictEqual(bangDia.riskScore, 96);
  assert.strictEqual(bangDia.riskLevel, 'Báo Động Đỏ');
});

// 11. Kiểm tra Thuật toán Gợi ý Tối ưu Vị trí (Spatial Opportunity Engine - Lọc Vị Trí Tốt)
runTest('Bộ công cụ Lọc vị trí tốt: Tự động quét địa bàn tối ưu theo nhân khẩu học, sức mua & khoảng trống cạnh tranh', () => {
  // 11.1 Ngành nông nghiệp (Phân bón & BVTV) tại TP.HCM -> Phải ưu tiên các huyện ngoại thành có diện tích nông nghiệp lớn
  const agriList = industryEngine.findBestLocationsForIndustry({
    provinceId: 'VN-SG',
    industryKey: 'PHAN_BON_BVTV',
    limit: 5
  });
  assert.ok(Array.isArray(agriList) && agriList.length === 5, 'Phải trả về 5 địa bàn tối ưu cho phân bón');
  assert.ok(agriList[0].score >= 90, 'Huyện nông nghiệp hàng đầu phải có điểm phù hợp >= 90%');
  const agriDistrictNames = agriList.map(l => l.districtName);
  assert.ok(agriDistrictNames.some(n => n.includes('Củ Chi') || n.includes('Hóc Môn') || n.includes('Bình Chánh')), 'Ngành phân bón phải gợi ý các huyện nông nghiệp Củ Chi / Hóc Môn / Bình Chánh');
  assert.ok(agriList[0].reasons.length > 0, 'Phải có danh sách lý do cụ thể');

  // 11.2 Ngành Hớt tóc nam (TOC_NAM_BARBER) tại TP.HCM -> Dân số nam đông, khoảng trống cạnh tranh
  const barberList = industryEngine.findBestLocationsForIndustry({
    provinceId: 'VN-SG',
    industryKey: 'TOC_NAM_BARBER',
    limit: 5
  });
  assert.ok(barberList.length === 5, 'Phải trả về 5 địa bàn cho tóc nam');
  assert.ok(barberList[0].score >= 80, 'Điểm phù hợp tóc nam >= 80%');
  assert.ok(barberList[0].reasons.some(r => r.includes('nam') || r.includes('cạnh tranh')), 'Phải có tiêu chí nam giới hoặc cạnh tranh');

  // 11.3 Ngành Nail & Móng (NAIL) tại TP.HCM -> Dân số nữ đông, thu nhập & tiêu dùng
  const nailList = industryEngine.findBestLocationsForIndustry({
    provinceId: 'VN-SG',
    industryKey: 'NAIL',
    limit: 5
  });
  assert.ok(nailList.length === 5, 'Phải trả về 5 địa bàn cho nail');
  assert.ok(nailList[0].reasons.some(r => r.includes('nữ') || r.includes('làm đẹp') || r.includes('cạnh tranh')), 'Phải có tiêu chí nữ giới');

  // 11.4 Ngành Showroom Ô tô (SHOWROOM_O_TO) tại TP.HCM -> Ưu tiên quận có thu nhập cao & trục lộ giao thông lớn
  const autoList = industryEngine.findBestLocationsForIndustry({
    provinceId: 'VN-SG',
    industryKey: 'SHOWROOM_O_TO',
    limit: 5
  });
  assert.ok(autoList.length === 5, 'Phải trả về 5 địa bàn cho showroom ô tô');
  const autoDistrictNames = autoList.map(l => l.districtName);
  assert.ok(autoDistrictNames.some(n => n.includes('Quận 7') || n.includes('Thủ Đức') || n.includes('Quận 1') || n.includes('Quận 12')), 'Showroom ô tô phải ưu tiên quận phát triển/đại lộ');
});

console.log(`\n========================================`);
console.log(`KẾT QUẢ KIỂM THỬ: ${passCount} / ${totalTests} BÀI KIỂM TRA ĐẠT TUYỆT ĐỐI!`);
console.log(`========================================\n`);

if (passCount !== totalTests) {
  process.exit(1);
}
