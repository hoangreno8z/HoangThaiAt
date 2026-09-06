/**
 * KIỂM ĐỊNH TÍNH CÁCH LY ĐỊA LÝ TOÀN QUỐC & CHÍNH XÁC CẤP XÃ/PHƯỜNG
 * (NATIONWIDE GEOGRAPHIC ISOLATION & COMMUNE INTEGRITY TESTS)
 */

const assert = require('assert');
const radiusEngine = require('../js/economic_radius_engine.js');
const industryEngine = require('../js/industry_economic_engine.js');
const fs = require('fs');
const path = require('path');

console.log('=== BẮT ĐẦU KIỂM THỬ CÁCH LY ĐỊA LÝ TOÀN QUỐC & CẤP XÃ/PHƯỜNG ===\n');

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

// 1. Kiểm thử chính xác tình huống lỗi người dùng phản ánh: Tân Thạnh Đông, Củ Chi, TP.HCM & Bakery Bánh Mì
runTest('Khảo sát Bakery (BAKERY_PASTRY) tại Xã Tân Thạnh Đông, Huyện Củ Chi, TP.HCM: Bắt buộc ra đúng Tân Thạnh Đông, KHÔNG được là Phú Mỹ Hưng, KHÔNG được là Hà Nội', () => {
  // Test cả 2 mã định danh: SG_PRE2008 và VN-SG
  ['SG_PRE2008', 'VN-SG'].forEach(provId => {
    const res = industryEngine.calculateIndustryMarket({
      provinceId: provId,
      districtId: 'SG-CC',
      communeId: 'SG-CC-TTD',
      radiusMeters: 3000,
      industryKey: 'BAKERY_PASTRY'
    });

    assert.ok(res, `Kết quả phải tồn tại với mã ${provId}`);
    assert.strictEqual(res.location.provinceName, 'TP. Hồ Chí Minh', 'Tỉnh/thành phải là TP. Hồ Chí Minh');
    assert.strictEqual(res.location.districtName, 'Huyện Củ Chi', 'Quận/huyện phải là Huyện Củ Chi');
    assert.strictEqual(res.location.communeName, 'Xã Tân Thạnh Đông', 'Xã phải là Xã Tân Thạnh Đông');
    assert.notStrictEqual(res.location.communeName, 'Xã Phú Mỹ Hưng', 'Tuyệt đối KHÔNG được là Xã Phú Mỹ Hưng');
    assert.notStrictEqual(res.location.provinceName, 'Hà Nội', 'Tuyệt đối KHÔNG được là Hà Nội');
    assert.strictEqual(res.location.radiusMeters, 3000, 'Bán kính khảo sát đúng 3000m');

    // Tọa độ phải nằm tại Tân Thạnh Đông (vĩ độ ~10.9575, kinh độ ~106.5746)
    assert.ok(res.location.userCoords.lat >= 10.9 && res.location.userCoords.lat <= 11.0, 'Vĩ độ phải thuộc Tân Thạnh Đông (~10.95)');
    assert.ok(res.location.userCoords.lng >= 106.5 && res.location.userCoords.lng <= 106.6, 'Kinh độ phải thuộc Tân Thạnh Đông (~106.57)');
  });
});

// 2. Kiểm thử khi không chọn xã (khảo sát toàn huyện Củ Chi): Không được tự ý gán Phú Mỹ Hưng bằng tọa độ Hà Nội
runTest('Khảo sát toàn huyện Củ Chi (không chọn xã): communeName phải là null, tọa độ tại trung tâm Củ Chi, KHÔNG bị gán Phú Mỹ Hưng', () => {
  const res = industryEngine.calculateIndustryMarket({
    provinceId: 'SG_PRE2008',
    districtId: 'SG-CC',
    radiusMeters: 3000,
    industryKey: 'BAKERY_PASTRY'
  });

  assert.ok(res);
  assert.strictEqual(res.location.provinceName, 'TP. Hồ Chí Minh');
  assert.strictEqual(res.location.districtName, 'Huyện Củ Chi');
  assert.strictEqual(res.location.communeName, null, 'Khi không chọn xã thì communeName phải là null (toàn huyện)');
  assert.notStrictEqual(res.location.communeName, 'Xã Phú Mỹ Hưng');
  // Tọa độ phải tại trung tâm Củ Chi (10.9722, 106.4938), KHÔNG phải Hà Nội
  assert.ok(res.location.userCoords.lat >= 10.9 && res.location.userCoords.lat <= 11.0);
  assert.ok(res.location.userCoords.lng >= 106.4 && res.location.userCoords.lng <= 106.6);
});

// 3. Kiểm thử cách ly địa lý Miền Nam vs Miền Bắc: Khảo sát tỉnh miền Nam tuyệt đối KHÔNG bao giờ rơi vào miền Bắc
runTest('Cách ly địa lý Miền Nam: TP.HCM, Cần Thơ, Bình Dương không bao giờ bị rò rỉ dữ liệu ra Hà Nội/Miền Bắc', () => {
  const southernProvinces = [
    { id: 'VN-SG', expectedName: 'TP. Hồ Chí Minh', expectedDist: 'Quận 1', distId: 'SG-Q1' },
    { id: 'VN-CT', expectedName: 'Cần Thơ', expectedDist: 'Quận Ninh Kiều', distId: 'CT-NK' },
    { id: 'VN-BDU', expectedName: 'Bình Dương', expectedDist: 'Thành phố Thủ Dầu Một', distId: 'BD-TDM' }
  ];

  southernProvinces.forEach(testCase => {
    const res = radiusEngine.calculateRadiusMarket({
      provinceId: testCase.id,
      districtId: testCase.distId,
      radiusMeters: 1000
    });

    assert.ok(res);
    assert.strictEqual(res.location.provinceName, testCase.expectedName);
    assert.strictEqual(res.location.districtName, testCase.expectedDist);
    assert.notStrictEqual(res.location.provinceName, 'Hà Nội', `Tỉnh ${testCase.id} không được ra Hà Nội`);
    assert.notStrictEqual(res.location.region, 'Đồng bằng sông Hồng', `Tỉnh ${testCase.id} không được có vùng ĐBSH`);
    // Vĩ độ miền Nam phải < 12.0
    assert.ok(res.location.userCoords.lat < 12.0, `Vĩ độ của ${testCase.expectedName} phải là miền Nam (< 12.0), hiện tại: ${res.location.userCoords.lat}`);
  });
});

// 4. Kiểm thử cách ly địa lý Miền Trung & Miền Bắc: Đà Nẵng, Hà Nội, Hải Phòng
runTest('Cách ly địa lý Miền Trung & Miền Bắc: Đà Nẵng, Hà Nội, Hải Phòng giữ đúng địa bàn', () => {
  const centralAndNorthern = [
    { id: 'VN-DN', expectedName: 'Đà Nẵng', distId: 'DN-HC', expectedDist: 'Quận Hải Châu' },
    { id: 'VN-HN', expectedName: 'Hà Nội', distId: 'HN-HK', expectedDist: 'Quận Hoàn Kiếm' },
    { id: 'VN-HP', expectedName: 'Hải Phòng', distId: 'HP-HB', expectedDist: 'Quận Hồng Bàng' }
  ];

  centralAndNorthern.forEach(testCase => {
    const res = radiusEngine.calculateRadiusMarket({
      provinceId: testCase.id,
      districtId: testCase.distId,
      radiusMeters: 1000
    });

    assert.ok(res);
    assert.strictEqual(res.location.provinceName, testCase.expectedName);
    assert.strictEqual(res.location.districtName, testCase.expectedDist);
  });
});

// 5. Kiểm thử định vị GPS thực tế cấp Xã/Phường trên cả nước
runTest('Định vị GPS thực tế cấp Xã: Tọa độ Xã Tân Thạnh Đông (10.9575, 106.5746) nhận diện chính xác Tân Thạnh Đông', () => {
  const res = radiusEngine.calculateRadiusMarket({
    lat: 10.9575,
    lng: 106.5746,
    radiusMeters: 1000
  });

  assert.ok(res);
  assert.strictEqual(res.location.provinceName, 'TP. Hồ Chí Minh');
  assert.strictEqual(res.location.districtName, 'Huyện Củ Chi');
  assert.strictEqual(res.location.communeName, 'Xã Tân Thạnh Đông');
});

// 6. Kiểm thử tính toàn vẹn và đồng bộ tham số trong ToolUI (js/tool_ui.js)
runTest('Kiểm tra ToolUI: forward đầy đủ communeId vào calculateCustomIndustry và selectIndustryAndCalculate', () => {
  const toolUiCode = fs.readFileSync(path.join(__dirname, '../js/tool_ui.js'), 'utf8');

  // calculateCustomRadius phải chuyển communeId vào calculateCustomIndustry
  assert.ok(toolUiCode.includes('this.calculateCustomIndustry(provinceId, districtId, radiusMeters, this._currentIndustryKey || \'CAFE\', communeId);'),
    'calculateCustomRadius phải truyền communeId vào calculateCustomIndustry');

  // selectIndustryAndCalculate phải đọc kinhte-select-commune và truyền communeId
  assert.ok(toolUiCode.includes('this.calculateCustomIndustry(provinceId, districtId, radiusMeters, industryKey, communeId);'),
    'selectIndustryAndCalculate phải truyền communeId');

  // calculateCustomIndustry phải có fallback đọc #kinhte-select-commune nếu thiếu
  assert.ok(toolUiCode.includes('const comSelect = document.getElementById(\'kinhte-select-commune\');'),
    'calculateCustomIndustry phải có cơ chế đọc an toàn kinhte-select-commune');
});

console.log(`\n========================================`);
console.log(`KẾT QUẢ KIỂM THỬ: ${passCount} / ${totalTests} BÀI KIỂM TRA ĐẠT TUYỆT ĐỐI!`);
console.log(`========================================\n`);

if (passCount !== totalTests) {
  process.exit(1);
}
