/**
 * BỘ MÔ PHỎNG VŨ TRỤ QUAN TRỐNG ĐỒNG ĐÔNG SƠN (100% CODE SVG)
 * Tái hiện Ngôi sao Thái Cực 14 cánh, Chim Lạc Dương khí, Cóc ngậm mưa Âm khí và Mật mã Nhị phân.
 */

class TrongDongEngine {
  constructor(svgContainerId, infoPanelId) {
    this.container = document.getElementById(svgContainerId);
    this.infoPanel = document.getElementById(infoPanelId);
    this.activeRing = 'sun';
    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();
    this.selectRing('sun');
  }

  render() {
    const size = 420;
    const cx = size / 2;
    const cy = size / 2;

    let svgHtml = `
      <svg id="trongdong-svg" viewBox="0 0 ${size} ${size}" class="trongdong-interactive-svg">
        <defs>
          <filter id="drumGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Nền Đồng Thau Cổ Kính -->
        <circle cx="${cx}" cy="${cy}" r="200" fill="#0C101A" stroke="#B89047" stroke-width="2.5" />
        <circle cx="${cx}" cy="${cy}" r="185" fill="none" stroke="rgba(229,192,123,0.3)" stroke-width="1.5" stroke-dasharray="4 4"/>

        <!-- RING 4: Vành Hoa Văn Chữ S & Tiếp Tuyến Sóng Nước (Âm Dương Giao Hòa) -->
        <g class="drum-ring ${this.activeRing === 'wave' ? 'active' : ''}" onclick="window.trongDongEngine.selectRing('wave')">
          <circle cx="${cx}" cy="${cy}" r="170" fill="none" stroke="#927238" stroke-width="14" stroke-opacity="0.25"/>
          <circle cx="${cx}" cy="${cy}" r="177" fill="none" stroke="rgba(229,192,123,0.4)" stroke-width="1"/>
          <circle cx="${cx}" cy="${cy}" r="163" fill="none" stroke="rgba(229,192,123,0.4)" stroke-width="1"/>
        </g>

        <!-- RING 3: Vành 4 Con Cóc / Tứ Tượng Âm Khí Điều Tiết Nước -->
        <g class="drum-ring ${this.activeRing === 'frog' ? 'active' : ''}" onclick="window.trongDongEngine.selectRing('frog')">
          <circle cx="${cx}" cy="${cy}" r="145" fill="none" stroke="rgba(56,189,248,0.2)" stroke-width="18"/>
          <!-- 4 Cóc ngự 4 phương vị Đông Nam Tây Bắc -->
          ${[0, 90, 180, 270].map(angle => `
            <g transform="translate(${cx}, ${cy}) rotate(${angle}) translate(0, -145)">
              <circle cx="0" cy="0" r="7" fill="#1E293B" stroke="#38BDF8" stroke-width="1.5"/>
              <circle cx="-3" cy="-2" r="1.5" fill="#38BDF8"/>
              <circle cx="3" cy="-2" r="1.5" fill="#38BDF8"/>
            </g>
          `).join('')}
        </g>

        <!-- RING 2: Vành Chim Lạc Bay Ngược Chiều Kim Đồng Hồ (Dương Khí & Quỹ Đạo) -->
        <g class="drum-ring ${this.activeRing === 'bird' ? 'active' : ''}" onclick="window.trongDongEngine.selectRing('bird')">
          <circle cx="${cx}" cy="${cy}" r="115" fill="none" stroke="rgba(229,192,123,0.15)" stroke-width="26"/>
          <!-- 8 hoặc 14 Chim Lạc vươn cánh -->
          ${Array.from({length: 8}).map((_, i) => `
            <g transform="translate(${cx}, ${cy}) rotate(${i * 45}) translate(0, -115) rotate(-90)">
              <!-- Thân chim Lạc vẽ bằng SVG path -->
              <path d="M-12,0 Q0,-6 14,-2 Q4,4 -12,0 Z" fill="#E5C07B"/>
              <!-- Cánh chim bay -->
              <path d="M-2,-2 Q-8,-14 6,-10 Q0,-4 -2,-2 Z" fill="#FBBF24"/>
              <!-- Mỏ chim dài đặc trưng -->
              <line x1="14" y1="-2" x2="22" y2="-1" stroke="#E5C07B" stroke-width="1.5"/>
            </g>
          `).join('')}
        </g>

        <!-- RING 1: Vành Răng Cưa Nhị Phân (Tia Bức Xạ Mặt Trời) -->
        <g class="drum-ring ${this.activeRing === 'teeth' ? 'active' : ''}" onclick="window.trongDongEngine.selectRing('teeth')">
          <circle cx="${cx}" cy="${cy}" r="75" fill="none" stroke="rgba(229,192,123,0.3)" stroke-width="1" />
          ${Array.from({length: 28}).map((_, i) => `
            <polygon points="${cx},${cy - 82} ${cx - 3},${cy - 72} ${cx + 3},${cy - 72}" fill="#D4AF37" transform="rotate(${i * (360 / 28)}, ${cx}, ${cy})"/>
          `).join('')}
        </g>

        <!-- CENTER: Ngôi Sao 14 Cánh Thái Cực (Mặt Trời Nguồn Sáng Tạo) -->
        <g class="drum-ring ${this.activeRing === 'sun' ? 'active' : ''}" onclick="window.trongDongEngine.selectRing('sun')">
          <circle cx="${cx}" cy="${cy}" r="16" fill="#0A0E17" stroke="#FBBF24" stroke-width="2"/>
          ${Array.from({length: 14}).map((_, i) => `
            <polygon points="${cx},${cy} ${cx - 5},${cy - 60} ${cx},${cy - 68} ${cx + 5},${cy - 60}" fill="#FBBF24" stroke="#927238" stroke-width="0.5" transform="rotate(${i * (360 / 14)}, ${cx}, ${cy})"/>
          `).join('')}
          <circle cx="${cx}" cy="${cy}" r="6" fill="#FBBF24"/>
        </g>
      </svg>
    `;

    this.container.innerHTML = svgHtml;
  }

  selectRing(ringKey) {
    this.activeRing = ringKey;
    if (window.soundCtrl) window.soundCtrl.playBell(540);

    // Update active class on SVG elements
    const rings = this.container.querySelectorAll('.drum-ring');
    rings.forEach(r => r.classList.remove('active'));

    const ringDetails = {
      sun: {
        title: "Tâm Sao 14 Cánh - Mặt Trời & Thái Cực",
        sub: "Cội nguồn Năng lượng, Trí tuệ và Sự Sáng Thế",
        desc: "Ngôi sao 14 cánh ở chính giữa tượng trưng cho Mặt Trời tối thượng - nguồn sống bất tận của nền văn minh lúa nước. 14 tia sáng phân bổ góc đối xứng hoàn hảo, đại diện cho Thái Cực chuyển động phân định thời gian và các tiết khí chính trong năm."
      },
      teeth: {
        title: "Vành Răng Cưa & Tia Bức Xạ",
        sub: "Mã hóa Nhị Phân & Khí Dương Quang Tuyến",
        desc: "Các hình tam giác răng cưa xếp nối tiếp tạo thành chuỗi xung nhịp Dương khí. Đây là cách người Lạc Việt cổ biểu diễn sự lan tỏa của nhiệt lượng và ánh sáng chiếu rọi từ tâm vũ trụ ra không gian bốn phương."
      },
      bird: {
        title: "Vành Chim Lạc Bay Ngược Chiều Kim Đồng Hồ",
        sub: "Quy luật Dương Khí Thăng Hoa & Quỹ Đạo Thiên Thể",
        desc: "Đàn chim Lạc với mỏ dài vươn cánh bay ngược chiều kim đồng hồ (từ Đông sang Tây) mô phỏng chính xác chiều tự quay của Trái Đất và chuyển động biểu kiến của Mặt Trời. Chim là biểu tượng của Trời, Khí Dương và khát vọng vươn tới tự do."
      },
      frog: {
        title: "Vành 4 Tượng Cóc Ngậm Mưa",
        sub: "Tứ Tượng Âm Khí & Chu Kỳ Mùa Màng",
        desc: "Cóc/Ếch là loài động vật mang tính Thủy và Âm, gắn liền với hiện tượng sấm sét gọi mưa trong văn hóa nông nghiệp lúa nước. 4 tượng cóc phân bổ ở 4 hướng tương ứng với 4 mùa Xuân - Hạ - Thu - Đông và nguyên lý Tứ Tượng tương trợ vạn vật sinh sôi."
      },
      wave: {
        title: "Vành Tiếp Tuyến & Hoa Văn Sóng Nước Chữ S",
        sub: "Bát Quái Sơ Khai & Vận Động Dịch Lý",
        desc: "Hoa văn chữ S lồng ghép và các vòng tròn đồng tâm có chấm ở giữa chính là mô hình đối xứng Âm Dương giao hoán sớm nhất. Nước chảy uốn lượn, sông Mã sông Hồng bồi đắp phù sa tạo nên triết lý 'Thuận thiên dĩ hành' của người Việt."
      }
    };

    const cur = ringDetails[ringKey] || ringDetails.sun;
    if (this.infoPanel) {
      this.infoPanel.innerHTML = `
        <div style="animation: fadeIn 0.3s ease;">
          <span style="font-family:var(--font-sans); font-size:0.75rem; color:var(--gold-primary); text-transform:uppercase; letter-spacing:2px;">
            Chi Tiết Vành Vũ Trụ Học
          </span>
          <h3 style="font-family:var(--font-title); font-size:1.5rem; color:var(--text-pure); margin:0.4rem 0;">
            ${cur.title}
          </h3>
          <p style="color:var(--gold-primary); font-size:0.85rem; margin-bottom:1rem; font-style:italic;">
            ${cur.sub}
          </p>
          <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-subtle); border-radius:12px; padding:1.2rem; line-height:1.7; font-size:0.9rem; color:var(--text-muted);">
            ${cur.desc}
          </div>
          <div style="margin-top:1rem; font-size:0.8rem; color:var(--text-dim);">
            * Nhấp vào các vành khác nhau trên mặt trống để giải mã từng lớp mật mã thiên văn.
          </div>
        </div>
      `;
    }
  }
}
