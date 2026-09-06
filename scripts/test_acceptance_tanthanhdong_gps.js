/**
 * KIỂM ĐỊNH CHẤP NHẬN: ĐỊNH VỊ GPS XÃ TÂN THẠNH ĐÔNG CỦ CHI, 21 XÃ/THỊ TRẤN, BỘ CHỌN 3 CẤP & MENU XỔ CÔNG CỤ
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');

// 1. Nạp dữ liệu và động cơ
const baseAppDir = path.join(__dirname, '..');
const kinhTeData = require(path.join(baseAppDir, 'js/kinh_te_64_tinh_thanh_data.js'));
const corpus = kinhTeData.KINH_TE_64_TINH_THANH_CORPUS;
const radiusEngine = require(path.join(baseAppDir, 'js/economic_radius_engine.js'));
const industryEngine = require(path.join(baseAppDir, 'js/industry_economic_engine.js'));

console.log('=== BẮT ĐẦU KIỂM ĐỊNH TÂN THẠNH ĐÔNG, 21 XÃ CỦ CHI & MENU XỔ CÔNG CỤ ===\n');

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
// NHÓM 1: ĐỊNH VỊ GPS XÃ TÂN THẠNH ĐÔNG & CỦ CHI (0% LỆCH BÌNH DƯƠNG)
// -------------------------------------------------------------
console.log('1. Kiểm thử định vị GPS thực tế Xã Tân Thạnh Đông, Huyện Củ Chi:');

it('Tọa độ Xã Tân Thạnh Đông (10.9575, 106.5746) phải nhận diện chính xác Xã Tân Thạnh Đông, Huyện Củ Chi, TP.HCM (0% Bình Dương)', () => {
  const res = radiusEngine.calculateRadiusMarket({
    lat: 10.9575,
    lng: 106.5746,
    radiusMeters: 1000
  });

  assert.strictEqual(res.location.provinceId, 'SG_PRE2008', 'Phải là TP. Hồ Chí Minh');
  assert.strictEqual(res.location.provinceName, 'TP. Hồ Chí Minh');
  assert.strictEqual(res.location.districtId, 'SG-CC', 'Phải là Huyện Củ Chi');
  assert.strictEqual(res.location.communeId, 'SG-CC-TTD', 'Phải là Xã Tân Thạnh Đông');
  assert.strictEqual(res.location.communeName, 'Xã Tân Thạnh Đông');
  assert.strictEqual(res.commune.name, 'Xã Tân Thạnh Đông');
  assert.ok(res.location.distanceToCommuneCenterKm < 0.1, 'Khoảng cách tới tâm Tân Thạnh Đông phải gần 0km');
});

it('Tọa độ các xã ven sông Sài Gòn của Củ Chi đều nhận diện đúng TP.HCM & Củ Chi', () => {
  // Xã Bình Mỹ
  const bm = radiusEngine.calculateRadiusMarket({ lat: 10.9250, lng: 106.6350, radiusMeters: 1000 });
  assert.strictEqual(bm.location.provinceId, 'SG_PRE2008');
  assert.strictEqual(bm.location.districtId, 'SG-CC');
  assert.strictEqual(bm.location.communeId, 'SG-CC-BM');
  assert.strictEqual(bm.location.communeName, 'Xã Bình Mỹ');

  // Xã Hòa Phú (giáp KCN Đông Nam)
  const hp = radiusEngine.calculateRadiusMarket({ lat: 11.0020, lng: 106.6120, radiusMeters: 1000 });
  assert.strictEqual(hp.location.provinceId, 'SG_PRE2008');
  assert.strictEqual(hp.location.districtId, 'SG-CC');
  assert.strictEqual(hp.location.communeId, 'SG-CC-HP');

  // Xã Tân Thạnh Tây (Ngã tư Tân Quy)
  const ttt = radiusEngine.calculateRadiusMarket({ lat: 10.9750, lng: 106.5500, radiusMeters: 1000 });
  assert.strictEqual(ttt.location.provinceId, 'SG_PRE2008');
  assert.strictEqual(ttt.location.districtId, 'SG-CC');
  assert.strictEqual(ttt.location.communeId, 'SG-CC-TTT');
});

it('Tọa độ bên kia sông Sài Gòn thuộc Bình Dương vẫn nhận diện chuẩn xác Bình Dương', () => {
  // TP. Thủ Dầu Một
  const tdm = radiusEngine.calculateRadiusMarket({ lat: 10.9805, lng: 106.6520, radiusMeters: 1000 });
  assert.strictEqual(tdm.location.provinceId, 'BDU_PRE2008', 'Phải là Bình Dương');
  assert.strictEqual(tdm.location.districtId, 'BDU_PRE2008-D1', 'Phải là Thủ Dầu Một');

  // TP. Thuận An
  const ta = radiusEngine.calculateRadiusMarket({ lat: 10.9200, lng: 106.7000, radiusMeters: 1000 });
  assert.strictEqual(ta.location.provinceId, 'BDU_PRE2008', 'Phải là Bình Dương');
  assert.strictEqual(ta.location.districtId, 'BDU_PRE2008-D2', 'Phải là Thuận An');
});

// -------------------------------------------------------------
// NHÓM 2: DANH MỤC 21 XÃ/THỊ TRẤN THỰC TẾ HUYỆN CỦ CHI
// -------------------------------------------------------------
console.log('\n2. Kiểm thử danh mục đầy đủ 21 đơn vị hành chính cấp xã của Huyện Củ Chi:');

it('Huyện Củ Chi có đủ đúng 21 xã/thị trấn thực tế với tọa độ và đặc trưng địa phương', () => {
  const hcm = corpus.find(p => p.historical_id === 'SG_PRE2008');
  const cuchi = hcm.key_districts_sae.find(d => d.id === 'SG-CC');
  assert.ok(cuchi, 'Phải có Huyện Củ Chi');
  assert.ok(Array.isArray(cuchi.communes), 'Củ Chi phải có mảng communes');
  assert.strictEqual(cuchi.communes.length, 21, 'Củ Chi phải có đúng 21 xã/thị trấn');

  const names = cuchi.communes.map(c => c.name);
  assert.ok(names.includes('Thị trấn Củ Chi'), 'Có Thị trấn Củ Chi');
  assert.ok(names.includes('Xã Tân Thạnh Đông'), 'Có Xã Tân Thạnh Đông');
  assert.ok(names.includes('Xã Tân Thạnh Tây'), 'Có Xã Tân Thạnh Tây');
  assert.ok(names.includes('Xã Bình Mỹ'), 'Có Xã Bình Mỹ');
  assert.ok(names.includes('Xã Hòa Phú'), 'Có Xã Hòa Phú');
  assert.ok(names.includes('Xã Tân Phú Trung'), 'Có Xã Tân Phú Trung');
  assert.ok(names.includes('Xã Phú Mỹ Hưng'), 'Có Xã Phú Mỹ Hưng');

  // Kiểm tra 100% xã có lat, lng hợp lệ
  cuchi.communes.forEach(c => {
    assert.ok(typeof c.lat === 'number' && c.lat > 10.8 && c.lat < 11.3, `Vĩ độ ${c.name} phải hợp lệ`);
    assert.ok(typeof c.lng === 'number' && c.lng > 106.3 && c.lng < 106.7, `Kinh độ ${c.name} phải hợp lệ`);
    assert.ok(c.features && c.features.length > 5, `Xã ${c.name} phải có đặc trưng thực địa`);
  });
});

// -------------------------------------------------------------
// NHÓM 3: GIAO DIỆN LA KINH MAP & 3 CẤP ĐỊA PHƯƠNG
// -------------------------------------------------------------
console.log('\n3. Kiểm thử Modal La Kinh Bản Đồ & bộ chọn 3 cấp:');

it('File luopan_map_tool.js tích hợp đủ 3 dropdown: Tỉnh, Huyện, Xã', () => {
  const luopanCode = fs.readFileSync(path.join(baseAppDir, 'js/luopan_map_tool.js'), 'utf8');
  assert.ok(luopanCode.includes('dt-econ-province-select'), 'Có dropdown Tỉnh/Thành dt-econ-province-select');
  assert.ok(luopanCode.includes('dt-econ-district-select'), 'Có dropdown Quận/Huyện dt-econ-district-select');
  assert.ok(luopanCode.includes('dt-econ-commune-select'), 'Có dropdown Xã/Phường dt-econ-commune-select');
  assert.ok(luopanCode.includes('flyToCommune'), 'Có chức năng bay bản đồ về xã khi người dùng chọn');
});

// -------------------------------------------------------------
// NHÓM 4: MENU XỔ / RÚT GỌN CÔNG CỤ & ĐIỀU HƯỚNG MOBILE
// -------------------------------------------------------------
console.log('\n4. Kiểm thử Menu Xổ/Rút Gọn Công Cụ & Thanh Điều Hướng Đáy:');

it('File tool_ui.js chứa menu xổ/rút gọn với các hàm toggleToolsMenu, revealToolSelector, selectToolTab', () => {
  const toolCode = fs.readFileSync(path.join(baseAppDir, 'js/tool_ui.js'), 'utf8');
  assert.ok(toolCode.includes('toggleToolsMenu'), 'Có hàm toggleToolsMenu');
  assert.ok(toolCode.includes('revealToolSelector'), 'Có hàm revealToolSelector');
  assert.ok(toolCode.includes('selectToolTab'), 'Có hàm selectToolTab');
  assert.ok(toolCode.includes('tool-dropdown-menu'), 'Có container tool-dropdown-menu');
  assert.ok(toolCode.includes('kinhte-select-commune'), 'Có bộ chọn xã kinhte-select-commune trong Tab Kinh Tế 64');
  assert.ok(toolCode.includes('onDistrictChange'), 'Có hàm onDistrictChange cập nhật xã khi đổi huyện');
});

it('File index.html & router.js hỗ trợ bấm nút Công Cụ tự nhả menu chọn công cụ ở đầu trang', () => {
  const indexHtml = fs.readFileSync(path.join(baseAppDir, 'index.html'), 'utf8');
  const routerCode = fs.readFileSync(path.join(baseAppDir, 'js/router.js'), 'utf8');
  assert.ok(indexHtml.includes('id="mobile-btn-tools"'), 'index.html có id mobile-btn-tools');
  assert.ok(routerCode.includes('revealToolSelector'), 'router.js gọi revealToolSelector khi bấm nút Công Cụ');
  assert.ok(routerCode.includes('behavior: \'smooth\''), 'router.js cuộn mượt lên đầu trang khi bấm Công Cụ');
});

// -------------------------------------------------------------
// TỔNG KẾT
// -------------------------------------------------------------
console.log(`\n========================================`);
console.log(`KẾT QUẢ KIỂM THỬ: ${passedTests} / ${totalTests} TESTS PASS XUẤT SẮC!`);
console.log(`========================================\n`);
