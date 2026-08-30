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
      houseAreaM2: 120,
      lobanRulerType: '522',
      lobanDoorWidthCm: 81,
      lobanDoorHeightCm: 212,
      lobanBedWidthCm: 160,
      lobanBedLengthCm: 200,
      lobanAltarWidthCm: 107,
      lobanAltarDepthCm: 61,
      lobanAltarHeightCm: 127,
      thienVanSon: 'Tý',
      thuyPhapHuongNha: 'Bính',
      thuyPhapThuyKhau: 'Tân',
      thuyPhapLaiThuy: 'Cấn',
      thuyPhapLoanDau: 'ngoc_doi',
      selectedBlueprintId: 'nha_bao_mientrung'
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

        <div style="display:flex; justify-content:center; gap:0.4rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.8rem; margin-bottom:1.5rem; flex-wrap:wrap;">
          <button onclick="window.toolUI.render('thiendianhan')" style="background:${this.currentToolTab === 'thiendianhan' ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${this.currentToolTab === 'thiendianhan' ? '#FBBF24' : 'rgba(255,255,255,0.1)'}; color:#FEF3C7; padding:0.35rem 0.75rem; border-radius:20px; font-weight:700; font-size:0.78rem; cursor:pointer; transition:all 0.15s ease;">
            Thiên Địa Nhân
          </button>
          <button onclick="window.toolUI.render('battrach')" style="background:${this.currentToolTab === 'battrach' ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${this.currentToolTab === 'battrach' ? '#FBBF24' : 'rgba(255,255,255,0.1)'}; color:#FEF3C7; padding:0.35rem 0.75rem; border-radius:20px; font-weight:700; font-size:0.78rem; cursor:pointer; transition:all 0.15s ease;">
            Bát Trạch
          </button>
          <button onclick="window.toolUI.render('huyenkhong')" style="background:${this.currentToolTab === 'huyenkhong' ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${this.currentToolTab === 'huyenkhong' ? '#FBBF24' : 'rgba(255,255,255,0.1)'}; color:#FEF3C7; padding:0.35rem 0.75rem; border-radius:20px; font-weight:700; font-size:0.78rem; cursor:pointer; transition:all 0.15s ease;">
            Huyền Không
          </button>
          <button onclick="window.toolUI.render('hoagiaicothu')" style="background:${this.currentToolTab === 'hoagiaicothu' ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${this.currentToolTab === 'hoagiaicothu' ? '#F59E0B' : 'rgba(255,255,255,0.1)'}; color:#FEF3C7; padding:0.35rem 0.75rem; border-radius:20px; font-weight:700; font-size:0.78rem; cursor:pointer; transition:all 0.15s ease;">
            Hóa Giải
          </button>
          <button onclick="window.toolUI.render('diachat64')" style="background:${this.currentToolTab === 'diachat64' ? 'rgba(56,189,248,0.25)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${this.currentToolTab === 'diachat64' ? '#38BDF8' : 'rgba(255,255,255,0.1)'}; color:#38BDF8; padding:0.35rem 0.75rem; border-radius:20px; font-weight:700; font-size:0.78rem; cursor:pointer; transition:all 0.15s ease;">
            Địa Chất 64
          </button>
          <button onclick="window.toolUI.render('thuyphap')" style="background:${this.currentToolTab === 'thuyphap' ? 'rgba(52,211,153,0.25)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${this.currentToolTab === 'thuyphap' ? '#34D399' : 'rgba(255,255,255,0.1)'}; color:#34D399; padding:0.35rem 0.75rem; border-radius:20px; font-weight:700; font-size:0.78rem; cursor:pointer; transition:all 0.15s ease;">
            Thủy Pháp
          </button>
          <button onclick="window.toolUI.render('loban')" style="background:${this.currentToolTab === 'loban' ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${this.currentToolTab === 'loban' ? '#FBBF24' : 'rgba(255,255,255,0.1)'}; color:#FEF3C7; padding:0.35rem 0.75rem; border-radius:20px; font-weight:700; font-size:0.78rem; cursor:pointer; transition:all 0.15s ease;">
            Thước Lỗ Ban
          </button>
          <button onclick="window.toolUI.render('thienvankymon')" style="background:${this.currentToolTab === 'thienvankymon' ? 'rgba(168,85,247,0.25)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${this.currentToolTab === 'thienvankymon' ? '#A855F7' : 'rgba(255,255,255,0.1)'}; color:#C084FC; padding:0.35rem 0.75rem; border-radius:20px; font-weight:700; font-size:0.78rem; cursor:pointer; transition:all 0.15s ease;">
            Kỳ Môn
          </button>
          <button onclick="window.toolUI.render('goiythietke')" style="background:${this.currentToolTab === 'goiythietke' ? 'rgba(56,189,248,0.25)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${this.currentToolTab === 'goiythietke' ? '#38BDF8' : 'rgba(255,255,255,0.1)'}; color:#38BDF8; padding:0.35rem 0.75rem; border-radius:20px; font-weight:700; font-size:0.78rem; cursor:pointer; transition:all 0.15s ease;">
            Gợi Ý Thiết Kế
          </button>
          <button onclick="window.toolUI.render('report')" style="background:${this.currentToolTab === 'report' ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${this.currentToolTab === 'report' ? '#FBBF24' : 'rgba(255,255,255,0.1)'}; color:#FEF3C7; padding:0.35rem 0.75rem; border-radius:20px; font-weight:700; font-size:0.78rem; cursor:pointer; transition:all 0.15s ease;">
            Báo Cáo
          </button>
        </div>

        <div id="tool-active-area">
          ${this.getToolContent(this.currentToolTab)}
        </div>
      </div>
    `;
  }

  getToolContent(tab) {
    if (tab === 'goiythietke') {
      return this.renderGoiYThietKeTool();
    } else if (tab === 'loban') {
      return this.renderLoBanTool();
    } else if (tab === 'thienvankymon') {
      return this.renderThienVanKyMonTool();
    } else if (tab === 'hoagiaicothu') {
      return this.renderHoaGiaiCoThuTab();
    } else if (tab === 'diachat64') {
      return this.renderDiaChat64Tab();
    } else if (tab === 'thiendianhan') {
      return this.renderThienDiaNhanTool();
    } else if (tab === 'battrach') {
      return this.renderBatTrachTool();
    } else if (tab === 'huyenkhong') {
      return this.renderHuyenKhongTool();
    } else if (tab === 'thuyphap') {
      return this.renderThuyPhapTool();
    } else if (tab === 'report') {
      return this.renderReportTool();
    }
    return this.renderLoBanTool();
  }

  renderThienDiaNhanTool() {
    const engine = window.thienDiaNhanEngine;
    if (!engine) return '<div>Đang nạp động cơ Thiên Địa Nhân...</div>';

    const solarProfile = engine.calculateSolarProfile(this.state.latitude);
    const windProfile = engine.evaluateWindAndStormProfile ? engine.evaluateWindAndStormProfile({
      orientation: this.state.houseDirection,
      hasAoPhong: this.state.hasAoPhong,
      hasXuyenDuongPhong: this.state.hasXuyenDuongPhong,
      hasLamDauPhong: this.state.hasLamDauPhong,
      hasCatCuocPhong: this.state.hasCatCuocPhong,
      roofType: this.state.roofType || 'mai_bon_mai',
      hasWindbreakTre: this.state.hasRearBacking,
      hasWestSouthPond: this.state.hasFrontWater
    }) : null;

    const aeroProfile = engine.evaluateBuildingAerodynamics ? engine.evaluateBuildingAerodynamics({
      windTopology: this.state.windTopology || 'dat_trong',
      roofType: this.state.roofType || 'mai_bon_mai',
      hasBufferTrees: this.state.hasBufferTrees !== undefined ? this.state.hasBufferTrees : this.state.hasRearBacking,
      hasDeflectionScreen: this.state.hasDeflectionScreen,
      hasRecessedEntry: this.state.hasRecessedEntry,
      wallCornerType: this.state.wallCornerType || 'vuong_goc'
    }) : null;
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

          
          <!-- KHẢO SÁT KHÍ ĐỘNG HỌC & CÔNG TRÌNH TRỊ BÃO -->
          <div style="background:rgba(56,189,248,0.06); border:1px solid rgba(56,189,248,0.25); border-radius:10px; padding:1.1rem; margin-bottom:1.4rem;">
            <div style="font-size:0.85rem; font-weight:800; color:#38BDF8; text-transform:uppercase; margin-bottom:0.4rem; letter-spacing:0.04em;">
              2. Khí Động Học & Địa Hình Gió Bão Thực Tế
            </div>
            <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.6rem;">
              Khảo sát hình thế khu đất và các tòa nhà lân cận:
            </div>

            <div style="margin-bottom:0.8rem;">
              <label style="display:block; font-size:0.8rem; color:#FEF3C7; font-weight:700; margin-bottom:0.25rem;">Thế Đất Khí Động Học:</label>
              <select onchange="window.toolUI.updateState('windTopology', this.value)" style="width:100%; background:#0D111A; border:1px solid rgba(56,189,248,0.3); color:#38BDF8; padding:0.5rem; border-radius:6px; font-size:0.85rem; font-weight:700;">
                <option value="dat_trong" ${(this.state.windTopology || 'dat_trong') === 'dat_trong' ? 'selected' : ''}>1. Đất Trống Trơ Trọi (Chịu 100% Gió Bão Trực Diện)</option>
                <option value="kep_hai_toa_cao" ${this.state.windTopology === 'kep_hai_toa_cao' ? 'selected' : ''}>2. Kẹp Giữa 2 Tòa Nhà Cao Tầng (Phễu Gió Hút & Gió Cuộn Thác Đổ)</option>
                <option value="dau_hem_ngaba" ${this.state.windTopology === 'dau_hem_ngaba' ? 'selected' : ''}>3. Đầu Hẻm / Đối Diện Ngã Ba Hút Gió (Thương Phong Sát)</option>
                <option value="dinh_doi_suon_doc" ${this.state.windTopology === 'dinh_doi_suon_doc' ? 'selected' : ''}>4. Đỉnh Đồi / Mép Sườn Dốc (Gió Nén Gia Tốc Cực Đại)</option>
                <option value="ven_bien_mat_nuoc" ${this.state.windTopology === 'ven_bien_mat_nuoc' ? 'selected' : ''}>5. Ven Biển / Ven Mặt Nước Lớn Mênh Mông (Hơi Muối & Triều Cường)</option>
              </select>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.6rem; margin-bottom:0.8rem;">
              <div>
                <label style="display:block; font-size:0.75rem; color:var(--text-muted); margin-bottom:0.2rem;">Kết Cấu Mái Nhà:</label>
                <select onchange="window.toolUI.updateState('roofType', this.value)" style="width:100%; background:#0D111A; border:1px solid rgba(255,255,255,0.15); color:#FEF3C7; padding:0.45rem; border-radius:6px; font-size:0.8rem;">
                  <option value="mai_bon_mai" ${(this.state.roofType || 'mai_bon_mai') === 'mai_bon_mai' ? 'selected' : ''}>Mái Bốn Mái Dốc 30°-35° (Tối ưu xẻ gió)</option>
                  <option value="mai_bang" ${this.state.roofType === 'mai_bang' ? 'selected' : ''}>Mái Bằng Bê Tông Cốt Thép</option>
                  <option value="mai_hai_mai_doc" ${this.state.roofType === 'mai_hai_mai_doc' ? 'selected' : ''}>Mái Hai Mái Dốc Đầu Hồi</option>
                  <option value="mai_ton_doc" ${this.state.roofType === 'mai_ton_doc' ? 'selected' : ''}>Mái Tôn Dốc Đơn (Dễ bốc mái)</option>
                </select>
              </div>
              <div>
                <label style="display:block; font-size:0.75rem; color:var(--text-muted); margin-bottom:0.2rem;">Hình Dáng Góc Tường:</label>
                <select onchange="window.toolUI.updateState('wallCornerType', this.value)" style="width:100%; background:#0D111A; border:1px solid rgba(255,255,255,0.15); color:#FEF3C7; padding:0.45rem; border-radius:6px; font-size:0.8rem;">
                  <option value="vat_goc_bo_tron" ${this.state.wallCornerType === 'vat_goc_bo_tron' ? 'selected' : ''}>Vát Góc / Bo Tròn (Giảm 30% lực cản)</option>
                  <option value="vuong_goc" ${(this.state.wallCornerType || 'vuong_goc') === 'vuong_goc' ? 'selected' : ''}>Góc Vuông Truyền Thống 90°</option>
                </select>
              </div>
            </div>

            <div style="font-size:0.78rem; font-weight:700; color:#FBBF24; margin-bottom:0.4rem;">Giải Pháp Kỹ Thuật Bảo Vệ:</div>
            <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.78rem; color:#FEF3C7; margin-bottom:0.3rem; cursor:pointer;">
              <input type="checkbox" ${this.state.hasBufferTrees ? 'checked' : ''} onchange="window.toolUI.updateState('hasBufferTrees', this.checked)">
              Đai Cây Xanh Phân Tầng Chắn Gió (Cách nhà 10 - 15m)
            </label>
            <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.78rem; color:#FEF3C7; margin-bottom:0.3rem; cursor:pointer;">
              <input type="checkbox" ${this.state.hasDeflectionScreen ? 'checked' : ''} onchange="window.toolUI.updateState('hasDeflectionScreen', this.checked)">
              Bình Phong / Mái Đón Sảnh Tán Khí (Chống gió cuộn Downwash)
            </label>
            <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.78rem; color:#FEF3C7; cursor:pointer;">
              <input type="checkbox" ${this.state.hasRecessedEntry ? 'checked' : ''} onchange="window.toolUI.updateState('hasRecessedEntry', this.checked)">
              Tiền Sảnh Thụt Lùi (Tạo đệm khí tĩnh chống áp lực cửa)
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
  // =========================================================================
  // =========================================================================
  // =========================================================================
  // PHÂN HỆ THƯỚC LỖ BAN TAM GIỚI (52.2cm • 42.9cm • 38.8cm) - ĐA CHIỀU
  // =========================================================================
  updateLoBanMultiDim(field, val) {
    this.state[field] = parseFloat(val) || 1;
    const container = document.getElementById('tool-active-area');
    if (container) container.innerHTML = this.getToolContent('loban');
  }

  updateLoBanRuler(type) {
    this.state.lobanRulerType = type;
    const container = document.getElementById('tool-active-area');
    if (container) container.innerHTML = this.getToolContent('loban');
  }

  setLoBanPreset(type, dims) {
    if (type === '522') {
      this.state.lobanDoorWidthCm = dims.w;
      this.state.lobanDoorHeightCm = dims.h;
    } else if (type === '429') {
      this.state.lobanBedWidthCm = dims.w;
      this.state.lobanBedLengthCm = dims.l;
    } else if (type === '388') {
      this.state.lobanAltarWidthCm = dims.w;
      this.state.lobanAltarDepthCm = dims.d;
      this.state.lobanAltarHeightCm = dims.h;
    }
    const container = document.getElementById('tool-active-area');
    if (container) container.innerHTML = this.getToolContent('loban');
  }

  renderLoBanTool() {
    const engine = (typeof window !== 'undefined' && window.loBanEngine) ? window.loBanEngine : new LoBanEngine();
    const rulerType = this.state.lobanRulerType || '522';

    let dimsToEval = [];
    let titleContext = '';
    let presetsHtml = '';

    if (rulerType === '522') {
      titleContext = 'ĐO CỬA THÔNG THỦY (BẮT BUỘC ĐO CẢ CHIỀU RỘNG VÀ CHIỀU CAO LỌT LÒNG)';
      const w = this.state.lobanDoorWidthCm || 81;
      const h = this.state.lobanDoorHeightCm || 212;
      dimsToEval = [
        { label: 'Chiều Rộng Lọt Lòng Cửa', cm: w },
        { label: 'Chiều Cao Lọt Lòng Cửa', cm: h }
      ];
      presetsHtml = `
        <span style="font-size:0.75rem; color:var(--text-muted);">Mẫu cửa chuẩn:</span>
        <button onclick="window.toolUI.setLoBanPreset('522', {w:81, h:212})" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#FEF3C7; padding:0.2rem 0.5rem; border-radius:4px; font-size:0.75rem; cursor:pointer;">81cm x 212cm (Cửa 1 cánh)</button>
        <button onclick="window.toolUI.setLoBanPreset('522', {w:69, h:197})" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#FEF3C7; padding:0.2rem 0.5rem; border-radius:4px; font-size:0.75rem; cursor:pointer;">69cm x 197cm (Cửa phòng nhỏ)</button>
        <button onclick="window.toolUI.setLoBanPreset('522', {w:87, h:215})" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#FEF3C7; padding:0.2rem 0.5rem; border-radius:4px; font-size:0.75rem; cursor:pointer;">87cm x 215cm (Cửa chính lớn)</button>
      `;
    } else if (rulerType === '429') {
      titleContext = 'ĐO GIƯỜNG NGỦ & BÀN GHẾ (ĐO PHỦ BÌ CHIỀU RỘNG VÀ CHIỀU DÀI)';
      const w = this.state.lobanBedWidthCm || 160;
      const l = this.state.lobanBedLengthCm || 200;
      dimsToEval = [
        { label: 'Chiều Rộng Phủ Bì', cm: w },
        { label: 'Chiều Dài Phủ Bì', cm: l }
      ];
      presetsHtml = `
        <span style="font-size:0.75rem; color:var(--text-muted);">Mẫu giường/bàn chuẩn:</span>
        <button onclick="window.toolUI.setLoBanPreset('429', {w:160, l:200})" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#FEF3C7; padding:0.2rem 0.5rem; border-radius:4px; font-size:0.75rem; cursor:pointer;">160cm x 200cm (Giường đôi)</button>
        <button onclick="window.toolUI.setLoBanPreset('429', {w:180, l:200})" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#FEF3C7; padding:0.2rem 0.5rem; border-radius:4px; font-size:0.75rem; cursor:pointer;">180cm x 200cm (Giường King)</button>
        <button onclick="window.toolUI.setLoBanPreset('429', {w:120, l:60})" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#FEF3C7; padding:0.2rem 0.5rem; border-radius:4px; font-size:0.75rem; cursor:pointer;">120cm x 60cm (Bàn làm việc)</button>
      `;
    } else if (rulerType === '388') {
      titleContext = 'ĐO BÀN THỜ GIA TIÊN (BẮT BUỘC ĐO CẢ 3 CHIỀU: NGANG x SÂU x CAO)';
      const w = this.state.lobanAltarWidthCm || 107;
      const d = this.state.lobanAltarDepthCm || 61;
      const h = this.state.lobanAltarHeightCm || 127;
      dimsToEval = [
        { label: 'Chiều Ngang Mặt Bàn Thờ', cm: w },
        { label: 'Chiều Sâu Mặt Bàn Thờ', cm: d },
        { label: 'Chiều Cao Bàn Thờ', cm: h }
      ];
      presetsHtml = `
        <span style="font-size:0.75rem; color:var(--text-muted);">Mẫu bàn thờ chuẩn:</span>
        <button onclick="window.toolUI.setLoBanPreset('388', {w:107, d:61, h:127})" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#FEF3C7; padding:0.2rem 0.5rem; border-radius:4px; font-size:0.75rem; cursor:pointer;">107x61x127cm (Cỡ vừa)</button>
        <button onclick="window.toolUI.setLoBanPreset('388', {w:127, d:67, h:127})" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#FEF3C7; padding:0.2rem 0.5rem; border-radius:4px; font-size:0.75rem; cursor:pointer;">127x67x127cm (Cỡ trung)</button>
        <button onclick="window.toolUI.setLoBanPreset('388', {w:153, d:69, h:127})" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#FEF3C7; padding:0.2rem 0.5rem; border-radius:4px; font-size:0.75rem; cursor:pointer;">153x69x127cm (Cỡ đại)</button>
      `;
    }

    const setEvaluation = engine.calculateSet(dimsToEval, rulerType);

    return `
      <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:1.4rem; max-width:1050px; margin:0 auto 2rem auto;">
        
        <!-- Header -->
        <div style="margin-bottom:1.2rem; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:0.8rem;">
          <div style="display:inline-block; font-size:0.75rem; font-weight:800; color:#EF4444; background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.25); padding:0.2rem 0.6rem; border-radius:4px; margin-bottom:0.3rem;">
            CỔ THƯ 《LỖ BAN TIÊN SƯ BÍ THƯ》 & 《DƯƠNG TRẠCH THẬP THƯ》
          </div>
          <h2 style="font-size:1.4rem; color:#FEF3C7; margin:0.1rem 0;">
            Thước Lỗ Ban Tam Giới
          </h2>
          <p style="font-size:0.84rem; color:var(--text-muted); margin:0;">
            Khảo chứng toán học 3 tầng thước độc lập: Thông Thủy (52.2cm) • Khối Đặc (42.9cm) • Thờ Cúng (38.8cm).
          </p>
        </div>

        <!-- HƯỚNG DẪN ĐO THỰC TẾ -->
        <div style="background:#121722; border:1px solid rgba(56,189,248,0.25); border-radius:10px; padding:0.9rem 1.1rem; margin-bottom:1.2rem;">
          <div style="font-size:0.82rem; font-weight:700; color:#38BDF8; margin-bottom:0.3rem;">
            HƯỚNG DẪN ĐO ĐẦY ĐỦ NGOÀI ĐỜI THỰC:
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.6rem; font-size:0.78rem; color:var(--text-primary); line-height:1.5;">
            <div>• <strong>Đo Cửa (Thước 52.2cm):</strong> Bắt buộc đo cả <strong>Chiều Rộng Lọt Lòng</strong> và <strong>Chiều Cao Lọt Lòng</strong> (khoảng ánh sáng đi qua, không tính khuôn gỗ).</div>
            <div>• <strong>Đo Giường/Bàn (Thước 42.9cm):</strong> Đo phủ bì cả <strong>Chiều Rộng</strong> và <strong>Chiều Dài</strong> của khối đồ gỗ.</div>
            <div>• <strong>Đo Bàn Thờ (Thước 38.8cm):</strong> Bắt buộc đo đủ cả 3 chiều: <strong>Chiều Ngang x Chiều Sâu x Chiều Cao</strong> mặt bàn thờ.</div>
          </div>
        </div>

        <!-- CHỌN 1 TRONG 3 TẦNG THƯỚC -->
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:0.6rem; margin-bottom:1.2rem;">
          <button 
            onclick="window.toolUI.updateLoBanRuler('522')"
            style="background:${rulerType === '522' ? '#EF4444' : 'rgba(255,255,255,0.03)'}; color:${rulerType === '522' ? '#FFFFFF' : 'var(--text-muted)'}; border:1px solid ${rulerType === '522' ? '#EF4444' : 'rgba(255,255,255,0.08)'}; padding:0.7rem 0.5rem; border-radius:8px; font-weight:700; font-size:0.84rem; cursor:pointer; text-align:center;"
          >
            <div>🚪 52.2 cm (Thông Thủy)</div>
            <div style="font-size:0.72rem; font-weight:400; opacity:0.9; margin-top:0.2rem;">Đo Cửa Đi, Cửa Sổ, Cổng</div>
          </button>

          <button 
            onclick="window.toolUI.updateLoBanRuler('429')"
            style="background:${rulerType === '429' ? '#3B82F6' : 'rgba(255,255,255,0.03)'}; color:${rulerType === '429' ? '#FFFFFF' : 'var(--text-muted)'}; border:1px solid ${rulerType === '429' ? '#3B82F6' : 'rgba(255,255,255,0.08)'}; padding:0.7rem 0.5rem; border-radius:8px; font-weight:700; font-size:0.84rem; cursor:pointer; text-align:center;"
          >
            <div>🛏️ 42.9 cm (Khối Đặc)</div>
            <div style="font-size:0.72rem; font-weight:400; opacity:0.9; margin-top:0.2rem;">Đo Giường, Tủ, Bàn Ghế</div>
          </button>

          <button 
            onclick="window.toolUI.updateLoBanRuler('388')"
            style="background:${rulerType === '388' ? '#F59E0B' : 'rgba(255,255,255,0.03)'}; color:${rulerType === '388' ? '#07090E' : 'var(--text-muted)'}; border:1px solid ${rulerType === '388' ? '#F59E0B' : 'rgba(255,255,255,0.08)'}; padding:0.7rem 0.5rem; border-radius:8px; font-weight:700; font-size:0.84rem; cursor:pointer; text-align:center;"
          >
            <div>🕯️ 38.8 cm (Thờ Cúng)</div>
            <div style="font-size:0.72rem; font-weight:400; opacity:0.9; margin-top:0.2rem;">Đo Bàn Thờ, Bát Hương</div>
          </button>
        </div>

        <!-- KHUNG NHẬP ĐA CHIỀU (RỘNG x CAO HOẶC RỘNG x SÂU x CAO) -->
        <div style="background:#121722; border:1.5px solid rgba(251,191,36,0.35); border-radius:10px; padding:1.1rem; margin-bottom:1.2rem;">
          <div style="font-size:0.85rem; font-weight:800; color:#FBBF24; margin-bottom:0.6rem;">
            ${titleContext}
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:0.8rem; margin-bottom:0.8rem;">
            ${rulerType === '522' ? `
              <div>
                <label style="display:block; font-size:0.8rem; color:#FEF3C7; margin-bottom:0.25rem; font-weight:700;">1. Chiều Rộng Lọt Lòng (cm):</label>
                <input 
                  type="number" step="0.1" min="1" max="1000"
                  value="${this.state.lobanDoorWidthCm || 81}"
                  oninput="window.toolUI.updateLoBanMultiDim('lobanDoorWidthCm', this.value)"
                  style="width:100%; background:#07090E; border:1px solid rgba(255,255,255,0.2); color:#FEF3C7; padding:0.6rem 0.8rem; border-radius:8px; font-size:16px !important; font-weight:800; box-sizing:border-box; outline:none;"
                />
              </div>
              <div>
                <label style="display:block; font-size:0.8rem; color:#FEF3C7; margin-bottom:0.25rem; font-weight:700;">2. Chiều Cao Lọt Lòng (cm):</label>
                <input 
                  type="number" step="0.1" min="1" max="1000"
                  value="${this.state.lobanDoorHeightCm || 212}"
                  oninput="window.toolUI.updateLoBanMultiDim('lobanDoorHeightCm', this.value)"
                  style="width:100%; background:#07090E; border:1px solid rgba(255,255,255,0.2); color:#FEF3C7; padding:0.6rem 0.8rem; border-radius:8px; font-size:16px !important; font-weight:800; box-sizing:border-box; outline:none;"
                />
              </div>
            ` : (rulerType === '429' ? `
              <div>
                <label style="display:block; font-size:0.8rem; color:#FEF3C7; margin-bottom:0.25rem; font-weight:700;">1. Chiều Rộng Phủ Bì (cm):</label>
                <input 
                  type="number" step="0.1" min="1" max="1000"
                  value="${this.state.lobanBedWidthCm || 160}"
                  oninput="window.toolUI.updateLoBanMultiDim('lobanBedWidthCm', this.value)"
                  style="width:100%; background:#07090E; border:1px solid rgba(255,255,255,0.2); color:#FEF3C7; padding:0.6rem 0.8rem; border-radius:8px; font-size:16px !important; font-weight:800; box-sizing:border-box; outline:none;"
                />
              </div>
              <div>
                <label style="display:block; font-size:0.8rem; color:#FEF3C7; margin-bottom:0.25rem; font-weight:700;">2. Chiều Dài Phủ Bì (cm):</label>
                <input 
                  type="number" step="0.1" min="1" max="1000"
                  value="${this.state.lobanBedLengthCm || 200}"
                  oninput="window.toolUI.updateLoBanMultiDim('lobanBedLengthCm', this.value)"
                  style="width:100%; background:#07090E; border:1px solid rgba(255,255,255,0.2); color:#FEF3C7; padding:0.6rem 0.8rem; border-radius:8px; font-size:16px !important; font-weight:800; box-sizing:border-box; outline:none;"
                />
              </div>
            ` : `
              <div>
                <label style="display:block; font-size:0.8rem; color:#FEF3C7; margin-bottom:0.25rem; font-weight:700;">1. Chiều Ngang Bàn Thờ (cm):</label>
                <input 
                  type="number" step="0.1" min="1" max="1000"
                  value="${this.state.lobanAltarWidthCm || 107}"
                  oninput="window.toolUI.updateLoBanMultiDim('lobanAltarWidthCm', this.value)"
                  style="width:100%; background:#07090E; border:1px solid rgba(255,255,255,0.2); color:#FEF3C7; padding:0.6rem 0.8rem; border-radius:8px; font-size:16px !important; font-weight:800; box-sizing:border-box; outline:none;"
                />
              </div>
              <div>
                <label style="display:block; font-size:0.8rem; color:#FEF3C7; margin-bottom:0.25rem; font-weight:700;">2. Chiều Sâu Bàn Thờ (cm):</label>
                <input 
                  type="number" step="0.1" min="1" max="1000"
                  value="${this.state.lobanAltarDepthCm || 61}"
                  oninput="window.toolUI.updateLoBanMultiDim('lobanAltarDepthCm', this.value)"
                  style="width:100%; background:#07090E; border:1px solid rgba(255,255,255,0.2); color:#FEF3C7; padding:0.6rem 0.8rem; border-radius:8px; font-size:16px !important; font-weight:800; box-sizing:border-box; outline:none;"
                />
              </div>
              <div>
                <label style="display:block; font-size:0.8rem; color:#FEF3C7; margin-bottom:0.25rem; font-weight:700;">3. Chiều Cao Bàn Thờ (cm):</label>
                <input 
                  type="number" step="0.1" min="1" max="1000"
                  value="${this.state.lobanAltarHeightCm || 127}"
                  oninput="window.toolUI.updateLoBanMultiDim('lobanAltarHeightCm', this.value)"
                  style="width:100%; background:#07090E; border:1px solid rgba(255,255,255,0.2); color:#FEF3C7; padding:0.6rem 0.8rem; border-radius:8px; font-size:16px !important; font-weight:800; box-sizing:border-box; outline:none;"
                />
              </div>
            `)}
          </div>

          <!-- Mẫu Chọn Nhanh -->
          <div style="display:flex; gap:0.4rem; flex-wrap:wrap; align-items:center;">
            ${presetsHtml}
          </div>
        </div>

        <!-- HỘP ĐÁNH GIÁ TỔNG QUAN SONG CÁT / TAM CÁT -->
        <div style="background:${setEvaluation.isAllGood ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)'}; border:1.5px solid ${setEvaluation.isAllGood ? '#10B981' : '#EF4444'}; border-radius:10px; padding:1.2rem; margin-bottom:1.4rem;">
          <div style="font-size:0.85rem; font-weight:800; color:${setEvaluation.isAllGood ? '#34D399' : '#F87171'}; margin-bottom:0.6rem; letter-spacing:0.04em;">
            ${setEvaluation.verdictTitle}
          </div>

          <!-- Lưới Kết Quả Chi Tiết Từng Chiều -->
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.8rem;">
            ${setEvaluation.results.map(r => `
              <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.06); border-top:3px solid ${r.calc.isGood ? '#34D399' : '#F87171'}; padding:0.85rem; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.3rem;">
                  <span style="font-size:0.8rem; color:var(--text-muted); font-weight:700;">${r.label}:</span>
                  <span style="font-size:0.95rem; font-weight:800; color:#FEF3C7;">${r.cm} cm</span>
                </div>
                <div style="font-size:1.05rem; font-weight:800; color:#FEF3C7; margin-bottom:0.3rem;">
                  Cung ${r.calc.majorName} — <span style="color:${r.calc.isGood ? '#34D399' : '#F87171'};">${r.calc.minorName}</span>
                  <span style="font-size:0.7rem; font-weight:700; padding:0.1rem 0.4rem; border-radius:3px; background:${r.calc.isGood ? 'rgba(52,211,153,0.15)' : 'rgba(248,113,113,0.15)'}; color:${r.calc.isGood ? '#34D399' : '#F87171'}; margin-left:0.3rem;">
                    ${r.calc.isGood ? 'CUNG ĐỎ CÁT' : 'CUNG ĐEN HUNG'}
                  </span>
                </div>
                <div style="font-size:0.78rem; color:var(--text-primary); line-height:1.45; margin-bottom:0.4rem;">
                  ${r.calc.meaning}
                </div>
                <div style="font-size:0.75rem; color:#93C5FD; line-height:1.45; background:rgba(255,255,255,0.02); padding:0.4rem 0.5rem; border-radius:4px; margin-bottom:0.4rem;">
                  ${r.calc.whyGoodOrBad}
                </div>
                ${!r.calc.isGood && r.calc.suggestedGoodDimensions && r.calc.suggestedGoodDimensions.length > 0 ? `
                  <div style="font-size:0.75rem; color:#FDE68A; background:rgba(251,191,36,0.08); border-left:2px solid #FBBF24; padding:0.3rem 0.5rem;">
                    <strong>Gợi ý chỉnh:</strong> ${r.calc.suggestedGoodDimensions.map(s => `${s.cm}cm (${s.name})`).join(' hoặc ')}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>

          <div style="margin-top:0.8rem; font-size:0.75rem; color:var(--text-muted); border-top:1px dashed rgba(255,255,255,0.08); padding-top:0.6rem;">
            <strong>Thư tịch khảo chứng:</strong> ${engine.ruler522.classicalSource}
          </div>
        </div>

        <!-- BẢNG KÍCH THƯỚC VÀNG CHUẨN CỔ THƯ -->
        <div style="background:#121722; border:1px solid rgba(255,255,255,0.06); border-radius:10px; padding:1.1rem;">
          <div style="font-size:0.82rem; font-weight:800; color:#FBBF24; margin-bottom:0.8rem;">
            BẢNG KÍCH THƯỚC VÀNG THÔNG DỤNG (KIẾN TRÚC SƯ TIN DÙNG):
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.9rem;">
            ${engine.goldenDimensions.map(cat => `
              <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.06); padding:0.8rem; border-radius:6px;">
                <div style="font-size:0.8rem; font-weight:700; color:#38BDF8; margin-bottom:0.4rem;">${cat.category}</div>
                ${cat.items.map(it => `
                  <div style="font-size:0.76rem; color:var(--text-primary); line-height:1.45; margin-bottom:0.35rem; border-bottom:1px dashed rgba(255,255,255,0.04); padding-bottom:0.25rem;">
                    <div>• <strong>${it.width}</strong> ${it.depth ? 'x ' + it.depth : ''} x <strong>${it.height}</strong></div>
                    <div style="color:var(--text-muted); font-size:0.72rem;">${it.note}</div>
                  </div>
                `).join('')}
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  }

  // =========================================================================
  // PHÂN HỆ THÁI DƯƠNG ĐÁO HƯỚNG & KỲ MÔN TRẠCH THUẬT
  // =========================================================================
  updateThienVanSon(son) {
    this.state.thienVanSon = son;
    const container = document.getElementById('tool-active-area');
    if (container) container.innerHTML = this.getToolContent('thienvankymon');
  }

  renderThienVanKyMonTool() {
    const engine = (typeof window !== 'undefined' && window.thienVanKyMonEngine) ? window.thienVanKyMonEngine : new ThienVanKyMonEngine();
    const selectedSon = this.state.thienVanSon || 'Tý';
    const thaiDuongData = engine.lookupThaiDuong(selectedSon);

    return `
      <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:1.4rem; max-width:1050px; margin:0 auto 2rem auto;">
        
        <!-- Header -->
        <div style="margin-bottom:1.2rem; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:0.8rem;">
          <div style="display:inline-block; font-size:0.75rem; font-weight:800; color:#A855F7; background:rgba(168,85,247,0.1); border:1px solid rgba(168,85,247,0.25); padding:0.2rem 0.6rem; border-radius:4px; margin-bottom:0.3rem;">
            CỔ THƯ 《HIỆP KỶ BIỆN PHƯƠNG THƯ》 & 《KỲ MÔN ĐỘN GIÁP》
          </div>
          <h2 style="font-size:1.4rem; color:#FEF3C7; margin:0.1rem 0;">
            Thái Dương & Kỳ Môn Trạch
          </h2>
          <p style="font-size:0.84rem; color:var(--text-muted); margin:0;">
            Tra cứu ngày giờ hoàng kim Thái Dương Đáo Hướng hóa sát và Bát Môn Nạp Khí Kỳ Môn.
          </p>
        </div>

        <!-- HƯỚNG DẪN SỬ DỤNG (ĐÃ SỬA LỖI MŨI TÊN HOÀN TOÀN) -->
        <div style="background:#121722; border:1px solid rgba(168,85,247,0.25); border-radius:10px; padding:0.9rem 1.1rem; margin-bottom:1.2rem;">
          <div style="font-size:0.82rem; font-weight:700; color:#C084FC; margin-bottom:0.3rem;">
            HƯỚNG DẪN TRA CỨU THỰC TẾ:
          </div>
          <div style="font-size:0.78rem; color:var(--text-primary); line-height:1.55;">
            • <strong>Thái Dương Đáo Sơn (Tọa):</strong> Ngày Mặt Trời chiếu thẳng vào lưng nhà → Hóa giải 100 loại hung sát, vượng nhân đinh.<br/>
            • <strong>Thái Dương Đáo Hướng:</strong> Ngày Mặt Trời chiếu thẳng vào mặt tiền nhà → Đại vượng tài lộc, thời điểm vàng khởi công tu tạo.<br/>
            • <strong>Kỳ Môn Bát Môn:</strong> Mở Cửa chính hoặc phòng làm việc tại <strong>Sinh Môn, Khai Môn, Hưu Môn</strong> để nạp trọn sinh khí.
          </div>
        </div>

        <!-- CHỌN 1 TRONG 24 SƠN HƯỚNG -->
        <div style="background:#121722; border:1.5px solid rgba(168,85,247,0.35); border-radius:10px; padding:1rem; margin-bottom:1.2rem;">
          <label style="display:block; font-size:0.85rem; font-weight:800; color:#FEF3C7; margin-bottom:0.4rem;">
            Chọn Tọa Nhà Của Bạn Trong 24 Sơn Hướng:
          </label>
          <select 
            onchange="window.toolUI.updateThienVanSon(this.value)"
            style="width:100%; background:#07090E; border:1px solid rgba(255,255,255,0.18); color:#FEF3C7; padding:0.65rem 0.9rem; border-radius:8px; font-size:16px !important; font-weight:600; cursor:pointer; outline:none;"
          >
            ${engine.thaiDuong24Son.map(s => `
              <option value="${s.son}" ${s.son === selectedSon ? 'selected' : ''}>
                Sơn ${s.son} (${s.degree})
              </option>
            `).join('')}
          </select>
        </div>

        <!-- HỘP THÔNG TIN THÁI DƯƠNG ĐÁO HƯỚNG CHI TIẾT KÈM GIẢI TRÌNH QUANG HỌC -->
        <div style="background:#121722; border:1px solid rgba(255,255,255,0.06); border-radius:10px; padding:1.2rem; margin-bottom:1.2rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:0.6rem; flex-wrap:wrap; gap:0.5rem;">
            <div style="font-size:1.1rem; font-weight:800; color:#FEF3C7;">
              Nhà Tọa Sơn ${thaiDuongData.son} — Độ Số: ${thaiDuongData.degree}
            </div>
            <span style="font-size:0.75rem; font-weight:700; color:#FBBF24; background:rgba(251,191,36,0.12); padding:0.2rem 0.6rem; border-radius:4px;">
              THÁI DƯƠNG QUANG CHIẾU
            </span>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.8rem; margin-bottom:0.8rem;">
            <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.06); border-left:3px solid #38BDF8; padding:0.8rem; border-radius:0 6px 6px 0;">
              <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.2rem;">Tiết Khí Thái Dương Đáo Sơn (Tọa):</div>
              <div style="font-size:1rem; font-weight:800; color:#38BDF8;">${thaiDuongData.tietKhiDaoSon}</div>
              <div style="font-size:0.72rem; color:var(--text-muted); margin-top:0.2rem;">Mặt trời chiếu lưng nhà: Hóa giải sát khí, vượng đinh.</div>
            </div>

            <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.06); border-left:3px solid #F59E0B; padding:0.8rem; border-radius:0 6px 6px 0;">
              <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.2rem;">Tiết Khí Thái Dương Đáo Hướng:</div>
              <div style="font-size:1rem; font-weight:800; color:#F59E0B;">${thaiDuongData.tietKhiDaoHuong}</div>
              <div style="font-size:0.72rem; color:var(--text-muted); margin-top:0.2rem;">Mặt trời chiếu mặt tiền: Đại vượng tài lộc, phát triển.</div>
            </div>
          </div>

          <div style="background:rgba(255,255,255,0.02); border-left:3px solid #FBBF24; padding:0.7rem 0.85rem; border-radius:0 6px 6px 0; font-size:0.8rem; color:#FEF3C7; line-height:1.55; margin-bottom:0.6rem;">
            ${thaiDuongData.whyGood}
          </div>

          <div style="font-size:0.75rem; color:var(--text-muted);">
            <strong>Thư tịch gốc:</strong> ${engine.classicalSource}
          </div>
        </div>

        <!-- BẢNG KỲ MÔN BÁT MÔN NẠP KHÍ KÈM NGUYÊN NHÂN TỐT / XẤU -->
        <div style="background:#121722; border:1px solid rgba(255,255,255,0.06); border-radius:10px; padding:1.1rem;">
          <div style="font-size:0.82rem; font-weight:800; color:#FEF3C7; margin-bottom:0.8rem;">
            QUY TẮC NẠP KHÍ KỲ MÔN ĐỘN GIÁP (BÁT MÔN TRẠCH THUẬT):
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.7rem;">
            ${engine.kyMonBatMon.map(m => `
              <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.06); border-top:2px solid ${m.nature === 'ĐẠI CÁT' ? '#34D399' : (m.nature === 'TRUNG BÌNH' ? '#38BDF8' : '#EF4444')}; padding:0.8rem; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.3rem;">
                  <span style="font-size:0.85rem; font-weight:800; color:#FEF3C7;">${m.mon} (${m.element})</span>
                  <span style="font-size:0.7rem; font-weight:700; color:${m.nature === 'ĐẠI CÁT' ? '#34D399' : (m.nature === 'TRUNG BÌNH' ? '#38BDF8' : '#F87171')};">${m.nature}</span>
                </div>
                <div style="font-size:0.76rem; color:var(--text-muted); line-height:1.45; margin-bottom:0.4rem;">${m.usage}</div>
                <div style="font-size:0.73rem; color:#93C5FD; line-height:1.4; background:rgba(255,255,255,0.02); padding:0.35rem 0.5rem; border-radius:4px;">
                  ${m.whyGoodOrBad}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  }

    // PHÂN HỆ THƯ TỊCH HÓA GIẢI & PHÁP TRỊ TRẠCH PHÁP (21 PHÁP HÓA GIẢI)
  // =========================================================================
  selectHoaGiaiProfile(id) {
    this.selectedHoaGiaiId = id;
    const container = document.getElementById('tool-active-area');
    if (container) {
      container.innerHTML = this.getToolContent('hoagiaicothu');
    }
  }

  renderHoaGiaiCoThuTab() {
    const corpus = (typeof KHO_HOA_GIAI_CO_THU_CORPUS !== 'undefined') ? KHO_HOA_GIAI_CO_THU_CORPUS : [];
    if (!corpus || corpus.length === 0) {
      return '<div style="padding:2rem; text-align:center; color:var(--text-muted);">Đang nạp cơ sở dữ liệu Kho Thư Tịch Hóa Giải Cổ...</div>';
    }

    const currentId = this.selectedHoaGiaiId || corpus[0].ma_dinh_danh;
    let currentItem = corpus.find(item => item.ma_dinh_danh === currentId) || corpus[0];
    const currentIndex = corpus.findIndex(item => item.ma_dinh_danh === currentItem.ma_dinh_danh);

    const isDirect = currentItem.cap_do_bang_chung === 'CHUNG_CU_TRUC_TIEP_CO_THU';
    const badgeText = isDirect ? 'CHÍNH VĂN CỔ THƯ' : 'NGOẠI SUY HỢP LỆ';
    const badgeColor = isDirect ? '#34D399' : '#FBBF24';

    let remedyTypeLabel = 'CẢI BIẾN KIẾN TRÚC';
    if (currentItem.loai_phap_tri === 'PHAP_TRI_MOI_TRUONG') remedyTypeLabel = 'MÔI TRƯỜNG & HÌNH THẾ';
    else if (currentItem.loai_phap_tri === 'VAT_PHAM_PHONG_THUY_CO') remedyTypeLabel = 'VẬT PHẨM CỔ TRUYỀN';
    else if (currentItem.loai_phap_tri === 'NGHI_LE_PHU_CHU_CO') remedyTypeLabel = 'PHÙ CHÚ NGHI LỄ';

    return `
      <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:1.2rem; max-width:1050px; margin:0 auto 2rem auto;">
        
        <!-- Header Thanh Nhã -->
        <div style="margin-bottom:1.2rem; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:0.8rem;">
          <h2 style="font-size:1.35rem; color:#FEF3C7; margin:0 0 0.2rem 0;">
            Thư Tịch Hóa Giải
          </h2>
          <p style="font-size:0.84rem; color:var(--text-muted); margin:0;">
            Khảo chứng nguyên văn chữ Hán, dịch nghĩa học thuật và pháp trị kiến trúc chuẩn mực.
          </p>
        </div>

        <!-- KHUNG CHỌN DUY NHẤT: 21 PHÁP HÓA GIẢI (CÓ VIỀN KHUNG GỌN GÀNG, KHÔNG ZOOM GIẬT) -->
        <div style="background:#121722; border:1.5px solid rgba(251,191,36,0.35); border-radius:10px; padding:0.9rem 1rem; margin-bottom:1.2rem;">
          <label style="display:block; font-size:0.85rem; font-weight:800; color:#FBBF24; margin-bottom:0.4rem; letter-spacing:0.02em;">
            21 Pháp Hóa Giải (Bấm chọn để xem chi tiết):
          </label>
          <select 
            onchange="window.toolUI.selectHoaGiaiProfile(this.value)"
            style="width:100%; background:#07090E; border:1px solid rgba(255,255,255,0.18); color:#FEF3C7; padding:0.65rem 0.9rem; border-radius:8px; font-size:16px !important; font-weight:600; cursor:pointer; outline:none; box-sizing:border-box;"
          >
            ${corpus.map((item, idx) => `
              <option value="${item.ma_dinh_danh}" ${item.ma_dinh_danh === currentItem.ma_dinh_danh ? 'selected' : ''}>
                ${String(idx + 1).padStart(2, '0')}. ${item.ten_ngan || item.ten_thuan_viet}
              </option>
            `).join('')}
          </select>
        </div>

        <!-- THẺ CHI TIẾT HỒ SƠ ĐANG CHỌN (TRÌNH BÀY THANH LỊCH, MÀU DỊU MẮT) -->
        <div style="background:#121722; border:1px solid rgba(255,255,255,0.06); border-radius:10px; padding:1.2rem;">
          
          <!-- Tiêu Đề Hồ Sơ -->
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1rem; flex-wrap:wrap; gap:0.6rem; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:0.8rem;">
            <div>
              <div style="display:flex; align-items:center; gap:0.4rem; margin-bottom:0.3rem;">
                <span style="font-size:0.72rem; font-weight:800; color:${badgeColor}; background:rgba(255,255,255,0.05); border:1px solid ${badgeColor}40; padding:0.15rem 0.5rem; border-radius:4px;">
                  ${badgeText}
                </span>
                <span style="font-size:0.72rem; font-weight:600; color:#94A3B8; background:rgba(255,255,255,0.03); padding:0.15rem 0.5rem; border-radius:4px;">
                  ${remedyTypeLabel}
                </span>
                <span style="font-size:0.72rem; font-weight:700; color:#FBBF24;">
                  Hồ Sơ ${currentIndex + 1}
                </span>
              </div>
              <h3 style="font-size:1.2rem; color:#FEF3C7; margin:0.2rem 0 0.1rem 0;">
                ${currentItem.ten_thuan_viet}
              </h3>
              <div style="font-size:0.88rem; color:#FDE68A; font-family:'Ma Shan Zheng', var(--font-title);">
                ${currentItem.ten_chu_han}
              </div>
            </div>
          </div>

          <!-- Giải trình bằng chứng -->
          <div style="background:rgba(255,255,255,0.02); border-left:3px solid #38BDF8; padding:0.6rem 0.85rem; border-radius:0 6px 6px 0; font-size:0.82rem; color:var(--text-primary); line-height:1.55; margin-bottom:1.2rem;">
            <strong style="color:#38BDF8;">Giải trình bằng chứng:</strong> ${currentItem.giai_trinh_bang_chung}
          </div>

          <!-- Thư tịch cổ khảo chứng -->
          <div style="background:rgba(0,0,0,0.25); border:1px solid rgba(255,255,255,0.06); padding:1rem 1.1rem; border-radius:8px; margin-bottom:1.2rem;">
            <div style="font-size:0.75rem; font-weight:800; color:#FBBF24; margin-bottom:0.6rem; letter-spacing:0.04em;">
              THƯ TỊCH KHẢO CHỨNG:
            </div>
            ${currentItem.thu_tich_khao_chung.map(s => `
              <div style="margin-bottom:0.8rem; border-bottom:1px dashed rgba(255,255,255,0.06); padding-bottom:0.6rem;">
                <div style="font-weight:700; color:#FEF3C7; font-size:0.88rem;">${s.tac_pham} — ${s.quyen_muc} (${s.tac_gia})</div>
                <div style="font-size:0.95rem; color:#FDE68A; font-family:'Ma Shan Zheng', var(--font-title); margin:0.25rem 0; line-height:1.5;">${s.nguyen_van_chu_han}</div>
                <div style="font-size:0.82rem; color:var(--text-primary); line-height:1.55;"><strong style="color:#E2E8F0;">Dịch nghĩa:</strong> ${s.dich_nghia_thuan_viet}</div>
                <div style="font-size:0.8rem; color:#93C5FD; margin-top:0.25rem;"><strong style="color:#60A5FA;">Diễn giải học thuật:</strong> ${s.dien_giai_hoc_thuat}</div>
              </div>
            `).join('')}
          </div>

          <!-- Lưới 3 Khối Thông Tin Trầm Ấm -->
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.9rem; margin-bottom:1.2rem;">
            
            <!-- Khối 1: Sát Khí & Nguyên Nhân -->
            <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.06); border-top:2px solid #F87171; padding:0.85rem; border-radius:6px;">
              <h4 style="font-size:0.82rem; color:#F87171; margin:0 0 0.35rem 0; font-weight:700;">BẢN CHẤT SÁT KHÍ</h4>
              <div style="font-size:0.84rem; color:#FEF3C7; font-weight:700; margin-bottom:0.3rem;">${currentItem.sat_khi_va_khuyet_ham.ten_sat_khi}</div>
              <div style="font-size:0.8rem; color:var(--text-muted); line-height:1.5; margin-bottom:0.4rem;"><strong>Nguyên nhân:</strong> ${currentItem.sat_khi_va_khuyet_ham.nguyen_nhan_hinh_thanh}</div>
              <div style="font-size:0.78rem; color:#FCA5A5; line-height:1.45;"><strong>Hậu quả cổ thư:</strong> ${currentItem.sat_khi_va_khuyet_ham.hau_qua_co_thu_ghi}</div>
            </div>

            <!-- Khối 2: Phương Pháp Hóa Giải -->
            <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.06); border-top:2px solid #38BDF8; padding:0.85rem; border-radius:6px;">
              <h4 style="font-size:0.82rem; color:#38BDF8; margin:0 0 0.35rem 0; font-weight:700;">PHƯƠNG PHÁP HÓA GIẢI</h4>
              <div style="font-size:0.8rem; color:var(--text-primary); line-height:1.5; margin-bottom:0.4rem;"><strong>Kiến trúc:</strong> ${currentItem.phap_tri_kien_truc_va_vat_the.cai_bien_kien_truc}</div>
              <div style="font-size:0.8rem; color:var(--text-muted); line-height:1.5;"><strong>Môi trường:</strong> ${currentItem.phap_tri_kien_truc_va_vat_the.cai_bien_moi_truong}</div>
            </div>

            <!-- Khối 3: Quy Chuẩn Bố Trí -->
            <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.06); border-top:2px solid #34D399; padding:0.85rem; border-radius:6px;">
              <h4 style="font-size:0.82rem; color:#34D399; margin:0 0 0.35rem 0; font-weight:700;">QUY CHUẨN BỐ TRÍ</h4>
              <div style="font-size:0.8rem; color:var(--text-primary); line-height:1.5; margin-bottom:0.4rem;"><strong>Vị trí đặt:</strong> ${currentItem.phap_tri_kien_truc_va_vat_the.ung_dung_be_ca_hien_dai.vi_tri_dat_chuan}</div>
              <div style="font-size:0.8rem; color:var(--text-muted); line-height:1.5;"><strong>Quy cách:</strong> ${currentItem.phap_tri_kien_truc_va_vat_the.ung_dung_be_ca_hien_dai.quy_cach_kich_thuoc}</div>
            </div>

          </div>

          <!-- Lưới 2 Cột: Điều Kiện Bắt Buộc & Điều Cấm Kỵ -->
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.9rem; margin-bottom:1rem;">
            
            <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.06); border-left:3px solid #34D399; padding:0.85rem; border-radius:0 6px 6px 0;">
              <div style="font-size:0.78rem; font-weight:700; color:#34D399; margin-bottom:0.4rem;">ĐIỀU KIỆN BẮT BUỘC:</div>
              <ul style="margin:0; padding-left:1.2rem; font-size:0.78rem; color:var(--text-primary); line-height:1.55;">
                ${currentItem.dieu_kien_bat_buoc.map(d => `<li style="margin-bottom:0.25rem;">${d}</li>`).join('')}
              </ul>
            </div>

            <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.06); border-left:3px solid #F87171; padding:0.85rem; border-radius:0 6px 6px 0;">
              <div style="font-size:0.78rem; font-weight:700; color:#F87171; margin-bottom:0.4rem;">ĐIỀU CẤM KỴ TUYỆT ĐỐI:</div>
              <ul style="margin:0; padding-left:1.2rem; font-size:0.78rem; color:var(--text-primary); line-height:1.55;">
                ${currentItem.dieu_kien_cam_ky_tuyet_doi.map(c => `<li style="margin-bottom:0.25rem;">${c}</li>`).join('')}
              </ul>
            </div>

          </div>

          <!-- Hậu quả sai phạm -->
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:0.75rem 0.9rem; border-radius:6px; font-size:0.78rem; color:var(--text-muted); line-height:1.5; margin-bottom:0.9rem;">
            <strong style="color:#FEF3C7;">Hậu quả khi làm sai:</strong> 
            ${currentItem.cac_che_do_sai_pham_va_hau_qua.sai_phuong_vi ? `Sai hướng: ${currentItem.cac_che_do_sai_pham_va_hau_qua.sai_phuong_vi} • ` : ''}
            ${currentItem.cac_che_do_sai_pham_va_hau_qua.sai_quy_mo ? `Sai quy mô: ${currentItem.cac_che_do_sai_pham_va_hau_qua.sai_quy_mo} • ` : ''}
            ${currentItem.cac_che_do_sai_pham_va_hau_qua.sai_thoi_van ? `Sai thời vận: ${currentItem.cac_che_do_sai_pham_va_hau_qua.sai_thoi_van} • ` : ''}
            ${currentItem.cac_che_do_sai_pham_va_hau_qua.bo_be_o_nhiem ? `Bỏ bê ô nhiễm: ${currentItem.cac_che_do_sai_pham_va_hau_qua.bo_be_o_nhiem}` : ''}
          </div>

          <!-- Khảo Luận LapQue -->
          <div style="background:rgba(251,191,36,0.04); border:1px solid rgba(251,191,36,0.2); padding:0.75rem 0.9rem; border-radius:6px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; font-size:0.8rem;">
            <div style="color:#FEF3C7; max-width:800px; line-height:1.45;">
              <strong style="color:#FBBF24;">Khảo luận LapQue:</strong> ${currentItem.danh_gia_lapque.ket_luan}
            </div>
            <span style="font-weight:700; color:#34D399; background:rgba(52,211,153,0.1); padding:0.2rem 0.6rem; border-radius:12px; font-size:0.75rem;">
              Độ tin cậy: ${(currentItem.danh_gia_lapque.do_tin_cay * 100).toFixed(0)}%
            </span>
          </div>

        </div>

      </div>
    `;
  }

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


  setThuyPhapState(key, value) {
    this.state[key] = value;
    const activeArea = document.getElementById('tool-active-area');
    if (activeArea && this.currentToolTab === 'thuyphap') {
      activeArea.innerHTML = this.renderThuyPhapTool();
    }
  }

  calculateThuyPhap(huongNha, thuyKhau, laiThuy, loanDau) {
    // 24 Sơn to Song Sơn mapping
    const songSonMap = {
      'Nhâm': 'Nhâm-Tý', 'Tý': 'Nhâm-Tý',
      'Quý': 'Quý-Sửu', 'Sửu': 'Quý-Sửu',
      'Cấn': 'Cấn-Dần', 'Dần': 'Cấn-Dần',
      'Giáp': 'Giáp-Mão', 'Mão': 'Giáp-Mão',
      'Ất': 'Ất-Thìn', 'Thìn': 'Ất-Thìn',
      'Tốn': 'Tốn-Tỵ', 'Tỵ': 'Tốn-Tỵ',
      'Bính': 'Bính-Ngọ', 'Ngọ': 'Bính-Ngọ',
      'Đinh': 'Đinh-Mùi', 'Mùi': 'Đinh-Mùi',
      'Khôn': 'Khôn-Thân', 'Thân': 'Khôn-Thân',
      'Canh': 'Canh-Dậu', 'Dậu': 'Canh-Dậu',
      'Tân': 'Tân-Tuất', 'Tuất': 'Tân-Tuất',
      'Càn': 'Càn-Hợi', 'Hợi': 'Càn-Hợi'
    };

    const ssHuong = songSonMap[huongNha] || 'Bính-Ngọ';
    const ssKhau = songSonMap[thuyKhau] || 'Tân-Tuất';
    const ssLai = songSonMap[laiThuy] || 'Cấn-Dần';

    // Xác định Cục dựa vào Thủy Khẩu
    let cucName = 'HỎA CỤC (Dần - Ngọ - Tuất)';
    let cucKey = 'hoa';
    let cucElement = 'Hỏa';
    let classicSource = 'Cấn Bính Tân vị vị thị Liêm Trinh (Thanh Nang Áo Ngữ)';

    if (ssKhau === 'Ất-Thìn' || ssKhau === 'Tốn-Tỵ' || thuyKhau === 'Ất' || thuyKhau === 'Thìn') {
      cucName = 'THỦY CỤC (Thân - Tý - Thìn)';
      cucKey = 'thuy';
      cucElement = 'Thủy';
      classicSource = 'Khôn Nhâm Ất Cự Môn tòng đầu xuất (Thanh Nang Áo Ngữ)';
    } else if (ssKhau === 'Quý-Sửu' || ssKhau === 'Cấn-Dần' || thuyKhau === 'Quý' || thuyKhau === 'Sửu') {
      cucName = 'KIM CỤC (Tỵ - Dậu - Sửu)';
      cucKey = 'kim';
      cucElement = 'Kim';
      classicSource = 'Tốn Canh Quý vị vị thị Vũ Khúc (Thanh Nang Áo Ngữ)';
    } else if (ssKhau === 'Đinh-Mùi' || ssKhau === 'Khôn-Thân' || thuyKhau === 'Đinh' || thuyKhau === 'Mùi') {
      cucName = 'MỘC CỤC (Hợi - Mão - Mùi)';
      cucKey = 'moc';
      cucElement = 'Mộc';
      classicSource = 'Càn Giáp Đinh Tham Lang nhất lộ hành (Thanh Nang Áo Ngữ)';
    }

    // 12 Cung Trường Sinh sequences
    const stagesSeq = ['Trường Sinh', 'Mộc Dục', 'Quan Đới', 'Lâm Quan', 'Đế Vượng', 'Suy', 'Bệnh', 'Tử', 'Mộ Khố', 'Tuyệt', 'Thai', 'Dưỡng'];

    const cucTables = {
      hoa: ['Cấn-Dần', 'Giáp-Mão', 'Ất-Thìn', 'Tốn-Tỵ', 'Bính-Ngọ', 'Đinh-Mùi', 'Khôn-Thân', 'Canh-Dậu', 'Tân-Tuất', 'Càn-Hợi', 'Nhâm-Tý', 'Quý-Sửu'],
      thuy: ['Khôn-Thân', 'Canh-Dậu', 'Tân-Tuất', 'Càn-Hợi', 'Nhâm-Tý', 'Quý-Sửu', 'Cấn-Dần', 'Giáp-Mão', 'Ất-Thìn', 'Tốn-Tỵ', 'Bính-Ngọ', 'Đinh-Mùi'],
      kim: ['Tốn-Tỵ', 'Bính-Ngọ', 'Đinh-Mùi', 'Khôn-Thân', 'Canh-Dậu', 'Tân-Tuất', 'Càn-Hợi', 'Nhâm-Tý', 'Quý-Sửu', 'Cấn-Dần', 'Giáp-Mão', 'Ất-Thìn'],
      moc: ['Càn-Hợi', 'Nhâm-Tý', 'Quý-Sửu', 'Cấn-Dần', 'Giáp-Mão', 'Ất-Thìn', 'Tốn-Tỵ', 'Bính-Ngọ', 'Đinh-Mùi', 'Khôn-Thân', 'Canh-Dậu', 'Tân-Tuất']
    };

    const curTable = cucTables[cucKey];
    const huongStageIdx = curTable.indexOf(ssHuong);
    const khauStageIdx = curTable.indexOf(ssKhau);
    const laiStageIdx = curTable.indexOf(ssLai);

    const huongStage = huongStageIdx >= 0 ? stagesSeq[huongStageIdx] : 'Chưa định';
    const khauStage = khauStageIdx >= 0 ? stagesSeq[khauStageIdx] : 'Chưa định';
    const laiStage = laiStageIdx >= 0 ? stagesSeq[laiStageIdx] : 'Chưa định';

    // Thẩm định Cát Hung Cách Cục
    let patternResult = 'BÌNH THƯỜNG / CẦN ĐIỀU CHỈNH';
    let patternStatus = 'neutral';
    let patternDescription = '';

    if (khauStage === 'Mộ Khố' && huongStage === 'Đế Vượng') {
      patternResult = 'CHÍNH VƯỢNG HƯỚNG (ĐẠI CÁT VƯỢNG TÀI)';
      patternStatus = 'auspicious';
      patternDescription = 'Thủy xuất Mộ Khố, lập hướng Đế Vượng (Vượng Hướng Vượng Sơn Khẩu). Minh Đường tụ tài vạn lượng vàng, phú quý song toàn bậc nhất!';
    } else if (khauStage === 'Mộ Khố' && huongStage === 'Trường Sinh') {
      patternResult = 'CHÍNH SINH HƯỚNG (ĐẠI CÁT VƯỢNG ĐINH)';
      patternStatus = 'auspicious';
      patternDescription = 'Thủy xuất Mộ Khố, lập hướng Trường Sinh (Sinh Hướng Sinh Sơn Khẩu). Nhân đinh đại thịnh, con cháu đông đúc hiền tài trường thọ!';
    } else if (khauStage === 'Suy' && huongStage === 'Đế Vượng') {
      patternResult = 'TỰ VƯỢNG HƯỚNG (PHÁT PHÚC DU CỬU)';
      patternStatus = 'auspicious';
      patternDescription = 'Nước thoát ra ở cung Suy không làm tổn hại khí vượng, tài lộc chảy về êm ả bền bỉ muôn đời.';
    } else if (khauStage === 'Tuyệt' && huongStage === 'Trường Sinh') {
      patternResult = 'TỰ SINH HƯỚNG (LỘC TỒN LƯU TẬN)';
      patternStatus = 'auspicious';
      patternDescription = 'Nước xả sạch ở Tuyệt vị tống xuất hung sát, giữ trọn sinh khí cho cung Trường Sinh, biến nguy thành đại phúc!';
    } else if (khauStage === 'Trường Sinh' || khauStage === 'Đế Vượng') {
      patternResult = 'XUNG PHÁ SINH VƯỢNG (ĐẠI HUNG PHÁ SẢN)';
      patternStatus = 'danger';
      patternDescription = 'Kiêng kỵ tuyệt đối: Phóng nước tại cung Sinh/Vượng làm tiêu tán nguyên khí gốc rễ, nhân đinh tổn hại, tiền của làm ra trôi sạch sành sanh!';
    } else if (khauStage === 'Lâm Quan') {
      patternResult = 'LƯU PHÁ LÂM QUAN (PHẠM HOÀNG TUYỀN SÁT)';
      patternStatus = 'danger';
      patternDescription = 'Để nước thoát ra tại cung Lâm Quan làm tổn hại quan chức bổng lộc, người trẻ gãy xương tàn tật đoản mệnh!';
    }

    // Kiểm tra Bát Lộ Hoàng Tuyền
    let hoangTuyenAlert = null;
    const htRules = [
      { huong: ['Canh', 'Đinh'], htSơn: 'Khôn', ss: 'Khôn-Thân' },
      { huong: ['Ất', 'Bính'], htSơn: 'Tốn', ss: 'Tốn-Tỵ' },
      { huong: ['Giáp', 'Quý'], htSơn: 'Cấn', ss: 'Cấn-Dần' },
      { huong: ['Tân', 'Nhâm'], htSơn: 'Càn', ss: 'Càn-Hợi' }
    ];

    htRules.forEach(r => {
      if (r.huong.includes(huongNha)) {
        if (thuyKhau === r.htSơn || ssKhau === r.ss) {
          hoangTuyenAlert = {
            type: 'danger',
            title: 'PHẠM SÁT NHÂN HOÀNG TUYỀN SÁT (ĐẠI HUNG)',
            text: `Nhà hướng ${huongNha} tuyệt đối cấm xả nước thoát ra phương ${r.htSơn} (${r.ss}). Phạm vào ắt chủ tán tài bại quan, người nhà đoản mệnh tai ương!`
          };
        } else if (laiThuy === r.htSơn || ssLai === r.ss) {
          hoangTuyenAlert = {
            type: 'auspicious',
            title: 'ĐẮC CỨU BẦN HOÀNG TUYỀN THỦY PHÁP (ĐẠI CÁT)',
            text: `Nhà hướng ${huongNha} đón dòng nước chảy tới từ phương ${r.htSơn} (${r.ss}) là Cứu Bần Hoàng Tuyền, chủ về phát tài lộc cực nhanh, biến nghèo thành cự phú!`
          };
        }
      }
    });

    // Loan đầu đánh giá
    const loanDauScores = {
      ngoc_doi: { name: 'Ngọc Đới Hoàn Yêu (Bên Bồi)', score: 98, type: 'Cát', desc: 'Dòng nước ôm bọc êm ả, bồi đắp phù sa và tụ sinh khí, bảo đảm an toàn lũ lụt.' },
      cuu_khuc: { name: 'Cửu Khúc Thủy (Chín Khúc)', score: 96, type: 'Cát', desc: 'Dòng nước uốn lượn nhiều đoạn làm giảm vận tốc dòng chảy, tụ đại tài lộc.' },
      tu_thuy: { name: 'Tụ Thủy Minh Đường (Ao Hồ Bán Nguyệt)', score: 95, type: 'Cát', desc: 'Mặt nước phẳng lặng trước nhà điều hòa vi khí hậu, giữ của cải không trôi.' },
      trieu_thuy: { name: 'Triều Đường Thủy (Chầu Về)', score: 92, type: 'Cát', desc: 'Dòng nước từ xa chảy chầm chậm đón chào mặt tiền, sinh phú quý.' },
      tam_xoa: { name: 'Tam Xoa Hợp Lưu (Ngã Ba Sông)', score: 94, type: 'Cát', desc: 'Nơi hợp lưu các dòng nước lớn tạo thành đầu mối thương mại sầm uất.' },
      phan_cung: { name: 'Phản Cung Thủy (Bên Lở)', score: 15, type: 'Hung Sát', desc: 'Chịu lực ly tâm xói lở móng, sóng đánh trực diện, cực kỳ nguy hiểm.' },
      truc_xung: { name: 'Trực Xung Thủy (Thương Sát)', score: 20, type: 'Hung Sát', desc: 'Dòng nước đâm thẳng vào tim nhà như mũi giáo, tai họa huyết quang.' },
      khien_ty: { name: 'Khiên Tỷ Thủy (Trực Khứ)', score: 25, type: 'Hung Sát', desc: 'Nước chảy dốc tuột ra ngoài làm hao tán tài sản, không tích lũy được.' },
      cat_cuoc: { name: 'Cát Cước Thủy (Cắt Móng)', score: 22, type: 'Hung Sát', desc: 'Nước chảy sát chân tường làm xói rỗng móng, bất an trồi sụt.' },
      xuyen_tam: { name: 'Xuyên Tâm Thủy (Xuyên Đường)', score: 18, type: 'Hung Sát', desc: 'Nước chảy xuyên qua giữa ruột nhà từ trước ra sau, rò rỉ cạn kiệt tài lộc.' },
      tien_dao: { name: 'Tiễn Đao Thủy (Hình Kéo)', score: 12, type: 'Hung Sát', desc: 'Hai nhánh giao nhau hình lưỡi kéo kẹp chặt, tranh chấp đao binh.' }
    };

    const loanDauInfo = loanDauScores[loanDau] || loanDauScores.ngoc_doi;

    return {
      cucName,
      cucElement,
      classicSource,
      ssHuong,
      ssKhau,
      ssLai,
      huongStage,
      khauStage,
      laiStage,
      curTable,
      stagesSeq,
      patternResult,
      patternStatus,
      patternDescription,
      hoangTuyenAlert,
      loanDauInfo
    };
  }

  renderThuyPhapTool() {
    const huongNha = this.state.thuyPhapHuongNha || 'Bính';
    const thuyKhau = this.state.thuyPhapThuyKhau || 'Tân';
    const laiThuy = this.state.thuyPhapLaiThuy || 'Cấn';
    const loanDau = this.state.thuyPhapLoanDau || 'ngoc_doi';

    const result = this.calculateThuyPhap(huongNha, thuyKhau, laiThuy, loanDau);

    const sonList = ['Nhâm', 'Tý', 'Quý', 'Sửu', 'Cấn', 'Dần', 'Giáp', 'Mão', 'Ất', 'Thìn', 'Tốn', 'Tỵ', 'Bính', 'Ngọ', 'Đinh', 'Mùi', 'Khôn', 'Thân', 'Canh', 'Dậu', 'Tân', 'Tuất', 'Càn', 'Hợi'];

    return `
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(360px, 1fr)); gap:2rem;">
        <!-- CỘT 1: BẢNG ĐIỀU KHIỂN ĐẦU VÀO -->
        <div style="background:#121722; border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:1.8rem;">
          <div style="display:inline-block; padding:0.2rem 0.6rem; background:rgba(52,211,153,0.15); border:1px solid rgba(52,211,153,0.3); border-radius:12px; font-size:0.75rem; font-weight:700; color:#34D399; margin-bottom:0.8rem;">
            THỦY PHÁP DƯƠNG QUÂN TÙNG
          </div>
          <h3 style="font-family:var(--font-title); font-size:1.3rem; color:#FEF3C7; margin:0 0 1.2rem 0;">
            Bàn Tính 12 Cung Trường Sinh
          </h3>

          <div style="display:flex; flex-direction:column; gap:1.2rem;">
            <div>
              <label style="display:block; font-size:0.85rem; font-weight:700; color:#FEF3C7; margin-bottom:0.4rem;">
                1. Hướng Mặt Tiền Nhà (Địa Bàn Chính Châm 0°):
              </label>
              <select onchange="window.toolUI.setThuyPhapState('thuyPhapHuongNha', this.value)" style="width:100%; background:#0B0F17; border:1px solid rgba(255,255,255,0.15); border-radius:8px; padding:0.6rem; color:#FEF3C7; font-size:0.9rem; font-weight:600;">
                ${sonList.map(s => `<option value="${s}" ${s === huongNha ? 'selected' : ''}>Sơn ${s} (Song Sơn ${result.ssHuong})</option>`).join('')}
              </select>
            </div>

            <div>
              <label style="display:block; font-size:0.85rem; font-weight:700; color:#FEF3C7; margin-bottom:0.4rem;">
                2. Cửa Nước Thoát / Thủy Khẩu (Thiên Bàn Phùng Châm +7.5°):
              </label>
              <select onchange="window.toolUI.setThuyPhapState('thuyPhapThuyKhau', this.value)" style="width:100%; background:#0B0F17; border:1px solid rgba(52,211,153,0.4); border-radius:8px; padding:0.6rem; color:#34D399; font-size:0.9rem; font-weight:700;">
                ${sonList.map(s => `<option value="${s}" ${s === thuyKhau ? 'selected' : ''}>Cửa Thoát Sơn ${s}</option>`).join('')}
              </select>
              <div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.3rem;">
                (Thủy Khẩu dùng để định Tứ Đại Cục: Kim, Mộc, Thủy, Hỏa)
              </div>
            </div>

            <div>
              <label style="display:block; font-size:0.85rem; font-weight:700; color:#FEF3C7; margin-bottom:0.4rem;">
                3. Nguồn Nước Đến / Lai Thủy (Thiên Bàn Phùng Châm +7.5°):
              </label>
              <select onchange="window.toolUI.setThuyPhapState('thuyPhapLaiThuy', this.value)" style="width:100%; background:#0B0F17; border:1px solid rgba(56,189,248,0.4); border-radius:8px; padding:0.6rem; color:#38BDF8; font-size:0.9rem; font-weight:700;">
                ${sonList.map(s => `<option value="${s}" ${s === laiThuy ? 'selected' : ''}>Nguồn Nước Đến Sơn ${s}</option>`).join('')}
              </select>
            </div>

            <div>
              <label style="display:block; font-size:0.85rem; font-weight:700; color:#FEF3C7; margin-bottom:0.4rem;">
                4. Hình Thế Dòng Nước Loan Đầu:
              </label>
              <select onchange="window.toolUI.setThuyPhapState('thuyPhapLoanDau', this.value)" style="width:100%; background:#0B0F17; border:1px solid rgba(255,255,255,0.15); border-radius:8px; padding:0.6rem; color:#FEF3C7; font-size:0.9rem;">
                <option value="ngoc_doi" ${loanDau === 'ngoc_doi' ? 'selected' : ''}>Ngọc Đới Hoàn Yêu (Bên Bồi / Đai Ngọc)</option>
                <option value="cuu_khuc" ${loanDau === 'cuu_khuc' ? 'selected' : ''}>Cửu Khúc Thủy (Chín Khúc Quanh Co)</option>
                <option value="tu_thuy" ${loanDau === 'tu_thuy' ? 'selected' : ''}>Tụ Thủy Minh Đường (Ao Hồ Bán Nguyệt)</option>
                <option value="trieu_thuy" ${loanDau === 'trieu_thuy' ? 'selected' : ''}>Triều Đường Thủy (Nước Chầu Về Sân)</option>
                <option value="tam_xoa" ${loanDau === 'tam_xoa' ? 'selected' : ''}>Tam Xoa Hợp Lưu (Ngã Ba Sông)</option>
                <option value="phan_cung" ${loanDau === 'phan_cung' ? 'selected' : ''}>Phản Cung Thủy (Bên Lở / Lưng Cong Chĩa Vào)</option>
                <option value="truc_xung" ${loanDau === 'truc_xung' ? 'selected' : ''}>Trực Xung Thủy (Nước Đâm Thẳng Cửa)</option>
                <option value="khien_ty" ${loanDau === 'khien_ty' ? 'selected' : ''}>Khiên Tỷ Thủy (Chảy Dốc Tuột Ra Ngoài)</option>
                <option value="cat_cuoc" ${loanDau === 'cat_cuoc' ? 'selected' : ''}>Cát Cước Thủy (Nước Xói Chân Móng)</option>
                <option value="xuyen_tam" ${loanDau === 'xuyen_tam' ? 'selected' : ''}>Xuyên Tâm Thủy (Chảy Xuyên Ruột Nhà)</option>
                <option value="tien_dao" ${loanDau === 'tien_dao' ? 'selected' : ''}>Tiễn Đao Thủy (Hai Dòng Cắt Chéo Như Kéo)</option>
              </select>
            </div>
          </div>

          <div style="margin-top:1.6rem; padding:1rem; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:10px;">
            <div style="font-size:0.8rem; font-weight:700; color:#FBBF24; margin-bottom:0.4rem;">
              QUY CHUẨN CỔ THƯ DƯƠNG CÔNG:
            </div>
            <div style="font-size:0.78rem; color:var(--text-muted); line-height:1.5;">
              • <strong>Địa Bàn Chính Châm (0°)</strong>: Khảo Long lập Hướng nhà.<br/>
              • <strong>Thiên Bàn Phùng Châm (+7.5°)</strong>: Nạp Thủy và Phóng Thủy.<br/>
              • <strong>Nguyên tắc vàng</strong>: Sinh Lai Mộ Khứ — Nước sinh chảy lại, nước thoái cất kho.
            </div>
          </div>
        </div>

        <!-- CỘT 2: KẾT QUẢ PHÂN TÍCH & MA TRẬN 12 CUNG -->
        <div style="display:flex; flex-direction:column; gap:1.4rem;">
          <!-- CARD 1: KẾT QUẢ ĐỊNH CỤC & TỔNG QUAN -->
          <div style="background:#121722; border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:1.8rem;">
            <div style="font-size:0.85rem; font-weight:700; color:var(--text-muted); margin-bottom:0.4rem;">
              CỤC NGŨ HÀNH XÁC ĐỊNH:
            </div>
            <div style="font-size:1.4rem; font-weight:800; color:#34D399; margin-bottom:0.4rem;">
              ${result.cucName}
            </div>
            <div style="font-size:0.82rem; color:#FBBF24; font-style:italic; margin-bottom:1rem;">
              《${result.classicSource}》
            </div>

            <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:0.8rem; background:#0B0F17; border:1px solid rgba(255,255,255,0.06); border-radius:10px; padding:1rem; text-align:center;">
              <div>
                <div style="font-size:0.75rem; color:var(--text-muted);">HƯỚNG NHÀ</div>
                <div style="font-size:1rem; font-weight:800; color:#FEF3C7; margin:0.2rem 0;">${huongNha} (${result.ssHuong})</div>
                <div style="font-size:0.8rem; font-weight:700; color:#FBBF24;">${result.huongStage}</div>
              </div>
              <div>
                <div style="font-size:0.75rem; color:var(--text-muted);">LAI THỦY (NƯỚC ĐẾN)</div>
                <div style="font-size:1rem; font-weight:800; color:#38BDF8; margin:0.2rem 0;">${laiThuy} (${result.ssLai})</div>
                <div style="font-size:0.8rem; font-weight:700; color:#38BDF8;">${result.laiStage}</div>
              </div>
              <div>
                <div style="font-size:0.75rem; color:var(--text-muted);">THỦY KHẨU (THOÁT)</div>
                <div style="font-size:1rem; font-weight:800; color:#34D399; margin:0.2rem 0;">${thuyKhau} (${result.ssKhau})</div>
                <div style="font-size:0.8rem; font-weight:700; color:#34D399;">${result.khauStage}</div>
              </div>
            </div>
          </div>

          <!-- CARD 2: ĐÁNH GIÁ CÁCH CỤC & HOÀNG TUYỀN -->
          <div style="background:#121722; border:1px solid ${result.patternStatus === 'danger' ? 'rgba(239,68,68,0.4)' : (result.patternStatus === 'auspicious' ? 'rgba(52,211,153,0.4)' : 'rgba(255,255,255,0.1)')}; border-radius:14px; padding:1.8rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem;">
              <span style="font-size:0.85rem; font-weight:700; color:var(--text-muted);">THẨM ĐỊNH CÁCH CỤC LẬP HƯỚNG:</span>
              <span style="padding:0.25rem 0.8rem; border-radius:12px; font-size:0.75rem; font-weight:800; background:${result.patternStatus === 'danger' ? 'rgba(239,68,68,0.15)' : (result.patternStatus === 'auspicious' ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.06)')}; color:${result.patternStatus === 'danger' ? '#F87171' : (result.patternStatus === 'auspicious' ? '#34D399' : '#FEF3C7')};">
                ${result.patternStatus === 'danger' ? 'ĐẠI HUNG' : (result.patternStatus === 'auspicious' ? 'ĐẠI CÁT' : 'TRUNG TÍNH')}
              </span>
            </div>
            <div style="font-size:1.15rem; font-weight:800; color:#FEF3C7; margin-bottom:0.6rem;">
              ${result.patternResult}
            </div>
            <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.6; margin:0 0 1rem 0;">
              ${result.patternDescription}
            </p>

            ${result.hoangTuyenAlert ? `
              <div style="background:${result.hoangTuyenAlert.type === 'danger' ? 'rgba(239,68,68,0.1)' : 'rgba(52,211,153,0.1)'}; border:1px solid ${result.hoangTuyenAlert.type === 'danger' ? 'rgba(239,68,68,0.3)' : 'rgba(52,211,153,0.3)'}; border-radius:8px; padding:0.9rem; margin-top:0.8rem;">
                <div style="font-size:0.85rem; font-weight:800; color:${result.hoangTuyenAlert.type === 'danger' ? '#F87171' : '#34D399'}; margin-bottom:0.3rem;">
                  ${result.hoangTuyenAlert.title}
                </div>
                <div style="font-size:0.82rem; color:#FEF3C7; line-height:1.5;">
                  ${result.hoangTuyenAlert.text}
                </div>
              </div>
            ` : ''}

            <!-- LOAN ĐẦU ĐÁNH GIÁ -->
            <div style="margin-top:1.2rem; padding-top:1rem; border-top:1px solid rgba(255,255,255,0.06); display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-size:0.75rem; color:var(--text-muted);">HÌNH THẾ LOAN ĐẦU</div>
                <div style="font-size:0.95rem; font-weight:700; color:#FEF3C7;">${result.loanDauInfo.name}</div>
                <div style="font-size:0.78rem; color:var(--text-muted); margin-top:0.2rem;">${result.loanDauInfo.desc}</div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:1.3rem; font-weight:800; color:${result.loanDauInfo.score >= 80 ? '#34D399' : '#EF4444'};">${result.loanDauInfo.score}/100</div>
                <div style="font-size:0.72rem; color:var(--text-muted);">Điểm An Toàn</div>
              </div>
            </div>
          </div>

          <!-- CARD 3: MA TRẬN CHI TIẾT 12 CUNG TRƯỜNG SINH CỦA CỤC -->
          <div style="background:#121722; border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:1.8rem;">
            <h4 style="font-size:0.95rem; font-weight:800; color:#FEF3C7; margin:0 0 1rem 0;">
              Bảng Phân Định 12 Cung Trường Sinh Của ${result.cucName}:
            </h4>
            <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(130px, 1fr)); gap:0.6rem;">
              ${result.stagesSeq.map((stg, i) => {
                const pair = result.curTable[i];
                const isHuong = pair === result.ssHuong;
                const isKhau = pair === result.ssKhau;
                const isLai = pair === result.ssLai;
                const isCatLai = ['Trường Sinh', 'Quan Đới', 'Lâm Quan', 'Đế Vượng'].includes(stg);
                const isKhuThuy = ['Suy', 'Bệnh', 'Tử', 'Mộ Khố', 'Tuyệt', 'Thai'].includes(stg);

                let borderColor = 'rgba(255,255,255,0.08)';
                let bgBadge = 'transparent';
                if (isHuong) { borderColor = '#FBBF24'; bgBadge = 'rgba(245,158,11,0.15)'; }
                if (isKhau) { borderColor = '#34D399'; bgBadge = 'rgba(52,211,153,0.15)'; }
                if (isLai) { borderColor = '#38BDF8'; bgBadge = 'rgba(56,189,248,0.15)'; }

                return `
                  <div style="background:${bgBadge}; border:1px solid ${borderColor}; border-radius:8px; padding:0.6rem; text-align:center;">
                    <div style="font-size:0.72rem; font-weight:700; color:${isCatLai ? '#38BDF8' : (stg === 'Mộc Dục' ? '#F87171' : '#34D399')};">${stg}</div>
                    <div style="font-size:0.85rem; font-weight:800; color:#FEF3C7; margin:0.2rem 0;">${pair}</div>
                    <div style="font-size:0.65rem; color:var(--text-muted);">
                      ${isHuong ? '<span style="color:#FBBF24;">[HƯỚNG]</span> ' : ''}
                      ${isLai ? '<span style="color:#38BDF8;">[LAI]</span> ' : ''}
                      ${isKhau ? '<span style="color:#34D399;">[KHẨU]</span>' : ''}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }


  selectDesignBlueprint(id) {
    this.state.selectedBlueprintId = id;
    this.render('goiythietke');
  }

  renderGoiYThietKeTool() {
    const theory = typeof DESIGN_BLUEPRINT_THEORY !== 'undefined' ? DESIGN_BLUEPRINT_THEORY : null;
    const blueprints = typeof DESIGN_BLUEPRINTS !== 'undefined' ? DESIGN_BLUEPRINTS : [];
    const activeBpId = this.state.selectedBlueprintId || 'nha_bao_mientrung';
    const activeBp = blueprints.find(b => b.id === activeBpId) || blueprints[0] || {};

    return `
      <div style="display:flex; flex-direction:column; gap:1.5rem;">
        
        <!-- HEADER TINH GỌN -->
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.6rem; flex-wrap:wrap; gap:0.5rem;">
          <div style="display:flex; align-items:center; gap:0.6rem;">
            <span style="background:rgba(56,189,248,0.15); color:#38BDF8; padding:0.25rem 0.75rem; border-radius:20px; font-size:0.8rem; font-weight:800; border:1px solid rgba(56,189,248,0.3);">
              Gợi Ý Thiết Kế
            </span>
            <span style="font-size:0.82rem; color:var(--text-muted);">Khí Động Học & Cổ Thư</span>
          </div>

          <!-- DROPDOWN CHỌN NHANH KHI CÓ NHIỀU MẪU (10-20 MẪU) -->
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span style="font-size:0.78rem; color:var(--text-muted);">Chọn mẫu nhanh:</span>
            <select onchange="window.toolUI.selectDesignBlueprint(this.value)" style="background:#0F172A; color:#FEF3C7; border:1px solid rgba(56,189,248,0.4); padding:0.3rem 0.6rem; border-radius:6px; font-size:0.8rem; font-weight:700; outline:none; cursor:pointer;">
              ${blueprints.map(bp => `
                <option value="${bp.id}" ${bp.id === activeBp.id ? 'selected' : ''}>${bp.name}</option>
              `).join('')}
            </select>
          </div>
        </div>

        <!-- =========================================================================
             PHẦN 2: BỘ BẢN VẼ HÌNH MẪU TRỰC QUAN & HƯỚNG DẪN THI CÔNG (ĐƯA LÊN TRƯỚC)
             ========================================================================= -->
        <section style="background:#121722; border:1px solid rgba(56,189,248,0.25); border-radius:10px; padding:1.2rem;">
          
          <!-- THANH CUỘN NGANG CHỌN MẪU TINH GỌN (PILL CHIPS - HỖ TRỢ 10-20 MẪU KHÔNG CHIẾM DIỆN TÍCH) -->
          <div style="display:flex; overflow-x:auto; gap:0.4rem; padding-bottom:0.6rem; margin-bottom:1rem; scrollbar-width:thin; -webkit-overflow-scrolling:touch;">
            ${blueprints.map((bp, idx) => `
              <button onclick="window.toolUI.selectDesignBlueprint('${bp.id}')" style="flex:0 0 auto; background:${bp.id === activeBp.id ? 'rgba(56,189,248,0.25)' : 'rgba(255,255,255,0.03)'}; border:1px solid ${bp.id === activeBp.id ? '#38BDF8' : 'rgba(255,255,255,0.1)'}; padding:0.35rem 0.85rem; border-radius:20px; font-size:0.78rem; font-weight:700; color:${bp.id === activeBp.id ? '#FEF3C7' : '#94A3B8'}; cursor:pointer; transition:all 0.15s ease; white-space:nowrap;">
                Mẫu 0${idx + 1}: ${bp.name.replace(/^\d+\.\s*/, '').split('&')[0].trim()}
              </button>
            `).join('')}
          </div>

          <!-- CHI TIẾT BẢN VẼ HÌNH MẪU ĐƯỢC CHỌN -->
          <div style="background:#090D16; border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:1.2rem;">
            
            <!-- HEADER HÌNH MẪU -->
            <div style="margin-bottom:1rem; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:0.8rem; display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:0.5rem;">
              <div>
                <div style="display:flex; align-items:center; gap:0.5rem;">
                  <span style="background:rgba(56,189,248,0.15); color:#38BDF8; font-size:0.72rem; font-weight:800; padding:0.15rem 0.5rem; border-radius:4px;">
                    ${activeBp.code || ''}
                  </span>
                  <h3 style="font-size:1.15rem; color:#FEF3C7; margin:0; font-weight:700;">
                    ${activeBp.name || ''}
                  </h3>
                </div>
                <p style="font-size:0.82rem; color:#94A3B8; margin:0.3rem 0 0 0; line-height:1.4;">
                  ${activeBp.summary || ''}
                </p>
              </div>
              <div style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.25); border-radius:6px; padding:0.4rem 0.6rem; max-width:320px; font-size:0.75rem; color:#FEF3C7; line-height:1.3;">
                <strong style="color:#F87171;">Nguy cơ:</strong> ${activeBp.problem_analysis || ''}
              </div>
            </div>

            <!-- BẢN VẼ SƠ ĐỒ KHÍ ĐỘNG HỌC VECTOR (SVG) -->
            <div style="margin-bottom:1.2rem; width:100%; height:auto; max-height:420px; overflow:hidden; border-radius:6px; border:1px solid rgba(255,255,255,0.08);">
              ${activeBp.svg_diagram || ''}
            </div>

            <!-- 2 BẢNG HƯỚNG DẪN CÂY CỐI & KIẾN TRÚC -->
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:1rem;">
              
              <!-- CỘT 1: HƯỚNG DẪN CÂY CỐI -->
              <div style="background:#0F172A; border:1px solid rgba(52,211,153,0.3); border-top:3px solid #10B981; border-radius:6px; padding:1rem;">
                <div style="font-size:0.75rem; font-weight:800; color:#10B981; margin-bottom:0.5rem;">
                  QUY CHUẨN CÂY CỐI
                </div>
                <div style="display:flex; flex-direction:column; gap:0.5rem; font-size:0.8rem; line-height:1.4;">
                  <div><strong style="color:#34D399;">• Chủng loại:</strong> ${activeBp.tree_guidelines ? activeBp.tree_guidelines.species : ''}</div>
                  <div><strong style="color:#34D399;">• Khoảng cách:</strong> ${activeBp.tree_guidelines ? activeBp.tree_guidelines.distance : ''}</div>
                  <div><strong style="color:#34D399;">• Tầng lớp:</strong> ${activeBp.tree_guidelines ? activeBp.tree_guidelines.structure : ''}</div>
                  <div style="background:rgba(16,185,129,0.08); border-radius:4px; padding:0.4rem 0.5rem; color:#6EE7B7;">
                    ✓ <strong>Công dụng:</strong> ${activeBp.tree_guidelines ? activeBp.tree_guidelines.benefit : ''}
                  </div>
                </div>
              </div>

              <!-- CỘT 2: HƯỚNG DẪN KIẾN TRÚC & KẾT CẤU -->
              <div style="background:#0F172A; border:1px solid rgba(56,189,248,0.3); border-top:3px solid #38BDF8; border-radius:6px; padding:1rem;">
                <div style="font-size:0.75rem; font-weight:800; color:#38BDF8; margin-bottom:0.5rem;">
                  QUY CHUẨN KIẾN TRÚC & KẾT CẤU
                </div>
                <div style="display:flex; flex-direction:column; gap:0.5rem; font-size:0.8rem; line-height:1.4;">
                  <div><strong style="color:#38BDF8;">• Hình dạng mái:</strong> ${activeBp.architecture_guidelines ? activeBp.architecture_guidelines.shape : ''}</div>
                  <div><strong style="color:#38BDF8;">• Tiền sảnh & Cửa:</strong> ${activeBp.architecture_guidelines ? activeBp.architecture_guidelines.position : ''}</div>
                  <div><strong style="color:#38BDF8;">• Đai neo xà gồ:</strong> ${activeBp.architecture_guidelines ? activeBp.architecture_guidelines.structure : ''}</div>
                  <div style="background:rgba(56,189,248,0.08); border-radius:4px; padding:0.4rem 0.5rem; color:#7DD3FC;">
                    ✓ <strong>Công dụng:</strong> ${activeBp.architecture_guidelines ? activeBp.architecture_guidelines.benefit : ''}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <!-- =========================================================================
             PHẦN 1: TOÀN BỘ LÝ THUYẾT CỔ THƯ & ĐỊNH LUẬT KHÍ ĐỘNG HỌC (GỌN GÀNG)
             ========================================================================= -->
        <section style="background:#121722; border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:1.2rem;">
          <div style="border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.6rem; margin-bottom:1rem; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <span style="font-size:0.72rem; font-weight:800; color:#FBBF24; text-transform:uppercase;">PHẦN 1: LÝ THUYẾT CỔ THƯ & ĐỊNH LUẬT KHÍ ĐỘNG HỌC</span>
              <h3 style="font-size:1.15rem; color:#FEF3C7; margin:0.2rem 0 0 0;">
                Đối Chiếu 3 Đại Nguyên Lý
              </h3>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:1rem;">
            ${(theory ? theory.sections : []).map((sec, idx) => `
              <div style="background:#0D111A; border:1px solid rgba(255,255,255,0.06); border-radius:6px; padding:1rem; display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                  <div style="font-size:0.72rem; font-weight:800; color:#38BDF8; margin-bottom:0.3rem;">
                    NGUYÊN LÝ 0${idx + 1}
                  </div>
                  <h4 style="font-size:0.95rem; color:#FEF3C7; margin:0 0 0.6rem 0; font-weight:700;">
                    ${sec.title}
                  </h4>

                  <div style="background:rgba(245,158,11,0.08); border-left:3px solid #F59E0B; padding:0.4rem 0.6rem; border-radius:4px; margin-bottom:0.5rem; font-size:0.76rem; color:#FEF3C7;">
                    <strong>Cổ Thư:</strong> ${sec.classic_source}
                  </div>

                  <div style="background:rgba(56,189,248,0.08); border-left:3px solid #38BDF8; padding:0.4rem 0.6rem; border-radius:4px; margin-bottom:0.5rem; font-size:0.76rem; color:#E0F2FE;">
                    <strong>Khí Động Học:</strong> ${sec.physics_law}
                  </div>

                  <div style="font-size:0.78rem; color:var(--text-muted); line-height:1.5; margin-bottom:0.5rem;">
                    ${sec.mechanism}
                  </div>
                </div>

                <div style="background:#161E2E; border:1px solid rgba(52,211,153,0.25); border-radius:4px; padding:0.6rem; margin-top:0.5rem; font-size:0.76rem; color:#E2E8F0; line-height:1.4; white-space:pre-line;">
                  <strong style="color:#34D399;">• Yếu Quyết Hóa Giải:</strong>\n${sec.remedy_principle}
                </div>
              </div>
            `).join('')}
          </div>
        </section>

      </div>
    `;
  }
}

if (typeof window !== 'undefined') {
  window.toolUI = new ToolUI();
}

if (typeof module !== 'undefined') {
  module.exports = { ToolUI };
}
