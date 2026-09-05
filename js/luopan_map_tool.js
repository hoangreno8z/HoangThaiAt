/**
 * CÔNG CỤ TƯƠNG TÁC THỰC CHIẾN: LA KINH BẢN ĐỒ – 144 THỦY KHẨU (HOÀN THIỆN 100%)
 * Tích hợp:
 * 1. Chế độ Ảnh / Mặt bằng CAD + Bản đồ vệ tinh Leaflet GIS.
 * 2. Bộ công cụ vẽ & kéo thả trực quan (Interactive CAD Drawing Overlay):
 *    - Chấm tâm nhà
 *    - Vẽ/kéo mặt tiền nhà + Dựng pháp tuyến hướng nhìn
 *    - Vẽ đường sá / sông ngòi (Polyline) + Chỉ định điểm Lai (Đến) / Khứ (Đi)
 * 3. Hiệu chuẩn thực địa (Calibration Engine) tự động tính Offset và bù góc.
 * 4. La Kinh Vector SVG toán học đa tầng, xoay "Hướng nhà lên trên".
 * 5. Xuất phiếu khảo sát phong thủy (Export Survey Session).
 */

class LuopanMapTool {
  constructor() {
    this.mode = 'image'; // 'image' hoặc 'map'
    this.activeDrawTool = 'select'; // 'select', 'setCenter', 'drawFrontage', 'drawWater'
    this.container = null;

    // Động cơ
    this.geometry = window.LuopanGeometry;
    this.data = window.LuopanData;
    this.renderer = new window.LuopanSvgRenderer({ size: 680 });
    this.classifier = new window.LuopanClassifier();

    // Dữ liệu hình học thực địa (Tọa độ phẳng màn hình/ảnh)
    this.centerPoint = { x: 350, y: 320 };
    this.frontageLine = {
      pA: { x: 260, y: 320 },
      pB: { x: 440, y: 320 },
      frontSide: 'right' // 'right' (hướng xuống/Nam), 'left' (hướng lên/Bắc)
    };
    this.waterPolyline = [
      { x: 140, y: 160 }, // Lai Thủy (Nước đến)
      { x: 350, y: 210 },
      { x: 560, y: 460 }  // Khứ Thủy (Nước đi)
    ];

    // Dữ liệu tọa độ địa lý (Leaflet GIS)
    this.centerLatLng = [21.0285, 105.8542];
    this.frontageLatLng = null;
    this.waterLatLngs = [];

    // Trạng thái hiệu chuẩn & đo đạc
    this.rawFacingBearing = 180;
    this.measuredBearing = 180;
    this.calibrationOffset = 0;
    this.isCalibrationLocked = false;

    // Viewport & Settings
    this.viewRotation = 0; // 0 = Bắc lên trên
    this.luopanOpacity = 0.85;
    this.luopanScale = 1.0;
    this.showDrawingOverlay = true;
    this.imageSrc = null;
    this.mapInstance = null;

    // Kéo thả handles
    this.draggedHandle = null;
    this.tempWaterPoints = [];
  }

  init(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.recalculateRawBearings();
    this.renderLayout();
    this.bindEvents();
    this.initInteractiveCanvas();
  }

  recalculateRawBearings() {
    this.rawFacingBearing = this.geometry.calculateHouseFacingBearing(
      this.frontageLine.pA,
      this.frontageLine.pB,
      this.frontageLine.frontSide
    );
  }

  getEffectiveFacingBearing() {
    return this.isCalibrationLocked
      ? this.geometry.calibrateBearing(this.rawFacingBearing, this.calibrationOffset)
      : this.rawFacingBearing;
  }

  getEffectiveLaiBearing() {
    if (!this.waterPolyline || this.waterPolyline.length < 1) return null;
    const pLai = this.waterPolyline[0];
    const rawLai = this.geometry.calculateLineBearing(this.centerPoint, pLai);
    return this.isCalibrationLocked
      ? this.geometry.calibrateBearing(rawLai, this.calibrationOffset)
      : rawLai;
  }

  getEffectiveKhuBearing() {
    if (!this.waterPolyline || this.waterPolyline.length < 2) return null;
    const pKhu = this.waterPolyline[this.waterPolyline.length - 1];
    const rawKhu = this.geometry.calculateLineBearing(this.centerPoint, pKhu);
    return this.isCalibrationLocked
      ? this.geometry.calibrateBearing(rawKhu, this.calibrationOffset)
      : rawKhu;
  }

  renderLayout() {
    const facing = this.getEffectiveFacingBearing();
    const lai = this.getEffectiveLaiBearing();
    const khu = this.getEffectiveKhuBearing();

    const analysis = this.classifier.classify({
      facingBearing: facing,
      laiBearing: lai,
      khuBearing: khu,
      offset: this.calibrationOffset,
      isLocked: this.isCalibrationLocked
    });

    const luopanSvgHtml = this.renderer.render({
      rotation: this.viewRotation,
      houseFacing: facing,
      houseSitting: this.geometry.calculateHouseSittingBearing(facing),
      laiBearing: lai,
      khuBearing: khu,
      activeHsNum: analysis.thuyKhau ? analysis.thuyKhau.hs_num : 1,
      opacity: this.luopanOpacity
    });

    this.container.innerHTML = `
      <div class="dt-luopan-tool-root" style="display:flex; flex-direction:column; gap:1.2rem; max-width:1240px; margin:0 auto; font-family:'Be Vietnam Pro', sans-serif;">
        
        <!-- 1. TOP HEADER & STATUS BAR -->
        <header style="background:#0D111A; border:1px solid #C5B382; border-radius:14px; padding:1rem 1.4rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.8rem; box-shadow:0 8px 24px rgba(0,0,0,0.4);">
          <div>
            <div style="display:inline-flex; align-items:center; gap:0.4rem; padding:0.2rem 0.6rem; background:rgba(197,179,130,0.15); border:1px solid rgba(197,179,130,0.3); border-radius:6px; font-size:0.75rem; font-weight:700; color:#F5D485; margin-bottom:0.3rem;">
              <span>🧭</span> LA KINH BẢN ĐỒ CÓ HIỆU CHUẨN THỰC ĐỊA (144 THỦY KHẨU)
            </div>
            <h2 style="margin:0; font-size:1.3rem; color:#FEF3C7; font-weight:800;">
              Hệ Thống Đo Đạc Không Gian & Khảo Khẩu
            </h2>
          </div>

          <div style="display:flex; align-items:center; gap:0.75rem; flex-wrap:wrap;">
            <div class="dt-badge" style="background:${analysis.status.color}22; color:${analysis.status.color}; border:1px solid ${analysis.status.color}55; font-size:0.82rem; font-weight:700; padding:0.4rem 0.85rem; border-radius:8px;">
              ${analysis.status.label}
            </div>

            <div style="display:flex; gap:0.3rem; background:#1E293B; padding:0.25rem; border-radius:8px; border:1px solid rgba(255,255,255,0.1);">
              <button type="button" id="btn-mode-image" style="background:${this.mode === 'image' ? '#FBBF24' : 'transparent'}; color:${this.mode === 'image' ? '#000' : '#CBD5E1'}; border:none; padding:0.4rem 0.8rem; border-radius:6px; font-size:0.8rem; font-weight:700; cursor:pointer;">
                📷 Tải Ảnh / CAD
              </button>
              <button type="button" id="btn-mode-map" style="background:${this.mode === 'map' ? '#38BDF8' : 'transparent'}; color:${this.mode === 'map' ? '#000' : '#CBD5E1'}; border:none; padding:0.4rem 0.8rem; border-radius:6px; font-size:0.8rem; font-weight:700; cursor:pointer;">
                🗺️ Bản Đồ Vệ Tinh
              </button>
            </div>
          </div>
        </header>

        <!-- 2. CAD DRAWING ACTION BAR (BỘ CÔNG CỤ VẼ & ĐẶT MỐC) -->
        <nav style="background:#141B2B; border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:0.6rem 1rem; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.6rem;">
          <div style="display:flex; align-items:center; gap:0.45rem; flex-wrap:wrap;">
            <span style="font-size:0.75rem; color:#94A3B8; font-weight:700; text-transform:uppercase; margin-right:0.3rem;">Thao tác:</span>
            
            <button type="button" id="tool-btn-select" class="dt-tool-mode-btn ${this.activeDrawTool === 'select' ? 'active' : ''}" style="background:${this.activeDrawTool === 'select' ? '#F5D485' : '#1E293B'}; color:${this.activeDrawTool === 'select' ? '#000' : '#E2E8F0'}; border:1px solid rgba(255,255,255,0.15); padding:0.35rem 0.75rem; border-radius:6px; font-size:0.78rem; font-weight:700; cursor:pointer;">
              🖱️ Chọn / Di Chuyển Điểm
            </button>

            <button type="button" id="tool-btn-center" class="dt-tool-mode-btn ${this.activeDrawTool === 'setCenter' ? 'active' : ''}" style="background:${this.activeDrawTool === 'setCenter' ? '#EF4444' : '#1E293B'}; color:${this.activeDrawTool === 'setCenter' ? '#FFF' : '#E2E8F0'}; border:1px solid rgba(255,255,255,0.15); padding:0.35rem 0.75rem; border-radius:6px; font-size:0.78rem; font-weight:700; cursor:pointer;">
              📍 Chấm Tâm Nhà
            </button>

            <button type="button" id="tool-btn-frontage" class="dt-tool-mode-btn ${this.activeDrawTool === 'drawFrontage' ? 'active' : ''}" style="background:${this.activeDrawTool === 'drawFrontage' ? '#F59E0B' : '#1E293B'}; color:${this.activeDrawTool === 'drawFrontage' ? '#000' : '#E2E8F0'}; border:1px solid rgba(255,255,255,0.15); padding:0.35rem 0.75rem; border-radius:6px; font-size:0.78rem; font-weight:700; cursor:pointer;">
              📐 Kéo Mặt Tiền Nhà
            </button>

            <button type="button" id="tool-btn-water" class="dt-tool-mode-btn ${this.activeDrawTool === 'drawWater' ? 'active' : ''}" style="background:${this.activeDrawTool === 'drawWater' ? '#38BDF8' : '#1E293B'}; color:${this.activeDrawTool === 'drawWater' ? '#000' : '#E2E8F0'}; border:1px solid rgba(255,255,255,0.15); padding:0.35rem 0.75rem; border-radius:6px; font-size:0.78rem; font-weight:700; cursor:pointer;">
              🌊 Vẽ Tuyến Nước / Đường
            </button>
          </div>

          <div style="display:flex; align-items:center; gap:0.4rem; flex-wrap:wrap;">
            <button type="button" id="btn-flip-frontside" title="Đổi hướng nhìn phía trước mặt tiền nhà" style="background:#1E293B; color:#FEF3C7; border:1px solid rgba(197,179,130,0.3); padding:0.35rem 0.65rem; border-radius:6px; font-size:0.76rem; font-weight:600; cursor:pointer;">
              ⇄ Đổi Hướng Nhìn Nhà
            </button>
            <button type="button" id="btn-reverse-water" title="Đảo chiều nước: Điểm đầu thành Khứ, điểm cuối thành Lai" style="background:#1E293B; color:#38BDF8; border:1px solid rgba(56,189,248,0.3); padding:0.35rem 0.65rem; border-radius:6px; font-size:0.76rem; font-weight:600; cursor:pointer;">
              🔄 Đảo Chiều Nước (Lai ⇄ Khứ)
            </button>
            <button type="button" id="btn-export-survey" title="Xuất phiếu kết quả khảo sát phong thủy" style="background:#059669; color:#FFF; border:none; padding:0.35rem 0.8rem; border-radius:6px; font-size:0.76rem; font-weight:700; cursor:pointer;">
              📥 Xuất Phiếu Khảo Sát
            </button>
          </div>
        </nav>

        <!-- 3. MAIN WORKSPACE GRID -->
        <div style="display:grid; grid-template-columns: 1fr 350px; gap:1.2rem; align-items:start;">
          
          <!-- LEFT: INTERACTIVE CANVAS CONTAINER -->
          <div id="dt-interactive-stage" style="background:#080C14; border:1px solid rgba(255,255,255,0.12); border-radius:14px; overflow:hidden; position:relative; min-height:600px; display:flex; justify-content:center; align-items:center; box-shadow:0 12px 36px rgba(0,0,0,0.6); user-select:none;">
            
            <!-- LAYER 0: MAP OR IMAGE BACKGROUND -->
            <div id="dt-workspace-viewport" style="position:absolute; inset:0; overflow:hidden; display:flex; justify-content:center; align-items:center;">
              ${this.mode === 'image' && this.imageSrc ? `
                <img id="dt-user-img" src="${this.imageSrc}" style="width:100%; height:100%; object-fit:contain; opacity:0.65; pointer-events:none;" />
              ` : `
                <div id="dt-map-mount" style="position:absolute; inset:0; ${this.mode === 'map' ? 'z-index:1;' : 'display:none;'}"></div>
                ${!this.imageSrc && this.mode === 'image' ? `
                  <div style="text-align:center; color:#64748B; padding:2rem; z-index:2;">
                    <div style="font-size:3rem; margin-bottom:0.5rem;">🛰️</div>
                    <p style="font-size:0.92rem; margin-bottom:0.8rem; color:#FEF3C7; font-weight:600;">Chưa có ảnh nền thực địa.</p>
                    <p style="font-size:0.82rem; margin-bottom:1.2rem; max-width:400px; color:#94A3B8;">Tải ảnh chụp vệ tinh Google Maps hoặc bản vẽ CAD mặt bằng khu đất để đo đạc chính xác góc tương đối.</p>
                    <label style="background:#1E293B; color:#FEF3C7; border:1px solid #C5B382; padding:0.55rem 1.1rem; border-radius:8px; font-size:0.84rem; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:0.45rem;">
                      <span>📁</span> Chọn Ảnh Vệ Tinh / Mặt Bằng
                      <input type="file" id="input-upload-image" accept="image/*" style="display:none;" />
                    </label>
                  </div>
                ` : ''}
              `}
            </div>

            <!-- LAYER 1: INTERACTIVE CAD DRAWING SVG OVERLAY -->
            <svg id="dt-drawing-svg" style="position:absolute; inset:0; width:100%; height:100%; z-index:15; pointer-events:auto;"></svg>

            <!-- LAYER 2: VECTOR LUOPAN SVG OVERLAY -->
            <div id="dt-luopan-svg-container" style="position:absolute; z-index:10; width:88%; max-width:620px; aspect-ratio:1/1; pointer-events:none; transition:transform 0.15s ease-out;">
              ${luopanSvgHtml}
            </div>

            <!-- FLOATING VIEWPORT ACTION TOOLBAR -->
            <div style="position:absolute; bottom:14px; left:14px; z-index:25; display:flex; gap:0.5rem; background:rgba(15,23,42,0.88); backdrop-filter:blur(10px); padding:0.4rem; border-radius:8px; border:1px solid rgba(255,255,255,0.15);">
              <button type="button" id="btn-north-up" title="Khôi phục hướng Bắc lên trên" style="background:#1E293B; color:#FEF3C7; border:1px solid rgba(255,255,255,0.1); padding:0.35rem 0.65rem; border-radius:6px; font-size:0.75rem; font-weight:700; cursor:pointer;">
                🧭 Bắc Lên Trên
              </button>
              <button type="button" id="btn-facing-up" title="Xoay hướng nhà hướng lên đỉnh màn hình" style="background:#1E293B; color:#38BDF8; border:1px solid rgba(56,189,248,0.3); padding:0.35rem 0.65rem; border-radius:6px; font-size:0.75rem; font-weight:700; cursor:pointer;">
                🏠 Hướng Nhà Lên Trên
              </button>
              <button type="button" id="btn-toggle-drawing" title="Ẩn/Hiện đường vẽ hình học" style="background:#1E293B; color:#CBD5E1; border:1px solid rgba(255,255,255,0.1); padding:0.35rem 0.65rem; border-radius:6px; font-size:0.75rem; cursor:pointer;">
                ${this.showDrawingOverlay ? '👁️ Ẩn Nét Vẽ' : '👁️ Hiện Nét Vẽ'}
              </button>
            </div>

            <!-- OPACITY SLIDER (GÓC PHẢI DƯỚI) -->
            <div style="position:absolute; bottom:14px; right:14px; z-index:25; background:rgba(15,23,42,0.88); backdrop-filter:blur(10px); padding:0.35rem 0.75rem; border-radius:8px; border:1px solid rgba(255,255,255,0.15); display:flex; align-items:center; gap:0.55rem; font-size:0.74rem; color:#94A3B8;">
              <span>Độ mờ La Kinh:</span>
              <input type="range" id="slider-opacity" min="0.1" max="1.0" step="0.05" value="${this.luopanOpacity}" style="width:75px; cursor:pointer;" />
            </div>
          </div>

          <!-- RIGHT: CALIBRATION & MEASUREMENT SIDEBAR -->
          <div style="display:flex; flex-direction:column; gap:1rem;">
            
            <!-- 1. BẢNG HIỆU CHUẨN THỰC ĐỊA -->
            <div style="background:#111827; border:1px solid ${this.isCalibrationLocked ? '#10B981' : '#F59E0B'}; border-radius:12px; padding:1.1rem; box-shadow:0 8px 24px rgba(0,0,0,0.35);">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
                <span style="font-size:0.76rem; font-weight:800; color:#FEF3C7; text-transform:uppercase; letter-spacing:0.04em;">
                  1. Hiệu Chuẩn Thực Địa
                </span>
                <span style="font-size:0.72rem; font-weight:700; color:${this.isCalibrationLocked ? '#34D399' : '#FBBF24'};">
                  ${this.isCalibrationLocked ? '🔒 ĐÃ KHÓA' : '🔓 CHƯA KHÓA'}
                </span>
              </div>

              <div style="font-size:0.78rem; color:#94A3B8; margin-bottom:0.8rem; line-height:1.5;">
                Góc ảnh chỉ mang tính tương đối. Nhập góc đo bằng La Kinh hiện trường để khóa mốc chuẩn cho toàn bộ nhà & dòng nước.
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.6rem; margin-bottom:0.8rem;">
                <div style="background:#1A2234; padding:0.5rem 0.7rem; border-radius:8px;">
                  <span style="font-size:0.7rem; color:#64748B; display:block;">RAW Hình Học</span>
                  <strong style="font-size:1.05rem; color:#CBD5E1;">${this.rawFacingBearing.toFixed(1)}°</strong>
                </div>
                <div style="background:#1A2234; padding:0.5rem 0.7rem; border-radius:8px;">
                  <span style="font-size:0.7rem; color:#64748B; display:block;">Độ Bù Offset</span>
                  <strong style="font-size:1.05rem; color:${this.calibrationOffset >= 0 ? '#34D399' : '#F87171'};">${this.calibrationOffset >= 0 ? '+' : ''}${this.calibrationOffset.toFixed(1)}°</strong>
                </div>
              </div>

              <div style="margin-bottom:0.9rem;">
                <label for="input-measured-bearing" style="display:block; font-size:0.75rem; font-weight:700; color:#E2E8F0; margin-bottom:0.35rem;">
                  Số Đo La Kinh Thực Tế Tại Nhà (°):
                </label>
                <div style="display:flex; gap:0.5rem;">
                  <input type="number" id="input-measured-bearing" min="0" max="359.9" step="0.1" value="${this.measuredBearing.toFixed(1)}" style="flex:1; background:#0B0F17; color:#FEF3C7; border:1px solid rgba(197,179,130,0.4); border-radius:6px; padding:0.45rem 0.6rem; font-size:0.95rem; font-weight:800; outline:none;" />
                  <button type="button" id="btn-lock-calibration" style="background:${this.isCalibrationLocked ? '#059669' : '#D97706'}; color:#FFF; border:none; padding:0.45rem 0.85rem; border-radius:6px; font-size:0.8rem; font-weight:700; cursor:pointer;">
                    ${this.isCalibrationLocked ? 'Mở Khóa' : 'Khóa Chuẩn'}
                  </button>
                </div>
              </div>
            </div>

            <!-- 2. KẾT QUẢ ĐỌC PHƯƠNG VỊ & 144 THỦY KHẨU -->
            <div style="background:#111827; border:1px solid rgba(255,255,255,0.12); border-radius:12px; padding:1.1rem;">
              <span style="font-size:0.76rem; font-weight:800; color:#38BDF8; text-transform:uppercase; letter-spacing:0.04em; display:block; margin-bottom:0.8rem;">
                2. Phân Khảo Cổ Pháp
              </span>

              <div style="display:flex; flex-direction:column; gap:0.6rem; font-size:0.82rem;">
                <div style="display:flex; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:0.4rem;">
                  <span style="color:#94A3B8;">Hướng Nhà:</span>
                  <strong style="color:#EF4444;">${analysis.facing.bearing.toFixed(1)}° (${analysis.facing.mountain.name} Sơn)</strong>
                </div>
                <div style="display:flex; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:0.4rem;">
                  <span style="color:#94A3B8;">Tọa Sơn:</span>
                  <strong style="color:#FBBF24;">${analysis.sitting.bearing.toFixed(1)}° (${analysis.sitting.mountain.name} Sơn)</strong>
                </div>
                <div style="display:flex; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:0.4rem;">
                  <span style="color:#94A3B8;">Cụm Song Sơn:</span>
                  <strong style="color:#CBD5E1;">${analysis.group.label}</strong>
                </div>
                <div style="display:flex; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:0.4rem;">
                  <span style="color:#94A3B8;">Lai Thủy (Đến):</span>
                  <strong style="color:#34D399;">${analysis.lai ? `${analysis.lai.bearing.toFixed(1)}° (${analysis.lai.mountain.name})` : 'Chưa chấm điểm'}</strong>
                </div>
                <div style="display:flex; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:0.4rem;">
                  <span style="color:#94A3B8;">Khứ Thủy (Thoát):</span>
                  <strong style="color:#38BDF8;">${analysis.khu ? `${analysis.khu.bearing.toFixed(1)}° (${analysis.khu.mountain.name})` : 'Chưa chấm điểm'}</strong>
                </div>
              </div>

              ${analysis.thuyKhau ? `
                <div style="margin-top:0.9rem; background:#181F30; border-left:3px solid #F5D485; border-radius:0 8px 8px 0; padding:0.75rem 0.9rem;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.25rem;">
                    <span style="font-size:0.72rem; color:#94A3B8; font-weight:700;">Khẩu #${analysis.thuyKhau.hs_num} / 144</span>
                    <span class="dt-badge" style="background:rgba(16,185,129,0.15); color:#34D399; font-size:0.7rem; font-weight:800; padding:0.15rem 0.45rem; border-radius:4px;">${analysis.thuyKhau.muc_phan}</span>
                  </div>
                  <div style="font-size:0.88rem; font-weight:800; color:#FEF3C7; margin-bottom:0.3rem;">
                    ${analysis.thuyKhau.ten_cach}
                  </div>
                  <div style="font-size:0.78rem; color:#CBD5E1; line-height:1.5; margin-bottom:0.5rem;">
                    Thoát: <strong style="color:#38BDF8;">${analysis.thuyKhau.thuy_xuat}</strong> · Cung: ${analysis.thuyKhau.song_son_cung}
                  </div>
                  <a href="#/thu-vien/duong-trach/bai/batch-21?nhom=${analysis.group.idx + 1}&hs=${analysis.thuyKhau.hs_num}" style="display:inline-flex; align-items:center; gap:0.3rem; color:#F5D485; font-size:0.78rem; font-weight:700; text-decoration:none;">
                    📖 Đọc toàn văn khảo chứng Khẩu #${analysis.thuyKhau.hs_num} →
                  </a>
                </div>
              ` : ''}
            </div>

            <!-- 3. QUẢN LÝ TẦNG LA KINH -->
            <div style="background:#111827; border:1px solid rgba(255,255,255,0.12); border-radius:12px; padding:1.1rem;">
              <span style="font-size:0.76rem; font-weight:800; color:#A78BFA; text-transform:uppercase; letter-spacing:0.04em; display:block; margin-bottom:0.75rem;">
                3. Bật / Tắt Tầng La Kinh
              </span>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; font-size:0.78rem;">
                <label style="display:flex; align-items:center; gap:0.4rem; color:#CBD5E1; cursor:pointer;">
                  <input type="checkbox" id="chk-layer-360" ${this.renderer.layers.degrees360 ? 'checked' : ''} /> 360° Chu Thiên
                </label>
                <label style="display:flex; align-items:center; gap:0.4rem; color:#CBD5E1; cursor:pointer;">
                  <input type="checkbox" id="chk-layer-24" ${this.renderer.layers.mountains24 ? 'checked' : ''} /> 24 Sơn Hướng
                </label>
                <label style="display:flex; align-items:center; gap:0.4rem; color:#CBD5E1; cursor:pointer;">
                  <input type="checkbox" id="chk-layer-144" ${this.renderer.layers.waterMouth144 ? 'checked' : ''} /> 144 Thủy Khẩu
                </label>
                <label style="display:flex; align-items:center; gap:0.4rem; color:#CBD5E1; cursor:pointer;">
                  <input type="checkbox" id="chk-layer-trigrams" ${this.renderer.layers.trigrams ? 'checked' : ''} /> Bát Quái
                </label>
                <label style="display:flex; align-items:center; gap:0.4rem; color:#CBD5E1; cursor:pointer;">
                  <input type="checkbox" id="chk-layer-pointers" ${this.renderer.layers.pointers ? 'checked' : ''} /> Kim Chỉ Thị
                </label>
                <label style="display:flex; align-items:center; gap:0.4rem; color:#CBD5E1; cursor:pointer;">
                  <input type="checkbox" id="chk-layer-pin" ${this.renderer.layers.centerPin ? 'checked' : ''} /> Thiên Trì
                </label>
              </div>
            </div>

          </div>
        </div>

        <!-- MODAL XUẤT PHIẾU KHẢO SÁT PHONG THỦY -->
        <div id="modal-survey-export" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.8); z-index:9999; backdrop-filter:blur(8px); align-items:center; justify-content:center; padding:1rem;">
          <div style="background:#0F172A; border:2px solid #C5B382; border-radius:14px; max-width:640px; width:100%; max-height:90vh; overflow-y:auto; padding:1.8rem; box-shadow:0 24px 48px rgba(0,0,0,0.8);">
            <div style="text-align:center; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:1rem; margin-bottom:1.2rem;">
              <div style="font-size:0.78rem; font-weight:800; color:#F5D485; letter-spacing:0.06em; text-transform:uppercase;">
                DƯƠNG TRẠCH CHÁNH TÔNG CỔ PHÁP
              </div>
              <h2 style="font-size:1.4rem; color:#FEF3C7; margin:0.3rem 0; font-weight:800;">
                PHIẾU KHẢO SÁT LA KINH THỰC ĐỊA
              </h2>
              <div style="font-size:0.75rem; color:#94A3B8;">Chuyên gia: Thầy Huy Hoàng — Zalo: 0933116860</div>
            </div>

            <div id="survey-export-content" style="font-size:0.85rem; color:#E2E8F0; line-height:1.7; margin-bottom:1.4rem;">
              <!-- Nội dung phiếu khảo sát sẽ được render động ở đây -->
            </div>

            <div style="display:flex; justify-content:flex-end; gap:0.6rem;">
              <button type="button" id="btn-copy-survey" style="background:#1E293B; color:#FEF3C7; border:1px solid #C5B382; padding:0.5rem 1rem; border-radius:8px; font-weight:700; cursor:pointer;">
                📋 Sao Chép Kết Quả
              </button>
              <button type="button" id="btn-close-survey" style="background:#EF4444; color:#FFF; border:none; padding:0.5rem 1rem; border-radius:8px; font-weight:700; cursor:pointer;">
                Đóng
              </button>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  // ── 4. BỘ CÔNG CỤ VẼ TƯƠNG TÁC (INTERACTIVE CAD CANVAS) ──
  initInteractiveCanvas() {
    const svgOverlay = document.getElementById('dt-drawing-svg');
    if (!svgOverlay) return;

    this.renderDrawingElements();

    let isPointerDown = false;
    let dragTarget = null; // 'center', 'frontA', 'frontB', 'water_0', 'water_1', etc.

    const getSvgCoords = (e) => {
      const rect = svgOverlay.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    svgOverlay.addEventListener('mousedown', (e) => {
      const pos = getSvgCoords(e);
      if (this.activeDrawTool === 'setCenter') {
        this.centerPoint = pos;
        this.renderDrawingElements();
        this.updateSvgView();
        return;
      }

      // Check handle clicked
      const target = e.target.closest('[data-drag-handle]');
      if (target) {
        isPointerDown = true;
        dragTarget = target.dataset.dragHandle;
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (!isPointerDown || !dragTarget) return;
      const pos = getSvgCoords(e);

      if (dragTarget === 'center') {
        this.centerPoint = pos;
      } else if (dragTarget === 'frontA') {
        this.frontageLine.pA = pos;
        this.recalculateRawBearings();
      } else if (dragTarget === 'frontB') {
        this.frontageLine.pB = pos;
        this.recalculateRawBearings();
      } else if (dragTarget.startsWith('water_')) {
        const idx = parseInt(dragTarget.split('_')[1], 10);
        if (!isNaN(idx) && this.waterPolyline[idx]) {
          this.waterPolyline[idx] = pos;
        }
      }

      this.renderDrawingElements();
      this.updateMeasurementsDisplay();
    });

    window.addEventListener('mouseup', () => {
      if (isPointerDown) {
        isPointerDown = false;
        dragTarget = null;
        this.updateSvgView();
      }
    });

    // Touch support for mobile devices
    svgOverlay.addEventListener('touchstart', (e) => {
      const pos = getSvgCoords(e);
      if (this.activeDrawTool === 'setCenter') {
        this.centerPoint = pos;
        this.renderDrawingElements();
        this.updateSvgView();
        return;
      }
      const target = e.target.closest('[data-drag-handle]');
      if (target) {
        isPointerDown = true;
        dragTarget = target.dataset.dragHandle;
        e.preventDefault();
      }
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
      if (!isPointerDown || !dragTarget) return;
      const pos = getSvgCoords(e);
      if (dragTarget === 'center') {
        this.centerPoint = pos;
      } else if (dragTarget === 'frontA') {
        this.frontageLine.pA = pos;
        this.recalculateRawBearings();
      } else if (dragTarget === 'frontB') {
        this.frontageLine.pB = pos;
        this.recalculateRawBearings();
      } else if (dragTarget.startsWith('water_')) {
        const idx = parseInt(dragTarget.split('_')[1], 10);
        if (!isNaN(idx) && this.waterPolyline[idx]) {
          this.waterPolyline[idx] = pos;
        }
      }
      this.renderDrawingElements();
      this.updateMeasurementsDisplay();
      e.preventDefault();
    }, { passive: false });

    window.addEventListener('touchend', () => {
      if (isPointerDown) {
        isPointerDown = false;
        dragTarget = null;
        this.updateSvgView();
      }
    });
  }

  renderDrawingElements() {
    const svg = document.getElementById('dt-drawing-svg');
    if (!svg) return;

    if (!this.showDrawingOverlay) {
      svg.innerHTML = '';
      return;
    }

    const { pA, pB } = this.frontageLine;
    const center = this.centerPoint;

    // 1. Mặt tiền nhà (Frontage Line)
    const midFrontX = (pA.x + pB.x) / 2;
    const midFrontY = (pA.y + pB.y) / 2;

    // Pháp tuyến mặt tiền (Normal Arrow)
    const facingRad = (this.rawFacingBearing - 90) * (Math.PI / 180);
    const arrowLen = 60;
    const normalEndX = midFrontX + arrowLen * Math.cos(facingRad);
    const normalEndY = midFrontY + arrowLen * Math.sin(facingRad);

    // 2. Tuyến nước (Water Polyline)
    const polylinePoints = this.waterPolyline.map(p => `${p.x},${p.y}`).join(' ');

    const waterHandles = this.waterPolyline.map((p, idx) => {
      const isLai = idx === 0;
      const isKhu = idx === this.waterPolyline.length - 1;
      const color = isLai ? '#34D399' : (isKhu ? '#38BDF8' : '#CBD5E1');
      const label = isLai ? 'LAI' : (isKhu ? 'KHỨ' : String(idx));
      return `
        <g transform="translate(${p.x}, ${p.y})">
          <circle r="9" fill="${color}" stroke="#000" stroke-width="2" data-drag-handle="water_${idx}" style="cursor:grab;" />
          <text y="3" font-size="8" font-weight="900" fill="#000" text-anchor="middle" pointer-events="none">${label[0]}</text>
          <text y="-14" font-size="10" font-weight="800" fill="${color}" text-anchor="middle" pointer-events="none">${label}</text>
        </g>
      `;
    }).join('');

    svg.innerHTML = `
      <!-- Tuyến nước chảy -->
      <polyline points="${polylinePoints}" stroke="#38BDF8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.8" />
      <polyline points="${polylinePoints}" stroke="#0284C7" stroke-width="1.5" stroke-dasharray="6,4" fill="none" />
      ${waterHandles}

      <!-- Mặt tiền căn nhà (Đoạn A -> B) -->
      <line x1="${pA.x}" y1="${pA.y}" x2="${pB.x}" y2="${pB.y}" stroke="#F59E0B" stroke-width="5" stroke-linecap="round" />
      <line x1="${pA.x}" y1="${pA.y}" x2="${pB.x}" y2="${pB.y}" stroke="#FEF3C7" stroke-width="1.5" stroke-dasharray="4,4" />

      <!-- Mũi tên pháp tuyến Hướng nhìn nhà -->
      <line x1="${midFrontX}" y1="${midFrontY}" x2="${normalEndX}" y2="${normalEndY}" stroke="#EF4444" stroke-width="3.5" stroke-linecap="round" />
      <polygon points="${normalEndX},${normalEndY} ${normalEndX-5},${normalEndY+10} ${normalEndX+5},${normalEndY+10}" fill="#EF4444" transform="rotate(${this.rawFacingBearing + 90}, ${normalEndX}, ${normalEndY})" />
      <text x="${normalEndX}" y="${normalEndY - 12}" font-size="11" font-weight="900" fill="#EF4444" text-anchor="middle">HƯỚNG NHÀ</text>

      <!-- Điểm A và Điểm B mặt tiền -->
      <g transform="translate(${pA.x}, ${pA.y})">
        <circle r="8" fill="#F59E0B" stroke="#FFF" stroke-width="2" data-drag-handle="frontA" style="cursor:grab;" />
        <text y="-12" font-size="10" font-weight="800" fill="#F5D485" text-anchor="middle">Mép A</text>
      </g>
      <g transform="translate(${pB.x}, ${pB.y})">
        <circle r="8" fill="#F59E0B" stroke="#FFF" stroke-width="2" data-drag-handle="frontB" style="cursor:grab;" />
        <text y="-12" font-size="10" font-weight="800" fill="#F5D485" text-anchor="middle">Mép B</text>
      </g>

      <!-- Điểm Tâm Nhà (Center Anchor) -->
      <g transform="translate(${center.x}, ${center.y})">
        <circle r="10" fill="#EF4444" stroke="#FFF" stroke-width="2.5" data-drag-handle="center" style="cursor:grab;" />
        <circle r="3" fill="#FFF" pointer-events="none" />
        <text y="-15" font-size="11" font-weight="900" fill="#EF4444" text-anchor="middle">TÂM NHÀ</text>
      </g>
    `;
  }

  updateMeasurementsDisplay() {
    const facing = this.getEffectiveFacingBearing();
    const lai = this.getEffectiveLaiBearing();
    const khu = this.getEffectiveKhuBearing();

    const analysis = this.classifier.classify({
      facingBearing: facing,
      laiBearing: lai,
      khuBearing: khu,
      offset: this.calibrationOffset,
      isLocked: this.isCalibrationLocked
    });

    // Cập nhật DOM nhanh mà không render lại toàn bộ trang
    const facingEl = document.querySelector('.dt-luopan-tool-root strong[style*="#EF4444"]');
    if (facingEl) facingEl.textContent = `${analysis.facing.bearing.toFixed(1)}° (${analysis.facing.mountain.name} Sơn)`;

    const sittingEl = document.querySelector('.dt-luopan-tool-root strong[style*="#FBBF24"]');
    if (sittingEl) sittingEl.textContent = `${analysis.sitting.bearing.toFixed(1)}° (${analysis.sitting.mountain.name} Sơn)`;

    const laiEl = document.querySelector('.dt-luopan-tool-root strong[style*="#34D399"]');
    if (laiEl && analysis.lai) laiEl.textContent = `${analysis.lai.bearing.toFixed(1)}° (${analysis.lai.mountain.name})`;

    const khuEl = document.querySelector('.dt-luopan-tool-root strong[style*="#38BDF8"]');
    if (khuEl && analysis.khu) khuEl.textContent = `${analysis.khu.bearing.toFixed(1)}° (${analysis.khu.mountain.name})`;
  }

  updateSvgView() {
    const mount = document.getElementById('dt-luopan-svg-container');
    if (!mount) return;
    const facing = this.getEffectiveFacingBearing();
    const lai = this.getEffectiveLaiBearing();
    const khu = this.getEffectiveKhuBearing();

    const analysis = this.classifier.classify({
      facingBearing: facing,
      laiBearing: lai,
      khuBearing: khu,
      offset: this.calibrationOffset,
      isLocked: this.isCalibrationLocked
    });

    mount.innerHTML = this.renderer.render({
      rotation: this.viewRotation,
      houseFacing: facing,
      houseSitting: this.geometry.calculateHouseSittingBearing(facing),
      laiBearing: lai,
      khuBearing: khu,
      activeHsNum: analysis.thuyKhau ? analysis.thuyKhau.hs_num : 1,
      opacity: this.luopanOpacity
    });
  }

  bindEvents() {
    // Mode toggles
    const btnImg = document.getElementById('btn-mode-image');
    const btnMap = document.getElementById('btn-mode-map');
    if (btnImg) btnImg.addEventListener('click', () => this.switchMode('image'));
    if (btnMap) btnMap.addEventListener('click', () => this.switchMode('map'));

    // Upload Image
    const inputUpload = document.getElementById('input-upload-image');
    if (inputUpload) {
      inputUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (evt) => {
            this.imageSrc = evt.target.result;
            this.renderLayout();
            this.bindEvents();
            this.initInteractiveCanvas();
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Tool selector buttons
    const toolSelect = document.getElementById('tool-btn-select');
    const toolCenter = document.getElementById('tool-btn-center');
    const toolFrontage = document.getElementById('tool-btn-frontage');
    const toolWater = document.getElementById('tool-btn-water');

    const updateToolBtns = (activeId) => {
      [toolSelect, toolCenter, toolFrontage, toolWater].forEach(btn => {
        if (btn) btn.classList.remove('active');
      });
      const act = document.getElementById(activeId);
      if (act) act.classList.add('active');
    };

    if (toolSelect) toolSelect.addEventListener('click', () => { this.activeDrawTool = 'select'; updateToolBtns('tool-btn-select'); });
    if (toolCenter) toolCenter.addEventListener('click', () => { this.activeDrawTool = 'setCenter'; updateToolBtns('tool-btn-center'); });
    if (toolFrontage) toolFrontage.addEventListener('click', () => { this.activeDrawTool = 'drawFrontage'; updateToolBtns('tool-btn-frontage'); });
    if (toolWater) toolWater.addEventListener('click', () => { this.activeDrawTool = 'drawWater'; updateToolBtns('tool-btn-water'); });

    // Action buttons
    const btnFlipFront = document.getElementById('btn-flip-frontside');
    if (btnFlipFront) {
      btnFlipFront.addEventListener('click', () => {
        this.frontageLine.frontSide = this.frontageLine.frontSide === 'right' ? 'left' : 'right';
        this.recalculateRawBearings();
        this.renderDrawingElements();
        this.updateSvgView();
        this.updateMeasurementsDisplay();
      });
    }

    const btnReverseWater = document.getElementById('btn-reverse-water');
    if (btnReverseWater) {
      btnReverseWater.addEventListener('click', () => {
        this.waterPolyline.reverse();
        this.renderDrawingElements();
        this.updateSvgView();
        this.updateMeasurementsDisplay();
      });
    }

    const btnToggleDrawing = document.getElementById('btn-toggle-drawing');
    if (btnToggleDrawing) {
      btnToggleDrawing.addEventListener('click', () => {
        this.showDrawingOverlay = !this.showDrawingOverlay;
        btnToggleDrawing.textContent = this.showDrawingOverlay ? '👁️ Ẩn Nét Vẽ' : '👁️ Hiện Nét Vẽ';
        this.renderDrawingElements();
      });
    }

    // Viewport actions
    const btnNorthUp = document.getElementById('btn-north-up');
    if (btnNorthUp) {
      btnNorthUp.addEventListener('click', () => {
        this.viewRotation = 0;
        this.updateSvgView();
      });
    }

    const btnFacingUp = document.getElementById('btn-facing-up');
    if (btnFacingUp) {
      btnFacingUp.addEventListener('click', () => {
        this.viewRotation = this.getEffectiveFacingBearing();
        this.updateSvgView();
      });
    }

    // Opacity slider
    const sliderOpacity = document.getElementById('slider-opacity');
    if (sliderOpacity) {
      sliderOpacity.addEventListener('input', (e) => {
        this.luopanOpacity = parseFloat(e.target.value);
        this.updateSvgView();
      });
    }

    // Calibration Lock
    const btnLock = document.getElementById('btn-lock-calibration');
    const inputMeasured = document.getElementById('input-measured-bearing');
    if (btnLock && inputMeasured) {
      btnLock.addEventListener('click', () => {
        if (this.isCalibrationLocked) {
          this.isCalibrationLocked = false;
        } else {
          const val = parseFloat(inputMeasured.value);
          if (!isNaN(val)) {
            this.measuredBearing = this.geometry.normalizeBearing(val);
            this.calibrationOffset = this.geometry.computeCalibrationOffset(this.rawFacingBearing, this.measuredBearing);
            this.isCalibrationLocked = true;
          }
        }
        this.renderLayout();
        this.bindEvents();
        this.initInteractiveCanvas();
      });
    }

    // Layer checkboxes
    const layerKeys = [
      { id: 'chk-layer-360', key: 'degrees360' },
      { id: 'chk-layer-24', key: 'mountains24' },
      { id: 'chk-layer-144', key: 'waterMouth144' },
      { id: 'chk-layer-trigrams', key: 'trigrams' },
      { id: 'chk-layer-pointers', key: 'pointers' },
      { id: 'chk-layer-pin', key: 'centerPin' }
    ];

    layerKeys.forEach(({ id, key }) => {
      const chk = document.getElementById(id);
      if (chk) {
        chk.addEventListener('change', (e) => {
          this.renderer.setLayerVisibility(key, e.target.checked);
          this.updateSvgView();
        });
      }
    });

    // Modal Export Survey
    const btnExport = document.getElementById('btn-export-survey');
    const modalExport = document.getElementById('modal-survey-export');
    const btnCloseExport = document.getElementById('btn-close-survey');
    const btnCopyExport = document.getElementById('btn-copy-survey');
    const exportContent = document.getElementById('survey-export-content');

    if (btnExport && modalExport && exportContent) {
      btnExport.addEventListener('click', () => {
        const facing = this.getEffectiveFacingBearing();
        const lai = this.getEffectiveLaiBearing();
        const khu = this.getEffectiveKhuBearing();
        const analysis = this.classifier.classify({
          facingBearing: facing,
          laiBearing: lai,
          khuBearing: khu,
          offset: this.calibrationOffset,
          isLocked: this.isCalibrationLocked
        });

        const reportHtml = `
          <div style="background:#1E293B; border-radius:10px; padding:1.2rem; margin-bottom:1rem; border:1px solid rgba(255,255,255,0.08);">
            <div style="color:#FBBF24; font-weight:800; font-size:0.92rem; margin-bottom:0.6rem;">1. THÔNG SỐ KHẢO SÁT HIỆN TRƯỜNG</div>
            <div>• Trạng thái: <strong>${analysis.status.label}</strong></div>
            <div>• Hướng nhà: <strong style="color:#EF4444;">${analysis.facing.bearing.toFixed(1)}° (${analysis.facing.mountain.name} Sơn / ${analysis.facing.trigram.name} Quái)</strong></div>
            <div>• Tọa nhà: <strong style="color:#FBBF24;">${analysis.sitting.bearing.toFixed(1)}° (${analysis.sitting.mountain.name} Sơn)</strong></div>
            <div>• Cụm Song Sơn: <strong>${analysis.group.label} (${analysis.group.cuc} Cục)</strong></div>
            <div>• Lai Thủy (Nước đến): <strong>${analysis.lai ? `${analysis.lai.bearing.toFixed(1)}° (${analysis.lai.mountain.name})` : 'Chưa xác định'}</strong></div>
            <div>• Khứ Thủy (Nước đi): <strong>${analysis.khu ? `${analysis.khu.bearing.toFixed(1)}° (${analysis.khu.mountain.name})` : 'Chưa xác định'}</strong></div>
            <div>• Độ lệch hiệu chuẩn (Offset): <strong>${this.calibrationOffset >= 0 ? '+' : ''}${this.calibrationOffset.toFixed(1)}°</strong></div>
          </div>

          ${analysis.thuyKhau ? `
            <div style="background:#181F30; border-radius:10px; padding:1.2rem; border-left:4px solid #38BDF8;">
              <div style="color:#38BDF8; font-weight:800; font-size:0.92rem; margin-bottom:0.5rem;">2. PHÁN QUYẾT 144 THỦY KHẨU CHÁNH TÔNG</div>
              <div>• Khẩu khảo chứng: <strong>Khẩu #${analysis.thuyKhau.hs_num} / 144</strong></div>
              <div>• Tên thế cách: <strong style="color:#FEF3C7; font-size:1.05rem;">${analysis.thuyKhau.ten_cach}</strong> [${analysis.thuyKhau.muc_phan}]</div>
              <div>• Cửa nước thoát: <strong>Thủy xuất ${analysis.thuyKhau.thuy_xuat}</strong> (${analysis.thuyKhau.song_son_cung})</div>
              <div style="margin-top:0.6rem; color:#CBD5E1; font-size:0.8rem; line-height:1.6;">
                ${analysis.thuyKhau.muc_D}
              </div>
            </div>
          ` : ''}
        `;

        exportContent.innerHTML = reportHtml;
        modalExport.style.display = 'flex';
      });
    }

    if (btnCloseExport && modalExport) {
      btnCloseExport.addEventListener('click', () => {
        modalExport.style.display = 'none';
      });
    }

    if (btnCopyExport) {
      btnCopyExport.addEventListener('click', () => {
        const text = exportContent.innerText;
        navigator.clipboard.writeText(text).then(() => {
          btnCopyExport.textContent = '✓ Đã Sao Chép!';
          setTimeout(() => { btnCopyExport.textContent = '📋 Sao Chép Kết Quả'; }, 2000);
        });
      });
    }
  }

  switchMode(newMode) {
    if (this.mode === newMode) return;
    this.mode = newMode;
    this.renderLayout();
    this.bindEvents();
    this.initInteractiveCanvas();

    if (this.mode === 'map') {
      this.initLeafletMap();
    }
  }

  initLeafletMap() {
    const mapMount = document.getElementById('dt-map-mount');
    if (!mapMount || typeof L === 'undefined') return;

    if (!this.mapInstance) {
      this.mapInstance = L.map('dt-map-mount', {
        center: this.centerLatLng,
        zoom: 18,
        zoomControl: false
      });

      // Bản đồ vệ tinh ESRI World Imagery
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 19
      }).addTo(this.mapInstance);

      L.control.zoom({ position: 'topright' }).addTo(this.mapInstance);

      // Cập nhật tâm khi pan/zoom
      this.mapInstance.on('move', () => {
        const center = this.mapInstance.getCenter();
        this.centerLatLng = [center.lat, center.lng];
      });
    } else {
      setTimeout(() => {
        this.mapInstance.invalidateSize();
      }, 150);
    }
  }
}

window.LuopanMapTool = LuopanMapTool;
