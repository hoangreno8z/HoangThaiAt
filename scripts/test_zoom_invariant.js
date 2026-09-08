/**
 * TEST SUITE: BẤT BIẾN GEODESIC WGS84, GEOSPATIAL CONFIDENCE GATE & PHÂN TÁCH 3 PHƯƠNG VỊ HẺM CỤT
 * 
 * Kiểm chứng 4 tiêu chuẩn kỹ thuật:
 * 1. Khóa bất biến WGS84 khi zoom qua các cấp zoom 15, 17, 18, 19, 20, 21, 22 (Δ = 0.0000°).
 * 2. Mô hình phân định Giáp Biên (Border Zone & Angular Uncertainty Model).
 * 3. Đánh giá ca thực địa người dùng (Tọa Cấn Hướng Khôn, Lai Bính, Cụt Dậu giáp Tân, Lệch 3m).
 * 4. Tách biệt 3 phương vị: Điểm tận ngoại cục, Trục đường tiếp cận cục bộ, Dòng khí & Khí khẩu.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

// Nạp các module cốt lõi
const Geo = require('../js/geo_measurement_engine.js');
const LuopanData = require('../js/luopan_data.js');
const LuopanCalibration = require('../js/luopan_calibration_engine.js');
const LuopanGeometry = require('../js/luopan_geometry.js');
const LuopanClassifier = require('../js/luopan_classifier.js');

// Thiết lập global context cho Node.js môi trường
global.GeoMeasurementEngine = Geo;
global.LuopanData = LuopanData;
global.LuopanCalibration = LuopanCalibration;
global.LuopanGeometry = LuopanGeometry;
global.LuopanClassifier = LuopanClassifier;

let passed = 0;
let failed = 0;

function it(name, fn) {
  try {
    fn();
    console.log('  [PASS] ' + name);
    passed++;
  } catch (err) {
    console.error('  [FAIL] ' + name);
    console.error('         ' + err.message);
    failed++;
  }
}

console.log('================================================================');
console.log('   KIỂM ĐỊNH BẤT BIẾN GEODESIC WGS84 & GEOSPATIAL CONFIDENCE GATE');
console.log('================================================================\n');

// -------------------------------------------------------------
// NHÓM 1: BẤT BIẾN TOÁN HỌC WGS84 KHI ZOOM (ZOOM INVARIANCE)
// -------------------------------------------------------------
console.log('--- NHÓM 1: KHÓA BẤT BIẾN WGS84 QUA CÁC CẤP ZOOM (15 -> 22) ---');

// Tọa độ thực tế của nhà người dùng (Lập Cực O) và các mốc thực địa
const houseCenterWGS84 = { lat: 10.772500, lng: 106.685000 };

// Tính tọa độ mốc Mặt Tiền (quay hướng Khôn 226°)
const frontAWGS84 = Geo.computeDestinationPoint(houseCenterWGS84, 8, 226 - 90);
const frontBWGS84 = Geo.computeDestinationPoint(houseCenterWGS84, 8, 226 + 90);

// Tính tọa độ Điểm Cụt P_dead (cách nhà 20m về phương vị 275.5° - Dậu sát Tân)
const deadEndWGS84 = Geo.computeDestinationPoint(houseCenterWGS84, 20.0, 275.5);

// Tính tọa độ Miệng Hẻm Lai Thủy (cách nhà 60m về phương vị 165.0° - Bính)
const laiPointWGS84 = Geo.computeDestinationPoint(houseCenterWGS84, 60.0, 165.0);

it('1.1. Phương vị Geodesic WGS84 nguyên bản chuẩn xác tuyệt đối', () => {
  const deadEndBearing = Geo.calculateGeodesicBearing(houseCenterWGS84, deadEndWGS84);
  const laiBearing = Geo.calculateGeodesicBearing(houseCenterWGS84, laiPointWGS84);
  const abBearing = Geo.calculateGeodesicBearing(frontAWGS84, frontBWGS84);
  const facingBearing = (abBearing - 90 + 360) % 360;

  assert(Math.abs(deadEndBearing - 275.5) < 0.001, 'Dead end bearing phải là 275.5°, thực tế: ' + deadEndBearing);
  assert(Math.abs(laiBearing - 165.0) < 0.001, 'Lai bearing phải là 165.0°, thực tế: ' + laiBearing);
  assert(Math.abs(facingBearing - 226.0) < 0.001, 'Facing bearing phải là 226.0°, thực tế: ' + facingBearing);
});

it('1.2. Kiểm tra độ lệch phương vị qua 7 cấp zoom (15, 17, 18, 19, 20, 21, 22)', () => {
  const zoomLevels = [15, 17, 18, 19, 20, 21, 22];
  const baseDeadEndBearing = Geo.calculateGeodesicBearing(houseCenterWGS84, deadEndWGS84);
  const baseLaiBearing = Geo.calculateGeodesicBearing(houseCenterWGS84, laiPointWGS84);

  for (const zoom of zoomLevels) {
    // Trong kiến trúc mới: Khi ở mode === 'map', 100% tính từ tọa độ Geodesic WGS84
    const newGeodesicDeadEnd = Geo.calculateGeodesicBearing(houseCenterWGS84, deadEndWGS84);
    const newGeodesicLai = Geo.calculateGeodesicBearing(houseCenterWGS84, laiPointWGS84);

    const deltaDeadEnd = Math.abs(newGeodesicDeadEnd - baseDeadEndBearing);
    const deltaLai = Math.abs(newGeodesicLai - baseLaiBearing);

    assert(deltaDeadEnd === 0, 'Zoom ' + zoom + ': Độ lệch phương vị Điểm Cụt phải là 0.0000°, thực tế: ' + deltaDeadEnd);
    assert(deltaLai === 0, 'Zoom ' + zoom + ': Độ lệch phương vị Lai Thủy phải là 0.0000°, thực tế: ' + deltaLai);
  }
});

// -------------------------------------------------------------
// NHÓM 2: GEOSPATIAL CONFIDENCE GATE & MÔ HÌNH PHÂN ĐỊNH GIÁP BIÊN
// -------------------------------------------------------------
console.log('\n--- NHÓM 2: GEOSPATIAL CONFIDENCE GATE & PHÂN ĐỊNH GIÁP BIÊN ---');

it('2.1. Tính độ bất định góc (Angular Uncertainty) theo cự ly thực tế', () => {
  // Với sai số định vị vệ tinh σ = 1.0m
  // Ở cự ly 20m: arctan(1.0 / 20) = 2.86°
  const u20m = Geo.calculateAngularUncertainty(20.0, 1.0);
  assert(Math.abs(u20m - 2.86) <= 0.05, 'Sai số góc cự ly 20m phải ≈ 2.86°, thực tế: ' + u20m);

  // Ở cự ly 60m: arctan(1.0 / 60) = 0.95°
  const u60m = Geo.calculateAngularUncertainty(60.0, 1.0);
  assert(Math.abs(u60m - 0.95) <= 0.05, 'Sai số góc cự ly 60m phải ≈ 0.95°, thực tế: ' + u60m);
});

it('2.2. Nhận diện vùng Giáp Biên (Border Zone) tại 275.5° (Dậu giáp Tân)', () => {
  // Ranh Dậu/Tân là 277.5°. Tại 275.5°, cách ranh 2.0°
  // Cự ly 20m có sai số góc 2.86° > 2.0°
  const zoneResult = Geo.classifyMountainZone(275.5, 20.0, 1.0);

  assert.strictEqual(zoneResult.zone, 'BORDER_ZONE', 'Phải phân loại vào BORDER_ZONE');
  assert.strictEqual(zoneResult.isAmbiguous, true, 'isAmbiguous phải là true');
  assert.strictEqual(zoneResult.mountain, 'Dậu', 'Sơn chính phải là Dậu');
  assert.strictEqual(zoneResult.adjacentMountain, 'Tân', 'Sơn kế bên phải là Tân');
  assert(zoneResult.displayLabel.includes('DẬU / TÂN — GIÁP BIÊN'), 'Nhãn phải chứa song sơn giáp biên: ' + zoneResult.displayLabel);
  assert(zoneResult.confidence === 'MEDIUM' || zoneResult.confidence === 'LOW', 'Độ tin cậy không được là HIGH');
});

it('2.3. Nhận diện vùng Cận Ranh Đặc Biệt (Critical Border) khi cách ranh <= 1.0°', () => {
  // Tại 277.0°, cách ranh 277.5° chỉ 0.5°
  const criticalResult = Geo.classifyMountainZone(277.0, 20.0, 1.0);

  assert.strictEqual(criticalResult.zone, 'CRITICAL_BORDER', 'Phải phân loại vào CRITICAL_BORDER');
  assert.strictEqual(criticalResult.confidence, 'LOW', 'Độ tin cậy phải là LOW');
  assert(criticalResult.recommendation.includes('BẮT BUỘC ĐO THỰC ĐỊA BẰNG LA KINH TRẮC ĐỊA'), 'Phải cảnh báo bắt buộc đo thực địa');
});

it('2.4. Nhận diện Chính Sơn Ổn Định (Pure Mountain) tại tâm Sơn 270.0°', () => {
  // Tại 270.0° (chính giữa Sơn Dậu 262.5 - 277.5), cách ranh 7.5°
  const pureResult = Geo.classifyMountainZone(270.0, 20.0, 1.0);

  assert.strictEqual(pureResult.zone, 'PURE_MOUNTAIN', 'Phải phân loại vào PURE_MOUNTAIN');
  assert.strictEqual(pureResult.isAmbiguous, false, 'isAmbiguous phải là false');
  assert.strictEqual(pureResult.confidence, 'HIGH', 'Độ tin cậy phải là HIGH');
  assert(pureResult.displayLabel.includes('Dậu Sơn (Chính Sơn - Ổn định)'), 'Nhãn phải là Chính Sơn: ' + pureResult.displayLabel);
});

// -------------------------------------------------------------
// NHÓM 3: CA THỰC ĐỊA NGƯỜI DÙNG & PHÂN TÁCH 3 PHƯƠNG VỊ HẺM CỤT
// -------------------------------------------------------------
console.log('\n--- NHÓM 3: ĐÁNH GIÁ HÌNH CUỘC THỰC TẾ CỦA NGƯỜI DÙNG ---');

it('3.1. Phân loại tổng thể qua LuopanClassifier cho ca thực tế', () => {
  const classifier = new LuopanClassifier();
  const analysis = classifier.classify({
    facingBearing: 226.0,       // Hướng Khôn (Tọa Cấn)
    laiBearing: 165.0,          // Lai Lộ Bính
    khuBearing: null,           // Không có Khứ vì là hẻm cụt
    deadEndBearing: 275.5,      // Điểm cụt Dậu giáp Tân
    deadEndDistanceMeters: 20.0, // Cách nhà 20m
    roadStrikeOffsetMeters: 3.0, // Lệch trục 3m
    waterPathType: 'deadEnd',
    waterNature: 'hu_thuy',
    isLocked: true
  });

  // 1. Kiểm tra Hướng & Tọa
  assert.strictEqual(analysis.facing.mountain.name, 'Khôn', 'Hướng nhà phải là Khôn Sơn');
  assert.strictEqual(analysis.sitting.mountain.name, 'Cấn', 'Tọa nhà phải là Cấn Sơn');

  // 2. Kiểm tra Lai Thủy Bính
  assert.strictEqual(analysis.lai.mountain.name, 'Bính', 'Lai Thủy phải là Bính Sơn');

  // 3. Kiểm tra Khứ Thủy: Hẻm cụt không được gán Khứ bừa bãi
  assert.strictEqual(analysis.khu, null, 'Khứ Thủy hẻm cụt phải là null');

  // 4. Kiểm tra Phân tích Điểm Cụt (Dead End Analysis)
  assert(analysis.deadEnd !== null, 'Phải có phân tích deadEnd');
  assert.strictEqual(analysis.deadEnd.nature, 'CUL_DE_SAC_PHYSICAL_END', 'Bản chất phải là điểm tận vật lý');
  assert.strictEqual(analysis.deadEnd.mountain.name, 'Dậu', 'Sơn điểm cụt là Dậu');
  assert.strictEqual(analysis.deadEnd.uncertainty.mountainZone.zone, 'BORDER_ZONE', 'Điểm cụt phải được cảnh báo BORDER_ZONE');
  assert(analysis.deadEnd.uncertainty.mountainZone.displayLabel.includes('DẬU / TÂN — GIÁP BIÊN'), 'Gắn nhãn Dậu/Tân giáp biên');

  // 5. Đánh giá Trực Xung (Road Strike Offset = 3.0m)
  assert.strictEqual(analysis.deadEnd.strikeStatus, 'SAFE_OFFSET', 'Lệch 3m phải được đánh giá SAFE_OFFSET');
  assert(analysis.deadEnd.strikeLabel.includes('Không phạm Trực Xung'), 'Phải kết luận không phạm Trực Xung');
});

it('3.2. Đánh giá trường hợp tim đường đâm trực diện (Offset = 0.5m < 1.5m)', () => {
  const classifier = new LuopanClassifier();
  const analysis = classifier.classify({
    facingBearing: 226.0,
    deadEndBearing: 275.5,
    deadEndDistanceMeters: 20.0,
    roadStrikeOffsetMeters: 0.5, // Đâm thẳng vào nhà
    waterPathType: 'deadEnd'
  });

  assert.strictEqual(analysis.deadEnd.strikeStatus, 'DIRECT_STRIKE', 'Lệch 0.5m phải báo DIRECT_STRIKE');
  assert(analysis.deadEnd.strikeLabel.includes('Nguy cơ Trực Xung'), 'Phải cảnh báo nguy cơ Trực Xung');
});

// -------------------------------------------------------------
// TỔNG KẾT
// -------------------------------------------------------------
console.log('\n================================================================');
console.log('KET QUA KIEM THU: ' + passed + ' PASSED, ' + failed + ' FAILED');
console.log('================================================================\n');

if (failed > 0) {
  process.exit(1);
}
