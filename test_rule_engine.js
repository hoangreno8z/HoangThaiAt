const MasterRuleEngine = require('./js/master_rule_engine.js');
const engine = new MasterRuleEngine();
let passed = 0;
let total = 0;

function assert(condition, message) {
  total++;
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
  }
}

console.log('=== BẮT ĐẦU UNIT TESTS ĐỘNG CƠ TÍNH TOÁN (PHASE 9) ===\n');

// 1. Test Bát Trạch Nam Sinh 1980 (Canh Thân) -> Modulo: 1+9+8+0 = 18 = 9 -> 11 - 9 = 2 (Khôn Thổ - Tây Tứ Mệnh)
const res1980M = engine.calculateBatTrachGua(1980, 'Nam');
assert(res1980M.guaNumber === 2, 'Nam 1980 phải là Cung Khôn (2)');
assert(res1980M.group === 'Tây Tứ Mệnh', 'Nam 1980 phải thuộc Tây Tứ Mệnh');

// 2. Test Bát Trạch Nữ Sinh 1980 -> 4 + 9 = 13 - 9 = 4 (Tốn Mộc - Đông Tứ Mệnh)
const res1980F = engine.calculateBatTrachGua(1980, 'Nữ');
assert(res1980F.guaNumber === 4, 'Nữ 1980 phải là Cung Tốn (4)');
assert(res1980F.group === 'Đông Tứ Mệnh', 'Nữ 1980 phải thuộc Đông Tứ Mệnh');

// 3. Test Nam Sinh 1990 (Canh Ngọ) -> 1+9+9+0 = 19 = 10 = 1 -> 11 - 1 = 10 - 9 = 1 (Khảm Thủy - Đông Tứ Mệnh)
const res1990M = engine.calculateBatTrachGua(1990, 'Nam');
assert(res1990M.guaNumber === 1, 'Nam 1990 phải là Cung Khảm (1)');
assert(res1990M.group === 'Đông Tứ Mệnh', 'Nam 1990 phải thuộc Đông Tứ Mệnh');

// 4. Test Nam Sinh 2002 -> 2+0+0+2 = 4 -> 10 - 4 = 6 (Càn Kim - Tây Tứ Mệnh)
const res2002M = engine.calculateBatTrachGua(2002, 'Nam');
assert(res2002M.guaNumber === 6, 'Nam 2002 phải là Cung Càn (6)');

// 5. Test Nữ Sinh 2002 -> 5 + 4 = 9 (Ly Hỏa - Đông Tứ Mệnh)
const res2002F = engine.calculateBatTrachGua(2002, 'Nữ');
assert(res2002F.guaNumber === 9, 'Nữ 2002 phải là Cung Ly (9)');

// 6. Test Quan Hệ Ngũ Hành: Hỏa sinh Thổ
const rel1 = engine.calculateNguHanhRelation('Hỏa', 'Thổ');
assert(rel1.score === 1, 'Hỏa sinh Thổ (Sinh Xuất)');

// 7. Test Quan Hệ Ngũ Hành: Thủy khắc Hỏa
const rel2 = engine.calculateNguHanhRelation('Thủy', 'Hỏa');
assert(rel2.score === -1, 'Thủy khắc Hỏa (Khắc Xuất)');

console.log(`\n=== KẾT QUẢ KIỂM THỬ: ${passed}/${total} TESTS PASSED 100% ===`);
if (passed !== total) process.exit(1);
