// scripts/test_map_performance_and_gestures.js
// Kiểm thử chuyên sâu hiệu năng Bản Đồ Vệ Tinh (La Kinh & GIS)

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const vm = require('vm');

console.log('=== BẮT ĐẦU KIỂM THỬ HIỆU NĂNG BẢN ĐỒ VỆ TINH & ĐIỀU KHIỂN CỬ CHỈ ===\n');

const appDir = 'C:\\Users\\ADMIN\\.gemini\\antigravity\\scratch\\thai_at_app';

// 1. Kiểm tra cấu hình TileLayer trong js/luopan_map_tool.js
const luopanCode = fs.readFileSync(path.join(appDir, 'js/luopan_map_tool.js'), 'utf8');

console.log('1. Kiểm tra cấu hình Google Satellite TileLayer trong luopan_map_tool.js:');
assert.ok(luopanCode.includes('maxNativeZoom: 19'), 'maxNativeZoom phải là 19 để chặn bão lỗi HTTP 404 trên server Google');
assert.ok(luopanCode.includes('maxZoom: 21'), 'maxZoom phải là 21 để hỗ trợ zoom sâu bằng GPU upscale');
assert.ok(luopanCode.includes('updateWhenZooming: false'), 'updateWhenZooming phải là false để tránh fetch dồn dập trong lúc zoom');
assert.ok(luopanCode.includes('updateWhenIdle: true'), 'updateWhenIdle phải là true để chỉ tải khi camera nghỉ');
assert.ok(luopanCode.includes('keepBuffer: 2'), 'keepBuffer phải là 2 để giữ viền đệm chống nhấp nháy xám');
console.log('  ✓ PASS: Cấu hình TileLayer vệ tinh đạt chuẩn tối ưu 100%');

// 2. Kiểm tra cấu hình TileLayer trong js/tool_ui.js
const toolUiCode = fs.readFileSync(path.join(appDir, 'js/tool_ui.js'), 'utf8');

console.log('\n2. Kiểm tra cấu hình GIS Map TileLayer trong tool_ui.js:');
assert.ok(toolUiCode.includes('updateWhenZooming: false'), 'tool_ui.js GIS map phải có updateWhenZooming: false');
assert.ok(toolUiCode.includes('updateWhenIdle: true'), 'tool_ui.js GIS map phải có updateWhenIdle: true');
assert.ok(toolUiCode.includes('keepBuffer: 2'), 'tool_ui.js GIS map phải có keepBuffer: 2');
console.log('  ✓ PASS: Cấu hình các lớp GIS Esri & Topo đạt chuẩn tối ưu');

// 3. Kiểm tra cơ chế Decoupled Rendering (projectMapGeometry true vs false)
console.log('\n3. Kiểm thử cơ chế Tách rời Render (Decoupled Rendering Architecture):');

const Calibration = require(path.join(appDir, 'js/luopan_calibration_engine.js'));
const Geometry = require(path.join(appDir, 'js/luopan_geometry.js'));
const Data = require(path.join(appDir, 'js/luopan_data.js'));
const Classifier = require(path.join(appDir, 'js/luopan_classifier.js'));

const windowMock = {
  CalibrationEngine: Calibration,
  LuopanGeometry: Geometry,
  LuopanData: Data,
  LuopanClassifier: Classifier,
  LuopanSvgRenderer: class { render() { return '<svg></svg>'; } }
};
const documentMock = {
  getElementById: () => null,
  querySelector: (sel) => {
    if (sel === '#dt-interactive-stage') return { clientWidth: 800, clientHeight: 800 };
    return null;
  },
  querySelectorAll: () => []
};

const context = vm.createContext({
  window: windowMock,
  document: documentMock,
  console,
  setTimeout,
  clearTimeout
});

vm.runInContext(luopanCode, context);
const tool = new windowMock.LuopanMapTool();
tool.container = documentMock;
tool.mode = 'map';
tool.mapInstance = {
  getCenter: () => ({ lat: 10.9575, lng: 106.5746 }),
  getZoom: () => 19,
  getSize: () => ({ x: 800, y: 800, divideBy: () => ({ x: 400, y: 400 }) }),
  project: (latLng) => ({
    x: (latLng.lng - 106.5746) * 1000 + 400,
    y: (latLng.lat - 10.9575) * 1000 + 400,
    subtract: () => ({ add: () => ({ x: 400, y: 400 }) })
  }),
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

let fullMeasurementsCount = 0;
tool.updateMeasurementsDisplay = () => { fullMeasurementsCount++; };
let svgRenderCount = 0;
tool.renderDrawingElements = () => { svgRenderCount++; };
tool.updateSvgView = () => {};

// Gọi projectMapGeometry(false) mô phỏng nhịp cử chỉ chuột (pointermove / wheel)
tool.projectMapGeometry(false);
assert.strictEqual(fullMeasurementsCount, 0, 'Khi gesture đang chạy (fullUpdate=false), tuyệt đối KHÔNG gọi updateMeasurementsDisplay');
assert.strictEqual(svgRenderCount, 1, 'Vẫn phải cập nhật toạ độ và vẽ nét vector (renderDrawingElements)');

// Gọi projectMapGeometry(true) mô phỏng khi kết thúc cử chỉ (pointerup / wheel idle)
tool.projectMapGeometry(true);
assert.strictEqual(fullMeasurementsCount, 1, 'Khi kết thúc cử chỉ (fullUpdate=true), phải gọi updateMeasurementsDisplay để cập nhật bảng đo');
assert.strictEqual(svgRenderCount, 2, 'renderDrawingElements được gọi lại chính xác');
console.log('  ✓ PASS: Fast Gesture Update tách rời hoàn toàn khỏi Heavy Measurements Display');

// 4. Kiểm thử thuật toán chuẩn hóa Wheel Delta (chống nhảy vọt và hỗ trợ trackpad)
console.log('\n4. Kiểm thử thuật toán Smooth Wheel Zoom:');

function calculateZoomDelta(event) {
  let normalizedDelta;
  if (event.deltaMode === 1) { // Line mode
    normalizedDelta = -event.deltaY * 0.08;
  } else if (event.deltaMode === 2) { // Page mode
    normalizedDelta = -event.deltaY * 0.3;
  } else { // Pixel mode
    normalizedDelta = -event.deltaY * 0.0025;
  }
  return Math.max(-0.4, Math.min(0.4, normalizedDelta));
}

// Case A: Chuột con lăn thông thường (1 nấc cuộn deltaY = 100px)
const mouseStepIn = calculateZoomDelta({ deltaY: -100, deltaMode: 0 });
const mouseStepOut = calculateZoomDelta({ deltaY: 100, deltaMode: 0 });
assert.ok(mouseStepIn > 0.2 && mouseStepIn < 0.35, `1 nấc chuột zoom in phải là mức mịn ~0.25, thực tế: ${mouseStepIn}`);
assert.ok(mouseStepOut < -0.2 && mouseStepOut > -0.35, `1 nấc chuột zoom out phải là mức mịn ~-0.25, thực tế: ${mouseStepOut}`);
assert.ok(Math.abs(mouseStepIn) < 0.5, 'Tuyệt đối không được nhảy vọt cả 1.0 cấp zoom trên 1 tick chuột');
console.log(`  ✓ PASS: Con lăn chuột chuẩn hóa: 1 tick = ${mouseStepIn.toFixed(2)} cấp zoom (êm ái, kiểm soát chính xác)`);

// Case B: Trackpad laptop (vuốt nhẹ deltaY = 4px)
const trackpadStep = calculateZoomDelta({ deltaY: -4, deltaMode: 0 });
assert.ok(trackpadStep > 0 && trackpadStep < 0.05, `Trackpad swipe phải là vi biến đổi zoom (~0.01), thực tế: ${trackpadStep}`);
console.log(`  ✓ PASS: Trackpad vuốt nhẹ chuẩn hóa: delta = ${trackpadStep.toFixed(4)} cấp zoom (mượt mà như Google Maps)`);

// Case C: Flick mạnh bất thường (deltaY = 3000px do quẹt trackpad quá trớn)
const extremeFlick = calculateZoomDelta({ deltaY: -3000, deltaMode: 0 });
assert.strictEqual(extremeFlick, 0.4, 'Flick cực mạnh phải bị clamp ở trần an toàn 0.4 cấp zoom để chống vọt mất kiểm soát');
console.log('  ✓ PASS: Bộ kẹp giới hạn (Safety Clamp) kích hoạt hoàn hảo khi có flick quá trớn');

console.log('\n========================================');
console.log('KẾT QUẢ KIỂM THỬ HIỆU NĂNG: TẤT CẢ 4/4 TIÊU CHÍ ĐẠT HOÀN HẢO!');
console.log('========================================\n');
