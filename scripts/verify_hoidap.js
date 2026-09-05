// =========================================================================
// TEST NGHIỆM THU: VẤN ĐÁP CỔ PHÁP — BÁCH CỤC THỦY KHẨU
// =========================================================================

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
console.log('--- BẮT ĐẦU KIỂM ĐỊNH TOÀN DIỆN PHÂN HỆ VẤN ĐÁP CỔ PHÁP ---');

// 1. Kiểm tra sự tồn tại của các file
const requiredFiles = [
  'data/hoidap_data.json',
  'js/hoidap_data.js',
  'js/hoidap_ui.js',
  'css/hoidap.css',
  'index.html',
  'js/router.js'
];

for (const f of requiredFiles) {
  const fullPath = path.join(rootDir, f);
  if (!fs.existsSync(fullPath)) {
    console.error(`[FAIL] Thiếu tệp: ${f}`);
    process.exit(1);
  }
  console.log(`[PASS] Tệp hiện hữu: ${f} (${fs.statSync(fullPath).size} bytes)`);
}

// 2. Kiểm tra tính toàn vẹn của JSON dữ liệu
const jsonContent = JSON.parse(fs.readFileSync(path.join(rootDir, 'data/hoidap_data.json'), 'utf8'));
const chapters = jsonContent.chapters;
const items = jsonContent.items;

if (chapters.length !== 10) {
  console.error(`[FAIL] Số lượng chương sai: ${chapters.length} (kỳ vọng 10)`);
  process.exit(1);
}
console.log(`[PASS] Đủ 10 chương học thuật.`);

if (items.length !== 100) {
  console.error(`[FAIL] Số lượng câu hỏi sai: ${items.length} (kỳ vọng 100)`);
  process.exit(1);
}
console.log(`[PASS] Đủ 100 câu hỏi - đáp chánh tông.`);

// 3. Kiểm tra mỗi chương đúng 10 câu
for (let c = 1; c <= 10; c++) {
  const chItems = items.filter(it => it.chapter === c);
  if (chItems.length !== 10) {
    console.error(`[FAIL] Chương ${c} có ${chItems.length} câu (kỳ vọng đúng 10)`);
    process.exit(1);
  }
  const chTitle = chapters[c - 1].title;
  console.log(`[PASS] Chương ${c} [${chTitle}]: đúng 10 điều (từ ${chItems[0].index} đến ${chItems[9].index})`);
}

// 4. Kiểm tra tiêu đề 2-4 chữ, không emoji, không mã máy
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
const machineCodeRegex = /\b(DC|TK)[-_]\d+\b/i;

let errorCount = 0;
for (const it of items) {
  const words = it.title.trim().split(/\s+/);
  if (words.length < 2 || words.length > 4) {
    console.error(`[FAIL] Câu ${it.index}: tiêu đề "${it.title}" có ${words.length} chữ (kỳ vọng 2-4 chữ)`);
    errorCount++;
  }
  if (emojiRegex.test(it.title) || emojiRegex.test(it.subtitle)) {
    console.error(`[FAIL] Câu ${it.index}: phát hiện emoji trong tiêu đề`);
    errorCount++;
  }
  if (machineCodeRegex.test(it.title)) {
    console.error(`[FAIL] Câu ${it.index}: phát hiện mã máy trong tiêu đề: ${it.title}`);
    errorCount++;
  }
  if (!it.topo || !it.hanzi || !it.hanviet || !it.qi_mechanism || !it.hoa_phuc || !it.remediation) {
    console.error(`[FAIL] Câu ${it.index}: thiếu phân mục học thuật`);
    errorCount++;
  }
}

if (errorCount > 0) {
  console.error(`[FAIL] Phát hiện ${errorCount} lỗi trong dữ liệu!`);
  process.exit(1);
}
console.log(`[PASS] Toàn bộ 100 tiêu đề đạt chuẩn 2-4 chữ cổ phong, 0 emoji, 0 mã máy, đủ 6 phân mục.`);

// 4.5. Kiểm tra Họa Phúc Ngũ Phương: 100% Văn xuôi, 0 ký tự bảng vỡ |, tách bạch tuyệt đối Cát và Hung
let hoaphucError = 0;
for (const it of items) {
  const hp = it.hoa_phuc;
  if (hp.includes('|')) {
    console.error(`[FAIL] Điều ${it.index}: Họa Phúc vẫn còn ký tự bảng vỡ |`);
    hoaphucError++;
  }
  if (!hp.includes('**Khi Hợp Cách (Cát Khánh):**') || !hp.includes('**Khi Phạm Cách (Hung Họa):**')) {
    console.error(`[FAIL] Điều ${it.index}: Họa Phúc thiếu khối Cát Khánh hoặc Hung Họa`);
    hoaphucError++;
  }
  const aspects = ['Tài lộc', 'Nhân đinh', 'Tật ách', 'Gia đạo', 'Quan vận'];
  for (const asp of aspects) {
    const regex = new RegExp(`\\*\\*${asp}:?\\*\\*:?`, 'g');
    if ((hp.match(regex) || []).length < 2) {
      console.error(`[FAIL] Điều ${it.index}: Họa Phúc thiếu phương diện ${asp} ở 2 vế Cát/Hung`);
      hoaphucError++;
    }
  }
}

if (hoaphucError > 0) {
  console.error(`[FAIL] Phát hiện ${hoaphucError} lỗi trong Họa Phúc Ngũ Phương!`);
  process.exit(1);
}
console.log(`[PASS] 100/100 Điều: Họa Phúc Ngũ Phương đạt chuẩn 100% văn xuôi, 0 ký hiệu bảng vỡ, tách bạch tuyệt đối Cát Khánh và Hung Họa.`);

// 5. Kiểm tra HTML tích hợp
const htmlContent = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
if (!htmlContent.includes('id="gate-hoidap"')) {
  console.error('[FAIL] index.html thiếu id="gate-hoidap"');
  process.exit(1);
}
if (!htmlContent.includes('hoidap_data.js') || !htmlContent.includes('hoidap_ui.js') || !htmlContent.includes('hoidap.css')) {
  console.error('[FAIL] index.html thiếu nạp script/css của hoidap');
  process.exit(1);
}
console.log('[PASS] index.html tích hợp đầy đủ gate-hoidap, script và stylesheet.');

// 6. Kiểm tra Router tích hợp
const routerContent = fs.readFileSync(path.join(rootDir, 'js/router.js'), 'utf8');
if (!routerContent.includes("'van-dap'") || !routerContent.includes('renderHoiDap')) {
  console.error('[FAIL] router.js thiếu route van-dap hoặc renderHoiDap');
  process.exit(1);
}
console.log('[PASS] router.js tích hợp đầy đủ route và renderHoiDap.');

// 7. Mô phỏng chạy giao diện trong môi trường DOM
const mockDocument = {
  getElementById: (id) => {
    if (id === 'gate-hoidap') {
      return {
        innerHTML: '',
        style: {},
        querySelector: () => null
      };
    }
    return null;
  }
};
global.window = {
  HOIDAP_CHAPTERS: chapters,
  HOIDAP_DATA: items,
  scrollTo: () => {}
};
global.document = mockDocument;

// Nạp hoidap_ui.js
eval(fs.readFileSync(path.join(rootDir, 'js/hoidap_ui.js'), 'utf8'));

if (!global.window.hoidapUI) {
  console.error('[FAIL] window.hoidapUI không được khởi tạo');
  process.exit(1);
}

// Chạy render chương 1
global.window.hoidapUI.render({ chapter: 1 });
console.log('[PASS] window.hoidapUI.render({ chapter: 1 }) thực thi thành công.');

// Chạy tìm kiếm
global.window.hoidapUI.onSearch('Hoàng Tuyền');
console.log('[PASS] window.hoidapUI.onSearch("Hoàng Tuyền") thực thi thành công.');

// Chạy toàn bách cục
global.window.hoidapUI.selectChapter(0);
console.log('[PASS] window.hoidapUI.selectChapter(0) [Toàn Bách Cục] thực thi thành công.');

// Chạy thử nghiệm bật/tắt Hán văn
mockDocument.querySelectorAll = () => [];
global.window.hoidapUI.toggleHanzi();
console.log('[PASS] window.hoidapUI.toggleHanzi() [Tắt Hán Văn] thực thi thành công.');
global.window.hoidapUI.toggleHanzi();
console.log('[PASS] window.hoidapUI.toggleHanzi() [Bật Hán Văn] thực thi thành công.');

console.log('\n=== TẤT CẢ 8 BÀI TEST ĐẠT KẾT QUẢ PASS TUYỆT ĐỐI (100%) ===');
