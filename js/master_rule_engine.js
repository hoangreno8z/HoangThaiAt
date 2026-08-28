// =========================================================================
// HUYỀN HỌC MỤ — MASTER COMPUTATIONAL RULE ENGINE (PHASE 9)
// =========================================================================

class MasterRuleEngine {
  constructor() {
    this.guaNames = {
      1: { name: 'Khảm', element: 'Thủy', group: 'Đông Tứ Mệnh', trigram: '☵', direction: 'Bắc' },
      2: { name: 'Khôn', element: 'Thổ', group: 'Tây Tứ Mệnh', trigram: '☷', direction: 'Tây Nam' },
      3: { name: 'Chấn', element: 'Mộc', group: 'Đông Tứ Mệnh', trigram: '☳', direction: 'Đông' },
      4: { name: 'Tốn', element: 'Mộc', group: 'Đông Tứ Mệnh', trigram: '☴', direction: 'Đông Nam' },
      6: { name: 'Càn', element: 'Kim', group: 'Tây Tứ Mệnh', trigram: '☰', direction: 'Tây Bắc' },
      7: { name: 'Đoài', element: 'Kim', group: 'Tây Tứ Mệnh', trigram: '☱', direction: 'Tây' },
      8: { name: 'Cấn', element: 'Thổ', group: 'Tây Tứ Mệnh', trigram: '☶', direction: 'Đông Bắc' },
      9: { name: 'Ly', element: 'Hỏa', group: 'Đông Tứ Mệnh', trigram: '☲', direction: 'Nam' }
    };

    // Ma trận Du Niên Bát Trạch: [Mệnh Quái][Hướng Nhà] => Tên Sao Cát Hung
    this.duNienMatrix = {
      1: { 'Bắc': 'Phục Vị (Tốt)', 'Nam': 'Diên Niên (Tốt)', 'Đông': 'Thiên Y (Tốt)', 'Đông Nam': 'Sinh Khí (Tốt)', 'Tây Bắc': 'Lục Sát (Xấu)', 'Tây': 'Họa Hại (Xấu)', 'Đông Bắc': 'Ngũ Quỷ (Xấu)', 'Tây Nam': 'Tuyệt Mệnh (Xấu)' },
      2: { 'Bắc': 'Tuyệt Mệnh (Xấu)', 'Nam': 'Lục Sát (Xấu)', 'Đông': 'Họa Hại (Xấu)', 'Đông Nam': 'Ngũ Quỷ (Xấu)', 'Tây Bắc': 'Diên Niên (Tốt)', 'Tây': 'Thiên Y (Tốt)', 'Đông Bắc': 'Sinh Khí (Tốt)', 'Tây Nam': 'Phục Vị (Tốt)' },
      3: { 'Bắc': 'Thiên Y (Tốt)', 'Nam': 'Sinh Khí (Tốt)', 'Đông': 'Phục Vị (Tốt)', 'Đông Nam': 'Diên Niên (Tốt)', 'Tây Bắc': 'Ngũ Quỷ (Xấu)', 'Tây': 'Tuyệt Mệnh (Xấu)', 'Đông Bắc': 'Lục Sát (Xấu)', 'Tây Nam': 'Họa Hại (Xấu)' },
      4: { 'Bắc': 'Sinh Khí (Tốt)', 'Nam': 'Thiên Y (Tốt)', 'Đông': 'Diên Niên (Tốt)', 'Đông Nam': 'Phục Vị (Tốt)', 'Tây Bắc': 'Họa Hại (Xấu)', 'Tây': 'Lục Sát (Xấu)', 'Đông Bắc': 'Tuyệt Mệnh (Xấu)', 'Tây Nam': 'Ngũ Quỷ (Xấu)' },
      6: { 'Bắc': 'Lục Sát (Xấu)', 'Nam': 'Tuyệt Mệnh (Xấu)', 'Đông': 'Ngũ Quỷ (Xấu)', 'Đông Nam': 'Họa Hại (Xấu)', 'Tây Bắc': 'Phục Vị (Tốt)', 'Tây': 'Sinh Khí (Tốt)', 'Đông Bắc': 'Thiên Y (Tốt)', 'Tây Nam': 'Diên Niên (Tốt)' },
      7: { 'Bắc': 'Họa Hại (Xấu)', 'Nam': 'Ngũ Quỷ (Xấu)', 'Đông': 'Tuyệt Mệnh (Xấu)', 'Đông Nam': 'Lục Sát (Xấu)', 'Tây Bắc': 'Sinh Khí (Tốt)', 'Tây': 'Phục Vị (Tốt)', 'Đông Bắc': 'Diên Niên (Tốt)', 'Tây Nam': 'Thiên Y (Tốt)' },
      8: { 'Bắc': 'Ngũ Quỷ (Xấu)', 'Nam': 'Họa Hại (Xấu)', 'Đông': 'Lục Sát (Xấu)', 'Đông Nam': 'Tuyệt Mệnh (Xấu)', 'Tây Bắc': 'Thiên Y (Tốt)', 'Tây': 'Diên Niên (Tốt)', 'Đông Bắc': 'Phục Vị (Tốt)', 'Tây Nam': 'Sinh Khí (Tốt)' },
      9: { 'Bắc': 'Diên Niên (Tốt)', 'Nam': 'Phục Vị (Tốt)', 'Đông': 'Sinh Khí (Tốt)', 'Đông Nam': 'Thiên Y (Tốt)', 'Tây Bắc': 'Tuyệt Mệnh (Xấu)', 'Tây': 'Ngũ Quỷ (Xấu)', 'Đông Bắc': 'Họa Hại (Xấu)', 'Tây Nam': 'Lục Sát (Xấu)' }
    };
  }

  // 1. Tính Cung Mệnh Quái Bát Trạch
  calculateBatTrachGua(birthYear, gender = 'Nam') {
    const y = parseInt(birthYear, 10);
    if (isNaN(y) || y < 1900 || y > 2100) return null;

    let rem = y % 9;
    if (rem === 0) rem = 9;

    let guaNum = 0;
    const isPre2000 = y < 2000;

    if (gender === 'Nam' || gender === 'male') {
      guaNum = isPre2000 ? (11 - rem) : (10 - rem);
      while (guaNum <= 0) guaNum += 9;
      while (guaNum > 9) guaNum -= 9;
      if (guaNum === 5) guaNum = 2; // Nam 5 quy Khôn
    } else {
      guaNum = isPre2000 ? (4 + rem) : (5 + rem);
      while (guaNum > 9) guaNum -= 9;
      if (guaNum === 5) guaNum = 8; // Nữ 5 quy Cấn
    }

    const info = this.guaNames[guaNum];
    return {
      birthYear: y,
      gender: gender,
      guaNumber: guaNum,
      guaName: info.name,
      element: info.element,
      group: info.group,
      trigram: info.trigram,
      duNienMap: this.duNienMatrix[guaNum]
    };
  }

  // 2. Tính Tinh Bàn Phi Tinh Huyền Không
  calculateHuyenKhongPeriod(period = 9) {
    // 9 Vận Tam Nguyên: Vận 9 (2024 - 2043)
    return {
      period: period,
      element: 'Cửu Tử Ly Hỏa',
      centerStar: period,
      auspiciousStars: [period, (period % 9) + 1],
      inAuspicousStars: [2, 5] // Nhị Hắc & Ngũ Hoàng
    };
  }

  // 3. Tính Quan Hệ Ngũ Hành
  calculateNguHanhRelation(elA, elB) {
    const sinhMap = { 'Kim': 'Thủy', 'Thủy': 'Mộc', 'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim' };
    const khacMap = { 'Kim': 'Mộc', 'Mộc': 'Thổ', 'Thổ': 'Thủy', 'Thủy': 'Hỏa', 'Hỏa': 'Kim' };

    if (elA === elB) return { relation: 'Bình Hòa (Tỷ Hòa)', score: 0 };
    if (sinhMap[elA] === elB) return { relation: `${elA} Sinh ${elB} (Sinh Xuất)`, score: 1 };
    if (sinhMap[elB] === elA) return { relation: `${elB} Sinh ${elA} (Sinh Nhập - Rất Tốt)`, score: 2 };
    if (khacMap[elA] === elB) return { relation: `${elA} Khắc ${elB} (Khắc Xuất)`, score: -1 };
    if (khacMap[elB] === elA) return { relation: `${elB} Khắc ${elA} (Khắc Nhập - Đại Hung)`, score: -2 };
    return { relation: 'Không rõ', score: 0 };
  }
}

// Export Master Engine
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MasterRuleEngine;
} else {
  window.masterRuleEngine = new MasterRuleEngine();
}
