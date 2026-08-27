/**
 * BỘ TÍNH TOÁN MA TRẬN HUYỀN KHÔNG PHI TINH (THUẬT TOÁN HUYỀN KHÔNG PHI TINH CHÁNH TÔNG)
 * Lập Tinh Bàn 3 tầng (Vận - Tọa - Hướng) cho 24 Sơn Hướng trong 9 Vận theo quỹ đạo Lạc Thư.
 */

class HuyenKhongEngine {
  constructor(selectors, displayContainerId) {
    this.periodSelect = document.getElementById(selectors.period);
    this.mountainSelect = document.getElementById(selectors.mountain);
    this.calcBtn = document.getElementById(selectors.btn);
    this.displayContainer = document.getElementById(displayContainerId);

    // Thứ tự 9 cung theo ma phương Lạc Thư: Trung Cung(5), Càn(6), Đoài(7), Cấn(8), Ly(9), Khảm(1), Khôn(2), Chấn(3), Tốn(4)
    this.flyPath = [5, 6, 7, 8, 9, 1, 2, 3, 4];
    
    // Ma trận hiển thị 3x3 trực quan: [ [Tốn(4), Ly(9), Khôn(2)], [Chấn(3), Trung(5), Đoài(7)], [Cấn(8), Khảm(1), Càn(6)] ]
    this.gridDisplayOrder = [
      [4, 9, 2],
      [3, 5, 7],
      [8, 1, 6]
    ];

    this.palaceNames = {
      1: "Khảm (Chính Bắc)",
      2: "Khôn (Tây Nam)",
      3: "Chấn (Chính Đông)",
      4: "Tốn (Đông Nam)",
      5: "Trung Cung (Ở Giữa)",
      6: "Càn (Tây Bắc)",
      7: "Đoài (Chính Tây)",
      8: "Cấn (Đông Bắc)",
      9: "Ly (Chính Nam)"
    };

    // 24 Sơn Hướng: [Tên, Cung gốc Lạc Thư, Tam Nguyên Long (0:Địa, 1:Thiên, 2:Nhân), Cực tính Âm Dương (+ / -)]
    this.mountainData = {
      nham: { name: "Nhâm", palace: 1, dragon: 0, sign: 1, opposite: "binh" },
      ty: { name: "Tý", palace: 1, dragon: 1, sign: -1, opposite: "ngo" },
      quy: { name: "Quý", palace: 1, dragon: 2, sign: -1, opposite: "dinh" },

      suu: { name: "Sửu", palace: 8, dragon: 0, sign: -1, opposite: "mui" },
      can: { name: "Cấn", palace: 8, dragon: 1, sign: 1, opposite: "khon" },
      dan: { name: "Dần", palace: 8, dragon: 2, sign: 1, opposite: "than" },

      giap: { name: "Giáp", palace: 3, dragon: 0, sign: 1, opposite: "canh" },
      mao: { name: "Mão", palace: 3, dragon: 1, sign: -1, opposite: "dau" },
      at: { name: "Ất", palace: 3, dragon: 2, sign: -1, opposite: "tan" },

      thin: { name: "Thìn", palace: 4, dragon: 0, sign: -1, opposite: "tuat" },
      ton: { name: "Tốn", palace: 4, dragon: 1, sign: 1, opposite: "can_mountain" },
      ti: { name: "Tỵ", palace: 4, dragon: 2, sign: 1, opposite: "hoi" },

      binh: { name: "Bính", palace: 9, dragon: 0, sign: 1, opposite: "nham" },
      ngo: { name: "Ngọ", palace: 9, dragon: 1, sign: -1, opposite: "ty" },
      dinh: { name: "Đinh", palace: 9, dragon: 2, sign: -1, opposite: "quy" },

      mui: { name: "Mùi", palace: 2, dragon: 0, sign: -1, opposite: "suu" },
      khon: { name: "Khôn", palace: 2, dragon: 1, sign: 1, opposite: "can" },
      than: { name: "Thân", palace: 2, dragon: 2, sign: 1, opposite: "dan" },

      canh: { name: "Canh", palace: 7, dragon: 0, sign: 1, opposite: "giap" },
      dau: { name: "Dậu", palace: 7, dragon: 1, sign: -1, opposite: "mao" },
      tan: { name: "Tân", palace: 7, dragon: 2, sign: -1, opposite: "at" },

      tuat: { name: "Tuất", palace: 6, dragon: 0, sign: -1, opposite: "thin" },
      can_mountain: { name: "Càn", palace: 6, dragon: 1, sign: 1, opposite: "ton" },
      hoi: { name: "Hợi", palace: 6, dragon: 2, sign: 1, opposite: "ti" }
    };

    // Bảng tra Tam Nguyên Long cho từng Cung (để tìm dấu của Sao Tọa / Sao Hướng khi nhập Trung Cung)
    // Cung 1(Khảm): [Nhâm(+), Tý(-), Quý(-)]
    // Cung 2(Khôn): [Mùi(-), Khôn(+), Thân(+)]
    // Cung 3(Chấn): [Giáp(+), Mão(-), Ất(-)]
    // Cung 4(Tốn): [Thìn(-), Tốn(+), Tỵ(+)]
    // Cung 6(Càn): [Tuất(-), Càn(+), Hợi(+)]
    // Cung 7(Đoài): [Canh(+), Dậu(-), Tân(-)]
    // Cung 8(Cấn): [Sửu(-), Cấn(+), Dần(+)]
    // Cung 9(Ly): [Bính(+), Ngọ(-), Đinh(-)]
    this.palaceDragonSigns = {
      1: [1, -1, -1],
      2: [-1, 1, 1],
      3: [1, -1, -1],
      4: [-1, 1, 1],
      6: [-1, 1, 1],
      7: [1, -1, -1],
      8: [-1, 1, 1],
      9: [1, -1, -1]
    };

    this.init();
  }

  init() {
    this.populateSelects();
    if (this.calcBtn) {
      this.calcBtn.addEventListener('click', () => {
        
        this.calculate();
      });
    }
    this.calculate();
  }

  populateSelects() {
    if (this.periodSelect) {
      this.periodSelect.innerHTML = COSMIC_DATA.huyen_khong.periods.map(p => `
        <option value="${p.period}" ${p.period === 9 ? 'selected' : ''}>Vận ${p.period} (${p.years})</option>
      `).join('');
    }

    if (this.mountainSelect) {
      this.mountainSelect.innerHTML = COSMIC_DATA.huyen_khong.mountains_24.map(m => {
        const mInfo = this.mountainData[m.id];
        const oppInfo = this.mountainData[mInfo.opposite];
        return `<option value="${m.id}" ${m.id === 'ty' ? 'selected' : ''}>Tọa ${mInfo.name} - Hướng ${oppInfo.name} (${m.degree})</option>`;
      }).join('');
    }
  }

  // Thuật toán phi tinh cho một sao nhập trung cung (isForward = true/false)
  flyStars(centerStar, isForward) {
    const result = {};
    const step = isForward ? 1 : -1;
    let currentStar = centerStar;

    for (let i = 0; i < this.flyPath.length; i++) {
      const palace = this.flyPath[i];
      result[palace] = currentStar;
      currentStar += step;
      if (currentStar > 9) currentStar = 1;
      if (currentStar < 1) currentStar = 9;
    }
    return result;
  }

  calculate() {
    const period = parseInt(this.periodSelect.value, 10) || 9;
    const mountainKey = this.mountainSelect.value || 'ty';

    const sitMountain = this.mountainData[mountainKey];
    const faceMountain = this.mountainData[sitMountain.opposite];

    const sitPalace = sitMountain.palace;
    const facePalace = faceMountain.palace;
    const dragonIndex = sitMountain.dragon; // 0: Địa, 1: Thiên, 2: Nhân

    // 1. VẬN BÀN: Sao Vận nhập Trung Cung bay Thuận
    const vanBan = this.flyStars(period, true);

    // 2. TỌA TINH (Sơn Tinh) & HƯỚNG TINH
    const sitStarInVanBan = vanBan[sitPalace];
    const faceStarInVanBan = vanBan[facePalace];

    // Xác định chiều bay của Tọa Tinh
    let sitSign = 1;
    if (sitStarInVanBan === 5) {
      // Sao số 5 mượn cực tính của sơn tọa ban đầu
      sitSign = sitMountain.sign;
    } else {
      sitSign = this.palaceDragonSigns[sitStarInVanBan][dragonIndex];
    }

    // Xác định chiều bay của Hướng Tinh
    let faceSign = 1;
    if (faceStarInVanBan === 5) {
      // Sao số 5 mượn cực tính của sơn hướng ban đầu
      faceSign = faceMountain.sign;
    } else {
      faceSign = this.palaceDragonSigns[faceStarInVanBan][dragonIndex];
    }

    const toaBan = this.flyStars(sitStarInVanBan, sitSign === 1);
    const huongBan = this.flyStars(faceStarInVanBan, faceSign === 1);

    // Đánh giá cách cục phong thủy
    const analysis = this.analyzeChart(period, sitPalace, facePalace, toaBan, huongBan);

    this.renderResult(period, sitMountain, faceMountain, vanBan, toaBan, huongBan, sitSign, faceSign, analysis);
  }

  analyzeChart(period, sitPalace, facePalace, toaBan, huongBan) {
    const sitStarAtSit = toaBan[sitPalace];
    const faceStarAtFace = huongBan[facePalace];
    const faceStarAtSit = huongBan[sitPalace];
    const sitStarAtFace = toaBan[facePalace];

    if (sitStarAtSit === period && faceStarAtFace === period) {
      return {
        type: "vuong_son_vuong_huong",
        title: "VƯỢNG SƠN VƯỢNG HƯỚNG (ĐẠI CÁT)",
        desc: "Cách cục thượng cát nhất trong Huyền Không Phi Tinh: Đương vận Tọa Tinh đáo Tọa (chủ về nhân đinh thịnh vượng, gia đạo an khang, sức khỏe trường thọ) và Đương vận Hướng Tinh đáo Hướng (chủ về tài lộc dồi dào, kinh doanh phát đạt)."
      };
    }
    if (faceStarAtFace === period && sitStarAtFace === period) {
      return {
        type: "song_tinh_dao_huong",
        title: "SONG TINH ĐÁO HƯỚNG (VƯỢNG TÀI HƯ ĐINH)",
        desc: "Cả hai sao Tọa và Hướng đương vận cùng tụ lại ở phương Hướng: Cực kỳ vượng về tài lộc và kinh doanh, nhưng phương vị này cần có cả nước (Thủy) và núi gò xa xa (Sa) để bổ cứu cho nhân đinh."
      };
    }
    if (sitStarAtSit === period && faceStarAtSit === period) {
      return {
        type: "song_tinh_dao_toa",
        title: "SONG TINH ĐÁO TỌA (VƯỢNG ĐINH HƯ TÀI)",
        desc: "Cả hai sao Tọa và Hướng đương vận cùng tụ lại ở phương Tọa: Cực kỳ vượng về sức khỏe, con cái và sự nghiệp học vấn, nhưng tài vận chậm phát, cần có dòng nước phía sau nhà để kích hoạt tài lộc."
      };
    }
    if (sitStarAtFace === period && faceStarAtSit === period) {
      return {
        type: "thuong_son_ha_thuy",
        title: "THƯỢNG SƠN HẠ THỦY (HUNG CÁCH CẦN HÓA GIẢI)",
        desc: "Sao Tọa lên núi lại rơi xuống nước, sao Hướng xuống nước lại leo lên núi. Nếu không có địa hình loan đầu đặc biệt (trước nhà có núi, sau nhà có nước) thì chủ về hao tài tốn của và tổn hại sức khỏe."
      };
    }
    return {
      type: "binh_hoa",
      title: "CÁCH CỤC BÌNH HÒA BIẾN DỊCH",
      desc: "Trạch vận phân bổ đồng đều theo các cung. Cần dựa vào công năng cụ thể từng phòng (cửa chính, phòng ngủ, bếp, phòng làm việc) để phối hợp nạp sinh khí từ các sao cát tinh."
    };
  }

  renderResult(period, sitMountain, faceMountain, vanBan, toaBan, huongBan, sitSign, faceSign, analysis) {
    if (!this.displayContainer) return;

    this.displayContainer.innerHTML = `
      <div style="background:rgba(229,192,123,0.06); border:1px solid var(--border-active); border-radius:12px; padding:1.2rem; margin-bottom:1.5rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem;">
          <div>
            <span style="font-size:0.75rem; color:var(--jade-cyan); text-transform:uppercase; letter-spacing:1px;">Tinh Bàn Huyền Không Vận ${period}</span>
            <h3 style="font-family:var(--font-title); font-size:1.5rem; color:var(--gold-primary); margin:0.2rem 0;">
              Tọa ${sitMountain.name} - Hướng ${faceMountain.name}
            </h3>
          </div>
          <div style="background:rgba(0,0,0,0.5); border:1px solid var(--border-subtle); padding:0.5rem 1rem; border-radius:8px; font-size:0.85rem; color:var(--text-pure);">
            Tọa Tinh [${toaBan[5]}]: <strong>${sitSign === 1 ? 'Phi Thuận (+)' : 'Phi Nghịch (-)'}</strong> • 
            Hướng Tinh [${huongBan[5]}]: <strong>${faceSign === 1 ? 'Phi Thuận (+)' : 'Phi Nghịch (-)'}</strong>
          </div>
        </div>

        <div style="margin-top:0.8rem; padding-top:0.8rem; border-top:1px solid rgba(255,255,255,0.05);">
          <span style="font-size:0.8rem; color:var(--gold-primary); font-weight:700;">ĐÁNH GIÁ CÁCH CỤC: </span>
          <strong style="color:var(--text-pure); font-size:0.95rem;">${analysis.title}</strong>
          <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.6; margin-top:0.3rem;">${analysis.desc}</p>
        </div>
      </div>

      <!-- MA TRẬN 3X3 CỬU CUNG PHI TINH -->
      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:0.8rem; max-width:560px; margin:0 auto 1.5rem;">
        ${this.gridDisplayOrder.map(row => row.map(palaceId => {
          const vStar = vanBan[palaceId];
          const tStar = toaBan[palaceId];
          const hStar = huongBan[palaceId];
          const isCenter = palaceId === 5;
          const isSit = palaceId === sitMountain.palace;
          const isFace = palaceId === faceMountain.palace;

          let badge = "";
          if (isSit) badge = `<span style="position:absolute; bottom:4px; left:4px; font-size:0.65rem; background:rgba(224,108,117,0.3); color:#E06C75; padding:0.1rem 0.3rem; border-radius:3px;">TỌA</span>`;
          if (isFace) badge = `<span style="position:absolute; bottom:4px; right:4px; font-size:0.65rem; background:rgba(16,185,129,0.3); color:#10B981; padding:0.1rem 0.3rem; border-radius:3px;">HƯỚNG</span>`;

          return `
            <div style="background:${isCenter ? 'rgba(229,192,123,0.08)' : 'rgba(13,17,26,0.9)'}; border:1px solid ${isCenter ? 'var(--gold-primary)' : 'var(--border-subtle)'}; border-radius:10px; padding:0.8rem; position:relative; min-height:95px; display:flex; flex-direction:column; justify-content:space-between;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:1.3rem; font-weight:800; color:#E06C75;" title="Tọa Tinh (Sơn Tinh - Quản Đinh)">${tStar}</span>
                <span style="font-size:1.3rem; font-weight:800; color:#10B981;" title="Hướng Tinh (Quản Tài)">${hStar}</span>
              </div>
              <div style="text-align:center;">
                <span style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-sans);">${this.palaceNames[palaceId].split(' ')[0]}</span>
              </div>
              <div style="text-align:center;">
                <span style="font-size:1.1rem; font-weight:700; color:var(--gold-primary);" title="Vận Tinh">${vStar}</span>
              </div>
              ${badge}
            </div>
          `;
        }).join('')).join('')}
      </div>

      <div style="display:flex; justify-content:center; gap:1.5rem; font-size:0.8rem; color:var(--text-muted);">
        <span><strong style="color:#E06C75;">Góc Trái Trên:</strong> Tọa Tinh (Quản Nhân Đinh / Sức Khỏe)</span>
        <span><strong style="color:#10B981;">Góc Phải Trên:</strong> Hướng Tinh (Quản Tài Lộc / Tiền Bạc)</span>
        <span><strong style="color:var(--gold-primary);">Chính Giữa Dưới:</strong> Vận Tinh</span>
      </div>
    `;
  }
}
