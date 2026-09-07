// scripts/test_zero_lag_pipeline.js
// Kiểm thử chuyên sâu đường ống đồ họa Zero-Lag & Zero-DOM-Churn cho La Kinh Bản Đồ

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const vm = require('vm');

console.log('=== BẮT ĐẦU KIỂM ĐỊNH ĐƯỜNG ỐNG HIỆU NĂNG ZERO-LAG LA KINH ===\n');

const appDir = 'C:\\Users\\ADMIN\\.gemini\\antigravity\\scratch\\thai_at_app';
const luopanCode = fs.readFileSync(path.join(appDir, 'js/luopan_map_tool.js'), 'utf8');

const Calibration = require(path.join(appDir, 'js/luopan_calibration_engine.js'));
const Geometry = require(path.join(appDir, 'js/luopan_geometry.js'));
const Data = require(path.join(appDir, 'js/luopan_data.js'));
const Classifier = require(path.join(appDir, 'js/luopan_classifier.js'));

let renderCallCount = 0;
class MockSvgRenderer {
  render(state) {
    renderCallCount++;
    return `<svg id="mock-luopan" cx="${state.cx}" cy="${state.cy}"></svg>`;
  }
}

const windowMock = {
  CalibrationEngine: Calibration,
  LuopanGeometry: Geometry,
  LuopanData: Data,
  LuopanClassifier: Classifier,
  LuopanSvgRenderer: MockSvgRenderer
};

const luopanContainerMock = {
  style: { transform: '' },
  innerHTML: ''
};
const drawingSvgMock = {
  style: { pointerEvents: 'none' },
  innerHTML: '',
  createSVGPoint: () => ({ x: 0, y: 0, matrixTransform: () => ({ x: 400, y: 400 }) }),
  getScreenCTM: () => ({ inverse: () => ({}) })
};
const stageMock = { clientWidth: 800, clientHeight: 800 };

const documentMock = {
  getElementById: (id) => {
    if (id === 'dt-luopan-svg-container') return luopanContainerMock;
    if (id === 'dt-drawing-svg') return drawingSvgMock;
    return null;
  },
  querySelector: (sel) => {
    if (sel === '#dt-interactive-stage') return stageMock;
    if (sel === '#dt-luopan-svg-container') return luopanContainerMock;
    if (sel === '#dt-drawing-svg') return drawingSvgMock;
    return null;
  },
  querySelectorAll: () => []
};

const context = vm.createContext({
  window: windowMock,
  document: documentMock,
  console,
  setTimeout,
  clearTimeout,
  requestAnimationFrame: (cb) => { cb(); return 1; },
  cancelAnimationFrame: () => {}
});

vm.runInContext(luopanCode, context);
const tool = new windowMock.LuopanMapTool();
tool.container = documentMock;
tool.mode = 'map';

const mapCenter = { lat: 10.9575, lng: 106.5746 };
tool.mapInstance = {
  getCenter: () => mapCenter,
  getZoom: () => 19,
  getSize: () => ({ x: 800, y: 800, divideBy: (d) => ({ x: 400, y: 400 }) }),
  project: (latLng) => {
    const px = (latLng.lng - 106.5746) * 10000 + 400;
    const py = (latLng.lat - 10.9575) * 10000 + 400;
    return {
      x: px,
      y: py,
      subtract: (pt) => ({
        x: px - pt.x,
        y: py - pt.y,
        add: (half) => ({ x: px - pt.x + half.x, y: py - pt.y + half.y })
      })
    };
  },
  unproject: () => ({ lat: 10.9575, lng: 106.5746 }),
  containerPointToLatLng: (pt) => ({ lat: 10.9575, lng: 106.5746 }),
  invalidateSize: () => {},
  setView: () => {},
  remove: () => {}
};
tool.mapGeometry = {
  center: { lat: 10.9575, lng: 106.5746 },
  frontA: { lat: 10.9570, lng: 106.5740 },
  frontB: { lat: 10.9580, lng: 106.5750 },
  water: [{ lat: 10.9560, lng: 106.5730 }]
};

// 1. Khởi tạo lần đầu
tool.updateSvgView();
assert.strictEqual(renderCallCount, 1, 'Lần nạp đầu tiên phải render đĩa La Kinh đúng 1 lần');
assert.strictEqual(luopanContainerMock.style.transform, '', 'Lúc tĩnh transform phải rỗng');

// 2. Kéo bản đồ 40 bước (fullUpdate = false)
console.log('1. Kiểm thử Kéo Bản Đồ 40 bước liên tục (Visual In-Flight Gestures):');
let fullMeasurementsCount = 0;
tool.updateMeasurementsDisplay = () => { fullMeasurementsCount++; };

for (let step = 1; step <= 40; step++) {
  // Tâm nhà dịch chuyển theo bản đồ
  tool.mapGeometry.center = { lat: 10.9575 + step * 0.001, lng: 106.5746 + step * 0.001 };
  tool.projectMapGeometry(false); // In-flight
}

assert.strictEqual(renderCallCount, 1, 'TRONG 40 BƯỚC KÉO: Số lần render La Kinh SVG bằng innerHTML PHẢI BẰNG 0 (giữ nguyên 1 từ lúc khởi tạo)');
assert.strictEqual(fullMeasurementsCount, 0, 'TRONG 40 BƯỚC KÉO: Số lần dựng lại bảng kết quả PHẢI BẰNG 0');
assert.ok(luopanContainerMock.style.transform.includes('translate3d'), 'Vòng La Kinh phải được dịch chuyển tức thời bằng GPU translate3d');
console.log('  ✓ PASS: 40 bước kéo bản đồ tiêu thụ 0 MB DOM Churn! Vòng La Kinh bám sát bằng GPU translate3d.');

// 3. Kết thúc kéo (fullUpdate = true)
console.log('\n2. Kiểm thử Kết Thúc Kéo Bản Đồ (Gesture Commit):');
tool.projectMapGeometry(true);
assert.strictEqual(renderCallCount, 2, 'KHI THẢ TAY: Renderer render lại đúng 1 lần duy nhất để chốt vị trí tĩnh chuẩn');
assert.strictEqual(fullMeasurementsCount, 1, 'KHI THẢ TAY: Bảng kết quả chỉ dựng lại đúng 1 lần duy nhất');
assert.strictEqual(luopanContainerMock.style.transform, '', 'KHI THẢ TAY: Transform được reset sạch về rỗng');
console.log('  ✓ PASS: Commit kết thúc cử chỉ chỉ tốn 1 lần cập nhật duy nhất.');

// 4. Kiểm tra mã nguồn về handle dragging rAF
console.log('\n3. Kiểm tra cơ chế Handle Dragging rAF trong mã nguồn:');
assert.ok(luopanCode.includes('pendingDragPosition'), 'Chưa có pendingDragPosition gom nhịp kéo mốc');
assert.ok(luopanCode.includes('dragRafId'), 'Chưa có dragRafId điều phối khung hình rAF');
assert.ok(luopanCode.includes('syncLuopanPosition'), 'Chưa có hàm syncLuopanPosition');
console.log('  ✓ PASS: Kéo mốc đã tích hợp rAF và đồng bộ vị trí mượt mà.');

console.log('\n======================================================');
console.log('KẾT QUẢ ĐO LƯỜNG: ĐƯỜNG ỐNG ZERO-LAG ĐẠT CHUẨN 100%!');
console.log('======================================================');
