/**
 * BỘ TÍNH TOÁN BÁT TRẠCH MINH KÍNH (EIGHT MANSIONS ALGORITHM)
 * Xử lý thuật toán Mệnh Quái, Đông Tây Tứ Mệnh và ma trận 8 phương vị Cát - Hung.
 */

class BatTrachEngine {
  constructor(selectors, displayContainerId) {
    this.birthYearInput = document.getElementById(selectors.year);
    this.genderSelect = document.getElementById(selectors.gender);
    this.houseDirectionSelect = document.getElementById(selectors.direction);
    this.calcBtn = document.getElementById(selectors.btn);
    this.displayContainer = document.getElementById(displayContainerId);
    
    // Mappings
    this.guaList = {
      1: { name: "Khảm", element: "Thủy", group: "Đông Tứ Mệnh", symbol: "☵" },
      2: { name: "Khôn", element: "Thổ", group: "Tây Tứ Mệnh", symbol: "☷" },
      3: { name: "Chấn", element: "Mộc", group: "Đông Tứ Mệnh", symbol: "☳" },
      4: { name: "Tốn", element: "Mộc", group: "Đông Tứ Mệnh", symbol: "☴" },
      6: { name: "Càn", element: "Kim", group: "Tây Tứ Mệnh", symbol: "☰" },
      7: { name: "Đoài", element: "Kim", group: "Tây Tứ Mệnh", symbol: "☱" },
      8: { name: "Cấn", element: "Thổ", group: "Tây Tứ Mệnh", symbol: "☶" },
      9: { name: "Ly", element: "Hỏa", group: "Đông Tứ Mệnh", symbol: "☲" }
    };

    this.starTable = {
      1: { N: "Phục Vị", NE: "Ngũ Quỷ", E: "Thiên Y", SE: "Sinh Khí", S: "Diên Niên", SW: "Tuyệt Mệnh", W: "Họa Hại", NW: "Lục Sát" },
      2: { N: "Tuyệt Mệnh", NE: "Sinh Khí", E: "Họa Hại", SE: "Ngũ Quỷ", S: "Lục Sát", SW: "Phục Vị", W: "Thiên Y", NW: "Diên Niên" },
      3: { N: "Thiên Y", NE: "Lục Sát", E: "Phục Vị", SE: "Diên Niên", S: "Sinh Khí", SW: "Họa Hại", W: "Tuyệt Mệnh", NW: "Ngũ Quỷ" },
      4: { N: "Sinh Khí", NE: "Tuyệt Mệnh", E: "Diên Niên", SE: "Phục Vị", S: "Thiên Y", SW: "Ngũ Quỷ", W: "Lục Sát", NW: "Họa Hại" },
      6: { N: "Lục Sát", NE: "Thiên Y", E: "Ngũ Quỷ", SE: "Họa Hại", S: "Tuyệt Mệnh", SW: "Diên Niên", W: "Sinh Khí", NW: "Phục Vị" },
      7: { N: "Họa Hại", NE: "Diên Niên", E: "Tuyệt Mệnh", SE: "Lục Sát", S: "Ngũ Quỷ", SW: "Thiên Y", W: "Phục Vị", NW: "Sinh Khí" },
      8: { N: "Ngũ Quỷ", NE: "Phục Vị", E: "Lục Sát", SE: "Tuyệt Mệnh", S: "Họa Hại", SW: "Sinh Khí", W: "Diên Niên", NW: "Thiên Y" },
      9: { N: "Diên Niên", NE: "Họa Hại", E: "Sinh Khí", SE: "Thiên Y", S: "Phục Vị", SW: "Lục Sát", W: "Ngũ Quỷ", NW: "Tuyệt Mệnh" }
    };

    this.init();
  }

  init() {
    if (this.calcBtn) {
      this.calcBtn.addEventListener('click', () => {
        if (window.soundCtrl) window.soundCtrl.playBell(528);
        this.calculate();
      });
    }
    this.calculate(); // Auto calculate initial value
  }

  calculateGua(year, gender) {
    // Thuật toán tính Quái số
    let sum = 0;
    const yearStr = year.toString();
    for (let i = 0; i < yearStr.length; i++) {
      sum += parseInt(yearStr[i], 10);
    }
    while (sum > 9) {
      sum = Math.floor(sum / 10) + (sum % 10);
    }

    let gua = 0;
    if (gender === 'male') {
      gua = (11 - sum) % 9;
      if (gua === 0) gua = 9;
      if (gua === 5) gua = 2; // Nam gặp số 5 quy về Khôn (hoặc Cấn theo phái)
    } else {
      gua = (sum + 4) % 9;
      if (gua === 0) gua = 9;
      if (gua === 5) gua = 8; // Nữ gặp số 5 quy về Cấn
    }
    return gua;
  }

  calculate() {
    const year = parseInt(this.birthYearInput.value, 10) || 1990;
    const gender = this.genderSelect.value || 'male';
    const houseDir = this.houseDirectionSelect.value || 'S';

    const guaNum = this.calculateGua(year, gender);
    const guaInfo = this.guaList[guaNum] || this.guaList[1];
    const userStars = this.starTable[guaNum];

    const currentHouseStar = userStars[houseDir];
    const starDetail = this.getStarDetail(currentHouseStar);

    this.renderResult(year, gender, guaNum, guaInfo, houseDir, currentHouseStar, starDetail, userStars);
  }

  getStarDetail(starName) {
    const details = {
      "Sinh Khí": { type: "cat", tag: "ĐẠI CÁT", color: "#10B981", desc: "Hút vượng khí, tài lộc dồi dào, thăng quan tiến chức, gia chủ thịnh vượng." },
      "Thiên Y": { type: "cat", tag: "THƯỢNG CÁT", color: "#2DD4BF", desc: "Chủ về sức khỏe, trường thọ, gặp quý nhân phù trợ, gia đình an khang." },
      "Diên Niên": { type: "cat", tag: "TRUNG CÁT", color: "#38BDF8", desc: "Chủ về hòa thuận, củng cố tình cảm vợ chồng, ngoại giao tốt đẹp." },
      "Phục Vị": { type: "cat", tag: "TIỂU CÁT", color: "#E5C07B", desc: "Chủ về an tĩnh, củng cố sức mạnh nội tâm, học hành đỗ đạt, tài vận ổn định." },
      "Họa Hại": { type: "hung", tag: "TIỂU HUNG", color: "#F59E0B", desc: "Chủ về thị phi khẩu thiệt, hao tài tốn của, hay gặp chuyện phiền lòng." },
      "Lục Sát": { type: "hung", tag: "THỨ HUNG", color: "#FB923C", desc: "Chủ về xáo trộn tình cảm, tranh chấp tai tiếng, cơ thể mệt mỏi." },
      "Ngũ Quỷ": { type: "hung", tag: "ĐẠI HUNG", color: "#F87171", desc: "Chủ về tai họa hỏa hoạn, mất cắp, bất an, tiểu nhân quấy phá." },
      "Tuyệt Mệnh": { type: "hung", tag: "CỰC HUNG", color: "#EF4444", desc: "Cực kỳ hung hiểm, chủ về suy thoái sinh mạng, phá sản, bệnh tật nặng nề." }
    };
    return details[starName] || details["Phục Vị"];
  }

  renderResult(year, gender, guaNum, guaInfo, houseDir, currentHouseStar, starDetail, userStars) {
    if (!this.displayContainer) return;

    const dirLabels = {
      N: "Chính Bắc (0°)", NE: "Đông Bắc (45°)", E: "Chính Đông (90°)", SE: "Đông Nam (135°)",
      S: "Chính Nam (180°)", SW: "Tây Nam (225°)", W: "Chính Tây (270°)", NW: "Tây Bắc (315°)"
    };

    const dirOrder = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

    this.displayContainer.innerHTML = `
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1.5rem; margin-bottom:1.5rem;">
        <div style="background:rgba(229,192,123,0.06); border:1px solid var(--border-active); border-radius:12px; padding:1.2rem;">
          <div style="font-size:0.75rem; color:var(--jade-cyan); text-transform:uppercase; letter-spacing:1px;">Mệnh Quái Cá Nhân</div>
          <h3 style="font-family:var(--font-title); font-size:1.6rem; color:var(--gold-primary); margin:0.3rem 0;">
            Quẻ ${guaInfo.name} (${guaInfo.symbol}) - ${guaInfo.element}
          </h3>
          <div style="font-size:0.88rem; color:var(--text-pure);">
            Thuộc nhóm: <strong style="color:${guaInfo.group === 'Đông Tứ Mệnh' ? '#10B981' : '#38BDF8'}">${guaInfo.group}</strong>
          </div>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.3rem;">
            Năm sinh: ${year} • Giới tính: ${gender === 'male' ? 'Nam' : 'Nữ'}
          </div>
        </div>

        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); border-radius:12px; padding:1.2rem;">
          <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px;">Đánh Giá Hướng Nhà Đang Chọn</div>
          <div style="display:flex; align-items:center; gap:0.6rem; margin:0.3rem 0;">
            <span style="font-family:var(--font-title); font-size:1.4rem; color:var(--text-pure);">${dirLabels[houseDir]}</span>
            <span style="background:${starDetail.color}; color:#000; font-weight:700; font-size:0.75rem; padding:0.2rem 0.6rem; border-radius:6px;">
              ${currentHouseStar} (${starDetail.tag})
            </span>
          </div>
          <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">${starDetail.desc}</p>
        </div>
      </div>

      <h4 style="font-family:var(--font-title); font-size:1.1rem; color:var(--gold-primary); margin-bottom:0.8rem;">
        Ma Trận 8 Phương Vị Bát Trạch Toàn Diện:
      </h4>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:0.8rem;">
        ${dirOrder.map(d => {
          const sName = userStars[d];
          const sInfo = this.getStarDetail(sName);
          const isCurrent = d === houseDir;
          return `
            <div style="background:rgba(13,17,26,0.8); border:1px solid ${isCurrent ? 'var(--gold-primary)' : 'var(--border-subtle)'}; border-radius:8px; padding:0.8rem; text-align:center; position:relative;">
              ${isCurrent ? `<span style="position:absolute; top:-8px; right:8px; background:var(--gold-primary); color:#000; font-size:0.65rem; font-weight:700; padding:0.1rem 0.4rem; border-radius:4px;">ĐANG CHỌN</span>` : ''}
              <div style="font-size:0.75rem; color:var(--text-muted);">${dirLabels[d].split(' ')[0]}</div>
              <div style="font-size:0.95rem; font-weight:700; color:${sInfo.color}; margin:0.3rem 0;">${sName}</div>
              <div style="font-size:0.7rem; color:var(--text-muted);">${sInfo.tag}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }
}
