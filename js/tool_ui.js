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
            BÀN TÍNH TAM TÀI
          </div>
          <h1 style="font-family:var(--font-title); font-size:2.2rem; color:#FEF3C7; margin:0 0 0.5rem 0;">
            Bàn Tính Phong Thủy
          </h1>
          <p style="font-size:0.92rem; color:var(--text-muted); max-width:750px; margin:0 auto; line-height:1.6;">
            Hệ thống phân tích 8 tầng tích hợp: Kiểm soát nguy cơ thiên tai thực tế (Quyền Bác Bỏ Khẩn Cấp), quang học mặt trời 4 mùa, vi khí hậu thông gió và phong thủy chánh tông.
          </p>
        </header>

        <div style="display:flex; justify-content:center; gap:0.8rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:1rem; margin-bottom:2rem; flex-wrap:wrap;">
          <button onclick="window.toolUI.render('thiendianhan')" style="background:${this.currentToolTab === 'thiendianhan' ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${this.currentToolTab === 'thiendianhan' ? '#FBBF24' : 'rgba(255,255,255,0.1)'}; color:#FEF3C7; padding:0.65rem 1.3rem; border-radius:8px; font-weight:700; font-size:0.88rem; cursor:pointer;">
            Thiên Địa Nhân
          </button>
          <button onclick="window.toolUI.render('battrach')" style="background:${this.currentToolTab === 'battrach' ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${this.currentToolTab === 'battrach' ? '#FBBF24' : 'rgba(255,255,255,0.1)'}; color:#FEF3C7; padding:0.65rem 1.3rem; border-radius:8px; font-weight:700; font-size:0.88rem; cursor:pointer;">
            Bát Trạch Minh Cảnh
          </button>
          <button onclick="window.toolUI.render('huyenkhong')" style="background:${this.currentToolTab === 'huyenkhong' ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${this.currentToolTab === 'huyenkhong' ? '#FBBF24' : 'rgba(255,255,255,0.1)'}; color:#FEF3C7; padding:0.65rem 1.3rem; border-radius:8px; font-weight:700; font-size:0.88rem; cursor:pointer;">
            Huyền Không Vận 9
          </button>
          <button onclick="window.toolUI.render('hoagiaicothu')" style="background:${this.currentToolTab === 'hoagiaicothu' ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${this.currentToolTab === 'hoagiaicothu' ? '#F59E0B' : 'rgba(255,255,255,0.1)'}; color:#FEF3C7; padding:0.65rem 1.3rem; border-radius:8px; font-weight:700; font-size:0.88rem; cursor:pointer;">
            Thư Tịch Hóa Giải
          </button>
          <button onclick="window.toolUI.render('diachat64')" style="background:${this.currentToolTab === 'diachat64' ? 'rgba(56,189,248,0.25)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${this.currentToolTab === 'diachat64' ? '#38BDF8' : 'rgba(255,255,255,0.1)'}; color:#38BDF8; padding:0.65rem 1.3rem; border-radius:8px; font-weight:700; font-size:0.88rem; cursor:pointer;">
            Địa Chất 64 Tỉnh
          </button>
          <button onclick="window.toolUI.render('report')" style="background:${this.currentToolTab === 'report' ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${this.currentToolTab === 'report' ? '#FBBF24' : 'rgba(255,255,255,0.1)'}; color:#FEF3C7; padding:0.65rem 1.3rem; border-radius:8px; font-weight:700; font-size:0.88rem; cursor:pointer;">
            Báo Cáo Tổng Hợp
          </button>
        </div>

        <div id="tool-active-area">
          ${this.getToolContent(this.currentToolTab)}
        </div>
      </div>
    `;
  }

  getToolContent(tab) {
    if (tab === 'hoagiaicothu') {
      return this.renderHoaGiaiCoThuTab();
    } else if (tab === 'diachat64') {
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
    return this.renderHoaGiaiCoThuTab();
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
  // PHÂN HỆ THƯ TỊCH HÓA GIẢI & PHÁP TRỊ TRẠCH PHÁP
  // =========================================================================
  renderHoaGiaiCoThuTab() {
    const corpus = (typeof KHO_HOA_GIAI_CO_THU_CORPUS !== 'undefined') ? KHO_HOA_GIAI_CO_THU_CORPUS : [];
    if (!corpus || corpus.length === 0) {
      return '<div style="padding:2rem; text-align:center; color:var(--text-muted);">Đang nạp cơ sở dữ liệu Kho Thư Tịch Hóa Giải Cổ...</div>';
    }

    const selectedCategory = this.hoaGiaiCategory || 'TAT_CA';
    const searchQuery = (this.hoaGiaiSearchQuery || '').trim().toLowerCase();
    const selectedEvidence = this.hoaGiaiEvidenceFilter || 'TAT_CA';

    // Categories list (Hóa Sát, Tụ Tài, Văn Xương, Sức Khỏe Cổ Thư)
    const categories = [
      { id: 'TAT_CA', name: 'Tất Cả Các Phân Nhóm Hóa Giải & Kích Hoạt' },
      { id: 'VAN_XUONG', name: '• Văn Xương & Khoa Cử Học Hành (Nhất Tứ Đồng Cung)' },
      { id: 'TAI_LOC', name: '• Tụ Tài Khố & Tài Lộc Phú Quý (Hoàng Đế Trạch Kinh)' },
      { id: 'SUC_KHOE', name: '• Sức Khỏe & Dưỡng Thọ (Phòng Ngủ Thiên Y Cổ Bản)' },
      { id: 'THUY_PHAP', name: '• Thủy Pháp & Tụ Thủy (Bể Cá, Ao Hồ, Giếng Trời)' },
      { id: 'GUONG_KIM_LOAI', name: '• Gương Đồng & Vật Phản Chiếu' },
      { id: 'TRAN_THACH', name: '• Trấn Thạch & Thạch Cảm Đương' },
      { id: 'CAY_MOC', name: '• Thực Vật & Mộc Bản Địa (Gỗ Đào, Tre Trúc)' },
      { id: 'CUA_CONG', name: '• Khai Môn & Khí Khẩu (Đối Môn, Cầu Thang, Xuyên Tâm Sát)' },
      { id: 'BINH_PHONG', name: '• Bình Phong, Ảnh Bích & Chiếu Tường' },
      { id: 'TAO_HOA', name: '• Táo Vị & Hỏa Lộ (Bếp Nấu, Thủy Hỏa Tương Xung)' },
      { id: 'HINH_SAT', name: '• Nội & Ngoại Hình Sát (Lộ Xung, Phản Cung, Dầm Xà Đè)' },
      { id: 'KIM_KHI', name: '• Kim Khí & Cổ Tiền Trấn Sát (Tiền Ngũ Đế, Chuông Đồng)' },
      { id: 'PHU_LUC', name: '• Phù Lục & Trấn Trạch Nghi Lễ Cổ Truyền' }
    ];

    // Filter logic
    const filteredList = corpus.filter(item => {
      // Category match
      if (selectedCategory !== 'TAT_CA' && item.dai_phan_nhom !== selectedCategory) return false;

      // Evidence match
      if (selectedEvidence !== 'TAT_CA' && item.cap_do_bang_chung !== selectedEvidence) return false;

      // Search match
      if (searchQuery) {
        const normQ = this.removeVietnameseTones(searchQuery);
        const normTitle = this.removeVietnameseTones(item.ten_thuan_viet + ' ' + item.ten_chu_han);
        const normSat = this.removeVietnameseTones(item.sat_khi_va_khuyet_ham.ten_sat_khi);
        const normSources = this.removeVietnameseTones(item.thu_tich_khao_chung.map(s => s.tac_pham + ' ' + s.dich_nghia_thuan_viet).join(' '));
        const id = item.ma_dinh_danh.toLowerCase();

        return normTitle.includes(normQ) || normSat.includes(normQ) || normSources.includes(normQ) || id.includes(normQ);
      }

      return true;
    });

    return `
      <div style="background:rgba(18,24,38,0.8); border:1px solid rgba(245,158,11,0.3); border-radius:12px; padding:1.8rem; margin-bottom:2rem;">
        
        <!-- Header Kho Thư Tịch Hóa Giải -->
        <div style="margin-bottom:1.8rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:1.4rem;">
          <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.4rem; flex-wrap:wrap;">
            <span style="font-size:0.75rem; font-weight:800; color:#F59E0B; background:rgba(245,158,11,0.15); padding:0.2rem 0.6rem; border-radius:4px;">
              KHO THƯ TỊCH HÓA GIẢI PHONG THỦY CỔ
            </span>
            <span style="font-size:0.75rem; font-weight:700; color:#34D399; background:rgba(52,211,153,0.15); padding:0.2rem 0.6rem; border-radius:4px;">
              QUY TRÌNH 4 TẦNG
            </span>
            <span style="font-size:0.75rem; font-weight:700; color:#38BDF8; background:rgba(56,189,248,0.15); padding:0.2rem 0.6rem; border-radius:4px;">
              CHUẨN MỰC HÁN NÔM
            </span>
          </div>

          <h2 style="font-size:1.65rem; color:#FEF3C7; margin:0 0 0.5rem 0;">
            Thư Tịch Hóa Giải
          </h2>
          <p style="font-size:0.86rem; color:var(--text-muted); line-height:1.55; margin:0;">
            Hệ thống đối chiếu nghiêm ngặt giữa Thư Tịch Cổ Kinh Điển (Dương Trạch Thập Thư, Hoàng Đế Trạch Kinh, Táng Thư, Dương Trạch Tam Yếu, Nhập Địa Nhãn...) với thực tế kiến trúc và vi khí hậu. Phân định rạch ròi giữa <strong>Vật Phẩm Cổ Thư Chứng Thực</strong> và <strong>Ngoại Suy Diễn Giải Hiện Đại (như Bể Cá mô phỏng Thủy Thể Minh Đường)</strong>.
          </p>
        </div>

        <!-- Thanh Tìm Kiếm & Bộ Lọc Nhanh -->
        <div style="background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.06); padding:1.2rem; border-radius:10px; margin-bottom:1.8rem;">
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem; margin-bottom:1rem;">
            
            <!-- Ô Tìm Kiếm Từ Khóa -->
            <div>
              <label style="display:block; font-size:0.8rem; font-weight:700; color:#FEF3C7; margin-bottom:0.4rem;">
                Tìm kiếm sát khí / vật phẩm / cổ thư:
              </label>
              <input 
                type="text" 
                value="${this.hoaGiaiSearchQuery || ''}" 
                placeholder="Gõ từ khóa (vd: bể cá, gương đồng, đối môn, lộ xung, bếp...)" 
                oninput="window.toolUI.searchHoaGiai(this.value)"
                style="width:100%; background:#0D111A; border:1px solid #F59E0B; color:#FEF3C7; padding:0.55rem 1rem; border-radius:8px; font-size:0.86rem; outline:none;"
              />
            </div>

            <!-- Bộ Lọc Phân Nhóm -->
            <div>
              <label style="display:block; font-size:0.8rem; font-weight:700; color:#FEF3C7; margin-bottom:0.4rem;">
                Chọn 1 trong 10 Đại Phân Nhóm:
              </label>
              <select 
                onchange="window.toolUI.filterHoaGiaiCategory(this.value)" 
                style="width:100%; background:#0D111A; border:1px solid #38BDF8; color:#38BDF8; padding:0.55rem 1rem; border-radius:8px; font-weight:700; font-size:0.86rem; cursor:pointer;"
              >
                ${categories.map(c => `<option value="${c.id}" ${selectedCategory === c.id ? 'selected' : ''}>${c.name}</option>`).join('')}
              </select>
            </div>

            <!-- Bộ Lọc Mức Khảo Chứng -->
            <div>
              <label style="display:block; font-size:0.8rem; font-weight:700; color:#FEF3C7; margin-bottom:0.4rem;">
                Mức khảo chứng:
              </label>
              <select 
                onchange="window.toolUI.filterHoaGiaiEvidence(this.value)" 
                style="width:100%; background:#0D111A; border:1px solid #34D399; color:#34D399; padding:0.55rem 1rem; border-radius:8px; font-weight:700; font-size:0.86rem; cursor:pointer;"
              >
                <option value="TAT_CA" ${selectedEvidence === 'TAT_CA' ? 'selected' : ''}>Tất Cả Mức Khảo Chứng</option>
                <option value="CHUNG_CU_TRUC_TIEP_CO_THU" ${selectedEvidence === 'CHUNG_CU_TRUC_TIEP_CO_THU' ? 'selected' : ''}>Chứng Cứ Trực Tiếp Nguyên Văn Cổ Thư</option>
                <option value="NGOAI_SUY_DIEN_GIAI_HOP_LE" ${selectedEvidence === 'NGOAI_SUY_DIEN_GIAI_HOP_LE' ? 'selected' : ''}>Ngoại Suy Diễn Giải Hợp Lệ (vd: Bể Cá)</option>
              </select>
            </div>

          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; color:var(--text-muted);">
            <span>Tìm thấy <strong>${filteredList.length}</strong> phương pháp hóa giải chuẩn hóa.</span>
            <span style="color:#F59E0B;">Nhấp vào từng hồ sơ bên dưới để xem toàn bộ 13 tiêu chí khảo chứng!</span>
          </div>
        </div>

        <!-- Danh Sách Các Thẻ Hồ Sơ Hóa Giải -->
        <div style="display:flex; flex-direction:column; gap:1.6rem;">
          ${filteredList.length === 0 ? `
            <div style="padding:3rem; text-align:center; color:var(--text-muted); background:rgba(0,0,0,0.2); border-radius:8px;">
              Không tìm thấy hồ sơ hóa giải phù hợp với từ khóa "${searchQuery}". Vui lòng thử từ khóa khác.
            </div>
          ` : filteredList.map((item, idx) => {
            const isDirect = item.cap_do_bang_chung === 'CHUNG_CU_TRUC_TIEP_CO_THU';
            const badgeColor = isDirect ? '#34D399' : '#F59E0B';
            const badgeText = isDirect ? 'CHÍNH VĂN CỔ THƯ' : 'NGOẠI SUY HỢP LỆ';

            let remedyTypeLabel = 'CẢI BIẾN KIẾN TRÚC';
            if (item.loai_phap_tri === 'PHAP_TRI_MOI_TRUONG') remedyTypeLabel = 'CẢI BIẾN MÔI TRƯỜNG & HÌNH THẾ';
            else if (item.loai_phap_tri === 'VAT_PHAM_PHONG_THUY_CO') remedyTypeLabel = 'VẬT PHẨM PHONG THỦY CỔ THƯ';
            else if (item.loai_phap_tri === 'NGHI_LE_PHU_CHU_CO') remedyTypeLabel = 'PHÙ CHÚ NGHI LỄ CỔ TRUYỀN';

            return `
              <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); border-left:4px solid ${badgeColor}; border-radius:0 10px 10px 0; padding:1.4rem; transition:all 0.2s ease;">
                
                <!-- Tiêu đề & Badges -->
                <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.8rem;">
                  <div>
                    <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.3rem; flex-wrap:wrap;">
                      <span style="font-size:0.72rem; font-weight:800; color:${badgeColor}; background:rgba(255,255,255,0.05); padding:0.15rem 0.5rem; border-radius:4px;">
                        ${badgeText}
                      </span>
                      <span style="font-size:0.72rem; font-weight:700; color:#38BDF8; background:rgba(56,189,248,0.12); padding:0.15rem 0.5rem; border-radius:4px;">
                        ${remedyTypeLabel}
                      </span>
                      <span style="font-size:0.72rem; font-weight:700; color:#F59E0B; background:rgba(245,158,11,0.12); padding:0.15rem 0.5rem; border-radius:4px;">
                        Hồ Sơ ${idx + 1}
                      </span>
                    </div>
                    <h3 style="font-size:1.25rem; color:#FEF3C7; margin:0;">
                      ${item.ten_thuan_viet}
                    </h3>
                    <div style="font-size:0.86rem; color:#FDE68A; font-family:'Ma Shan Zheng', var(--font-title); margin-top:0.15rem;">
                      ${item.ten_chu_han}
                    </div>
                  </div>
                </div>

                <!-- Giải trình bằng chứng -->
                <div style="background:rgba(0,0,0,0.25); border-left:3px solid #38BDF8; padding:0.6rem 0.9rem; border-radius:0 6px 6px 0; font-size:0.82rem; color:var(--text-pure); line-height:1.55; margin-bottom:1rem;">
                  <strong>Giải trình bằng chứng:</strong> ${item.giai_trinh_bang_chung}
                </div>

                <!-- Thư tịch cổ khảo chứng -->
                <div style="background:rgba(245,158,11,0.04); border:1px solid rgba(245,158,11,0.2); padding:1rem 1.2rem; border-radius:8px; margin-bottom:1rem;">
                  <div style="font-size:0.75rem; font-weight:800; color:#F59E0B; margin-bottom:0.5rem;">
                    THƯ TỊCH KHẢO CHỨNG:
                  </div>
                  ${item.thu_tich_khao_chung.map(s => `
                    <div style="margin-bottom:0.6rem;">
                      <div style="font-weight:700; color:#FEF3C7; font-size:0.88rem;">${s.tac_pham} — ${s.quyen_muc} (${s.tac_gia})</div>
                      <div style="font-size:0.95rem; color:#FDE68A; font-family:'Ma Shan Zheng', var(--font-title); margin:0.2rem 0; line-height:1.5;">${s.nguyen_van_chu_han}</div>
                      <div style="font-size:0.82rem; color:var(--text-pure); line-height:1.55;"><strong>Dịch nghĩa:</strong> ${s.dich_nghia_thuan_viet}</div>
                      <div style="font-size:0.8rem; color:#38BDF8; font-style:italic; margin-top:0.2rem;"><strong>Diễn giải học thuật:</strong> ${s.dien_giai_hoc_thuat}</div>
                    </div>
                  `).join('')}
                </div>

                <!-- Lưới 3 Cột: Sát Khí - Quy Trình Hóa Giải - Ứng Dụng Hiện Đại -->
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem; margin-bottom:1rem;">
                  
                  <!-- Khối 1: Sát Khí & Nguyên Nhân -->
                  <div style="background:rgba(239,68,68,0.04); border:1px solid rgba(239,68,68,0.18); border-top:3px solid #EF4444; padding:0.9rem; border-radius:6px;">
                    <h4 style="font-size:0.86rem; color:#EF4444; margin:0 0 0.4rem 0;">BẢN CHẤT SÁT KHÍ</h4>
                    <div style="font-size:0.8rem; color:#FEF3C7; font-weight:700; margin-bottom:0.3rem;">${item.sat_khi_va_khuyet_ham.ten_sat_khi}</div>
                    <div style="font-size:0.8rem; color:var(--text-pure); line-height:1.5; margin-bottom:0.4rem;"><strong>Nguyên nhân:</strong> ${item.sat_khi_va_khuyet_ham.nguyen_nhan_hinh_thanh}</div>
                    <div style="font-size:0.78rem; color:#FCA5A5; line-height:1.45;"><strong>Hậu quả cổ thư ghi:</strong> ${item.sat_khi_va_khuyet_ham.hau_qua_co_thu_ghi}</div>
                  </div>

                  <!-- Khối 2: Phương Pháp Hóa Giải Kiến Trúc / Môi Trường -->
                  <div style="background:rgba(52,211,153,0.04); border:1px solid rgba(52,211,153,0.18); border-top:3px solid #34D399; padding:0.9rem; border-radius:6px;">
                    <h4 style="font-size:0.86rem; color:#34D399; margin:0 0 0.4rem 0;">PHƯƠNG PHÁP HÓA GIẢI</h4>
                    <div style="font-size:0.8rem; color:var(--text-pure); line-height:1.5; margin-bottom:0.4rem;"><strong>Cải tạo kiến trúc:</strong> ${item.phap_tri_kien_truc_va_vat_the.cai_bien_kien_truc}</div>
                    <div style="font-size:0.8rem; color:var(--text-pure); line-height:1.5;"><strong>Cải tạo môi trường:</strong> ${item.phap_tri_kien_truc_va_vat_the.cai_bien_moi_truong}</div>
                  </div>

                  <!-- Khối 3: Bố Trí Vật Thể & Quy Chuẩn Hiện Đại -->
                  <div style="background:rgba(56,189,248,0.04); border:1px solid rgba(56,189,248,0.18); border-top:3px solid #38BDF8; padding:0.9rem; border-radius:6px;">
                    <h4 style="font-size:0.86rem; color:#38BDF8; margin:0 0 0.4rem 0;">QUY CHUẨN BỐ TRÍ</h4>
                    ${item.phap_tri_kien_truc_va_vat_the.ung_dung_be_ca_hien_dai ? `
                      <div style="font-size:0.8rem; color:var(--text-pure); line-height:1.5; margin-bottom:0.3rem;"><strong>Vị trí đặt:</strong> ${item.phap_tri_kien_truc_va_vat_the.ung_dung_be_ca_hien_dai.vi_tri_dat_chuan}</div>
                      ${item.phap_tri_kien_truc_va_vat_the.ung_dung_be_ca_hien_dai.quy_cach_kich_thuoc ? `<div style="font-size:0.78rem; color:var(--text-muted); margin-bottom:0.3rem;"><strong>Kích thước quy chuẩn:</strong> ${item.phap_tri_kien_truc_va_vat_the.ung_dung_be_ca_hien_dai.quy_cach_kich_thuoc}</div>` : ''}
                      ${item.phap_tri_kien_truc_va_vat_the.ung_dung_be_ca_hien_dai.dong_tinh_nuoc ? `<div style="font-size:0.78rem; color:#93C5FD;"><strong>Trạng thái động/tĩnh:</strong> ${item.phap_tri_kien_truc_va_vat_the.ung_dung_be_ca_hien_dai.dong_tinh_nuoc}</div>` : ''}
                    ` : ''}
                  </div>

                </div>

                <!-- Bảng 5 Điều Cấm Kỵ Tuyệt Đối & Các Chế Độ Sai Phạm -->
                <div style="background:rgba(0,0,0,0.25); border:1px solid rgba(255,255,255,0.06); padding:0.9rem 1.1rem; border-radius:6px; margin-bottom:0.8rem;">
                  <div style="font-size:0.8rem; font-weight:800; color:#F87171; margin-bottom:0.4rem;">
                    ĐIỀU CẤM KỴ TUYỆT ĐỐI:
                  </div>
                  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.4rem; font-size:0.78rem; color:var(--text-pure); line-height:1.45; margin-bottom:0.6rem;">
                    ${item.dieu_kien_cam_ky_tuyet_doi.map(c => `<div>• ${c}</div>`).join('')}
                  </div>

                  <div style="border-top:1px dashed rgba(255,255,255,0.08); padding-top:0.4rem; font-size:0.76rem; color:var(--text-dim); line-height:1.45;">
                    <strong style="color:#FEF3C7;">Hậu quả khi làm sai:</strong> 
                    Sai hướng: ${item.cac_che_do_sai_pham_va_hau_qua.sai_phuong_vi} • 
                    Sai kích cỡ: ${item.cac_che_do_sai_pham_va_hau_qua.sai_quy_mo} • 
                    Bỏ bê ô nhiễm: ${item.cac_che_do_sai_pham_va_hau_qua.bo_be_o_nhiem}
                  </div>
                </div>

                <!-- Kết luận LapQue -->
                <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.78rem; color:var(--text-muted); border-top:1px solid rgba(255,255,255,0.06); padding-top:0.6rem;">
                  <span><strong>Khảo luận LapQue:</strong> ${item.danh_gia_lapque.ket_luan}</span>
                  <span style="color:#34D399; font-weight:700; white-space:nowrap; margin-left:0.6rem;">Độ tin cậy: ${Math.round(item.danh_gia_lapque.do_tin_cay * 100)}%</span>
                </div>

              </div>
            `;
          }).join('')}
        </div>

      </div>
    `;
  }

  filterHoaGiaiCategory(catId) {
    this.hoaGiaiCategory = catId;
    const activeArea = document.getElementById('tool-active-area');
    if (activeArea) {
      activeArea.innerHTML = this.renderHoaGiaiCoThuTab();
    }
  }

  filterHoaGiaiEvidence(evId) {
    this.hoaGiaiEvidenceFilter = evId;
    const activeArea = document.getElementById('tool-active-area');
    if (activeArea) {
      activeArea.innerHTML = this.renderHoaGiaiCoThuTab();
    }
  }

  searchHoaGiai(query) {
    this.hoaGiaiSearchQuery = query;
    const activeArea = document.getElementById('tool-active-area');
    if (activeArea) {
      activeArea.innerHTML = this.renderHoaGiaiCoThuTab();
    }
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
                ĐỊA KHÍ THỦY THỔ
              </span>
              <span style="font-size:0.75rem; font-weight:700; color:#34D399; background:rgba(52,211,153,0.15); padding:0.2rem 0.6rem; border-radius:4px;">
                KHẢO CHỨNG: ${currentProvince.evidence_gate.status} (Độ tin cậy ${Math.round(currentProvince.evidence_gate.confidence * 100)}%)
              </span>
            </div>
            <h2 style="font-size:1.6rem; color:#FEF3C7; margin:0;">
              ${currentProvince.name} — Hồ Sơ Địa Lý
            </h2>
            <div style="font-size:0.84rem; color:var(--text-muted); margin-top:0.2rem;">
              <strong>Địa giới lịch sử:</strong> ${currentProvince.historical_mapping} • <strong>Quy chiếu hiện hành:</strong> ${currentProvince.current_mapping}
            </div>
          </div>

          <div style="display:flex; align-items:center; gap:0.6rem; width:100%; max-width:420px;">
            <label style="font-size:0.86rem; color:#FEF3C7; font-weight:600; white-space:nowrap;">Chọn Tỉnh / Đơn Vị:</label>
            <div class="diachat-combobox-wrapper" style="position:relative; width:100%;">
              <div style="position:relative; display:flex; align-items:center;">
                <svg style="position:absolute; left:10px; pointer-events:none; color:#38BDF8;" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input 
                  type="text" 
                  id="diachat-search-input" 
                  value="${currentProvince.name} (${currentProvince.region.split('(')[0].trim()})" 
                  placeholder="Gõ tìm nhanh (vd: Sơn La, Hà Tây, s, h...)" 
                  autocomplete="off" 
                  onclick="window.toolUI.toggleDiaChatDropdown(true)"
                  onfocus="this.select(); window.toolUI.toggleDiaChatDropdown(true);"
                  oninput="window.toolUI.filterDiaChatList(this.value)"
                  onkeydown="window.toolUI.handleDiaChatKeydown(event)"
                  style="width:100%; background:#0D111A; border:1px solid #38BDF8; color:#FEF3C7; padding:0.5rem 2rem 0.5rem 2rem; border-radius:8px; font-weight:700; font-size:0.86rem; outline:none; transition:all 0.2s ease; box-shadow:0 0 8px rgba(56,189,248,0.15);"
                />
                <button 
                  type="button" 
                  onclick="window.toolUI.toggleDiaChatDropdown()" 
                  style="position:absolute; right:6px; background:none; border:none; color:#38BDF8; cursor:pointer; padding:4px; display:flex; align-items:center;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
              </div>

              <!-- Danh Sách Xổ Xuống Tự Động Thu Gọn & Cuộn Mượt -->
              <div 
                id="diachat-dropdown-list" 
                style="display:none; position:absolute; top:calc(100% + 4px); left:0; right:0; background:#0A0E17; border:1px solid rgba(56,189,248,0.5); border-radius:8px; max-height:280px; overflow-y:auto; z-index:1000; box-shadow:0 12px 30px rgba(0,0,0,0.85); backdrop-filter:blur(10px);"
              >
              </div>
            </div>
          </div>
        </div>

        <!-- Lưới 4 Cột: Địa Hình - Địa Chất - Thủy Văn - Khí Hậu -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1rem; margin-bottom:1.8rem;">
          
          <!-- Thẻ 01: Địa Hình -->
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-top:3px solid #F59E0B; padding:1rem; border-radius:8px;">
            <h3 style="font-size:0.92rem; color:#F59E0B; margin:0 0 0.5rem 0;">01. Địa Hình Tiểu Vùng</h3>
            <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.4rem;"><strong>Cao độ:</strong> ${currentProvince.terrain.elevation}</div>
            <div style="font-size:0.82rem; color:var(--text-pure); line-height:1.5; margin-bottom:0.5rem;">${currentProvince.terrain.geomorphology}</div>
            <div style="border-top:1px dashed rgba(255,255,255,0.08); padding-top:0.4rem;">
              <strong style="font-size:0.76rem; color:#FEF3C7;">Tiểu vùng thực địa:</strong>
              ${currentProvince.terrain.sub_regions.map(sr => `<div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.2rem;">• ${sr}</div>`).join('')}
            </div>
          </div>

          <!-- Thẻ 02: Địa Chất -->
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-top:3px solid #EF4444; padding:1rem; border-radius:8px;">
            <h3 style="font-size:0.92rem; color:#EF4444; margin:0 0 0.5rem 0;">02. Địa Chất Chịu Tải</h3>
            ${currentProvince.geology.soil_types ? `<div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.3rem;"><strong>Chất đất:</strong> ${currentProvince.geology.soil_types}</div>` : ''}
            ${currentProvince.geology.bedrock ? `<div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.4rem;"><strong>Đá gốc:</strong> ${currentProvince.geology.bedrock}</div>` : ''}
            ${currentProvince.geology.engineering_geology ? `<div style="background:rgba(239,68,68,0.08); padding:0.4rem 0.6rem; border-radius:4px; font-size:0.78rem; color:#FEF3C7; line-height:1.45; margin-bottom:0.4rem;"><strong>Sức chịu tải & móng:</strong> ${currentProvince.geology.engineering_geology}</div>` : ''}
            ${currentProvince.geology.seismic_hazard ? `<div style="font-size:0.74rem; color:var(--text-dim);"><strong>Địa chấn:</strong> ${currentProvince.geology.seismic_hazard}</div>` : ''}
          </div>

          <!-- Thẻ 03: Thủy Văn, Mạch Ngầm & Hướng Thoát Nước -->
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-top:3px solid #3B82F6; padding:1.1rem; border-radius:8px; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <h3 style="font-size:0.92rem; color:#3B82F6; margin:0 0 0.6rem 0;">03. Thủy Văn & Mạch Ngầm</h3>
              ${currentProvince.water.major_rivers ? `<div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.4rem;"><strong>Sông chính:</strong> ${currentProvince.water.major_rivers}</div>` : ''}
              ${currentProvince.water.flow_direction ? `<div style="font-size:0.8rem; color:#93C5FD; line-height:1.45; margin-bottom:0.4rem; background:rgba(59,130,246,0.08); padding:0.4rem 0.6rem; border-radius:4px;"><strong>Hướng dòng chảy sông ngòi:</strong> ${currentProvince.water.flow_direction}</div>` : ''}
              ${currentProvince.water.groundwater_flow ? `<div style="font-size:0.78rem; color:#A5B4FC; line-height:1.4; margin-bottom:0.4rem;"><strong>Hướng mạch nước ngầm:</strong> ${currentProvince.water.groundwater_flow}</div>` : ''}
              ${currentProvince.water.drainage_guideline ? `<div style="font-size:0.78rem; color:#6EE7B7; line-height:1.4; margin-bottom:0.4rem; border-left:2px solid #34D399; padding-left:0.5rem;"><strong>Quy chuẩn thoát nước thải:</strong> ${currentProvince.water.drainage_guideline}</div>` : ''}
            </div>
            <div style="border-top:1px dashed rgba(255,255,255,0.08); padding-top:0.4rem; margin-top:0.4rem; font-size:0.76rem; color:var(--text-dim);">
              ${currentProvince.water.flood_season ? `<span><strong>Mùa lũ:</strong> ${currentProvince.water.flood_season}</span> • ` : ''}
              ${currentProvince.water.historic_flood_level ? `<span><strong>Đỉnh lũ:</strong> ${currentProvince.water.historic_flood_level}</span>` : ''}
              ${currentProvince.water.hydrology_regime ? `<div style="margin-top:0.2rem;"><strong>Thủy triều:</strong> ${currentProvince.water.hydrology_regime}</div>` : ''}
              ${currentProvince.water.salinity_intrusion ? `<div style="color:#FCA5A5; margin-top:0.2rem;"><strong>Xâm nhập mặn:</strong> ${currentProvince.water.salinity_intrusion}</div>` : ''}
            </div>
          </div>

          <!-- Thẻ 04: Khí Tượng, Khí Lộ & Hướng Đón Gió -->
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-top:3px solid #10B981; padding:1.1rem; border-radius:8px; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <h3 style="font-size:0.92rem; color:#10B981; margin:0 0 0.6rem 0;">04. Khí Tượng & Đón Gió</h3>
              ${currentProvince.wind && currentProvince.wind.wind_path_and_intake ? `<div style="font-size:0.8rem; color:#A7F3D0; line-height:1.45; margin-bottom:0.4rem; background:rgba(16,185,129,0.08); padding:0.4rem 0.6rem; border-radius:4px;"><strong>Khí lộ & Đón gió 4 mùa:</strong> ${currentProvince.wind.wind_path_and_intake}</div>` : ''}
              ${currentProvince.wind && currentProvince.wind.summer_monsoon ? `<div style="font-size:0.78rem; color:#FDE68A; line-height:1.4; margin-bottom:0.3rem;"><strong>Gió mùa Đông Nam / Tây Nam:</strong> ${currentProvince.wind.summer_monsoon}</div>` : ''}
              ${currentProvince.wind && currentProvince.wind.winter_monsoon ? `<div style="font-size:0.78rem; color:#BAE6FD; line-height:1.4; margin-bottom:0.3rem;"><strong>Gió mùa Đông Bắc:</strong> ${currentProvince.wind.winter_monsoon}</div>` : ''}
            </div>
            <div style="border-top:1px dashed rgba(255,255,255,0.08); padding-top:0.4rem; margin-top:0.4rem; font-size:0.76rem; color:var(--text-dim);">
              ${currentProvince.climate.temperature_avg ? `<span><strong>Nhiệt độ:</strong> ${currentProvince.climate.temperature_avg}</span> • ` : ''}
              ${currentProvince.climate.rainfall_avg ? `<span><strong>Mưa:</strong> ${currentProvince.climate.rainfall_avg}</span> • ` : ''}
              ${currentProvince.climate.humidity_avg ? `<span><strong>Ẩm:</strong> ${currentProvince.climate.humidity_avg}</span>` : ''}
            </div>
          </div>
        </div>

        <!-- Cổ Thư Khảo Chứng (Evidence Card) -->
        <div style="background:rgba(245,158,11,0.05); border:1px solid rgba(245,158,11,0.25); border-left:4px solid #FBBF24; padding:1.2rem 1.4rem; border-radius:0 8px 8px 0; margin-bottom:1.8rem;">
          <div style="font-size:0.76rem; font-weight:800; color:#FBBF24; margin-bottom:0.3rem;">
            Thư Tịch Khảo Chứng
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
            Ma Trận 8 Hướng (${currentProvince.name})
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

        <!-- Khuyến Nghị Thiết Kế Kiến Trúc & Thoát Nước Vi Khí Hậu (100% Thuần Việt / Hán Việt) -->
        <div style="background:rgba(56,189,248,0.06); border:1px solid rgba(56,189,248,0.25); padding:1.4rem; border-radius:10px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem; border-bottom:1px solid rgba(56,189,248,0.2); padding-bottom:0.5rem; flex-wrap:wrap; gap:0.5rem;">
            <h3 style="font-size:1rem; color:#38BDF8; margin:0; font-weight:700;">
              Khuyến Nghị Kiến Trúc
            </h3>
            <span style="font-size:0.75rem; color:#34D399; font-weight:700; background:rgba(52,211,153,0.12); padding:0.2rem 0.5rem; border-radius:4px;">
              CHUẨN MỰC BẢN ĐỊA
            </span>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.8rem; font-size:0.83rem; color:var(--text-pure); line-height:1.55;">
            ${Object.entries(currentProvince.architecture_guide || {}).map(([k, v]) => {
              let label = k;
              if (k === 'mo_cua_chinh' || k === 'entrance') label = 'Khai Mở Đại Môn';
              else if (k === 'cua_so_don_gio' || k === 'windows') label = 'Cửa Sổ & Giếng Trời';
              else if (k === 'thoat_nuoc_sinh_hoat' || k === 'drainage') label = 'Thoát Nước & Hầm Tự Hoại';
              else if (k === 'xu_ly_nen_mong' || k === 'foundation' || k === 'xu_ly_mong_sau') label = 'Xử Lý Nền Móng Kỹ Thuật';
              else if (k === 'cot_nen_chong_ngap' || k === 'ground_elevation' || k === 'khong_che_trieu') label = 'Cốt Nền Vượt Đỉnh Lũ & Triều Cường';
              else if (k === 'chong_nong_cach_nhiet' || k === 'shading' || k === 'thermal_shield') label = 'Cách Nhiệt & Chống Nắng Hướng Tây';
              else if (k === 'phong_chong_bao_gio' || k === 'storm_protection') label = 'Phòng Chống Bão Gió & Tốc Mái';
              else if (k === 'chong_an_mon_muoi_bien' || k === 'corrosion_prevention' || k === 'anti_corrosion') label = 'Chống Ăn Mòn Muối Biển';
              else if (k === 'ho_tru_nuoc_ngot' || k === 'water_storage' || k === 'freshwater_retention') label = 'Bể / Hồ Trữ Nước Ngọt Dự Phòng';
              else if (k === 'thiet_ke_khang_chan' || k === 'seismic_design') label = 'Thiết Kế Kháng Chấn Động Đất';
              else if (k === 'he_thong_chong_set' || k === 'lightning_protection') label = 'Hệ Thống Chống Sét Đánh An Toàn';
              else if (k === 'on_dinh_ke_taluy' || k === 'slope_stabilization') label = 'Kè Đá Móng Ổn Định Sườn Đồi';
              else if (k === 'kien_truc_nha_san' || k === 'stilt_house' || k === 'ede_longhouse') label = 'Kiến Trúc Nhà Sàn / Nhà Dài Bản Địa';
              else if (k === 'san_vuon_vi_khi_hau' || k === 'courtyard' || k === 'orchard_villa') label = 'Bố Cục Sân Vườn Điều Hòa Vi Khí Hậu';
              return '<div style="background:rgba(255,255,255,0.02); padding:0.6rem 0.8rem; border-radius:6px; border-left:3px solid #38BDF8;"><strong style="color:#FEF3C7;">• ' + label + ':</strong> ' + v + '</div>';
            }).join('')}
          </div>
        </div>

      </div>
    `;
  }

    // =========================================================================
  // BỘ TÌM KIẾM TỈNH THÀNH THEO KÝ TỰ (SEARCHABLE COMBOBOX 64 TỈNH THÀNH)
  // =========================================================================
  removeVietnameseTones(str) {
    if (!str) return '';
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
    str = str.replace(/\u02C6|\u0306|\u031B/g, "");
    return str.trim();
  }

  toggleDiaChatDropdown(forceOpen) {
    const list = document.getElementById('diachat-dropdown-list');
    if (!list) return;

    const isOpen = list.style.display === 'block';
    if (forceOpen === true || !isOpen) {
      list.style.display = 'block';
      this.populateDiaChatDropdown();
      
      // Auto close when click outside
      setTimeout(() => {
        const closeHandler = (e) => {
          if (!e.target.closest('.diachat-combobox-wrapper')) {
            list.style.display = 'none';
            document.removeEventListener('click', closeHandler);
          }
        };
        document.addEventListener('click', closeHandler);
      }, 50);
    } else {
      list.style.display = 'none';
    }
  }

  populateDiaChatDropdown(customList = null) {
    const list = document.getElementById('diachat-dropdown-list');
    if (!list) return;

    const corpus = (typeof DIA_LY_64_TINH_THANH_CORPUS !== 'undefined') ? DIA_LY_64_TINH_THANH_CORPUS : [];
    const items = customList || corpus;

    if (items.length === 0) {
      list.innerHTML = '<div style="padding:0.8rem; text-align:center; color:var(--text-muted); font-size:0.82rem;">Không tìm thấy tỉnh thành phù hợp</div>';
      return;
    }

    const currentSelectedId = this.selectedDiaChatId || 'HN_PRE2008';

    list.innerHTML = items.map((p, idx) => {
      const isActive = p.historical_id === currentSelectedId;
      return `
        <div 
          class="diachat-opt-item ${isActive ? 'active' : ''}" 
          onclick="window.toolUI.selectDiaChatProvince('${p.historical_id}')"
          data-id="${p.historical_id}"
          data-index="${idx}"
          style="padding:0.55rem 0.85rem; cursor:pointer; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.04); background:${isActive ? 'rgba(56,189,248,0.18)' : 'transparent'}; transition:background 0.15s ease;"
          onmouseover="this.style.background='rgba(56,189,248,0.2)'"
          onmouseout="this.style.background='${isActive ? 'rgba(56,189,248,0.18)' : 'transparent'}'"
        >
          <div>
            <span style="font-weight:700; color:${isActive ? '#38BDF8' : '#FEF3C7'}; font-size:0.86rem;">${p.name}</span>
            <span style="font-size:0.75rem; color:var(--text-muted); margin-left:0.4rem;">(${p.region})</span>
          </div>
          <span style="font-size:0.72rem; color:rgba(255,255,255,0.35);">Đơn Vị ${idx + 1}</span>
        </div>
      `;
    }).join('');
  }

  filterDiaChatList(query) {
    const list = document.getElementById('diachat-dropdown-list');
    if (!list) return;
    list.style.display = 'block';

    const corpus = (typeof DIA_LY_64_TINH_THANH_CORPUS !== 'undefined') ? DIA_LY_64_TINH_THANH_CORPUS : [];
    if (!query || !query.trim()) {
      this.populateDiaChatDropdown(corpus);
      return;
    }

    const normQ = this.removeVietnameseTones(query.trim());
    const exactQ = query.trim().toLowerCase();

    const getScore = (p) => {
      const normName = this.removeVietnameseTones(p.name);
      const words = normName.split(/\s+/);
      
      // 1. Trùng khớp hoàn toàn tên
      if (normName === normQ || p.name.toLowerCase() === exactQ) return 100;
      // 2. Tên bắt đầu bằng từ khóa tìm kiếm (vd: "s" -> Sơn La, Sóc Trăng; "h" -> Hà Nội, Hà Tây)
      if (normName.startsWith(normQ)) return 90;
      // 3. Có từ đơn trong tên bắt đầu bằng từ khóa (vd: "la" -> Sơn La, Gia Lai, Đắk Lắk; "nam" -> Hà Nam, Nam Định)
      if (words.some(w => w.startsWith(normQ))) return 80;
      // 4. Tên chứa từ khóa
      if (normName.includes(normQ) || p.name.toLowerCase().includes(exactQ)) return 70;
      // 5. Vùng địa lý bắt đầu hoặc chứa
      const normRegion = this.removeVietnameseTones(p.region);
      if (normRegion.startsWith(normQ)) return 60;
      if (normRegion.includes(normQ)) return 50;
      // 6. Địa giới lịch sử / huyện lỵ chứa từ khóa (vd: "ba tri" -> Bến Tre; "dong van" -> Hà Giang)
      const normMapping = this.removeVietnameseTones(p.historical_mapping);
      if (normMapping.includes(normQ)) return 40;
      // 7. Mã ID lịch sử chứa từ khóa (vd: "HN", "SG", "LD")
      if (p.historical_id.toLowerCase().includes(normQ)) return 30;
      return 0;
    };

    const scored = corpus.map(p => ({ province: p, score: getScore(p) }))
                         .filter(item => item.score > 0);

    scored.sort((a, b) => b.score - a.score);

    const filtered = scored.map(item => item.province);
    this.populateDiaChatDropdown(filtered);
  }

  selectDiaChatProvince(provinceId) {
    this.selectedDiaChatId = provinceId;
    const list = document.getElementById('diachat-dropdown-list');
    if (list) list.style.display = 'none';

    this.renderDiaChatSelection(provinceId);
  }

  handleDiaChatKeydown(e) {
    const list = document.getElementById('diachat-dropdown-list');
    if (!list || list.style.display === 'none') {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        this.toggleDiaChatDropdown(true);
      }
      return;
    }

    const items = list.querySelectorAll('.diachat-opt-item');
    if (items.length === 0) return;

    let activeIdx = -1;
    items.forEach((item, idx) => {
      if (item.classList.contains('focused') || item.classList.contains('active')) {
        activeIdx = idx;
      }
    });

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = (activeIdx + 1) % items.length;
      items.forEach(it => it.classList.remove('focused'));
      items[nextIdx].classList.add('focused');
      items[nextIdx].style.background = 'rgba(56,189,248,0.25)';
      items[nextIdx].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIdx = (activeIdx - 1 + items.length) % items.length;
      items.forEach(it => it.classList.remove('focused'));
      items[prevIdx].classList.add('focused');
      items[prevIdx].style.background = 'rgba(56,189,248,0.25)';
      items[prevIdx].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const focused = list.querySelector('.diachat-opt-item.focused') || items[0];
      if (focused) {
        const id = focused.getAttribute('data-id');
        this.selectDiaChatProvince(id);
      }
    } else if (e.key === 'Escape') {
      list.style.display = 'none';
    }
  }

  renderDiaChatSelection(provinceId) {
    this.selectedDiaChatId = provinceId;
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
