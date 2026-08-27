/**
 * BÁT QUÁI SIMULATOR: TIÊN THIÊN (PHỤC HY) VS HẬU THIÊN (VĂN VƯƠNG)
 * Tái hiện cấu trúc đối xứng nhị phân và chu kỳ thời gian 4 mùa.
 */

class BatQuaiSimulator {
  constructor(svgContainerId, infoDisplayId) {
    this.container = document.getElementById(svgContainerId);
    this.infoDisplay = document.getElementById(infoDisplayId);
    this.currentType = 'tien_thien'; // or 'hau_thien'
    this.activeTrigram = null;
    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();
  }

  switchType(type) {
    this.currentType = type;
    this.render();
  }

  render() {
    const isTienThien = this.currentType === 'tien_thien';
    const data = isTienThien ? COSMIC_DATA.bat_quai.tien_thien : COSMIC_DATA.bat_quai.hau_thien;
    const trigrams = data.trigrams;

    const size = 380;
    const cx = size / 2;
    const cy = size / 2;
    const radius = 135;

    let svgHtml = `
      <svg id="bagua-svg" viewBox="0 0 ${size} ${size}">
        <defs>
          <radialGradient id="yinYangGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#E5C07B" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#07090E" stop-opacity="0.9"/>
          </radialGradient>
        </defs>

        <!-- Outer Decorative Cosmic Rings -->
        <circle cx="${cx}" cy="${cy}" r="175" fill="none" stroke="rgba(229, 192, 123, 0.2)" stroke-width="1" stroke-dasharray="4 4" />
        <circle cx="${cx}" cy="${cy}" r="160" fill="none" stroke="rgba(229, 192, 123, 0.4)" stroke-width="1.5" />
        <circle cx="${cx}" cy="${cy}" r="105" fill="none" stroke="rgba(229, 192, 123, 0.15)" stroke-width="1" />

        <!-- Central Yin-Yang Symbol -->
        <g transform="translate(${cx}, ${cy})">
          <!-- Background circle -->
          <circle cx="0" cy="0" r="42" fill="#0A0E17" stroke="#E5C07B" stroke-width="1.5" />
          <!-- Yang half (White/Gold) -->
          <path d="M 0,-42 A 42,42 0 0,1 0,42 A 21,21 0 0,1 0,0 A 21,21 0 0,0 0,-42" fill="#E5C07B" />
          <!-- Yin half (Black) -->
          <path d="M 0,-42 A 21,21 0 0,1 0,0 A 21,21 0 0,0 0,42 A 42,42 0 0,1 0,-42" fill="#0A0E17" />
          <!-- Dots -->
          <circle cx="0" cy="-21" r="5" fill="#0A0E17" />
          <circle cx="0" cy="21" r="5" fill="#E5C07B" />
        </g>
    `;

    // 8 Trigram Positions (0: Top/South or North, rotated by 45 deg)
    // In ancient maps: Nam is at Top!
    const angles = [
      -90,  // Top (Nam)
      -45,  // Top-Right (Tây Nam / Đông Nam)
      0,    // Right (Tây / Đông)
      45,   // Bottom-Right (Tây Bắc / Đông Bắc)
      90,   // Bottom (Bắc)
      135,  // Bottom-Left (Đông Bắc / Tây Bắc)
      180,  // Left (Đông / Tây)
      -135  // Top-Left (Đông Nam / Tây Nam)
    ];

    trigrams.forEach((item, i) => {
      // Map item direction to angle
      const angle = (i * 45 - 90) * (Math.PI / 180);
      const nodeX = cx + radius * Math.cos(angle);
      const nodeY = cy + radius * Math.sin(angle);

      svgHtml += `
        <g class="trigram-node" data-index="${i}" onclick="window.baguaSim.selectTrigram(${i})">
          <!-- Connection ray to center -->
          <line x1="${cx}" y1="${cy}" x2="${nodeX}" y2="${nodeY}" stroke="rgba(229, 192, 123, 0.15)" stroke-width="1" />
          
          <!-- Node circle -->
          <circle cx="${nodeX}" cy="${nodeY}" r="26" fill="#0E1626" stroke="#927238" stroke-width="1.5" />
          
          <!-- Trigram Symbol & Name -->
          <text x="${nodeX}" y="${nodeY - 2}" text-anchor="middle" font-size="20" fill="#E5C07B" font-family="'Noto Serif', serif">${item.symbol}</text>
          <text x="${nodeX}" y="${nodeY + 16}" text-anchor="middle" font-size="10" fill="#94A3B8" font-family="'Inter', sans-serif">${item.name}</text>
        </g>
      `;
    });

    svgHtml += `</svg>`;
    this.container.innerHTML = svgHtml;

    // Show initial info
    this.selectTrigram(0);
  }

  selectTrigram(index) {
    const isTienThien = this.currentType === 'tien_thien';
    const data = isTienThien ? COSMIC_DATA.bat_quai.tien_thien : COSMIC_DATA.bat_quai.hau_thien;
    const item = data.trigrams[index];
    this.activeTrigram = item;

    if (!this.infoDisplay) return;

    if (isTienThien) {
      this.infoDisplay.innerHTML = `
        <div style="animation: fadeIn 0.3s ease;">
          <div style="display:flex; align-items:center; gap:1rem; margin-bottom:1rem;">
            <span style="font-size:3rem; color:var(--gold-primary); font-family:serif;">${item.symbol}</span>
            <div>
              <h3 style="font-family:var(--font-title); font-size:1.6rem; color:var(--text-pure);">Quẻ ${item.name} (${item.nature})</h3>
              <p style="color:var(--gold-primary); font-size:0.85rem;">Mã nhị phân: <code>${item.binary}</code> | Phương vị: <strong>${item.direction}</strong></p>
            </div>
          </div>
          <div class="quote-highlight" style="margin-top:0.5rem; font-size:0.95rem;">
            "${item.meaning}"
          </div>
          <div style="margin-top:1.2rem; background:rgba(255,255,255,0.03); padding:1rem; border-radius:10px; border:1px solid var(--border-subtle);">
            <h4 style="font-size:0.85rem; color:var(--jade-cyan); text-transform:uppercase; letter-spacing:1px; margin-bottom:0.4rem;">Cơ Chế Đối Xứng Tiên Thiên:</h4>
            <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.6;">
              Trong Tiên Thiên, Quẻ <strong>${item.name}</strong> đối xứng tuyệt đối qua tâm với quẻ đối diện để tạo thành cặp lưỡng cực bù trừ hoàn hảo. Trật tự này phản ánh cấu trúc không gian đa chiều trước khi vũ trụ bắt đầu chuyển động thời gian.
            </p>
          </div>
        </div>
      `;
    } else {
      this.infoDisplay.innerHTML = `
        <div style="animation: fadeIn 0.3s ease;">
          <div style="display:flex; align-items:center; gap:1rem; margin-bottom:1rem;">
            <span style="font-size:3rem; color:var(--gold-primary); font-family:serif;">${item.symbol}</span>
            <div>
              <h3 style="font-family:var(--font-title); font-size:1.6rem; color:var(--text-pure);">Quẻ ${item.name} (Số ${item.number})</h3>
              <p style="color:var(--gold-primary); font-size:0.85rem;">Ngũ Hành: <strong>${item.element}</strong> | Phương vị: <strong>${item.direction}</strong> | Tiết Khí: <strong>${item.season}</strong></p>
            </div>
          </div>
          <div class="quote-highlight" style="margin-top:0.5rem; font-size:0.95rem;">
            "${item.meaning}"
          </div>
          <div style="margin-top:1.2rem; background:rgba(255,255,255,0.03); padding:1rem; border-radius:10px; border:1px solid var(--border-subtle);">
            <h4 style="font-size:0.85rem; color:var(--jade-cyan); text-transform:uppercase; letter-spacing:1px; margin-bottom:0.4rem;">Quy Luật Vận Động Khí Tiết Hậu Thiên:</h4>
            <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.6;">
              Hậu Thiên Bát Quái bố trí theo sự tuần hoàn của Mặt Trời và Bốn Mùa. Khí Mộc sinh sôi ở phương Đông (Chấn), bùng cháy thành Hỏa ở phương Nam (Ly), thu hoạch thành Kim ở phương Tây (Đoài) và quy tàng thành Thủy ở phương Bắc (Khảm).
            </p>
          </div>
        </div>
      `;
    }
  }
}
