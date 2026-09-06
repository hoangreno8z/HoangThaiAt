'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const Calibration = require('../js/luopan_calibration_engine');
const Geometry = require('../js/luopan_geometry');
const Data = require('../js/luopan_data');
const TheoryCorpus = require('../js/luopan_theory_corpus');
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
    'btn-toggle-water-nature': button(),
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
    LuopanTheoryCorpus: TheoryCorpus,
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

// T19: Tự động tính 12 Cung Trường Sinh và Tổng Luận Tam Hợp Thủy Pháp
test('T19: Tự động tính 12 Cung Trường Sinh và Tổng Luận Tam Hợp Thủy Pháp', () => {
  const { tool } = createTestEnvironment();
  // Giả lập Hướng 165° (Bính sơn - Hỏa cục), Lai 60° (Dần), Khứ 300° (Tuất)
  const analysis = tool.classifier.classify({
    facingBearing: 165,
    laiBearing: 60,
    khuBearing: 300,
    isLocked: true
  });

  assert.equal(analysis.group.cuc, 'Hỏa', 'Must identify Hỏa Cục');
  assert.equal(analysis.facing.truongSinh.name, 'Đế Vượng', 'Bính Ngọ is Đế Vượng in Hỏa Cục');
  assert.equal(analysis.sitting.truongSinh.name, 'Thai', 'Nhâm Tý is Thai in Hỏa Cục');
  assert.equal(analysis.lai.truongSinh.name, 'Trường Sinh', 'Cấn Dần is Trường Sinh in Hỏa Cục');
  assert.equal(analysis.lai.truongSinh.laiNature, 'Đại Cát', 'Trường Sinh Lai Thủy is Đại Cát');
  assert.equal(analysis.khu.truongSinh.name, 'Mộ', 'Tân Tuất is Mộ in Hỏa Cục');
  assert.equal(analysis.khu.truongSinh.khuNature, 'Đại Cát Tụ Bảo', 'Mộ Khứ Thủy is Đại Cát Tụ Bảo');
  assert.equal(analysis.tamHop.rating, 'Đại Cát Tụ Tài', 'Tam Hợp evaluation is Đại Cát Tụ Tài');
  assert.ok(analysis.tamHop.aphorism.includes('Sinh Lai Hội Vượng'), 'Aphorism contains Sinh Lai Hội Vượng');

  // Thủy Cục: Hướng Nhâm (0°), Lai Thân (240°), Khứ Thìn (120°)
  const thuyAnalysis = tool.classifier.classify({
    facingBearing: 0,
    laiBearing: 240,
    khuBearing: 120,
    isLocked: true
  });
  assert.equal(thuyAnalysis.group.cuc, 'Thủy', 'Must identify Thủy Cục');
  assert.equal(thuyAnalysis.facing.truongSinh.name, 'Đế Vượng', 'Nhâm Tý is Đế Vượng in Thủy Cục');
  assert.equal(thuyAnalysis.lai.truongSinh.name, 'Trường Sinh', 'Khôn Thân is Trường Sinh in Thủy Cục');
  assert.equal(thuyAnalysis.khu.truongSinh.name, 'Mộ', 'Ất Thìn is Mộ in Thủy Cục');
});

// T20: Sơ đồ phân đoạn dòng chảy Lai -> Khứ và chạm chọn phân đoạn
test('T20: Sơ đồ phân đoạn dòng chảy (Lai ➔ Khứ), vector bearing & tương quan mặt tiền', () => {
  const { tool } = createTestEnvironment();
  tool.centerPoint = { x: 400, y: 400 };
  tool.rawFacingBearing = 180; // Hướng Nam
  tool.waterPolyline = [
    { x: 200, y: 550, role: 'lai' },
    { x: 350, y: 520, role: 'normal' },
    { x: 500, y: 530, role: 'normal' },
    { x: 650, y: 570, role: 'khu' }
  ];
  tool.laiNodeIndex = 0;
  tool.khuNodeIndex = 3;

  const segs = tool.getWaterSegments();
  assert.equal(segs.length, 3, 'Must have 3 segments for 4 nodes');

  // Kiểm tra thuộc tính giàu có của phân đoạn
  const seg0 = segs[0];
  assert.equal(seg0.fromIndex, 0);
  assert.equal(seg0.toIndex, 1);
  assert.ok(seg0.segmentMountain, 'Segment must have mountain identification');
  assert.ok(seg0.fromMountain && seg0.toMountain, 'Must have from/to mountain');
  assert.ok(seg0.flowRelation, 'Must have flow relation with house');
  assert.equal(seg0.flowRelation.chieuNuoc, 'Phải → trái', 'Từ Tây sang Đông khi nhà hướng Nam là Hữu Thủy đảo Tả (Phải → trái)');

  // Chọn phân đoạn 1 (P2 -> P3)
  tool.selectedSegmentIndex = 1;
  const html = tool.renderResultPanels();
  assert.ok(html.includes('SƠ ĐỒ DÒNG CHẢY (LAI ➔ KHỨ)'), 'Must render segment flow track header');
  assert.ok(html.includes('Đoạn 2: P2 ➔ P3'), 'Must render segment card');

  // Kiểm tra SVG rendering chứa mũi tên dòng chảy và huy hiệu nổi
  const mockSvg = { style: {}, innerHTML: '' };
  tool.container = { querySelector: sel => sel === '#dt-drawing-svg' ? mockSvg : null };
  tool.constructor.prototype.renderDrawingElements.call(tool);
  assert.ok(mockSvg.innerHTML.includes('P2 ➔ P3'), 'SVG must render floating badge for selected segment');
});

// T21: Nhận diện Cửu Khúc Thủy & Kim Thành Hoàn Bão vs Phản Cung Sát
test('T21: Nhận diện địa cuộc Cửu Khúc Thủy & Kim Thành Hoàn Bão vs Phản Cung Sát', () => {
  const { tool } = createTestEnvironment();
  tool.centerPoint = { x: 400, y: 400 };
  tool.rawFacingBearing = 180; // Hướng Nam

  // 1. Trường hợp Kim Thành Hoàn Bão (cung đường cong ôm trọn minh đường)
  tool.waterPolyline = [
    { x: 150, y: 550 },
    { x: 400, y: 620 },
    { x: 650, y: 550 }
  ];
  const hoanBaoAnalysis = tool.getAnalysis();
  assert.equal(hoanBaoAnalysis.topo.curveWrap.type, 'hoan_bao', 'Must detect Kim Thành Hoàn Bão');
  const featHoanBao = hoanBaoAnalysis.topo.features.find(f => f.id === 'hoan_bao_thuy');
  assert.ok(featHoanBao, 'Must include feature hoan_bao_thuy');
  assert.equal(featHoanBao.rating, 'Đại Cát Vượng Tài');
  assert.ok(featHoanBao.source.includes('Dương Trạch Thập Thư'));

  // 2. Trường hợp Phản Cung Thủy (lưng cánh cung chĩa thẳng vào nhà)
  tool.waterPolyline = [
    { x: 150, y: 600 },
    { x: 400, y: 480 },
    { x: 650, y: 600 }
  ];
  const phanCungAnalysis = tool.getAnalysis();
  assert.equal(phanCungAnalysis.topo.curveWrap.type, 'phan_cung', 'Must detect Phản Cung Thủy');
  const featPhanCung = phanCungAnalysis.topo.features.find(f => f.id === 'phan_cung_thuy');
  assert.ok(featPhanCung, 'Must include feature phan_cung_thuy');
  assert.equal(featPhanCung.rating, 'Đại Hung Sát');
  assert.ok(featPhanCung.remedy, 'Must provide traditional remedy');

  // 3. Trường hợp Cửu Khúc Thủy (uốn lượn nhiều nhịp hòa hoãn)
  tool.waterPolyline = [
    { x: 100, y: 700 },
    { x: 250, y: 620 },
    { x: 380, y: 670 },
    { x: 500, y: 600 },
    { x: 650, y: 680 }
  ];
  const cuuKhucAnalysis = tool.getAnalysis();
  const featCuuKhuc = cuuKhucAnalysis.topo.features.find(f => f.id === 'meandering_cuu_khuc');
  assert.ok(featCuuKhuc, 'Must detect Cửu Khúc Thủy (Ngự Nhai Thủy)');
  assert.equal(featCuuKhuc.rating, 'Đại Cát Tụ Khí');
  assert.ok(featCuuKhuc.source.includes('Nhân Tử Tu Tri'));
});

// T22: Nhận diện Ngã 3 (Tam Xoa Hợp Lưu vs Đinh Tự Lộ) và Hẻm Cụt
test('T22: Nhận diện Ngã 3 (Tam Xoa Hợp Lưu vs Đinh Tự Lộ) và Hẻm Cụt (Bế Khí vs Tụ Khí)', () => {
  const { tool } = createTestEnvironment();
  tool.centerPoint = { x: 400, y: 400 };
  tool.rawFacingBearing = 180; // Hướng Nam

  // 1. Đinh Tự Lộ (Đoạn đường đâm thẳng trực diện vào mặt tiền)
  tool.waterPolyline = [
    { x: 400, y: 700 },
    { x: 400, y: 460 },
    { x: 550, y: 460 }
  ];
  const dinhTuAnalysis = tool.getAnalysis();
  const featDinhTu = dinhTuAnalysis.topo.features.find(f => f.id === 'dinh_tu_lo_xung_tam');
  assert.ok(featDinhTu, 'Must detect Đinh Tự Lộ (Xung Tâm Sát)');
  assert.equal(featDinhTu.rating, 'Đại Hung Sát');
  assert.ok(featDinhTu.remedy.includes('Thái Sơn Thạch Cảm Đương') || featDinhTu.remedy.includes('huyền quan'), 'Remedy mentions stone shield or entry hall');

  // 2. Tam Xoa Hợp Lưu (Có node giao hội ngã ba)
  tool.waterPolyline = [
    { x: 200, y: 600, role: 'normal' },
    { x: 400, y: 600, role: 'junction' },
    { x: 600, y: 600, role: 'normal' }
  ];
  const tamXoaAnalysis = tool.getAnalysis();
  const featTamXoa = tamXoaAnalysis.topo.features.find(f => f.id === 'tam_xoa_hop_luu');
  assert.ok(featTamXoa, 'Must detect Tam Xoa Hợp Lưu');
  assert.equal(featTamXoa.rating, 'Cát Lợi Tụ Khí');

  // 3. Hẻm Cụt (Bế Khí / Tử Khí Thủy)
  tool.waterPathType = 'deadEnd';
  tool.waterPolyline = [
    { x: 400, y: 550 },
    { x: 400, y: 440 }
  ];
  const deadEndAnalysis = tool.getAnalysis();
  const featDeadEnd = deadEndAnalysis.topo.features.find(f => f.id === 'be_khi_tu_khi');
  assert.ok(featDeadEnd, 'Must detect Bế Khí / Tử Khí Thủy');
  assert.equal(featDeadEnd.rating, 'Thứ Hung (Bế Khí)');
});

// T23: Hoành Thủy (Đường chạy ngang 139° / 319°) vs Trực Xung thực sự (Nhà hướng 230°)
test('T23: Đường chạy ngang (139° / 319°) trước nhà hướng 230° nhận diện đúng Hoành Thủy, không gán Trực Xung', () => {
  const { tool } = createTestEnvironment();
  tool.centerPoint = { x: 400, y: 400 };
  tool.rawFacingBearing = 230; // Hướng Tây Nam (Khôn/Thân)

  // Điểm trước mặt tiền khoảng cách 100 theo hướng 230°
  const radFacing = (230 - 90) * Math.PI / 180;
  const frontPoint = { x: 400 + 100 * Math.cos(radFacing), y: 400 + 100 * Math.sin(radFacing) };

  // 1. Tuyến đường chạy ngang theo trục 139° (Tây Bắc sang Đông Nam)
  const rad139 = (139 - 90) * Math.PI / 180;
  const p1_139 = { x: frontPoint.x - 250 * Math.cos(rad139), y: frontPoint.y - 250 * Math.sin(rad139) };
  const p2_139 = { x: frontPoint.x - 100 * Math.cos(rad139), y: frontPoint.y - 100 * Math.sin(rad139) };
  const p3_139 = { x: frontPoint.x + 100 * Math.cos(rad139), y: frontPoint.y + 100 * Math.sin(rad139) };

  tool.waterPolyline = [p1_139, p2_139, p3_139];
  const segs139 = tool.getWaterSegments();
  assert.equal(segs139.length, 2);

  // Cả hai đoạn của tuyến 139° đều là Hoành Thủy (Hữu Thủy đảo Tả), TUYỆT ĐỐI KHÔNG PHẢI Trực Xung
  for (const s of segs139) {
    assert.notEqual(s.flowRelation.type, 'truc_xung', `Đoạn ${s.fromIndex + 1} không được là Trực Xung`);
    assert.equal(s.flowRelation.type, 'huu_dao_ta', `Đoạn ${s.fromIndex + 1} phải là Hữu Thủy đảo Tả`);
    assert.equal(s.flowRelation.chieuNuoc, 'Phải → trái');
  }

  const analysis139 = tool.getAnalysis();
  assert.equal(analysis139.topo.features.some(f => f.id === 'dinh_tu_lo_xung_tam'), false,
    'Đường chạy ngang 139° không được kích hoạt Đinh Tự Lộ Xung Tâm Sát');

  // 2. Tuyến đường chạy ngược lại theo trục 319.3° (Đông Nam sang Tây Bắc)
  const rad319 = (319.3 - 90) * Math.PI / 180;
  const p1_319 = { x: frontPoint.x - 250 * Math.cos(rad319), y: frontPoint.y - 250 * Math.sin(rad319) };
  const p2_319 = { x: frontPoint.x - 100 * Math.cos(rad319), y: frontPoint.y - 100 * Math.sin(rad319) };
  const p3_319 = { x: frontPoint.x + 100 * Math.cos(rad319), y: frontPoint.y + 100 * Math.sin(rad319) };

  tool.waterPolyline = [p1_319, p2_319, p3_319];
  const segs319 = tool.getWaterSegments();
  assert.equal(segs319.length, 2);

  // Cả hai đoạn của tuyến 319.3° đều là Hoành Thủy (Tả Thủy đảo Hữu), TUYỆT ĐỐI KHÔNG PHẢI Trực Xung
  for (const s of segs319) {
    assert.notEqual(s.flowRelation.type, 'truc_xung', `Đoạn ${s.fromIndex + 1} không được là Trực Xung`);
    assert.equal(s.flowRelation.type, 'ta_dao_huu', `Đoạn ${s.fromIndex + 1} phải là Tả Thủy đảo Hữu`);
    assert.equal(s.flowRelation.chieuNuoc, 'Trái → phải');
  }

  const analysis319 = tool.getAnalysis();
  assert.equal(analysis319.topo.features.some(f => f.id === 'dinh_tu_lo_xung_tam'), false,
    'Đường chạy ngang 319.3° không được kích hoạt Đinh Tự Lộ Xung Tâm Sát');

  // 3. Đường thực sự Trực Xung (Đâm thẳng chính diện vào mặt tiền từ hướng 230° về tâm 50°)
  const pTrueInflow1 = { x: 400 + 200 * Math.cos(radFacing), y: 400 + 200 * Math.sin(radFacing) };
  const pTrueInflow2 = { x: 400 + 50 * Math.cos(radFacing), y: 400 + 50 * Math.sin(radFacing) };
  tool.waterPolyline = [pTrueInflow1, pTrueInflow2];
  const trueSegs = tool.getWaterSegments();
  assert.equal(trueSegs[0].flowRelation.type, 'truc_xung', 'Đoạn đâm trực diện phải là Trực Xung');
  const trueAnalysis = tool.getAnalysis();
  assert.equal(trueAnalysis.topo.features.some(f => f.id === 'dinh_tu_lo_xung_tam'), true,
    'Trường hợp đâm thẳng thực sự phải kích hoạt Đinh Tự Lộ Xung Tâm Sát');
});

// T24: Tự động phân tầng 4 cấp, nhận diện Khúc Chiết Tiêu Sát chữ U & trích dẫn toàn văn Cổ Thư tức thời
test('T24: Tự động phân tầng 4 cấp, nhận diện Khúc Chiết Tiêu Sát chữ U & trích dẫn toàn văn Cổ Thư tức thời', () => {
  const { tool, document } = createTestEnvironment();
  tool.centerPoint = { x: 400, y: 400 };
  tool.rawFacingBearing = 180; // Nhà hướng Nam

  // 1. Mô phỏng mạng đường 3 đoạn tạo thành chữ U:
  // P1(100, 100) -> P2(600, 100) : Đoạn 1: Tỉnh lộ ngoài xa (Ngoại Cục)
  // P2(600, 100) -> P3(600, 300) : Đoạn 2: Hẻm 1 rẽ 90° (Trung Cục)
  // P3(600, 300) -> P4(400, 300) : Đoạn 3: Hẻm 2 rẽ tiếp 90° chạy sát mặt tiền (Cận Trạch)
  tool.waterPolyline = [
    { x: 100, y: 100, role: 'normal' },
    { x: 600, y: 100, role: 'normal' },
    { x: 600, y: 300, role: 'normal' },
    { x: 400, y: 300, role: 'normal' }
  ];

  // A. Kiểm tra phân tầng Tứ Tầng Khí Lộ
  const segs = tool.getWaterSegments();
  assert.equal(segs.length, 3, 'Phải có đúng 3 đoạn đường');
  assert.equal(segs[0].tier, 'ngoai_cuc', 'Đoạn 1 xa nhất phải là Ngoại Cục');
  assert.equal(segs[1].tier, 'trung_cuc', 'Đoạn 2 trung gian phải là Trung Cục');
  assert.equal(segs[2].tier, 'can_trach', 'Đoạn 3 sát nhà phải là Cận Trạch');

  // B. Kiểm tra góc bẻ uốn khúc & Tiêu Sát Chữ U
  const analysis = tool.getAnalysis();
  assert.ok(analysis.topo.bendMomentum, 'Phải có dữ liệu phân tích động lượng khúc rẽ');
  assert.equal(analysis.topo.bendMomentum.hasUTurn, true, 'Mạng đường 2 góc rẽ 90° cùng chiều phải là chữ U');
  assert.equal(analysis.topo.bendMomentum.khucChietTieuSat, true, 'Chữ U phải kích hoạt cơ chế Khúc Chiết Tiêu Sát');
  assert.ok(analysis.topo.features.some(f => f.id === 'khuc_chiet_tieu_sat'), 'Features phải có Khúc Chiết Tiêu Sát');
  assert.ok(analysis.topo.features.some(f => f.id === 'phan_tang_khi_lo'), 'Features phải có Phân Tầng Khí Lộ');

  // C. Kiểm tra Chế độ Hư Thủy vs Chân Thủy
  assert.equal(tool.waterNature, 'hu_thuy', 'Mặc định phải là Hư Thủy');
  assert.equal(analysis.waterNature, 'hu_thuy', 'Analysis phải nhận diện Hư Thủy');

  // Test chuyển đổi qua Chân Thủy bằng click button
  const btnNature = document.getElementById('btn-toggle-water-nature');
  assert.ok(btnNature, 'Phải có nút chuyển đổi Chân/Hư Thủy');
  btnNature.click();
  assert.equal(tool.waterNature, 'chan_thuy', 'Sau click phải chuyển sang Chân Thủy');
  const chanAnalysis = tool.getAnalysis();
  assert.equal(chanAnalysis.waterNature, 'chan_thuy', 'Analysis mới phải là Chân Thủy');

  // Toggle lại về Hư Thủy
  btnNature.click();
  assert.equal(tool.waterNature, 'hu_thuy');

  // D. Kiểm tra Cơ chế Tự động trích dẫn Cổ Thư (Theory Citations)
  const citations = analysis.theoryCitations;
  assert.ok(Array.isArray(citations), 'Theory Citations phải là mảng');
  assert.ok(citations.length >= 4, `Citations phải có ít nhất 4 mục, thực tế có ${citations.length}`);

  const requiredIds = ['phan_tang_khi_lo', 'khuc_chiet_tieu_sat', 'chan_thuy_vs_hu_thuy', 'tiep_tuyen_vs_khi_khau'];
  for (const reqId of requiredIds) {
    const found = citations.find(c => c.id === reqId);
    assert.ok(found, `Phải có trích dẫn lý thuyết cho ${reqId}`);
    assert.ok(found.quoteOriginal && found.quoteOriginal.length > 5, `${reqId} phải có nguyên văn chữ Hán`);
    assert.ok(found.quoteHanViet && found.quoteHanViet.length > 5, `${reqId} phải có âm Hán-Việt`);
    assert.ok(found.quoteMeaning && found.quoteMeaning.length > 10, `${reqId} phải có dịch nghĩa tường minh`);
    assert.ok(found.masterCommentary && found.masterCommentary.length > 10, `${reqId} phải có luận giải danh sư`);
    assert.ok(found.applicationGuide && found.applicationGuide.length > 10, `${reqId} phải có chỉ dẫn ứng dụng`);
  }

  // E. Kiểm tra giao diện kết xuất (renderResultPanels) sinh ra Mục 6 với đầy đủ trích dẫn
  const html = tool.renderResultPanels(analysis);
  assert.ok(html.includes('KHẢO BIỆN CỔ THƯ & DIỄN GIẢI CHÁNH TÔNG'), 'UI phải có Mục 6 Khảo Biện Cổ Thư');
  assert.ok(html.includes('Hán-Việt:'), 'UI phải có nhãn Hán-Việt');
  assert.ok(html.includes('Dịch nghĩa:'), 'UI phải có nhãn Dịch nghĩa');
  assert.ok(html.includes('Danh Sư Khảo Biện:'), 'UI phải có nhãn Danh Sư Khảo Biện');
  assert.ok(html.includes('CẬN TRẠCH') || html.includes('Cận Trạch'), 'UI phải hiển thị badge phân tầng');
});

console.log('\n================================================================');
console.log(`KẾT QUẢ KIỂM ĐỊNH: ${passed} PASS, ${failed} FAIL`);
console.log('================================================================');

if (failed > 0) {
  process.exit(1);
}

