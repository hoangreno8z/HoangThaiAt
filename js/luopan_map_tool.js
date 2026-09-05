/**
 * CÔNG CỤ LA KINH BẢN ĐỒ – 144 THỦY KHẨU (HOÀN THIỆN 100% THEO ĐẶC TẢ HỌC THUẬT)
 * Tích hợp đầy đủ:
 * 1. CalibrationEngine duy nhất, khóa cứng công thức bù sai số thực địa có dấu.
 * 2. Tách biệt 3 hệ: Raw Geometry -> Calibrated World Data -> View Transform.
 * 3. Technical Transparent SVG Overlay: nền trong suốt, vạch kỹ thuật, LOD, tâm rỗng nhìn rõ mái nhà.
 * 4. Workflow 5 bước: 1. Tâm Nhà -> 2. Mặt Tiền -> 3. Tuyến Nước -> 4. Chiều Nước -> 5. Hiệu Chuẩn.
 * 5. Panel 4 tầng logic: Phép Đo -> La Kinh -> Độ Tin Cậy / Cận Ranh -> Khảo Chứng 144 Thủy Khẩu.
 * 6. Map-Viewport Lock: Neo tâm La Kinh vào tọa độ khảo sát trên bản đồ vệ tinh.
 */

class LuopanMapTool {
  constructor() {
    this.mode = 'image'; // 'image' hoặc 'map'
    this.currentStep = 1; // 1: Tâm Nhà, 2: Mặt Tiền, 3: Tuyến Nước, 4: Chiều Nước, 5: Hiệu Chuẩn
    this.activeDrawTool = 'select'; // 'select', 'setCenter', 'drawFrontage', 'drawWater'
    this.container = null;

    // Động cơ
    this.calibEngine = window.CalibrationEngine;
    this.geometry = window.LuopanGeometry;
    this.data = window.LuopanData;
    this.STAGE_SIZE = 800;
    this.renderer = new window.LuopanSvgRenderer({ size: this.STAGE_SIZE });
    this.classifier = new window.LuopanClassifier();

    // 1. RAW GEOMETRY: Tọa độ logic chuẩn hóa 800x800
    this.centerPoint = { x: 400, y: 400 };
    this.frontageLine = {
      pA: { x: 290, y: 400 },
      pB: { x: 510, y: 400 },
      frontSide: 'right'
    };
    this.waterPolyline = [
      { x: 190, y: 220 },
      { x: 400, y: 270 },
      { x: 610, y: 580 }
    ];
    this.flowDirection = 'forward'; // 'forward' hoặc 'reverse'

    // Leaflet GIS Map
    this.mapInstance = null;
    this.surveyCenterLatLng = [21.028511, 105.854444]; // Tọa độ căn nhà trên vệ tinh
    this.zoomLevel = 19;

    // 2. CALIBRATION DATA
    this.rawFacingBearing = 180.0;
    this.measuredBearing = 180.0;
    this.calibrationOffset = 0.0;
    this.isCalibrationLocked = false;
    this.measurementTolerance = 0.30; // Sai số đo hiện trường (+/- 0.30 độ)

    // 3. VIEW TRANSFORM
    this.viewRotation = 0; // 0 = Bắc lên trên, hoặc -facing
    this.luopanOpacity = 0.85;
    this.showDrawingOverlay = true;
    this.imageSrc = null;
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

  getWaterPoints() {
    if (!this.waterPolyline || this.waterPolyline.length < 1) return { pLai: null, pKhu: null };
    const pFirst = this.waterPolyline[0];
    const pLast = this.waterPolyline[this.waterPolyline.length - 1];
    return this.flowDirection === 'forward'
      ? { pLai: pFirst, pKhu: pLast }
      : { pLai: pLast, pKhu: pFirst };
  }

  getRawLaiBearing() {
    const { pLai } = this.getWaterPoints();
    if (!pLai) return null;
    return this.geometry.calculateLineBearing(this.centerPoint, pLai);
  }

  getRawKhuBearing() {
    const { pKhu } = this.getWaterPoints();
    if (!pKhu) return null;
    return this.geometry.calculateLineBearing(this.centerPoint, pKhu);
  }

  getEffectiveFacingBearing() {
    return this.isCalibrationLocked
      ? this.calibEngine.calibrate(this.rawFacingBearing, this.calibrationOffset)
      : this.rawFacingBearing;
  }

  getEffectiveLaiBearing() {
    const rawLai = this.getRawLaiBearing();
    if (rawLai === null) return null;
    return this.isCalibrationLocked
      ? this.calibEngine.calibrate(rawLai, this.calibrationOffset)
      : rawLai;
  }

  getEffectiveKhuBearing() {
    const rawKhu = this.getRawKhuBearing();
    if (rawKhu === null) return null;
    return this.isCalibrationLocked
      ? this.calibEngine.calibrate(rawKhu, this.calibrationOffset)
      : rawKhu;
  }

  renderLayout() {
    const facing = this.getEffectiveFacingBearing();
    const lai = this.getEffectiveLaiBearing();
    const khu = this.getEffectiveKhuBearing();

    const relLai = lai !== null ? this.calibEngine.computeRelativeBearing(facing, lai) : null;
    const relKhu = khu !== null ? this.calibEngine.computeRelativeBearing(facing, khu) : null;

    const analysis = this.classifier.classify({
      facingBearing: facing,
      laiBearing: lai,
      khuBearing: khu,
      offset: this.calibrationOffset,
      isLocked: this.isCalibrationLocked,
      tolerance: this.measurementTolerance
    });

    const luopanSvgHtml = this.renderer.render({
      cx: this.centerPoint.x,
      cy: this.centerPoint.y,
      radius: 350,
      rotation: this.viewRotation,
      houseFacing: facing,
      houseSitting: this.geometry.calculateHouseSittingBearing(facing),
      laiBearing: lai,
      khuBearing: khu,
      activeHsNum: analysis.thuyKhau ? analysis.thuyKhau.hs_num : 1,
      opacity: this.luopanOpacity
    });

    const offsetFormatted = this.calibEngine.formatOffset(this.calibrationOffset);

    this.container.innerHTML = `
      <style>
        .dt-luopan-tool-root {
          box-sizing: border-box;
          width: 100%;
          max-width: 1260px;
          margin: 0 auto;
          font-family: 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #E2E8F0;
        }
        .dt-luopan-tool-root * { box-sizing: border-box; }
        .dt-workspace-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 1.2rem;
          align-items: start;
        }
        @media (max-width: 992px) {
          .dt-workspace-grid { grid-template-columns: 1fr !important; }
        }
        .dt-touch-btn {
          min-height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          padding: 0.4rem 0.75rem;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.8rem;
          cursor: pointer;
          touch-action: manipulation;
          transition: background 0.15s ease, transform 0.1s ease;
          user-select: none;
          -webkit-user-select: none;
        }
        .dt-touch-btn:active { transform: scale(0.97); }
        .dt-workflow-steps {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
        }
        .dt-step-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.65rem;
          border-radius: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.12);
          background: #1E293B;
          color: #CBD5E1;
        }
        .dt-step-badge.active {
          background: #F59E0B;
          color: #000;
          border-color: #FBBF24;
        }
        .dt-floating-bottom-bar {
          position: absolute;
          bottom: 12px;
          left: 12px;
          right: 12px;
          z-index: 25;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          background: rgba(15, 23, 42, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 0.4rem 0.75rem;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
        }
        .dt-stage-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          max-height: min(85vw, 680px);
          background: #080C14;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 12px 36px rgba(0,0,0,0.6);
          touch-action: none;
          user-select: none;
          -webkit-user-select: none;
        }
        .dt-panel-section {
          background: #111827;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 1rem;
        }
        .dt-panel-title {
          font-size: 0.85rem;
          font-weight: 800;
          margin-bottom: 0.65rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          text-transform: uppercase;
        }
      </style>

      <div class="dt-luopan-tool-root" style="display:flex; flex-direction:column; gap:1rem;">
        
        <!-- 1. TOP HEADER & STATUS BAR -->
        <header style="background:#0D111A; border:1px solid #C5B382; border-radius:12px; padding:0.85rem 1.2rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; box-shadow:0 8px 24px rgba(0,0,0,0.4);">
          <div>
            <div style="display:inline-flex; align-items:center; gap:0.4rem; padding:0.15rem 0.5rem; background:rgba(197,179,130,0.15); border:1px solid rgba(197,179,130,0.3); border-radius:6px; font-size:0.72rem; font-weight:700; color:#F5D485; margin-bottom:0.2rem;">
              <span>🧭</span> LA KINH BẢN ĐỒ CÓ HIỆU CHUẨN THỰC ĐỊA
            </div>
            <h2 style="margin:0; font-size:1.18rem; color:#FEF3C7; font-weight:800;">
              Hệ Thống Đo Đạc Không Gian & Khảo Khẩu
            </h2>
          </div>

          <div style="display:flex; align-items:center; gap:0.6rem; flex-wrap:wrap;">
            <div style="background:${analysis.status.color}22; color:${analysis.status.color}; border:1px solid ${analysis.status.color}55; font-size:0.78rem; font-weight:700; padding:0.35rem 0.75rem; border-radius:8px;">
              ${analysis.status.label}
            </div>

            <div style="display:flex; gap:0.25rem; background:#1E293B; padding:0.2rem; border-radius:8px; border:1px solid rgba(255,255,255,0.1);">
              <button type="button" id="btn-mode-image" class="dt-touch-btn" style="background:${this.mode === 'image' ? '#FBBF24' : 'transparent'}; color:${this.mode === 'image' ? '#000' : '#CBD5E1'}; border:none; min-height:34px; padding:0.25rem 0.65rem;">
                📷 Tải Ảnh / CAD
              </button>
              <button type="button" id="btn-mode-map" class="dt-touch-btn" style="background:${this.mode === 'map' ? '#38BDF8' : 'transparent'}; color:${this.mode === 'map' ? '#000' : '#CBD5E1'}; border:none; min-height:34px; padding:0.25rem 0.65rem;">
                🗺️ Bản Đồ Vệ Tinh
              </button>
            </div>
          </div>
        </header>

        <!-- 2. WORKFLOW 5 BƯỚC THAO TÁC THỰC CHIẾN -->
        <nav style="background:#141B2B; border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:0.65rem 0.9rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem;">
          
          <div class="dt-workflow-steps">
            <span style="font-size:0.72rem; color:#94A3B8; font-weight:700; text-transform:uppercase; margin-right:0.2rem;">Quy trình:</span>
            
            <button type="button" id="step-btn-1" class="dt-step-badge ${this.activeDrawTool === 'setCenter' ? 'active' : ''}">
              1. 📍 Tâm Nhà
            </button>

            <button type="button" id="step-btn-2" class="dt-step-badge ${this.activeDrawTool === 'drawFrontage' ? 'active' : ''}">
              2. 📐 Mặt Tiền
            </button>

            <button type="button" id="step-btn-3" class="dt-step-badge ${this.activeDrawTool === 'drawWater' ? 'active' : ''}">
              3. 🌊 Tuyến Nước
            </button>

            <button type="button" id="btn-reverse-water" class="dt-step-badge" style="color:#38BDF8; border-color:rgba(56,189,248,0.3);">
              4. 🔄 Chiều Nước (${this.flowDirection === 'forward' ? 'Tả ➔ Hữu' : 'Hữu ➔ Tả'})
            </button>

            <button type="button" id="step-btn-select" class="dt-step-badge ${this.activeDrawTool === 'select' ? 'active' : ''}">
              🖱️ Chọn / Kéo
            </button>
          </div>

          <div style="display:flex; align-items:center; gap:0.4rem; flex-wrap:wrap;">
            <button type="button" id="btn-flip-frontside" class="dt-touch-btn" style="background:#1E293B; color:#FEF3C7; border:1px solid rgba(197,179,130,0.35);">
              ⇄ Đảo phía hướng nhà
            </button>
            <button type="button" id="btn-export-survey" class="dt-touch-btn" style="background:#059669; color:#FFF; border:none;">
              📥 Xuất Phiếu Khảo Sát
            </button>
          </div>
        </nav>

        <!-- 3. MAIN WORKSPACE GRID -->
        <div class="dt-workspace-grid">
          
          <!-- LEFT: INTERACTIVE CAD & LUOPAN CANVAS -->
          <div class="dt-stage-wrapper" id="dt-interactive-stage">
            
            <!-- LAYER 0: MAP OR IMAGE BACKGROUND -->
            <div id="dt-workspace-viewport" style="position:absolute; inset:0; overflow:hidden; display:flex; justify-content:center; align-items:center;">
              ${this.mode === 'image' && this.imageSrc ? `
                <img id="dt-user-img" src="${this.imageSrc}" style="width:100%; height:100%; object-fit:contain; opacity:0.65; pointer-events:none;" />
              ` : `
                <div id="dt-map-mount" style="position:absolute; inset:0; ${this.mode === 'map' ? 'z-index:1;' : 'display:none;'}"></div>
                ${!this.imageSrc && this.mode === 'image' ? `
                  <div style="text-align:center; color:#64748B; padding:1.5rem; z-index:2;">
                    <div style="font-size:2.8rem; margin-bottom:0.4rem;">🛰️</div>
                    <p style="font-size:0.9rem; margin-bottom:0.6rem; color:#FEF3C7; font-weight:700;">Chưa tải ảnh nền thực địa</p>
                    <p style="font-size:0.78rem; margin-bottom:1rem; max-width:360px; color:#94A3B8; line-height:1.5;">Tải ảnh vệ tinh Google Maps hoặc bản vẽ CAD mặt bằng để đo đạc góc tương đối.</p>
                    <label class="dt-touch-btn" style="background:#1E293B; color:#FEF3C7; border:1px solid #C5B382;">
                      <span>📁</span> Chọn Ảnh Vệ Tinh / CAD
                      <input type="file" id="input-upload-image" accept="image/*" style="display:none;" />
                    </label>
                  </div>
                ` : ''}
              `}
            </div>

            <!-- LAYER 1: TECHNICAL TRANSPARENT LUOPAN SVG (TÂM KHÓA TRÙNG TÂM NHÀ) -->
            <div id="dt-luopan-svg-container" style="position:absolute; inset:0; width:100%; height:100%; z-index:10; pointer-events:none; transition:opacity 0.15s ease-out;">
              ${luopanSvgHtml}
            </div>

            <!-- LAYER 2: INTERACTIVE CAD DRAWING OVERLAY -->
            <svg id="dt-drawing-svg" viewBox="0 0 ${this.STAGE_SIZE} ${this.STAGE_SIZE}" preserveAspectRatio="xMidYMid meet" style="position:absolute; inset:0; width:100%; height:100%; z-index:15; pointer-events:auto; touch-action:none;"></svg>

            <!-- FLOATING BOTTOM BAR -->
            <div class="dt-floating-bottom-bar">
              <div style="display:flex; align-items:center; gap:0.4rem; flex-wrap:wrap;">
                <button type="button" id="btn-north-up" class="dt-touch-btn" style="background:#1E293B; color:#FEF3C7; border:1px solid rgba(255,255,255,0.12);">
                  🧭 Bắc Lên
                </button>
                <button type="button" id="btn-facing-up" class="dt-touch-btn" style="background:#1E293B; color:#38BDF8; border:1px solid rgba(56,189,248,0.35);">
                  🏠 Hướng Lên
                </button>
                <button type="button" id="btn-toggle-drawing" class="dt-touch-btn" style="background:#1E293B; color:#CBD5E1; border:1px solid rgba(255,255,255,0.12);">
                  ${this.showDrawingOverlay ? '👁️ Ẩn Nét' : '👁️ Nét Vẽ'}
                </button>
              </div>

              <div style="display:flex; align-items:center; gap:0.4rem; font-size:0.74rem; color:#94A3B8;">
                <span>Độ mờ:</span>
                <input type="range" id="slider-opacity" min="0.1" max="1.0" step="0.05" value="${this.luopanOpacity}" style="width:70px; cursor:pointer; accent-color:#F59E0B;" />
              </div>
            </div>
          </div>

          <!-- RIGHT: PANEL BỐN TẦNG LOGIC CHUẨN MỰC HỌC THUẬT -->
          <div style="display:flex; flex-direction:column; gap:0.85rem;">
            
            <!-- TẦNG 0: BẢNG HIỆU CHUẨN THỰC ĐỊA -->
            <div class="dt-panel-section" style="border-color:${this.isCalibrationLocked ? '#10B981' : '#F59E0B'};">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
                <div class="dt-panel-title" style="color:#FEF3C7; margin-bottom:0;">
                  <span>⚖️</span> HIỆU CHUẨN LA KINH
                </div>
                <span style="font-size:0.72rem; padding:0.15rem 0.5rem; border-radius:6px; font-weight:700; background:${this.isCalibrationLocked ? '#10B98122' : '#F59E0B22'}; color:${this.isCalibrationLocked ? '#10B981' : '#F59E0B'};">
                  ${this.isCalibrationLocked ? 'ĐÃ KHÓA' : 'CHƯA KHÓA'}
                </span>
              </div>

              <div style="font-size:0.78rem; color:#94A3B8; margin-bottom:0.65rem; line-height:1.4;">
                Nhập số đo Hướng Nhà thực địa của Thầy để khóa mốc chuẩn tuyệt đối.
              </div>

              <div style="display:flex; gap:0.45rem; margin-bottom:0.65rem;">
                <input type="number" id="input-measured-bearing" value="${this.measuredBearing.toFixed(1)}" step="0.1" min="0" max="360" ${this.isCalibrationLocked ? 'disabled' : ''} style="flex:1; background:#1E293B; border:1px solid rgba(255,255,255,0.18); border-radius:8px; padding:0.45rem 0.7rem; color:#FEF3C7; font-size:0.9rem; font-weight:700;" placeholder="Độ (0-360)" />
                <button type="button" id="btn-lock-calibration" class="dt-touch-btn" style="background:${this.isCalibrationLocked ? '#EF4444' : '#10B981'}; color:#FFF; border:none; padding:0.45rem 0.9rem;">
                  ${this.isCalibrationLocked ? 'Mở Khóa' : 'Khóa Chuẩn'}
                </button>
              </div>

              <div style="background:#0D111A; border-radius:8px; padding:0.55rem 0.75rem; font-size:0.75rem; display:grid; grid-template-columns:1fr 1fr; gap:0.35rem;">
                <div>Hướng Map: <strong style="color:#FEF3C7;">${this.rawFacingBearing.toFixed(2)}°</strong></div>
                <div>Hiệu chỉnh: <strong style="color:#10B981;">${offsetFormatted}</strong></div>
              </div>
            </div>

            <!-- TẦNG 1: PHÉP ĐO (MEASUREMENTS) -->
            <div class="dt-panel-section">
              <div class="dt-panel-title" style="color:#FEF3C7;">
                <span>📐</span> 1. PHÉP ĐO
              </div>

              <div style="display:flex; flex-direction:column; gap:0.4rem; font-size:0.78rem;">
                <div style="display:flex; justify-content:space-between; padding:0.3rem 0.5rem; background:#1E293B; border-radius:6px;">
                  <span style="color:#EF4444; font-weight:700;">Hướng Nhà:</span>
                  <strong style="color:#EF4444;">${facing.toFixed(2)}°</strong>
                </div>

                <div style="display:flex; justify-content:space-between; padding:0.3rem 0.5rem; background:#1E293B; border-radius:6px;">
                  <span style="color:#FBBF24; font-weight:700;">Tọa Nhà:</span>
                  <strong style="color:#FBBF24;">${analysis.sitting.bearing.toFixed(2)}°</strong>
                </div>

                <div style="display:flex; flex-direction:column; gap:0.15rem; padding:0.3rem 0.5rem; background:#1E293B; border-radius:6px;">
                  <div style="display:flex; justify-content:space-between;">
                    <span style="color:#34D399; font-weight:700;">Lai Thủy (Đến):</span>
                    <strong style="color:#34D399;">${lai !== null ? `${lai.toFixed(2)}°` : 'Chưa đo'}</strong>
                  </div>
                  ${relLai !== null ? `
                    <div style="font-size:0.72rem; color:#94A3B8; padding-left:0.3rem;">
                      ↳ So với hướng nhà: <strong style="color:#34D399;">${relLai >= 0 ? '+' : ''}${relLai.toFixed(2)}° (${relLai >= 0 ? 'lệch phải' : 'lệch trái'})</strong>
                    </div>
                  ` : ''}
                </div>

                <div style="display:flex; flex-direction:column; gap:0.15rem; padding:0.3rem 0.5rem; background:#1E293B; border-radius:6px;">
                  <div style="display:flex; justify-content:space-between;">
                    <span style="color:#38BDF8; font-weight:700;">Khứ Thủy (Đi):</span>
                    <strong style="color:#38BDF8;">${khu !== null ? `${khu.toFixed(2)}°` : 'Chưa đo'}</strong>
                  </div>
                  ${relKhu !== null ? `
                    <div style="font-size:0.72rem; color:#94A3B8; padding-left:0.3rem;">
                      ↳ So với hướng nhà: <strong style="color:#38BDF8;">${relKhu >= 0 ? '+' : ''}${relKhu.toFixed(2)}° (${relKhu >= 0 ? 'lệch phải' : 'lệch trái'})</strong>
                    </div>
                  ` : ''}
                </div>
              </div>
            </div>

            <!-- TẦNG 2: LA KINH (LUOPAN ATTRIBUTES) -->
            <div class="dt-panel-section">
              <div class="dt-panel-title" style="color:#F5D485;">
                <span>🧭</span> 2. LA KINH CHÁNH TÔNG
              </div>

              <div style="display:flex; flex-direction:column; gap:0.4rem; font-size:0.78rem;">
                <div style="display:flex; justify-content:space-between; padding:0.3rem 0.5rem; background:#1E293B; border-radius:6px;">
                  <span>Hướng Sơn:</span>
                  <strong style="color:#FEF3C7;">${analysis.facing.mountain.name} Sơn (${analysis.facing.mountain.element}) / ${this.data.getTrigram(facing).trigram.name} Quái</strong>
                </div>

                <div style="display:flex; justify-content:space-between; padding:0.3rem 0.5rem; background:#1E293B; border-radius:6px;">
                  <span>Tọa Sơn:</span>
                  <strong style="color:#FEF3C7;">${analysis.sitting.mountain.name} Sơn</strong>
                </div>

                <div style="display:flex; justify-content:space-between; padding:0.3rem 0.5rem; background:#1E293B; border-radius:6px;">
                  <span>Lai Sơn:</span>
                  <strong style="color:#34D399;">${analysis.lai ? `${analysis.lai.mountain.name} Sơn` : 'Chưa đo'}</strong>
                </div>

                <div style="display:flex; justify-content:space-between; padding:0.3rem 0.5rem; background:#1E293B; border-radius:6px;">
                  <span>Khứ Sơn:</span>
                  <strong style="color:#38BDF8;">${analysis.khu ? `${analysis.khu.mountain.name} Sơn` : 'Chưa đo'}</strong>
                </div>

                <div style="display:flex; justify-content:space-between; padding:0.3rem 0.5rem; background:#141B2B; border-radius:6px;">
                  <span>Cụm Song Sơn:</span>
                  <strong style="color:#FEF3C7;">${analysis.group.label} (${analysis.group.cuc} Cục)</strong>
                </div>
              </div>
            </div>

            <!-- TẦNG 3: ĐỘ TIN CẬY & CẬN BIÊN (UNCERTAINTY & BOUNDARY) -->
            <div class="dt-panel-section">
              <div class="dt-panel-title" style="color:#CBD5E1;">
                <span>🔍</span> 3. ĐỘ TIN CẬY & RANH PHÂN KIM
              </div>

              <div style="display:flex; flex-direction:column; gap:0.35rem; font-size:0.75rem;">
                <div style="display:flex; justify-content:space-between;">
                  <span>Sai số đo La Kinh nhập:</span>
                  <strong>±${this.measurementTolerance.toFixed(2)}°</strong>
                </div>

                <div style="display:flex; justify-content:space-between;">
                  <span>Cách ranh Hướng Nhà:</span>
                  <strong style="color:${analysis.facing.distanceToBoundary <= 0.3 ? '#FB7185' : '#10B981'};">${analysis.facing.distanceToBoundary.toFixed(2)}°</strong>
                </div>

                ${analysis.lai ? `
                  <div style="display:flex; justify-content:space-between;">
                    <span>Cách ranh Lai Thủy:</span>
                    <strong style="color:${analysis.lai.distanceToBoundary <= 0.3 ? '#FB7185' : '#10B981'};">${analysis.lai.distanceToBoundary.toFixed(2)}°</strong>
                  </div>
                ` : ''}

                ${analysis.khu ? `
                  <div style="display:flex; justify-content:space-between;">
                    <span>Cách ranh Khứ Thủy:</span>
                    <strong style="color:${analysis.khu.distanceToBoundary <= 0.3 ? '#FB7185' : '#10B981'};">${analysis.khu.distanceToBoundary.toFixed(2)}°</strong>
                  </div>
                ` : ''}

                ${analysis.status.isSensitive ? `
                  <div style="background:#450A0A; border:1px solid #EF4444; border-radius:6px; padding:0.45rem 0.6rem; color:#FECACA; font-size:0.73rem; margin-top:0.3rem; line-height:1.4;">
                    ⚠️ <strong>KẾT QUẢ NHẠY VỚI SAI SỐ:</strong> Phương vị nằm rất gần vách ngăn phân kim (≤ 0.30°). Khi sai số dao động có thể chuyển sang Sơn lân cận: [${[...new Set([...analysis.facing.possibleMountains, ...(analysis.khu ? analysis.khu.possibleMountains : [])])].join(' / ')}]. Cần đo lại cẩn thận tại hiện trường.
                  </div>
                ` : ''}
              </div>
            </div>

            <!-- TẦNG 4: KHẢO CHỨNG 144 THỦY KHẨU (CHỈ HIỂN THỊ SAU KHI ĐÃ KHÓA HIỆU CHUẨN) -->
            <div class="dt-panel-section">
              <div class="dt-panel-title" style="color:#38BDF8;">
                <span>📜</span> 4. 144 THỦY KHẨU CHÁNH TÔNG
              </div>

              ${!this.isCalibrationLocked ? `
                <div style="text-align:center; padding:0.8rem; color:#94A3B8; font-size:0.76rem; line-height:1.5;">
                  🔒 <em>Vui lòng nhập số đo La Kinh và nhấn <strong>Khóa Chuẩn</strong> để kích hoạt động cơ đối chiếu 144 Thủy Khẩu Chánh Tông.</em>
                </div>
              ` : (analysis.thuyKhau ? `
                <div style="background:#181F30; border-radius:8px; padding:0.75rem; border-left:3px solid #F59E0B; margin-bottom:0.5rem;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.3rem;">
                    <span style="font-size:0.75rem; color:#94A3B8; font-weight:700;">KHẨU #${analysis.thuyKhau.hs_num} / 144</span>
                    <span style="font-size:0.72rem; padding:0.15rem 0.45rem; border-radius:4px; font-weight:700; background:#F59E0B22; color:#FBBF24;">
                      ${analysis.thuyKhau.muc_phan}
                    </span>
                  </div>
                  <div style="font-size:0.92rem; font-weight:800; color:#FEF3C7; margin-bottom:0.25rem;">
                    ${analysis.thuyKhau.ten_cach}
                  </div>
                  <div style="font-size:0.74rem; color:#CBD5E1; line-height:1.5; margin-bottom:0.4rem;">
                    ${analysis.thuyKhau.muc_B}
                  </div>
                  <div style="font-size:0.7rem; color:#94A3B8; font-style:italic;">
                    ${analysis.thuyKhau.source}
                  </div>
                </div>

                <a href="#/corpus/topic-21" style="display:inline-flex; align-items:center; justify-content:center; width:100%; padding:0.45rem; background:#1E293B; color:#FEF3C7; border:1px solid #C5B382; border-radius:8px; text-decoration:none; font-size:0.76rem; font-weight:700;">
                  📖 Đọc Toàn Văn Khảo Chứng Cổ Thư →
                </a>
              ` : `
                <div style="padding:0.6rem; color:#CBD5E1; font-size:0.76rem; line-height:1.5; background:#1E293B; border-radius:6px;">
                  ${analysis.matchTrace.map(t => `<div>• ${t}</div>`).join('')}
                </div>
              `)}
            </div>

          </div>
        </div>

        <!-- 4. MODAL XUẤT PHIẾU KHẢO SÁT HIỆN TRƯỜNG -->
        <div id="modal-survey-export" style="display:none; position:fixed; inset:0; z-index:9999; background:rgba(0,0,0,0.85); backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); justify-content:center; align-items:center; padding:1rem;">
          <div style="background:#0F172A; border:1px solid #C5B382; border-radius:14px; width:100%; max-width:640px; max-height:85vh; overflow-y:auto; -webkit-overflow-scrolling:touch; padding:1.3rem; box-shadow:0 20px 50px rgba(0,0,0,0.8);">
            
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.12); padding-bottom:0.8rem; margin-bottom:1rem;">
              <h3 style="margin:0; font-size:1.15rem; color:#FEF3C7; font-weight:800; display:flex; align-items:center; gap:0.5rem;">
                <span>📋</span> PHIẾU KHẢO SÁT PHONG THỦY THỰC ĐỊA
              </h3>
              <button type="button" id="btn-close-survey-x" style="background:transparent; border:none; color:#94A3B8; font-size:1.4rem; cursor:pointer; padding:0.2rem 0.5rem;">✕</button>
            </div>

            <div id="survey-export-content" style="font-size:0.84rem; color:#E2E8F0; line-height:1.7; margin-bottom:1.2rem;"></div>

            <div style="display:flex; justify-content:flex-end; gap:0.6rem; flex-wrap:wrap;">
              <button type="button" id="btn-copy-survey" class="dt-touch-btn" style="background:#1E293B; color:#FEF3C7; border:1px solid #C5B382; padding:0.5rem 1.1rem;">
                📋 Sao Chép Báo Cáo
              </button>
              <button type="button" id="btn-close-survey" class="dt-touch-btn" style="background:#EF4444; color:#FFF; border:none; padding:0.5rem 1.1rem;">
                Đóng
              </button>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  initInteractiveCanvas() {
    const svgOverlay = document.getElementById('dt-drawing-svg');
    if (!svgOverlay) return;

    this.renderDrawingElements();

    let isPointerDown = false;
    let dragTarget = null;

    const getSvgCoords = (e) => {
      const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;

      try {
        const pt = svgOverlay.createSVGPoint();
        pt.x = clientX;
        pt.y = clientY;
        const ctm = svgOverlay.getScreenCTM();
        if (ctm) {
          const transformed = pt.matrixTransform(ctm.inverse());
          return {
            x: Math.round(transformed.x),
            y: Math.round(transformed.y)
          };
        }
      } catch (err) {}

      const rect = svgOverlay.getBoundingClientRect();
      const scaleX = this.STAGE_SIZE / rect.width;
      const scaleY = this.STAGE_SIZE / rect.height;
      return {
        x: Math.round((clientX - rect.left) * scaleX),
        y: Math.round((clientY - rect.top) * scaleY)
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

    svgOverlay.addEventListener('touchstart', (e) => {
      const pos = getSvgCoords(e);
      if (this.activeDrawTool === 'setCenter') {
        this.centerPoint = pos;
        this.renderDrawingElements();
        this.updateSvgView();
        e.preventDefault();
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

    // 1. Mặt tiền nhà
    const midFrontX = (pA.x + pB.x) / 2;
    const midFrontY = (pA.y + pB.y) / 2;

    const facingRad = (this.rawFacingBearing - 90) * (Math.PI / 180);
    const arrowLen = 70;
    const normalEndX = midFrontX + arrowLen * Math.cos(facingRad);
    const normalEndY = midFrontY + arrowLen * Math.sin(facingRad);

    // 2. Tuyến nước
    const polylinePoints = this.waterPolyline.map(p => `${p.x},${p.y}`).join(' ');

    const waterHandles = this.waterPolyline.map((p, idx) => {
      const isFirst = idx === 0;
      const isLast = idx === this.waterPolyline.length - 1;
      
      let isLai = false;
      let isKhu = false;
      if (this.flowDirection === 'forward') {
        isLai = isFirst;
        isKhu = isLast;
      } else {
        isLai = isLast;
        isKhu = isFirst;
      }

      const color = isLai ? '#34D399' : (isKhu ? '#38BDF8' : '#CBD5E1');
      const label = isLai ? 'LAI' : (isKhu ? 'KHỨ' : String(idx));
      return `
        <g transform="translate(${p.x}, ${p.y})">
          <circle r="24" fill="transparent" data-drag-handle="water_${idx}" style="cursor:grab; touch-action:none;" />
          <circle r="11" fill="${color}" stroke="#000" stroke-width="2.5" pointer-events="none" />
          <text y="4" font-size="9" font-weight="900" fill="#000" text-anchor="middle" pointer-events="none">${label[0]}</text>
          <text y="-16" font-size="11" font-weight="800" fill="${color}" text-anchor="middle" pointer-events="none">${label}</text>
        </g>
      `;
    }).join('');

    svg.innerHTML = `
      <!-- Tuyến nước -->
      <polyline points="${polylinePoints}" stroke="#38BDF8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.8" />
      <polyline points="${polylinePoints}" stroke="#0284C7" stroke-width="1.5" stroke-dasharray="6,4" fill="none" />
      ${waterHandles}

      <!-- Mặt tiền căn nhà (Đoạn A -> B) -->
      <line x1="${pA.x}" y1="${pA.y}" x2="${pB.x}" y2="${pB.y}" stroke="#F59E0B" stroke-width="6" stroke-linecap="round" />
      <line x1="${pA.x}" y1="${pA.y}" x2="${pB.x}" y2="${pB.y}" stroke="#FEF3C7" stroke-width="1.8" stroke-dasharray="5,4" />

      <!-- Pháp tuyến hướng nhìn nhà -->
      <line x1="${midFrontX}" y1="${midFrontY}" x2="${normalEndX}" y2="${normalEndY}" stroke="#EF4444" stroke-width="4" stroke-linecap="round" />
      <polygon points="${normalEndX},${normalEndY} ${normalEndX-6},${normalEndY+12} ${normalEndX+6},${normalEndY+12}" fill="#EF4444" transform="rotate(${this.rawFacingBearing + 90}, ${normalEndX}, ${normalEndY})" />
      <text x="${normalEndX}" y="${normalEndY - 14}" font-size="12" font-weight="900" fill="#EF4444" text-anchor="middle">HƯỚNG NHÀ</text>

      <!-- Điểm A và Điểm B -->
      <g transform="translate(${pA.x}, ${pA.y})">
        <circle r="24" fill="transparent" data-drag-handle="frontA" style="cursor:grab; touch-action:none;" />
        <circle r="10" fill="#F59E0B" stroke="#FFF" stroke-width="2.5" pointer-events="none" />
        <text y="-14" font-size="11" font-weight="800" fill="#F5D485" text-anchor="middle" pointer-events="none">Mép A</text>
      </g>
      <g transform="translate(${pB.x}, ${pB.y})">
        <circle r="24" fill="transparent" data-drag-handle="frontB" style="cursor:grab; touch-action:none;" />
        <circle r="10" fill="#F59E0B" stroke="#FFF" stroke-width="2.5" pointer-events="none" />
        <text y="-14" font-size="11" font-weight="800" fill="#F5D485" text-anchor="middle" pointer-events="none">Mép B</text>
      </g>

      <!-- Điểm Tâm Nhà -->
      <g transform="translate(${center.x}, ${center.y})">
        <circle r="24" fill="transparent" data-drag-handle="center" style="cursor:grab; touch-action:none;" />
        <circle r="12" fill="#EF4444" stroke="#FFF" stroke-width="3" pointer-events="none" />
        <circle r="4" fill="#FFF" pointer-events="none" />
        <text y="-18" font-size="12" font-weight="900" fill="#EF4444" text-anchor="middle" pointer-events="none">TÂM NHÀ</text>
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
      isLocked: this.isCalibrationLocked,
      tolerance: this.measurementTolerance
    });

    const facingEl = document.querySelector('.dt-luopan-tool-root strong[style*="#EF4444"]');
    if (facingEl) facingEl.textContent = `${facing.toFixed(2)}°`;

    const sittingEl = document.querySelector('.dt-luopan-tool-root strong[style*="#FBBF24"]');
    if (sittingEl) sittingEl.textContent = `${analysis.sitting.bearing.toFixed(2)}°`;

    const laiEl = document.querySelector('.dt-luopan-tool-root strong[style*="#34D399"]');
    if (laiEl && analysis.lai) laiEl.textContent = `${analysis.lai.bearing.toFixed(2)}°`;

    const khuEl = document.querySelector('.dt-luopan-tool-root strong[style*="#38BDF8"]');
    if (khuEl && analysis.khu) khuEl.textContent = `${analysis.khu.bearing.toFixed(2)}°`;
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
      isLocked: this.isCalibrationLocked,
      tolerance: this.measurementTolerance
    });

    mount.innerHTML = this.renderer.render({
      cx: this.centerPoint.x,
      cy: this.centerPoint.y,
      radius: 350,
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
    const btnImg = document.getElementById('btn-mode-image');
    const btnMap = document.getElementById('btn-mode-map');
    if (btnImg) btnImg.addEventListener('click', () => this.switchMode('image'));
    if (btnMap) btnMap.addEventListener('click', () => this.switchMode('map'));

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

    // Workflow Step Buttons
    const step1 = document.getElementById('step-btn-1');
    const step2 = document.getElementById('step-btn-2');
    const step3 = document.getElementById('step-btn-3');
    const stepSelect = document.getElementById('step-btn-select');

    const updateStepBadges = (activeBtn) => {
      [step1, step2, step3, stepSelect].forEach(btn => {
        if (btn) btn.classList.remove('active');
      });
      if (activeBtn) activeBtn.classList.add('active');
    };

    if (step1) step1.addEventListener('click', () => { this.activeDrawTool = 'setCenter'; updateStepBadges(step1); });
    if (step2) step2.addEventListener('click', () => { this.activeDrawTool = 'drawFrontage'; updateStepBadges(step2); });
    if (step3) step3.addEventListener('click', () => { this.activeDrawTool = 'drawWater'; updateStepBadges(step3); });
    if (stepSelect) stepSelect.addEventListener('click', () => { this.activeDrawTool = 'select'; updateStepBadges(stepSelect); });

    // Đảo phía hướng nhà
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

    // Đảo chiều nước
    const btnReverseWater = document.getElementById('btn-reverse-water');
    if (btnReverseWater) {
      btnReverseWater.addEventListener('click', () => {
        this.flowDirection = this.flowDirection === 'forward' ? 'reverse' : 'forward';
        btnReverseWater.textContent = `4. 🔄 Chiều Nước (${this.flowDirection === 'forward' ? 'Tả ➔ Hữu' : 'Hữu ➔ Tả'})`;
        this.renderDrawingElements();
        this.updateSvgView();
        this.updateMeasurementsDisplay();
      });
    }

    const btnToggleDrawing = document.getElementById('btn-toggle-drawing');
    if (btnToggleDrawing) {
      btnToggleDrawing.addEventListener('click', () => {
        this.showDrawingOverlay = !this.showDrawingOverlay;
        btnToggleDrawing.textContent = this.showDrawingOverlay ? '👁️ Ẩn Nét' : '👁️ Nét Vẽ';
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

    const sliderOpacity = document.getElementById('slider-opacity');
    if (sliderOpacity) {
      sliderOpacity.addEventListener('input', (e) => {
        this.luopanOpacity = parseFloat(e.target.value);
        this.updateSvgView();
      });
    }

    // Khóa hiệu chuẩn
    const btnLock = document.getElementById('btn-lock-calibration');
    const inputMeasured = document.getElementById('input-measured-bearing');
    if (btnLock && inputMeasured) {
      btnLock.addEventListener('click', () => {
        if (this.isCalibrationLocked) {
          this.isCalibrationLocked = false;
        } else {
          const val = parseFloat(inputMeasured.value);
          if (!isNaN(val)) {
            this.measuredBearing = this.calibEngine.normalize360(val);
            this.calibrationOffset = this.calibEngine.computeOffset(this.rawFacingBearing, this.measuredBearing);
            this.isCalibrationLocked = true;
          }
        }
        this.renderLayout();
        this.bindEvents();
        this.initInteractiveCanvas();
      });
    }

    // Modal Export Survey
    const btnExport = document.getElementById('btn-export-survey');
    const modalExport = document.getElementById('modal-survey-export');
    const btnCloseExport = document.getElementById('btn-close-survey');
    const btnCloseExportX = document.getElementById('btn-close-survey-x');
    const btnCopyExport = document.getElementById('btn-copy-survey');
    const exportContent = document.getElementById('survey-export-content');

    if (btnExport && modalExport && exportContent) {
      btnExport.addEventListener('click', () => {
        const facing = this.getEffectiveFacingBearing();
        const lai = this.getEffectiveLaiBearing();
        const khu = this.getEffectiveKhuBearing();
        const relLai = lai !== null ? this.calibEngine.computeRelativeBearing(facing, lai) : null;
        const relKhu = khu !== null ? this.calibEngine.computeRelativeBearing(facing, khu) : null;

        const analysis = this.classifier.classify({
          facingBearing: facing,
          laiBearing: lai,
          khuBearing: khu,
          offset: this.calibrationOffset,
          isLocked: this.isCalibrationLocked,
          tolerance: this.measurementTolerance
        });

        const reportHtml = `
          <div style="background:#1E293B; border-radius:10px; padding:1.2rem; margin-bottom:1rem; border:1px solid rgba(255,255,255,0.08);">
            <div style="color:#FBBF24; font-weight:800; font-size:0.92rem; margin-bottom:0.6rem;">1. THÔNG SỐ KHẢO SÁT HIỆN TRƯỜNG</div>
            <div>• Trạng thái: <strong>${this.isCalibrationLocked ? '✓ ĐÃ HIỆU CHUẨN LA KINH CHÍNH XÁC' : 'KẾT QUẢ TẠM THỜI (CHƯA HIỆU CHUẨN)'}</strong></div>
            <div>• Hướng nhà thực đo: <strong style="color:#EF4444;">${facing.toFixed(2)}° (${analysis.facing.mountain.name} Sơn / ${this.data.getTrigram(facing).trigram.name} Quái)</strong></div>
            <div>• Hướng trên bản vẽ (RAW): <strong>${this.rawFacingBearing.toFixed(2)}°</strong></div>
            <div>• Độ bù hiệu chuẩn (Offset): <strong style="color:#10B981;">${this.calibEngine.formatOffset(this.calibrationOffset)}</strong></div>
            <div>• Tọa nhà: <strong style="color:#FBBF24;">${analysis.sitting.bearing.toFixed(2)}° (${analysis.sitting.mountain.name} Sơn)</strong></div>
            <div>• Cụm Song Sơn: <strong>${analysis.group.label} (${analysis.group.cuc} Cục)</strong></div>
            <div>• Lai Thủy: <strong>${analysis.lai ? `${analysis.lai.bearing.toFixed(2)}° (${analysis.lai.mountain.name})` : 'Chưa đo'}</strong> ${relLai !== null ? `(lệch ${relLai >= 0 ? '+' : ''}${relLai.toFixed(2)}° so với nhà)` : ''}</div>
            <div>• Khứ Thủy: <strong>${analysis.khu ? `${analysis.khu.bearing.toFixed(2)}° (${analysis.khu.mountain.name})` : 'Chưa đo'}</strong> ${relKhu !== null ? `(lệch ${relKhu >= 0 ? '+' : ''}${relKhu.toFixed(2)}° so với nhà)` : ''}</div>
            <div>• Chiều nước: <strong>${this.flowDirection === 'forward' ? 'Tả ➔ Hữu' : 'Hữu ➔ Tả'}</strong></div>
          </div>

          <div style="background:#1E293B; border-radius:10px; padding:1rem; margin-bottom:1rem; border:1px solid rgba(255,255,255,0.08);">
            <div style="color:#CBD5E1; font-weight:800; font-size:0.88rem; margin-bottom:0.5rem;">2. ĐỘ TIN CẬY & VÙNG RANH PHÂN KIM</div>
            <div>• Sai số phép đo: <strong>±${this.measurementTolerance.toFixed(2)}°</strong></div>
            <div>• Khoảng cách tới ranh Hướng: <strong>${analysis.facing.distanceToBoundary.toFixed(2)}°</strong></div>
            ${analysis.khu ? `<div>• Khoảng cách tới ranh Khứ: <strong>${analysis.khu.distanceToBoundary.toFixed(2)}°</strong></div>` : ''}
            <div>• Đánh giá: <strong style="color:${analysis.status.isSensitive ? '#FB7185' : '#10B981'};">${analysis.status.isSensitive ? '⚠️ Nhạy cảm sai số ranh phân kim' : '✓ An toàn trong tâm Sơn'}</strong></div>
          </div>

          ${analysis.thuyKhau ? `
            <div style="background:#181F30; border-radius:10px; padding:1.2rem; border-left:4px solid #38BDF8;">
              <div style="color:#38BDF8; font-weight:800; font-size:0.92rem; margin-bottom:0.5rem;">3. KHẢO CHỨNG 144 THỦY KHẨU CHÁNH TÔNG</div>
              <div>• Khẩu khảo chứng: <strong>Khẩu #${analysis.thuyKhau.hs_num} / 144</strong></div>
              <div>• Tên thế cách: <strong style="color:#FEF3C7; font-size:1.05rem;">${analysis.thuyKhau.ten_cach}</strong> [${analysis.thuyKhau.muc_phan}]</div>
              <div>• Cửa nước thoát: <strong>Thủy xuất ${analysis.thuyKhau.thuy_xuat}</strong> (${analysis.thuyKhau.song_son_cung})</div>
              <div style="margin-top:0.6rem; color:#CBD5E1; font-size:0.82rem; line-height:1.6;">
                ${analysis.thuyKhau.muc_D}
              </div>
              <div style="margin-top:0.6rem; color:#94A3B8; font-size:0.75rem; font-style:italic;">
                ${analysis.thuyKhau.source}
              </div>
            </div>
          ` : ''}
        `;

        exportContent.innerHTML = reportHtml;
        modalExport.style.display = 'flex';
      });
    }

    const closeModal = () => {
      if (modalExport) modalExport.style.display = 'none';
    };
    if (btnCloseExport) btnCloseExport.addEventListener('click', closeModal);
    if (btnCloseExportX) btnCloseExportX.addEventListener('click', closeModal);

    if (btnCopyExport) {
      btnCopyExport.addEventListener('click', () => {
        const text = exportContent.innerText;
        navigator.clipboard.writeText(text).then(() => {
          btnCopyExport.textContent = '✓ Đã Sao Chép!';
          setTimeout(() => { btnCopyExport.textContent = '📋 Sao Chép Báo Cáo'; }, 2000);
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
      setTimeout(() => {
        this.initLeafletMap();
      }, 100);
    }
  }

  initLeafletMap() {
    const mount = document.getElementById('dt-map-mount');
    if (!mount || typeof L === 'undefined') return;

    if (!this.mapInstance) {
      this.mapInstance = L.map('dt-map-mount', {
        center: this.surveyCenterLatLng,
        zoom: this.zoomLevel,
        zoomControl: false
      });

      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Esri Satellite',
        maxZoom: 21,
        maxNativeZoom: 19
      }).addTo(this.mapInstance);

      L.control.zoom({ position: 'topright' }).addTo(this.mapInstance);

      // Đồng bộ vị trí tâm khảo sát khi di chuyển map
      this.mapInstance.on('move', () => {
        const center = this.mapInstance.getCenter();
        this.surveyCenterLatLng = [center.lat, center.lng];
      });
    } else {
      setTimeout(() => {
        this.mapInstance.invalidateSize();
      }, 150);
    }
  }
}

window.LuopanMapTool = LuopanMapTool;
