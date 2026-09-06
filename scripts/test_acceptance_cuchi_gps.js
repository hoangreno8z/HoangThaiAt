/**
 * KIỂM ĐỊNH CHẤP NHẬN: TỌA ĐỘ GPS CỦ CHI, 64 TỈNH THÀNH ĐỦ HUYỆN THẬT, NHÂN KHẨU HỌC & CỤM ĐỐI THỦ
 */

const assert = require('assert');
const path = require('path');

// Nạp dữ liệu và engine
const kinhTeData = require('../js/kinh_te_64_tinh_thanh_data.js');
const corpus = kinhTeData.KINH_TE_64_TINH_THANH_CORPUS;
const radiusEngine = require('../js/economic_radius_engine.js');
const industryEngine = require('../js/industry_economic_engine.js');

console.log('=== BẮT ĐẦU BỘ TEST ACCEPTANCE GPS CỦ CHI & 64 TỈNH THÀNH ===\n');

let passedTests = 0;
let totalTests = 0;

function it(desc, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ PASS: ${desc}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${desc}`);
    console.error(`    ${err.message}`);
    process.exitCode = 1;
  }
}

// -------------------------------------------------------------
// NHÓM 1: ĐỊNH VỊ GPS VÀ TÌM QUẬN/HUYỆN TẠI CỦ CHI VÀ TP.HCM
// -------------------------------------------------------------
console.log('1. Kiểm thử định vị GPS Huyện Củ Chi & TP.HCM:');

it('Tọa độ trung tâm Huyện Củ Chi (10.9722, 106.4938) phải nhận diện chính xác Huyện Củ Chi (SG-CC), KHÔNG được là Quận 1', () => {
  const res = radiusEngine.calculateRadiusMarket({
    lat: 10.9722,
    lng: 106.4938,
    radiusMeters: 1000
  });

  assert.strictEqual(res.location.provinceId, 'SG_PRE2008', 'Phải là TP. Hồ Chí Minh');
  assert.strictEqual(res.location.districtId, 'SG-CC', 'Phải là Huyện Củ Chi SG-CC');
  assert.strictEqual(res.location.districtName, 'Huyện Củ Chi', 'Tên phải là Huyện Củ Chi');
  assert.strictEqual(res.district.id, 'SG-CC');
  assert.ok(res.location.distanceToDistrictCenterKm < 0.5, 'Khoảng cách tới tâm Củ Chi phải < 0.5km');

  // Kiểm tra chỉ số kinh tế Củ Chi
  assert.strictEqual(res.district.density, 1100, 'Mật độ Củ Chi là 1100');
  assert.strictEqual(res.district.income, 6.45, 'Thu nhập Củ Chi là 6.45tr');
  assert.strictEqual(res.district.expense, 4.35, 'Chi tiêu Củ Chi là 4.35tr');
  assert.strictEqual(res.district.rppi, 83, 'RPPI Củ Chi là 83');
});

it('Tọa độ các bán kính 500m, 1000m, 3000m tại Củ Chi đều giữ vững Huyện Củ Chi và tính đúng diện tích', () => {
  [500, 1000, 3000].forEach(r => {
    const res = radiusEngine.calculateRadiusMarket({
      lat: 10.9722,
      lng: 106.4938,
      radiusMeters: r
    });
    assert.strictEqual(res.location.districtId, 'SG-CC', `Bán kính ${r}m phải giữ Huyện Củ Chi`);
    assert.strictEqual(res.radius.meters, r);
    assert.ok(res.demographics.estimatedPopulation > 0);
    assert.ok(res.financials.totalMonthlySpendingBillionVnd > 0);
  });
});

it('Tọa độ Hóc Môn (10.88, 106.59) nhận diện đúng Huyện Hóc Môn', () => {
  const res = radiusEngine.calculateRadiusMarket({ lat: 10.88, lng: 106.59, radiusMeters: 1000 });
  assert.strictEqual(res.district.name, 'Huyện Hóc Môn');
});

it('Tọa độ Bình Chánh (10.68, 106.59) nhận diện đúng Huyện Bình Chánh', () => {
  const res = radiusEngine.calculateRadiusMarket({ lat: 10.68, lng: 106.59, radiusMeters: 1000 });
  assert.strictEqual(res.district.name, 'Huyện Bình Chánh');
});

it('Tọa độ Cần Giờ (10.41, 106.96) nhận diện đúng Huyện Cần Giờ', () => {
  const res = radiusEngine.calculateRadiusMarket({ lat: 10.41, lng: 106.96, radiusMeters: 1000 });
  assert.strictEqual(res.district.name, 'Huyện Cần Giờ');
});

it('Tọa độ Quận 1 (10.7769, 106.7009) nhận diện đúng Quận 1', () => {
  const res = radiusEngine.calculateRadiusMarket({ lat: 10.7769, lng: 106.7009, radiusMeters: 1000 });
  assert.strictEqual(res.district.name, 'Quận 1');
});

it('Tọa độ Quận Ba Đình Hà Nội (21.034, 105.834) nhận diện đúng Quận Ba Đình', () => {
  const res = radiusEngine.calculateRadiusMarket({ lat: 21.034, lng: 105.834, radiusMeters: 1000 });
  assert.strictEqual(res.district.name, 'Quận Ba Đình');
});

it('Tọa độ Huyện Ba Vì Hà Tây (21.23, 105.37) nhận diện đúng Huyện Ba Vì', () => {
  const res = radiusEngine.calculateRadiusMarket({ lat: 21.23, lng: 105.37, radiusMeters: 1000 });
  assert.strictEqual(res.district.name, 'Huyện Ba Vì');
});

// -------------------------------------------------------------
// NHÓM 2: NHÂN KHẨU HỌC & CỤM ĐỐI THỦ THƯƠNG MẠI
// -------------------------------------------------------------
console.log('\n2. Kiểm thử Nhân Khẩu Học (Nam/Nữ, Tháp Tuổi) & Cụm Đối Thủ:');

it('Củ Chi trả về đầy đủ cơ cấu giới tính và tháp tuổi 4 nhóm', () => {
  const res = radiusEngine.calculateRadiusMarket({ lat: 10.9722, lng: 106.4938, radiusMeters: 1000 });
  const demo = res.demographics;

  assert.ok(demo.genderBreakdown, 'Phải có genderBreakdown');
  assert.strictEqual(demo.genderBreakdown.malePct, 49.2);
  assert.strictEqual(demo.genderBreakdown.femalePct, 50.8);
  assert.ok(demo.genderBreakdown.estimatedMale > 0);
  assert.ok(demo.genderBreakdown.estimatedFemale > 0);

  assert.ok(demo.ageCohorts, 'Phải có ageCohorts');
  assert.strictEqual(demo.ageCohorts.children.pct, 19.4);
  assert.strictEqual(demo.ageCohorts.youth.pct, 15.2);
  assert.strictEqual(demo.ageCohorts.prime.pct, 43.8);
  assert.strictEqual(demo.ageCohorts.senior.pct, 21.6);
  assert.ok(demo.ageCohorts.prime.count > 0);
});

it('Củ Chi trả về danh sách tuyến đường và cụm đối thủ thương mại', () => {
  const res = radiusEngine.calculateRadiusMarket({ lat: 10.9722, lng: 106.4938, radiusMeters: 1000 });
  const hot = res.commercialHotspots;

  assert.ok(hot, 'Phải có commercialHotspots');
  assert.ok(Array.isArray(hot.primaryStreets) && hot.primaryStreets.length >= 3, 'Tuyến đường chính >= 3');
  assert.ok(hot.primaryStreets.some(s => s.includes('22') || s.includes('Tỉnh lộ 8')), 'Chứa QL22 hoặc TL8');
  assert.ok(Array.isArray(hot.highDensityClusters) && hot.highDensityClusters.length >= 2, 'Cụm đông đúc >= 2');
  assert.ok(Array.isArray(hot.lowDensityOpportunities) && hot.lowDensityOpportunities.length >= 2, 'Cụm cơ hội >= 2');
});

it('Phân tích ngành Cafe và Nail tại Củ Chi tính chuẩn khách hàng mục tiêu theo nhân khẩu học địa phương', () => {
  const cafe = industryEngine.calculateIndustryMarket({
    lat: 10.9722,
    lng: 106.4938,
    radiusMeters: 1000,
    industryKey: 'CAFE'
  });
  assert.strictEqual(cafe.location.districtName, 'Huyện Củ Chi');
  assert.ok(cafe.demographics.targetCustomerCount > 1000, 'Khách cafe Củ Chi phải > 1000');
  assert.ok(cafe.competition.estimatedCompetitors > 0, 'Phải có đối thủ cafe');
  assert.ok(cafe.clusterIntelligence.crowdedSummary.includes('Cụm tập trung'));
  assert.ok(cafe.clusterIntelligence.opportunitySummary.includes('Vùng trũng'));

  const nail = industryEngine.calculateIndustryMarket({
    lat: 10.9722,
    lng: 106.4938,
    radiusMeters: 1000,
    industryKey: 'NAIL'
  });
  assert.strictEqual(nail.location.districtName, 'Huyện Củ Chi');
  assert.ok(nail.demographics.targetRatioPct >= 25 && nail.demographics.targetRatioPct <= 45);
  assert.ok(nail.demographics.targetCustomerCount > 500);
});

// -------------------------------------------------------------
// NHÓM 3: TOÀN DIỆN 64 TỈNH THÀNH KHÔNG ĐƯỢC THIẾU HUYỆN THỰC
// -------------------------------------------------------------
console.log('\n3. Kiểm thử toàn bộ 64 tỉnh thành trên cả nước:');

it('Toàn bộ 64 đơn vị địa lý lịch sử đều có trong kho dữ liệu', () => {
  assert.strictEqual(corpus.length, 64, 'Phải đủ 64 tỉnh thành');
});

it('Tổng số quận/huyện thực tế toàn quốc vượt trên 350 đơn vị (đầy đủ mọi tỉnh)', () => {
  let totalDistricts = 0;
  corpus.forEach(p => {
    assert.ok(Array.isArray(p.key_districts_sae), `${p.province_name} phải có key_districts_sae`);
    assert.ok(p.key_districts_sae.length >= 3, `${p.province_name} phải có ít nhất 3 quận/huyện`);
    totalDistricts += p.key_districts_sae.length;
  });
  console.log(`    (Tổng số quận/huyện thực tế đã tích hợp: ${totalDistricts} đơn vị)`);
  assert.ok(totalDistricts >= 350, `Phải có ít nhất 350 huyện (thực tế: ${totalDistricts})`);
});

it('TP. Hồ Chí Minh (SG_PRE2008) có đủ 22 quận/huyện/thành phố thực tế', () => {
  const hcm = corpus.find(p => p.historical_id === 'SG_PRE2008');
  assert.ok(hcm, 'Tìm thấy SG_PRE2008');
  assert.strictEqual(hcm.key_districts_sae.length, 22, 'TP.HCM phải có 22 quận huyện');

  const names = hcm.key_districts_sae.map(d => d.name);
  assert.ok(names.includes('Huyện Củ Chi'), 'Phải có Huyện Củ Chi');
  assert.ok(names.includes('Huyện Hóc Môn'), 'Phải có Huyện Hóc Môn');
  assert.ok(names.includes('Huyện Bình Chánh'), 'Phải có Huyện Bình Chánh');
  assert.ok(names.includes('Huyện Nhà Bè'), 'Phải có Huyện Nhà Bè');
  assert.ok(names.includes('Huyện Cần Giờ'), 'Phải có Huyện Cần Giờ');
  assert.ok(names.includes('Thành phố Thủ Đức'), 'Phải có TP. Thủ Đức');
  assert.ok(names.includes('Quận 1'), 'Phải có Quận 1');
  assert.ok(names.includes('Quận 12'), 'Phải có Quận 12');
  assert.ok(names.includes('Quận Gò Vấp'), 'Phải có Quận Gò Vấp');
  assert.ok(names.includes('Quận Bình Tân'), 'Phải có Quận Bình Tân');
});

it('Hà Nội (HN_PRE2008) có đủ 16 quận/huyện thực tế', () => {
  const hn = corpus.find(p => p.historical_id === 'HN_PRE2008');
  assert.ok(hn);
  assert.strictEqual(hn.key_districts_sae.length, 16);
  const names = hn.key_districts_sae.map(d => d.name);
  assert.ok(names.includes('Quận Hoàn Kiếm'));
  assert.ok(names.includes('Huyện Đông Anh'));
  assert.ok(names.includes('Huyện Sóc Sơn'));
  assert.ok(names.includes('Huyện Gia Lâm'));
});

it('Hà Tây (HT_PRE2008) có đủ 14 huyện/thị xã thực tế', () => {
  const ht = corpus.find(p => p.historical_id === 'HT_PRE2008');
  assert.ok(ht);
  assert.strictEqual(ht.key_districts_sae.length, 14);
  const names = ht.key_districts_sae.map(d => d.name);
  assert.ok(names.includes('Thành phố Hà Đông'));
  assert.ok(names.includes('Thị xã Sơn Tây'));
  assert.ok(names.includes('Huyện Ba Vì'));
  assert.ok(names.includes('Huyện Chương Mỹ'));
  assert.ok(names.includes('Huyện Thạch Thất'));
});

it('100% quận/huyện trên toàn quốc đều có tên THẬT (KHÔNG còn bất kỳ placeholder Huyện trọng điểm nào)', () => {
  corpus.forEach(p => {
    p.key_districts_sae.forEach(d => {
      assert.ok(!d.name.includes('trọng điểm'), `Huyện ${d.name} tại ${p.province_name} chứa chữ trọng điểm`);
      assert.ok(!d.name.match(/^Huyện\s+\d+$/), `Huyện ${d.name} tại ${p.province_name} là placeholder số`);
      assert.ok(typeof d.lat === 'number' && d.lat > 8.0 && d.lat < 24.0, `${d.name} tọa độ lat hợp lệ`);
      assert.ok(typeof d.lng === 'number' && d.lng > 102.0 && d.lng < 110.0, `${d.name} tọa độ lng hợp lệ`);
      assert.ok(d.gender && typeof d.gender.male_pct === 'number', `${d.name} có male_pct`);
      assert.ok(d.age_cohorts && typeof d.age_cohorts.prime_25_49 === 'number', `${d.name} có prime_25_49`);
      assert.ok(Array.isArray(d.primary_streets) && d.primary_streets.length > 0, `${d.name} có primary_streets`);
    });
  });
});

console.log(`\n=== KẾT QUẢ KIỂM THỬ: ${passedTests}/${totalTests} TESTS PASSED ===\n`);
if (passedTests === totalTests) {
  console.log('🎉 100% ACCEPTANCE TESTS ĐÃ VƯỢT QUA XUẤT SẮC!');
} else {
  console.error('⚠️ Có lỗi kiểm thử!');
  process.exit(1);
}
