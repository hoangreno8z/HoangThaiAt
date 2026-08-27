/**
 * MA TRẬN CỘNG HƯỞNG TRƯỜNG KHÍ & CƠ CHẾ KHOA HỌC SINH CÁT HUNG
 * Giải mã cơ học lượng tử cổ đại, tương tác 3 tầng: Thiên (Thời) - Địa (Không) - Nhân (Tâm thể).
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
      { id: "spring", name: "Mùa Xuân (Dương khí sơ sinh, Mộc vượng - Tiết Lập Xuân/Xuân Phân)", element: "wood", qi: "Khí Ôn vươn tỏa" },
      { id: "summer", name: "Mùa Hạ (Dương khí cực thịnh, Hỏa vượng - Tiết Lập Hạ/Hạ Chí)", element: "fire", qi: "Khí Nhiệt thăng hoa" },
      { id: "autumn", name: "Mùa Thu (Âm khí sơ giáng, Kim vượng - Tiết Lập Thu/Thu Phân)", element: "metal", qi: "Khí Táo thu liễm" },
      { id: "winter", name: "Mùa Đông (Âm khí cực thịnh, Thủy vượng - Tiết Lập Đông/Đông Chí)", element: "water", qi: "Khí Hàn tàng ẩn" },
      { id: "interseason", name: "Tứ Quý Giao Thời (Khí điều hòa, Thổ vượng - Tháng 3,6,9,12 âm lịch)", element: "earth", qi: "Khí Thấp dung nạp" }
    ];

    const diaOptions = [
      { id: "east", name: "Phương Đông (Tọa Giáp - Mão - Ất: Chấn Mộc, Đón Khí Thái Dương)", element: "wood", field: "Từ trường sinh trưởng" },
      { id: "south", name: "Phương Nam (Tọa Bính - Ngọ - Đinh: Ly Hỏa, Đón Bức Xạ Quang Minh)", element: "fire", field: "Từ trường quang nhiệt cực đại" },
      { id: "west", name: "Phương Tây (Tọa Canh - Dậu - Tân: Đoài Kim, Đón Khí Thu Liễm Sát)", element: "metal", field: "Từ trường thanh lọc ngưng kết" },
      { id: "north", name: "Phương Bắc (Tọa Nhâm - Tý - Quý: Khảm Thủy, Đón Khí Phục Tàng)", element: "water", field: "Từ trường tiềm năng lắng đọng" },
      { id: "center", name: "Trung Cung / Tứ Duy (Tọa Khôn Cấn Tốn Càn: Thổ Địa Nuôi Dưỡng)", element: "earth", field: "Từ trường ổn định trung hòa" }
    ];

    const nhanOptions = [
      { id: "wood_person", name: "Mệnh / Thể Trạng Mộc (Tạng Can, Cần Sinh Khí Vươn Tỏa)", element: "wood", trait: "Sáng tạo, kiên trì, lòng nhân" },
      { id: "fire_person", name: "Mệnh / Thể Trạng Hỏa (Tạng Tâm, Cần Nhiệt Lượng Bộc Lộ)", element: "fire", trait: "Nhiệt huyết, minh mẫn, lễ nghĩa" },
      { id: "earth_person", name: "Mệnh / Thể Trạng Thổ (Tạng Tỳ, Cần Sự Vững Chãi Dung Nạp)", element: "earth", trait: "Bảo bọc, trung tín, ổn định" },
      { id: "metal_person", name: "Mệnh / Thể Trạng Kim (Tạng Phế, Cần Khí Tiết Thanh Lọc)", element: "metal", trait: "Kỷ luật, quyết đoán, nghĩa khí" },
      { id: "water_person", name: "Mệnh / Thể Trạng Thủy (Tạng Thận, Cần Chiều Sâu Trí Tuệ)", element: "water", trait: "Linh hoạt, mưu lược, thông tuệ" }
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

    let score = 50; // Neutral baseline
    let log = [];

    // 1. Thiên vs Địa
    const thienDiaRel = this.getRelationship(elThien, elDia, "Thiên Thời", "Địa Lợi");
    score += thienDiaRel.score;
    log.push(thienDiaRel.desc);

    // 2. Địa vs Nhân
    const diaNhanRel = this.getRelationship(elDia, elNhan, "Địa Lợi", "Nhân Khí");
    score += diaNhanRel.score;
    log.push(diaNhanRel.desc);

    // 3. Thiên vs Nhân
    const thienNhanRel = this.getRelationship(elThien, elNhan, "Thiên Thời", "Nhân Khí");
    score += thienNhanRel.score;
    log.push(thienNhanRel.desc);

    // Status Determination
    let badgeClass = "resonance-trunghoa";
    let stateName = "BÌNH HÒA (CÂN BẰNG TĨNH)";
    let physicsExplanation = "";

    if (score >= 85) {
      badgeClass = "resonance-cat";
      stateName = "ĐẠI CÁT: CỘNG HƯỞNG ĐỒNG PHA TUYỆT ĐỐI";
      physicsExplanation = `
        <strong>Cơ Học Vật Lý Trường Khí:</strong> Ba vector năng lượng (Góc chiếu Thiên văn, Từ trường Phương vị Địa lý và Tần số Sinh học Nhân thể) hội tụ cùng pha dao động (Constructive Wave Interference). Dòng khí lưu thông với trở kháng bằng 0, kích thích hệ thần kinh trung ương tiết ra hormone cân bằng, tăng cường năng lực trực giác và đưa ra các quyết sách chuẩn xác. Đây chính là bản chất của <em>'Thuận Thiên giả tồn, đắc Khí giả vượng'</em>.
      `;
    } else if (score >= 65) {
      badgeClass = "resonance-cat";
      stateName = "TIỂU CÁT: TƯƠNG SINH THUẬN DÒNG";
      physicsExplanation = `
        <strong>Cơ Học Vật Lý Trường Khí:</strong> Môi trường địa từ trường và thời gian nuôi dưỡng, bổ trợ cho thể trạng nhân sinh. Các xung lực phản kháng ở mức thấp, sinh thái nội môi trường ổn định, cơ thể duy trì được thế cân bằng sinh hóa tích cực.
      `;
    } else if (score <= 30) {
      badgeClass = "resonance-hung";
      stateName = "ĐẠI HUNG: XUNG ĐỘT PHA & PHÁ VỠ TỪ TRƯỜNG SINH HỌC";
      physicsExplanation = `
        <strong>Cơ Học Vật Lý Trường Khí:</strong> Xảy ra hiện tượng <strong>Triệt Tiêu Pha & Nhiễu Loạn Dòng Xoáy (Destructive Phase Interference / Severe Turbulence)</strong>. Vector năng lượng của thời gian và không gian đối kháng trực diện với tạng phủ con người, làm lệch pha dao động điện từ của tế bào, dẫn tới ức chế tuần hoàn máu não, mất ngủ, căng thẳng và sai lầm trong hành động.
      `;
    } else if (score < 50) {
      badgeClass = "resonance-hung";
      stateName = "TIỂU HUNG: KHÍ KHẮC Ứ TRỆ";
      physicsExplanation = `
        <strong>Cơ Học Vật Lý Trường Khí:</strong> Xuất hiện sự áp chế giữa không gian hoặc thời gian với nhân thể. Cần sử dụng nguyên lý <em>'Chế Hóa'</em> (bổ sung hành trung gian làm cầu nối chuyển tiếp) để hóa giải xung lực trực diện.
      `;
    } else {
      physicsExplanation = `
        <strong>Cơ Học Vật Lý Trường Khí:</strong> Năng lượng ở trạng thái chuyển tiếp trung dung, không tương sinh cực đại cũng không có xung sát tiêu hủy. Thích hợp cho việc củng cố nội lực và bảo toàn trạng thái hiện hữu.
      `;
    }

    this.renderResult(score, stateName, badgeClass, log, physicsExplanation);
  }

  getRelationship(elemA, elemB, labelA, labelB) {
    const sinhMap = { wood: "fire", fire: "earth", earth: "metal", metal: "water", water: "wood" };
    const khacMap = { wood: "earth", earth: "water", water: "fire", fire: "metal", metal: "wood" };

    const nameMap = { wood: "MỘC", fire: "HỎA", earth: "THỔ", metal: "KIM", water: "THỦY" };

    if (elemA === elemB) {
      return { 
        score: 15, 
        desc: `• <strong>${labelA} [${nameMap[elemA]}] song hành ${labelB} [${nameMap[elemB]}]:</strong> Đồng thanh tương ứng, đồng khí tương cầu, trường lực củng cố vững bền (+15 điểm).` 
      };
    }
    if (sinhMap[elemA] === elemB) {
      return { 
        score: 20, 
        desc: `• <strong>${labelA} [${nameMap[elemA]}] Tương Sinh ${labelB} [${nameMap[elemB]}]:</strong> Dòng năng lượng chuyển hóa dồi dào, thuận tự nhiên nuôi dưỡng (+20 điểm).` 
      };
    }
    if (sinhMap[elemB] === elemA) {
      return { 
        score: 15, 
        desc: `• <strong>${labelB} [${nameMap[elemB]}] sinh trợ ${labelA} [${nameMap[elemA]}]:</strong> Đắc sinh khí tương trợ, mở rộng tiềm năng (+15 điểm).` 
      };
    }
    if (khacMap[elemA] === elemB) {
      return { 
        score: -20, 
        desc: `• <strong>${labelA} [${nameMap[elemA]}] Tương Khắc ${labelB} [${nameMap[elemB]}]:</strong> Xung lực áp chế trực diện, bẻ gãy từ trường (-20 điểm).` 
      };
    }
    if (khacMap[elemB] === elemA) {
      return { 
        score: -15, 
        desc: `• <strong>${labelB} [${nameMap[elemB]}] Phản Khắc ${labelA} [${nameMap[elemA]}]:</strong> Tổn hao năng lượng, lực cản nội tại phát sinh (-15 điểm).` 
      };
    }
    return { score: 0, desc: `• <strong>${labelA} và ${labelB}:</strong> Bình hòa tương đối.` };
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
        <div style="font-size:0.88rem; color:var(--text-muted); margin-bottom:1rem; line-height:1.7;">
          ${log.join('<br>')}
        </div>
        <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-subtle); border-radius:10px; padding:1.1rem 1.4rem; font-size:0.9rem; color:var(--text-pure); line-height:1.7;">
          ${physicsExplanation}
        </div>
      </div>
    `;
  }
}
