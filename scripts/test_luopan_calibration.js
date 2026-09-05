'use strict';

// Focused regressions for the existing La Kinh map/calibration workflow.
// Run: node scripts/test_luopan_calibration.js
// Real satellite tiles, touch gestures and layout require browser verification.
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

function near(actual, expected, message) {
  assert.ok(Math.abs(actual - expected) < 1e-7,
    `${message}: expected ${expected}, received ${actual}`);
}

test('One shared offset preserves house/Lai/Khu relative bearings, including wraparound', () => {
  const cases = [
    { house: 180, measured: 226, lai: 310.6, khu: 130.6, offset: 46 },
    { house: 358, measured: 2, lai: 355, khu: 175, offset: 4 },
    { house: 2, measured: 358, lai: 5, khu: 185, offset: -4 },
    { house: 10, measured: 190, lai: 350, khu: 170, offset: 180 }
  ];
  for (const item of cases) {
    const offset = Calibration.computeOffset(item.house, item.measured);
    near(offset, item.offset, 'Signed offset');
    const house = Calibration.calibrate(item.house, offset);
    near(house, item.measured, 'Calibrated facing');
    for (const raw of [item.lai, item.khu]) {
      const effective = Calibration.calibrate(raw, offset);
      assert.ok(effective >= 0 && effective < 360);
      near(Calibration.computeRelativeBearing(house, effective),
        Calibration.computeRelativeBearing(item.house, raw), 'Relative angle is unchanged');
    }
  }
});

test('Document example uses existing Sơn, Can/Chi/Quái and trigram metadata', () => {
  const result = new Classifier().classify({
    facingBearing: 226, laiBearing: 356.6, khuBearing: 176.6,
    offset: 46, isLocked: true
  });
  const expected = [
    [result.facing, 226, 'Khôn', 'Quái', 'Khôn'],
    [result.sitting, 46, 'Cấn', 'Quái', 'Cấn'],
    [result.lai, 356.6, 'Tý', 'Chi', 'Khảm'],
    [result.khu, 176.6, 'Ngọ', 'Chi', 'Ly']
  ];
  for (const [item, bearing, name, type, trigram] of expected) {
    near(item.bearing, bearing, `${name} bearing`);
    assert.equal(item.mountain.name, name);
    assert.equal(item.mountain.type, type);
    assert.equal(item.mountain.trigram, trigram);
    assert.strictEqual(item.mountain, Data.getMountain(bearing).mountain);
  }
});

test('All 24 Sơn retain dataset identity/types and existing half-open sector boundaries', () => {
  const classifier = new Classifier();
  assert.equal(Data.MOUNTAINS_24.length, 24);
  for (const [index, mountain] of Data.MOUNTAINS_24.entries()) {
    const next = Data.MOUNTAINS_24[(index + 1) % Data.MOUNTAINS_24.length];
    const result = classifier.classify({
      facingBearing: mountain.center, laiBearing: mountain.center, khuBearing: mountain.center
    });
    for (const item of [result.facing, result.lai, result.khu]) {
      assert.strictEqual(item.mountain, mountain);
      assert.ok(['Can', 'Chi', 'Quái'].includes(item.mountain.type));
      assert.equal(Data.getTrigram(item.bearing).trigram.name, item.mountain.trigram);
    }
    assert.strictEqual(Data.getMountain(mountain.start).mountain, mountain);
    assert.strictEqual(Data.getMountain(mountain.end - 0.0001).mountain, mountain);
    assert.strictEqual(Data.getMountain(mountain.end).mountain, next);
  }
  for (const bearing of [-0.001, 0, 360, 720, 359.999]) {
    assert.equal(classifier.evaluateUncertainty(bearing).mountain.name, 'Tý');
  }
});

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

function createMapTool() {
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
    'btn-reverse-water': button()
  };
  const mapMount = { id: 'dt-map-mount' };
  elements['dt-map-mount'] = mapMount;
  const document = {
    getElementById: id => elements[id] || null,
    querySelector: () => null,
    querySelectorAll: () => []
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
  tool.mapInstance = {
    getContainer: () => mapMount,
    getCenter: () => ({ lat: 10.7769, lng: 106.7009 }),
    getZoom: () => 18,
    invalidateSize() {},
    remove() { assert.fail('Calibration must not destroy the map'); }
  };
  tool.renderLayout = () => assert.fail('Calibration must not replace the map DOM with renderLayout()');
  tool.initInteractiveCanvas = () => assert.fail('Calibration must not recreate drawing listeners');
  tool.initLeafletMap = () => assert.fail('Calibration must not recreate the satellite map');
  // Isolate state/callback regressions; rendered DOM is checked in the browser.
  for (const method of ['updateMeasurementsDisplay', 'updateSvgView', 'updateCalibrationUI',
    'updateResultPanel', 'renderDrawingElements', 'updateViewTransform']) {
    tool[method] = () => {};
  }
  tool.recalculateRawBearings();
  tool.waterPolyline = [
    Geometry.polarToSvgCartesian(400, 400, 250, 310.6),
    { x: 400, y: 270 },
    Geometry.polarToSvgCartesian(400, 400, 250, 130.6)
  ];
  tool.bindEvents();
  return { tool, elements, document };
}

function snapshotGeometry(tool) {
  return JSON.stringify({ center: tool.centerPoint, frontage: tool.frontageLine, water: tool.waterPolyline });
}

function snapshotBearings(tool) {
  return [tool.getEffectiveFacingBearing(), tool.getEffectiveLaiBearing(), tool.getEffectiveKhuBearing()];
}

test('TC-01/03: actual lock/unlock handlers retain map, geometry and selection state', () => {
  const { tool, elements, document } = createMapTool();
  const originalMap = tool.mapInstance;
  const originalMount = document.getElementById('dt-map-mount');
  const originalGeometry = snapshotGeometry(tool);
  elements['btn-lock-calibration'].click();
  assert.equal(tool.isCalibrationLocked, true);
  near(tool.calibrationOffset, 46, 'Offset after locking 226 degrees');
  near(tool.getEffectiveFacingBearing(), 226, 'Effective house');
  near(tool.getEffectiveLaiBearing(), 356.6, 'Effective Lai');
  near(tool.getEffectiveKhuBearing(), 176.6, 'Effective Khu');
  assert.strictEqual(tool.mapInstance, originalMap);
  assert.strictEqual(document.getElementById('dt-map-mount'), originalMount);
  assert.equal(snapshotGeometry(tool), originalGeometry);
  elements['step-btn-select'].click();
  assert.equal(tool.activeDrawTool, 'select');
  elements['btn-lock-calibration'].click();
  assert.equal(tool.isCalibrationLocked, false);
  near(tool.getEffectiveFacingBearing(), 180, 'Unlock restores raw facing');
  assert.strictEqual(tool.mapInstance, originalMap);
  assert.strictEqual(document.getElementById('dt-map-mount'), originalMount);
  assert.equal(snapshotGeometry(tool), originalGeometry);
  assert.deepEqual(tool.mapInstance.getCenter(), { lat: 10.7769, lng: 106.7009 });
  assert.equal(tool.mapInstance.getZoom(), 18);
});

test('TC-02: editing frontage after locking keeps house locked at measured bearing and updates offset', () => {
  const { tool, elements } = createMapTool();
  elements['btn-lock-calibration'].click();
  const originalMap = tool.mapInstance;
  const offset = tool.calibrationOffset;
  tool.waterPolyline[0] = Geometry.polarToSvgCartesian(400, 400, 250, 29);
  tool.waterPolyline[2] = Geometry.polarToSvgCartesian(400, 400, 250, 299);
  near(tool.getEffectiveLaiBearing(), 75, 'Edited Lai uses existing +46 offset');
  near(tool.getEffectiveKhuBearing(), 345, 'Edited Khu uses existing +46 offset');
  const result = tool.classifier.classify({
    facingBearing: tool.getEffectiveFacingBearing(),
    laiBearing: tool.getEffectiveLaiBearing(), khuBearing: tool.getEffectiveKhuBearing(),
    offset: tool.calibrationOffset, isLocked: tool.isCalibrationLocked
  });
  assert.equal(result.lai.mountain.name, 'Giáp');
  assert.equal(result.lai.mountain.type, 'Can');
  assert.equal(result.khu.mountain.name, 'Nhâm');
  assert.equal(result.khu.mountain.type, 'Can');
  tool.frontageLine.pB = { x: 510, y: 470 };
  tool.recalculateRawBearings();
  near(tool.getEffectiveFacingBearing(), 226,
    'Effective facing remains locked at measured bearing 226');
  near(tool.calibrationOffset, Calibration.computeOffset(tool.rawFacingBearing, 226),
    'Offset updates dynamically');
  for (const [raw, effective] of [
    [tool.getRawLaiBearing(), tool.getEffectiveLaiBearing()],
    [tool.getRawKhuBearing(), tool.getEffectiveKhuBearing()]
  ]) {
    near(Calibration.computeRelativeBearing(tool.getEffectiveFacingBearing(), effective),
      Calibration.computeRelativeBearing(tool.rawFacingBearing, raw), 'Edited relative angle');
  }
  assert.equal(tool.isCalibrationLocked, true);
  assert.strictEqual(tool.mapInstance, originalMap);

  // When locked, flipping frontside should be ignored to protect invariant
  const frontSideBefore = tool.frontageLine.frontSide;
  elements['btn-flip-frontside'].click();
  assert.equal(tool.frontageLine.frontSide, frontSideBefore, 'Flip frontage ignored when locked');
  near(tool.getEffectiveFacingBearing(), 226, 'Facing still strictly locked at 226');

  const editedGeometry = snapshotGeometry(tool);
  elements['btn-lock-calibration'].click();
  assert.equal(snapshotGeometry(tool), editedGeometry, 'Unlock retains edited geometry');
});

test('North Up / Facing Up change the view without changing calibrated data or geometry', () => {
  const { tool, elements } = createMapTool();
  elements['btn-lock-calibration'].click();
  const geometry = snapshotGeometry(tool);
  const bearings = snapshotBearings(tool);
  for (const id of ['btn-facing-up', 'btn-north-up']) {
    elements[id].click();
    assert.deepEqual(snapshotBearings(tool), bearings);
    assert.equal(snapshotGeometry(tool), geometry);
    near(tool.calibrationOffset, 46, 'View retains calibration offset');
  }
});

test('TC-04: result panel renders both Lai/Khứ degrees and dataset terminology after editing', () => {
  const { tool, elements } = createMapTool();
  elements['btn-lock-calibration'].click();
  let html = tool.renderResultPanels();
  for (const text of ['356.60°', '176.60°', 'Tý Sơn · Chi · Khảm Quái', 'Ngọ Sơn · Chi · Ly Quái']) {
    assert.ok(html.includes(text), `Result panel must display ${text}`);
  }
  tool.waterPolyline[0] = Geometry.polarToSvgCartesian(400, 400, 250, 29);
  tool.waterPolyline[2] = Geometry.polarToSvgCartesian(400, 400, 250, 299);
  html = tool.renderResultPanels();
  for (const text of ['75.00°', '345.00°', 'Giáp Sơn · Can · Chấn Quái', 'Nhâm Sơn · Can · Khảm Quái']) {
    assert.ok(html.includes(text), `Edited result panel must display ${text}`);
  }
});

test('An absent water line stays unclassified instead of displaying an invented north bearing', () => {
  const { tool } = createMapTool();
  tool.waterPolyline = [];
  tool.isCalibrationLocked = true;
  tool.calibrationOffset = 46;
  assert.equal(tool.getEffectiveLaiBearing(), null);
  assert.equal(tool.getEffectiveKhuBearing(), null);
  const result = tool.classifier.classify({ facingBearing: 226, laiBearing: null, khuBearing: null });
  assert.equal(result.lai, null);
  assert.equal(result.khu, null);
});

test('Multi-vertex water path (8 points) and Dead-End (Hẻm cụt) logic', () => {
  const { tool, elements } = createMapTool();

  // Test multi-point polyline (8 points)
  tool.waterPolyline = [
    { x: 100, y: 100 },
    { x: 150, y: 120 },
    { x: 200, y: 180 },
    { x: 250, y: 220 },
    { x: 300, y: 300 },
    { x: 350, y: 320 },
    { x: 400, y: 400 },
    { x: 500, y: 450 }
  ];
  tool.flowDirection = 'forward';
  let pts = tool.getWaterPoints();
  assert.deepEqual(pts.pLai, { x: 100, y: 100 });
  assert.deepEqual(pts.pKhu, { x: 500, y: 450 });
  assert.equal(pts.pDeadEnd, null);

  // Reverse flow in through mode
  tool.flowDirection = 'reverse';
  pts = tool.getWaterPoints();
  assert.deepEqual(pts.pLai, { x: 500, y: 450 });
  assert.deepEqual(pts.pKhu, { x: 100, y: 100 });
  assert.equal(pts.pDeadEnd, null);

  // Switch to Dead-End (Hẻm cụt)
  elements['btn-toggle-deadend'].click();
  assert.equal(tool.waterPathType, 'deadEnd');

  // Reverse flow in deadEnd: Lai is entry (last), deadEnd is house side (first)
  pts = tool.getWaterPoints();
  assert.deepEqual(pts.pLai, { x: 500, y: 450 });
  assert.equal(pts.pKhu, null);
  assert.deepEqual(pts.pDeadEnd, { x: 100, y: 100 });
  assert.equal(tool.getRawKhuBearing(), null);
  assert.equal(tool.getEffectiveKhuBearing(), null);

  // Forward flow in deadEnd: Lai is entry (first), deadEnd is house side (last)
  tool.flowDirection = 'forward';
  pts = tool.getWaterPoints();
  assert.deepEqual(pts.pLai, { x: 100, y: 100 });
  assert.equal(pts.pKhu, null);
  assert.deepEqual(pts.pDeadEnd, { x: 500, y: 450 });
  assert.equal(tool.getRawKhuBearing(), null);
  assert.equal(tool.getEffectiveKhuBearing(), null);

  // Result panel rendering for deadEnd
  tool.isCalibrationLocked = true;
  tool.calibrationOffset = 0;
  const html = tool.renderResultPanels();
  assert.ok(html.includes('Không xác lập — Hẻm cụt') || html.includes('Hẻm cụt (không có Khứ)'),
    'Result panel handles deadEnd gracefully');

  // Toggle back to through
  elements['btn-toggle-deadend'].click();
  assert.equal(tool.waterPathType, 'through');
  assert.notEqual(tool.getRawKhuBearing(), null);
});

console.log(`\nLa Kinh regressions: ${passed} passed, ${failed} failed.`);
if (failed) process.exitCode = 1;
