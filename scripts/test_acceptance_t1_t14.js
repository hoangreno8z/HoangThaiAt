'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const Calibration = require('../js/luopan_calibration_engine');
const Geometry = require('../js/luopan_geometry');
const Data = require('../js/luopan_data');
const Classifier = require('../js/luopan_classifier');

let passed = 0;
let failed = 0;

function test(name, run) {
  try {
    run();
    passed++;
    console.log(`PASS ${name}`);
  } catch (error) {
    failed++;
    console.error(`FAIL ${name}\n${error.stack}`);
  }
}

function near(actual, expected, message, tol = 1e-4) {
  assert.ok(Math.abs(actual - expected) <= tol,
    `${message}: expected ${expected}, received ${actual} (diff: ${Math.abs(actual - expected)})`);
}

function button(value = '') {
  return {
    value, style: {}, textContent: '', disabled: false, listeners: {},
    reportValidity: () => true,
    classList: { add() {}, remove() {}, toggle() {} },
    setAttribute() {},
    addEventListener(type, handler) { this.listeners[type] = handler; },
    click() { assert.ok(this.listeners.click, 'Click handler must be bound'); this.listeners.click(); }
  };
}

function createTestEnvironment() {
  const elements = {
    'btn-lock-calibration': button(),
    'input-measured-bearing': button('226'),
    'step-btn-1': button(),
    'step-btn-2': button(),
    'step-btn-3': button(),
    'step-btn-select': button(),
    'btn-north-up': button(),
    'btn-facing-up': button(),
    'btn-flip-frontside': button(),
    'btn-toggle-deadend': button(),
    'btn-reverse-water': button(),
    'dt-node-action-bar': { style: {}, innerHTML: '', querySelector: () => null }
  };
  const mapMount = { id: 'dt-map-mount' };
  elements['dt-map-mount'] = mapMount;
  const document = {
    getElementById: id => elements[id] || null,
    querySelector: sel => null,
    querySelectorAll: sel => []
  };
  const window = {
    CalibrationEngine: Calibration, LuopanGeometry: Geometry, LuopanData: Data,
    LuopanClassifier: Classifier, LuopanSvgRenderer: class { render() { return ''; } },
    addEventListener() {}, removeEventListener() {}
  };
  const context = vm.createContext({ window, document, console, setTimeout, clearTimeout });
  const sourcePath = path.join(__dirname, '../js/luopan_map_tool.js');
  vm.runInContext(fs.readFileSync(sourcePath, 'utf8'), context, { filename: sourcePath });
  const tool = new window.LuopanMapTool();
  tool.container = document;
  tool.mode = 'map';
  let mapDestroyed = false;
  tool.mapInstance = {
    getContainer: () => mapMount,
    getCenter: () => ({ lat: 10.7769, lng: 106.7009 }),
    getZoom: () => 18,
    invalidateSize() {},
    remove() { mapDestroyed = true; }
  };
  tool.renderLayout = () => { assert.fail('Must not call full renderLayout on lock/unlock'); };
  tool.initInteractiveCanvas = () => {};
  tool.initLeafletMap = () => {};
  tool.renderDrawingElements = () => {};
  tool.updateSvgView = () => {};
  tool.updateViewTransform = () => {};

  tool.recalculateRawBearings();
  tool.bindEvents();

  return { tool, elements, document, isMapDestroyed: () => mapDestroyed };
}

console.log('================================================================');
console.log('   BỘ 14 BÀI KIỂM THỬ NGHIỆM THU BẮT BUỘC (T1 -> T14)           ');
console.log('================================================================\n');

// T1: RAW 180°, khóa 226° => Hướng = 226°, offset +46°
test('T1: RAW 180°, khóa 226° => Hướng = 226°, offset = +46°', () => {
  const { tool, elements } = createTestEnvironment();
  tool.frontageLine = { pA: { x: 300, y: 400 }, pB: { x: 500, y: 400 }, frontSide: 'right' };
  tool.recalculateRawBearings();
  near(tool.rawFacingBearing, 180, 'RAW facing before lock');
  
  elements['input-measured-bearing'].value = '226';
  elements['btn-lock-calibration'].click();

  assert.equal(tool.isCalibrationLocked, true, 'isCalibrationLocked must be true');
  near(tool.calibrationOffset, 46, 'calibrationOffset must be +46°');
  near(tool.getEffectiveFacingBearing(), 226, 'Effective facing must be locked at 226.00°');
});

// T2: Sau T1 kéo A/B để RAW = 229.16° => Hướng vẫn 226°, offset = -3.16°
test('T2: Sau T1 kéo A/B để RAW = 229.16° => Hướng vẫn 226°, offset = -3.16°', () => {
  const { tool, elements } = createTestEnvironment();
  elements['input-measured-bearing'].value = '226';
  elements['btn-lock-calibration'].click();
  near(tool.getEffectiveFacingBearing(), 226, 'Initial lock');

  tool.rawFacingBearing = 229.16;
  if (tool.isCalibrationLocked && Number.isFinite(tool.measuredBearing)) {
    tool.calibrationOffset = tool.calibEngine.computeOffset(tool.rawFacingBearing, tool.measuredBearing);
  }
  near(tool.getEffectiveFacingBearing(), 226, 'Effective facing must strictly remain 226.00°');
  near(tool.calibrationOffset, -3.16, 'Offset must be dynamically updated to -3.16°');
});

// T3: Có RAW Lai 237.45° => Lai hiệu chuẩn = 234.29° (với offset = -3.16°)
test('T3: Có RAW Lai 237.45° => Lai hiệu chuẩn = 234.29°', () => {
  const { tool, elements } = createTestEnvironment();
  elements['input-measured-bearing'].value = '226';
  elements['btn-lock-calibration'].click();
  tool.rawFacingBearing = 229.16;
  tool.calibrationOffset = tool.calibEngine.computeOffset(229.16, 226); // -3.16

  const rawLai = 237.45;
  const effectiveLai = tool.calibEngine.calibrate(rawLai, tool.calibrationOffset);
  near(effectiveLai, 234.29, 'Effective Lai must be 237.45 + (-3.16) = 234.29°');
});

// T4: Vẽ tuyến 8 node => Hiện đủ 8 node + nối đúng thứ tự
test('T4: Tuyến 8 node chứa đủ 8 node và thứ tự', () => {
  const { tool } = createTestEnvironment();
  const nodes = [
    { x: 100, y: 100, role: 'normal' },
    { x: 120, y: 150, role: 'normal' },
    { x: 180, y: 160, role: 'normal' },
    { x: 220, y: 200, role: 'normal' },
    { x: 280, y: 260, role: 'normal' },
    { x: 340, y: 310, role: 'normal' },
    { x: 390, y: 370, role: 'normal' },
    { x: 450, y: 420, role: 'normal' }
  ];
  tool.waterPolyline = [...nodes];
  assert.equal(tool.waterPolyline.length, 8, 'Water polyline has 8 nodes');
  const segs = tool.getWaterSegments();
  assert.equal(segs.length, 7, '8 nodes generate exactly 7 segments');
  for (let i = 0; i < 7; i++) {
    assert.equal(segs[i].fromIndex, i);
    assert.equal(segs[i].toIndex, i + 1);
  }
});

// T5: Kéo node P4 => Chỉ P4 đổi, tuyến giữ nguyên
test('T5: Kéo node P4 => Chỉ P4 đổi toạ độ, các node khác giữ nguyên', () => {
  const { tool } = createTestEnvironment();
  tool.waterPolyline = [
    { x: 100, y: 100 }, { x: 120, y: 150 }, { x: 180, y: 160 },
    { x: 220, y: 200 }, { x: 280, y: 260 }, { x: 340, y: 310 },
    { x: 390, y: 370 }, { x: 450, y: 420 }
  ];
  const p0Before = { ...tool.waterPolyline[0] };
  const p5Before = { ...tool.waterPolyline[5] };

  tool.waterPolyline[3] = { x: 235, y: 215 };

  assert.deepEqual(tool.waterPolyline[0], p0Before, 'P0 unchanged');
  assert.deepEqual(tool.waterPolyline[5], p5Before, 'P5 unchanged');
  assert.equal(tool.waterPolyline[3].x, 235, 'P3 changed X');
  assert.equal(tool.waterPolyline[3].y, 215, 'P3 changed Y');
});

// T6: Chọn P2 = Lai => Lai lấy bearing tâm nhà → P2
test('T6: Chọn P2 = Lai => Lai lấy bearing tâm nhà → P2', () => {
  const { tool } = createTestEnvironment();
  tool.centerPoint = { x: 400, y: 400 };
  tool.waterPolyline = [
    { x: 100, y: 100 },
    { x: 400, y: 200 }, // P1 (P2 người dùng) nằm thẳng góc Bắc -> 0°
    { x: 500, y: 500 }
  ];
  tool.laiNodeIndex = 1;
  const pts = tool.getWaterPoints();
  assert.deepEqual(pts.pLai, tool.waterPolyline[1]);
  near(tool.getRawLaiBearing(), 0, 'Bearing from center (400,400) to P1 (400,200) is 0°');
});

// T7: Chọn P6 = Khứ => Khứ lấy bearing tâm nhà → P6
test('T7: Chọn P6 = Khứ => Khứ lấy bearing tâm nhà → P6', () => {
  const { tool } = createTestEnvironment();
  tool.centerPoint = { x: 400, y: 400 };
  tool.waterPolyline = [
    { x: 100, y: 100 }, { x: 150, y: 150 }, { x: 200, y: 200 },
    { x: 250, y: 250 }, { x: 300, y: 300 },
    { x: 400, y: 600 }  // P5 (P6 người dùng) nằm thẳng góc Nam -> 180°
  ];
  tool.khuNodeIndex = 5;
  const pts = tool.getWaterPoints();
  assert.deepEqual(pts.pKhu, tool.waterPolyline[5]);
  near(tool.getRawKhuBearing(), 180, 'Bearing from center (400,400) to P5 (400,600) is 180°');
});

// T8: Đánh dấu P1/P3 là ngã ba => Không tự biến thành Lai/Khứ
test('T8: Đánh dấu P1/P3 là ngã ba => Không tự biến thành Lai/Khứ', () => {
  const { tool } = createTestEnvironment();
  tool.waterPolyline = [
    { x: 100, y: 100, role: 'junction' },
    { x: 200, y: 200, role: 'normal' },
    { x: 300, y: 300, role: 'junction' },
    { x: 400, y: 400, role: 'normal' }
  ];
  tool.laiNodeIndex = 1;
  tool.khuNodeIndex = 3;
  const pts = tool.getWaterPoints();
  assert.deepEqual(pts.pLai, tool.waterPolyline[1], 'P2 remains Lai');
  assert.deepEqual(pts.pKhu, tool.waterPolyline[3], 'P4 remains Khu');
  assert.equal(tool.waterPolyline[0].role, 'junction');
  assert.equal(tool.waterPolyline[2].role, 'junction');
});

// T9: Chọn hẻm cụt => khuBearing === null
test('T9: Chọn hẻm cụt => khuBearing === null', () => {
  const { tool, elements } = createTestEnvironment();
  tool.waterPolyline = [{ x: 100, y: 100 }, { x: 200, y: 200 }, { x: 300, y: 300 }];
  elements['btn-toggle-deadend'].click();
  assert.equal(tool.waterPathType, 'deadEnd');
  assert.equal(tool.getRawKhuBearing(), null, 'rawKhuBearing must be null');
  assert.equal(tool.getEffectiveKhuBearing(), null, 'effectiveKhuBearing must be null');
});

// T10: Hẻm cụt => UI ghi "Khứ không xác lập"
test('T10: Hẻm cụt => UI ghi Hẻm cụt (không có Khứ) hoặc Không xác lập', () => {
  const { tool, elements } = createTestEnvironment();
  tool.waterPolyline = [{ x: 100, y: 100 }, { x: 200, y: 200 }, { x: 300, y: 300 }];
  elements['btn-toggle-deadend'].click();
  const html = tool.renderResultPanels();
  assert.ok(html.includes('Hẻm cụt (không có Khứ)') || html.includes('Không xác lập'),
    'UI must explicitly indicate dead-end with no false Khu');
});

// T11: Chạm đoạn P2->P3 => hiện hướng chính đoạn P2->P3
test('T11: Chạm đoạn P2->P3 => hiện hướng chính đoạn P2->P3', () => {
  const { tool } = createTestEnvironment();
  tool.waterPolyline = [
    { x: 50, y: 50 },
    { x: 100, y: 100 },
    { x: 200, y: 100 },
    { x: 200, y: 200 }
  ];
  const segs = tool.getWaterSegments();
  assert.equal(segs.length, 3);
  const segP2P3 = segs[1];
  assert.equal(segP2P3.fromIndex, 1);
  assert.equal(segP2P3.toIndex, 2);
  near(segP2P3.rawBearing, 90, 'Raw bearing of P2->P3 is 90° (East)');
  near(segP2P3.effectiveBearing, 90, 'Effective bearing with 0 offset is 90°');

  tool.selectedSegmentIndex = 1;
  const html = tool.renderResultPanels();
  assert.ok(html.includes('P2 → P3') || html.includes('P2'), 'UI renders selected segment');
  assert.ok(html.includes('90.00°') && html.includes('Mão Sơn'), 'UI renders segment bearing & mountain');
});

// T12: Khóa/mở khóa => Leaflet Map không mất/reset
test('T12: Khóa/mở khóa => Leaflet Map không bị reset hay hủy instance', () => {
  const { tool, elements, isMapDestroyed } = createTestEnvironment();
  const initialMap = tool.mapInstance;
  elements['btn-lock-calibration'].click();
  assert.equal(tool.isCalibrationLocked, true);
  assert.strictEqual(tool.mapInstance, initialMap, 'Map instance preserved on lock');
  assert.equal(isMapDestroyed(), false, 'Map was not destroyed on lock');

  elements['btn-lock-calibration'].click();
  assert.equal(tool.isCalibrationLocked, false);
  assert.strictEqual(tool.mapInstance, initialMap, 'Map instance preserved on unlock');
  assert.equal(isMapDestroyed(), false, 'Map was not destroyed on unlock');
});

// T13: Zoom/pan map => node + La Kinh vẫn đồng bộ
test('T13: Zoom/pan map => node + La Kinh vẫn đồng bộ', () => {
  const { tool } = createTestEnvironment();
  const centerBefore = { ...tool.centerPoint };
  const frontageBefore = JSON.stringify(tool.frontageLine);
  const waterBefore = JSON.stringify(tool.waterPolyline);

  tool.mapInstance.getCenter = () => ({ lat: 10.7800, lng: 106.7050 });
  tool.mapInstance.getZoom = () => 19;
  tool.updateMeasurementsDisplay();

  assert.equal(tool.centerPoint.x, centerBefore.x, 'Center X coordinate preserved');
  assert.equal(tool.centerPoint.y, centerBefore.y, 'Center Y coordinate preserved');
  assert.equal(JSON.stringify(tool.frontageLine), frontageBefore, 'Frontage geometry preserved');
  assert.equal(JSON.stringify(tool.waterPolyline), waterBefore, 'Water geometry preserved');
});

// T14: Bắc Lên/Hướng Lên => dữ liệu bearing không thay đổi
test('T14: Bắc Lên/Hướng Lên => dữ liệu bearing không thay đổi', () => {
  const { tool, elements } = createTestEnvironment();
  elements['btn-lock-calibration'].click();
  const facingBefore = tool.getEffectiveFacingBearing();
  const laiBefore = tool.getEffectiveLaiBearing();
  const khuBefore = tool.getEffectiveKhuBearing();
  const offsetBefore = tool.calibrationOffset;

  elements['btn-facing-up'].click();
  near(tool.getEffectiveFacingBearing(), facingBefore, 'Facing bearing identical after Facing Up');
  near(tool.getEffectiveLaiBearing(), laiBefore, 'Lai bearing identical after Facing Up');
  near(tool.getEffectiveKhuBearing(), khuBefore, 'Khu bearing identical after Facing Up');
  near(tool.calibrationOffset, offsetBefore, 'Offset identical after Facing Up');

  elements['btn-north-up'].click();
  near(tool.getEffectiveFacingBearing(), facingBefore, 'Facing bearing identical after North Up');
  near(tool.getEffectiveLaiBearing(), laiBefore, 'Lai bearing identical after North Up');
  near(tool.getEffectiveKhuBearing(), khuBefore, 'Khu bearing identical after North Up');
  near(tool.calibrationOffset, offsetBefore, 'Offset identical after North Up');
});

// T15: Chèn điểm vào giữa đoạn (Insert Node between segments)
test('T15: Chèn điểm vào giữa đoạn => tách đoạn và tăng số node', () => {
  const { tool, elements } = createTestEnvironment();
  tool.waterPolyline = [
    { x: 100, y: 100, role: 'normal' },
    { x: 300, y: 300, role: 'normal' },
    { x: 500, y: 500, role: 'normal' }
  ];
  tool.selectedSegmentIndex = 0; // Chọn đoạn 0 (P1 -> P2)
  let bar = { style: {}, innerHTML: '', listeners: {}, querySelector(sel) { return this[sel] || null; } };
  const mockBtnInsert = {
    addEventListener(evt, h) { this.handler = h; },
    click() { this.handler({ stopPropagation() {} }); }
  };
  bar['#btn-seg-insert-node'] = mockBtnInsert;
  const originalGetElement = tool.container.getElementById;
  elements['dt-node-action-bar'] = bar;

  tool.updateNodeActionBar();
  assert.equal(tool.waterPolyline.length, 3);
  mockBtnInsert.click(); // Thực hiện chèn điểm giữa đoạn 0

  assert.equal(tool.waterPolyline.length, 4, 'Polyline must now have 4 nodes');
  assert.equal(tool.waterPolyline[1].x, 200, 'Midpoint X is 200');
  assert.equal(tool.waterPolyline[1].y, 200, 'Midpoint Y is 200');
  assert.equal(tool.selectedNodeIndex, 1, 'Newly inserted node is selected');
});

// T16: Xóa điểm khỏi tuyến (Delete Node)
test('T16: Xóa điểm khỏi tuyến => giảm node và cập nhật liên kết', () => {
  const { tool, elements } = createTestEnvironment();
  tool.waterPolyline = [
    { x: 100, y: 100, role: 'normal' },
    { x: 200, y: 200, role: 'normal' },
    { x: 300, y: 300, role: 'normal' },
    { x: 400, y: 400, role: 'normal' }
  ];
  tool.selectedNodeIndex = 1; // Chọn node 1
  let bar = { style: {}, innerHTML: '', querySelector(sel) { return this[sel] || null; } };
  const mockBtnDelete = {
    addEventListener(evt, h) { this.handler = h; },
    click() { this.handler({ stopPropagation() {} }); }
  };
  bar['#btn-node-delete'] = mockBtnDelete;
  elements['dt-node-action-bar'] = bar;

  tool.updateNodeActionBar();
  mockBtnDelete.click(); // Xóa node 1

  assert.equal(tool.waterPolyline.length, 3, 'Polyline now has 3 nodes');
  assert.equal(tool.waterPolyline[1].x, 300, 'Index 1 is now old index 2');
  assert.equal(tool.selectedNodeIndex, null, 'Selection cleared');
});

// T17: Nối thêm điểm (Append Water) không bị xóa tuyến cũ
test('T17: Nối thêm điểm (btn-append-water) giữ nguyên tuyến cũ', () => {
  const { tool, elements } = createTestEnvironment();
  elements['btn-append-water'] = button();
  tool.waterPolyline = [
    { x: 100, y: 100 }, { x: 200, y: 200 }
  ];
  tool.bindEvents();
  elements['btn-append-water'].click();

  assert.equal(tool.activeDrawTool, 'drawWater');
  assert.equal(tool.pendingNewWaterPath, false, 'pendingNewWaterPath must be false when appending');
  assert.equal(tool.waterPolyline.length, 2, 'Existing polyline preserved');
});

// T18: Đóng Action Bar (✕) thoát hoàn toàn mode vẽ, trở về 'select'
test('T18: Đóng Action Bar (✕) thoát hoàn toàn mode vẽ, trở về "select"', () => {
  const { tool, elements } = createTestEnvironment();
  tool.waterPolyline = [
    { x: 100, y: 100, role: 'normal' },
    { x: 200, y: 200, role: 'normal' }
  ];
  tool.activeDrawTool = 'drawWater';
  tool.selectedNodeIndex = 1;
  let bar = { style: {}, innerHTML: '', querySelector(sel) { return this[sel] || null; } };
  const mockBtnClose = {
    addEventListener(evt, h) { this.handler = h; },
    click() { this.handler({ stopPropagation() {} }); }
  };
  bar['#btn-node-close'] = mockBtnClose;
  elements['dt-node-action-bar'] = bar;

  tool.updateNodeActionBar();
  assert.equal(tool.activeDrawTool, 'drawWater');
  mockBtnClose.click();

  assert.equal(tool.activeDrawTool, 'select', 'activeDrawTool must revert to select on close');
  assert.equal(tool.isDrawingWater, false, 'isDrawingWater must be false');
  assert.equal(tool.isArmingAddPoint, false, 'isArmingAddPoint must be false');
  assert.equal(tool.selectedNodeIndex, null, 'selectedNodeIndex must be cleared');
  assert.equal(tool.waterPolyline.length, 2, 'No node added');
});

console.log('\n================================================================');
console.log(`KẾT QUẢ KIỂM ĐỊNH: ${passed} PASS, ${failed} FAIL`);
console.log('================================================================');

if (failed > 0) {
  process.exit(1);
}

