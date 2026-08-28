// =========================================================================
// HUYỀN HỌC MỤ — SCHOLARLY TOOL UI & DIAGNOSTICS CONTROLLER (PHASE 10)
// =========================================================================

class ToolUI {
  constructor() {
    this.currentToolTab = 'battrach'; // 'battrach' | 'huyenkhong' | 'report'
    this.state = {
      birthYear: 1988,
      gender: 'Nam',
      houseDirection: 'Nam',
      period: 9,
      mountain: 'ty_mountain'
    };
  }

  render(tab = 'battrach') {
    this.currentToolTab = tab;
    const container = document.getElementById('gate-tools');
    if (!container) return;

    container.innerHTML = `
      <div style="max-width:1150px; margin:0 auto;">
        <!-- Header -->
        <header style="margin-bottom:2rem; text-align:center;">
          <h1 style="font-family:var(--font-title); font-size:2.2rem; color:#FEF3C7; margin:0 0 0.5rem 0;">
            ⚙️ Bàn Tính Số Hóa Càn Khôn
          </h1>
          <p style="font-size:0.95rem; color:var(--text-muted); max-width:650px; margin:0 auto;">
            Công cụ tính toán phong thủy học thuật đa trường phái: Bát Trạch Minh Kính, Huyền Không Phi Tinh và Báo cáo chẩn đoán toàn diện.
          </p>
        </header>

        <!-- Navigation Tabs -->
        <div style="display:flex; justify-content:center; gap:0.8rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:1rem; margin-bottom:2rem; flex-wrap:wrap;">
          <button onclick="window.toolUI.render('battrach')" style="background:${this.currentToolTab === 'battrach' ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${this.currentToolTab === 'battrach' ? '#FBBF24' : 'rgba(255,255,255,0.1)'}; color:#FEF3C7; padding:0.6rem 1.2rem; border-radius:8px; font-weight:700; font-size:0.88rem; cursor:pointer;">
            🏠 Bát Trạch Trạch Mệnh
          </button>
          <button onclick="window.toolUI.render('huyenkhong')" style="background:${this.currentToolTab === 'huyenkhong' ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${this.currentToolTab === 'huyenkhong' ? '#FBBF24' : 'rgba(255,255,255,0.1)'}; color:#FEF3C7; padding:0.6rem 1.2rem; border-radius:8px; font-weight:700; font-size:0.88rem; cursor:pointer;">
            🌌 Huyền Không Phi Tinh (Vận 9)
          </button>
          <button onclick="window.toolUI.render('report')" style="background:${this.currentToolTab === 'report' ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${this.currentToolTab === 'report' ? '#FBBF24' : 'rgba(255,255,255,0.1)'}; color:#FEF3C7; padding:0.6rem 1.2rem; border-radius:8px; font-weight:700; font-size:0.88rem; cursor:pointer;">
            📄 Báo Cáo Chẩn Đoán & Xuất Bản
          </button>
        </div>

        <!-- Tool Content Area -->
        <div id="tool-active-area">
          ${this.getToolContent(this.currentToolTab)}
        </div>
      </div>
    `;
  }

  getToolContent(tab) {
    if (tab === 'battrach') {
      return this.renderBatTrachTool();
    } else if (tab === 'huyenkhong') {
      return this.renderHuyenKhongTool();
    } else if (tab === 'report') {
      return this.renderReportTool();
    }
    return '';
  }

  renderBatTrachTool() {
    const res = window.masterRuleEngine ? window.masterRuleEngine.calculateBatTrachGua(this.state.birthYear, this.state.gender) : null;
    if (!res) return '<div>Đang nạp động cơ tính toán...</div>';

    const directions = ['Bắc', 'Đông Bắc', 'Đông', 'Đông Nam', 'Nam', 'Tây Nam', 'Tây', 'Tây Bắc'];
    const duNienCards = directions.map(dir => {
      const star = res.duNienMap[dir];
      const isGood = star.includes('Tốt');
      const isSelected = this.state.houseDirection === dir;
      return `
        <div style="background:${isSelected ? 'rgba(245,158,11,0.15)' : '#0D111A'}; border:1px solid ${isSelected ? '#FBBF24' : 'rgba(255,255,255,0.08)'}; border-radius:10px; padding:1rem; text-align:center;">
          <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.2rem;">Hướng ${dir}</div>
          <div style="font-size:0.95rem; font-weight:700; color:${isGood ? '#34D399' : '#F87171'}; margin-bottom:0.3rem;">${star}</div>
          <div style="font-size:0.75rem; color:${isGood ? 'rgba(52,211,153,0.8)' : 'rgba(248,113,113,0.8)'};">${isGood ? 'Nên mở cửa, đặt phòng ngủ' : 'Nên đặt bếp/WC để trấn'}</div>
        </div>
      `;
    }).join('');

    return `
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:2rem;">
        <!-- Input Form -->
        <div style="background:#121722; border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:1.8rem;">
          <h3 style="font-family:var(--font-title); font-size:1.3rem; color:#FEF3C7; margin:0 0 1.2rem 0;">
            1. Nhập Thông Tin Gia Chủ
          </h3>

          <div style="margin-bottom:1.2rem;">
            <label style="display:block; font-size:0.85rem; color:var(--text-muted); margin-bottom:0.4rem;">Năm Sinh Dương Lịch:</label>
            <input type="number" id="input-tool-year" value="${this.state.birthYear}" min="1900" max="2100" onchange="window.toolUI.updateState('birthYear', this.value)" style="width:100%; background:#0D111A; border:1px solid rgba(255,255,255,0.15); color:#FEF3C7; padding:0.6rem 0.8rem; border-radius:8px; font-size:0.95rem; box-sizing:border-box;">
          </div>

          <div style="margin-bottom:1.2rem;">
            <label style="display:block; font-size:0.85rem; color:var(--text-muted); margin-bottom:0.4rem;">Giới Tính Gia Chủ:</label>
            <select id="input-tool-gender" onchange="window.toolUI.updateState('gender', this.value)" style="width:100%; background:#0D111A; border:1px solid rgba(255,255,255,0.15); color:#FEF3C7; padding:0.6rem 0.8rem; border-radius:8px; font-size:0.95rem; box-sizing:border-box;">
              <option value="Nam" ${this.state.gender === 'Nam' ? 'selected' : ''}>Nam Mệnh</option>
              <option value="Nữ" ${this.state.gender === 'Nữ' ? 'selected' : ''}>Nữ Mệnh</option>
            </select>
          </div>

          <div style="margin-bottom:1.5rem;">
            <label style="display:block; font-size:0.85rem; color:var(--text-muted); margin-bottom:0.4rem;">Hướng Nhà Khảo Sát:</label>
            <select id="input-tool-dir" onchange="window.toolUI.updateState('houseDirection', this.value)" style="width:100%; background:#0D111A; border:1px solid rgba(255,255,255,0.15); color:#FEF3C7; padding:0.6rem 0.8rem; border-radius:8px; font-size:0.95rem; box-sizing:border-box;">
              ${directions.map(d => `<option value="${d}" ${this.state.houseDirection === d ? 'selected' : ''}>Hướng ${d}</option>`).join('')}
            </select>
          </div>

          <div style="background:rgba(245,158,11,0.06); border-left:3px solid #FBBF24; padding:0.9rem; border-radius:0 8px 8px 0; font-size:0.82rem; color:var(--text-muted); line-height:1.5;">
            <strong>Căn cứ học thuật:</strong> Phép tính theo <em>Bát Trạch Minh Kính</em> (Dương Quân Tùng / Cố Ngô Huệ Cảnh) — Bản khắc gỗ triều Thanh.
          </div>
        </div>

        <!-- Calculation Result -->
        <div style="background:#121722; border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:1.8rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:0.6rem;">
            <h3 style="font-family:var(--font-title); font-size:1.3rem; color:#FEF3C7; margin:0;">
              2. Kết Quả Mệnh Quái
            </h3>
            <span style="font-size:0.8rem; font-weight:800; color:#38BDF8; background:rgba(56,189,248,0.12); padding:0.25rem 0.6rem; border-radius:12px;">
              ${res.group}
            </span>
          </div>

          <div style="display:flex; align-items:center; gap:1.2rem; margin-bottom:1.5rem; background:rgba(0,0,0,0.3); padding:1rem; border-radius:10px;">
            <div style="font-size:2.8rem; color:#FBBF24; font-family:'Ma Shan Zheng', serif;">
              ${res.trigram}
            </div>
            <div>
              <div style="font-size:1.3rem; font-weight:800; color:#FEF3C7;">
                Cung ${res.guaName} (${res.element}) — Số ${res.guaNumber}
              </div>
              <div style="font-size:0.88rem; color:var(--text-muted);">
                Người ${res.gender} sinh năm ${res.birthYear} thuộc <strong>${res.group}</strong>.
              </div>
            </div>
          </div>

          <h4 style="font-size:0.95rem; color:#FEF3C7; margin:0 0 0.8rem 0;">
            Ma Trận 8 Phương Vị Cát Hung:
          </h4>
          <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:0.6rem;">
            ${duNienCards}
          </div>
        </div>
      </div>
    `;
  }

  renderHuyenKhongTool() {
    return `
      <div style="background:#121722; border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:2rem; text-align:center;">
        <h3 style="font-family:var(--font-title); font-size:1.4rem; color:#FEF3C7; margin:0 0 0.5rem 0;">
          🌌 Tinh Bàn Phi Tinh Vận 9 (2024 - 2043) — Ly Hỏa Cực Vượng
        </h3>
        <p style="font-size:0.9rem; color:var(--text-muted); max-width:600px; margin:0 auto 2rem auto;">
          Trong Hạ Nguyên Vận 9, sao <strong>Cửu Tử Hỏa Tinh</strong> nhập Trung Cung nắm quyền đương lệnh. Cát khí hội tụ tại các phương vị nạp khí phía Nam và Bắc.
        </p>

        <!-- 3x3 Flying Star Grid -->
        <div style="display:grid; grid-template-columns:repeat(3, 110px); gap:10px; justify-content:center; margin:0 auto 2rem auto;">
          <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:0.8rem; text-align:center;">
            <div style="font-size:0.75rem; color:var(--text-muted);">Tốn (Đông Nam)</div>
            <div style="font-size:1.4rem; font-weight:800; color:#34D399;">8</div>
            <div style="font-size:0.72rem; color:var(--text-muted);">Bát Bạch Thổ</div>
          </div>
          <div style="background:#0D111A; border:1px solid rgba(245,158,11,0.3); border-radius:8px; padding:0.8rem; text-align:center;">
            <div style="font-size:0.75rem; color:#FBBF24;">Ly (Nam)</div>
            <div style="font-size:1.4rem; font-weight:800; color:#F87171;">4</div>
            <div style="font-size:0.72rem; color:var(--text-muted);">Tứ Lục Mộc</div>
          </div>
          <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:0.8rem; text-align:center;">
            <div style="font-size:0.75rem; color:var(--text-muted);">Khôn (Tây Nam)</div>
            <div style="font-size:1.4rem; font-weight:800; color:#60A5FA;">6</div>
            <div style="font-size:0.72rem; color:var(--text-muted);">Lục Bạch Kim</div>
          </div>

          <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:0.8rem; text-align:center;">
            <div style="font-size:0.75rem; color:var(--text-muted);">Chấn (Đông)</div>
            <div style="font-size:1.4rem; font-weight:800; color:#F87171;">7</div>
            <div style="font-size:0.72rem; color:var(--text-muted);">Thất Xích Kim</div>
          </div>
          <div style="background:rgba(245,158,11,0.15); border:2px solid #FBBF24; border-radius:8px; padding:0.8rem; text-align:center;">
            <div style="font-size:0.75rem; color:#FBBF24; font-weight:800;">Trung Cung</div>
            <div style="font-size:1.6rem; font-weight:800; color:#FEF3C7;">9</div>
            <div style="font-size:0.72rem; color:#FBBF24;">Cửu Tử Đương Lệnh</div>
          </div>
          <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:0.8rem; text-align:center;">
            <div style="font-size:0.75rem; color:var(--text-muted);">Đoài (Tây)</div>
            <div style="font-size:1.4rem; font-weight:800; color:#38BDF8;">2</div>
            <div style="font-size:0.72rem; color:#F87171;">Nhị Hắc Bệnh Phù</div>
          </div>

          <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:0.8rem; text-align:center;">
            <div style="font-size:0.75rem; color:var(--text-muted);">Cấn (Đông Bắc)</div>
            <div style="font-size:1.4rem; font-weight:800; color:#C084FC;">3</div>
            <div style="font-size:0.72rem; color:var(--text-muted);">Tam Bích Mộc</div>
          </div>
          <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:0.8rem; text-align:center;">
            <div style="font-size:0.75rem; color:var(--text-muted);">Khảm (Bắc)</div>
            <div style="font-size:1.4rem; font-weight:800; color:#60A5FA;">8</div>
            <div style="font-size:0.72rem; color:var(--text-muted);">Bát Bạch Thổ</div>
          </div>
          <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:0.8rem; text-align:center;">
            <div style="font-size:0.75rem; color:var(--text-muted);">Càn (Tây Bắc)</div>
            <div style="font-size:1.4rem; font-weight:800; color:#34D399;">1</div>
            <div style="font-size:0.72rem; color:#34D399;">Nhất Bạch Sinh Khí</div>
          </div>
        </div>

        <div style="background:rgba(0,0,0,0.3); padding:1rem; border-radius:10px; font-size:0.85rem; color:var(--text-muted); max-width:650px; margin:0 auto; line-height:1.6;">
          <strong style="color:#FBBF24;">Khảo chú Huyền Không Vận 9:</strong> Hướng Bắc có Nhất Bạch Thủy Tinh nhận sinh khí từ Ly Hỏa; Cung Tây có Nhị Hắc Cự Môn Thổ nên cần đặt vật phẩm Kim khí để hóa giải sát khí bệnh tật.
        </div>
      </div>
    `;
  }

  renderReportTool() {
    const res = window.masterRuleEngine ? window.masterRuleEngine.calculateBatTrachGua(this.state.birthYear, this.state.gender) : null;
    const currentStar = res ? res.duNienMap[this.state.houseDirection] : '';
    const isGood = currentStar.includes('Tốt');

    const markdownReport = `# BÁO CÁO CHẨN ĐOÁN PHONG THỦY HỌC THUẬT TOÀN DIỆN
**Đơn vị thực hiện:** Huyền Học Mụ — Digital Scholarly Library
**Chủ sự:** Hoàng Thái Ất | **Hotline:** 0933116860
**Ngày lập:** ${new Date().toLocaleDateString('vi-VN')}

---

## 1. THÔNG TIN KHẢO SÁT
* Gia chủ: Sinh năm ${this.state.birthYear} (${this.state.gender} Mệnh).
* Cung Phi Bát Trạch: Cung ${res.guaName} (${res.element}) — ${res.group}.
* Hướng nhà khảo sát: Hướng ${this.state.houseDirection}.
* Vận khí hiện hành: Hạ Nguyên Vận 9 (2024 - 2043) — Cửu Tử Ly Hỏa.

## 2. KẾT QUẢ CHẨN ĐOÁN & ĐÁNH GIÁ
* Hướng nhà ${this.state.houseDirection} đối với gia chủ đạt sao: **${currentStar}**.
* Nhận định: ${isGood ? 'Hướng nhà Đắc Cát Tinh, tương sinh bản mệnh, thuận lợi nạp khí hưng vượng.' : 'Hướng nhà phạm Hung Tinh, cần áp dụng phương pháp Đa Cát Thắng Tiểu Hung để hóa giải.'}

## 3. KHUYẾN NGHỊ BỐ TRÍ DƯƠNG TRẠCH (5 VỊ TRÍ)
1. **Đại Môn (Cửa chính):** Đặt tại cung cát hoặc mở rộng khẩu độ đón sinh khí Vận 9.
2. **Chủ Phòng (Phòng ngủ):** Đặt tại phương vị Sinh Khí / Thiên Y.
3. **Bếp Nấu:** Áp dụng nguyên tắc "Tọa Hung Hướng Cát" (Đặt bếp tại hướng xấu, miệng bếp quay về hướng tốt).
4. **Ban Thờ Tế Tự:** Đặt tại vị trí trang nghiêm, tĩnh khí, tựa lưng vững chãi.
5. **Khu Vệ Sinh (WC):** Đặt tại các cung Tuyệt Mệnh, Họa Hại để trấn áp hung khí.

## 4. TRÍCH DẪN NGUỒN CHÍNH ĐIỂN
* *Bát Trạch Minh Kính* (Cổ bản Thanh Triều) - URN:CORPUS:FENGSHUI:BAT_TRACH_MINH_KINH.
* *Táng Thư* (Quách Phác, Tứ Khố Toàn Thư) - URN:CORPUS:FENGSHUI:TANG_SHU.
`;

    return `
      <div style="background:#121722; border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:2rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:1rem;">
          <div>
            <h3 style="font-family:var(--font-title); font-size:1.3rem; color:#FEF3C7; margin:0 0 0.3rem 0;">
              📄 Báo Cáo Chẩn Đoán Phong Thủy Học Thuật
            </h3>
            <div style="font-size:0.85rem; color:var(--text-muted);">
              Khảo sát cho gia chủ sinh năm ${this.state.birthYear} • Hướng ${this.state.houseDirection}
            </div>
          </div>

          <div style="display:flex; gap:0.6rem;">
            <button onclick="navigator.clipboard.writeText(\`${markdownReport.replace(/`/g, '\\`')}\`); alert('Đã sao chép Báo Cáo Markdown vào clipboard!');" style="background:rgba(245,158,11,0.15); border:1px solid #FBBF24; color:#FEF3C7; padding:0.5rem 1rem; border-radius:8px; font-weight:700; font-size:0.85rem; cursor:pointer;">
              📋 Sao Chép Markdown
            </button>
            <button onclick="window.print();" style="background:rgba(59,130,246,0.15); border:1px solid #60A5FA; color:#60A5FA; padding:0.5rem 1rem; border-radius:8px; font-weight:700; font-size:0.85rem; cursor:pointer;">
              🖨️ In / Lưu PDF
            </button>
          </div>
        </div>

        <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.06); border-radius:10px; padding:1.8rem; font-family:monospace; font-size:0.88rem; color:#FEF3C7; line-height:1.7; white-space:pre-wrap;">
${markdownReport}
        </div>
      </div>
    `;
  }

  updateState(key, val) {
    this.state[key] = val;
    this.render(this.currentToolTab);
  }
}

// Khởi tạo ToolUI
window.toolUI = new ToolUI();
