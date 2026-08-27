/**
 * MA TRẬN CỘNG HƯỞNG TRƯỜNG KHÍ & CƠ CHẾ SINH CÁT HUNG
 * Giải mã cơ học phương vị, thời gian và con người.
 */

class CatHungMatrixEngine {
  constructor(selectors, resultContainerId) {
    this.thienSelect = document.getElementById(selectors.thien);
    this.diaSelect = document.getElementById(selectors.dia);
    this.nhanSelect = document.getElementById(selectors.nhan);
    this.resultContainer = document.getElementById(resultContainerId);
    this.init();
  }

  init() {
    if (!this.thienSelect || !this.diaSelect || !this.nhanSelect) return;
    
    this.populateOptions();
    this.bindEvents();
    this.calculateResonance();
  }

  populateOptions() {
    const thienOptions = [
      { id: "spring", name: "Mùa Xuân (Dương khí sơ sinh, Mộc vượng)", element: "wood" },
      { id: "summer", name: "Mùa Hạ (Dương khí cực thịnh, Hỏa vượng)", element: "fire" },
      { id: "autumn", name: "Mùa Thu (Âm khí sơ giáng, Kim vượng)", element: "metal" },
      { id: "winter", name: "Mùa Đông (Âm khí cực thịnh, Thủy vượng)", element: "water" },
      { id: "interseason", name: "Tứ Quý Giao Thời (Khí điều hòa, Thổ vượng)", element: "earth" }
    ];

    const diaOptions = [
      { id: "east", name: "Phương Đông (Khí Chấn Mộc - Khai mở)", element: "wood" },
      { id: "south", name: "Phương Nam (Khí Ly Hỏa - Quang minh/Nhiệt)", element: "fire" },
      { id: "west", name: "Phương Tây (Khí Đoài Kim - Thu liễm/Sát)", element: "metal" },
      { id: "north", name: "Phương Bắc (Khí Khảm Thủy - Trầm tĩnh/Hàn)", element: "water" },
      { id: "center", name: "Trung Cung / Thổ địa (Khí Khôn Cấn - Nuôi dưỡng)", element: "earth" }
    ];

    const nhanOptions = [
      { id: "wood_person", name: "Mệnh/Tâm Mộc (Khát khao sáng tạo, hướng thượng)", element: "wood" },
      { id: "fire_person", name: "Mệnh/Tâm Hỏa (Nhiệt huyết, bộc phát, hành động)", element: "fire" },
      { id: "earth_person", name: "Mệnh/Tâm Thổ (Vững chãi, bảo bọc, trung dung)", element: "earth" },
      { id: "metal_person", name: "Mệnh/Tâm Kim (Kỷ luật, thanh lọc, quyết đoán)", element: "metal" },
      { id: "water_person", name: "Mệnh/Tâm Thủy (Linh hoạt, mưu lược, trực giác)", element: "water" }
    ];

    this.fillSelect(this.thienSelect, thienOptions);
    this.fillSelect(this.diaSelect, diaOptions);
    this.fillSelect(this.nhanSelect, nhanOptions);
  }

  fillSelect(selectElem, options) {
    selectElem.innerHTML = options.map(opt => `<option value="${opt.element}">${opt.name}</option>`).join('');
  }

  bindEvents() {
    this.thienSelect.addEventListener('change', () => this.calculateResonance());
    this.diaSelect.addEventListener('change', () => this.calculateResonance());
    this.nhanSelect.addEventListener('change', () => this.calculateResonance());
  }

  calculateResonance() {
    const elThien = this.thienSelect.value;
    const elDia = this.diaSelect.value;
    const elNhan = this.nhanSelect.value;

    // Evaluate Relationship:
    // Score based on Sinh, Đồng Hành (Tỉ hòa), Khắc
    let score = 50; // Neutral baseline
    let log = [];

    // 1. Thiên vs Địa
    const thienDiaRel = this.getRelationship(elThien, elDia);
    score += thienDiaRel.score;
    log.push(`• <strong>Thiên - Địa:</strong> ${thienDiaRel.desc}`);

    // 2. Địa vs Nhân
    const diaNhanRel = this.getRelationship(elDia, elNhan);
    score += diaNhanRel.score;
    log.push(`• <strong>Địa - Nhân:</strong> ${diaNhanRel.desc}`);

    // 3. Thiên vs Nhân
    const thienNhanRel = this.getRelationship(elThien, elNhan);
    score += thienNhanRel.score;
    log.push(`• <strong>Thiên - Nhân:</strong> ${thienNhanRel.desc}`);

    // Determine Status
    let badgeClass = "resonance-trunghoa";
    let stateName = "BÌNH HÒA / TRUNG DUNG";
    let physicsExplanation = "";

    if (score >= 80) {
      badgeClass = "resonance-cat";
      stateName = "ĐẠI CÁT (CỘNG HƯỞNG ĐỒNG PHA)";
      physicsExplanation = "Trường lực ba ngôi (Thiên - Địa - Nhân) rơi vào trạng thái <strong>Cộng hưởng tích cực (Constructive Phase Resonance)</strong>. Dòng khí lưu thông trơn tru, không có lực cản hay nhiễu loạn từ trường, giúp tâm trí hanh thông, sinh lực dồi dào, thu hút mọi cơ duyên cát lợi.";
    } else if (score >= 60) {
      badgeClass = "resonance-cat";
      stateName = "TIỂU CÁT (TƯƠNG SINH THUẬN KHÍ)";
      physicsExplanation = "Địa khí và Thiên khí tương trợ hoặc nâng đỡ Nhân thể, tạo ra môi trường tương thích thuận chiều phát triển.";
    } else if (score <= 30) {
      badgeClass = "resonance-hung";
      stateName = "ĐẠI HUNG (XUNG SÁT NGHỊCH PHA)";
      physicsExplanation = "Trường lực xảy ra <strong>Xung đột pha cực đại (Phase Cancellation / Destructive Interference)</strong>. Các vectơ năng lượng đối kháng trực diện, bẻ gãy từ trường sinh học, gây ức chế thần kinh, tạo ra sự ứ trệ và hao tổn nặng nề.";
    } else if (score < 50) {
      badgeClass = "resonance-hung";
      stateName = "TIỂU HUNG (KHÍ KHẮC Ứ TRỆ)";
      physicsExplanation = "Xuất hiện sự xung khắc giữa thời gian hoặc phương vị với nhân thể. Cần dùng nguyên lý <em>Chế Hóa</em> (hành trung gian) để bắc cầu hóa giải xung lực.";
    } else {
      physicsExplanation = "Năng lượng ở trạng thái cân bằng động, không tương sinh cực đại cũng không xung khắc tiêu hủy.";
    }

    this.renderResult(score, stateName, badgeClass, log, physicsExplanation);
  }

  getRelationship(elemA, elemB) {
    const sinhMap = {
      wood: "fire",
      fire: "earth",
      earth: "metal",
      metal: "water",
      water: "wood"
    };

    const khacMap = {
      wood: "earth",
      earth: "water",
      water: "fire",
      fire: "metal",
      metal: "wood"
    };

    if (elemA === elemB) {
      return { score: 15, desc: `Đồng khí tương cầu (Cùng hành ${elemA.toUpperCase()}), trường lực củng cố vững bền (+15 điểm).` };
    }
    if (sinhMap[elemA] === elemB) {
      return { score: 20, desc: `${elemA.toUpperCase()} sinh ${elemB.toUpperCase()}: Dòng năng lượng dồi dào nuôi dưỡng phát triển (+20 điểm).` };
    }
    if (sinhMap[elemB] === elemA) {
      return { score: 15, desc: `${elemB.toUpperCase()} được ${elemA.toUpperCase()} hỗ trợ: Đắc sinh khí thuận lợi (+15 điểm).` };
    }
    if (khacMap[elemA] === elemB) {
      return { score: -20, desc: `${elemA.toUpperCase()} khắc ${elemB.toUpperCase()}: Xung lực áp chế, nghịch dòng khí quyển (-20 điểm).` };
    }
    if (khacMap[elemB] === elemA) {
      return { score: -15, desc: `${elemB.toUpperCase()} phản khắc ${elemA.toUpperCase()}: Tổn hao năng lượng (-15 điểm).` };
    }
    return { score: 0, desc: "Bình hòa tương đối." };
  }

  renderResult(score, stateName, badgeClass, log, physicsExplanation) {
    if (!this.resultContainer) return;

    this.resultContainer.innerHTML = `
      <div class="resonance-score-badge ${badgeClass}">
        <span class="score-num">${score}</span>
        <span class="score-label">${stateName}</span>
      </div>
      <div>
        <h4 style="font-family:var(--font-title); font-size:1.15rem; color:var(--gold-primary); margin-bottom:0.6rem;">
          Giải Mã Cơ Học Trường Khí Tương Tác:
        </h4>
        <div style="font-size:0.88rem; color:var(--text-muted); margin-bottom:1rem; line-height:1.6;">
          ${log.join('<br>')}
        </div>
        <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-subtle); border-radius:10px; padding:0.9rem 1.2rem; font-size:0.85rem; color:var(--text-pure); line-height:1.6;">
          ${physicsExplanation}
        </div>
      </div>
    `;
  }
}
