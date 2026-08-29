// =========================================================================
// HUYỀN HỌC MỤ — BÀN TÍNH SỐ HÓA & ĐÁNH GIÁ AN TOÀN VỊ TRÍ (THUẦN VIỆT 100%)
// =========================================================================

class ToolUI {
  constructor() {
    this.currentToolTab = 'diachat64';
    this.state = {
      birthYear: 1988,
      gender: 'Nam',
      houseDirection: 'Nam',
      period: 9,
      mountain: 'ty_mountain',
      latitude: 21.0,
      activeHazards: [],
      elevationAboveFlood: 1.2,
      eavesOverhang: 2.0,
      hasRearBacking: true,
      hasFrontWater: true,
      hasStackVentilation: true,
      occupantCount: 4,
      houseAreaM2: 120
    };
  }

  render(tab = 'diachat64') {
    this.currentToolTab = tab;
    const container = document.getElementById('gate-tools');
    if (!container) return;

    container.innerHTML = `
      <div style="max-width:1200px; margin:0 auto; padding-bottom:3rem;">
        <header style="margin-bottom:2rem; text-align:center;">
          <div style="display:inline-block; padding:0.25rem 0.8rem; background:rgba(245,158,11,0.12); border:1px solid rgba(245,158,11,0.3); border-radius:20px; font-size:0.8rem; font-weight:700; color:#FBBF24; margin-bottom:0.6rem;">
            BỘ MÁY ĐÁNH GIÁ THIÊN — ĐỊA — NHÂN & PHONG THỦY CHÁNH TÔNG
          </div>
          <h1 style="font-family:var(--font-title); font-size:2.2rem; color:#FEF3C7; margin:0 0 0.5rem 0;">
            Bàn Tính Số Hóa Càn Khôn & Đánh Giá An Toàn Vị Trí
          </h1>
          <p style="font-size:0.92rem; color:var(--text-muted); max-width:750px; margin:0 auto; line-height:1.6;">
            Hệ thống phân tích 8 tầng tích hợp: Kiểm soát nguy cơ thiên tai thực tế (Quyền Bác Bỏ Khẩn Cấp), quang học mặt trời 4 mùa, vi khí hậu thông gió và phong thủy chánh tông.
          </p>
        </header>

        <div style="display:flex; justify-content:center; gap:0.8rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:1rem; margin-bottom:2rem; flex-wrap:wrap;">
          <button onclick="window.toolUI.render('thiendianhan')" style="background:${this.currentToolTab === 'thiendianhan' ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${this.currentToolTab === 'thiendianhan' ? '#FBBF24' : 'rgba(255,255,255,0.1)'}; color:#FEF3C7; padding:0.65rem 1.3rem; border-radius:8px; font-weight:700; font-size:0.88rem; cursor:pointer;">
            Thiên — Địa — Nhân & Nguy Cơ Thiên Tai
          </button>
          <button onclick="window.toolUI.render('battrach')" style="background:${this.currentToolTab === 'battrach' ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${this.currentToolTab === 'battrach' ? '#FBBF24' : 'rgba(255,255,255,0.1)'}; color:#FEF3C7; padding:0.65rem 1.3rem; border-radius:8px; font-weight:700; font-size:0.88rem; cursor:pointer;">
            Bát Trạch Trạch Mệnh
          </button>
          <button onclick="window.toolUI.render('huyenkhong')" style="background:${this.currentToolTab === 'huyenkhong' ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${this.currentToolTab === 'huyenkhong' ? '#FBBF24' : 'rgba(255,255,255,0.1)'}; color:#FEF3C7; padding:0.65rem 1.3rem; border-radius:8px; font-weight:700; font-size:0.88rem; cursor:pointer;">
            Huyền Không Phi Tinh (Vận 9)
          </button>
          <button onclick="window.toolUI.render('diachat64')" style="background:${this.currentToolTab === 'diachat64' ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${this.currentToolTab === 'diachat64' ? '#38BDF8' : 'rgba(255,255,255,0.1)'}; color:#38BDF8; padding:0.65rem 1.3rem; border-radius:8px; font-weight:700; font-size:0.88rem; cursor:pointer;">
            Địa Chất Đồ & Khí Hậu 64 Tỉnh Thành
          </button>
          <button onclick="window.toolUI.render('report')" style="background:${this.currentToolTab === 'report' ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${this.currentToolTab === 'report' ? '#FBBF24' : 'rgba(255,255,255,0.1)'}; color:#FEF3C7; padding:0.65rem 1.3rem; border-radius:8px; font-weight:700; font-size:0.88rem; cursor:pointer;">
            Báo Cáo Chẩn Đoán Toàn Diện
          </button>
        </div>

        <div id="tool-active-area">
          ${this.getToolContent(this.currentToolTab)}
        </div>
      </div>
    `;
  }

  getToolContent(tab) {
    if (tab === 'diachat64') {
      return this.renderDiaChat64Tab();
    } else if (tab === 'thiendianhan') {
      return this.renderThienDiaNhanTool();
    } else if (tab === 'battrach') {
      return this.renderBatTrachTool();
    } else if (tab === 'huyenkhong') {
      return this.renderHuyenKhongTool();
    } else if (tab === 'report') {
      return this.renderReportTool();
    }
    return this.renderDiaChat64Tab();
  }

  renderThienDiaNhanTool() {
    const engine = window.thienDiaNhanEngine;
    if (!engine) return '<div>Đang nạp động cơ Thiên Địa Nhân...</div>';

    const solarProfile = engine.calculateSolarProfile(this.state.latitude);
    const evaluation = engine.evaluateSiteIntelligence({
      activeHazards: this.state.activeHazards,
      orientation: this.state.houseDirection,
      elevationAboveFloodLevel: parseFloat(this.state.elevationAboveFlood),
      eavesOverhang: parseFloat(this.state.eavesOverhang),
      hasRearBacking: this.state.hasRearBacking,
      hasFrontWater: this.state.hasFrontWater,
      hasStackVentilation: this.state.hasStackVentilation,
      occupantCount: parseInt(this.state.occupantCount),
      houseAreaM2: parseFloat(this.state.houseAreaM2),
      classicalFengShuiScore: 90
    });

    const isVeto = evaluation.vetoTriggered;

    return `
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(360px, 1fr)); gap:2rem;">
        <div style="background:#121722; border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:1.8rem;">
          <h3 style="font-family:var(--font-title); font-size:1.25rem; color:#FEF3C7; margin:0 0 1.2rem 0;">
            Bảng Khảo Sát Đa Tầng Thực Địa
          </h3>

          <div style="background:rgba(239,68,68,0.06); border:1px solid rgba(239,68,68,0.2); border-radius:10px; padding:1rem; margin-bottom:1.4rem;">
            <div style="font-size:0.85rem; font-weight:800; color:#F87171; text-transform:uppercase; margin-bottom:0.6rem; letter-spacing:0.04em;">
              1. Khảo Sát Nguy Cơ Thiên Tai Thực Tế (Phân Tầng Hiểm Họa)
            </div>
            <div style="font-size:0.78rem; color:var(--text-muted); margin-bottom:0.8rem;">
              Nguyên tắc: Tích chọn nếu khu đất nằm trong các vùng nguy hiểm sau:
            </div>
            ${engine.hazards.map(h => `
              <label style="display:flex; align-items:flex-start; gap:0.6rem; font-size:0.82rem; color:#FEF3C7; margin-bottom:0.5rem; cursor:pointer;">
                <input type="checkbox" value="${h.id}" ${this.state.activeHazards.includes(h.id) ? 'checked' : ''} onchange="window.toolUI.toggleHazard('${h.id}')" style="margin-top:0.2rem; accent-color:#EF4444;">
                <div>
                  <strong>${h.name}</strong>
                  <div style="font-size:0.72rem; color:var(--text-muted);">${h.rule}</div>
                </div>
              </label>
            `).join('')}
          </div>

          <div style="margin-bottom:1.2rem;">
            <label style="display:block; font-size:0.85rem; color:var(--text-muted); margin-bottom:0.3rem;">Khu Vực Khảo Sát (Vĩ Độ):</label>
            <select onchange="window.toolUI.updateState('latitude', parseFloat(this.value))" style="width:100%; background:#0D111A; border:1px solid rgba(255,255,255,0.15); color:#FEF3C7; padding:0.55rem; border-radius:8px; font-size:0.9rem;">
              <option value="21.0" ${this.state.latitude === 21.0 ? 'selected' : ''}>Miền Bắc (Hà Nội & Châu thổ Sông Hồng ~21° Bắc)</option>
              <option value="16.0" ${this.state.latitude === 16.0 ? 'selected' : ''}>Miền Trung (Đà Nẵng / Huế ~16° Bắc)</option>
              <option value="10.8" ${this.state.latitude === 10.8 ? 'selected' : ''}>Miền Nam (TP.HCM & Nam Bộ ~10.8° Bắc)</option>
            </select>
          </div>

          <div style="margin-bottom:1.2rem;">
            <label style="display:block; font-size:0.85rem; color:var(--text-muted); margin-bottom:0.3rem;">Hướng Mặt Tiền Nhà:</label>
            <select onchange="window.toolUI.updateState('houseDirection', this.value)" style="width:100%; background:#0D111A; border:1px solid rgba(255,255,255,0.15); color:#FEF3C7; padding:0.55rem; border-radius:8px; font-size:0.9rem;">
              <option value="Nam" ${this.state.houseDirection === 'Nam' ? 'selected' : ''}>Chính Nam (Đông ấm hạ mát)</option>
              <option value="Đông Nam" ${this.state.houseDirection === 'Đông Nam' ? 'selected' : ''}>Đông Nam (Đón gió nồm mát)</option>
              <option value="Đông" ${this.state.houseDirection === 'Đông' ? 'selected' : ''}>Chính Đông</option>
              <option value="Tây" ${this.state.houseDirection === 'Tây' ? 'selected' : ''}>Chính Tây (Nắng gắt chiều)</option>
              <option value="Bắc" ${this.state.houseDirection === 'Bắc' ? 'selected' : ''}>Chính Bắc (Hứng gió lạnh)</option>
            </select>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.8rem; margin-bottom:1.2rem;">
            <div>
              <label style="display:block; font-size:0.8rem; color:var(--text-muted); margin-bottom:0.3rem;">Cốt Nền Vượt Lũ (mét):</label>
              <input type="number" step="0.1" value="${this.state.elevationAboveFlood}" onchange="window.toolUI.updateState('elevationAboveFlood', this.value)" style="width:100%; background:#0D111A; border:1px solid rgba(255,255,255,0.15); color:#FEF3C7; padding:0.55rem; border-radius:8px; font-size:0.9rem; box-sizing:border-box;">
            </div>
            <div>
              <label style="display:block; font-size:0.8rem; color:var(--text-muted); margin-bottom:0.3rem;">Độ Vươn Hiên Mái (mét):</label>
              <input type="number" step="0.1" value="${this.state.eavesOverhang}" onchange="window.toolUI.updateState('eavesOverhang', this.value)" style="width:100%; background:#0D111A; border:1px solid rgba(255,255,255,0.15); color:#FEF3C7; padding:0.55rem; border-radius:8px; font-size:0.9rem; box-sizing:border-box;">
            </div>
          </div>

          <div style="background:#0D111A; border-radius:8px; padding:0.8rem; margin-bottom:1.2rem;">
            <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.82rem; color:#FEF3C7; margin-bottom:0.4rem; cursor:pointer;">
              <input type="checkbox" ${this.state.hasRearBacking ? 'checked' : ''} onchange="window.toolUI.updateState('hasRearBacking', this.checked)">
              Sau lưng có đồi cao hoặc rặng tre chắn gió bấc
            </label>
            <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.82rem; color:#FEF3C7; margin-bottom:0.4rem; cursor:pointer;">
              <input type="checkbox" ${this.state.hasFrontWater ? 'checked' : ''} onchange="window.toolUI.updateState('hasFrontWater', this.checked)">
              Trước mặt có ao hồ nước tụ điều hòa vi khí hậu
            </label>
            <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.82rem; color:#FEF3C7; cursor:pointer;">
              <input type="checkbox" ${this.state.hasStackVentilation ? 'checked' : ''} onchange="window.toolUI.updateState('hasStackVentilation', this.checked)">
              Có giếng trời/khe thoáng đối lưu ống khói tự nhiên
            </label>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.8rem;">
            <div>
              <label style="display:block; font-size:0.8rem; color:var(--text-muted); margin-bottom:0.3rem;">Số Người Ở:</label>
              <input type="number" value="${this.state.occupantCount}" onchange="window.toolUI.updateState('occupantCount', this.value)" style="width:100%; background:#0D111A; border:1px solid rgba(255,255,255,0.15); color:#FEF3C7; padding:0.55rem; border-radius:8px; font-size:0.9rem; box-sizing:border-box;">
            </div>
            <div>
              <label style="display:block; font-size:0.8rem; color:var(--text-muted); margin-bottom:0.3rem;">Diện Tích Nhà (m²):</label>
              <input type="number" value="${this.state.houseAreaM2}" onchange="window.toolUI.updateState('houseAreaM2', this.value)" style="width:100%; background:#0D111A; border:1px solid rgba(255,255,255,0.15); color:#FEF3C7; padding:0.55rem; border-radius:8px; font-size:0.9rem; box-sizing:border-box;">
            </div>
          </div>
        </div>

        <div style="background:#121722; border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:1.8rem;">
          <div style="background:${isVeto ? 'rgba(239,68,68,0.15)' : (evaluation.totalUnifiedScore >= 80 ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)')}; border:1px solid ${isVeto ? '#EF4444' : (evaluation.totalUnifiedScore >= 80 ? '#10B981' : '#F59E0B')}; border-radius:12px; padding:1.2rem; margin-bottom:1.5rem;">
            <div style="font-size:0.8rem; font-weight:800; color:${isVeto ? '#F87171' : (evaluation.totalUnifiedScore >= 80 ? '#34D399' : '#FBBF24')}; margin-bottom:0.3rem;">
              KẾT QUẢ ĐÁNH GIÁ THỐNG NHẤT (ĐIỂM ĐÁNH GIÁ TAM TÀI: ${evaluation.totalUnifiedScore}/100)
            </div>
            <div style="font-size:1.05rem; font-weight:800; color:#FEF3C7; line-height:1.4;">
              ${evaluation.verdict}
            </div>
            ${isVeto ? `
              <div style="margin-top:0.8rem; padding-top:0.8rem; border-top:1px solid rgba(239,68,68,0.2); font-size:0.82rem; color:#FCA5A5;">
                ${evaluation.vetoReasons.map(r => `<div>• ${r}</div>`).join('')}
              </div>
            ` : ''}
          </div>

          <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.06); border-radius:10px; padding:1.2rem; margin-bottom:1.5rem;">
            <h4 style="font-size:0.92rem; color:#FEF3C7; margin:0 0 0.8rem 0;">
              Quang Học Thiên Văn Góc Chiếu Mặt Trời (Thổ Khuê Trắc Cảnh)
            </h4>
            <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:0.6rem; text-align:center; margin-bottom:0.8rem;">
              <div style="background:rgba(255,255,255,0.03); padding:0.6rem; border-radius:6px;">
                <div style="font-size:0.7rem; color:var(--text-muted);">Nắng Hè (Hạ Chí)</div>
                <div style="font-size:1.1rem; font-weight:800; color:#F87171;">${solarProfile.summerAltitude}°</div>
                <div style="font-size:0.65rem; color:#FCA5A5;">Gần đỉnh đầu (gắt)</div>
              </div>
              <div style="background:rgba(255,255,255,0.03); padding:0.6rem; border-radius:6px;">
                <div style="font-size:0.7rem; color:var(--text-muted);">Xuân / Thu Phân</div>
                <div style="font-size:1.1rem; font-weight:800; color:#FBBF24;">${solarProfile.equinoxAltitude}°</div>
                <div style="font-size:0.65rem; color:#FEF3C7;">Góc ôn hòa</div>
              </div>
              <div style="background:rgba(255,255,255,0.03); padding:0.6rem; border-radius:6px;">
                <div style="font-size:0.7rem; color:var(--text-muted);">Nắng Đông (Đông Chí)</div>
                <div style="font-size:1.1rem; font-weight:800; color:#60A5FA;">${solarProfile.winterAltitude}°</div>
                <div style="font-size:0.65rem; color:#93C5FD;">Góc xiên sưởi ấm</div>
              </div>
            </div>
            <div style="font-size:0.8rem; color:var(--text-muted); line-height:1.5;">
              ${solarProfile.thermalComfortVerdict}
            </div>
          </div>

          <div style="margin-bottom:1.5rem;">
            <h4 style="font-size:0.92rem; color:#FEF3C7; margin:0 0 0.8rem 0;">
              Chỉ Số Phân Tầng Hệ Thống:
            </h4>
            <div style="display:grid; gap:0.5rem; font-size:0.8rem;">
              <div>
                <div style="display:flex; justify-content:space-between; margin-bottom:0.2rem;">
                  <span>An Toàn Thiên Tai (Trọng số 30%):</span>
                  <span style="font-weight:700; color:${evaluation.layerScores.hazardSafety >= 80 ? '#34D399' : '#F87171'};">${evaluation.layerScores.hazardSafety}/100</span>
                </div>
                <div style="height:6px; background:rgba(255,255,255,0.08); border-radius:3px; overflow:hidden;">
                  <div style="width:${evaluation.layerScores.hazardSafety}%; height:100%; background:${evaluation.layerScores.hazardSafety >= 80 ? '#10B981' : '#EF4444'};"></div>
                </div>
              </div>

              <div>
                <div style="display:flex; justify-content:space-between; margin-bottom:0.2rem;">
                  <span>Tầng Địa Thể & Thủy Văn (Trọng số 20%):</span>
                  <span style="font-weight:700; color:#60A5FA;">${evaluation.layerScores.dia}/100</span>
                </div>
                <div style="height:6px; background:rgba(255,255,255,0.08); border-radius:3px; overflow:hidden;">
                  <div style="width:${evaluation.layerScores.dia}%; height:100%; background:#3B82F6;"></div>
                </div>
              </div>

              <div>
                <div style="display:flex; justify-content:space-between; margin-bottom:0.2rem;">
                  <span>Tầng Thiên Thời & Nhật Chiếu (Trọng số 15%):</span>
                  <span style="font-weight:700; color:#FBBF24;">${evaluation.layerScores.thien}/100</span>
                </div>
                <div style="height:6px; background:rgba(255,255,255,0.08); border-radius:3px; overflow:hidden;">
                  <div style="width:${evaluation.layerScores.thien}%; height:100%; background:#F59E0B;"></div>
                </div>
              </div>

              <div>
                <div style="display:flex; justify-content:space-between; margin-bottom:0.2rem;">
                  <span>Kiến Trúc Vi Khí Hậu (Trọng số 15%):</span>
                  <span style="font-weight:700; color:#A78BFA;">${evaluation.layerScores.kienTruc}/100</span>
                </div>
                <div style="height:6px; background:rgba(255,255,255,0.08); border-radius:3px; overflow:hidden;">
                  <div style="width:${evaluation.layerScores.kienTruc}%; height:100%; background:#8B5CF6;"></div>
                </div>
              </div>

              <div>
                <div style="display:flex; justify-content:space-between; margin-bottom:0.2rem;">
                  <span>Phong Thủy Lý Khí Chánh Tông (Trọng số 10%):</span>
                  <span style="font-weight:700; color:#34D399;">${evaluation.layerScores.phongThuy}/100</span>
                </div>
                <div style="height:6px; background:rgba(255,255,255,0.08); border-radius:3px; overflow:hidden;">
                  <div style="width:${evaluation.layerScores.phongThuy}%; height:100%; background:#10B981;"></div>
                </div>
              </div>

              <div>
                <div style="display:flex; justify-content:space-between; margin-bottom:0.2rem;">
                  <span>Tầng Nhân Thể & Ngũ Hư Ngũ Thực (Trọng số 10%):</span>
                  <span style="font-weight:700; color:#F472B6;">${evaluation.layerScores.nhan}/100</span>
                </div>
                <div style="height:6px; background:rgba(255,255,255,0.08); border-radius:3px; overflow:hidden;">
                  <div style="width:${evaluation.layerScores.nhan}%; height:100%; background:#EC4899;"></div>
                </div>
              </div>
            </div>
          </div>

          <div style="background:rgba(245,158,11,0.04); border:1px solid rgba(245,158,11,0.15); border-radius:10px; padding:1rem;">
            <div style="font-size:0.8rem; font-weight:800; color:#FBBF24; margin-bottom:0.5rem;">
              Bản Đồ Chứng Cứ Cổ Thư Tương Ứng:
            </div>
            ${evaluation.classicalEvidences.map(ev => `
              <div style="margin-bottom:0.6rem; font-size:0.78rem; line-height:1.5;">
                <span style="color:#60A5FA; font-weight:700;">[${ev.code}] ${ev.source}:</span>
                <span style="color:#FEF3C7; font-family:'Ma Shan Zheng', serif;">${ev.hanzi}</span>
                <div style="color:var(--text-muted); margin-top:0.2rem;">${ev.meaning}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
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
      <div style="background:#121722; border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:2rem;">
        <h3 style="font-family:var(--font-title); font-size:1.3rem; color:#FEF3C7; margin:0 0 1.2rem 0; text-align:center;">
          Tinh Bàn Cửu Cung Vận 9 (2024 - 2043)
        </h3>

        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:0.8rem; max-width:500px; margin:0 auto 1.5rem auto;">
          <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:0.8rem; text-align:center;">
            <div style="font-size:0.75rem; color:var(--text-muted);">Tốn (Đông Nam)</div>
            <div style="font-size:1.4rem; font-weight:800; color:#34D399;">2</div>
            <div style="font-size:0.72rem; color:var(--text-muted);">Nhị Hắc Thổ</div>
          </div>
          <div style="background:#0D111A; border:1px solid #FBBF24; border-radius:8px; padding:0.8rem; text-align:center;">
            <div style="font-size:0.75rem; color:#FBBF24; font-weight:700;">Ly (Nam) — ĐƯƠNG LỆNH</div>
            <div style="font-size:1.6rem; font-weight:800; color:#EF4444;">9</div>
            <div style="font-size:0.72rem; color:#FBBF24; font-weight:700;">Cửu Tử Hỏa Vượng</div>
          </div>
          <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:0.8rem; text-align:center;">
            <div style="font-size:0.75rem; color:var(--text-muted);">Khôn (Tây Nam)</div>
            <div style="font-size:1.4rem; font-weight:800; color:#60A5FA;">4</div>
            <div style="font-size:0.72rem; color:var(--text-muted);">Tứ Lục Mộc</div>
          </div>

          <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:0.8rem; text-align:center;">
            <div style="font-size:0.75rem; color:var(--text-muted);">Chấn (Đông)</div>
            <div style="font-size:1.4rem; font-weight:800; color:#34D399;">1</div>
            <div style="font-size:0.72rem; color:#34D399;">Nhất Bạch Tiến Khí</div>
          </div>
          <div style="background:rgba(245,158,11,0.15); border:1px solid #FBBF24; border-radius:8px; padding:0.8rem; text-align:center;">
            <div style="font-size:0.75rem; color:#FBBF24; font-weight:700;">TRUNG CUNG</div>
            <div style="font-size:1.8rem; font-weight:800; color:#FBBF24;">5</div>
            <div style="font-size:0.72rem; color:var(--text-muted);">Ngũ Hoàng Thổ</div>
          </div>
          <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:0.8rem; text-align:center;">
            <div style="font-size:0.75rem; color:var(--text-muted);">Đoài (Tây)</div>
            <div style="font-size:1.4rem; font-weight:800; color:#F87171;">6</div>
            <div style="font-size:0.72rem; color:var(--text-muted);">Lục Bạch Kim</div>
          </div>

          <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:0.8rem; text-align:center;">
            <div style="font-size:0.75rem; color:var(--text-muted);">Cấn (Đông Bắc)</div>
            <div style="font-size:1.4rem; font-weight:800; color:#60A5FA;">3</div>
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

    const reportText = `# BÁO CÁO CHẨN ĐOÁN TAM TÀI & PHONG THỦY HỌC THUẬT TOÀN DIỆN
Đơn vị thực hiện: Huyền Học Mụ — Thư Viện Cổ Thư & Bộ Máy Đánh Giá An Toàn Vị Trí
Chủ sự: Hoàng Thái Ất | Đường dây nóng: 0933116860
Ngày lập: ${new Date().toLocaleDateString('vi-VN')}

---

1. THÔNG TIN KHẢO SÁT & VỊ TRÍ
* Gia chủ: Sinh năm ${this.state.birthYear} (${this.state.gender} Mệnh).
* Cung Phi Bát Trạch: Cung ${res.guaName} (${res.element}) — ${res.group}.
* Hướng nhà khảo sát: Hướng ${this.state.houseDirection} (Vĩ độ: ${this.state.latitude}° Bắc).
* Cốt nền vượt đỉnh lũ: +${this.state.elevationAboveFlood} mét.
* Độ vươn mái hiên: ${this.state.eavesOverhang} mét.
* Mật độ diện tích: ${(this.state.houseAreaM2 / Math.max(this.state.occupantCount, 1)).toFixed(1)} m²/người.

2. KẾT QUẢ ĐÁNH GIÁ TAM TÀI & NGUY CƠ THIÊN TAI
* Tình trạng Nguy cơ thiên tai: ${this.state.activeHazards.length === 0 ? 'AN TOÀN (0 phát hiện nguy cơ nghiêm trọng)' : 'CẢNH BÁO (' + this.state.activeHazards.join(', ') + ')'}
* Đánh giá Bát Trạch: Hướng nhà ${this.state.houseDirection} đạt sao ${currentStar} (${isGood ? 'Cát Khí' : 'Cần Chế Hóa'}).
* Quang học góc nắng: Mái hiên ${this.state.eavesOverhang} mét cản nắng gắt mùa hè, đón nắng ấm mùa đông.

3. KHUYẾN NGHỊ BỐ TRÍ DƯƠNG TRẠCH & VI KHÍ HẬU
1. Đại Môn (Cửa chính): Đặt tại cung cát hoặc mở rộng khẩu độ đón sinh khí Vận 9.
2. Chủ Phòng (Phòng ngủ): Đặt tại phương vị Sinh Khí / Thiên Y.
3. Bếp Nấu: Áp dụng nguyên tắc "Tọa Hung Hướng Cát" (Đặt bếp tại hướng xấu, miệng bếp quay về hướng tốt).
4. Hệ Thống Thoát Nước: Tuân thủ 《Hoàng Đế Trạch Kinh》 mương rãnh xuôi về Đông Nam, chống ngập úng.
5. Thông Gió Đối Lưu: Bố trí giếng trời hút khí nóng thoát lên nóc (Đối lưu ống khói tự nhiên).

4. TRÍCH DẪN NGUỒN CHÍNH ĐIỂN
* Thanh Nang Kinh (Hoàng Thạch Công)
* Hoàng Đế Trạch Kinh (Cổ bản Đường triều)
* Chu Lễ: Khảo Công Ký (Chu triều)
* Táng Thư (Quách Phác, Tứ Khố Toàn Thư)
`;

    return `
      <div style="background:#121722; border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:2rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:1rem;">
          <div>
            <h3 style="font-family:var(--font-title); font-size:1.3rem; color:#FEF3C7; margin:0 0 0.3rem 0;">
              Báo Cáo Chẩn Đoán Tam Tài & Phong Thủy Toàn Diện
            </h3>
            <div style="font-size:0.85rem; color:var(--text-muted);">
              Khảo sát cho gia chủ sinh năm ${this.state.birthYear} • Hướng ${this.state.houseDirection}
            </div>
          </div>

          <div style="display:flex; gap:0.6rem;">
            <button onclick="navigator.clipboard.writeText(\`${reportText.replace(/[`\\]/g, '\\$&')}\`); alert('Đã sao chép Báo Cáo vào bộ nhớ tạm!');" style="background:rgba(245,158,11,0.15); border:1px solid #FBBF24; color:#FEF3C7; padding:0.5rem 1rem; border-radius:8px; font-weight:700; font-size:0.85rem; cursor:pointer;">
              Sao Chép Văn Bản
            </button>
            <button onclick="window.print();" style="background:rgba(59,130,246,0.15); border:1px solid #60A5FA; color:#60A5FA; padding:0.5rem 1rem; border-radius:8px; font-weight:700; font-size:0.85rem; cursor:pointer;">
              In / Lưu Tài Liệu
            </button>
          </div>
        </div>

        <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.06); border-radius:10px; padding:1.8rem; font-family:monospace; font-size:0.88rem; color:#FEF3C7; line-height:1.7; white-space:pre-wrap;">
${reportText}
        </div>
      </div>
    `;
  }

  toggleHazard(hazardId) {
    if (this.state.activeHazards.includes(hazardId)) {
      this.state.activeHazards = this.state.activeHazards.filter(h => h !== hazardId);
    } else {
      this.state.activeHazards.push(hazardId);
    }
    this.render(this.currentToolTab);
  }

  updateState(key, val) {
    this.state[key] = val;
    this.render(this.currentToolTab);
  }

  // =========================================================================
  // PHÂN HỆ KHẢO SÁT ĐỊA CHẤT ĐỒ & KHÍ HẬU 64 ĐƠN VỊ ĐỊA LÝ LỊCH SỬ
  // =========================================================================
  renderDiaChat64Tab(selectedId = 'HN_PRE2008') {
    const corpus = (typeof DIA_LY_64_TINH_THANH_CORPUS !== 'undefined') ? DIA_LY_64_TINH_THANH_CORPUS : [];
    if (!corpus || corpus.length === 0) {
      return '<div style="padding:2rem; text-align:center; color:var(--text-muted);">Đang nạp cơ sở dữ liệu Địa lý 64 Tỉnh Thành...</div>';
    }

    const currentProvince = corpus.find(p => p.historical_id === selectedId) || corpus[0];

    const optionsHtml = corpus.map(p => `
      <option value="${p.historical_id}" ${p.historical_id === currentProvince.historical_id ? 'selected' : ''}>
        ${p.name} (${p.region})
      </option>
    `).join('');

    return `
      <div style="background:rgba(18,24,38,0.75); border:1px solid rgba(56,189,248,0.3); border-radius:12px; padding:1.8rem; margin-bottom:2rem;">
        
        <!-- Header Chọn Tỉnh Thành -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.8rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:1.2rem;">
          <div>
            <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.3rem;">
              <span style="font-size:0.75rem; font-weight:800; color:#38BDF8; background:rgba(56,189,248,0.15); padding:0.2rem 0.6rem; border-radius:4px;">
                ĐỊA – KHÍ – THỦY – THỔ CORPUS
              </span>
              <span style="font-size:0.75rem; font-weight:700; color:#34D399; background:rgba(52,211,153,0.15); padding:0.2rem 0.6rem; border-radius:4px;">
                EVIDENCE GATE: ${currentProvince.evidence_gate.status} (Độ tin cậy ${Math.round(currentProvince.evidence_gate.confidence * 100)}%)
              </span>
            </div>
            <h2 style="font-size:1.6rem; color:#FEF3C7; margin:0;">
              ${currentProvince.name} — Hồ Sơ Khảo Sát Địa Lý Lịch Sử & Vi Khí Hậu
            </h2>
            <div style="font-size:0.84rem; color:var(--text-muted); margin-top:0.2rem;">
              <strong>Địa giới lịch sử:</strong> ${currentProvince.historical_mapping} • <strong>Quy chiếu hiện hành:</strong> ${currentProvince.current_mapping}
            </div>
          </div>

          <div style="display:flex; align-items:center; gap:0.6rem;">
            <label style="font-size:0.86rem; color:#FEF3C7; font-weight:600;">Chọn Tỉnh / Đơn Vị:</label>
            <select onchange="window.toolUI.renderDiaChatSelection(this.value)" style="background:#0D111A; border:1px solid #38BDF8; color:#38BDF8; padding:0.5rem 1rem; border-radius:8px; font-weight:700; font-size:0.9rem; cursor:pointer;">
              ${optionsHtml}
            </select>
          </div>
        </div>

        <!-- Lưới 4 Cột: Địa Hình - Địa Chất - Thủy Văn - Khí Hậu -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1rem; margin-bottom:1.8rem;">
          
          <!-- Thẻ 01: Địa Hình -->
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-top:3px solid #F59E0B; padding:1rem; border-radius:8px;">
            <h3 style="font-size:0.92rem; color:#F59E0B; margin:0 0 0.5rem 0;">01. ĐỊA HÌNH & TIỂU VÙNG</h3>
            <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.4rem;"><strong>Cao độ:</strong> ${currentProvince.terrain.elevation}</div>
            <div style="font-size:0.82rem; color:var(--text-pure); line-height:1.5; margin-bottom:0.5rem;">${currentProvince.terrain.geomorphology}</div>
            <div style="border-top:1px dashed rgba(255,255,255,0.08); padding-top:0.4rem;">
              <strong style="font-size:0.76rem; color:#FEF3C7;">Tiểu vùng thực địa:</strong>
              ${currentProvince.terrain.sub_regions.map(sr => `<div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.2rem;">• ${sr}</div>`).join('')}
            </div>
          </div>

          <!-- Thẻ 02: Địa Chất -->
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-top:3px solid #EF4444; padding:1rem; border-radius:8px;">
            <h3 style="font-size:0.92rem; color:#EF4444; margin:0 0 0.5rem 0;">02. ĐỊA CHẤT & CHỊU TẢI</h3>
            ${currentProvince.geology.soil_types ? `<div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.3rem;"><strong>Chất đất:</strong> ${currentProvince.geology.soil_types}</div>` : ''}
            ${currentProvince.geology.bedrock ? `<div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.4rem;"><strong>Đá gốc:</strong> ${currentProvince.geology.bedrock}</div>` : ''}
            ${currentProvince.geology.engineering_geology ? `<div style="background:rgba(239,68,68,0.08); padding:0.4rem 0.6rem; border-radius:4px; font-size:0.78rem; color:#FEF3C7; line-height:1.45; margin-bottom:0.4rem;"><strong>Sức chịu tải & móng:</strong> ${currentProvince.geology.engineering_geology}</div>` : ''}
            ${currentProvince.geology.seismic_hazard ? `<div style="font-size:0.74rem; color:var(--text-dim);"><strong>Địa chấn:</strong> ${currentProvince.geology.seismic_hazard}</div>` : ''}
          </div>

          <!-- Thẻ 03: Thủy Văn -->
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-top:3px solid #3B82F6; padding:1rem; border-radius:8px;">
            <h3 style="font-size:0.92rem; color:#3B82F6; margin:0 0 0.5rem 0;">03. THỦY VĂN & TRIỀU CƯỜNG</h3>
            ${currentProvince.water.major_rivers ? `<div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.3rem;"><strong>Sông chính:</strong> ${currentProvince.water.major_rivers}</div>` : ''}
            ${currentProvince.water.flood_season ? `<div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.3rem;"><strong>Mùa lũ:</strong> ${currentProvince.water.flood_season}</div>` : ''}
            ${currentProvince.water.historic_flood_level ? `<div style="font-size:0.8rem; color:#93C5FD; margin-bottom:0.3rem;"><strong>Mức lũ lịch sử:</strong> ${currentProvince.water.historic_flood_level}</div>` : ''}
            ${currentProvince.water.hydrology_regime ? `<div style="font-size:0.76rem; color:var(--text-muted); margin-bottom:0.3rem;"><strong>Chế độ triều:</strong> ${currentProvince.water.hydrology_regime}</div>` : ''}
            ${currentProvince.water.salinity_intrusion ? `<div style="font-size:0.76rem; color:#FCA5A5; margin-bottom:0.3rem;"><strong>Xâm nhập mặn:</strong> ${currentProvince.water.salinity_intrusion}</div>` : ''}
            ${currentProvince.water.groundwater ? `<div style="font-size:0.76rem; color:var(--text-dim);"><strong>Nước ngầm:</strong> ${currentProvince.water.groundwater}</div>` : ''}
          </div>

          <!-- Thẻ 04: Khí Tượng -->
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-top:3px solid #10B981; padding:1rem; border-radius:8px;">
            <h3 style="font-size:0.92rem; color:#10B981; margin:0 0 0.5rem 0;">04. KHÍ TƯỢNG & GIÓ 4 MÙA</h3>
            ${currentProvince.climate.temperature_avg ? `<div style="font-size:0.78rem; color:var(--text-muted); margin-bottom:0.25rem;"><strong>Nhiệt độ TB:</strong> ${currentProvince.climate.temperature_avg}</div>` : ''}
            ${currentProvince.climate.rainfall_avg ? `<div style="font-size:0.78rem; color:var(--text-muted); margin-bottom:0.25rem;"><strong>Lượng mưa:</strong> ${currentProvince.climate.rainfall_avg}</div>` : ''}
            ${currentProvince.climate.humidity_avg ? `<div style="font-size:0.78rem; color:var(--text-muted); margin-bottom:0.35rem;"><strong>Độ ẩm / Nồm:</strong> ${currentProvince.climate.humidity_avg}</div>` : ''}
            ${currentProvince.wind && currentProvince.wind.winter_monsoon ? `<div style="font-size:0.76rem; color:#A7F3D0; line-height:1.4;"><strong>Gió mùa Đông Bắc:</strong> ${currentProvince.wind.winter_monsoon}</div>` : ''}
            ${currentProvince.wind && currentProvince.wind.summer_monsoon ? `<div style="font-size:0.76rem; color:#FDE68A; line-height:1.4; margin-top:0.2rem;"><strong>Gió mùa Đông Nam:</strong> ${currentProvince.wind.summer_monsoon}</div>` : ''}
          </div>
        </div>

        <!-- Cổ Thư Khảo Chứng (Evidence Card) -->
        <div style="background:rgba(245,158,11,0.05); border:1px solid rgba(245,158,11,0.25); border-left:4px solid #FBBF24; padding:1.2rem 1.4rem; border-radius:0 8px 8px 0; margin-bottom:1.8rem;">
          <div style="font-size:0.76rem; font-weight:800; color:#FBBF24; margin-bottom:0.3rem;">
            THƯ TỊCH CỔ ĐIỂN KHẢO CHỨNG (CANONICAL SOURCE)
          </div>
          ${currentProvince.classical_sources.map(cs => `
            <div style="margin-bottom:0.8rem;">
              <div style="font-weight:700; color:#FEF3C7; font-size:0.95rem; margin-bottom:0.2rem;">${cs.work} — ${cs.volume} (${cs.author})</div>
              <div style="font-family:'Ma Shan Zheng', var(--font-title); font-size:1.05rem; color:#FDE68A; margin-bottom:0.3rem; line-height:1.5;">${cs.original_text}</div>
              <div style="font-size:0.85rem; color:var(--text-pure); line-height:1.6; margin-bottom:0.3rem;"><strong>Dịch nghĩa:</strong> ${cs.translation}</div>
              <div style="font-size:0.82rem; color:#38BDF8; font-style:italic;"><strong>Diễn giải học thuật:</strong> ${cs.interpretation}</div>
            </div>
          `).join('')}
        </div>

        <!-- Bảng Ma Trận 8 Hướng Thực Địa (Site-specific Orientation Matrix) -->
        <div style="margin-bottom:1.8rem;">
          <h3 style="font-size:1.15rem; color:#FEF3C7; margin:0 0 0.8rem 0;">
            Ma Trận Đánh Giá 8 Hướng Nhà Thực Địa (${currentProvince.name})
          </h3>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.8rem;">
            ${currentProvince.orientation_matrix.map(om => {
              const isTop = om.rank.includes('ĐỆ NHẤT') || om.rank.includes('THỨ CÁT');
              const isBad = om.rank.includes('HUNG');
              const borderColor = isTop ? '#34D399' : (isBad ? '#EF4444' : '#F59E0B');
              return `
                <div style="background:rgba(18,24,38,0.8); border:1px solid rgba(255,255,255,0.06); border-left:4px solid ${borderColor}; padding:0.9rem 1.1rem; border-radius:0 8px 8px 0;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.3rem;">
                    <strong style="color:#FEF3C7; font-size:0.95rem;">Hướng ${om.direction}</strong>
                    <span style="font-size:0.75rem; font-weight:800; color:${borderColor}; background:rgba(255,255,255,0.04); padding:0.15rem 0.5rem; border-radius:4px;">
                      ${om.rank} • ${om.score}/10
                    </span>
                  </div>
                  <div style="font-size:0.82rem; color:var(--text-pure); line-height:1.55;">
                    ${om.reasoning}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Khuyến Nghị Kiến Trúc Vi Khí Hậu -->
        <div style="background:rgba(56,189,248,0.06); border:1px solid rgba(56,189,248,0.2); padding:1.2rem; border-radius:8px;">
          <h3 style="font-size:0.95rem; color:#38BDF8; margin:0 0 0.6rem 0;">KHUYẾN NGHỊ THIẾT KẾ KIẾN TRÚC VI KHÍ HẬU BẢN ĐỊA</h3>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.6rem; font-size:0.82rem; color:var(--text-pure); line-height:1.55;">
            ${Object.entries(currentProvince.architecture_guide || {}).map(([k, v]) => {
              let label = k;
              if (k === 'entrance') label = 'Mở cửa chính';
              else if (k === 'windows') label = 'Cửa sổ đón gió';
              else if (k === 'eaves_and_shading') label = 'Mái hiên & che nắng';
              else if (k === 'foundation') label = 'Xử lý nền móng';
              else if (k === 'ground_elevation' || k === 'ground_level') label = 'Cốt nền chống ngập';
              else if (k === 'ventilation') label = 'Thông gió & giếng trời';
              else if (k === 'storm_protection' || k === 'storm_structure' || k === 'storm_and_salt_proofing') label = 'Chống bão gió';
              else if (k === 'corrosion_prevention' || k === 'anti_corrosion') label = 'Chống ăn mòn muối biển';
              else if (k === 'stilt_house' || k === 'ede_longhouse') label = 'Kiến trúc nhà sàn / nhà dài';
              else if (k === 'seismic_design' || k === 'seismic_resistance' || k === 'earthquake_design') label = 'Thiết kế kháng chấn';
              else if (k === 'shading' || k === 'thermal_shield' || k === 'thermal_envelope' || k === 'thermal_insulation' || k === 'insulation') label = 'Cách nhiệt chống nắng';
              else if (k === 'water_storage' || k === 'water_tank' || k === 'irrigation_pond' || k === 'freshwater_retention') label = 'Hồ trữ nước ngọt';
              else if (k === 'courtyard' || k === 'garden_setting' || k === 'garden_house' || k === 'orchard_villa') label = 'Sân vườn vi khí hậu';
              else if (k === 'flood_defense' || k === 'flood_resilience' || k === 'flood_proofing' || k === 'flood_adaptation') label = 'Thích ứng lũ lụt';
              else if (k === 'slope_stabilization' || k === 'slope_building' || k === 'safety_site') label = 'Ổn định sườn đồi';
              else if (k === 'lightning_protection') label = 'Hệ thống chống sét';
              return '<div><strong>• ' + label + ':</strong> ' + v + '</div>';
            }).join('')}
          </div>
        </div>

      </div>
    `;
  }

  renderDiaChatSelection(provinceId) {
    const activeArea = document.getElementById('tool-active-area');
    if (activeArea) {
      activeArea.innerHTML = this.renderDiaChat64Tab(provinceId);
    }
  }
}

if (typeof window !== 'undefined') {
  window.toolUI = new ToolUI();
}

if (typeof module !== 'undefined') {
  module.exports = { ToolUI };
}
