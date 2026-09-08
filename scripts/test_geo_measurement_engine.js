/**
 * KIỂM THỬ ĐỘNG CƠ ĐO ĐẠC ĐỊA LÝ & QUALITY GATE (GEO MEASUREMENT ENGINE TEST)
 */

const assert = require('assert');
const GeoMeasurementEngine = require('../js/geo_measurement_engine');
const LuopanData = require('../js/luopan_data');
const LuopanClassifier = require('../js/luopan_classifier');

console.log('=== BẮT ĐẦU KIỂM THỬ: GEO MEASUREMENT ENGINE & QUALITY GATE ===\n');

// 1. Kiểm thử Phương vị trắc địa (Geodesic Bearing) & Khoảng cách Haversine
console.log('1. Kiểm thử Phương vị trắc địa (Geodesic Forward Azimuth):');
{
  const p1 = { lat: 21.0285, lng: 105.8542 };
  // Đi thẳng lên phía Bắc
  const pNorth = { lat: 21.0385, lng: 105.8542 };
  const bNorth = GeoMeasurementEngine.calculateGeodesicBearing(p1, pNorth);
  assert.ok(Math.abs(bNorth - 0) < 0.1 || Math.abs(bNorth - 360) < 0.1, `North bearing must be ~0° (got ${bNorth})`);
  console.log(`  ✓ PASS: Hướng Bắc trắc địa = ${bNorth.toFixed(2)}° (~0°)`);

  // Đi sang phía Đông
  const pEast = { lat: 21.0285, lng: 105.8642 };
  const bEast = GeoMeasurementEngine.calculateGeodesicBearing(p1, pEast);
  assert.ok(Math.abs(bEast - 90) < 0.5, `East bearing must be ~90° (got ${bEast})`);
  console.log(`  ✓ PASS: Hướng Đông trắc địa = ${bEast.toFixed(2)}° (~90°)`);

  // Đi xuống phía Nam
  const pSouth = { lat: 21.0185, lng: 105.8542 };
  const bSouth = GeoMeasurementEngine.calculateGeodesicBearing(p1, pSouth);
  assert.ok(Math.abs(bSouth - 180) < 0.1, `South bearing must be ~180° (got ${bSouth})`);
  console.log(`  ✓ PASS: Hướng Nam trắc địa = ${bSouth.toFixed(2)}° (~180°)`);

  // Khoảng cách Haversine
  const dist = GeoMeasurementEngine.calculateHaversineDistance(p1, pNorth);
  assert.ok(dist > 1000 && dist < 1200, `Distance between 21.0285 and 21.0385 should be ~1110m (got ${dist}m)`);
  console.log(`  ✓ PASS: Cự ly Haversine giữa 2 vĩ độ = ${dist.toFixed(1)}m`);
}

// 2. Kiểm thử Toán học góc tròn (Circular Math) qua ranh giới 0°/360°
console.log('\n2. Kiểm thử Toán học góc tròn (Circular Math):');
{
  // angularDifference: chênh lệch có dấu từ 359.8 sang 0.2 phải là +0.4 (không phải -359.6)
  const diff1 = GeoMeasurementEngine.angularDifference(359.8, 0.2);
  assert.equal(diff1, 0.4, `Difference from 359.8 to 0.2 must be +0.4° (got ${diff1})`);
  console.log(`  ✓ PASS: angularDifference(359.8°, 0.2°) = +${diff1}°`);

  const diff2 = GeoMeasurementEngine.angularDifference(0.2, 359.8);
  assert.equal(diff2, -0.4, `Difference from 0.2 to 359.8 must be -0.4° (got ${diff2})`);
  console.log(`  ✓ PASS: angularDifference(0.2°, 359.8°) = ${diff2}°`);

  // angularDistance: khoảng cách tuyệt đối
  const distAngle = GeoMeasurementEngine.angularDistance(359, 1);
  assert.equal(distAngle, 2, `Distance between 359 and 1 must be 2° (got ${distAngle})`);
  console.log(`  ✓ PASS: angularDistance(359°, 1°) = ${distAngle}°`);

  // circularMean: trung bình góc của [359, 1] phải là 0 hoặc 360 (không phải 180)
  const mean1 = GeoMeasurementEngine.circularMean([359, 1]);
  assert.ok(mean1 === 0 || mean1 === 360, `circularMean([359, 1]) must be 0° (got ${mean1})`);
  console.log(`  ✓ PASS: circularMean([359°, 1°]) = ${mean1}° (chuẩn mốc 0°)`);

  const mean2 = GeoMeasurementEngine.circularMean([10, 20, 30]);
  assert.equal(mean2, 20, `circularMean([10, 20, 30]) must be 20° (got ${mean2})`);
  console.log(`  ✓ PASS: circularMean([10°, 20°, 30°]) = ${mean2}°`);

  // circularDispersion
  const dispLow = GeoMeasurementEngine.circularDispersion([180, 180.5, 179.5]);
  assert.ok(dispLow.stdDevDeg < 1.0, `Dispersion of stable readings should be < 1.0° (got ${dispLow.stdDevDeg})`);
  assert.equal(dispLow.isStable, true, 'Stable readings must have isStable === true');
  console.log(`  ✓ PASS: circularDispersion mẫu ổn định = ±${dispLow.stdDevDeg.toFixed(2)}° (isStable: true)`);

  const dispHigh = GeoMeasurementEngine.circularDispersion([170, 195, 180]);
  assert.ok(dispHigh.stdDevDeg > 5.0, `Dispersion of noisy readings should be > 5.0° (got ${dispHigh.stdDevDeg})`);
  assert.equal(dispHigh.isStable, false, 'Noisy readings must have isStable === false');
  console.log(`  ✓ PASS: circularDispersion mẫu nhiễu từ = ±${dispHigh.stdDevDeg.toFixed(2)}° (isStable: false)`);
}

// 3. Kiểm thử Mô hình Từ Thiên WMM tại Việt Nam & Quy chiếu Bắc Thật / Bắc Từ
console.log('\n3. Kiểm thử Mô hình Từ Thiên WMM tại Việt Nam:');
{
  // Hà Nội (21.03° N, 105.85° E)
  const decHanoi = GeoMeasurementEngine.getMagneticDeclination(21.03, 105.85, 2026);
  assert.ok(decHanoi.declination < 0, `Declination in Hanoi should be West (negative)`);
  console.log(`  ✓ PASS: Độ từ thiên Hà Nội 2026 = ${decHanoi.label} (${decHanoi.declination}°)`);

  // TP. Hồ Chí Minh (10.78° N, 106.70° E)
  const decHcm = GeoMeasurementEngine.getMagneticDeclination(10.78, 106.70, 2026);
  assert.ok(decHcm.declination < 0, `Declination in HCM should be West (negative)`);
  console.log(`  ✓ PASS: Độ từ thiên TP.HCM 2026 = ${decHcm.label} (${decHcm.declination}°)`);

  // Chuyển đổi qua lại giữa Magnetic và True
  const trueB = 180.0;
  const magB = GeoMeasurementEngine.convertTrueToMagnetic(trueB, decHanoi.declination);
  const backTrue = GeoMeasurementEngine.convertMagneticToTrue(magB, decHanoi.declination);
  assert.ok(Math.abs(backTrue - trueB) < 0.001, `Roundtrip conversion must preserve bearing`);
  console.log(`  ✓ PASS: Chuyển đổi hai chiều True (${trueB}°) <-> Magnetic (${magB}°) bảo toàn chính xác`);
}

// 4. Kiểm thử Độ dài Đoạn chuẩn (Baseline Length) & Ước lượng Sai số
console.log('\n4. Kiểm thử Baseline Length & Ước lượng Sai số:');
{
  const shortBase = GeoMeasurementEngine.estimateBaselineUncertainty(8.0, 'USER_MANUAL');
  assert.equal(shortBase.isShortBaseline, true, '8m must be flagged as short baseline');
  assert.ok(shortBase.uncertainty > 5.0, 'Short baseline must have higher uncertainty');
  assert.ok(shortBase.warning !== null, 'Short baseline must have warning');
  console.log(`  ✓ PASS: Đoạn chuẩn ngắn (8m) -> Cảnh báo: "${shortBase.warning}" (Sai số ±${shortBase.uncertainty}°)`);

  const goodBase = GeoMeasurementEngine.estimateBaselineUncertainty(50.0, 'OSM_AUTO');
  assert.equal(goodBase.isShortBaseline, false, '50m is a reliable baseline');
  assert.ok(goodBase.uncertainty <= 1.0, 'Long baseline has small angular uncertainty');
  assert.equal(goodBase.quality, 'HIGH', 'Quality should be HIGH');
  console.log(`  ✓ PASS: Đoạn chuẩn dài (50m) -> Quality: ${goodBase.quality}, Sai số ±${goodBase.uncertainty}°`);
}

// 5. Kiểm thử QUALITY GATE: Phát hiện Vùng Giáp Ranh Sơn (AMBIGUOUS)
console.log('\n5. Kiểm thử QUALITY GATE Ranh Phân Kim 24 Sơn:');
{
  const classifier = new LuopanClassifier();

  // Test 5.1: Góc nằm chính giữa Sơn (An toàn - VALID)
  // Sơn Bính: 157.5° - 172.5°, chính giữa là 165.0°, cách biên 7.5°
  const safeEval = classifier.evaluateUncertainty(165.0, 0.5);
  assert.equal(safeEval.isAmbiguous, false, '165° with 0.5° tolerance is not ambiguous');
  assert.equal(safeEval.qualityGateStatus, 'VALID', 'Quality gate status must be VALID');
  console.log(`  ✓ PASS: Góc 165° (giữa Sơn Bính, cách biên ${safeEval.distanceToBoundary}°) -> Status: VALID`);

  // Test 5.2: Góc nằm sát ranh phân kim (AMBIGUOUS)
  // Ranh giữa Tý (352.5° - 7.5°) và Quý (7.5° - 22.5°) là 7.5°
  // Góc 7.4° cách ranh 7.5° chỉ 0.1° <= sai số 0.3° -> BẮT BUỘC AMBIGUOUS
  const borderEval = classifier.evaluateUncertainty(7.4, 0.3);
  assert.equal(borderEval.isAmbiguous, true, '7.4° with 0.3° tolerance must be AMBIGUOUS');
  assert.equal(borderEval.qualityGateStatus, 'AMBIGUOUS', 'Status must be AMBIGUOUS');
  assert.ok(borderEval.possibleMountains.length >= 2, 'Must list both adjacent mountains');
  assert.ok(borderEval.qualityGateWarning.includes('Sát ranh phân kim'), 'Must output Quality Gate warning');
  console.log(`  ✓ PASS: Góc 7.4° (cách ranh Tý/Quý 0.1° <= ±0.3°) -> Status: AMBIGUOUS, Sơn giáp ranh: [${borderEval.possibleMountains.join(', ')}]`);

  // Test 5.3: LuopanClassifier.classify() phản ánh trạng thái AMBIGUOUS khi khóa mốc
  const ambiguousClassify = classifier.classify({
    facingBearing: 7.4,
    laiBearing: 60.0,
    khuBearing: 300.0,
    isLocked: true,
    tolerance: 0.3
  });
  assert.equal(ambiguousClassify.status.state, 'AMBIGUOUS', 'Classification status must be AMBIGUOUS');
  assert.ok(ambiguousClassify.status.label.includes('CẢNH BÁO GIÁP RANH SƠN'), 'Label must warn about boundary ambiguity');
  assert.ok(ambiguousClassify.matchTrace.some(t => t.includes('[QUALITY GATE]')), 'Match trace must log Quality Gate warning');
  console.log(`  ✓ PASS: Phân loại tổng thể khi sát ranh -> Trạng thái: ${ambiguousClassify.status.state} (${ambiguousClassify.status.label})`);
}

console.log('\n======================================================');
console.log('KẾT QUẢ KIỂM THỬ GEO MEASUREMENT ENGINE: 100% PASSED!');
console.log('======================================================\n');
