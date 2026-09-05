/**
 * HỆ CƠ SỞ DỮ LIỆU ĐỊA BÀN LA KINH 24 SƠN, BÁT QUÁI & TỨ CỤC (LUOPAN DATA REGISTRY)
 * Chuẩn mực hóa phả hệ phong thủy cổ điển: 24 Sơn, 8 Quái, 12 Song Sơn, Tứ Cục Tam Hợp.
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.LuopanData = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  // ── 1. BÁT QUÁI HẬU THIÊN (8 CUNG QUÁI - 45° MỖI QUÁI) ──
  const TRIGRAMS_8 = [
    { id: 'kham', name: 'Khảm', hanzi: '坎', center: 0, start: 337.5, end: 22.5, element: 'Thủy', direction: 'Bắc', symbol: '☵' },
    { id: 'can', name: 'Cấn', hanzi: '艮', center: 45, start: 22.5, end: 67.5, element: 'Thổ', direction: 'Đông Bắc', symbol: '☶' },
    { id: 'chan', name: 'Chấn', hanzi: '震', center: 90, start: 67.5, end: 112.5, element: 'Mộc', direction: 'Đông', symbol: '☳' },
    { id: 'ton', name: 'Tốn', hanzi: '巽', center: 135, start: 112.5, end: 157.5, element: 'Mộc', direction: 'Đông Nam', symbol: '☴' },
    { id: 'ly', name: 'Ly', hanzi: '離', center: 180, start: 157.5, end: 202.5, element: 'Hỏa', direction: 'Nam', symbol: '☲' },
    { id: 'khon', name: 'Khôn', hanzi: '坤', center: 225, start: 202.5, end: 247.5, element: 'Thổ', direction: 'Tây Nam', symbol: '☷' },
    { id: 'doai', name: 'Đoài', hanzi: '兌', center: 270, start: 247.5, end: 292.5, element: 'Kim', direction: 'Tây', symbol: '☱' },
    { id: 'can_qian', name: 'Càn', hanzi: '乾', center: 315, start: 292.5, end: 337.5, element: 'Kim', direction: 'Tây Bắc', symbol: '☰' }
  ];

  // ── 2. NHỊ THẬP TỨ SƠN CHÁNH VỊ (24 SƠN - 15° MỖI SƠN) ──
  const MOUNTAINS_24 = [
    { id: 'ty', name: 'Tý', hanzi: '子', center: 0, start: 352.5, end: 7.5, element: 'Thủy', type: 'Chi', trigram: 'Khảm', color: '#38BDF8' },
    { id: 'quy', name: 'Quý', hanzi: '癸', center: 15, start: 7.5, end: 22.5, element: 'Thủy', type: 'Can', trigram: 'Khảm', color: '#38BDF8' },
    { id: 'suu', name: 'Sửu', hanzi: '丑', center: 30, start: 22.5, end: 37.5, element: 'Thổ', type: 'Chi', trigram: 'Cấn', color: '#FCD34D' },
    { id: 'cấn', name: 'Cấn', hanzi: '艮', center: 45, start: 37.5, end: 52.5, element: 'Thổ', type: 'Quái', trigram: 'Cấn', color: '#FCD34D' },
    { id: 'dan', name: 'Dần', hanzi: '寅', center: 60, start: 52.5, end: 67.5, element: 'Mộc', type: 'Chi', trigram: 'Cấn', color: '#4ADE80' },
    { id: 'giap', name: 'Giáp', hanzi: '甲', center: 75, start: 67.5, end: 82.5, element: 'Mộc', type: 'Can', trigram: 'Chấn', color: '#4ADE80' },
    { id: 'mao', name: 'Mão', hanzi: '卯', center: 90, start: 82.5, end: 97.5, element: 'Mộc', type: 'Chi', trigram: 'Chấn', color: '#4ADE80' },
    { id: 'at', name: 'Ất', hanzi: '乙', center: 105, start: 97.5, end: 112.5, element: 'Mộc', type: 'Can', trigram: 'Chấn', color: '#4ADE80' },
    { id: 'thin', name: 'Thìn', hanzi: '辰', center: 120, start: 112.5, end: 127.5, element: 'Thổ', type: 'Chi', trigram: 'Tốn', color: '#FCD34D' },
    { id: 'ton', name: 'Tốn', hanzi: '巽', center: 135, start: 127.5, end: 142.5, element: 'Mộc', type: 'Quái', trigram: 'Tốn', color: '#4ADE80' },
    { id: 'ti', name: 'Tị', hanzi: '巳', center: 150, start: 142.5, end: 157.5, element: 'Hỏa', type: 'Chi', trigram: 'Tốn', color: '#F87171' },
    { id: 'binh', name: 'Bính', hanzi: '丙', center: 165, start: 157.5, end: 172.5, element: 'Hỏa', type: 'Can', trigram: 'Ly', color: '#F87171' },
    { id: 'ngo', name: 'Ngọ', hanzi: '午', center: 180, start: 172.5, end: 187.5, element: 'Hỏa', type: 'Chi', trigram: 'Ly', color: '#F87171' },
    { id: 'dinh', name: 'Đinh', hanzi: '丁', center: 195, start: 187.5, end: 202.5, element: 'Hỏa', type: 'Can', trigram: 'Ly', color: '#F87171' },
    { id: 'mui', name: 'Mùi', hanzi: '未', center: 210, start: 202.5, end: 217.5, element: 'Thổ', type: 'Chi', trigram: 'Khôn', color: '#FCD34D' },
    { id: 'khon', name: 'Khôn', hanzi: '坤', center: 225, start: 217.5, end: 232.5, element: 'Thổ', type: 'Quái', trigram: 'Khôn', color: '#FCD34D' },
    { id: 'than', name: 'Thân', hanzi: '申', center: 240, start: 232.5, end: 247.5, element: 'Kim', type: 'Chi', trigram: 'Khôn', color: '#E2E8F0' },
    { id: 'canh', name: 'Canh', hanzi: '庚', center: 255, start: 247.5, end: 262.5, element: 'Kim', type: 'Can', trigram: 'Đoài', color: '#E2E8F0' },
    { id: 'dau', name: 'Dậu', hanzi: '酉', center: 270, start: 262.5, end: 277.5, element: 'Kim', type: 'Chi', trigram: 'Đoài', color: '#E2E8F0' },
    { id: 'tan', name: 'Tân', hanzi: '辛', center: 285, start: 277.5, end: 292.5, element: 'Kim', type: 'Can', trigram: 'Đoài', color: '#E2E8F0' },
    { id: 'tuat', name: 'Tuất', hanzi: '戌', center: 300, start: 292.5, end: 307.5, element: 'Thổ', type: 'Chi', trigram: 'Càn', color: '#FCD34D' },
    { id: 'can_qian', name: 'Càn', hanzi: '乾', center: 315, start: 307.5, end: 322.5, element: 'Kim', type: 'Quái', trigram: 'Càn', color: '#E2E8F0' },
    { id: 'hai', name: 'Hợi', hanzi: '亥', center: 330, start: 322.5, end: 337.5, element: 'Thủy', type: 'Chi', trigram: 'Càn', color: '#38BDF8' },
    { id: 'nham', name: 'Nhâm', hanzi: '壬', center: 345, start: 337.5, end: 352.5, element: 'Thủy', type: 'Can', trigram: 'Khảm', color: '#38BDF8' }
  ];

  // ── 3. 12 NHÓM SONG SƠN & TỨ CỤC TAM HỢP ──
  const SONG_SON_GROUPS = [
    { idx: 0, label: "Nhóm 01: Nhâm Bính / Tý Ngọ", cuc: "Hỏa", lesson: "LESSON-21-01", huongSon: ["Bính", "Ngọ"], toaSon: ["Nhâm", "Tý"] },
    { idx: 1, label: "Nhóm 02: Quý Đinh / Sửu Mùi", cuc: "Kim", lesson: "LESSON-21-02", huongSon: ["Đinh", "Mùi"], toaSon: ["Quý", "Sửu"] },
    { idx: 2, label: "Nhóm 03: Cấn Khôn / Dần Thân", cuc: "Thủy", lesson: "LESSON-21-03", huongSon: ["Khôn", "Thân"], toaSon: ["Cấn", "Dần"] },
    { idx: 3, label: "Nhóm 04: Giáp Canh / Mão Dậu", cuc: "Kim", lesson: "LESSON-21-04", huongSon: ["Canh", "Dậu"], toaSon: ["Giáp", "Mão"] },
    { idx: 4, label: "Nhóm 05: Ất Tân / Thìn Tuất", cuc: "Thủy", lesson: "LESSON-21-05", huongSon: ["Tân", "Tuất"], toaSon: ["Ất", "Thìn"] },
    { idx: 5, label: "Nhóm 06: Tốn Càn / Tị Hợi", cuc: "Mộc", lesson: "LESSON-21-06", huongSon: ["Càn", "Hợi"], toaSon: ["Tốn", "Tị"] },
    { idx: 6, label: "Nhóm 07: Bính Nhâm / Ngọ Tý", cuc: "Thủy", lesson: "LESSON-21-07", huongSon: ["Nhâm", "Tý"], toaSon: ["Bính", "Ngọ"] },
    { idx: 7, label: "Nhóm 08: Đinh Quý / Mùi Sửu", cuc: "Mộc", lesson: "LESSON-21-08", huongSon: ["Quý", "Sửu"], toaSon: ["Đinh", "Mùi"] },
    { idx: 8, label: "Nhóm 09: Khôn Cấn / Thân Dần", cuc: "Hỏa", lesson: "LESSON-21-09", huongSon: ["Cấn", "Dần"], toaSon: ["Khôn", "Thân"] },
    { idx: 9, label: "Nhóm 10: Canh Giáp / Dậu Mão", cuc: "Mộc", lesson: "LESSON-21-10", huongSon: ["Giáp", "Mão"], toaSon: ["Canh", "Dậu"] },
    { idx: 10, label: "Nhóm 11: Tân Ất / Tuất Thìn", cuc: "Hỏa", lesson: "LESSON-21-11", huongSon: ["Ất", "Thìn"], toaSon: ["Tân", "Tuất"] },
    { idx: 11, label: "Nhóm 12: Càn Tốn / Hợi Tị", cuc: "Kim", lesson: "LESSON-21-12", huongSon: ["Tốn", "Tị"], toaSon: ["Càn", "Hợi"] }
  ];

  /**
   * Tra cứu Sơn theo độ phương vị và tính khoảng cách tới biên
   */
  function getMountain(bearing) {
    const norm = (bearing % 360 + 360) % 360;
    for (const m of MOUNTAINS_24) {
      if (m.start > m.end) {
        if (norm >= m.start || norm < m.end) {
          const distToStart = norm >= m.start ? norm - m.start : norm + 360 - m.start;
          const distToEnd = norm < m.end ? m.end - norm : m.end + 360 - norm;
          return { mountain: m, distanceToBoundary: Math.min(distToStart, distToEnd) };
        }
      } else {
        if (norm >= m.start && norm < m.end) {
          return {
            mountain: m,
            distanceToBoundary: Math.min(norm - m.start, m.end - norm)
          };
        }
      }
    }
    return { mountain: MOUNTAINS_24[0], distanceToBoundary: 0 };
  }

  /**
   * Tra cứu Bát Quái theo phương vị
   */
  function getTrigram(bearing) {
    const norm = (bearing % 360 + 360) % 360;
    for (const t of TRIGRAMS_8) {
      if (t.start > t.end) {
        if (norm >= t.start || norm < t.end) {
          const distToStart = norm >= t.start ? norm - t.start : norm + 360 - t.start;
          const distToEnd = norm < t.end ? t.end - norm : t.end + 360 - norm;
          return { trigram: t, distanceToBoundary: Math.min(distToStart, distToEnd) };
        }
      } else {
        if (norm >= t.start && norm < t.end) {
          return {
            trigram: t,
            distanceToBoundary: Math.min(norm - t.start, t.end - norm)
          };
        }
      }
    }
    return { trigram: TRIGRAMS_8[0], distanceToBoundary: 0 };
  }

  // ── 4. THẬP NHỊ TRƯỜNG SINH (12 CUNG TRƯỜNG SINH CHÁNH TÔNG TAM HỢP) ──
  const TRUONG_SINH_12 = [
    { id: 'truong_sinh', name: 'Trường Sinh', stage: 0, laiNature: 'Đại Cát', khuNature: 'Đại Hung', laiDesc: 'Nhân đinh hưng vượng, con cái hiền tài, đa đinh đa phúc, phát phúc trường cửu.', khuDesc: 'Sinh khứ phá gia, tuyệt tự tổn đinh, phụ nữ sẩy thai hại mẹ.' },
    { id: 'moc_duc', name: 'Mộc Dục', stage: 1, laiNature: 'Đào Hoa / Hung', khuNature: 'Cát có điều kiện', laiDesc: 'Đào hoa dâm loạn, tiêu hao tài sản, phiêu bạt tha hương, gia đạo bất hòa.', khuDesc: 'Lộc Tồn lưu tận bội kim ngư, tống xuất dâm tà, phát văn chương đỗ đạt (khi xuất đúng Thiên Can).' },
    { id: 'quan_doi', name: 'Quan Đới', stage: 2, laiNature: 'Cát', khuNature: 'Hung', laiDesc: 'Thiếu niên đỗ đạt khôi khoa, thông minh sáng dạ, bổng lộc hanh thông.', khuDesc: 'Xung phá Quan Đới, tổn hại người trẻ tuổi, học hành thi cử dở dang, đoản thọ thần đồng.' },
    { id: 'lam_quan', name: 'Lâm Quan', stage: 3, laiNature: 'Đại Cát', khuNature: 'Đại Hung Sát', laiDesc: 'Lâm Quan Lộc Thủy, thăng quan tiến chức, bổng lộc triều đình dồi dào, phát tài thần tốc.', khuDesc: 'Xung phá Lâm Quan / Sát Nhân Hoàng Tuyền, quan phi tù tội, bại nghiệp mất chức, tổn người thành tài.' },
    { id: 'de_vuong', name: 'Đế Vượng', stage: 4, laiNature: 'Đại Cát Cực Thịnh', khuNature: 'Đại Hung Cực Hại', laiDesc: 'Đỉnh cao tài lộc, kinh thương cự phú, vinh hoa phú quý muôn đời, gia môn rạng rỡ.', khuDesc: 'Vượng khứ xung Sinh / Xung phá Vượng vị, tán gia bại sản trong chớp mắt, con cái tương tàn.' },
    { id: 'suy', name: 'Suy', stage: 5, laiNature: 'Bình / Tiểu Cát', khuNature: 'Cát', laiDesc: 'Khí suy êm đềm, giữ yên cơ nghiệp tổ tiên, không tranh giành sóng gió.', khuDesc: 'Duy hữu Suy phương khả khứ lai, Tự Vượng tiêu thủy bền lâu, tài vận vững vàng.' },
    { id: 'benh', name: 'Bệnh', stage: 6, laiNature: 'Hung', khuNature: 'Cát', laiDesc: 'Ốm đau triền miên, bệnh tật nan y, gia đạo bất an, tinh thần suy nhược.', khuDesc: 'Tiêu tán mầm bệnh tật, thanh lọc cơ thể, hóa hung thành an.' },
    { id: 'tu', name: 'Tử', stage: 7, laiNature: 'Đại Hung', khuNature: 'Cát', laiDesc: 'Tai nạn bất ngờ, mất người mất của, tang sự liên miên, gia đạo lụi bại.', khuDesc: 'Xả sạch tử khí, tống tiễn tai ương, biến họa thành phúc.' },
    { id: 'mo', name: 'Mộ', stage: 8, laiNature: 'Đại Kỵ', khuNature: 'Đại Cát Tụ Bảo', laiDesc: 'Mộ thủy xung Sinh, bít tắc khí mạch, bần hàn khốn khó, tổn thương con cháu.', khuDesc: 'Thủy quy Mộ Khố (Chánh Vị Tiêu Thủy), tiền của cất vào kho ngầm, muôn đời giàu sang không vơi cạn.' },
    { id: 'tuyet', name: 'Tuyệt', stage: 9, laiNature: 'Đại Tuyệt Sát', khuNature: 'Cát', laiDesc: 'Tuyệt thủy xung Sinh nhân đinh tuyệt, tuyệt tự, tha hương cầu thực.', khuDesc: 'Tuyệt vị khứ thủy / Lộc Tồn lưu tận, tuyệt đường hung sát, sinh cơ phục khởi.' },
    { id: 'thai', name: 'Thai', stage: 10, laiNature: 'Cát', khuNature: 'Hung', laiDesc: 'Nuôi dưỡng mầm sống mới, sinh quý tử, nhân từ phúc đức, con cái thảo hiền.', khuDesc: 'Phá Thai Thần, phụ nữ khó sinh nở, trụy thai liên tiếp, tổn hại thai nhi.' },
    { id: 'duong', name: 'Dưỡng', stage: 11, laiNature: 'Cát', khuNature: 'Bình', laiDesc: 'Dưỡng dục sinh khí, con cháu hiếu thảo, gia đạo ấm êm, phúc lộc tích lũy.', khuDesc: 'Cần cẩn trọng tránh làm tiêu hao sinh lực ban đầu của gia trạch.' }
  ];

  // 12 CẶP SONG SƠN TỰ NHIÊN THEO CHIỀU KIM ĐỒNG HỒ TỪ CHÍNH BẮC (NHÂM TÝ)
  const SONG_SON_PAIRS = [
    { index: 0, pair: 'Nhâm Tý', mountains: ['Nhâm', 'Tý'], element: 'Thủy' },
    { index: 1, pair: 'Quý Sửu', mountains: ['Quý', 'Sửu'], element: 'Kim (Khố)' },
    { index: 2, pair: 'Cấn Dần', mountains: ['Cấn', 'Dần'], element: 'Hỏa (Sinh)' },
    { index: 3, pair: 'Giáp Mão', mountains: ['Giáp', 'Mão'], element: 'Mộc (Vượng)' },
    { index: 4, pair: 'Ất Thìn', mountains: ['Ất', 'Thìn'], element: 'Thủy (Khố)' },
    { index: 5, pair: 'Tốn Tị', mountains: ['Tốn', 'Tị'], element: 'Kim (Sinh)' },
    { index: 6, pair: 'Bính Ngọ', mountains: ['Bính', 'Ngọ'], element: 'Hỏa (Vượng)' },
    { index: 7, pair: 'Đinh Mùi', mountains: ['Đinh', 'Mùi'], element: 'Mộc (Khố)' },
    { index: 8, pair: 'Khôn Thân', mountains: ['Khôn', 'Thân'], element: 'Thủy (Sinh)' },
    { index: 9, pair: 'Canh Dậu', mountains: ['Canh', 'Dậu'], element: 'Kim (Vượng)' },
    { index: 10, pair: 'Tân Tuất', mountains: ['Tân', 'Tuất'], element: 'Hỏa (Khố)' },
    { index: 11, pair: 'Càn Hợi', mountains: ['Càn', 'Hợi'], element: 'Mộc (Sinh)' }
  ];

  const MOUNTAIN_TO_SONG_SON = {
    'Nhâm': 0, 'Tý': 0,
    'Quý': 1, 'Sửu': 1,
    'Cấn': 2, 'Dần': 2,
    'Giáp': 3, 'Mão': 3,
    'Ất': 4, 'Thìn': 4,
    'Tốn': 5, 'Tị': 5,
    'Bính': 6, 'Ngọ': 6,
    'Đinh': 7, 'Mùi': 7,
    'Khôn': 8, 'Thân': 8,
    'Canh': 9, 'Dậu': 9,
    'Tân': 10, 'Tuất': 10,
    'Càn': 11, 'Hợi': 11
  };

  // CUNG KHỞI TRƯỜNG SINH CỦA TỨ CỤC (DƯƠNG THUẬN TAM HỢP)
  const CUC_START_INDEX = {
    'Hỏa': 2,   // Cấn - Dần (Hỏa Cục: Dần Ngọ Tuất)
    'Thủy': 8,  // Khôn - Thân (Thủy Cục: Thân Tý Thìn)
    'Kim': 5,   // Tốn - Tị (Kim Cục: Tị Dậu Sửu)
    'Mộc': 11   // Càn - Hợi (Mộc Cục: Hợi Mão Mùi)
  };

  function getSongSon(mountainName) {
    const idx = MOUNTAIN_TO_SONG_SON[mountainName];
    return idx !== undefined ? SONG_SON_PAIRS[idx] : null;
  }

  function getTruongSinh(mountainName, cuc = 'Hỏa') {
    const ssIdx = MOUNTAIN_TO_SONG_SON[mountainName];
    if (ssIdx === undefined) return null;
    const startIdx = CUC_START_INDEX[cuc] !== undefined ? CUC_START_INDEX[cuc] : 2;
    const stageIdx = (ssIdx - startIdx + 12) % 12;
    const stage = TRUONG_SINH_12[stageIdx];
    return {
      ...stage,
      songSon: SONG_SON_PAIRS[ssIdx].pair,
      cuc
    };
  }

  function get12TruongSinhTable(cuc = 'Hỏa') {
    const startIdx = CUC_START_INDEX[cuc] !== undefined ? CUC_START_INDEX[cuc] : 2;
    return TRUONG_SINH_12.map((stage, stageIdx) => {
      const ssIdx = (startIdx + stageIdx) % 12;
      return {
        ...stage,
        songSon: SONG_SON_PAIRS[ssIdx].pair,
        mountains: SONG_SON_PAIRS[ssIdx].mountains,
        cuc
      };
    });
  }

  return {
    TRIGRAMS_8,
    MOUNTAINS_24,
    SONG_SON_GROUPS,
    SONG_SON_PAIRS,
    TRUONG_SINH_12,
    getMountain,
    getTrigram,
    getSongSon,
    getTruongSinh,
    get12TruongSinhTable
  };
}));

